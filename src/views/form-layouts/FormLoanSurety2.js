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

const FormLoanSurety1 = () => {

    const router = useRouter()
    if (router.isReady) {
      router.query.nationalId
    }

    moment.locale('th')
    console.log(moment().format('LL'))
    const [loanDetail, setLoanDetail] = useState()
    const userName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null
    const memberRoleId = typeof window !== 'undefined' ? localStorage.getItem('memberRoleId') : null

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

  useEffect(() => {
    if (router.isReady) {
      router.query
      fetchLoanDetail()
    }
  }, [router.isReady, router.query])

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
                <Typography variant='h5' sx={{ marginBottom: 1 }}>
                สัญญาค้ำประกัน
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h6' sx={{ marginBottom: 1}}>
                กลุ่มสวัสดิการครูดารุสสาลาม
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                <Typography  variant='body2'>
                วันที่  {moment().format('DD')} เดือน {moment().format('MMMM')} พ.ศ.  {moment().add(543,'year').format('YYYY')}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'left' }}>
                <Typography variant='body2' sx={{lineHeight:2, justifyContent:'justify'}} paragraph="true">
                คำให้การค้ำประกัน ข้าพเจ้า (นาย, นาง, นางสาว) {loanDetail?.secondReferenceName} เลขที่บัตรประชาชน {loanDetail?.secondReferenceId} โทรศัพท์ {loanDetail?.secondReferenceContactNo}
                &nbsp; ขอค้ำประกันเงินสวัสดิการครูดารุสสาลามของ (นาย, นาง, นางสาว) {loanDetail?.memberName} เลขที่บัตรประชาชน {loanDetail?.nationalId} 
                &nbsp; ตามหนังสือสัญญาเลขที่ {loanDetail?.refId} ลงวันที่ {moment(loanDetail?.loanApprovedAt).format('DD')} เดือน {moment(loanDetail?.loanApprovedAt).format('MMMM')} พ.ศ.  {moment(loanDetail?.loanApprovedAt).add(543,'year').format('YYYY')} ถ้าหากกองทุนสวัสดิการไม่สามารถเรียกเก็บเงินจาก
                (นาย, นาง, นางสาว) {loanDetail?.memberName} ข้าพเจ้ายินยอมชดใช้กองทุนให้ครบถ้วน</Typography>
            </Grid>
            <Grid item xs={6}/>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', mt:3}}>
                <Typography variant='body2'>ลงชื่อ......................................ผู้ค้ำประกัน</Typography>
            </Grid>
            <Grid item xs={6}/>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center'}}>
                <Typography variant='body2'>( {loanDetail?.secondReferenceName} )</Typography>
            </Grid>
            <Grid item xs={6}/>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', mt:3}}>
                <Typography variant='body2'>ลงชื่อ......................................พยาน</Typography>
            </Grid>
            <Grid item xs={6}/>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center'}}>
                <Typography variant='body2'>( .............................................. )</Typography>
            </Grid>
            <Grid item xs={6}/>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', mt:3}}>
                <Typography variant='body2'>ลงชื่อ......................................พยาน</Typography>
            </Grid>
            <Grid item xs={6}/>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center'}}>
                <Typography variant='body2'>( .............................................. )</Typography>
            </Grid>

            <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'center', mt:5 }}>
                <Typography variant='h6' sx={{ marginBottom: 1}}>
                คำยินยอมของคู่สมรสผู้ค้ำประกัน
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'left' }}>
                <Typography variant='body2' sx={{lineHeight:2, justifyContent:'justify'}} paragraph="true">
                ข้าพเจ้า (นาย, นาง, นางสาว) {loanDetail?.secondSpouseName} เลขที่บัตรประชาชน {loanDetail?.secondSpouseNationalId} โทรศัพท์ {loanDetail?.secondSpouseContactNo}
                &nbsp; คู่สมรสของ {loanDetail?.secondReferenceName} ยินยอมให้ (นาย, นาง, นางสาว) {loanDetail?.secondReferenceName} 
                &nbsp; ค้ำประกันเงินสวัสดิการสามัญ ครูดารุสสาลาม ตามหนังสือสัญญาเลขที่ {loanDetail?.refId} ลงวันที่ {moment(loanDetail?.loanApprovedAt).format('DD')} เดือน {moment(loanDetail?.loanApprovedAt).format('MMMM')} พ.ศ.  {moment(loanDetail?.loanApprovedAt).add(543,'year').format('YYYY')}
                </Typography>
            </Grid>
            <Grid item xs={6}/>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', mt:5}}>
                <Typography variant='body2'>ลงชื่อ......................................ผู้ยินยอม</Typography>
            </Grid>
            <Grid item xs={6}/>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center'}}>
                <Typography variant='body2'>( {loanDetail?.secondSpouseName} )</Typography>
            </Grid>
            <Grid item xs={6}/>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', mt:3}}>
                <Typography variant='body2'>ลงชื่อ......................................พยาน</Typography>
            </Grid>
            <Grid item xs={6}/>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center'}}>
                <Typography variant='body2'>( .............................................. )</Typography>
            </Grid>
            <Grid item xs={6}/>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', mt:3}}>
                <Typography variant='body2'>ลงชื่อ......................................พยาน</Typography>
            </Grid>
            <Grid item xs={6}/>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center'}}>
                <Typography variant='body2'>( .............................................. )</Typography>
            </Grid>

        </Grid>
       
  )
}

export default FormLoanSurety1
