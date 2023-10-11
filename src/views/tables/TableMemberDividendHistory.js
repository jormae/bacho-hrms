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

import { DividendHistoryContext } from 'src/pages/staff/[cid]'

const TableMemberDividendHistory = () => {
  const memberDividendHistories = useContext(DividendHistoryContext)

  return (
    <Card>
      <CardHeader title='ประวัติการกู้เงินสวัสดิการ' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>วันที่</TableCell>
                <TableCell align='center'>ปีที่ปันผล</TableCell>
                <TableCell align='center'>จำนวนเงิน</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {memberDividendHistories.blogs.map(row => (
                <TableRow key={row.dividendId}>
                  <TableCell align='center' component='th' scope='row'>
                    {moment(row.insertAt).add(543,'year').format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell align='center'>{row.year+543}</TableCell>
                  <TableCell align='center'>{row.dividendAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default TableMemberDividendHistory
