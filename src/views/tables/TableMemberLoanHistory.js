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
import Chip from '@mui/material/Chip';

import { LoanHistoryContext } from 'src/pages/staff/[cid]'

const TableMemberLoanHistory = () => {

  const memberLoanHistories = useContext(LoanHistoryContext)

  return (
    <Card>
      <CardHeader title='ประวัติการกู้เงินสวัสดิการ' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>วันที่ส่ง</TableCell>
                <TableCell align='center'>วันที่อนุมัติ</TableCell>
                <TableCell align='center'>ประเภท</TableCell>
                <TableCell align='center'>ระยะเวลา (เดือน)</TableCell>
                <TableCell align='center'>วันที่เริ่ม</TableCell>
                <TableCell align='center'>วันที่สิ้นสุด</TableCell>
                <TableCell align='center'>จำนวนเงิน</TableCell>
                <TableCell align='center'>ยอดชำระ</TableCell>
                <TableCell align='center'>คงเหลือ</TableCell>
                <TableCell align='center'>สถานะ</TableCell>
                <TableCell align='center'>จัดการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {memberLoanHistories.blogs.map(row => (
                <TableRow key={row.loanId}>
                  <TableCell align='center' component='th' scope='row'>
                    {moment(row.requestedDateTime).add(543,'year').format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell align='center'> {moment(row.approveAt).add(543,'year').format('DD/MM/YYYY')}</TableCell>
                  <TableCell align='center'>{row.loanTypeName} ({row.loanAmount})</TableCell>
                  <TableCell align='center'>{row.loanDuration ?? '-'}</TableCell>
                  <TableCell align='center'>{row.startLoanDate ? moment(row.startLoanDate).add(543, 'year').format('DD/MM/YYYY') : '-'}</TableCell>
                  <TableCell align='center'>{row.endLoanDate ? moment(row.endLoanDate).add(543,'year').format('DD/MM/YYYY') : '-'}</TableCell>
                  <TableCell align='center'>{row.loanAmount}</TableCell>
                  <TableCell align='center' color='primary'>{row.totalPayment ?? 0}</TableCell>
                  <TableCell align='center' color='primary'>{row.loanAmount - row.totalPayment ?? 0}</TableCell>
                  <TableCell align='center'>
                    <Chip label={(row.closeLoanStatusId == 3) ? "ปิดยอดสวัสดิการ" : row.loanStatusName} color="primary" />
                  </TableCell>
                  <TableCell align='center'>
                    <Link href={`../loan/${row.nationalId}/${row.loanId}`} color='primary'>
                        <Button type='button' variant='outlined'>
                            เปิด
                        </Button>
                        </Link>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default TableMemberLoanHistory
