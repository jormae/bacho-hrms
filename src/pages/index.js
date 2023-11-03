import * as React from 'react'
import { useEffect, useState, createContext } from 'react'
import { useForm } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import Router from 'next/router'
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import AssessmentIcon from '@material-ui/icons/Assessment'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Skeleton from '@mui/material/Skeleton'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TablePagination from '@mui/material/TablePagination'

// ** Styled Component Import
import apiConfig from 'src/configs/apiConfig'
import axios from 'axios'


import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Swal from 'sweetalert2'
import dayjs from 'dayjs'

import moment from 'moment'
import 'moment/locale/th' // without this line it didn't work
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import TableReportDailyMainDeptAttendance from 'src/views/tables/TableReportDailyMainDeptAttendance'
import TableReportDailyAttendance from 'src/views/tables/TableReportDailyAttendance'
import TableReportDailyDeptAttendance from 'src/views/tables/TableReportDailyDeptAttendance'
import TableReportMonthlyStaffAttendance from 'src/views/tables/TableReportMonthlyStaffAttendance'

export const DataContext = createContext()

export const DashboardReportAttendance1Context = createContext()

export const DashboardReportAttendancesContext = createContext()

export const DashboardReportMainDeptAttendancesContext = createContext()

export const DashboardPendingPaymentContext = createContext()

export const FollowupPaymentContext = createContext()

export const DashboardStrDateContext = createContext()

export const DashboardCidContext = createContext()

