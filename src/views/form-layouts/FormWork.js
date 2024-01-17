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
import FormHelperText from '@mui/material/FormHelperText'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import moment from 'moment'

// ** Icons Imports
import SaveIcon from '@material-ui/icons/Save'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import LoadingButton from '@mui/lab/LoadingButton'
import Slide from '@mui/material/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
})

import { StaffContext, ContractTypesContext, DeptsContext, PositionsContext } from 'src/pages/staff/[cid]'

const FormWork = () => {
    const staffDetail = useContext(StaffContext)
    const contractTypes = useContext(ContractTypesContext)
    const depts = useContext(DeptsContext)
    const positions = useContext(PositionsContext)

    console.log('staffDetail = ' + staffDetail)
    const [loading, setLoading] = React.useState(false)
    const startDate = moment(staffDetail?.startDate).format('YYYY-MM-DD')

    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm()

    const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null
    const cid = staffDetail?.cid
    console.log('cid = ' + cid)
    console.log('username = ' + username)

    const onSubmit = data => {
        setLoading(true)
        let cid = staffDetail?.cid
        let uri = apiConfig.baseURL + `/staff/work/${cid}`
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
                            <TextField fullWidth label='วันที่บรรจุ' type='date' defaultValue={startDate} InputLabelProps={{ shrink: true, }} {...register('startDate')} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormControl fullWidth>
                                <InputLabel>สถานภาพการทำงาน</InputLabel>
                                <Select label='สถานภาพการทำงาน' defaultValue={staffDetail?.contractTypeId ?? ''} {...register('contractTypeId', { required: true })}>
                                    {contractTypes.map(item => {
                                        return (
                                            <MenuItem key={item.contractTypeId} value={item.contractTypeId}>
                                                {item.contractTypeName}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormControl fullWidth>
                                <InputLabel>หน่วยงาน</InputLabel>
                                <Select label='หน่วยงาน' defaultValue={staffDetail?.deptId ?? ''} {...register('deptId', { required: true })}>
                                    {depts.map(item => {
                                        return (
                                            <MenuItem key={item.deptId} value={item.deptId}>
                                                {item.deptName}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormControl fullWidth>
                                <InputLabel>ตำแหน่ง</InputLabel>
                                <Select label='ตำแหน่ง' defaultValue={staffDetail?.positionId ?? ''} {...register('positionId', { required: true })}>
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
                            <FormControl fullWidth>
                                <InputLabel>สถานะการทำงาน</InputLabel>
                                <Select label='สถานะการทำงาน' defaultValue={staffDetail.workStatusId} {...register('workStatusId', { required: true })} >
                                    <MenuItem key={1} value={1}>
                                        ทำงาน
                                    </MenuItem>
                                    <MenuItem key={0} value={0}>
                                        ไม่ทำงาน
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* <Grid item xs={12} md={6} lg={4}>
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
                        
                        <Grid item xs={12} md={6} lg={6}>
                            <TextField fullWidth label='โทรศัพท์' type='text' {...register('contactNo')} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <TextField fullWidth label='อีเมล' type='text' {...register('email')} />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <TextField fullWidth label='ที่อยู่' type='text' {...register('address')} />
                        </Grid> */}
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

export default FormWork
