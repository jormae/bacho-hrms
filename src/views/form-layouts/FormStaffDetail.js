// ** React Imports
import React, { useContext, useEffect } from 'react'
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
import SaveIcon from '@material-ui/icons/Save';
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
  const staffName = staffDetail?.staffName
  const villageNo = staffDetail?.villageNo
  const subDistrict = staffDetail?.subDistrict
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

  const staffRole = typeof window !== 'undefined' ? localStorage?.getItem('staffRoleId') : ''
  // const strDisabled = staffRole != 4 ? '' : 'disabled';
  console.log(staffRole)
  useEffect(() => {
    if (staffDetail) {
      reset({
        cid: staffDetail?.cid,
        staffName: staffDetail?.staffName,
        salary: staffDetail?.salary,
        houseNo: staffDetail?.houseNo,
        streetName: staffDetail?.streetName,
        villageName: staffDetail?.villageName,
        villageNo: staffDetail?.villageNo,
        subDistrict: staffDetail?.subDistrict,
        district: staffDetail?.district,
        province: staffDetail?.province,
        postCode: staffDetail?.postCode,
        contactNo: staffDetail?.contactNo,
        positionId: staffDetail?.positionId,
        staffTypeId: staffDetail?.staffTypeId,
        staffRoleId: staffDetail?.staffRoleId,
        paymentTypeId: staffDetail?.paymentTypeId,
        staffStatusId: staffDetail?.staffStatusId
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
            <Grid item xs={12} md={3}>
              {staffDetail.cid ? (
                <TextField fullWidth label='เลขที่บัตรประชาชน' {...register('cid')}  />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={3}>
              {staffDetail.staffName ? (
                <TextField fullWidth label='ชื่อสมาชิก' {...register('staffName')} />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
              {/* <input type='hidden' {...register('updatedBy')} value={updatedBy} /> */}
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label='เงินเดือน' type='number' {...register('salary')} />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>ตำแหน่ง</InputLabel>
                <Select label='ตำแหน่ง' defaultValue={positionId ?? ''} {...register('positionId', { required: true })}>
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
            <Grid item xs={12} md={3}>
              <FormControl fullWidth {...staffRole != 4 ? null : {disabled:true}}>
                <InputLabel>ประเภทสมาชิก</InputLabel>
                <Select
                  label='ประเภทสมาชิก'
                  defaultValue={staffTypeId ?? ''}
                  {...register('staffTypeId', { required: true })}
                >
                  {staffTypes.map(item => {
                    return (
                      <MenuItem key={item.staffTypeId} value={item.staffTypeId}>
                        {item.staffTypeName}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>ประเภทการชำระเงิน</InputLabel>
                <Select
                  label='ประเภทการชำระเงิน'
                  defaultValue={paymentTypeId ?? ''}
                  {...register('paymentTypeId', { required: true })}
                >
                  {paymentTypes.map(item => {
                    return (
                      <MenuItem key={item.paymentTypeId} value={item.paymentTypeId}>
                        {item.paymentTypeName}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth {...staffRole == 4 ? {disabled:true} : null }>
                <InputLabel>ประเภทบัญชีผู้ใช้</InputLabel>
                <Select
                  label='ประเภทบัญชีผู้ใช้'
                  defaultValue={staffRoleId ?? ''}
                  {...register('staffRoleId', { required: true })}
                >
                  {staffRoles.map(item => {
                    return (
                      <MenuItem key={item.staffRoleId} value={item.staffRoleId}>
                        {item.staffRoleName}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth {...staffRole != 4 ? null : {disabled:true}}>
                <InputLabel>สถานะสมาชิก</InputLabel>
                <Select
                  label='สถานะสมาชิก'
                  defaultValue={staffStatusId ?? ''}
                  {...register('staffStatusId', { required: true })}
                >
                  {staffStatus.map(item => {
                    return (
                      <MenuItem key={item.staffStatusId} value={item.staffStatusId}>
                        {item.staffStatusName}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <CardHeader title='ข้อมูลที่อยู่' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label='บ้านเลขที่' type='text' {...register('houseNo')} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label='ถนน' type='text' {...register('streetName')} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label='หมู่บ้าน' type='text' {...register('villageName')} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label='หมู่ที่' type='text' {...register('villageNo')} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label='ตำบล' type='text' {...register('subDistrict')} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label='อำเภอ' type='text' {...register('district')} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label='จังหวัด' type='text' {...register('province')} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label='รหัสไปรษณีย์' type='text' {...register('postCode')} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label='โทรศัพท์' type='text' {...register('contactNo')} />
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
