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

const FormLoanApproval = () => {

    const loanDetail = useContext(LoanContext)
    console.log(loanDetail)

    const { register, handleSubmit, control } = useForm();
    const [loading, setLoading] = React.useState(false)
    const userName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null
    const memberRoleId = typeof window !== 'undefined' ? localStorage.getItem('memberRoleId') : null
    console.log("loanStatus : "+loanDetail?.loanStatusId)

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
      <CardHeader title='ข้อมูลคำร้องขอสวัสดิการ' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <Toaster />
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} lg={6}>
            {loanDetail?.loanId ? (
              <TextField fullWidth InputProps={{ readOnly: true }} defaultValue={loanDetail?.loanId} label='รหัสสวัสดิการ' {...register('loanId')} />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
            {loanDetail?.nationalId ? (
              <TextField fullWidth InputProps={{ readOnly: true }} defaultValue={loanDetail?.nationalId} label='เลขที่บัตรประชาชน' />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
            {loanDetail?.loanMemberName ? (
                <TextField fullWidth InputProps={{ readOnly: true }} defaultValue={loanDetail?.loanMemberName} label='ชื่อสมาชิก' />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
            {loanDetail?.nationalId ? (
              <TextField fullWidth InputProps={{ readOnly: true }} defaultValue={loanDetail?.contactNo} label='โทรศัพท์' />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
            {loanDetail?.nationalId ? (
                <TextField fullWidth InputProps={{ readOnly: true }} defaultValue={loanDetail?.memberTypeName} label='ประเภทบุคลากร' />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
            {loanDetail?.nationalId ? (
                <TextField fullWidth InputProps={{ readOnly: true }} defaultValue={loanDetail?.loanTypeName +' '+ loanDetail.loanAmount} label='ประเภทสวัสดิการ' />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            
            <Grid item xs={12} md={6} lg={6}>
            {loanDetail?.nationalId ? (
                <TextField fullWidth InputProps={{ readOnly: true }} defaultValue={loanDetail?.firstReferenceName} label='ชื่อผู้ค้ำคนที่ 1' />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
            {loanDetail?.nationalId ? (
                <TextField fullWidth InputProps={{ readOnly: true }} defaultValue={loanDetail?.firstReferenceId} label='เลขบัตรประชาชน' />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
            {loanDetail?.nationalId ? (
                <TextField fullWidth InputProps={{ readOnly: true }} defaultValue={loanDetail?.firstReferenceContactNo} label='โทรศัพท์' />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            
            <Grid item xs={12} md={6} lg={6}>
            {loanDetail?.nationalId ? (
                <TextField fullWidth InputProps={{ readOnly: true }} defaultValue={loanDetail?.secondReferenceName} label='ชื่อผู้ค้ำคนที่ 2' />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
            {loanDetail?.nationalId ? (
                <TextField fullWidth InputProps={{ readOnly: true }} defaultValue={loanDetail?.secondReferenceId} label='เลขบัตรประชาชน' />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
            {loanDetail?.nationalId ? (
                <TextField fullWidth InputProps={{ readOnly: true }} defaultValue={loanDetail?.secondReferenceContactNo} label='โทรศัพท์' />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
           
            </Grid>
          </CardContent>
      </form>
    </Card>
  )
}

export default FormLoanApproval
