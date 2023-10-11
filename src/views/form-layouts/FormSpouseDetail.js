// ** React Imports
import React, { useContext, useEffect } from 'react'
import Skeleton from '@mui/material/Skeleton'
import { Controller, useForm } from 'react-hook-form'
// import { useParams } from 'react-router-dom'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import toast, { Toaster } from 'react-hot-toast'
import apiConfig from 'src/configs/apiConfig'

// ** Icons Imports
// import EyeOutline from 'mdi-material-ui/EyeOutline'
import SaveIcon from '@material-ui/icons/Save'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import Divider from '@mui/material/Divider'
import LoadingButton from '@mui/lab/LoadingButton'
import moment from 'moment'

import { SpouseContext } from 'src/pages/staff/[cid]'

const FormSpouseDetail = () => {
  const spouseDetails = useContext(SpouseContext)

  const { register, handleSubmit, formState, reset } = useForm()
  const [loading, setLoading] = React.useState(false)

  const memberNationalId = spouseDetails?.memberNationalId
  const spouseNationalId = spouseDetails?.spouseNationalId
  const spouseName = spouseDetails?.spouseName
  const spouseVillageNo = spouseDetails?.spouseVillageNo
  const spouseSubDistrict = spouseDetails?.spouseSubDistrict
  const spouseDistrict = spouseDetails?.spouseDistrict
  const spouseProvince = spouseDetails?.spouseProvince
  const spouseHouseNo = spouseDetails?.spouseHouseNo
  const spousePostCode = spouseDetails?.spousePostCode
  const spouseContactNo = spouseDetails?.spouseContactNo
  console.log(spouseDetails)
  console.log(memberNationalId)

  //   const updatedBy = typeof window !== 'undefined' ? localStorage?.getItem('staffName') : 'system'

  useEffect(() => {
    if (spouseDetails) {
      reset({
        memberNationalId: spouseDetails?.memberNationalId,
        spouseNationalId: spouseDetails?.spouseNationalId,
        spouseName: spouseDetails?.spouseName,
        spouseIncome: spouseDetails?.spouseIncome,
        spouseOccupation: spouseDetails?.spouseOccupation,
        spouseHouseNo: spouseDetails?.spouseHouseNo,
        spouseStreetName: spouseDetails?.spouseStreetName,
        spouseVillageName: spouseDetails?.spouseVillageName,
        spouseVillageNo: spouseDetails?.spouseVillageNo,
        spouseSubDistrict: spouseDetails?.spouseSubDistrict,
        spouseDistrict: spouseDetails?.spouseDistrict,
        spouseProvince: spouseDetails?.spouseProvince,
        spousePostCode: spouseDetails?.spousePostCode,
        spouseContactNo: spouseDetails?.spouseContactNo
      })
    }
  }, [])
  const onSubmit = data => {
    setLoading(true)

    let uri = apiConfig.baseURL + `/spouses/${memberNationalId}`
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
      <CardHeader title='ข้อมูลคู่สมรส' titleTypographyProps={{ variant: 'h6' }} />
      <Toaster />
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label='เลขที่บัตรประชาชนคู่สมรส' {...register('spouseNationalId')} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label='ชื่อคู่สมรส' {...register('spouseName')} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label='อาชีพ' type='text' {...register('spouseOccupation')} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label='รายได้ต่อเดือน' type='number' {...register('spouseIncome')} />
            </Grid>
          </Grid>
        </CardContent>
        <CardHeader title='ข้อมูลที่อยู่' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label='บ้านเลขที่' type='text' {...register('spouseHouseNo')} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label='ถนน' type='text' {...register('spouseStreetName')} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label='หมู่บ้าน' type='text' {...register('spouseVillageName')} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label='หมู่ที่' type='text' {...register('spouseVillageNo')} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label='ตำบล' type='text' {...register('spouseSubDistrict')} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label='อำเภอ' type='text' {...register('spouseDistrict')} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label='จังหวัด' type='text' {...register('spouseProvince')} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label='รหัสไปรษณีย์' type='text' {...register('spousePostCode')} />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label='โทรศัพท์' type='text' {...register('spouseContactNo')} />
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

export default FormSpouseDetail
