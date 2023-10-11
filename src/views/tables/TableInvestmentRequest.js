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

const TableInvestmentRequest = () => {
    
    const [investmentRequests, setInvestmentRequests] = useState({ blogs: [] })
    // const staffName = typeof window !== 'undefined' ? localStorage.getItem('staffName') : null

    const fetchInvestmentRequests = async () => {
        let uri = apiConfig.baseURL + `/investments/request`
        console.log(uri)
        try {
        const { data } = await axios.get(uri)
        console.log(data)
        setInvestmentRequests({ blogs: data })
        } catch (error) {
        console.log(error)
        }
    }

  useEffect(() => {
    fetchInvestmentRequests()
  }, [])

  return (

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>วันที่</TableCell>
                <TableCell align='center'>ชื่อ-สกุล</TableCell>
                <TableCell align='center'>ประเภทสมาชิก</TableCell>
                <TableCell align='center'>ประเภทคำร้อง</TableCell>
                <TableCell align='center'>จำนวนหุ้น</TableCell>
                <TableCell align='center'>ราคาต่อหน่วย</TableCell>
                <TableCell align='center'>จำนวนเงิน</TableCell>
                <TableCell align='center'>จัดการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {investmentRequests.blogs.map(row => (
                <TableRow key={row.investmentId}>
                  <TableCell align='center' component='th' scope='row'>
                  {moment(row.requestedDateTime).add(543, 'year').format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell align='center'>{row.memberName}</TableCell>
                  <TableCell align='center'>{row.memberTypeName}</TableCell>
                  <TableCell align='center'>{row.investmentTypeName}</TableCell>
                  <TableCell align='center' color='success'>{row.shareQuantity}</TableCell>
                  <TableCell align='center' color='success'>{row.valuePerShare}</TableCell>
                  <TableCell align='center' color='success'>{row.totalShare}</TableCell>
                  <TableCell align='center'>
                    <Link href={`investment-approval/${row.investmentId}`} color='success'>
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

export default TableInvestmentRequest
