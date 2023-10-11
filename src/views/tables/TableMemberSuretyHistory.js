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
import moment from 'moment'

import { SuretyHistoryContext } from 'src/pages/staff/[cid]'

const TableMemberSuretyHistory = () => {

  const memberSuretyHostories = useContext(SuretyHistoryContext)
  
  return (
    <Card>
      <CardHeader title='ประวัติการค้ำประกัน' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>วันที่</TableCell>
                <TableCell align='center'>ชื่อผู้กู้</TableCell>
                <TableCell align='center'>ประเภทสวัสดิการ</TableCell>
                <TableCell align='center'>จำนวนเงิน</TableCell>
                <TableCell align='center'>ชำระรายเดือน</TableCell>
                <TableCell align='center'>ระยะเวลา(เดือน)</TableCell>
                <TableCell align='center'>ยอดชำระคงเหลือ</TableCell>
                <TableCell align='center'>สถานะ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {memberSuretyHostories.blogs.map(row => (
                <TableRow key={row.loanId}>
                  <TableCell align='center' component='th' scope='row'>
                    {moment(row.approvedAt).add(543,'year').format('DD/MM/YYYY HH:mm:ss')}
                  </TableCell>
                  <TableCell align='left'>{row.memberName}</TableCell>
                  <TableCell align='center'>{row.loanTypeName}</TableCell>
                  <TableCell align='center'>{row.loanAmount}</TableCell>
                  <TableCell align='center'>{row.monthlyPayment}</TableCell>
                  <TableCell align='center'>{row.loanDurationInMonth}</TableCell>
                  <TableCell align='center'>{row.loanBalance}</TableCell>
                  <TableCell align='center'>{row.loanStatusName}</TableCell>
                </TableRow>
              ))} 
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default TableMemberSuretyHistory
