import { useEffect, useState, createContext } from 'react'
import * as React from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import apiConfig from 'src/configs/apiConfig'
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
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Link from 'next/link'
import moment from 'moment'

import TableReportMonthlyAttendanceDept from 'src/views/tables/TableReportMonthlyAttendanceDept'
import TableReportMonthlyStaffAttendance from 'src/views/tables/TableReportMonthlyStaffAttendance'

export const ReportMonthlyAttendanceDeptContext = createContext()

const FormLayouts = () => {
  const router = useRouter()
  if (router.isReady) {
    router.query.cid
    router.query.date
  }
  const { register } = useForm()

  let i = 1
  const deptId = 3
  const date = '2023-10'
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
  }, [router.isReady, router.query]) // eslint-disable-next-line react-hooks/exhaustive-deps

  const SkeletonReportMonthlyStaffAttendancesLoading = () => (
    <Box sx={{ width: '100%' }}>
      <Grid container wrap='nowrap'>
        <Grid item xs={12} md={12} lg={12}>
          {/* <DashboardStrDateContext.Provider value={strDate}> */}
          <TableReportMonthlyStaffAttendance />
          {/* </DashboardStrDateContext.Provider> */}
        </Grid>
      </Grid>
    </Box>
  )

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SkeletonReportMonthlyStaffAttendancesLoading />
      </Grid>
    </Grid>
  )
}

export default FormLayouts
