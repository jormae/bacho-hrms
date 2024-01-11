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
import SaveIcon from '@material-ui/icons/Save'
import LoadingButton from '@mui/lab/LoadingButton'
import moment from 'moment'

import {
    LeaveDetailContext
} from 'src/pages/leaves/leaveId/[leaveId]'

const FormLeaveDetail = () => {

    const leaveDetail = useContext(LeaveDetailContext)

    const { register, handleSubmit, reset } = useForm()
    const [loading, setLoading] = React.useState(false)
    const memberRole = typeof window !== 'undefined' ? localStorage?.getItem('memberRoleId') : ''

    console.log(memberRole)

    const onSubmit = data => {
        setLoading(true)
        console.log(data)
        let memberId = leaveDetail?.cid
        console.log(memberId)

        let uri = apiConfig.baseURL + `/members/${cid}`

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
            <CardHeader title='ข้อมูลใบลา' titleTypographyProps={{ variant: 'h6' }} />
            <Toaster />
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={3} >
                            {leaveDetail?.leaveId ? (
                                <TextField InputProps={{ readOnly: true }} fullWidth label='รหัสใบลา' defaultValue={leaveDetail?.leaveId} />
                            ) : (
                                <Skeleton variant='rectangular' fullWidth height={55} />
                            )}
                        </Grid>
                        <Grid item xs={12} md={3} >
                            {leaveDetail?.leaveId ? (
                                <TextField InputProps={{ readOnly: true }} fullWidth label='ชื่อ-สกุล' defaultValue={leaveDetail?.staffName} />
                            ) : (
                                <Skeleton variant='rectangular' fullWidth height={55} />
                            )}
                        </Grid>
                        <Grid item xs={12} md={3} >
                            {leaveDetail?.leaveId ? (
                                <TextField InputProps={{ readOnly: true }} fullWidth label='ตำแหน่ง' defaultValue={leaveDetail?.positionName} />
                            ) : (
                                <Skeleton variant='rectangular' fullWidth height={55} />
                            )}
                        </Grid>
                        <Grid item xs={12} md={3} >
                            {leaveDetail?.leaveId ? (
                                <TextField InputProps={{ readOnly: true }} fullWidth label='หน่วยงาน' defaultValue={leaveDetail?.deptName} />
                            ) : (
                                <Skeleton variant='rectangular' fullWidth height={55} />
                            )}
                        </Grid>
                        <Grid item xs={12} md={3} >
                            {leaveDetail?.leaveId ? (
                                <TextField InputProps={{ readOnly: true }} fullWidth label='ประเภทการลา' defaultValue={leaveDetail?.leaveTypeName} />
                            ) : (
                                <Skeleton variant='rectangular' fullWidth height={55} />
                            )}
                        </Grid>
                        <Grid item xs={12} md={3} >
                            {leaveDetail?.leaveId ? (
                                <TextField InputProps={{ readOnly: true }} fullWidth label='วันที่เริ่มลา' defaultValue={moment(leaveDetail?.leaveStartDate).add(543, 'year').format('DD/MM/YYYY')} />
                            ) : (
                                <Skeleton variant='rectangular' fullWidth height={55} />
                            )}
                        </Grid>
                        <Grid item xs={12} md={3} >
                            {leaveDetail?.leaveId ? (
                                <TextField InputProps={{ readOnly: true }} fullWidth label='วันที่สิ้นสุดลา' defaultValue={moment(leaveDetail?.leaveEndDate).add(543, 'year').format('DD/MM/YYYY')} />
                            ) : (
                                <Skeleton variant='rectangular' fullWidth height={55} />
                            )}
                        </Grid>
                        <Grid item xs={12} md={3} >
                            {leaveDetail?.leaveId ? (
                                <TextField InputProps={{ readOnly: true }} fullWidth label='จำนวนวันลา(วัน)' defaultValue={leaveDetail?.totalLeaveDay} />
                            ) : (
                                <Skeleton variant='rectangular' fullWidth height={55} />
                            )}
                        </Grid>
                        <Grid item xs={12} md={3} >
                            {leaveDetail?.leaveId ? (
                                <TextField InputProps={{ readOnly: true }} fullWidth label='ช่วงเวลา' defaultValue={leaveDetail?.leaveSessionName} />
                            ) : (
                                <Skeleton variant='rectangular' fullWidth height={55} />
                            )}
                        </Grid>
                        <Grid item xs={12} md={3} >
                            {leaveDetail?.leaveId ? (
                                <TextField InputProps={{ readOnly: true }} fullWidth label='ชื่อผูรับผิดชอบงานแทน' defaultValue={leaveDetail?.replacementColleagueName} />
                            ) : (
                                <Skeleton variant='rectangular' fullWidth height={55} />
                            )}
                        </Grid>
                        <Grid item xs={12} md={3} >
                            {leaveDetail?.leaveId ? (
                                <TextField InputProps={{ readOnly: true }} fullWidth label='สถานะใบลา' defaultValue={leaveDetail?.leaveStatusName} />
                            ) : (
                                <Skeleton variant='rectangular' fullWidth height={55} />
                            )}
                        </Grid>
                    </Grid>
                </CardContent>
                <CardHeader title='ข้อมูลการอนุมัติ' titleTypographyProps={{ variant: 'h6' }} />
                <CardContent>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={4} >
                            {leaveDetail?.leaveId ? (
                                <TextField InputProps={{ readOnly: true }} fullWidth label='ชื่อผูรับผิดชอบงานแทน' defaultValue={leaveDetail?.replacementColleagueName} />
                            ) : (
                                <Skeleton variant='rectangular' fullWidth height={55} />
                            )}
                        </Grid>
                        <Grid item xs={12} md={4} >
                            {leaveDetail?.leaveId ? (
                                <TextField InputProps={{ readOnly: true }} fullWidth label='วันที่-เวลา' defaultValue={moment(leaveDetail?.colleagueSignDateTime).add(543, 'year').format('DD/MM/YYYY HH:mm')} />
                            ) : (
                                <Skeleton variant='rectangular' fullWidth height={55} />
                            )}
                        </Grid>
                        <Grid item xs={12} md={4} >
                            {leaveDetail?.leaveId ? (
                                <TextField InputProps={{ readOnly: true }} fullWidth label='สถานะ' defaultValue={leaveDetail?.colleagueSign} />
                            ) : (
                                <Skeleton variant='rectangular' fullWidth height={55} />
                            )}
                        </Grid>

                        <Grid item xs={12} md={4} >
                            {leaveDetail?.leaveId ? (
                                <TextField InputProps={{ readOnly: true }} fullWidth label='ชื่อหัวหน้างาน' defaultValue={leaveDetail?.headName} />
                            ) : (
                                <Skeleton variant='rectangular' fullWidth height={55} />
                            )}
                        </Grid>
                        <Grid item xs={12} md={4} >
                            {leaveDetail?.leaveId ? (
                                <TextField InputProps={{ readOnly: true }} fullWidth label='วันที่-เวลา' defaultValue={moment(leaveDetail?.headSignDateTime).add(543, 'year').format('DD/MM/YYYY HH:mm')} />
                            ) : (
                                <Skeleton variant='rectangular' fullWidth height={55} />
                            )}
                        </Grid>
                        <Grid item xs={12} md={4} >
                            {leaveDetail?.leaveId ? (
                                <TextField InputProps={{ readOnly: true }} fullWidth label='สถานะ' defaultValue={leaveDetail?.headSign} />
                            ) : (
                                <Skeleton variant='rectangular' fullWidth height={55} />
                            )}
                        </Grid>

                        <Grid item xs={12} md={4} >
                            {leaveDetail?.leaveId ? (
                                <TextField InputProps={{ readOnly: true }} fullWidth label='ชื่อหัวหน้ากลุ่มงาน' defaultValue={leaveDetail?.managerName} />
                            ) : (
                                <Skeleton variant='rectangular' fullWidth height={55} />
                            )}
                        </Grid>
                        <Grid item xs={12} md={4} >
                            {leaveDetail?.leaveId ? (
                                <TextField InputProps={{ readOnly: true }} fullWidth label='วันที่-เวลา' defaultValue={moment(leaveDetail?.managerSignDateTime).add(543, 'year').format('DD/MM/YYYY HH:mm')} />
                            ) : (
                                <Skeleton variant='rectangular' fullWidth height={55} />
                            )}
                        </Grid>
                        <Grid item xs={12} md={4} >
                            {leaveDetail?.leaveId ? (
                                <TextField InputProps={{ readOnly: true }} fullWidth label='สถานะ' defaultValue={leaveDetail?.managerSign} />
                            ) : (
                                <Skeleton variant='rectangular' fullWidth height={55} />
                            )}
                        </Grid>

                        <Grid item xs={12} md={4} >
                            {leaveDetail?.leaveId ? (
                                <TextField InputProps={{ readOnly: true }} fullWidth label='ชื่อผู้บริหาร' defaultValue={leaveDetail?.directorName} />
                            ) : (
                                <Skeleton variant='rectangular' fullWidth height={55} />
                            )}
                        </Grid>
                        <Grid item xs={12} md={4} >
                            {leaveDetail?.leaveId ? (
                                <TextField InputProps={{ readOnly: true }} fullWidth label='วันที่-เวลา' defaultValue={moment(leaveDetail?.directorSignDateTime).add(543, 'year').format('DD/MM/YYYY HH:mm')} />
                            ) : (
                                <Skeleton variant='rectangular' fullWidth height={55} />
                            )}
                        </Grid>
                        <Grid item xs={12} md={4} >
                            {leaveDetail?.leaveId ? (
                                <TextField InputProps={{ readOnly: true }} fullWidth label='สถานะ' defaultValue={leaveDetail?.directorSign} />
                            ) : (
                                <Skeleton variant='rectangular' fullWidth height={55} />
                            )}
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
                                    // onClick={handleSubmit(onSubmit)}
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

export default FormLeaveDetail
