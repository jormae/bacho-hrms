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

import { DashboardStrDateContext } from 'src/pages/index'

const TableReportDailyDeptAttendance = () => {

    const strDate = useContext(DashboardStrDateContext)

    const { register } = useForm()
    const [search, setSearch] = useState('')
    const i = 1
    const today = moment().format('YYYY-MM-DD')
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
    const userRoleId = typeof window !== 'undefined' ? localStorage.getItem('userRoleId') : null

    const mainDeptId = typeof window !== 'undefined' ? localStorage.getItem('mainDeptId') : null
    const mainDeptName = typeof window !== 'undefined' ? localStorage.getItem('mainDeptName') : null
    const deptId = typeof window !== 'undefined' ? localStorage.getItem('deptId') : null
    const deptName = typeof window !== 'undefined' ? localStorage.getItem('deptName') : null
    const [reportDailyDeptAttendances, setReportDailyDeptAttendances] = useState({ blogs: [] })

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

    const handleDeptChangeDate = async data => {
        console.log(data.target.value)
        setDate(data.target.value)
        let uri = apiConfig.baseURL + `/reports/daily/attendances/dept/${deptId}/${data.target.value}`
        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            setReportDailyDeptAttendances({ blogs: data })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchDailyAttendanceDeptReports = async () => {
        let uri = apiConfig.baseURL + `/reports/daily/attendances/dept/${deptId}/${today}`
        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            setReportDailyDeptAttendances({ blogs: data })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchDailyAttendanceDeptReports()
    }, [])

    return (
        <Card>
            <CardHeader
                title={`รายงานข้อมูลลงเวลาทำงานวันที่ ${strDate} ${deptName}`}
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
                                    label='เลือกวันที่'
                                    type='date'
                                    onChange={handleDeptChangeDate}
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
                            {reportDailyDeptAttendances.blogs
                                .filter(row => {
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
                    count={reportDailyDeptAttendances.blogs.length}
                    rowsPerPage={rpg}
                    page={pg}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </CardContent>
        </Card>
    )
}

export default TableReportDailyDeptAttendance
