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
  MemberContext,
  PositionsContext,
  MemberTypesContext,
  MemberRolesContext,
  PaymentTypesContext,
  MemberStatusContext
} from 'src/pages/staff/[cid]'

const FormMemberDetail = () => {
  const memberDetail = useContext(MemberContext)

  const positions = useContext(PositionsContext)

  const memberTypes = useContext(MemberTypesContext)

  const memberRoles = useContext(MemberRolesContext)

  const paymentTypes = useContext(PaymentTypesContext)

  const memberStatus = useContext(MemberStatusContext)

  const { register, handleSubmit, reset } = useForm()
  const [loading, setLoading] = React.useState(false)

  const nationalId = memberDetail?.nationalId
  const memberName = memberDetail?.memberName
  const villageNo = memberDetail?.villageNo
  const subDistrict = memberDetail?.subDistrict
  const district = memberDetail?.district
  const province = memberDetail?.province
  const houseNo = memberDetail?.houseNo
  const postCode = memberDetail?.postCode
  const contactNo = memberDetail?.contactNo
  const positionId = memberDetail?.positionId
  const memberTypeId = memberDetail?.memberTypeId
  const memberRoleId = memberDetail?.memberRoleId
  const paymentTypeId = memberDetail?.paymentTypeId
  const memberStatusId = memberDetail?.memberStatusId

  const memberRole = typeof window !== 'undefined' ? localStorage?.getItem('memberRoleId') : ''
  // const strDisabled = memberRole != 4 ? '' : 'disabled';
  console.log(memberRole)
  useEffect(() => {
    if (memberDetail) {
      reset({
        nationalId: memberDetail?.nationalId,
        memberName: memberDetail?.memberName,
        salary: memberDetail?.salary,
        houseNo: memberDetail?.houseNo,
        streetName: memberDetail?.streetName,
        villageName: memberDetail?.villageName,
        villageNo: memberDetail?.villageNo,
        subDistrict: memberDetail?.subDistrict,
        district: memberDetail?.district,
        province: memberDetail?.province,
        postCode: memberDetail?.postCode,
        contactNo: memberDetail?.contactNo,
        positionId: memberDetail?.positionId,
        memberTypeId: memberDetail?.memberTypeId,
        memberRoleId: memberDetail?.memberRoleId,
        paymentTypeId: memberDetail?.paymentTypeId,
        memberStatusId: memberDetail?.memberStatusId
      })
    }
  }, [])

  const onSubmit = data => {
    setLoading(true)
    console.log(data)
    let memberId = memberDetail?.nationalId
    console.log(memberId)

    let uri = apiConfig.baseURL + `/members/${nationalId}`

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
              {memberDetail.nationalId ? (
                <TextField fullWidth label='เลขที่บัตรประชาชน' {...register('nationalId')} />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={3}>
              {memberDetail.memberName ? (
                <TextField fullWidth label='ชื่อสมาชิก' {...register('memberName')} />
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
              <FormControl fullWidth {...memberRole != 4 ? null : {disabled:true}}>
                <InputLabel>ประเภทสมาชิก</InputLabel>
                <Select
                  label='ประเภทสมาชิก'
                  defaultValue={memberTypeId ?? ''}
                  {...register('memberTypeId', { required: true })}
                >
                  {memberTypes.map(item => {
                    return (
                      <MenuItem key={item.memberTypeId} value={item.memberTypeId}>
                        {item.memberTypeName}
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
              <FormControl fullWidth {...memberRole == 4 ? {disabled:true} : null }>
                <InputLabel>ประเภทบัญชีผู้ใช้</InputLabel>
                <Select
                  label='ประเภทบัญชีผู้ใช้'
                  defaultValue={memberRoleId ?? ''}
                  {...register('memberRoleId', { required: true })}
                >
                  {memberRoles.map(item => {
                    return (
                      <MenuItem key={item.memberRoleId} value={item.memberRoleId}>
                        {item.memberRoleName}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth {...memberRole != 4 ? null : {disabled:true}}>
                <InputLabel>สถานะสมาชิก</InputLabel>
                <Select
                  label='สถานะสมาชิก'
                  defaultValue={memberStatusId ?? ''}
                  {...register('memberStatusId', { required: true })}
                >
                  {memberStatus.map(item => {
                    return (
                      <MenuItem key={item.memberStatusId} value={item.memberStatusId}>
                        {item.memberStatusName}
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

export default FormMemberDetail
