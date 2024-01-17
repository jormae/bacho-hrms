// ** React Imports
import React, { useContext, useEffect, useState } from 'react'
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
import toast, { Toaster } from 'react-hot-toast'
import apiConfig from 'src/configs/apiConfig'

// ** Icons Imports
import SaveIcon from '@material-ui/icons/Save'
import LoadingButton from '@mui/lab/LoadingButton'
import moment from 'moment'

import {
  StaffContext,
  PositionsContext,
  StaffTypesContext,
  StaffRolesContext,
  PnamesContext,
  StaffStatusContext
} from 'src/pages/staff/[cid]'
import { CosineWave } from 'mdi-material-ui'

const FormStaffDetail = () => {

  const staffDetail = useContext(StaffContext)

  const pNames = useContext(PnamesContext)

  const { register, handleSubmit, reset } = useForm()
  const [loading, setLoading] = React.useState(false)
  console.log(staffDetail)

  const cid = staffDetail?.cid
  const pname = staffDetail?.pname
  const fname = staffDetail?.fname
  const lname = staffDetail?.lname
  const staffName = staffDetail?.staffName
  const sex = staffDetail?.sex

  // const bd = staffDetail?.birthday
  const birthday = moment(staffDetail?.birthday).format('YYYY-MM-DD')

  // console.log('bd = ' + bd)
  console.log('birthday = ' + birthday)

  const onSubmit = data => {
    setLoading(true)
    let cid = staffDetail?.cid
    let uri = apiConfig.baseURL + `/staff/personal/${cid}`
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
          toast.error(data.message)
        }
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      })
  }

  return (
    <Card>
      <CardHeader title='ข้อมูลสมาชิก' titleTypographyProps={{ variant: 'h6' }} />
      <Toaster />
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} lg={4}>
              <FormControl fullWidth>
                <InputLabel>คำนำหน้า</InputLabel>
                <Select label='คำนำหน้า' defaultValue={staffDetail.pname ?? ''} {...register('pname', { required: true })}>
                  {pNames.map(item => {
                    return (
                      <MenuItem key={item.pname} value={item.pname}>
                        {item.pname}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              {staffDetail.cid ? (
                <TextField fullWidth label='ชื่อ' defaultValue={fname} {...register('fname')} />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              {staffDetail.cid ? (
                <TextField fullWidth label='สกุล' defaultValue={lname} {...register('lname')} />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              {staffDetail.cid ? (
                <TextField fullWidth label='เลขที่บัตรประชาชน' defaultValue={cid} {...register('cid')} />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <FormControl fullWidth>
                <InputLabel>เพศ</InputLabel>
                <Select label='เพศ' defaultValue={sex} {...register('sex', { required: true })} >
                  <MenuItem key={1} value={1}>
                    ชาย
                  </MenuItem>
                  <MenuItem key={2} value={2}>
                    หญิง
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField fullWidth label='วันเกิด' type='date' InputLabelProps={{ shrink: true, }} defaultValue={birthday}  {...register('birthday')} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField fullWidth label='โทรศัพท์' type='text' defaultValue={staffDetail?.contactNo} {...register('contactNo')} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField fullWidth label='อีเมล' type='text' defaultValue={staffDetail?.email} {...register('email')} />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField fullWidth label='ที่อยู่' type='text' defaultValue={staffDetail?.address} {...register('address')} />
            </Grid>
          </Grid>
        </CardContent>
        <CardContent>
          <Grid container spacing={5}>
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
                  onClick={handleSubmit(onSubmit)}
                  loading={loading}
                  loadingPosition='start'
                  startIcon={<SaveIcon />}
                  variant='contained'
                  size='large'
                >
                  บันทึก
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  )
}

export default FormStaffDetail
