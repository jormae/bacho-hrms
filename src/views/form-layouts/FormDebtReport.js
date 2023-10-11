// ** React Imports
import React, { useState, useEffect, useContext } from 'react'
import Skeleton from '@mui/material/Skeleton'
import { useForm } from 'react-hook-form'

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
import SaveIcon from '@material-ui/icons/Save';
import LoadingButton from '@mui/lab/LoadingButton'
import moment from 'moment'
import { LoanContext } from 'src/pages/loan/[nationalId]/[loanId]'

const FormDebtReport = () => {

    const loanDetail = useContext(LoanContext)
    console.log(loanDetail)

    const { register, handleSubmit, control } = useForm();
    const [loading, setLoading] = React.useState(false)
    const userName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null
    const memberRoleId = typeof window !== 'undefined' ? localStorage.getItem('memberRoleId') : null
    console.log("loanStatusId : "+loanDetail?.loanStatusId)
    const btnStatus = (loanDetail?.loanStatusId == "0") ? '' : 'disabled';

  const onSubmit = data => {
    setLoading(true)
    console.log(data)
    let uri = apiConfig.baseURL + `/loans/${data.loanId}`
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
      <CardHeader title='รายการชี้แจงรายการหนี้สิน' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <Toaster />
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} md={12}>
                <TextField fullWidth InputProps={{ readOnly: true }} label='สถานะหนี้สิน' defaultValue={loanDetail?.debtStatusId == 1 ?  'ไม่มีหนี้สิน' : 'มีหนี้สิน'} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth InputProps={{ readOnly: false }} label='ยอดชำระออมทรัพย์รายเดือน' defaultValue={loanDetail?.debt1} {...register('debt1')}/>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth InputProps={{ readOnly: false }} label='ยอดชำระธนาคารอิสลามรายเดือน' defaultValue={loanDetail?.debt2} {...register('debt2')}/>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth InputProps={{ readOnly: false }} label='ยอดชำระธนาคารออมสินรายเดือน' defaultValue={loanDetail?.debt3} {...register('debt3')}/>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth InputProps={{ readOnly: false }} label='ยอดชำระชพค.รายเดือน' defaultValue={loanDetail?.debt4} {...register('debt4')}/>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth InputProps={{ readOnly: false }} label='ยอดชำระกองทุนสงเคราะห์รายเดือน' defaultValue={loanDetail?.debt5} {...register('debt5')}/>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth InputProps={{ readOnly: false }} label='ยอดชำระอื่นๆรายเดือน' defaultValue={loanDetail?.debt6} {...register('debt6')}/>
              </Grid>
            </Grid>
            
        </CardContent>
        <CardHeader title='ข้อมูลการอนุมัติ' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
                <Grid container spacing={5}>
                    {memberRoleId == 4 ? (
                    <Grid item xs={12} md={6} lg={4}>
                    {loanDetail?.nationalId ? (
                        <TextField fullWidth InputProps={{ readOnly: true }} defaultValue={loanDetail?.loanStatusName} label='สถานะการอนุมัติ' />
                    ) : (
                        <Skeleton variant='rectangular' width={250} height={55} />
                    )}
                    </Grid>
                    ) : ''
                    }
                    {memberRoleId != 4 ? (
                    <Grid item xs={12} md={6} lg={6}>
                    <FormControl fullWidth>
                        <InputLabel>สถานะการอนุมัติ</InputLabel>
                        <Select label='สถานะการอนุมัติ' defaultValue={loanDetail?.loanStatusId ?? '0'} {...register('loanStatusId', { required: true })}>
                            <MenuItem key='0' value='0'> รออนุมัติ</MenuItem>
                            <MenuItem key='1' value='1'> อนุมัติ</MenuItem>
                            <MenuItem key='2' value='2'> ไม่อนุมัติ</MenuItem>
                        </Select>
                    </FormControl>
                    <input type='hidden' defaultValue={loanDetail?.loanId}  {...register('loanId')} />
                    <input type='hidden' defaultValue={userName}  {...register('approvedBy')} />
                    <input type='hidden' defaultValue={loanDetail?.loanTypeId}  {...register('loanTypeId')} />
                    <input type='hidden' defaultValue={loanDetail?.loanDurationInMonth}  {...register('loanDurationInMonth')} />
                    <input type='hidden' defaultValue={loanDetail?.loanAmount}  {...register('loanAmount')} />
                    </Grid>
                    ) : ''
                    }
                    {memberRoleId != 4 ? (
                    <Grid item xs={12} md={6} lg={6}>
                    {loanDetail?.nationalId ? (
                        <TextField fullWidth defaultValue={loanDetail?.refId} label='เลขที่สัญญา' {...register('refId')} />
                    ) : (
                        <Skeleton variant='rectangular' width={250} height={55} />
                    )}
                    </Grid>
                    ) : ''
                    }
                </Grid>
                <Grid item xs={12} sx={{mt:5, mb:0}}>
                    <Box
                        sx={{
                        gap: 5,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                        }}
                    >
                    <input type='hidden' {...register('approvedBy')} value={userName} />
                        <Box sx={{ '& > button': { m: 1 } }}></Box>
                        {(memberRoleId != 4 ) ? (
                        <LoadingButton
                        type='submit'
                        color='primary'
                        onClick={handleSubmit(onSubmit)}
                        loading={loading}
                        loadingPosition='start'
                        startIcon={<SaveIcon />}
                        variant='contained'
                        size='large'
                        disabled={ loanDetail?.loanStatusId != 0}
                        >
                        บันทึกการอนุมัติ
                        </LoadingButton>
                    ) : ''
                    }              
                    </Box>
                </Grid>
                </CardContent>
                
      </form>
    </Card>
  )
}

export default FormDebtReport
