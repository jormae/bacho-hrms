// ** MUI Imports
import React, { useEffect, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import {Paper, Skeleton} from '@mui/material/'
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
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { Typography } from '@mui/material'

// import { DashboardStrDateContext } from 'src/pages/index'

const TableReportMonthlyAttendance = () => {

    // const strDate = useContext(DashboardStrDateContext)
    const [err, setError] = useState()
    const yearBudget = 2024;
    const thYearBudget = yearBudget + 543;

    const { register } = useForm()
    const [search, setSearch] = useState('')
    const i = 1
    const [selectedYearMonth, setSelectedYearMonth] = useState(moment().format('YYYY-MM'))
    const userRoleId = typeof window !== 'undefined' ? localStorage.getItem('userRoleId') : null
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

    const strDate =
        'เดือน ' +
        moment(selectedYearMonth).format('MMMM') +
        ' พ.ศ.' +
        moment(selectedYearMonth).add(543, 'year').format('YYYY')

    const mainDeptId = typeof window !== 'undefined' ? localStorage.getItem('mainDeptId') : null
    const mainDeptName = typeof window !== 'undefined' ? localStorage.getItem('mainDeptName') : null
    const deptId = typeof window !== 'undefined' ? localStorage.getItem('deptId') : null

    // const deptName = typeof window !== 'undefined' ? localStorage.getItem('deptName') : null
    const [reportAttendances, setReportAttendances] = useState({ blogs: [] })
    const [selectedDeptName, setSelectedDeptName] = useState({ blogs: [] })
    console.log(selectedDeptName)

    const [dept, setDept] = useState('all')
    const [deptFilter, setDeptFilter] = useState('all')
    const [deptOptions, setDeptOptions] = useState({ blogs: [] })

    const handleChangeMonth = async data => {
        console.log(data.target.value)
        setSelectedYearMonth(data.target.value)
        let uri = apiConfig.baseURL + `/reports/monthly/attendances/date/${data.target.value}`
        console.log(uri)
        try {
            const { data } = await axios.get(uri, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            })
                .catch(error => {
                    console.error(error)
                    console.error(error.response.data)
                    setError(error.message + ` (${error.response.data})`)
                })
            setReportAttendances({ blogs: data })
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangeDept = async data => {
        setDeptFilter(data.target.value)
        let uri = apiConfig.baseURL + `/reports/monthly/attendances/deptId/date/${data.target.value}/${selectedYearMonth}`
        console.log(uri)
        try {
            const { data } = await axios.get(uri, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            })
                .catch(error => {
                    console.error(error)
                    console.error(error.response.data)
                    setError(error.message + ` (${error.response.data})`)
                })
            setReportAttendances({ blogs: data })
            setSelectedDeptName({ blogs: data[0]['deptName'] })
        } catch (error) {
            console.log(error)
        }
    }

    const [pg, setpg] = React.useState(0)
    const [rpg, setrpg] = React.useState(10)

    function handleChangePage(event, newpage) {
        setpg(newpage)
    }

    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value, 10))
        setpg(0)
    }

    const fetchReportAttendances = async () => {
        // let uri = apiConfig.baseURL + `/reports/monthly/attendances/date/${selectedYearMonth}`
        let admin_uri = apiConfig.baseURL + `/reports/monthly/attendances/date/${selectedYearMonth}`
        let manager_uri = apiConfig.baseURL + `/reports/monthly/attendances/main-dept/date/${mainDeptId}/${selectedYearMonth}`
        let uri = (userRoleId == 1) ? admin_uri : manager_uri
        console.log(uri)
        try {
            const { data } = await axios.get(uri, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            })
                .catch(error => {
                    console.error(error)
                    console.error(error.response.data)
                    setError(error.message + ` (${error.response.data})`)
                })
            setReportAttendances({ blogs: data })
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

    const TableRowsLoader = ({ rowsNum }) => {
        return [...Array(rowsNum)].map((row, index) => (
          <TableRow key={index}>
            <TableCell component="th" scope="row">
              <Skeleton animation="wave" variant="text" />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave" variant="text" />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave" variant="text" />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave" variant="text" />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave" variant="text" />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave" variant="text" />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave" variant="text" />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave" variant="text" />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave" variant="text" />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave" variant="text" />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave" variant="text" />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave" variant="text" />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave" variant="text" />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave" variant="text" />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave" variant="text" />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave" variant="text" />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave" variant="text" />
            </TableCell>
          </TableRow>
        ));
      };

    useEffect(() => {
        fetchReportAttendances()
        fetchDepts()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div>
            {err ? (
                <Grid item xs={12} md={12}>
                    <Alert severity='error'>
                        <AlertTitle>Error!</AlertTitle>
                        {err}
                    </Alert>
                </Grid>
            ) : (
                <Card>
                    <CardHeader title={`รายงานสรุปข้อมูลการลงเวลาปฎิบัติงานประจำ${strDate}`} sx={{ textAlign: "center" }} titleTypographyProps={{ variant: 'h3' }} />
                    <Typography sx={{ textAlign: "center", marginBottom: 4 }}>{`${mainDeptName} ${selectedDeptName['blogs'] ?? ''}`}</Typography>
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
                                            defaultValue={deptFilter}
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
                                            label='เลือกเดือน'
                                            type='month'
                                            onChange={handleChangeMonth}
                                            defaultValue={selectedYearMonth}
                                            value={selectedYearMonth}
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
                                        <TableCell align='center'>ทั้งหมด</TableCell>
                                        <TableCell align='center'>สาย</TableCell>
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
                                </TableHead>
                                <TableBody>
                                    {
                                        !reportAttendances.blogs[0] ? (
                                        <TableRowsLoader rowsNum={5} />
                                        ) : (
                                        reportAttendances.blogs
                                        .filter(row => {
                                            return search === '' ? row : row.staffName.includes(search);
                                        })
                                        .slice(pg * rpg, pg * rpg + rpg)
                                        .map(row => (
                                            <TableRow key={row.nationalId}>
                                                <TableCell align='center' component='th' scope='row'>
                                                    {i++}
                                                </TableCell>
                                                <TableCell>{row.staffName}</TableCell>
                                                <TableCell>{row.deptName}</TableCell>
                                                <TableCell align='center' sx={{ fontWeight: "bold" }}>
                                                    {row.totalCheckin}/{row.totalCheckout}
                                                </TableCell>
                                                <TableCell align='center' sx={{ fontWeight: "bold" }}>
                                                    {row.totalLateCheckin}
                                                </TableCell>
                                                <TableCell align='center'>
                                                    {row.totalCheckinShift1}/{row.totalCheckoutShift1}
                                                </TableCell>
                                                <TableCell align='center'>
                                                    {row.totalCheckinShift2}/{row.totalCheckoutShift2}
                                                </TableCell>
                                                <TableCell align='center'>
                                                    {row.totalCheckinShift3}/{row.totalCheckoutShift3}
                                                </TableCell>
                                                <TableCell align='center'>
                                                    {row.totalCheckinShift4}/{row.totalCheckoutShift4}
                                                </TableCell>
                                                <TableCell align='center'>
                                                    {row.totalCheckinShift6}/{row.totalCheckoutShift6}
                                                </TableCell>
                                                <TableCell align='center'>
                                                    {row.totalCheckinShift7}/{row.totalCheckoutShift7}
                                                </TableCell>
                                                <TableCell align='center'>
                                                    {row.totalCheckinShift8}/{row.totalCheckoutShift8}
                                                </TableCell>
                                                <TableCell align='center'>
                                                    {row.totalCheckinShift9}/{row.totalCheckoutShift9}
                                                </TableCell>
                                                <TableCell align='center'>
                                                    {row.totalCheckinShift10}/{row.totalCheckoutShift10}
                                                </TableCell>
                                                <TableCell align='center'>{row.totalLeave ?? 0}</TableCell>
                                                <TableCell align='center'>{row.totalOutStation ?? 0}</TableCell>
                                                <TableCell align='center' color='success'>
                                                    <Link passHref href={`../../reports/monthly/attendance/cid/${row.cid}`} color='success'>
                                                        <Button type='button' variant='outlined'>
                                                            รายละเอียด
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        )))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 20, 50]}
                            component='div'
                            count={reportAttendances.blogs.length}
                            rowsPerPage={rpg}
                            page={pg}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </CardContent>
                </Card>
            )}
        </div>

    )
}

export default TableReportMonthlyAttendance
