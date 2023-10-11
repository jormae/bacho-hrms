// ** MUI Imports
import { useEffect, useState } from 'react'
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
import { SummaryContext } from 'src/pages/reports/yearly/summary/index'

const TableReportYearlySummary = () => {
    
    const summaryReports = useContext(SummaryContext)

    const year = moment().add(543, 'year').format('YYYY')

  return (
    <Card>
      <CardHeader title={`รายงานสรุปกำไรรายปี ${year}`} titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>ที่</TableCell>
                <TableCell align='center'>เดือน-ปี</TableCell>
                <TableCell align='center'>กำไร</TableCell>
                <TableCell align='center'>จัดการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { summaryReports.blogs.map((row, i) => (
                <TableRow key={i+1}>
                  <TableCell align='center' component='th' scope='row'>
                  {i+1}
                  </TableCell>
                  <TableCell align='center' >{row.loanPaymentMonth}</TableCell>
                  <TableCell align='center'>{row.TOTAL_PAYMENT}</TableCell>
                  <TableCell align='center'>
                    <Link href={`loan/${row.nationalId}/${row.loanId}`} color='success'>
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
      </CardContent>
    </Card>
  )
}

export default TableReportYearlySummary
