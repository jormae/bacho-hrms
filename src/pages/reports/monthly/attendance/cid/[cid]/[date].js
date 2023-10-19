import { useEffect, useState, createContext } from 'react'
import * as React from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import apiConfig from 'src/configs/apiConfig'
import FormMemberDetail from 'src/views/form-layouts/FormMemberDetail'
import axios from 'axios'
import CardUser from 'src/views/cards/CardUser'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
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
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button'
import Link from 'next/link'
import moment from 'moment'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import FormSpouseDetail from 'src/views/form-layouts/FormSpouseDetail'
import TableMemberInvestmentHistory from 'src/views/tables/TableMemberInvestmentHistory'
import TableMemberLoanHistory from 'src/views/tables/TableMemberLoanHistory'
import TableMemberDividendHistory from 'src/views/tables/TableMemberDividendHistory'
import TableMemberLoanPaymentHistory from 'src/views/tables/TableMemberLoanPaymentHistory'
import FormLoanDetail from 'src/views/form-layouts/FormLoanApproval'
import CardAddLoanPayment from 'src/views/cards/CardLoanPayment'
import CardLoanAgreement from 'src/views/cards/CardLoanAgreement'
import CardLoanReceipt from 'src/views/cards/CardLoanReceipt'
import CardLoanSurety1 from 'src/views/cards/CardLoanSurety1'
import CardLoanSurety2 from 'src/views/cards/CardLoanSurety2'
import FormDebtReport from 'src/views/form-layouts/FormDebtReport'
import TableReportMonthlyAttendanceDept from 'src/views/tables/TableReportMonthlyAttendanceDept'

export const ReportMonthlyAttendanceDeptContext = createContext()

