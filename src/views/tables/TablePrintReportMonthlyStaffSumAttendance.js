// ** MUI Imports
import React, { useEffect, useContext, useState, useRef, Component } from 'react'
import ReactToPrint, { useReactToPrint } from 'react-to-print'
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
import PrintIcon from '@mui/icons-material/Print'
import Skeleton from '@mui/material/Skeleton'

import { DashboardStrDateContext, DashboardCidContext } from 'src/pages/index'
import {
  ReportMonthlyAttendanceDateContext,
  ReportMonthlyAttendanceCidContext
} from 'src/pages/reports/monthly/attendance/print/[cid]/[date].js'
import { Typography } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  Typography: {
    fontSize: '16px',
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
      fontSize: '16px',
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

const TablePrintReportMonthlyStaffSumAttendance = () => {
  const classes = useStyles()

  const strDate = useContext(ReportMonthlyAttendanceDateContext)
  const cid = useContext(ReportMonthlyAttendanceCidContext)

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  let i = 1
  const [reportMonthlyStaffAttendances, setReportMonthlyStaffAttendances] = useState({ blogs: [] })
  const [staffInfo, setStaffInfo] = useState()
  const [countMonthlyStaffAttendance, setCountMonthlyStaffAttendance] = useState({ blogs: [] })
  const staffName = staffInfo?.pname + staffInfo?.fname + ' ' + staffInfo?.lname
  const deptName = staffInfo?.deptName
  const strMonth = 'เดือน ' + moment(strDate).format('MMMM') + ' พ.ศ.' + moment(strDate).add(543, 'year').format('YYYY')

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

  const fetchMonthlyStaffAttendances = async () => {
    let uri = apiConfig.baseURL + `/reports/monthly/sum-attendances/${cid}/${strDate}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setReportMonthlyStaffAttendances({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCountMonthlyStaffAttendances = async () => {
    let uri = apiConfig.baseURL + `/reports/monthly/count-attendances/${cid}/${strDate}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setCountMonthlyStaffAttendance({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchStaffInfo = async () => {
    let uri = apiConfig.baseURL + `/staff/${cid}/`
    console.log(uri)
    try {
      const { data } = await axios.get(uri, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      })
      setStaffInfo(data[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchStaffInfo()
    fetchCountMonthlyStaffAttendances()
    fetchMonthlyStaffAttendances()

    // handlePrint()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
      </TableRow>
    ))
  }

  return (
    <div>
      <div ref={printRef}>
        <Typography align='center' style={{ color: 'black', fontSize: '18px', marginTop: '40px' }}>
          รายงานลงเวลาปฏิบัติงาน ประจำ{strMonth}
        </Typography>
        <Typography align='center' style={{ color: 'black', fontSize: '18px', paddingBottom: '0px' }}>
          {staffName}
        </Typography>
        <Typography align='center' style={{ color: 'black', fontSize: '18px', paddingBottom: '20px' }}>
          {staffInfo?.positionName} - {deptName}
        </Typography>
        <Table className={classes.table} width='1024' size='small'>
          <TableHead>
            <TableRow style={{ backgroundColor: '#dedede' }}>
              <TableCell align='center'>วันที่</TableCell>
              <TableCell align='center'>วัน</TableCell>
              {countMonthlyStaffAttendance.blogs[0]?.attendanceShift1 > 0 ? (
                <TableCell align='center'>เวรเช้า</TableCell>
              ) : (
                ''
              )}
              {countMonthlyStaffAttendance.blogs[0]?.attendanceShift2 > 0 ? (
                <TableCell align='center'>เวร DAY 4</TableCell>
              ) : (
                ''
              )}
              {countMonthlyStaffAttendance.blogs[0]?.attendanceShift3 > 0 ? (
                <TableCell align='center'>เวร DAY</TableCell>
              ) : (
                ''
              )}
              {countMonthlyStaffAttendance.blogs[0]?.attendanceShift4 > 0 ? (
                <TableCell align='center'>เวร NIGHT</TableCell>
              ) : (
                ''
              )}
              {countMonthlyStaffAttendance.blogs[0]?.attendanceShift5 > 0 ? (
                <TableCell align='center'>เวรเช้าครึ่งวัน</TableCell>
              ) : (
                ''
              )}
              {countMonthlyStaffAttendance.blogs[0]?.attendanceShift6 > 0 ? (
                <TableCell align='center'>บ่าย-ดึก</TableCell>
              ) : (
                ''
              )}
              {countMonthlyStaffAttendance.blogs[0]?.attendanceShift7 > 0 ? (
                <TableCell align='center'>บ่าย-เที่ยงคืน</TableCell>
              ) : (
                ''
              )}
              {countMonthlyStaffAttendance.blogs[0]?.attendanceShift8 > 0 ? (
                <TableCell align='center'>เวร 24 ชั่วโมง</TableCell>
              ) : (
                ''
              )}
              {countMonthlyStaffAttendance.blogs[0]?.attendanceShift9 > 0 ? (
                <TableCell align='center'>เวรหัวรุ่ง 1</TableCell>
              ) : (
                ''
              )}
              {countMonthlyStaffAttendance.blogs[0]?.attendanceShift10 > 0 ? (
                <TableCell align='center'>เวรหัวรุ่ง 2</TableCell>
              ) : (
                ''
              )}
              {/* <TableCell align='center'>รายการลา</TableCell> */}
              <TableCell align='center'>หมายเหตุ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!reportMonthlyStaffAttendances.blogs[0] ? (
              <TableRowsLoader rowsNum={5} />
            ) : (
              reportMonthlyStaffAttendances.blogs.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align='center'>
                    <Typography className={classes.Typography}>
                      {moment(row.attendanceDate).add(543, 'year').format('DD/MM/YYYY')}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography className={classes.Typography}> {moment(row.attendanceDate).format('dddd')}</Typography>
                  </TableCell>

                  {countMonthlyStaffAttendance.blogs[0]?.attendanceShift1 > 0 ? (
                    <TableCell align='center'>
                      <Typography className={classes.Typography}>
                        {row.checkinShift1} - {row.checkoutShift1}
                      </Typography>
                    </TableCell>
                  ) : (
                    ''
                  )}
                  {countMonthlyStaffAttendance.blogs[0]?.attendanceShift2 > 0 ? (
                    <TableCell align='center'>
                      <Typography className={classes.Typography}>
                        {row.checkinShift2} - {row.checkoutShift2}
                      </Typography>
                    </TableCell>
                  ) : (
                    ''
                  )}
                  {countMonthlyStaffAttendance.blogs[0]?.attendanceShift3 > 0 ? (
                    <TableCell align='center'>
                      <Typography className={classes.Typography}>
                        {row.checkinShift3} - {row.checkoutShift3}
                      </Typography>
                    </TableCell>
                  ) : (
                    ''
                  )}
                  {countMonthlyStaffAttendance.blogs[0]?.attendanceShift4 > 0 ? (
                    <TableCell align='center'>
                      <Typography className={classes.Typography}>
                        {row.checkinShift4} - {row.checkoutShift4}
                      </Typography>
                    </TableCell>
                  ) : (
                    ''
                  )}
                  {countMonthlyStaffAttendance.blogs[0]?.attendanceShift5 > 0 ? (
                    <TableCell align='center'>
                      <Typography className={classes.Typography}>
                        {row.checkinShift5} - {row.checkoutShift5}
                      </Typography>
                    </TableCell>
                  ) : (
                    ''
                  )}
                  {countMonthlyStaffAttendance.blogs[0]?.attendanceShift6 > 0 ? (
                    <TableCell align='center'>
                      <Typography className={classes.Typography}>
                        {row.checkinShift6} - {row.checkoutShift6}
                      </Typography>
                    </TableCell>
                  ) : (
                    ''
                  )}
                  {countMonthlyStaffAttendance.blogs[0]?.attendanceShift7 > 0 ? (
                    <TableCell align='center'>
                      <Typography className={classes.Typography}>
                        {row.checkinShift7} - {row.checkoutShift7}
                      </Typography>
                    </TableCell>
                  ) : (
                    ''
                  )}
                  {countMonthlyStaffAttendance.blogs[0]?.attendanceShift8 > 0 ? (
                    <TableCell align='center'>
                      <Typography className={classes.Typography}>
                        {row.checkinShift8} - {row.checkoutShift8}
                      </Typography>
                    </TableCell>
                  ) : (
                    ''
                  )}
                  {countMonthlyStaffAttendance.blogs[0]?.attendanceShift9 > 0 ? (
                    <TableCell align='center'>
                      <Typography className={classes.Typography}>
                        {row.checkinShift9} - {row.checkoutShift9}
                      </Typography>
                    </TableCell>
                  ) : (
                    ''
                  )}
                  {countMonthlyStaffAttendance.blogs[0]?.attendanceShift10 > 0 ? (
                    <TableCell align='center'>
                      <Typography className={classes.Typography}>
                        {row.checkinShift10} - {row.checkoutShift10}
                      </Typography>
                    </TableCell>
                  ) : (
                    ''
                  )}
                  {/* <TableCell align='center'>{row.leaveTitle}{row.outStation ? "ราชการนอกสถานที่" : ""}</TableCell> */}
                  <TableCell align='center'>
                    <Typography className={classes.Typography}>
                      {row.leaveTitle}
                      {row.outStation ? 'ราชการนอกสถานที่' : ''}
                      {row.dayRemark}
                      {row.holidayRemark}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <Button
        type='button'
        variant='outlined'
        startIcon={<PrintIcon />}
        sx={{ mt: 4, float: 'right' }}
        onClick={() => handlePrint()}
      >
        พิมพ์รายงาน
      </Button>
    </div>
  )
}

export default TablePrintReportMonthlyStaffSumAttendance
