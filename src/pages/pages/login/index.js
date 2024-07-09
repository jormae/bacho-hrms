import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import themeConfig from 'src/configs/themeConfig'
import apiConfig from 'src/configs/apiConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import LoadingButton from '@mui/lab/LoadingButton'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  console.log('base uri = ' + process.env.REACT_APP_BASE_URI)

  const [loading, setLoading] = React.useState(false)
  const [err, setError] = useState(false)
  const [message, setMessage] = useState()

  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  const theme = useTheme()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = data => {
    setLoading(true)
    let uri = apiConfig.baseURL + '/auth/signin'
    fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data)
        if (data.status == 'success') {
          localStorage.setItem('token', data.token)
          localStorage.setItem('username', data.username)
          localStorage.setItem('staffName', data.staffName)
          localStorage.setItem('userRoleId', data.userRoleId)
          localStorage.setItem('deptId', data.deptId)
          localStorage.setItem('mainDeptId', data.mainDeptId)
          localStorage.setItem('deptName', data.deptName)
          localStorage.setItem('mainDeptName', data.mainDeptName)
          localStorage.setItem('positionName', data.positionName)
          localStorage.setItem('avatar', data.avatar)
          window.location = `/`

          // window.location = `/staff/${data.username}`

          let expires = new Date()
          expires.setTime(expires.getTime() + 1 * 60 * 60000) //last 1 hr (1 * 60 * 60000)

          // Cookies.set('bch_token', data.token, { secure: true, expires, sameSite: 'Lax', domain: '.bachohospital.org' })
          // Cookies.set('bch_user', data.username, {
          //   secure: true,
          //   expires,
          //   sameSite: 'Lax',
          //   domain: '.bachohospital.org'
          // })

          Cookies.set('bch_token', data.token, { secure: true, expires, sameSite: 'Lax', domain: 'localhost' })
          Cookies.set('bch_user', data.username, { secure: true, expires, sameSite: 'Lax', domain: 'localhost' })
        } else {
          setError(true)
          setMessage(data.message)
        }
        setLoading(false)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box
              component='img'
              sx={{
                height: 150,
                width: 150
              }}
              alt='Bacho HRMS'
              src='/images/logos/HRMS.png'
            />
            <Typography>{process.env.REACT_APP_BASE_URI}</Typography>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {/* {themeConfig.templateName} */}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' textAlign='center' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              {themeConfig.templateName}
            </Typography>
            {err ? (
              <Alert severity='error'>
                {/* <AlertTitle>Error</AlertTitle> */}
                {message}
              </Alert>
            ) : (
              ''
            )}
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <TextField
              autoFocus
              fullWidth
              label='ชื่อบัญชี'
              sx={{ marginBottom: 4 }}
              onKeyUp={() => {
                setError(false)
              }}
              {...register('username', { required: true })}
            />

            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>รหัสผ่าน</InputLabel>
              <OutlinedInput
                label='รหัสผ่าน'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                onKeyUp={() => {
                  setError(false)
                }}
                {...register('password', { required: true })}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            ></Box>
            <LoadingButton
              fullWidth
              type='submit'
              color='primary'
              onClick={handleSubmit(onSubmit)}
              loading={loading}
              variant='contained'
              size='large'
            >
              เข้าสู่ระบบ
            </LoadingButton>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
