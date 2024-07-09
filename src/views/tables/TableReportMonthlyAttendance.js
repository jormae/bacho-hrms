// ** MUI Imports
import React, { useEffect, useContext, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Paper, Skeleton } from '@mui/material/'
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
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { Typography, InputLabel, FormControl } from '@mui/material'
import PrintIcon from '@mui/icons-material/Print'
import { useReactToPrint } from 'react-to-print'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  Typography: {
    fontSize: '14px',
    marginTop: '-5px',
    marginBottom: '-5px',
    color: 'black'
  },
  [`@page`]: {
    size: 'A4 Landscape',
    margin: 20
  },
  [`@media print`]: {
    Typography: {
      fontSize: '12px',
      color: 'black'
    },
    table: {
      color: '000',
      width: '99%',
      '& .MuiTableCell-root': {
        border: '1px solid black'
      },
      margin: 'auto',
      color: 'black'
    },
    hide: {
      display: 'none'
    }
  },
  color: 'black'
})

// import { DashboardStrDateContext } from 'src/pages/index'

const TableReportMonthlyAttendance = () => {
  // const strDate = useContext(DashboardStrDateContext)
  const [err, setError] = useState()
  const yearBudget = 2024
  const thYearBudget = yearBudget + 543

  const { register } = useForm()
  const [search, setSearch] = useState('')
  let i = 1
  const [selectedYearMonth, setSelectedYearMonth] = useState(moment().format('YYYY-MM'))
  const userRoleId = typeof window !== 'undefined' ? localStorage.getItem('userRoleId') : null
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const strDate =
    'เดือน ' +
    moment(selectedYearMonth).format('MMMM') +
    ' พ.ศ.' +
    moment(selectedYearMonth).add(543, 'year').format('YYYY')

  const mainDeptId = typeof window !== 'undefined' ? localStorage.getItem('mainDeptId') : null
  const mainDeptName = typeof window !== 'undefined' ? localStorage.getItem('mainDeptName') : null
  const userDeptId = typeof window !== 'undefined' ? localStorage.getItem('deptId') : null
  const userDeptName = typeof window !== 'undefined' ? localStorage.getItem('deptName') : null

  // const deptName = typeof window !== 'undefined' ? localStorage.getItem('deptName') : null
  const [reportAttendances, setReportAttendances] = useState({ blogs: [] })
  const [selectedDeptName, setSelectedDeptName] = useState({ blogs: [] })
  const [deptName, setDeptName] = useState(userDeptName)
  console.log(selectedDeptName)

  //   const [dept, setDept] = useState('all')
  const [deptId, setDeptId] = useState(userDeptId)
  const [deptFilter, setDeptFilter] = useState(mainDeptId)
  const [deptOptions, setDeptOptions] = useState({ blogs: [] })

  const handleChangeMonth = async data => {
    console.log(data.target.value)
    setSelectedYearMonth(data.target.value)
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

  const classes = useStyles()

  const print = `
  Typography: {
    fontSize: '14px',
    marginTop: '-15px',
    marginBottom: '-15px',
  },
  @page: {
    size: 'A4 Landscape',
    margin: 25
  },
  @media print {
    Typography: {
      fontSize: '14px',
      color: 'black'
    },
  },
  color: 'black'
`
  const printRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    copyStyles: true,
    pageStyle: print
  })

  const fetchReportAttendances = async () => {
    // let uri = apiConfig.baseURL + `/reports/monthly/attendances/date/${selectedYearMonth}`
    // let admin_uri = apiConfig.baseURL + `/reports/monthly/attendances/date/${selectedYearMonth}`
    let admin_uri = apiConfig.baseURL + `/reports/monthly/attendances/deptId/date/${deptId}/${selectedYearMonth}`

    let manager_uri =
      apiConfig.baseURL + `/reports/monthly/attendances/main-dept/date/${mainDeptId}/${selectedYearMonth}`
    let uri = userRoleId == 1 || userRoleId == 10 ? admin_uri : manager_uri
    console.log(uri)
    console.log('deptId = ' + deptId)
    console.log('selectedYearMonth = ' + selectedYearMonth)
    try {
      const { data } = await axios
        .get(uri, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }
        })
        .catch(error => {
          console.error(error)
          console.error(error.response.data)
          setError(error.message + ` (${error.response.data})`)
        })
      setReportAttendances({ blogs: data })
      console.log(data[0]['deptName'])
      setDeptName(data[0]['deptName'])
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
      setDeptOptions({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchReportAttendances()
    fetchDepts()
  }, [deptId, selectedYearMonth]) // eslint-disable-line react-hooks/exhaustive-deps

  const TableRowsLoader = ({ rowsNum }) => {
    return [...Array(rowsNum)].map((row, index) => (
      <TableRow key={index}>
        <TableCell component='th' scope='row'>
          <Skeleton animation='wave' variant='text' />
        </TableCell>
        <TableCell>
          <Skeleton animation='wave' variant='text' />
        </TableCell>
        <TableCell>
          <Skeleton animation='wave' variant='text' />
        </TableCell>
        <TableCell>
          <Skeleton animation='wave' variant='text' />
        </TableCell>
        <TableCell>
          <Skeleton animation='wave' variant='text' />
        </TableCell>
        <TableCell>
          <Skeleton animation='wave' variant='text' />
        </TableCell>
        <TableCell>
          <Skeleton animation='wave' variant='text' />
        </TableCell>
        <TableCell>
          <Skeleton animation='wave' variant='text' />
        </TableCell>
        <TableCell>
          <Skeleton animation='wave' variant='text' />
        </TableCell>
        <TableCell>
          <Skeleton animation='wave' variant='text' />
        </TableCell>
        <TableCell>
          <Skeleton animation='wave' variant='text' />
        </TableCell>
        <TableCell>
          <Skeleton animation='wave' variant='text' />
        </TableCell>
        <TableCell>
          <Skeleton animation='wave' variant='text' />
        </TableCell>
        <TableCell>
          <Skeleton animation='wave' variant='text' />
        </TableCell>
        <TableCell>
          <Skeleton animation='wave' variant='text' />
        </TableCell>
        <TableCell>
          <Skeleton animation='wave' variant='text' />
        </TableCell>
        <TableCell>
          <Skeleton animation='wave' variant='text' />
        </TableCell>
      </TableRow>
    ))
  }

  return (
    <div>
      {err ? (
        <Grid item xs={12} md={12}>
          <Alert severity='error'>
            <AlertTitle>Error!</AlertTitle>
            {err}
          </Alert>
        </Grid>
      ) : (
        <Card>
          <CardHeader
            title={`รายงานสรุปข้อมูลการลงเวลาปฎิบัติงานประจำ${strDate}`}
            sx={{ textAlign: 'center' }}
            titleTypographyProps={{ variant: 'h3' }}
          />

          <CardContent>
            <div ref={printRef}>
              <Grid item xs={12} md={12} lg={12}>
                <Typography
                  sx={{ textAlign: 'center', marginBottom: 0, color: 'black' }}
                >{`รายงานสรุปข้อมูลการลงเวลาปฎิบัติงานประจำ${strDate}`}</Typography>
                <Typography sx={{ textAlign: 'center', marginBottom: 2 }}>{`${deptName ?? ''}`}</Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={12} className={classes.hide}>
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
                        <Select
                          fullWidth
                          label='หน่วยงาน'
                          placeholder='หน่วยงาน'
                          value={deptId}
                          onChange={handleChangeDept}
                          defaultValue={userDeptId}
                        >
                          <MenuItem value='all'>ทั้งหมด</MenuItem>
                          {deptOptions.blogs.map(row => (
                            <MenuItem key={row.deptId} value={row.deptId}>
                              {row.deptName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <TextField
                        fullWidth
                        label='เลือกเดือน'
                        type='month'
                        onChange={handleChangeMonth}
                        defaultValue={selectedYearMonth}
                        value={selectedYearMonth}
                      />
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Divider sx={{ margin: 0, mt: 5 }} className={classes.hide} />
              <TableContainer>
                <Table sx={{ width: '100%' }} className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center' className={classes.Typography}>
                        ที่
                      </TableCell>
                      <TableCell align='center' width={180} className={classes.Typography}>
                        ชื่อ-สกุล
                      </TableCell>
                      {/* <TableCell align='center'>หน่วยงาน</TableCell> */}
                      <TableCell align='center' className={classes.Typography}>
                        ทั้งหมด
                      </TableCell>
                      <TableCell align='center' className={classes.hide}>
                        สาย
                      </TableCell>
                      <TableCell align='center' className={classes.Typography}>
                        เวรเช้า
                      </TableCell>
                      <TableCell align='center' className={classes.Typography}>
                        เวร Day 4
                      </TableCell>
                      <TableCell align='center' className={classes.Typography}>
                        เวร Day
                      </TableCell>
                      <TableCell align='center' className={classes.Typography}>
                        เวร Night
                      </TableCell>
                      <TableCell align='center' className={classes.Typography}>
                        บ่าย-ดึก
                      </TableCell>
                      <TableCell align='center' className={classes.Typography}>
                        บ่าย-เที่ยงคืน
                      </TableCell>
                      <TableCell align='center' className={classes.Typography}>
                        เวร 24 ชั่วโมง
                      </TableCell>
                      <TableCell align='center' className={classes.Typography}>
                        เวรหัวรุ่ง 1
                      </TableCell>
                      <TableCell align='center' className={classes.Typography}>
                        เวรหัวรุ่ง 2
                      </TableCell>
                      <TableCell align='center' className={classes.Typography}>
                        ลา
                      </TableCell>
                      <TableCell align='center' className={classes.Typography}>
                        ราชการ
                      </TableCell>
                      <TableCell align='center' className={classes.hide}>
                        จัดการ
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {!reportAttendances.blogs[0] ? (
                      <TableRowsLoader rowsNum={5} />
                    ) : (
                      reportAttendances.blogs
                        .filter(row => {
                          return search === '' ? row : row.staffName.includes(search)
                        })
                        .slice(pg * rpg, pg * rpg + rpg)
                        .map(row => (
                          <TableRow key={row.nationalId}>
                            <TableCell align='center' component='th' scope='row'>
                              <Typography className={classes.Typography}>{i++}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography className={classes.Typography}>{row.staffName}</Typography>
                              <Typography variant='subtitle2' className={classes.hide}>
                                {row.deptName}
                              </Typography>
                            </TableCell>
                            {/* <TableCell>{row.deptName}</TableCell> */}
                            <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                              <Typography className={classes.Typography}>
                                {' '}
                                {row.totalCheckin}/{row.totalCheckout}
                              </Typography>
                            </TableCell>
                            <TableCell align='center' sx={{ fontWeight: 'bold' }} className={classes.hide}>
                              <Typography className={classes.Typography}>{row.totalLateCheckin}</Typography>
                            </TableCell>
                            <TableCell align='center'>
                              <Typography className={classes.Typography}>
                                {' '}
                                {row.totalCheckinShift1}/{row.totalCheckoutShift1}
                              </Typography>
                            </TableCell>
                            <TableCell align='center'>
                              <Typography className={classes.Typography}>
                                {row.totalCheckinShift2}/{row.totalCheckoutShift2}
                              </Typography>
                            </TableCell>
                            <TableCell align='center'>
                              <Typography className={classes.Typography}>
                                {row.totalCheckinShift3}/{row.totalCheckoutShift3}
                              </Typography>
                            </TableCell>
                            <TableCell align='center'>
                              <Typography className={classes.Typography}>
                                {row.totalCheckinShift4}/{row.totalCheckoutShift4}
                              </Typography>
                            </TableCell>
                            <TableCell align='center'>
                              <Typography className={classes.Typography}>
                                {row.totalCheckinShift6}/{row.totalCheckoutShift6}
                              </Typography>
                            </TableCell>
                            <TableCell align='center'>
                              <Typography className={classes.Typography}>
                                {row.totalCheckinShift7}/{row.totalCheckoutShift7}
                              </Typography>
                            </TableCell>
                            <TableCell align='center'>
                              <Typography className={classes.Typography}>
                                {row.totalCheckinShift8}/{row.totalCheckoutShift8}
                              </Typography>
                            </TableCell>
                            <TableCell align='center'>
                              <Typography className={classes.Typography}>
                                {row.totalCheckinShift9}/{row.totalCheckoutShift9}
                              </Typography>
                            </TableCell>
                            <TableCell align='center'>
                              <Typography className={classes.Typography}>
                                {row.totalCheckinShift10}/{row.totalCheckoutShift10}
                              </Typography>
                            </TableCell>
                            <TableCell align='center'>
                              <Typography className={classes.Typography}>{row.totalLeave ?? 0}</Typography>
                            </TableCell>
                            <TableCell align='center'>
                              <Typography className={classes.Typography}>{row.totalOutStation ?? 0}</Typography>
                            </TableCell>
                            <TableCell align='center' color='success' className={classes.hide}>
                              <Link passHref href={`../../reports/monthly/attendance/cid/${row.cid}`} color='success'>
                                <Button type='button' variant='outlined'>
                                  รายละเอียด
                                </Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                className={classes.hide}
                rowsPerPageOptions={[10, 20, 50]}
                component='div'
                count={reportAttendances.blogs.length}
                rowsPerPage={rpg}
                page={pg}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </CardContent>
          <Button
            type='button'
            variant='outlined'
            startIcon={<PrintIcon />}
            sx={{ mb: 5, mr: 5, float: 'right' }}
            className={classes.hide}
            onClick={() => handlePrint()}
          >
            พิมพ์รายการลา
          </Button>
        </Card>
      )}
    </div>
  )
}

export default TableReportMonthlyAttendance
