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

import { DashboardReportMainDeptAttendancesContext, DashboardStrDateContext } from 'src/pages/index'

const TableReportDailyMainDeptAttendance = () => {

    const strDate = useContext(DashboardStrDateContext)

    const { register } = useForm()
    const [search, setSearch] = useState('')
    const i = 1
    const today = moment().format('YYYY-MM-DD')
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
    const userRoleId = typeof window !== 'undefined' ? localStorage.getItem('userRoleId') : null

    const mainDeptId = typeof window !== 'undefined' ? localStorage.getItem('mainDeptId') : null
    const mainDeptName = typeof window !== 'undefined' ? localStorage.getItem('mainDeptName') : null
    const [reportDailyMainDeptAttendances, setReportDailyMainDeptAttendances] = useState({ blogs: [] })

    const [deptFilter, setDeptFilter] = useState('all')
    const [deptOptions, setDeptOptions] = useState({ blogs: [] })

    const [pg, setpg] = React.useState(0)
    const [rpg, setrpg] = React.useState(10)

    function handleChangePage(event, newpage) {
        setpg(newpage)
    }

    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value, 10))
        setpg(0)
    }

    const handleChangeDate = async data => {
        console.log(data.target.value)
        setDate(data.target.value)
        let uri = apiConfig.baseURL + `/reports/daily/attendances/main-dept/${mainDeptId}/${data.target.value}`
        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            setReportDailyMainDeptAttendances({ blogs: data })
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangeDept = async data => {
        console.log(data.target.value)

        // setDate(data.target.value)
        // let uri = apiConfig.baseURL + `/reports/daily/attendances/main-dept/${mainDeptId}/${data.target.value}`
        let uri = apiConfig.baseURL + `/reports/daily/attendances/dept/${data.target.value}/${today}`
        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            setReportDailyMainDeptAttendances({ blogs: data })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchDepts = async () => {
        let admin_uri = apiConfig.baseURL + `/utils/depts/`
        let manager_uri = apiConfig.baseURL + `/utils/depts/${mainDeptId}`
        let uri = (userRoleId == 1) ? admin_uri : manager_uri
        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            setDeptOptions({ blogs: data })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchDailyAttendanceMainDeptReports = async () => {
        let admin_uri = apiConfig.baseURL + `/reports/daily/attendances/main-dept-date/${today}`
        let manager_uri = apiConfig.baseURL + `/reports/daily/attendances/main-dept/${mainDeptId}/${today}`
        let uri = (userRoleId == 1) ? admin_uri : manager_uri
        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            setReportDailyMainDeptAttendances({ blogs: data })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchDepts()
        fetchDailyAttendanceMainDeptReports()
    }, [])

    return (
        <Card>
            <CardHeader
                title={`รายงานข้อมูลลงเวลาทำงานวันที่ ${strDate} ${mainDeptName}`}
                titleTypographyProps={{ variant: 'h6' }}
            />
            <Divider sx={{ margin: 0 }} />
            <CardContent>
                <Grid item xs={12} md={12} lg={12}>
                    <form noValidate autoComplete='off'>
                        <Grid container spacing={5}>
                            <Grid item xs={8}>
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
                                <Select
                                    fullWidth
                                    label='หน่วยงาน'
                                    placeholder='เลือกหน่วยงาน'
                                    value={deptFilter}
                                    onChange={handleChangeDept}

                                // onChange={e => setDeptFilter(e.target.value)}
                                >
                                    <MenuItem value='all'>ทั้งหมด</MenuItem>
                                    {deptOptions.blogs.map(row => (
                                        <MenuItem key={row.deptId} value={row.deptId}>
                                            {row.deptName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    fullWidth
                                    label='เลือกวันที่'
                                    type='date'
                                    onChange={handleChangeDate}
                                    defaultValue={today}
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
                                <TableCell align='center'>ชื่อ-สกุล</TableCell>
                                <TableCell align='center'>หน่วยงาน</TableCell>
                                <TableCell align='center'>ชื่อเวร</TableCell>
                                <TableCell align='center'>ลงเวลางาน</TableCell>
                                <TableCell align='center'>ประเภทลงเวลางาน</TableCell>
                                <TableCell align='center'>สถานะ</TableCell>
                                <TableCell align='center'>หมายเหตุ</TableCell>
                                <TableCell align='center'>จัดการ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reportDailyMainDeptAttendances.blogs
                                .filter(row => {
                                    // return deptFilter === 'all' ? row : row.deptName.includes(deptFilter)
                                    return search.toLowerCase() === '' ? row : row.staffName.toLowerCase().includes(search)
                                })
                                .slice(pg * rpg, pg * rpg + rpg)
                                .map(row => (
                                    <TableRow key={row.attendanceId}>
                                        <TableCell align='center' component='th' scope='row'>
                                            {i++}
                                        </TableCell>
                                        <TableCell>{row.staffName}</TableCell>
                                        <TableCell>{row.deptName}</TableCell>
                                        <TableCell align='center'>
                                            {row.shiftName} ({row.startShiftTime} - {row.endShiftTime})
                                        </TableCell>
                                        <TableCell align='center'>
                                            {moment(row.attendanceDateTime).add(-7, 'hour').add(543, 'year').format('DD/MM/YYYY HH:mm')}
                                        </TableCell>
                                        <TableCell align='center'>{row.attendanceTypeId == 1 ? 'เข้างาน' : 'ออกงาน'}</TableCell>
                                        <TableCell align='center'>{row.attendanceStatusId == 1 ? 'ตรงเวลา' : 'สาย'}</TableCell>
                                        <TableCell align='center'>{row.attendanceRemarks}</TableCell>
                                        <TableCell align='center' color='success'>
                                            <Link passHref href={`../../reports/monthly/attendance/cid/${row.cid}`} color='success'>
                                                <Button type='button' variant='outlined'>
                                                    แสดงรายละเอียด
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 50]}
                    component='div'
                    count={reportDailyMainDeptAttendances.blogs.length}
                    rowsPerPage={rpg}
                    page={pg}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </CardContent>
        </Card>
    )
}

export default TableReportDailyMainDeptAttendance
