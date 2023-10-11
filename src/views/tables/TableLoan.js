// ** MUI Imports
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
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
import Grid from '@mui/material/Grid'
import TextField  from "@mui/material/TextField";
import TablePagination from "@mui/material/TablePagination"

const TableLoan = () => {
    
    const [loans, setLoans] = useState({ blogs: [] })
    const { register } = useForm();
    const [search, setSearch] = useState('')
    const i = 1;
  
    const [pg, setpg] = React.useState(0);
    const [rpg, setrpg] = React.useState(10);
  
    function handleChangePage(event, newpage) {
        setpg(newpage);
    }
  
    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    }

    const fetchLoans = async () => {
        let uri = apiConfig.baseURL + `/loans/active`
        console.log(uri)
        try {
        const { data } = await axios.get(uri)
        console.log(data)
        setLoans({ blogs: data })
        } catch (error) {
        console.log(error)
        }
    }

  useEffect(() => {
    fetchLoans()
  }, [])

  return (
    <Card>
      <CardHeader title='รายการกู้สวัสดิการ' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
      <Grid item xs={12} md={12} lg={12}>
          <form noValidate autoComplete='off'>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField fullWidth label='ค้นหาสมาชิก' placeholder='ค้นหาสมาชิก' {...register('search', {
                    onChange: (e) => {setSearch(e.target.value)},
                    onBlur: (e) => {},
                  })} />
                </Grid>
              </Grid>
          </form>
        </Grid>
        <Divider sx={{ margin: 0, mt:5 }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>ที่</TableCell>
                <TableCell align='center'>ชื่อ-สกุล</TableCell>
                <TableCell align='center'>ตำแหน่ง</TableCell>
                <TableCell align='center'>ประเภทสวัสดิการ</TableCell>
                <TableCell align='center'>วันที่อนุมัติ</TableCell>
                <TableCell align='center'>เดือนที่เริ่ม</TableCell>
                <TableCell align='center'>เดือนที่สิ้นสุด</TableCell>
                <TableCell align='center'>คงเหลือ</TableCell>
                <TableCell align='center'>จัดการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            { loans.blogs.filter((row)=>{
                return search.toLowerCase() === '' ? row : row.memberName.toLowerCase().includes(search);
              }).slice(pg * rpg, pg *
                rpg + rpg).map(row => (
                <TableRow key={row.loanId}>
                  <TableCell align='center' component='th' scope='row'>
                  {i++}
                  </TableCell>
                  <TableCell>{row.memberName}</TableCell>
                  <TableCell>{row.positionName}</TableCell>
                  <TableCell align='center' color='success'>{row.loanTypeName} ({row.loanAmount})</TableCell>
                  <TableCell align='center'>{moment(row.approvedAt).add(543, 'year').format('DD/MM/YYYY')}</TableCell>
                  <TableCell align='center'>{moment(row.startLoanDate).add(543, 'year').format('MM/YYYY')}</TableCell>
                  <TableCell align='center'>{moment(row.endLoanDate).add(543, 'year').format('MM/YYYY')}</TableCell>
                  <TableCell align='center' color='success'>{row.loanBalance}</TableCell>
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
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={loans.blogs.length}
          rowsPerPage={rpg}
          page={pg}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  )
}

export default TableLoan
