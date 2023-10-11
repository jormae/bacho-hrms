// ** MUI Imports
import React, { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import AvatarGroup from '@mui/material/AvatarGroup'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import SaveIcon from '@material-ui/icons/Save';
import LoadingButton from '@mui/lab/LoadingButton'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'
import Divider from '@mui/material/Divider'

import { StaffContext } from 'src/pages/staff/[cid]'
// import { LoanStaffContext } from 'src/pages/loan/[cid]/[loanId]'

const CardUser = () => {

  const staffDetail = useContext(StaffContext) 
  // const loanStaffDetail = useContext(LoanStaffContext) 
  // const staffName = typeof window !== 'undefined' ? localStorage.getItem('staffName') : null
  const user = typeof staffDetail !== 'undefined' ? staffDetail : ''
  const cid = staffDetail?.cid
  // console.log('cid = '+cid)
  // console.log('staffDetail = '+staffDetail)

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: { otherLoans: '1' }
  });
  const [loading, setLoading] = React.useState(false)

  const onSubmit = data => {
      // setLoading(true)
      console.log(data)
      // let json = JSON.stringify(data);
      // console.log(json);
      // let string = data.toString(json)
      // console.log(string);

      // const newArray = data.toString();
      // console.log(newArray);
      // var arrayOfNumbers = arrayOfStrings.map(Number);
      // console.log(arrayOfNumbers);

      // let join = data.join("");
      // console.log(join)

      let uri = apiConfig.baseURL + `/utils/other-loans/${cid}`
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
    
    <Card sx={{ position: 'relative' }}>
      <Toaster />

      <CardMedia sx={{ height: '12.625rem' }} image='/images/cards/background-user.png' />
      <Box sx={{ width:'100%', display: 'flex',  flexWrap: 'wrap',flexDirection: 'column', alignItems:'center'}}>

      <Avatar
        alt='Robert Meyer'
        src='/images/avatars/1.png'
        style={{ display: 'flex',  flexWrap: 'wrap',flexDirection: 'column', alignItems:'center' }}
        sx={{
          width: 120,
          height: 120,
          top: '8.28125rem',
          position: 'absolute',
          border: theme => `0.25rem solid ${theme.palette.common.white}`
        }}
      />
      </Box>
      <CardContent>
        <Box
          sx={{
            mt: 5.75,
            mb: 8.75,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignContent:'center',
          }}
        >
          <Box sx={{mt:5, width:'100%', display: 'flex',  flexWrap: 'wrap',flexDirection: 'column', alignItems:'center'}}>
            <Typography variant='h6' align='center' sx={{ color: 'primary.main',display: 'flex', alignItems: 'center', justifyContent: 'center', }}>{user?.staffName}</Typography>
            <Typography align="right" sx={{ color: 'primary.main' }}>{user?.staffTypeName}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            mt: 5.75,
            mb: 8.75,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* <Link href={`../../loan-payment/${user?.cid}`} color='primary'>
            <Button variant='outlined'>ชำระเงินกู้</Button>
          </Link> */}
          <Link href={`../../investment-form/${user?.cid}`} color='primary'>
            <Button variant='outlined'>ฝาก-ถอนหุ้น</Button>
          </Link>
          <Link href={`../../loan-form/${user?.cid}`} color='primary'>
            <Button variant='outlined'>ใบคำร้อง</Button>
          </Link>
        </Box>
        <Divider/>
        {/* <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='h6' align='center' sx={{ mb:2 }}>
            รายการหนี้อื่นๆ
          </Typography>
        </Box>
        <form>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <Checkbox
              type='checkbox'
              value='1'
              placeholder='เงินสมทบ'
              {...register('otherLoans')}
              className='mx-3'
              // checked={false}
            />
            <label htmlFor=''>เงินสมทบ</label>
          </Grid>
          <Grid item xs={6}>
            <Checkbox
              type='checkbox'
              value='2'
              placeholder='ธนาคาร'
              {...register('otherLoans')}
              className='mx-3'
            />
            <label htmlFor=''>ธนาคาร</label>
          </Grid>
          <Grid item xs={6}>
            <Checkbox
              type='checkbox'
              value='3'
              placeholder='กยศ.'
              {...register('otherLoans')}
              className='mx-3'
            />
            <label htmlFor=''>กยศ.</label>
          </Grid>
          <Grid item xs={6}>
            <Checkbox
              type='checkbox'
              value='4'
              placeholder='ค่าน้ำ-ค่าไฟ'
              {...register('otherLoans')}
              className='mx-3'
            />
            <label htmlFor=''>ค่าน้ำ-ค่าไฟ</label>
          </Grid>
          <Grid item xs={6}>
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
          </Grid>
        </Grid>
      </form> */}

      </CardContent>
    </Card>
  )
}

export default CardUser
