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

const TableLoanRequest = () => {
    
    const [loanRequests, setLoanRequests] = useState({ blogs: [] })
    // const staffName = typeof window !== 'undefined' ? localStorage.getItem('staffName') : null

    const fetchLoanRequests = async () => {
        let uri = apiConfig.baseURL + `/loans/request`
        console.log(uri)
        try {
        const { data } = await axios.get(uri)
        console.log(data)
        setLoanRequests({ blogs: data })
        } catch (error) {
        console.log(error)
        }
    }

  useEffect(() => {
    fetchLoanRequests()
  }, [])

  return (

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>วันที่</TableCell>
                <TableCell align='center'>ชื่อ-สกุล</TableCell>
                <TableCell align='center'>ตำแหน่ง</TableCell>
                <TableCell align='center'>ประเภทสมาชิก</TableCell>
                <TableCell align='center'>ประเภทสวัสดิการ</TableCell>
                <TableCell align='center'>จำนวนเงิน</TableCell>
                <TableCell align='center'>จัดการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loanRequests.blogs.map(row => (
                <TableRow key={row.loanId}>
                  <TableCell align='center' component='th' scope='row'>
                  {moment(row.requestedDateTime).add(543, 'year').format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell align='center'>{row.memberName}</TableCell>
                  <TableCell align='center'>{row.positionName}</TableCell>
                  <TableCell align='center'>{row.memberTypeName}</TableCell>
                  <TableCell align='center' color='success'>{row.loanTypeName}</TableCell>
                  <TableCell align='center' color='success'>{row.loanAmount}</TableCell>
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
  )
}

export default TableLoanRequest