const Dashboard = () => {
  const [err, setError] = useState()

  // const [search, setSearch] = useState('')
  const [searchMainDeptStaffName, setSearchMainDeptStaffName] = useState('')
  const [searchDeptStaffName, setSearchDeptStaffName] = useState('')
  const [pg, setpg] = React.useState(0)
  const [rpg, setrpg] = React.useState(10)

  function handleChangePage(event, newpage) {
    setpg(newpage)
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10))
    setpg(0)
  }

  const today = moment().format('YYYY-MM-DD')
  const month = moment().format('YYYY-MM')

  const userRoleId = typeof window !== 'undefined' ? localStorage.getItem('userRoleId') : null
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null
  const cid = typeof window !== 'undefined' ? localStorage.getItem('username') : null
  const mainDeptId = typeof window !== 'undefined' ? localStorage.getItem('mainDeptId') : null
  const mainDeptName = typeof window !== 'undefined' ? localStorage.getItem('mainDeptName') : null
  const deptId = typeof window !== 'undefined' ? localStorage.getItem('deptId') : null

  const i = 1
  moment.locale('th')
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
  const [sumDailyReportAttendance, setSumDailyReportAttendance] = useState({ blogs: [] })
  const [reportDailyAttendances, setReportDailyAttendances] = useState({ blogs: [] })
  const [reportDailyDeptAttendances, setReportDailyDeptAttendances] = useState({ blogs: [] })
  const [reportDailyMainDeptAttendances, setDailyAttendanceMainDeptReports] = useState({ blogs: [] })
  const [reportMonthlyStaffAttendances, setReportMonthlyStaffAttendances] = useState({ blogs: [] })

  // console.log(reportDailyAttendances)
  // console.log('length = ' + sumDailyReportAttendance.blogs.length)
  // console.log(date)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm()

  const strDate =
    moment(date).format('DD') +
    ' เดือน ' +
    moment(date).format('MMMM') +
    ' พ.ศ.' +
    moment(date).add(543, 'year').format('YYYY')



  const handleDeptChangeDate = async data => {
    console.log(data.target.value)
    setDate(data.target.value)
    let uri = apiConfig.baseURL + `/reports/daily/attendances/dept/${deptId}/${data.target.value}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setDailyAttendanceDeptReports({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchReportAttendance1 = async () => {
    let uri = apiConfig.baseURL + `/reports/attendances/maindept/shiftid/1/${date}`
    console.log('fetchReportAttendance1 uri = ' + uri)
    try {
      const { data } = await axios.get(uri)

      // console.log(data)
      setSumDailyReportAttendance({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchReportDailyAttendances = async () => {
    let uri = apiConfig.baseURL + `/reports/attendances/date/${date}`
    console.log('fetchReportDailyAttendances uri = ' + uri)
    try {
      const { data } = await axios.get(uri)

      // console.log(data)
      setReportDailyAttendances({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchAttendanceReports = async () => {
    let uri = apiConfig.baseURL + `/reports/monthly/attendances/main-dept/${mainDeptId}/${date}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setAttendanceReports({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const getUserPass = async () => {
    let uri = apiConfig.baseURL + `/auth/default-password/${username}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      console.log(data)
      if (data.status == 'error') {
        Swal.fire({
          icon: 'warning',
          title: 'คำแนะนำ!',
          text: data.message
        }).then(okay => {
          if (okay) {
            window.location.href = `/member/${username}`
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const resetDefaultPassword = () => {
    Swal.fire({
      title: 'คำแนะนำ!',
      text: 'กรุณาเปลี่ยนรหัสผ่านใหม่!',
      type: 'warning'
    }).then(okay => {
      if (okay) {
        window.location.href = `/member/${username}`
      }
    })
  }

  const verifyToken = async () => {
    const token = localStorage.getItem('token')
    let uri = apiConfig.baseURL + '/auth/token'
    fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.status !== 'success') {
          localStorage.removeItem('token')
          localStorage.removeItem('username')
          window.location = '/pages/login'
          console.log(data)
        }
      })
      .catch(error => {
        console.error('Error:', error)
        setError('Unable to connect to database, please contact administrator')
      })
  }

  const fetchDailyAttendanceMainDeptReports = async () => {
    let uri = apiConfig.baseURL + `/reports/daily/attendances/main-dept/${mainDeptId}/${today}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setDailyAttendanceMainDeptReports({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchDailyAttendanceDeptReports = async () => {
    let uri = apiConfig.baseURL + `/reports/daily/attendances/dept/${deptId}/${today}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setReportDailyDeptAttendances({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchDepts = async () => {
    let admin_uri = apiConfig.baseURL + `/utils/depts/`
    let manager_uri = apiConfig.baseURL + `/utils/depts/${mainDeptId}`
    let uri = (userRoleId == 1) ? admin_uri : manager_uri
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setDeptOptions({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMonthlyStaffAttendances = async () => {
    let uri = apiConfig.baseURL + `/reports/monthly/attendances/cid/${username}/${month}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setReportMonthlyStaffAttendances({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    verifyToken()
    fetchReportAttendance1()
    fetchReportDailyAttendances()
    fetchDailyAttendanceMainDeptReports()
    fetchDailyAttendanceDeptReports()
    fetchAttendanceReports()
    fetchDepts()
    fetchMonthlyStaffAttendances()
  }, [])


  const SkeletonReportDailyAttendancesLoading = () => (
    <Box sx={{ width: '100%' }}>
      {reportDailyAttendances.blogs ? (
        <Grid container wrap='nowrap'>
          <Grid item xs={12} md={12} lg={12}>
            <DashboardReportAttendancesContext.Provider value={reportDailyAttendances}>
              <DashboardStrDateContext.Provider value={strDate}>
                <TableReportDailyAttendance />
              </DashboardStrDateContext.Provider>
            </DashboardReportAttendancesContext.Provider>
          </Grid>
        </Grid>
      ) : (
        <Typography variant='h4'>
          <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
        </Typography>
      )}
    </Box>
  )

  const SkeletonReportDailyAttendancesMainDeptLoading = () => (
    <Box sx={{ width: '100%' }}>
      {reportDailyMainDeptAttendances.blogs ? (
        <Grid container wrap='nowrap'>
          <Grid item xs={12} md={12} lg={12}>
            <DashboardStrDateContext.Provider value={strDate}>
              <TableReportDailyMainDeptAttendance />
            </DashboardStrDateContext.Provider>
          </Grid>
        </Grid>
      ) : (
        <Typography variant='h4'>
          <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
        </Typography>
      )}
    </Box>
  )

  const SkeletonReportDailyAttendancesDeptLoading = () => (
    <Box sx={{ width: '100%' }}>
      {reportDailyDeptAttendances.blogs ? (
        <Grid container wrap='nowrap'>
          <Grid item xs={12} md={12} lg={12}>
            <DashboardStrDateContext.Provider value={strDate}>
              <TableReportDailyDeptAttendance />
            </DashboardStrDateContext.Provider>
          </Grid>
        </Grid>
      ) : (
        <Typography variant='h4'>
          <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
        </Typography>
      )}
    </Box>
  )

  const SkeletonReportMonthlyStaffAttendancesLoading = () => (
    <Box sx={{ width: '100%' }}>
      {reportMonthlyStaffAttendances.blogs ? (
        <Grid container wrap='nowrap'>
          <Grid item xs={12} md={12} lg={12}>
            <DashboardStrDateContext.Provider value={strDate}>
              <DashboardCidContext.Provider value={cid}>
                <TableReportMonthlyStaffAttendance />
              </DashboardCidContext.Provider>
            </DashboardStrDateContext.Provider>
          </Grid>
        </Grid>
      ) : (
        <Typography variant='h4'>
          <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
        </Typography>
      )}
    </Box>
  )

  return (
    <Grid container spacing={6}>
      <Grid container item></Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>ที่</TableCell>
                <TableCell align='center'>กลุ่มงาน</TableCell>
                <TableCell align='center'>จำนวนสแกนทำงาน</TableCell>
                <TableCell align='center'>ตรงเวลา</TableCell>
                <TableCell align='center'>สาย</TableCell>
                <TableCell align='center'>ลา</TableCell>
                <TableCell align='center'>จัดการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sumDailyReportAttendance.blogs
                .slice(pg * rpg, pg * rpg + rpg)
                .map(row => (
                  <TableRow key={row.attendanceId}>
                    <TableCell align='center' component='th' scope='row'>
                      {i++}
                    </TableCell>
                    <TableCell>{row.mainDeptName}</TableCell>
                    <TableCell align='center'>{row.totalAttendance}</TableCell>
                    <TableCell align='center'>{row.totalPunctual}</TableCell>
                    <TableCell align='center'>{row.totalLate}</TableCell>
                    <TableCell align='center'>N/A</TableCell>
                    <TableCell align='center' color='success'>
                      {/* <Link href={`../../loan/${row.nationalId}/${row.loanId}`} color='success'> */}
                      <Button type='button' variant='outlined'>
                        แสดงรายละเอียด
                      </Button>
                      {/* </Link> */}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12}>

        {userRoleId == 1 || userRoleId == 3 || userRoleId == 10 ? //superadmin,director,hr
          <SkeletonReportDailyAttendancesLoading />
          :
          <Grid />
        }
      </Grid>
      <Grid item xs={12}>
        {userRoleId == 1 || userRoleId == 4 ? //superadmin, manager
          <SkeletonReportDailyAttendancesMainDeptLoading />
          :
          <Grid />
        }
      </Grid>
      <Grid item xs={12}>
        {userRoleId == 1 || userRoleId == 8 ? //superadmin, head dept
          <SkeletonReportDailyAttendancesDeptLoading />
          :
          <Grid />
        }
      </Grid>
      <Grid item xs={12}>
        {userRoleId == 1 || userRoleId == 7 ? //superadmin, head dept
          <SkeletonReportMonthlyStaffAttendancesLoading />
          :
          <Grid />
        }
      </Grid>

    </Grid>
  )
}

export default Dashboard
