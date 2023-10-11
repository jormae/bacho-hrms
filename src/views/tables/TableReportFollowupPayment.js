// ** MUI Imports
import React, { useContext } from 'react'
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
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Link from 'next/link'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'
import moment from 'moment'

import { FollowupPaymentContext } from 'src/pages/reports/monthly/welfare-payment/index'

const TableReportFollowupPayment = () => {

    const followupPaymentReports = useContext(FollowupPaymentContext)
    
  return (
    <Card>
      <CardHeader title='รายการติดตามการชำระเงินสวัสดิการประจำเดือน' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1500 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>วันที่</TableCell>
                <TableCell align='center'>ชื่อ-สกุล</TableCell>
                <TableCell align='center'>งวดที่</TableCell>
                <TableCell align='center'>ช่องทางชำระ</TableCell>
                <TableCell align='center'>ยอดชำระ</TableCell>
                <TableCell align='center'>กำไร</TableCell>
                <TableCell align='center'>วันที่ชำระ</TableCell>
                <TableCell align='center'>ผู้ชำระ</TableCell>
                <TableCell align='center'>หลักฐานการชำระ</TableCell>
                <TableCell align='center'>สถานะการชำระ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {followupPaymentReports.blogs.map(row => (
                <TableRow key={row.loanId}>
                  <TableCell align='center' component='th' scope='row'>
                  {moment(row.createdAt).add(543, 'year').format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>{row.memberName}</TableCell>
                  <TableCell >{row.monthNo}</TableCell>
                  <TableCell >{row.paymentTypeName}</TableCell>
                  <TableCell  color='success'>{row.paymentAmount}</TableCell>
                  <TableCell align='center' color='success'>{row.PROFIT}</TableCell>
                  <TableCell align='center' color='success'> {moment(row.createdAt).add(543, 'year').format('DD/MM/YYYY  hh:mm')}</TableCell>
                  <TableCell align='center' color='success'>{row.createdBy}</TableCell>
                  <TableCell align='center' color='success'>{row.paymentFilePath}</TableCell>
                  <TableCell align='center' color='success'>{row.approvedAt == null ? 'รออนุมัติ' : 'อนุมัติ'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default TableReportFollowupPayment
