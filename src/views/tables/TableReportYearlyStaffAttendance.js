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
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import moment from 'moment'
import 'moment/locale/th'

import { StaffStrDateContext, StaffCidContext } from 'src/pages/staff/[cid]'

const TableReportYearlyStaffAttendance = () => {



    // const strDate = useContext(DashboardStrDateContext)
    const StaffCid = useContext(StaffCidContext)

    // const StaffDate = useContext(StaffStrDateContext)
    // const DashboardCid = useContext(DashboardCidContext)

    // const ReportMonthlyAttendanceCid = useContext(ReportMonthlyAttendanceCidContext)

    // const cid = DashboardCid ?? ReportMonthlyAttendanceCid

    // console.log('StaffCid = ' + StaffCid)
    let cid
    if (StaffCid) {
        cid = StaffCid
    }

    // else if (DashboardCid) {
    //     cid = DashboardCid
    // }
    console.log('StaffCid = ' + StaffCid)

    console.log('cid = ' + cid)
    const i = 1
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null
    const [yearOptions, setYearOptions] = useState({ blogs: [] })
    const currentYear = moment().format('YYYY')

    const [selectedYear, setSelectedYear] = useState(currentYear)
    const [yearlyAttendanceReports, setYearlyAttendanceReports] = useState({ blogs: [] })
    const strYearBudget = parseInt(selectedYear) + 543
    console.log(yearlyAttendanceReports)

    const fetchYearBudgetOptions = () => {
        let minYear = 2023
        let maxYear = moment(currentYear).format('YYYY')
        let yearOptions = []
        for (let i = minYear; i <= maxYear; i++) {
            yearOptions.push({ year: i })
        }
        setYearOptions({ blogs: yearOptions })
    }

    const handleChange = async data => {
        console.log(data.target.value)
        setSelectedYear(data.target.value)
        let uri = apiConfig.baseURL + `/reports/yearly/attendances/cid/${cid}/${data.target.value}`
        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            setYearlyAttendanceReports({ blogs: data })
        } catch (error) {
            console.log(error)
        }
    }

    const [staffInfo, setStaffInfo] = useState()
    const [pg, setpg] = React.useState(0)
    const [rpg, setrpg] = React.useState(10)

    function handleChangePage(event, newpage) {
        setpg(newpage)
    }

    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value, 10))
        setpg(0)
    }

    const fetchStaffInfo = async () => {
        let uri = apiConfig.baseURL + `/staff/${cid}/`
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

    const fetchAttendanceReports = async () => {
        let uri = apiConfig.baseURL + `/reports/yearly/attendances/cid/${cid}/${selectedYear}`
        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            setYearlyAttendanceReports({ blogs: data })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchYearBudgetOptions()
        fetchStaffInfo()
        fetchAttendanceReports()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <Card>
            <CardHeader title={`รายงานข้อมูลลงเวลาปฏิบัติงานปีงบประมาณ ${strYearBudget}`} titleTypographyProps={{ variant: 'h6' }} />
            <Divider sx={{ margin: 0 }} />
            <CardContent>
                <Grid item xs={12} md={12} lg={12}>
                    <form noValidate autoComplete='off'>
                        <Grid container spacing={5}>
                            <Grid item xs={10}>
                                ชื่อ-สกุล : {yearlyAttendanceReports['blogs'][0]?.staffName}
                            </Grid>
                            <Grid item xs={2}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">ปีงบประมาณ</InputLabel>
                                    <Select
                                        fullWidth
                                        label="ปีงบประมาณ"
                                        value={selectedYear}
                                        onChange={handleChange}
                                    >
                                        {yearOptions.blogs.map(row => (
                                            <MenuItem key={row.year} value={row.year}>
                                                {row.year + 543}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Divider sx={{ margin: 0, mt: 5 }} />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                {/* <TableCell align='center'>ที่</TableCell> */}
                                <TableCell align='center'>เดือน</TableCell>
                                <TableCell align='center'>ทั้งหมด</TableCell>
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
                                <TableCell align='center'>จัดการ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {yearlyAttendanceReports.blogs.slice(pg * rpg, pg * rpg + rpg).map(row => (
                                <TableRow key={row.leaveId}>
                                    {/* <TableCell align='center' component='th' scope='row'>
                                        {i++}
                                    </TableCell> */}
                                    <TableCell align='center'>{moment(row.yearMonth).format('MMMM')}</TableCell>
                                    <TableCell align='center'>{row.checkinShift}/{row.checkoutShift}</TableCell>
                                    <TableCell align='center'>{row.checkinShift1}/{row.checkoutShift1}</TableCell>
                                    <TableCell align='center'>{row.checkinShift2}/{row.checkoutShift2}</TableCell>
                                    <TableCell align='center'>{row.checkinShift3}/{row.checkoutShift3}</TableCell>
                                    <TableCell align='center'>{row.checkinShift4}/{row.checkoutShift4}</TableCell>
                                    <TableCell align='center'>{row.checkinShift5}/{row.checkoutShift5}</TableCell>
                                    <TableCell align='center'>{row.checkinShift6}/{row.checkoutShift6}</TableCell>
                                    <TableCell align='center'>{row.checkinShift7}/{row.checkoutShift7}</TableCell>
                                    <TableCell align='center'>{row.checkinShift8}/{row.checkoutShift8}</TableCell>
                                    <TableCell align='center'>{row.checkinShift9}/{row.checkoutShift9}</TableCell>
                                    <TableCell align='center'>{row.checkinShift10}/{row.checkoutShift10}</TableCell>
                                    <TableCell align='center' color='success'>
                                        <Link passHref href={`../../reports/monthly/attendance/print/${row.cid}/${row.yearMonth}`} color='success'>
                                            <Button type='button' variant='outlined'>
                                                รายละเอียด
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
                    count={yearlyAttendanceReports.blogs.length}
                    rowsPerPage={rpg}
                    page={pg}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </CardContent>
        </Card>
    )
}

export default TableReportYearlyStaffAttendance
