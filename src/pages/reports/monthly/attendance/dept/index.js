import { useEffect, useState, createContext } from 'react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import apiConfig from 'src/configs/apiConfig'
import axios from 'axios'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
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
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Link from 'next/link'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import moment from 'moment'

export const ReportMonthlyAttendanceDeptContext = createContext()

const FormLayouts = () => {
  const { register, handleSubmit } = useForm()

  // const { onChange } = register('firstName');
  const currentMonth = moment().format('YYYY-MM')
  const [date, setDate] = useState(currentMonth)
  const strDate = 'เดือน ' + moment(date).format('MMMM') + ' พ.ศ.' + moment(date).add(543, 'year').format('YYYY')
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('all')
  const [deptOptions, setDeptOptions] = useState({ blogs: [] })
  const [attendanceReports, setAttendanceReports] = useState({ blogs: [] })

  const i = 1
  const [pg, setpg] = useState(0)
  const [rpg, setrpg] = useState(10)

  function handleChangePage(event, newpage) {
    setpg(newpage)
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10))
    setpg(0)
  }

  const handleChange = async data => {
    console.log(data.target.value)
    setDate(data.target.value)
    let uri = apiConfig.baseURL + `/reports/monthly/attendances/date/${data.target.value}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setAttendanceReports({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const handleTabHistoryChange = (event, newValue) => {
    setTabHistoryValue(newValue)
  }

  const fetchAttendanceReports = async () => {
    let uri = apiConfig.baseURL + `/reports/monthly/attendances/date/${date}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setAttendanceReports({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchDepts = async () => {
    let uri = apiConfig.baseURL + `/utils/depts`

    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setDeptOptions({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDepts()
    fetchAttendanceReports()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


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
      {attendanceReports.blogs ? (
        <Card>
          <CardHeader title={`รายงานสรุปข้อมูลลงเวลาทำงาน ${strDate}`} titleTypographyProps={{ variant: 'h6' }} />
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
                        onBlur: e => { }
                      })}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Select
                      fullWidth
                      label='หน่วยงาน'
                      placeholder='เลือกหน่วยงาน'
                      value={deptFilter}
                      onChange={e => setDeptFilter(e.target.value)}
                    >
                      <MenuItem value='all'>ทั้งหมด</MenuItem>
                      {deptOptions.blogs.map(row => (
                        <MenuItem key={row.deptId} value={row.deptName}>
                          {row.deptName}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      fullWidth
                      label='เลือกเดือน'
                      type='month'
                      onChange={handleChange}
                      defaultValue={currentMonth}
                      value={date}
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
                    <TableCell align='center'>เวรเช้า</TableCell>
                    <TableCell align='center'>เวร Day 4</TableCell>
                    <TableCell align='center'>เวร Day</TableCell>
                    <TableCell align='center'>เวร Night</TableCell>
                    <TableCell align='center'>บ่าย-ดึก</TableCell>
                    <TableCell align='center'>บ่าย-เที่ยงคืน</TableCell>
                    <TableCell align='center'>เวร 24 ชั่วโมง</TableCell>
                    <TableCell align='center'>เวรหัวรุ่ง 1</TableCell>
                    <TableCell align='center'>เวรหัวรุ่ง 2</TableCell>
                    <TableCell align='center'>ลา</TableCell>
                    <TableCell align='center'>ราชการ</TableCell>
                    <TableCell align='center'>จัดการ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceReports.blogs
                    .filter(row => {
                      // return search === '' ? row : (row.staffName.includes(search) || row.deptName.includes(search));
                      return deptFilter === 'all' ? row : row.deptName.includes(deptFilter)
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
                          {row.totalCheckinShift1}/{row.totalCheckoutShift1}
                        </TableCell>
                        <TableCell align='center'>
                          {row.totalCheckinShift2}/{row.totalCheckoutShift2}
                        </TableCell>
                        <TableCell align='center'>
                          {row.totalCheckinShift3}/{row.totalCheckoutShift3}
                        </TableCell>
                        <TableCell align='center'>
                          {row.totalCheckinShift4}/{row.totalCheckoutShift4}
                        </TableCell>
                        <TableCell align='center'>
                          {row.totalCheckinShift6}/{row.totalCheckoutShift6}
                        </TableCell>
                        <TableCell align='center'>
                          {row.totalCheckinShift7}/{row.totalCheckoutShift7}
                        </TableCell>
                        <TableCell align='center'>
                          {row.totalCheckinShift8}/{row.totalCheckoutShift8}
                        </TableCell>
                        <TableCell align='center'>
                          {row.totalCheckinShift9}/{row.totalCheckoutShift9}
                        </TableCell>
                        <TableCell align='center'>
                          {row.totalCheckinShift10}/{row.totalCheckoutShift10}
                        </TableCell>
                        <TableCell align='center'>{row.totalLeave ?? 0}</TableCell>
                        <TableCell align='center'>{row.totalOutStation ?? 0}</TableCell>
                        <TableCell align='center' color='success'>
                          <Link passHref href={`../../monthly/attendance/cid/${row.cid}/${date}`} color='success'>
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
              count={attendanceReports.blogs.length}
              rowsPerPage={rpg}
              page={pg}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </CardContent>
        </Card>
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
      {/* <Grid item xs={12} md={6} lg={4}>
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
      </Grid> */}
      <Grid item xs={12}>
        <SkeletonAttendanceReportLoading />
      </Grid>
    </Grid>
  )
}

export default FormLayouts
