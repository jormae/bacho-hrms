// ** React Imports
import React, { useState, useEffect, useContext } from 'react'
import Skeleton from '@mui/material/Skeleton'
import { Controller, useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
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

// ** Icons Imports
import SaveIcon from '@material-ui/icons/Save'
import LoadingButton from '@mui/lab/LoadingButton'
import moment from 'moment'

import {MemberContext} from 'src/pages/investment-approval/[investmentId]'

const FormInvestmentDetail = () => {

    // const paymentSuggestionInfo = useContext(PaymentSuggestionContext)
   
    const memberDetail = useContext(MemberContext)
    
    console.log(memberDetail)

    const { register, handleSubmit, control } = useForm();
  
    const [loading, setLoading] = React.useState(false)
    const [paymentTypes, setPaymentTypes] = useState([])
    const memberName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null
    const memberRoleId = typeof window !== 'undefined' ? localStorage.getItem('memberRoleId') : null
//   const loanPaymentMonth = moment(paymentSuggestionInfo?.loanPaymentMonth).format('DD/MM/YYYY')
// console.log(paymentSuggestionInfo?.loanId)

    // const [shareQuantity, setShareQuantity] = useState()
    // const [valuePerShare, setValuePerShare] = useState()
    // const [netTotalShare, setNetTotalShare] = useState()
    // const totalShare = (parseInt(shareQuantity, 10) * parseInt(valuePerShare, 10))

    const handleChangeShareQuantity = (event) => {
        setShareQuantity(event.target.value);
    };
    const handleChangeValuePerShare = (event) => {
        setValuePerShare(event.target.value);
    }

    // useEffect(() => {
    //     // setTotalShare(parseInt(shareQuantity, 10) * parseInt(valuePerShare, 10))
    //     setNetTotalShare(totalShare)
    //   }, [])

    const onSubmit = data => {
        setLoading(true)
        console.log(data)
        let uri = apiConfig.baseURL + `/investments/${data.investmentId}`
        console.log(uri)

        fetch(uri, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setLoading(false)
            if (data.status == 'success') {
            toast.success(data.message)
            } else {
            toast.error(data.message || data.errors[0].msg)
            }
        })
        .catch(function (error) {
            console.log(JSON.stringify(error))
        })
    }

  return (
    <Card>
      <CardHeader title='ข้อมูลพิจารณาอนุมัติ เพิ่ม/ถอน/ลา หุ้น' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <Toaster />
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
                {memberDetail?.investmentId ? (
                <TextField InputProps={{ readOnly: true }} fullWidth defaultValue={memberDetail?.investmentId} label='รหัส' {...register('investmentId')} />
                ) : (
                    <Skeleton variant='rectangular' width={250} height={55} />
                )}
            </Grid>
            <Grid item xs={12} md={6}>
                {memberDetail?.nationalId ? (
                <TextField InputProps={{ readOnly: true }} fullWidth defaultValue={memberDetail?.nationalId} label='เลขประจำตัวประชาชน' />
                ) : (
                    <Skeleton variant='rectangular' width={250} height={55} />
                )}
            </Grid>
            <Grid item xs={12} md={6}>
                {memberDetail?.memberName ? (
                    <TextField InputProps={{ readOnly: true }} fullWidth defaultValue={memberDetail?.memberName} label='ชื่อสมาชิก' />
                ) : (
                    <Skeleton variant='rectangular' width={250} height={55} />
                )}
            </Grid>
            <Grid item xs={12} md={6}>
                {memberDetail?.nationalId ? (
                <TextField InputProps={{ readOnly: true }} fullWidth defaultValue={memberDetail?.netTotalShareQuantity} label='ยอดหุ้นทั้งหมด' />
                ) : (
                    <Skeleton variant='rectangular' width={250} height={55} />
                )}
            </Grid>
            <Grid item xs={12} md={6}>
                {memberDetail?.nationalId ? (
                    <TextField InputProps={{ readOnly: true }} fullWidth defaultValue={memberDetail?.netTotalShare} label='ยอดเงินลงทุนทั้งหมด' />
                ) : (
                    <Skeleton variant='rectangular' width={250} height={55} />
                )}
            </Grid>
            <Grid item xs={12} md={6}>
                    <FormControl fullWidth disabled>
                        <InputLabel>ประเภทธุรกรรม</InputLabel>
                        <Select label='ประเภทธุรกรรม' defaultValue="1">
                            <MenuItem key="1" value="1">ฝากหุ้น</MenuItem>
                            <MenuItem key="2" value="2">ถอนหุ้น</MenuItem>
                            <MenuItem key="3" value="3">ลาหุ้น</MenuItem>
                        </Select>
                    </FormControl>
            </Grid> 
            <Grid item xs={12} md={6}>
                <TextField fullWidth InputProps={{ readOnly: true }}  defaultValue={memberDetail?.shareQuantity} label='จำนวนหุ้น' type='number'  />
            </Grid>
            <Grid item xs={12} md={6}>
                    <TextField fullWidth InputProps={{ readOnly: true }}  defaultValue={memberDetail?.valuePerShare} label='ราคาหุ้นต่อหน่วย'  />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField fullWidth InputProps={{ readOnly: true }} defaultValue={memberDetail?.totalShare} label='จำนวนเงินลงทุนทั้งหมด' />
                <input type="hidden" value={memberName} {...register('username')}/>
                <input type="hidden" value={memberRoleId} {...register('memberRoleId')}/>
                {/* <input type="hidden" value={memberDetail?.investmentId} {...register('investmentId')}/> */}
            </Grid>

            <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel>ผลการพิจารณาอนุมัติ</InputLabel>
                        <Select label='ผลการพิจารณาอนุมัติ' defaultValue="1" {...register('investmentStatusId', { required: true })}>
                            <MenuItem key="1" value="1">อนุมัติ</MenuItem>
                            <MenuItem key="2" value="2">ไม่อนุมัติ</MenuItem>
                        </Select>
                    </FormControl>
            </Grid> 

            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ '& > button': { m: 1 } }}></Box>
                <LoadingButton
                  type='submit'
                  color='primary'
                  //   onClick={handleClick}
                  onClick={handleSubmit(onSubmit)}
                  loading={loading}
                  loadingPosition='start'
                  startIcon={<SaveIcon />}
                  variant='contained'
                  size='large'
                >
                  บันทึกการพิจารณา
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  )
}

export default FormInvestmentDetail
