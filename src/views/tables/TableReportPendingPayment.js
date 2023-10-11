// ** MUI Imports
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
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
import Grid from '@mui/material/Grid'
import TextField  from "@mui/material/TextField";
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'
import moment from 'moment'

import { PendingPaymentContext, StrDateContext } from 'src/pages/reports/monthly/welfare-payment/index'
import { DashboardPendingPaymentContext, DashboardStrDateContext} from 'src/pages/index'

const TableReportPendingPayment = () => {

    const pendingPaymentReports = useContext(PendingPaymentContext)
    const dashboardPendingPaymentReports = useContext(DashboardPendingPaymentContext)
    const strDate = useContext(StrDateContext)
    const dashboardStrDate = useContext(DashboardStrDateContext)
    const pendingDataTable = pendingPaymentReports ?? dashboardPendingPaymentReports;
    const pendingStrDate = strDate ?? dashboardStrDate;
    
   
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

    
  return (
    <Card>
      <CardHeader title={`รายการรอชำระเงินสวัสดิการประจำเดือน ${pendingStrDate}`}  titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
      <Grid item xs={12} md={12} lg={12}>
          <form noValidate autoComplete='off'>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField fullWidth label='ค้นหาสมาชิกรอชำระเงินสวัสดิการ' placeholder='ค้นหาสมาชิกรอชำระเงินสวัสดิการ' {...register('search', {
                    onChange: (e) => {setSearch(e.target.value)},
                    onBlur: (e) => {},
                  })} />
                </Grid>
              </Grid>
          </form>
        </Grid>
        <Divider sx={{ margin: 0, mt:5 }} />
        <TableContainer component={Paper}>
          <Table  sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>ลำดับ</TableCell>
                <TableCell align='center'>ชื่อ-สกุล</TableCell>
                <TableCell align='center'>ตำแหน่ง</TableCell>
                <TableCell align='center'>ประเภทสวัสดิการ</TableCell>
                <TableCell align='center'>งวดที่</TableCell>
                <TableCell align='center'>ยอดคงเหลือ</TableCell>
                <TableCell align='center'>ยอดที่ต้องชำระ</TableCell>
                <TableCell align='center'>จัดการ</TableCell> 
              </TableRow>
            </TableHead>
            <TableBody>
                { pendingDataTable.blogs.filter((row)=>{
                  return search.toLowerCase() === '' ? row : row.memberName.toLowerCase().includes(search);
                }).slice(pg * rpg, pg *
                  rpg + rpg).map(row => (
                <TableRow key={row.loanId}>
                  <TableCell align='center' component='th' scope='row'>
                  {i++}
                  </TableCell>
                  <TableCell>{row.memberName}</TableCell>
                  <TableCell >{row.positionName}</TableCell>
                  <TableCell align='center' >{row.loanTypeName} ({row.loanAmount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')})</TableCell>
                  <TableCell color='success' align='center'>{row.monthNo}</TableCell>
                  <TableCell color='success' align='center'>{row.loanBalance}</TableCell>
                  <TableCell align='center' color='success'>{row.monthlyPayment}</TableCell>
                  <TableCell align='center' color='success'>
                    <Link href={`../../loan-payment/${row.nationalId}/${row.loanId}`} color='success'>
                      <Button type='button' variant='outlined'>
                        ชำระ
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
          count={pendingDataTable.blogs.length}
          rowsPerPage={rpg}
          page={pg}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  )
}

export default TableReportPendingPayment
