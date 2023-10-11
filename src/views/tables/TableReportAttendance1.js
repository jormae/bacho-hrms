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
import TablePagination from "@mui/material/TablePagination"
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import TextField  from "@mui/material/TextField";
import Button from '@mui/material/Button'
import Link from 'next/link'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'
import moment from 'moment'

// import { PaidContext, StrDateContext } from 'src/pages/reports/monthly/welfare-payment/index'
import { DashboardReportAttendance1Context, DashboardStrDateContext } from 'src/pages/index'

const TableReportAttendance1 = () => {
  console.log("TableReportAttendance1")
    // const paidReports = useContext(PaidContext)
    const dashboardReportAttendance1 = useContext(DashboardReportAttendance1Context)
    const strDate = useContext(DashboardStrDateContext)
    // const dashboardStrDate = useContext(DashboardStrDateContext)
    // const attendanceDataTable = paidReports ?? dashboardReportAttendance1;
    // const attendanceDataTable = useContext(DashboardReportAttendance1Context);
    // const paidStrDate = useContext(StrDateContext);
    // const paidStrDate = strDate ?? dashboardStrDate;
    console.log("dashboardReportAttendance1"+dashboardReportAttendance1)
    
    const { register } = useForm();
    const [search, setSearch] = useState('')
    const i = 1;
  
    const [pg, setpg] = React.useState(0);
    const [rpg, setrpg] = React.useState(10);
  
    function handleChangePage(event, newpage) {
        setpg(newpage);
    }
  
    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    }
    
  return (
    <Card>
      <CardHeader title={`รายการชำระเงินสวัสดิการประจำเดือน ${strDate}`} titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
      <Grid item xs={12} md={12} lg={12}>
          <form noValidate autoComplete='off'>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField fullWidth label='ค้นหาสมาชิกชำระเงินสวัสดิการ' placeholder='ค้นหาสมาชิกชำระเงินสวัสดิการ' {...register('search', {
                    onChange: (e) => {setSearch(e.target.value)},
                    onBlur: (e) => {},
                  })} />
                </Grid>
              </Grid>
          </form>
        </Grid>
        <Divider sx={{ margin: 0, mt:5 }} />        
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>ที่</TableCell>
                <TableCell align='center'>กลุ่มงาน</TableCell>
                <TableCell align='center'>ชื่อเวร</TableCell>
                <TableCell align='center'>จำนวนสแกนทำงาน</TableCell>
                <TableCell align='center'>ตรงเวลา</TableCell>
                <TableCell align='center'>สาย</TableCell>
                <TableCell align='center'>ลา</TableCell>
                <TableCell align='center'>จัดการ</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            { dashboardReportAttendance1.blogs.filter((row)=>{
                  return search.toLowerCase() === '' ? row : row.staffName.toLowerCase().includes(search);
                }).slice(pg * rpg, pg *
                  rpg + rpg).map(row => (
                <TableRow key={row.attendanceId}>
                  <TableCell align='center' component='th' scope='row'>
                  {i++}
                  </TableCell>
                  <TableCell>{row.mainDeptName}</TableCell>
                  <TableCell>{row.shiftName} ({row.startShiftTime} - {row.endShiftTime})</TableCell>
                  <TableCell align='center'>{row.totalAttendance}</TableCell>
                  <TableCell align='center'>{row.totalPunctual}</TableCell>
                  <TableCell align='center'>{row.totalLate}</TableCell>
                  <TableCell align='center'>N/A</TableCell>
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
          component="div"
          count={dashboardReportAttendance1.blogs.length}
          rowsPerPage={rpg}
          page={pg}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  )
}

export default TableReportAttendance1
