// ** React Imports
import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import THBText from 'thai-baht-text' 
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Autocomplete from '@mui/material/Autocomplete';
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'
import Divider from '@mui/material/Divider'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
// ** Icons Imports
import SaveIcon from '@material-ui/icons/Save'
import LoadingButton from '@mui/lab/LoadingButton'
import moment from 'moment'
import 'moment/locale/th'
import { LoanContext } from 'src/pages/loan/[nationalId]/[loanId]'

const FormLoanAgreement = () => {

    const router = useRouter()
    if (router.isReady) {
      router.query.nationalId
    }

    moment.locale('th')
    console.log(moment().format('LL'))
    const [loanDetail, setLoanDetail] = useState()
    const [loanAgreementDetail, setLoanAgreementDetail] = useState()
    const userName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null
    const memberRoleId = typeof window !== 'undefined' ? localStorage.getItem('memberRoleId') : null
    console.log(loanDetail)
    // console.log(loanAgreementDetail)
  const fetchLoanDetail = async () => {
    let uri = apiConfig.baseURL + `/loans/request/${router.query.nationalId}/${router.query.loanId}`
    console.log(uri)
    try{
    const res = await axios.get(uri)
    console.log(res.data[0])
    setLoanDetail(res.data[0])
    } catch (error) {
      console.log(error)
    }
  }

  const fetchLoanAgreementDetail = async () => {
    let uri = apiConfig.baseURL + `/utils/loan-month-range/${router.query.loanId}`
    console.log(uri)
    try{
    const res = await axios.get(uri)
    console.log(res.data[0])
    setLoanAgreementDetail(res.data[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      router.query
      fetchLoanDetail()
      fetchLoanAgreementDetail()
    }
  }, [router.isReady, router.query])

  const getPlansContent = (loanAgreementDetail) => {
    let content = [];
    let approvedAt = loanDetail?.loanApprovedAt
    let startLoanDate = moment(loanDetail?.startLoanDate).add(1, 'months').format('DD/MM/YYYY')
    let principle = loanDetail?.principle;
    let monthlyProfit = loanDetail?.monthlyProfit;
    let monthlyPayment = loanDetail?.monthlyPayment;
    let j = loanDetail?.loanAmount + principle;
    let k = 0;
    let balance = 0;
    console.log('startLoanDate : '+startLoanDate)
    for (let i = 1; i <=loanDetail?.loanDurationInMonth; i++) {
      const item = i;
      j = j - principle;
      balance = j - principle;
     
      content.push(
      <TableRow key={item.i}>
        <TableCell align='center' component='th' scope='row' sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
         {i}
        </TableCell>
        <TableCell align='center' component='th' scope='row' sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
          {moment(startLoanDate).add(i, 'months').format('MM')+'/'+moment(startLoanDate).add(543, 'years').format('YYYY')}
        </TableCell>
        <TableCell align='center' sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
         {loanDetail?.loanMainTypeId == 1 ? '' : principle}
        </TableCell>
        <TableCell align='center' sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
         {monthlyProfit}
        </TableCell>
        <TableCell align='center' sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
         {monthlyPayment}
        </TableCell>
        <TableCell align='center' sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
         {balance}
        </TableCell>
      </TableRow>
      );
    }
    return content;
  }
  
  return (

          <Grid container spacing={2} sx={{pl: 15, pr:15}}>
            <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                component="img"
                sx={{
                  height: 150,
                  width: 200
                }}
                alt="The house from the offer."
                src='/images/logos/DTWF.png'
              />
            </Grid>
            <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h5' sx={{ marginBottom: 1}}>
                กลุ่มสวัสดิการครูดารุสสาลาม
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h6' sx={{ marginBottom: 1 }}>
                หนังสือสัญญา
                </Typography>
            </Grid>
              <Grid item xs={7} sx={{ display: 'flex', justifyContent: 'left' }}>
                <Typography variant='body2'>หนังสือสัญญาที่ {loanDetail?.refId}</Typography>
              </Grid>
              <Grid item xs={5} sx={{ display:'flex', justifyContent: 'right'}}>
                <Grid item xs={12}>
                  <Typography variant='body2'>โรงเรียนดารุสสาลาม เลขที่ 7 ถ.เทศบาล 8</Typography>
                  <Typography variant='body2'>ต.ตันหยงมัส อ.ระแงะ จ.นราธิวาส 96130</Typography>
                  <Typography variant='body2'>วันที่  {moment().format('DD')} เดือน {moment().format('MMMM')} พ.ศ.  {moment().add(543,'year').format('YYYY')}</Typography>
                </Grid>
              </Grid>
            <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'left' }}>
                <Typography variant='body2' sx={{lineHeight:2, justifyContent:'justify'}} paragraph="true">
                ข้าพเจ้า (นาย, นาง, นางสาว) {loanDetail?.memberName} ที่อยู่ {loanDetail?.houseNo} ถ.{loanDetail?.streetName ?? '-'} ม.{loanDetail?.villageNo} ต.{loanDetail?.subDistrict} อ.{loanDetail?.district} จ.{loanDetail?.province} รหัสไปรษณีย์ {loanDetail?.postCode}   
                &nbsp;ได้รับเงินสวัสดิการ{loanDetail?.loanMainTypeId == 1 ? 'ฉุกเฉิน' : 'สามัญ'} กลุ่มสวัสดิการครูดารุสสาลาม จำนวน {loanDetail?.loanAmount} บาท ({THBText(loanDetail?.loanAmount)}) โดยกำหนดชำระดังต่อไปนี้
                </Typography>
            </Grid>
        <Grid item xs={12} sx={{ml:-8}}>
        <TableContainer sx={{ml:12}}>
          <Table style={{width:'100%'}} sx={{  border: "1px solid rgba(224, 224, 224, 1)" }} aria-label='simple table' size='small'>
            <TableHead>
              <TableRow>
                <TableCell align='center' sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}><Typography variant='body2'>งวดที่</Typography></TableCell>
                <TableCell align='center' sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}><Typography variant='body2'>วันที่</Typography></TableCell>
                <TableCell align='center' sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}><Typography variant='body2'>เงินต้นที่จ่ายต่อเดือน</Typography></TableCell>
                <TableCell align='center' sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}><Typography variant='body2'>กำไรต่เดือน</Typography></TableCell>
                <TableCell align='center' sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}><Typography variant='body2'>เงินที่ต้องจ่ายต่อเดือน</Typography></TableCell>
                <TableCell align='center' sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}><Typography variant='body2'>คงเหลือ</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {getPlansContent()}
            </TableBody>
          </Table>
        </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body2'>ข้าพเจ้ายินยอมให้ทางโรงเรียนหักเงินเดือนของข้าพเจ้าตามตารางที่กำหนดข้างต้น</Typography>
        </Grid>
        {loanDetail?.loanTypeId > 2 ? (
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', mt:5}}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ display: 'flex', justifyContent: 'center'}}>คำยินยอมของคู่สมรส</Typography>
                <Typography variant='body2'>ข้าพเจ้า (นาย นาง นางสาว) {loanDetail?.spouseName}</Typography>
                <Typography variant='body2'>เลขประจำตัวประชาชน {loanDetail?.spouseNationalId}</Typography>
                <Typography variant='body2'>รับทราบและยินยอมภาระผูกพันธ์หนี้สินของ</Typography>
                <Typography variant='body2'> (นาย นาง นางสาว) {loanDetail?.memberName}</Typography>
                <Typography variant='body2'>ตามหนังสือสัญญาเลขที่ {loanDetail?.refId}</Typography>
                <Typography variant='body2'>ลงวันที่ {moment(loanDetail?.loanApprovedAt).add(543,'year').format('DD/MM/YYYY')}</Typography>
                <Typography variant='body2'>ลงชื่อ......................................คู่สมรส</Typography>
                <Typography variant='body2'  sx={{ display: 'flex', pl:10}}>( {loanDetail?.spouseName} )</Typography>
              </Grid>
            </Grid>
             ) : (<Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', mt:5}} />)
            }
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', mt:5}}>
              <Grid item xs={12}>
                <Typography variant='body2'>ลงชื่อ......................................ผู้รับสวัสดิการฯ</Typography>
                <Typography variant='body2' sx={{ display: 'flex', pl:10}}>( {loanDetail?.memberName} )</Typography>
                <Typography variant='body2'>ลงชื่อ......................................ผู้จ่ายเงิน</Typography>
                <Typography variant='body2'>( .............................................. )</Typography>
                <Typography variant='body2'>ลงชื่อ......................................พยาน</Typography>
                <Typography variant='body2'>( .............................................. )</Typography>
                <Typography variant='body2'>ลงชื่อ......................................พยาน</Typography>
                <Typography variant='body2'>( .............................................. )</Typography>
              </Grid>
            </Grid>
        </Grid>
       
  )
}

export default FormLoanAgreement
