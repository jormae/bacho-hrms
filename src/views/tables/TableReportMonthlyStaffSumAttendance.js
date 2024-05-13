// ** MUI Imports
import React, { useEffect, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TablePagination from '@mui/material/TablePagination'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Link from 'next/link'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'
import moment from 'moment'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { DashboardStrDateContext, DashboardCidContext } from 'src/pages/index'
import { ReportMonthlyAttendanceCidContext } from 'src/pages/reports/monthly/attendance/cid/[cid].js'

const TableReportMonthlyStaffSumAttendance = () => {

    const strDate = useContext(DashboardStrDateContext)
    const DashboardCid = useContext(DashboardCidContext)
    const ReportMonthlyAttendanceCid = useContext(ReportMonthlyAttendanceCidContext)
    const cid = DashboardCid ?? ReportMonthlyAttendanceCid
    const { register } = useForm()
    const [search, setSearch] = useState('')
    let i = 1
    const month = moment().format('YYYY-MM')
    const [date, setDate] = useState(moment().format('YYYY-MM'))
    const userRoleId = typeof window !== 'undefined' ? localStorage.getItem('userRoleId') : null

    const mainDeptId = typeof window !== 'undefined' ? localStorage.getItem('mainDeptId') : null
    const mainDeptName = typeof window !== 'undefined' ? localStorage.getItem('mainDeptName') : null
    const deptId = typeof window !== 'undefined' ? localStorage.getItem('deptId') : null
    const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null
    const staffName = typeof window !== 'undefined' ? localStorage.getItem('staffName') : null
    const deptName = typeof window !== 'undefined' ? localStorage.getItem('deptName') : null
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

    const strUserName = (cid === undefined) ? username : cid

    // const strUserName = cid
    console.log("DashboardCid = " + DashboardCid)
    console.log("ReportMonthlyAttendanceCid = " + ReportMonthlyAttendanceCid)
    console.log("cid = " + cid)
    console.log("username = " + username)
    console.log("strUserName = " + strUserName)

    const [staffInfo, setStaffInfo] = useState()
    console.log("staffInfo = " + staffInfo)
    const strStaffName = staffInfo ? staffInfo[0]['pname'] + staffInfo[0]['fname'] + " " + staffInfo[0]['lname'] : 'Loading...'
    const strDeptName = staffInfo ? staffInfo[0]['deptName'] : 'Loading...'
    const [reportMonthlyStaffAttendances, setReportMonthlyStaffAttendances] = useState({ blogs: [] })

    const strMonth =
        ' เดือน ' +
        moment(date).format('MMMM') +
        ' พ.ศ.' +
        moment(date).add(543, 'year').format('YYYY')

    const [pg, setpg] = React.useState(0)
    const [rpg, setrpg] = React.useState(10)

    function handleChangePage(event, newpage) {
        setpg(newpage)
    }

    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value, 10))
        setpg(0)
    }

    const handleChangeMonth = async data => {
        console.log(data.target.value)
        setDate(data.target.value)
        let uri = apiConfig.baseURL + `/reports/monthly/sum-attendances/${strUserName}/${data.target.value}`
        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            setReportMonthlyStaffAttendances({ blogs: data })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchMonthlyStaffAttendances = async () => {
        let uri = apiConfig.baseURL + `/reports/monthly/sum-attendances/${strUserName}/${month}`
        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            setReportMonthlyStaffAttendances({ blogs: data })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchStaffInfo = async () => {
        let uri = apiConfig.baseURL + `/staff/${strUserName}/`
        console.log(uri)
        try {
            const { data } = await axios.get(uri, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            })
            setStaffInfo(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchStaffInfo()
        fetchMonthlyStaffAttendances()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <Card>
            <CardHeader
                title={`รายงานข้อมูลสรุปลงเวลา ${strMonth} ${strStaffName} ${strDeptName}`}
                titleTypographyProps={{ variant: 'h6' }}
            />
            <Divider sx={{ margin: 0 }} />
            <CardContent>
                <Grid item xs={12} md={12} lg={12}>
                    <form noValidate autoComplete='off'>
                        <Grid container spacing={5}>
                            <Grid item xs={10}>
                                <TextField
                                    fullWidth
                                    label='ค้นหาเจ้าหน้าที่'
                                    placeholder='พิมพ์ชื่อ-สกุล'
                                    {...register('search', {
                                        onChange: e => {
                                            setSearch(e.target.value)
                                        },
                                        onBlur: e => { }
                                    })}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    fullWidth
                                    label='เลือกเดือน'
                                    type='month'
                                    onChange={handleChangeMonth}
                                    defaultValue={month}
                                    value={date}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Divider sx={{ margin: 0, mt: 5 }} />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>ที่</TableCell>
                                <TableCell align='center'>วันที่</TableCell>
                                <TableCell align='center'>วัน</TableCell>
                                <TableCell align='center'>เวรเช้า</TableCell>
                                <TableCell align='center'>เวร DAY 4</TableCell>
                                <TableCell align='center'>เวร DAY</TableCell>
                                <TableCell align='center'>เวร NIGHT</TableCell>
                                <TableCell align='center'>เวรเช้าครึ่งวัน</TableCell>
                                <TableCell align='center'>บ่าย-ดึก</TableCell>
                                <TableCell align='center'>บ่าย-เที่ยงคืน</TableCell>
                                <TableCell align='center'>เวร 24 ชั่วโมง</TableCell>
                                <TableCell align='center'>เวรหัวรุ่ง 1</TableCell>
                                <TableCell align='center'>เวรหัวรุ่ง 2</TableCell>
                                <TableCell align='center'>ลา</TableCell>
                                <TableCell align='center'>ราชการ</TableCell>
                                <TableCell align='center'>หมายเหตุ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reportMonthlyStaffAttendances.blogs
                                .filter(row => {
                                    return search.toLowerCase() === '' ? row : row.staffName.toLowerCase().includes(search)
                                })
                                .slice(pg * rpg, pg * rpg + rpg)
                                .map(row => (
                                    <TableRow key={row.attendanceId}>
                                        <TableCell align='center' component='th' scope='row'>
                                            {i++}
                                        </TableCell>
                                        <TableCell align='center'>{moment(row.attendanceDate).add(543, 'year').format('DD/MM/YYYY')}</TableCell>
                                        <TableCell align='center'>{moment(row.attendanceDate).format("dddd")}</TableCell>
                                        <TableCell align='center'>{row.checkinShift1} - {row.checkoutShift1}</TableCell>
                                        <TableCell align='center'>{row.checkinShift2} - {row.checkoutShift2}</TableCell>
                                        <TableCell align='center'>{row.checkinShift3} - {row.checkoutShift3}</TableCell>
                                        <TableCell align='center'>{row.checkinShift4} - {row.checkoutShift4}</TableCell>
                                        <TableCell align='center'>{row.checkinShift5} - {row.checkoutShift5}</TableCell>
                                        <TableCell align='center'>{row.checkinShift6} - {row.checkoutShift6}</TableCell>
                                        <TableCell align='center'>{row.checkinShift7} - {row.checkoutShift7}</TableCell>
                                        <TableCell align='center'>{row.checkinShift8} - {row.checkoutShift8}</TableCell>
                                        <TableCell align='center'>{row.checkinShift9} - {row.checkoutShift9}</TableCell>
                                        <TableCell align='center'>{row.checkinShift10} - {row.checkoutShift10}</TableCell>
                                        <TableCell align='center'>{row.leaveTitle}</TableCell>
                                        <TableCell align='center'>{row.outStation ? "ราชการนอกสถานที่" : ""}</TableCell>
                                        <TableCell align='center'>{row.dayRemark}{row.holidayRemark}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 50]}
                    component='div'
                    count={reportMonthlyStaffAttendances.blogs.length}
                    rowsPerPage={rpg}
                    page={pg}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <Link passHref href={`../print/${strUserName}/${date}`} color='success'>
                    <Button type='button' variant='outlined'>
                        พิมพ์รายงาน
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}

export default TableReportMonthlyStaffSumAttendance
