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

import { InvesmentHistoryContext } from 'src/pages/staff/[cid]'
import { InvesmentPaymentHistoryContext } from 'src/pages/investment-form/[nationalId]'

const TableMemberInvestmentHistory = () => {

  const memberInvestmentHostories = useContext(InvesmentHistoryContext)
  
  const invesmentPaymentHistoryContext = useContext(InvesmentPaymentHistoryContext)

  const records = invesmentPaymentHistoryContext ?? memberInvestmentHostories

  return (
    <Card>
      <CardHeader title='ประวัติการฝาก-ถอนหุ้น' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>วันที่</TableCell>
                <TableCell align='center'>ประเภท</TableCell>
                <TableCell align='center'>จำนวนหุ้น</TableCell>
                <TableCell align='center'>ราคาต่อหน่วย</TableCell>
                <TableCell align='center'>ยอดหุ้น</TableCell>
                <TableCell align='center'>สถานะ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.blogs.map(row => (
                <TableRow key={row.investmentId}>
                  <TableCell align='center' component='th' scope='row'>
                    {moment(row.investmentDateTime).add(543,'year').format('DD/MM/YYYY HH:mm:ss')}
                  </TableCell>
                  <TableCell align='center'>{row.investmentTypeName}</TableCell>
                  <TableCell align='center'>{row.shareQuantity}</TableCell>
                  <TableCell align='center'>{row.valuePerShare}</TableCell>
                  <TableCell align='center'>{row.totalShare}</TableCell>
                  <TableCell align='center'>{row.investmentStatusName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default TableMemberInvestmentHistory
