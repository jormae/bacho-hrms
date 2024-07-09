// ** MUI Imports
import React, { useEffect, useContext, useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Button from '@mui/material/Button'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'
import moment from 'moment'
import PrintIcon from '@mui/icons-material/Print'

import {
  ReportMonthlyLeaveDateContext,
  ReportMonthlyLeaveCidContext
} from 'src/pages/reports/monthly/leave/print/[cid]/[date].js'
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

const TablePrintReportMonthlyStaffLeaves = () => {
  const classes = useStyles()

  const strDate = useContext(ReportMonthlyLeaveDateContext)
  const cid = useContext(ReportMonthlyLeaveCidContext)

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  let i = 1
  const [reportMonthlyStaffLeaves, setReportMonthlyStaffLeaves] = useState({ blogs: [] })
  const [staffInfo, setStaffInfo] = useState()

  const print = `
  Typography: {
    fontSize: '16px',
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

  const staffName = staffInfo?.pname + staffInfo?.fname + ' ' + staffInfo?.lname
  const deptName = staffInfo?.deptName
  const strMonth = 'เดือน ' + moment(strDate).format('MMMM') + ' พ.ศ.' + moment(strDate).add(543, 'year').format('YYYY')

  const fetchMonthlyStaffLeaves = async () => {
    let uri = apiConfig.baseURL + `/reports/monthly/leaves/${cid}/${strDate}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setReportMonthlyStaffLeaves({ blogs: data })
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
    fetchMonthlyStaffLeaves()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div ref={printRef}>
        <Typography align='center' style={{ color: 'black', fontSize: '18px', marginTop: '40px' }}>
          รายการลาปฏิบัติงาน ประจำ{strMonth}
        </Typography>
        <Typography align='center' style={{ color: 'black', fontSize: '18px', paddingBottom: '0px' }}>
          {staffName}
        </Typography>
        <Typography align='center' style={{ color: 'black', fontSize: '18px', paddingBottom: '20px' }}>
          {staffInfo?.positionName} - {deptName}
        </Typography>
        <Table className={classes.table} size='small'>
          <TableHead>
            <TableRow style={{ backgroundColor: '#dedede' }}>
              <TableCell align='center'>
                <Typography className={classes.Typography}>ที่</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography className={classes.Typography}> วันที่</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography className={classes.Typography}> จำนวนวันลา</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography className={classes.Typography}> ประเภทการลา</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography className={classes.Typography}> หมายเหตุ</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportMonthlyStaffLeaves.blogs.map((row, index) => (
              <TableRow key={index}>
                <TableCell align='center' component='th' scope='row'>
                  <Typography className={classes.Typography}>{i++}</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography className={classes.Typography}>
                    {moment(row.leaveStartDate).add(543, 'year').format('DD/MM/YYYY')} -{' '}
                    {moment(row.leaveEndDate).add(543, 'year').format('DD/MM/YYYY')}
                  </Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography className={classes.Typography}>{row.totalLeaveDays}</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography className={classes.Typography}>{row.leaveMainTypeName}</Typography>
                </TableCell>
                <TableCell align='left'>
                  <Typography className={classes.Typography}>{row.leaveReason}</Typography>
                </TableCell>
              </TableRow>
            ))}
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
        พิมพ์รายการลา
      </Button>
    </div>
  )
}

export default TablePrintReportMonthlyStaffLeaves