const FormLayouts = () => {
  const router = useRouter()
  if (router.isReady) {
    router.query.cid
    router.query.date
  }
  const { register } = useForm();

  const i = 1;
  const deptId = 3;
  const date = "2023-10";
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null

  const [attendanceReports, setAttendanceReports] = useState({ blogs: [] })
  console.log(attendanceReports)

  const [value, setValue] = React.useState('member')
  const [tabHistoryValue, setTabHistoryValue] = React.useState('loan')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleTabHistoryChange = (event, newValue) => {
    setTabHistoryValue(newValue)
  }

  const fetchAttendanceReports = async () => {
    let uri = apiConfig.baseURL + `/reports/monthly/attendances/cid/${router.query.cid}/${router.query.date}`

    // let uri = apiConfig.baseURL + `/reports/monthly/attendances/`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setAttendanceReports({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      router.query
      fetchAttendanceReports()
    }
  }, [router.isReady, router.query])


  // const SkeletonMemberCardLoading = () => (
  //   <Box sx={{ width: '100%' }}>
  //         {memberDetail?.nationalId ? (
  //           <LoanMemberContext.Provider value={memberDetail}>
  //             <CardUser />
  //           </LoanMemberContext.Provider>
  //         ) : (
  //           <Typography variant='h4'>
  //             <Skeleton width='100%' height={300} sx={{ animationDuration: '3.0s' }} />
  //           </Typography>
  //         )}
  //   </Box>
  // )
  // const SkeletonMemberLoanFormLoading = () => (
  //   <Box sx={{ width: '100%' }}>
  //     {memberDetail?.nationalId ? (
  //       <LoanContext.Provider value={loanDetail}>
  //         <FormLoanDetail />
  //       </LoanContext.Provider>
  //     ) : (
  //       <Typography variant='h4'>
  //         <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
  //       </Typography>
  //     )}
  //   </Box>
  // )

  // const SkeletonMemberDebtReportFormLoading = () => (
  //   <Box sx={{ width: '100%' }}>
  //     {memberDetail?.nationalId ? (
  //       <LoanContext.Provider value={loanDetail}>
  //         <FormDebtReport />
  //       </LoanContext.Provider>
  //     ) : (
  //       <Typography variant='h4'>
  //         <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
  //       </Typography>
  //     )}
  //   </Box>
  // )

  const SkeletonAttendanceReportLoading = () => (
    <Box sx={{ width: '100%' }}>
      {attendanceReports?.cid ? (
        <ReportMonthlyAttendanceDeptContext.Provider value={attendanceReports}>
          <TableReportMonthlyAttendanceDept />
        </ReportMonthlyAttendanceDeptContext.Provider>
      ) : (
        <Typography variant='h4'>
          <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
        </Typography>
      )}
    </Box>
  )

  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={12} md={6}>
        <SkeletonMemberLoanFormLoading />
      </Grid>
      <Grid item xs={12} md={6}>
        <SkeletonMemberDebtReportFormLoading />
      </Grid> */}
      <Grid item xs={12} md={6} lg={4}>
        <CardAddLoanPayment />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <CardLoanAgreement />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <CardLoanReceipt />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <CardLoanSurety1 />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <CardLoanSurety2 />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <CardLoanReceipt />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={`รายงานการลงเวลาทำงาน วันที่`} titleTypographyProps={{ variant: 'h6' }} />
          <Divider sx={{ margin: 0 }} />
          <CardContent>
            <Grid item xs={12} md={12} lg={12}>
              <form noValidate autoComplete='off'>
                <Grid container spacing={5}>
                  <Grid item xs={10}>
                    <TextField fullWidth label='ค้นหาเจ้าหน้าที่' placeholder='พิมพ์ชื่อ-สกุล' {...register('search', {
                      onChange: (e) => { setSearch(e.target.value) },
                      onBlur: (e) => { },
                    })} />
                  </Grid>
                  <Grid item xs={2}>
                    {/* <Select
                      fullWidth label='หน่วยงาน'
                      placeholder='เลือกหน่วยงาน'
                      value={dept}
                      onChange={(e) => setDept(e.target.value)}
                    >
                      <MenuItem value="all">ทั้งหมด</MenuItem>
                      {depts.blogs.map(row => (
                        <MenuItem key={row.deptId} value={row.deptName}>{row.deptName}</MenuItem>
                      ))}
                    </Select> */}
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
                    <TableCell align='center'>วัน</TableCell>
                    <TableCell align='center'>วันที่</TableCell>
                    <TableCell align='center'>ชื่อเวร</TableCell>
                    <TableCell align='center'>เวลาเข้างาน</TableCell>
                    <TableCell align='center'>สถานะ</TableCell>
                    <TableCell align='center'>เวลาออกงาน</TableCell>
                    <TableCell align='center'>สถานะ</TableCell>
                    <TableCell align='center'>หมายเหตุ</TableCell>
                  </TableRow>

                </TableHead >
                <TableBody >
                  {attendanceReports.blogs.map(row => (
                    <TableRow key={row.attendanceId}>
                      <TableCell align='center' component='th' scope='row'>
                        {i++}
                      </TableCell>
                      <TableCell>{row.dayName}</TableCell>
                      <TableCell align='center'>{moment(row.attendanceDate).add(543, 'year').format('DD/MM/YYYY')}</TableCell>
                      <TableCell>{(row.shiftName == null || row.shiftName == "") ? "" : `${row.shiftName} (${row.startShiftTime} - ${row.endShiftTime})`}</TableCell>
                      <TableCell align='center'>{row.checkinTime}</TableCell>
                      <TableCell align='center'>{(row.checkinStatusId == null || row.checkinStatusId == "") ? "" : row.checkinStatusId == 1 ? "ตรงเวลา" : "สาย"}</TableCell>
                      <TableCell align='center'>{row.checkoutTime}</TableCell>
                      <TableCell align='center'>{(row.checkoutStatusId == null || row.checkinStatusId == "") ? "" : row.checkoutStatusId == 1 ? "ตรงเวลา" : "ออกก่อนเวลา"}</TableCell>
                      <TableCell align='center'>{row.dateRemarks}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default FormLayouts
