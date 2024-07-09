// ** MUI Imports
import React, { useEffect, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TablePagination from '@mui/material/TablePagination'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Link from 'next/link'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'
import moment from 'moment'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

import { DashboardStrDateContext } from 'src/pages/index'
import { Typography } from '@mui/material'

const TableAllLeaves = () => {
  const yearBudget = moment().format('YYYY')
  const thYearBudget = yearBudget + 543

  const { register } = useForm()
  const [search, setSearch] = useState('')
  let i = 1
  const today = moment().format('YYYY-MM-DD')
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
  const userRoleId = typeof window !== 'undefined' ? localStorage.getItem('userRoleId') : null

  const mainDeptId = typeof window !== 'undefined' ? localStorage.getItem('mainDeptId') : null
  const mainDeptName = typeof window !== 'undefined' ? localStorage.getItem('mainDeptName') : null
  const userDeptId = typeof window !== 'undefined' ? localStorage.getItem('deptId') : null
  const deptName = typeof window !== 'undefined' ? localStorage.getItem('deptName') : null
  const [leaves, setLeaves] = useState({ blogs: [] })
  const [leaveStatuses, setLeaveStatuses] = useState({ blogs: [] })
  const [leaveStatusId, setLeaveStatusId] = useState(0)
  const [depts, setDepts] = useState({ blogs: [] })
  const [deptId, setDeptId] = useState(userDeptId)

  const handleChangeLeaveStatus = async data => {
    setLeaveStatusId(data.target.value)
  }

  const handleChangeDept = async data => {
    setDeptId(data.target.value)
  }

  const [pg, setpg] = React.useState(0)
  const [rpg, setrpg] = React.useState(10)

  function handleChangePage(event, newpage) {
    setpg(newpage)
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10))
    setpg(0)
  }

  const fetchLeaves = async () => {
    let uri = apiConfig.baseURL + `/leaves/${deptId}/${yearBudget}/${leaveStatusId}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setLeaves({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchLeaveStatuses = async () => {
    let uri = apiConfig.baseURL + `/utils/leave-status`

    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setLeaveStatuses({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }
  const fetchDepts = async () => {
    let admin_uri = apiConfig.baseURL + `/utils/depts/`
    let manager_uri = apiConfig.baseURL + `/utils/depts/${mainDeptId}`
    let uri = userRoleId == 1 || userRoleId == 10 ? admin_uri : manager_uri

    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setDepts({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchLeaves()
    fetchLeaveStatuses()
    fetchDepts()
  }, [leaveStatusId, deptId]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card>
      <CardHeader
        title={`รายงานข้อมูลการลาปฎิบัติงาน ประจำปีงบประมาณ ${parseInt(yearBudget) + 543}`}
        sx={{ textAlign: 'center' }}
        titleTypographyProps={{ variant: 'h3' }}
      />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <Grid item xs={12} md={12} lg={12}>
          <form noValidate autoComplete='off'>
            <Grid container spacing={5}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label='ค้นหาเจ้าหน้าที่'
                  placeholder='พิมพ์ชื่อ-สกุล'
                  {...register('search', {
                    onChange: e => {
                      setSearch(e.target.value)
                    },
                    onBlur: e => {}
                  })}
                />
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>หน่วยงาน</InputLabel>
                  <Select fullWidth label='หน่วยงาน' value={leaveStatusId} onChange={handleChangeDept}>
                    <MenuItem value='0'>ทั้งหมด</MenuItem>
                    {depts.blogs.map(row => (
                      <MenuItem key={row.deptId} value={row.deptId}>
                        {row.deptName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>สถานะใบลา</InputLabel>
                  <Select fullWidth label='สถานะใบลา' value={leaveStatusId} onChange={handleChangeLeaveStatus}>
                    <MenuItem value='0'>ทั้งหมด</MenuItem>
                    {leaveStatuses.blogs.map(row => (
                      <MenuItem key={row.leaveStatusId} value={row.leaveStatusId}>
                        {row.leaveStatusName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Divider sx={{ margin: 0, mt: 5 }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>เลขที่ใบลา</TableCell>
                <TableCell align='center'>ชื่อ-สกุล</TableCell>
                <TableCell align='center'>วันที่ลา</TableCell>
                <TableCell align='center'>จำนวนวันลา</TableCell>
                <TableCell align='center'>ประเภทการลา</TableCell>
                <TableCell align='center'>ผู้รับผิดชอบงานแทน</TableCell>
                <TableCell align='center'>หัวหน้างานรับทราบ</TableCell>
                <TableCell align='center'>หัวหน้ากลุ่มเห็นชอบ</TableCell>
                <TableCell align='center'>ผู้อำนวยการ</TableCell>
                <TableCell align='center'>สถานะ</TableCell>
                <TableCell align='center'>จัดการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaves.blogs
                .filter(row => {
                  return search === '' ? row : row.leaveId.toString().includes(search) || row.staffName.includes(search)
                })
                .slice(pg * rpg, pg * rpg + rpg)
                .map(row => (
                  <TableRow key={row.leaveId}>
                    <TableCell align='center' component='th' scope='row'>
                      <Typography sx={{ fontSize: 13 }}>{row.leaveId}</Typography>
                      <Typography sx={{ fontSize: 13 }}>
                        {row.createdAt ? moment(row.createdAt).add(543, 'year').format('DD/MM/YY HH:mm') : '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align='center' component='th' scope='row'>
                      <Typography sx={{ fontSize: 13 }}>{row.staffName}</Typography>
                      <Typography sx={{ fontSize: 13 }}>{row.deptName}</Typography>
                    </TableCell>
                    <TableCell align='center' component='th' scope='row'>
                      <Typography sx={{ fontSize: 13 }}>
                        {moment(row.leaveStartDate).add(543, 'year').format('DD/MM/YY')}
                      </Typography>
                      <Typography sx={{ fontSize: 13 }}>
                        {moment(row.leaveEndDate).add(543, 'year').format('DD/MM/YY')}
                      </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography sx={{ fontSize: 13 }}>{row.totalLeaveDay}</Typography>
                      <Typography sx={{ fontSize: 13 }}>{row.leaveSessionName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: 13 }}>{row.leaveTypeName}</Typography>
                      <Typography sx={{ fontSize: 13 }}>{row.leaveReason ?? '-'}</Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography sx={{ fontSize: 13 }}>
                        {' '}
                        {row.colleagueSignDateTime
                          ? moment(row.colleagueSignDateTime).add(543, 'year').format('DD/MM/YY HH:mm')
                          : '-'}
                      </Typography>
                      <Typography sx={{ fontSize: 13 }}>{row.colleagueName ?? '-'}</Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography sx={{ fontSize: 13 }}>
                        {' '}
                        {row.headSignDateTime
                          ? moment(row.headSignDateTime).add(543, 'year').format('DD/MM/YY HH:mm')
                          : '-'}
                      </Typography>
                      <Typography sx={{ fontSize: 13 }}>{row.headName ?? '-'}</Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography sx={{ fontSize: 13 }}>
                        {' '}
                        {row.managerSignDateTime
                          ? moment(row.managerSignDateTime).add(543, 'year').format('DD/MM/YY HH:mm')
                          : '-'}
                      </Typography>
                      <Typography sx={{ fontSize: 13 }}>{row.managerName ?? '-'}</Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography sx={{ fontSize: 13 }}>
                        {' '}
                        {row.directorSignDateTime
                          ? moment(row.directorSignDateTime).add(543, 'year').format('DD/MM/YY HH:mm')
                          : '-'}
                      </Typography>
                      <Typography sx={{ fontSize: 13 }}>{row.directorName ?? '-'}</Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography sx={{ fontSize: 13 }}>{row.leaveStatusName}</Typography>
                    </TableCell>
                    <TableCell align='center' color='success'>
                      <Link passHref href={`../../leaves/cid/${row.cid}`} color='success'>
                        <Button type='button' variant='outlined'>
                          รายละเอียด
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component='div'
          count={leaves.blogs.length}
          rowsPerPage={rpg}
          page={pg}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  )
}

export default TableAllLeaves
