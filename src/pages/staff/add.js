import { useEffect, useState, createContext } from 'react'
import { useForm } from 'react-hook-form'

import * as React from 'react'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import apiConfig from 'src/configs/apiConfig'
import axios from 'axios'
import Box from '@mui/material/Box'
import moment from 'moment'
import 'moment/locale/th' // without this line it didn't work
import Swal from 'sweetalert2';
import {Card,CardHeader,CardContent,FormControl,InputLabel,Select,TextField,MenuItem,Divider,FormHelperText} from '@mui/material/'
import toast, { Toaster } from 'react-hot-toast'
import SaveIcon from '@material-ui/icons/Save'
import LoadingButton from '@mui/lab/LoadingButton'

const FormLayouts = () => {

  const [err, setError] = useState()
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
  const [staffDetail, setStaffDetail] = useState()
  const [loading, setLoading] = useState(false)

  const [positions, setPositions] = useState([])
  const [contractTypes, setContractTypes] = useState([])
  const [depts, setDepts] = useState([])
  const [mainDepts, setMainDepts] = useState([])
  const [pNames, setPnames] = useState([])
  const [StaffStatus, setReferCauses] = useState([])
  const [staffSuretyHistories, setStaffSuretyHistories] = useState({ blogs: [] })
  const [value, setValue] = React.useState('personalInfo')
  const [tabHistoryValue, setTabHistoryValue] = React.useState('monthly-attendance')
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const strDate =
    moment(date).format('DD') +
    ' เดือน ' +
    moment(date).format('MMMM') +
    ' พ.ศ.' +
    moment(date).add(543, 'year').format('YYYY')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleTabHistoryChange = (event, newValue) => {
    setTabHistoryValue(newValue)
  }


  const fetchPositions = async () => {
    let uri = apiConfig.baseURL + `/utils/positions`

    // console.log(uri)
    try {
      await axios
        .get(uri)
        .then(result => setPositions(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchPnames = async () => {
    let uri = apiConfig.baseURL + `/utils/pname`

    // console.log(uri)
    try {
      await axios
        .get(uri)
        .then(result => setPnames(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchContractTypes = async () => {
    let uri = apiConfig.baseURL + `/utils/contract-types`

    // console.log(uri)
    try {
      await axios
        .get(uri)
        .then(result => setContractTypes(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchDepts = async () => {
    let uri = apiConfig.baseURL + `/utils/depts`
    try {
      await axios
        .get(uri)
        .then(result => setDepts(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMainDepts = async () => {
    let uri = apiConfig.baseURL + `/utils/main-depts`
    try {
      await axios
        .get(uri)
        .then(result => setMainDepts(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
      fetchPnames()
      fetchContractTypes()
      fetchPositions()
      fetchDepts()
      fetchMainDepts()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  const onSubmit = data => {
    console.log(data)
    setLoading(true)
    let uri = apiConfig.baseURL + `/staff`
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
        //   toast.error(data.message)
          toast.error(data.errors[0].msg)
        }
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      })
  }

  return (
    <div>
        <Grid container spacing={6}>
          <Grid item lg={12} md={12} xs={12}>
          <Box sx={{ width: '100%' }}>
                <Card>
                    <CardHeader title='ข้อมูลสมาชิก' titleTypographyProps={{ variant: 'h6' }} />
                    <Divider sx={{ margin: 0 }} />

                    <Toaster />
                    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                        <CardContent>
                        <Grid container spacing={5}>
                            <Grid item xs={12} md={6} lg={3}>
                                <FormControl fullWidth>
                                    <InputLabel>คำนำหน้า</InputLabel>
                                    <Select label='คำนำหน้า'  {...register('pname', { required: true })}>
                                    {pNames.map(item => {
                                        return (
                                        <MenuItem key={item.pname} value={item.pname}>
                                            {item.pname}
                                        </MenuItem>
                                        )
                                    })}
                                    </Select>
                                </FormControl>
                                {errors.pname && errors.pname.type === 'required' && (
                                    <FormHelperText id='pname' sx={{ color: '#d32f2f' }}>
                                    Error : กรุณาเลือกคำนำหน้า
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <TextField fullWidth label='ชื่อ'  {...register('fname', { required: true })} />
                                {errors.fname && errors.fname.type === 'required' && (
                                    <FormHelperText id='fname' sx={{ color: '#d32f2f' }}>
                                    Error : กรุณาใส่ข้อมูลชื่อ
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <TextField fullWidth label='สกุล' {...register('lname', { required: true })} />
                                {errors.lname && errors.lname.type === 'required' && (
                                    <FormHelperText id='lname' sx={{ color: '#d32f2f' }}>
                                    Error : กรุณาใส่ข้อมูลสกุล
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <TextField fullWidth label='เลขที่บัตรประชาชน'  {...register('cid', { required: true })} />
                                {errors.cid && errors.cid.type === 'required' && (
                                    <FormHelperText id='cid' sx={{ color: '#d32f2f' }}>
                                    Error : กรุณาใส่ข้อมูลเลขที่บัตรประชาชน
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <FormControl fullWidth>
                                    <InputLabel>เพศ</InputLabel>
                                    <Select label='เพศ'  {...register('sex', { required: true })} >
                                    <MenuItem key={1} value={1}>
                                        ชาย
                                    </MenuItem>
                                    <MenuItem key={2} value={2}>
                                        หญิง
                                    </MenuItem>
                                    </Select>
                                </FormControl>
                                {errors.sex && errors.sex.type === 'required' && (
                                    <FormHelperText id='sex' sx={{ color: '#d32f2f' }}>
                                    Error : กรุณาเลือกคเพศ
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <TextField fullWidth label='วันเกิด' type='date' InputLabelProps={{ shrink: true, }}   {...register('birthday', { required: true })} />
                                {errors.birthday && errors.birthday.type === 'required' && (
                                    <FormHelperText id='birthday' sx={{ color: '#d32f2f' }}>
                                    Error : กรุณาใส่ข้อมูลวันเกิด
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <TextField fullWidth label='โทรศัพท์' type='text'  {...register('contactNo')} />
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <TextField fullWidth label='อีเมล' type='text' {...register('email')} />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <TextField fullWidth label='ที่อยู่' type='text' {...register('address')} />
                            </Grid>
                        </Grid>
                        </CardContent>
                        <CardHeader title='ข้อมูลการทำงาน' titleTypographyProps={{ variant: 'h6' }} />
                        <Divider sx={{ margin: 0 }} />
                        <CardContent>
                            <Grid container spacing={5}>
                                <Grid item xs={12} md={6} lg={3}>
                                    <TextField fullWidth label='วันที่บรรจุ' type='date'  InputLabelProps={{ shrink: true, }} {...register('startDate', { required: true })} />
                                    {errors.startDate && errors.startDate.type === 'required' && (
                                        <FormHelperText id='startDate' sx={{ color: '#d32f2f' }}>
                                        Error : กรุณาใส่ข้อมูลวันที่บรรจุ
                                        </FormHelperText>
                                    )}
                                </Grid>
                                <Grid item xs={12} md={6} lg={3}>
                                    <FormControl fullWidth>
                                        <InputLabel>สถานภาพการทำงาน</InputLabel>
                                        <Select label='สถานภาพการทำงาน'  {...register('contractTypeId', { required: true })}>
                                            {contractTypes.map(item => {
                                                return (
                                                    <MenuItem key={item.contractTypeId} value={item.contractTypeId}>
                                                        {item.contractTypeName}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                    {errors.contractTypeId && errors.contractTypeId.type === 'required' && (
                                        <FormHelperText id='contractTypeId' sx={{ color: '#d32f2f' }}>
                                        Error : กรุณาเลือกสถานภาพการทำงาน
                                        </FormHelperText>
                                    )}
                                </Grid>
                                <Grid item xs={12} md={6} lg={3}>
                                    <FormControl fullWidth>
                                        <InputLabel>กลุ่มงาน</InputLabel>
                                        <Select label='กลุ่มงาน' {...register('mainDeptId', { required: true })}>
                                            {mainDepts.map(item => {
                                                return (
                                                    <MenuItem key={item.mainDeptId} value={item.mainDeptId}>
                                                        {item.mainDeptName}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                    {errors.mainDeptId && errors.mainDeptId.type === 'required' && (
                                    <FormHelperText id='mainDeptId' sx={{ color: '#d32f2f' }}>
                                    Error : กรุณาเลือกกลุ่มงาน
                                    </FormHelperText>
                                )}
                                </Grid>
                                <Grid item xs={12} md={6} lg={3}>
                                    <FormControl fullWidth>
                                        <InputLabel>หน่วยงาน</InputLabel>
                                        <Select label='หน่วยงาน' {...register('deptId', { required: true })}>
                                            {depts.map(item => {
                                                return (
                                                    <MenuItem key={item.deptId} value={item.deptId}>
                                                        {item.deptName}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                    {errors.deptId && errors.deptId.type === 'required' && (
                                    <FormHelperText id='deptId' sx={{ color: '#d32f2f' }}>
                                    Error : กรุณาเลือกหน่วยงาน
                                    </FormHelperText>
                                )}
                                </Grid>
                                <Grid item xs={12} md={6} lg={3}>
                                    <FormControl fullWidth>
                                        <InputLabel>ตำแหน่ง</InputLabel>
                                        <Select label='ตำแหน่ง'  {...register('positionId', { required: true })}>
                                            {positions.map(item => {
                                                return (
                                                    <MenuItem key={item.positionId} value={item.positionId}>
                                                        {item.positionName}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                    {errors.positionId && errors.positionId.type === 'required' && (
                                    <FormHelperText id='positionId' sx={{ color: '#d32f2f' }}>
                                    Error : กรุณาเลือกตำแหน่ง
                                    </FormHelperText>
                                )}
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider sx={{ margin: 0 }} />
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
                </Box>
          </Grid>
        </Grid>
                                
    </div>
  )
}

export default FormLayouts
