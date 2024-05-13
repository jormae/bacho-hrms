// ** MUI Imports
import React, { useContext, useState } from 'react'
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

import { DashboardReportAttendancesContext, DashboardStrDateContext } from 'src/pages/index'

const TableReportDailyAttendance = () => {

  const reportDailyAttendances = useContext(DashboardReportAttendancesContext)
  const strDate = useContext(DashboardStrDateContext)

  const { register } = useForm()
  const [search, setSearch] = useState('')
  let i = 1

  const [pg, setpg] = React.useState(0)
  const [rpg, setrpg] = React.useState(10)

  function handleChangePage(event, newpage) {
    setpg(newpage)
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10))
    setpg(0)
  }

  return (
    <Card>
      <CardHeader title={`รายงานการลงเวลาทำงาน วันที่ ${strDate}`} titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <Grid item xs={12} md={12} lg={12}>
          <form noValidate autoComplete='off'>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='ค้นหาเจ้าหน้าที่'
                  placeholder='พิมพ์ชื่อ-สกุล'
                  {...register('search', {
                    onChange: e => {
                      setSearch(e.target.value)
                    },
                    onBlur: e => { }
                  })}
                />
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Divider sx={{ margin: 0, mt: 5 }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>ที่</TableCell>
                <TableCell align='center'>ชื่อ-สกุล</TableCell>
                <TableCell align='center'>หน่วยงาน</TableCell>
                <TableCell align='center'>เวร</TableCell>
                <TableCell align='center'>ลงเวลา</TableCell>
                <TableCell align='center'>ประเภทลงเวลางาน</TableCell>
                <TableCell align='center'>สถานะ</TableCell>
                <TableCell align='center'>จัดการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportDailyAttendances.blogs
                .filter(row => {
                  return search.toLowerCase() === '' ? row : row.staffName.toLowerCase().includes(search)
                })
                .slice(pg * rpg, pg * rpg + rpg)
                .map(row => (
                  <TableRow key={row.attendanceId}>
                    <TableCell align='center' component='th' scope='row'>
                      {i++}
                    </TableCell>
                    <TableCell>{row.staffName}</TableCell>
                    <TableCell>{row.deptName}</TableCell>
                    <TableCell align='center'>
                      {row.shiftName} ({row.startShiftTime} - {row.endShiftTime})
                    </TableCell>
                    <TableCell align='center'>
                      {moment(row.attendanceDateTime).add(-7, 'hour').add(543, 'year').format('DD/MM/YYYY HH:mm')}
                    </TableCell>
                    <TableCell align='center'>{row.attendanceTypeId == 1 ? 'เข้างาน' : 'ออกงาน'}</TableCell>
                    <TableCell align='center'>{row.attendanceStatusId == 1 ? 'ตรงเวลา' : 'สาย'}</TableCell>
                    <TableCell align='center' color='success'>
                      {/* <Link href={`../../loan/${row.nationalId}/${row.loanId}`} color='success'> */}
                      <Button type='button' variant='outlined'>
                        รายละเอียด
                      </Button>
                      {/* </Link> */}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component='div'
          count={reportDailyAttendances.blogs.length}
          rowsPerPage={rpg}
          page={pg}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  )
}

export default TableReportDailyAttendance
