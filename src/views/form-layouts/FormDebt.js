// ** React Imports
import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
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
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'
import Divider from '@mui/material/Divider'
import FormHelperText from '@mui/material/FormHelperText';

// ** Icons Imports
import SaveIcon from '@material-ui/icons/Save';
import LoadingButton from '@mui/lab/LoadingButton'
import moment from 'moment'


const FormDebt = () => {

    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const [loading, setLoading] = React.useState(false)
    const memberName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null
    const memberRoleId = typeof window !== 'undefined' ? localStorage.getItem('memberRoleId') : null
    const [memberInfo, setMemberInfo] = useState()

    const fetchMemberInfo = async () => {
        let uri = apiConfig.baseURL + `/members`
        console.log(uri)
        try {
          await axios
            .get(uri)
            .then(result => setMemberInfo(result.data))
            .catch(error => console.log('An error occurred' + error))
        } catch (error) {
          console.log(error)
        }
      }

    const onSubmit = data => {
        setLoading(true)
        console.log(data)
        let uri = apiConfig.baseURL + `/debts`

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

    useEffect(() => {
        fetchMemberInfo()
      }, [])

  return (
    <Card>
      <CardHeader title='เพิ่มข้อมูลหนี้รายเดือน' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <Toaster />
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
            <FormControl fullWidth>
                  <InputLabel>ชื่อลูกหนี้</InputLabel>
                  {memberInfo ? (
                  <Select label='ชื่อลูกหนี้' defaultValue={memberInfo?.nationalId ?? ''} {...register('nationalId')}>
                    {memberInfo.map(item => {
                      return (
                        <MenuItem key={item.nationalId} value={item.nationalId}>
                          {item.memberName}
                        </MenuItem>
                      )
                    })}
                  </Select>
                  ) : (
                      <Skeleton variant='rectangular' width={250} height={55} />
                    )}
                </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
                <TextField fullWidth type='number' label='หนี้ธนาคาร' {...register('bank')} />
            </Grid>
            <Grid item xs={12} md={2}>
                <TextField fullWidth type='number' label='หนี้กยศ.' {...register('studentLoan')} />
            </Grid>
            <Grid item xs={12} md={2}>
                <TextField fullWidth type='number' label='เงินสมทบ' {...register('allowance')} />
            </Grid>
            <Grid item xs={12} md={2}>
                <TextField fullWidth type='number' label='ค่าเช่าบ้าน' {...register('houseRent')} />
            </Grid>
            <input type="hidden" value={memberName} {...register('username')}/>
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

export default FormDebt
