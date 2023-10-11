// ** React Imports
import React, { useContext, useState } from 'react'
import Skeleton from '@mui/material/Skeleton'
import { useForm } from 'react-hook-form'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import toast, { Toaster } from 'react-hot-toast'
import apiConfig from 'src/configs/apiConfig'
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// ** Icons Imports
import SaveIcon from '@material-ui/icons/Save';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LoadingButton from '@mui/lab/LoadingButton'
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

import  {StaffContext} from 'src/pages/staff/[cid]'

const FormAccount = () => {

    const staffDetail = useContext(StaffContext)
    console.log("staffDetail = "+staffDetail)

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const [saveLoading, setSaveLoading] = React.useState(false)
  const [confirmLoading, setConfirmLoading] = React.useState(false)
  const [newPassword, setNewPassword] = useState()
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null
  const staffRoleId = typeof window !== 'undefined' ? localStorage.getItem('staffRoleId') : null
  const cid = staffDetail?.cid;
  console.log('cid = '+cid)
  console.log('username = '+username)
  const onSubmit = data => {
    setSaveLoading(true)
    console.log('onSubmit')
    console.log(data)

    let uri = apiConfig.baseURL + `/auth/${data.cid}`
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
        setSaveLoading(false)
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

    const handleReset = data => {
        setConfirmLoading(true)

        console.log("handleReset")
        console.log(data)
        let uri = apiConfig.baseURL + `/auth/reset/${staffDetail?.cid}`
        console.log(uri)

        fetch(uri, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setConfirmLoading(false)
            if (data.status == 'success') {
            toast.success(data.message)
            } else {
            toast.error(data.message)
            }
            handleClose()
        })
        .catch(function (error) {
            console.log(JSON.stringify(error))
        })
    }

  return (
    
    <Card>
      <CardHeader title='ข้อมูลบัญชีผู้ใช้' titleTypographyProps={{ variant: 'h6' }} />
      <Toaster />
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"คุณแน่ใจ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          กรุณายืนยันการรีเซตรหัสผ่านใหม่? รหัสผ่านใหม่ของบัญชีนี้คือ 123456
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='secondary' onClick={handleClose}>ยกเลิก</Button>
          {/* <Button variant='contained' color='primary' onClick={handleReset} autoFocus>
            ตกลง
          </Button> */}
          <Box sx={{ '& > button': { m: 1 } }}></Box>
                <LoadingButton
                  color='primary'
                  onClick={handleReset}
                  loading={confirmLoading}
                  loadingPosition='start'
                  startIcon={<SaveIcon />}
                  variant='contained'
                  size='large'
                  autoFocus
                >
                  ตกลง
                </LoadingButton>
        </DialogActions>
      </Dialog>
        <CardContent>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} >
          <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
              {staffDetail?.cid ? (
                <TextField fullWidth InputProps={{ readOnly: true }} label='เลขที่บัตรประชาชน'  defaultValue={staffDetail.cid}/>
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              {staffDetail?.staffName ? (
                <TextField fullWidth InputProps={{ readOnly: true }} label='ชื่อ-สกุล'  defaultValue={staffDetail.staffName}/>
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              {staffDetail?.cid ? (
                <TextField fullWidth InputProps={{ readOnly: true }} label='สถานะบัญชี' defaultValue={staffDetail.staffStatusId == 1 ? 'ปกติ' : 'ปิดการใช้งาน'} />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              {staffDetail?.cid ? (
                <TextField fullWidth InputProps={{ readOnly: true }} label='เลขที่บัตรประชาชน' defaultValue={staffDetail.cid} {...register('cid')}/>
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={4}>
                <TextField fullWidth label='รหัสผ่านใหม่' type='password' {...register('newPassword', { required: true, minLength:6 })}/>
                {errors.newPassword && errors.newPassword.type === "required" && (
                    <FormHelperText id="newPassword" sx={{color:'#d32f2f'}}>Error : กรุณาใส่ข้อมูลรหัสผ่านใหม่</FormHelperText>
                  )}
                {errors.newPassword && errors.newPassword.type === "minLength" && (
                    <FormHelperText id="newPassword" sx={{color:'#d32f2f'}}>Error : กรุณากำหนดรหัสผ่านความยาว 6 ตัวขึ้นไป</FormHelperText>
                  )}
            </Grid>
            <Grid item xs={12} md={4}>
                <TextField fullWidth label='ยืนยันรหัสผ่านใหม่' type='password' 
                {...register('confirmPassword', { required: true})}/>
                {errors.confirmPassword && errors.confirmPassword.type === "required" && (
                    <FormHelperText id="confirmPassword" sx={{color:'#d32f2f'}}>Error : กรุณาใส่ข้อมูลยืนยันรหัสผ่านใหม่</FormHelperText>
                  )}
                 {errors.confirmPassword && errors.confirmPassword !== newPassword && (
                    <FormHelperText id="confirmPassword" sx={{color:'#d32f2f'}}>Error : คุณใส่ข้อมูลยืนยันรหัสผ่านไม่เหมือนกัน</FormHelperText>
                  )}
            </Grid>
            <Grid item xs={6}>
            {username == cid ? ( 
              <Box
               m={1} //margin
               display="flex"
               justifyContent="flex-start"
               alignItems="flex-start"
              >
                <Box sx={{ '& > button': { m: 1 } }}></Box>
                <LoadingButton
                  type='submit'
                  color='primary'
                  onClick={handleSubmit(onSubmit)}
                  loading={saveLoading}
                  loadingPosition='start'
                  startIcon={<SaveIcon />}
                  variant='contained'
                  size='large'
                >
                  บันทึกรหัสผ่านใหม่
                </LoadingButton>
              </Box>
             ) : ''}
             </Grid> 
            <Grid item xs={6}>
            { staffRoleId == 1 || staffRoleId == 3 ? (
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
                  color='primary'
                  onClick={handleClickOpen}
                  startIcon={<LockOpenIcon />}
                  variant='contained'
                  size='large'
                >
                  Reset Password
                </LoadingButton>
              </Box>
              ) : ''}
              </Grid>
          </Grid>
          </form>
        </CardContent>
    </Card>
  )
}

export default FormAccount
