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
  PaymentTypesContext,
  StaffStatusContext
} from 'src/pages/staff/[cid]'
import { CosineWave } from 'mdi-material-ui'

const FormStaffDetail = () => {
  const staffDetail = useContext(StaffContext)

  const positions = useContext(PositionsContext)

  const staffTypes = useContext(StaffTypesContext)

  const staffRoles = useContext(StaffRolesContext)

  const paymentTypes = useContext(PaymentTypesContext)

  const staffStatus = useContext(StaffStatusContext)

  const { register, handleSubmit, reset } = useForm()
  const [loading, setLoading] = React.useState(false)
  console.log(staffDetail)

  const cid = staffDetail?.cid
  const pname = staffDetail?.pname
  const fname = staffDetail?.fname
  const lname = staffDetail?.lname
  const staffName = staffDetail?.staffName
  const sex = staffDetail?.sex
  const birthday = moment(staffDetail?.birthday).format('YYYY-MM-DD')
  const district = staffDetail?.district
  const province = staffDetail?.province
  const houseNo = staffDetail?.houseNo
  const postCode = staffDetail?.postCode
  const contactNo = staffDetail?.contactNo
  const positionId = staffDetail?.positionId
  const staffTypeId = staffDetail?.staffTypeId
  const staffRoleId = staffDetail?.staffRoleId
  const paymentTypeId = staffDetail?.paymentTypeId
  const staffStatusId = staffDetail?.staffStatusId
  console.log(birthday)

  const staffRole = typeof window !== 'undefined' ? localStorage?.getItem('staffRoleId') : ''

  // const strDisabled = staffRole != 4 ? '' : 'disabled';
  console.log(staffRole)
  useEffect(() => {
    if (staffDetail) {
      reset({
        cid: staffDetail?.cid,
        pname: staffDetail?.pname,
        fname: staffDetail?.fname,
        lname: staffDetail?.lname,
        staffName: staffDetail?.staffName,
        sex: staffDetail?.sex,
        birthday: staffDetail?.birthday,
        contactNo: staffDetail?.contactNo,
        email: staffDetail?.email,
        address: staffDetail?.address
      })
    }
  }, [])

  const onSubmit = data => {
    setLoading(true)
    console.log(data)
    let staffId = staffDetail?.cid
    console.log(staffId)

    let uri = apiConfig.baseURL + `/staffs/${cid}`

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
                <Select label='คำนำหน้า' defaultValue={positionId ?? ''} {...register('pname', { required: true })}>
                  {positions.map(item => {
                    return (
                      <MenuItem key={item.positionId} value={item.positionId}>
                        {item.positionName}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              {staffDetail.cid ? (
                <TextField fullWidth label='ชื่อ' {...register('fname')} />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              {staffDetail.cid ? (
                <TextField fullWidth label='สกุล' {...register('lname')} />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              {staffDetail.cid ? (
                <TextField fullWidth label='เลขที่บัตรประชาชน' {...register('cid')} />
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
              <TextField fullWidth label='วันเกิด' type='date' value={birthday} {...register('birthday')} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField fullWidth label='โทรศัพท์' type='text' {...register('contactNo')} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField fullWidth label='อีเมล' type='text' {...register('email')} />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField fullWidth label='ที่อยู่' type='text' {...register('address')} />
            </Grid>

          </Grid>

        </CardContent>
        {/* <CardHeader title='ข้อมูลที่อยู่' titleTypographyProps={{ variant: 'h6' }} /> */}
        <CardContent>
          <Grid container spacing={5}>
            {/* <Grid item xs={12} md={6} lg={4}>
              <TextField fullWidth label='บ้านเลขที่' type='text' {...register('houseNo')} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField fullWidth label='ถนน' type='text' {...register('streetName')} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField fullWidth label='หมู่บ้าน' type='text' {...register('villageName')} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField fullWidth label='หมู่ที่' type='text' {...register('villageNo')} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField fullWidth label='ตำบล' type='text' {...register('subDistrict')} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField fullWidth label='อำเภอ' type='text' {...register('district')} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField fullWidth label='จังหวัด' type='text' {...register('province')} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField fullWidth label='รหัสไปรษณีย์' type='text' {...register('postCode')} />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField fullWidth label='โทรศัพท์' type='text' {...register('contactNo')} />
            </Grid> */}

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
