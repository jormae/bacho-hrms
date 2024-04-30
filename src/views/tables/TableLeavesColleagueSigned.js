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

const TableLeavesColleagueSigned = () => {

    const yearBudget = 2024;
    const thYearBudget = yearBudget + 543;

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
    const [leaves, setLeaves] = useState({ blogs: [] })

    const [dept, setDept] = useState('all')
    const [deptFilter, setDeptFilter] = useState('all')
    const [deptOptions, setDeptOptions] = useState({ blogs: [] })

    const handleChange = async data => {
        console.log(data.target.value)
        setDate(data.target.value)
        let uri = apiConfig.baseURL + `/leaves/yearbudget/deptId/${yearBudget}/${data.target.value}`
        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            setLeaveReports({ blogs: data })
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangeDept = async data => {
        let uri = apiConfig.baseURL + `/leaves/leave-status-dept/1/${yearBudget}/${data.target.value}`
        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            setLeaves({ blogs: data })
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

    const fetchLeaves = async () => {
        let uri = apiConfig.baseURL + `/leaves/leave-status/1/${yearBudget}`
        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            setLeaves({ blogs: data })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchDepts = async () => {
        let uri = apiConfig.baseURL + `/utils/depts`

        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            setDeptOptions({ blogs: data })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchLeaves()
        fetchDepts()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <Card>
            <CardHeader title={`รายงานข้อมูลการลาปฎิบัติงานสถานะรอผู้รับผิดชอบงานรับทราบ ประจำปีงบประมาณ ${thYearBudget}`} sx={{ textAlign: "center" }} titleTypographyProps={{ variant: 'h3' }} />
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
                                    type='year'
                                    onChange={handleChange}
                                    defaultValue={yearBudget}
                                    value={yearBudget}
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
                                <TableCell align='center'>เลขที่ใบลา</TableCell>
                                <TableCell align='center'>ชื่อ-สกุล</TableCell>
                                <TableCell align='center'>หน่วยงาน</TableCell>
                                <TableCell align='center'>ประเภทการลา</TableCell>
                                <TableCell align='center'>วันที่เริ่มลา</TableCell>
                                <TableCell align='center'>วันที่สิ้นสุดลา</TableCell>
                                <TableCell align='center'>จำนวนวันลา</TableCell>
                                <TableCell align='center'>ช่วงเวลา</TableCell>
                                <TableCell align='center'>เหตุผลของการลา</TableCell>
                                <TableCell align='center'>ผู้รับผิดชอบงานแทน</TableCell>
                                <TableCell align='center'>วันที่รับทราบ</TableCell>
                                <TableCell align='center'>จัดการ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {leaves.blogs
                                .filter(row => {
                                    return search === '' ? row : row.staffName.includes(search);
                                })
                                .slice(pg * rpg, pg * rpg + rpg)
                                .map(row => (
                                    <TableRow key={row.leaveId}>
                                        <TableCell align='center' component='th' scope='row'>
                                            {i++}
                                        </TableCell>
                                        <TableCell>{row.leaveId}</TableCell>
                                        <TableCell>{row.staffName}</TableCell>
                                        <TableCell>{row.deptName}</TableCell>
                                        <TableCell>{row.leaveTypeName} </TableCell>
                                        <TableCell align='center'>
                                            {moment(row.leaveStartDate).add(543, 'year').format('DD/MM/YYYY')}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {moment(row.leaveEndDate).add(543, 'year').format('DD/MM/YYYY')}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {row.totalLeaveDay}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {row.leaveSessionName}
                                        </TableCell>
                                        <TableCell>
                                            {row.leaveReason ?? "-"}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {row.colleagueName ?? "-"}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {moment(row.colleagueSignDateTime).add(543, 'year').format('DD/MM/YYYY')}
                                        </TableCell>
                                        <TableCell align='center' color='success'>
                                            <Link passHref href={`../../leaves/cid/${row.cid}`} color='success'>
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
                    count={leaves.blogs.length}
                    rowsPerPage={rpg}
                    page={pg}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </CardContent>
        </Card>
    )
}

export default TableLeavesColleagueSigned
