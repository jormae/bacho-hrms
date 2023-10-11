// ** React Imports
import React, { useState, useEffect, useContext, ChangeEvent } from 'react'
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

// ** Icons Imports
import SaveIcon from '@material-ui/icons/Save';
import LoadingButton from '@mui/lab/LoadingButton'
import moment from 'moment'

import {PaymentSuggestionContext, MemberContext} from 'src/pages/loan-payment/[nationalId]/[loanId]'

const FormLoanPayment = () => {

    const paymentSuggestionInfo = useContext(PaymentSuggestionContext)
   
    const member = useContext(MemberContext)
    console.log(paymentSuggestionInfo)

    const { register, resetField, handleSubmit, control } = useForm();
  
  const [loading, setLoading] = React.useState(false)
  const [paymentTypes, setPaymentTypes] = useState([])
  const userName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null
  const memberRoleId = typeof window !== 'undefined' ? localStorage.getItem('memberRoleId') : null
  console.log('monthno : '+paymentSuggestionInfo?.monthNo)

  const [file, setFile] = useState()
  console.log(file)

  function handleChange(event) {
    setFile(event.target.files[0])
  }

  // const [shareQuantity, setShareQuantity] = useState()
  // const [newPaymentAmount, setNewPaymentAmount] = useState()
  // const [netTotalShare, setNetTotalShare] = useState()
  // const totalShare = (parseInt(shareQuantity, 10) * parseInt(valuePerShare, 10))
  const [loanStatusName, setLoanStatusName] = useState()
  console.log('loanStatusName = '+loanStatusName)

  const handleChangePaymentAmount = (event) => {
      // setNewPaymentAmount(event.target.value);
      // event.preventDefault();
      // event.target.reset();
      // const newPaymentAmount = event.target.value;
      if(event.target.value > paymentSuggestionInfo?.totalLoanBalance){
        console.log("ERROR")
        resetField("paymentAmount")
        setLoanStatusName("ชำระรายเดือน")
      }
      else if(event.target.value == paymentSuggestionInfo?.totalLoanBalance){
        console.log("Closed")
        setLoanStatusName("ปิดยอดสวัสดิการ")
      }
      else{
        console.log("Good")
        setLoanStatusName("ชำระรายเดือน")
      }
  };
  
  const fetchPaymentTypes = async () => {
    let uri = apiConfig.baseURL + `/utils/payment-types`
    console.log(uri)
    try {
      await axios
        .get(uri)
        .then(result => setPaymentTypes(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPaymentTypes()

  }, [])

  const onSubmit = data => {
    setLoading(true)
    console.log(data)

    let uri = apiConfig.baseURL + `/payments`
    fetch(uri, {
      method: 'POST',
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
      <Toaster />
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} lg={3}>
                {paymentSuggestionInfo?.loanId ? (
                <TextField InputProps={{ readOnly: true }} fullWidth defaultValue={paymentSuggestionInfo?.loanId} label='รหัสสวัสดิการ' {...register('loanId')} />
                ) : (
                    <Skeleton variant='rectangular' width={250} height={55} />
                )}
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                {paymentSuggestionInfo?.refId ? (
                    <TextField InputProps={{ readOnly: true }} fullWidth defaultValue={paymentSuggestionInfo?.refId} label='เลขที่สัญญา' />
                ) : (
                    <Skeleton variant='rectangular' width={250} height={55} />
                )}
              
            </Grid>
            {/* <Grid item xs={12} md={6} lg={3}>
                {paymentSuggestionInfo?.nationalId ? (
                <TextField InputProps={{ readOnly: true }} fullWidth defaultValue={paymentSuggestionInfo?.nationalId} label='เลขประจำตัวประชาชน'  />
                ) : (
                    <Skeleton variant='rectangular' width={250} height={55} />
                )}
            </Grid> */}
            <Grid item xs={12} md={6} lg={3}>
                {paymentSuggestionInfo?.memberName ? (
                    <TextField InputProps={{ readOnly: true }} fullWidth defaultValue={paymentSuggestionInfo?.memberName} label='ชื่อสมาชิก' />
                ) : (
                    <Skeleton variant='rectangular' width={250} height={55} />
                )}
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                {paymentSuggestionInfo?.loanTypeName ? (
                    <TextField InputProps={{ readOnly: true }} fullWidth defaultValue={paymentSuggestionInfo?.loanTypeName} label='ประเภทสวัสดิการ' />
                ) : (
                    <Skeleton variant='rectangular' width={250} height={55} />
                )}
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                {paymentSuggestionInfo?.loanAmount ? (
                    <TextField InputProps={{ readOnly: true }} fullWidth defaultValue={paymentSuggestionInfo?.loanAmount} label='จำนวนเงินสวัสดิการ' />
                ) : (
                    <Skeleton variant='rectangular' width={250} height={55} />
                )}
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
            {paymentSuggestionInfo?.monthNo ? (
                    <TextField fullWidth type='number' defaultValue={paymentSuggestionInfo?.monthNo} label='งวดที่' {...register('monthNo')}/>
                    ) : (
                      <Skeleton variant='rectangular' width={250} height={55} />
                  )}
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                    <TextField fullWidth defaultValue={moment(paymentSuggestionInfo?.loanPaymentMonth).format('YYYY-MM-DD')} label='เดือน' type='date' {...register('loanPaymentMonth')} InputLabelProps={{
                      shrink: true,
                    }} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                {paymentSuggestionInfo?.totalLoanBalance ? (
                    <TextField fullWidth type='number' InputProps={{ readOnly: true }} defaultValue={paymentSuggestionInfo?.totalLoanBalance ?? 0} label='ยอดคงเหลือ' {...register('totalLoanBalance')}/>
                ) : (
                    <Skeleton variant='rectangular' width={250} height={55} />
                )}
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                {paymentSuggestionInfo?.monthlyPayment ? (
                    <TextField fullWidth type='number' defaultValue={paymentSuggestionInfo?.monthlyPayment} label='ยอดชำระ' {...register('paymentAmount')} onChange={handleChangePaymentAmount}/>
                ) : (
                    <Skeleton variant='rectangular' width={250} height={55} />
                )}
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <TextField fullWidth type='text' InputProps={{ readOnly: true }} value={loanStatusName ?? 'ชำระรายเดือน'} label='ประเภทการชำระเงิน'  />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                {paymentSuggestionInfo?.paymentTypeId ? (
                    <FormControl fullWidth>
                        <InputLabel>ช่องทางการชำระเงิน</InputLabel>
                        <Select label='ช่องทางการชำระเงิน' defaultValue={paymentSuggestionInfo?.paymentTypeId ?? ''} {...register('paymentTypeId', { required: true })}>
                        {paymentTypes.map(item => {
                            return (
                            <MenuItem key={item.paymentTypeId} value={item.paymentTypeId}>
                                {item.paymentTypeName}
                            </MenuItem>
                            )
                        })}
                        </Select>
                    </FormControl>
                    ) : (
                    <Skeleton variant='rectangular' width={250} height={55} />
                )}
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField type='file' fullWidth label='หลักฐานการชำระเงิน' placeholder='หลักฐานการชำระเงิน' {...register('slip')}/>              
            </Grid>
              <input type='hidden' {...register('userName')} value={userName} />
              <input type='hidden' {...register('memberRoleId')} value={memberRoleId} />

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
                  บันทึกการแจ้งชำระเงิน
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  )
}

export default FormLoanPayment
