// ** MUI Imports
import React, { useContext } from 'react'
import { useEffect, useState, createContext } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from "@mui/material/TablePagination"
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Link from 'next/link'
import moment from 'moment'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'

import { DataContext } from 'src/pages/staff'
import { all } from 'async'

const TableZakat = () => {

    const [zakats, setZakats] = useState({ blogs: [] })
    const memberName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null
    console.log(zakats)
    const fetchZakats = async () => {
      let uri = apiConfig.baseURL + `/zakats`
      console.log(uri)
      try {
        const { data } = await axios.get(uri)
        setZakats({ blogs: data })
      } catch (error) {
        console.log(error)
      }
    }
  
    useEffect(() => {
        fetchZakats()
    }, [])

  return (
    <Card>
      <CardHeader title='รายการซากาตทั้งหมด' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>ที่</TableCell>
                <TableCell align='center'>วันที่</TableCell>
                <TableCell align='center'>ประเภทซากาต</TableCell>
                <TableCell align='center'>ชื่อซากาต</TableCell>
                <TableCell align='center'>จำนวนเงิน</TableCell>
                <TableCell align='center'>จัดการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {zakats.blogs.map(row => (
                <TableRow key={row.zakatId}>
                  <TableCell align='center' component='th' scope='row'>
                  {row.zakatId}
                  </TableCell>
                  <TableCell align='center'> {moment(row.zakatDateTime).add(543, 'year').format('DD/MM/YYYY')}</TableCell>
                  <TableCell align='center'>{row.zakatTypeName}</TableCell>
                  <TableCell align='center'>{row.zakatName}</TableCell>
                  <TableCell align='center'>{row.zakatAmount}</TableCell>
                  <TableCell align='center'>
                    <Link href={`zakat/${row.zakatId}`} color='warning'>
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

export default TableZakat
