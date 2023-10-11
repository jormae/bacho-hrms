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
import toast, { Toaster } from 'react-hot-toast'

import 'moment/locale/th'  // without this line it didn't work
import { colors } from '@mui/material'

import { DebtContext} from 'src/pages/debt'

import { StrDateContext} from 'src/pages/debt'

const TableDebt = () => {

    // const debts = useContext(DebtContext)
    const strDate = useContext(StrDateContext)

    


    moment.locale('th')

    const [date, setDate]= useState(moment().format('YYYY-MM'))
    console.log(date)

    const [debts, setDebts] = useState({ blogs: [] })
    // const [loading, setLoading] = React.useState(false)
    const memberName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null
    // console.log(debts)

    const fetchDebts = async () => {
    //   let uri = apiConfig.baseURL + `/debts/date/${date}`
      console.log('fetch debt after delete')
    const date2 = moment().format('YYYY-MM')
    // console.log('date2 = '+date2)

    let uri = apiConfig.baseURL + `/debts/date/${date2}`
      try {
        const { data } = await axios.get(uri)
        setDebts({ blogs: data })
      } catch (error) {
        console.log(error)
      }
    }

    const deleteDebt = debtId => {
      // setLoading(true)
      console.log('deleteDebt')
      console.log(debtId)
  
      let uri = apiConfig.baseURL + `/debts/${debtId}`
      console.log(uri)
  
      fetch(uri, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify(debtId)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          // setLoading(false)
          if (data.status == 'success') {
            toast.success(data.message)
            fetchDebts();
          } else {
            toast.error(data.message)
          }
        })
        .catch(function (error) {
          console.log(JSON.stringify(error))
        })
    }
  
    useEffect(() => {
        fetchDebts()
    }, [])

  return (
    <Card>
      <CardHeader title={`ทะเบียนหนี้ประจำเดือน ${strDate}`} titleTypographyProps={{ variant: 'h6' }} />
      <Toaster />

      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>ที่</TableCell>
                <TableCell align='center'>เดือน</TableCell>
                <TableCell align='center'>รหัสสมาชิก</TableCell>
                <TableCell align='center'>ชื่อลูกหนี้</TableCell>
                <TableCell align='center'>สามัญ</TableCell>
                <TableCell align='center'>ฉุกเฉิน</TableCell>
                <TableCell align='center'>หนี้ธนาคาร</TableCell>
                <TableCell align='center'>หนี้กยศ</TableCell>
                <TableCell align='center'>ค่าเช่าบ้าน</TableCell>
                <TableCell align='center'>เงินสมทบ</TableCell>
                <TableCell align='center'>รวมทั้งหมด</TableCell>
                <TableCell align='center'>จัดการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {debts.blogs.map(row => (
                <TableRow key={row.debtId}>

                  <TableCell align='center' component='th' scope='row'>
                  {row.debtId}
                  </TableCell>
                  <TableCell align='center'> {strDate}</TableCell>
                  <TableCell align='center'>{row.nationalId}</TableCell>
                  <TableCell align='center'>{row.memberName}</TableCell>
                  {/* <TableCell align='center'>{row.bank ?? row.bank.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</TableCell> */}
                  <TableCell align='center'>{row.debt1 ?? 0}</TableCell>
                  <TableCell align='center'>{row.debt2 ?? 0}</TableCell>
                  <TableCell align='center'>{row.bank}</TableCell>
                  <TableCell align='center'>{row.studentLoan}</TableCell>
                  <TableCell align='center'>{row.allowance}</TableCell>
                  <TableCell align='center'>{row.houseRent}</TableCell>
                  <TableCell align='center' color='danger'>{(row.houseRent + row.bank + row.studentLoan +row.allowance+ row.debt1+row.debt2)}</TableCell>
                  <TableCell align='center'>
                    {/* <Link href={`debt/${row.debtId}`} color='success'> */}
                    {row.debtId ? (
                      <Button type='button' variant='outlined' onClick={() => deleteDebt(row.debtId)}>
                        ลบ
                      </Button>
                      ) : ''}
                    {/* </Link> */}
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

export default TableDebt
