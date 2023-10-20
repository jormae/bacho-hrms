// ** MUI Imports
import React, { useContext, useEffect, useState } from 'react'
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
import TablePagination from "@mui/material/TablePagination"
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button'
import Link from 'next/link'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'
import moment from 'moment'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


import { ReportMonthlyAttendanceDeptContext } from 'src/pages/reports/monthly/attendance/dept/index'
import { CarShiftPattern } from 'mdi-material-ui'

const TableReportMonthlyAttendanceDept = () => {

    const attendanceReports = useContext(ReportMonthlyAttendanceDeptContext)
    const date = "2023-10"

    console.log(attendanceReports)

    const { register } = useForm();
    const [search, setSearch] = useState('')
    const [depts, setDepts] = useState({ blogs: [] })
    const i = 1;

    const [pg, setpg] = useState(0);
    const [rpg, setrpg] = useState(10);

    function handleChangePage(event, newpage) {
        setpg(newpage);
    }

    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    }

    const [dept, setDept] = useState('all')
    const [shift, setShift] = useState('all')
    const [filteredData, setFilteredData] = useState()
    console.log('dept = ' + dept)
    console.log('filteredData = ' + filteredData)

    const fetchDepts = async () => {
        let uri = apiConfig.baseURL + `/utils/depts`

        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            setDepts({ blogs: data })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchDepts()
        console.log(dept)
    }, [dept])

    return (
        <Card>
            <CardHeader title={`รายงานการลงเวลาทำงาน วันที่`} titleTypographyProps={{ variant: 'h6' }} />
            <Divider sx={{ margin: 0 }} />
            <CardContent>
                <Grid item xs={12} md={12} lg={12}>
                    <form noValidate autoComplete='off'>
                        <Grid container spacing={5}>
                            <Grid item xs={10}>
                                <TextField fullWidth label='ค้นหาเจ้าหน้าที่' placeholder='พิมพ์ชื่อ-สกุล' {...register('search', {
                                    onChange: (e) => { setSearch(e.target.value) },
                                    onBlur: (e) => { },
                                })} />
                            </Grid>
                            <Grid item xs={2}>
                                <Select
                                    fullWidth label='หน่วยงาน'
                                    placeholder='เลือกหน่วยงาน'
                                    value={dept}
                                    onChange={(e) => setDept(e.target.value)}
                                >
                                    <MenuItem value="all">ทั้งหมด</MenuItem>
                                    {depts.blogs.map(row => (
                                        <MenuItem key={row.deptId} value={row.deptName}>{row.deptName}</MenuItem>
                                    ))}
                                </Select>
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
                                <TableCell align='center'>เวรเช้า</TableCell>
                                <TableCell align='center'>เวร Day 4</TableCell>
                                <TableCell align='center'>เวร Day</TableCell>
                                <TableCell align='center'>เวร Night</TableCell>
                                <TableCell align='center'>บ่าย-ดึก</TableCell>
                                <TableCell align='center'>บ่าย-เที่ยงคืน</TableCell>
                                <TableCell align='center'>เวร 24 ชั่วโมง</TableCell>
                                <TableCell align='center'>เวรหัวรุ่ง 1</TableCell>
                                <TableCell align='center'>เวรหัวรุ่ง 2</TableCell>
                                <TableCell align='center'>ลา</TableCell>
                                <TableCell align='center'>ราชการ</TableCell>
                                <TableCell align='center'>จัดการ</TableCell>
                            </TableRow>

                        </TableHead >
                        <TableBody >
                            {attendanceReports.blogs.filter((row) => {
                                // return search === '' ? row : (row.staffName.includes(search) || row.deptName.includes(search));
                                return dept === 'all' ? row : (row.deptName.includes(dept));
                            }).slice(pg * rpg, pg *
                                rpg + rpg).map(row => (
                                    <TableRow key={row.attendanceId} data={filteredData}>
                                        <TableCell align='center' component='th' scope='row'>
                                            {i++}
                                        </TableCell>
                                        <TableCell>{row.staffName}</TableCell>
                                        <TableCell>{row.deptName}</TableCell>
                                        <TableCell align='center'>{row.totalCheckinShift1}/{row.totalCheckoutShift1}</TableCell>
                                        <TableCell align='center'>{row.totalCheckinShift2}/{row.totalCheckoutShift2}</TableCell>
                                        <TableCell align='center'>{row.totalCheckinShift3}/{row.totalCheckoutShift3}</TableCell>
                                        <TableCell align='center'>{row.totalCheckinShift4}/{row.totalCheckoutShift4}</TableCell>
                                        <TableCell align='center'>{row.totalCheckinShift6}/{row.totalCheckoutShift6}</TableCell>
                                        <TableCell align='center'>{row.totalCheckinShift7}/{row.totalCheckoutShift7}</TableCell>
                                        <TableCell align='center'>{row.totalCheckinShift8}/{row.totalCheckoutShift8}</TableCell>
                                        <TableCell align='center'>{row.totalCheckinShift9}/{row.totalCheckoutShift9}</TableCell>
                                        <TableCell align='center'>{row.totalCheckinShift10}/{row.totalCheckoutShift10}</TableCell>
                                        <TableCell align='center'>{row.totalLeave ?? 0}</TableCell>
                                        <TableCell align='center'>{row.totalOutStation ?? 0}</TableCell>
                                        <TableCell align='center' color='success'>
                                            <Link href={`../../monthly/attendance/cid/${row.cid}/${date}`} color='success'>
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
                    component="div"
                    count={attendanceReports.blogs.length}
                    rowsPerPage={rpg}
                    page={pg}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </CardContent>
        </Card>
    )
}

export default TableReportMonthlyAttendanceDept
