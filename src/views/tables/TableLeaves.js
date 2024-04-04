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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Typography } from '@mui/material'

import { DashboardStrDateContext } from 'src/pages/index'

const TableLeaves = () => {

    const strDate = useContext(DashboardStrDateContext)
    const { register } = useForm()
    const [search, setSearch] = useState('')
    const i = 1
    const [err, setError] = useState()
    const today = moment().format('YYYY-MM-DD')
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
    const userRoleId = typeof window !== 'undefined' ? localStorage.getItem('userRoleId') : null
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

    const mainDeptId = typeof window !== 'undefined' ? localStorage.getItem('mainDeptId') : null
    const mainDeptName = typeof window !== 'undefined' ? localStorage.getItem('mainDeptName') : null
    const deptId = typeof window !== 'undefined' ? localStorage.getItem('deptId') : null
    const deptName = typeof window !== 'undefined' ? localStorage.getItem('deptName') : null
    const [leaves, setLeaves] = useState({ blogs: [] })

    const currentYear = moment().format('YYYY')
    const [yearOptions, setYearOptions] = useState({ blogs: [] })
    const [selectedYear, setSelectedYear] = useState(currentYear)

    // const [leaveReports, setLeaveReports] = useState({ blogs: [] })
    const strYearBudget = parseInt(selectedYear) + 543

    const [dept, setDept] = useState('all')
    const [deptFilter, setDeptFilter] = useState('all')
    const [deptOptions, setDeptOptions] = useState({ blogs: [] })
    const [selectedDeptName, setSelectedDeptName] = useState({ blogs: [] })
    console.log(selectedDeptName)

    const handleYearBudgetChange = async data => {
        setSelectedYear(data.target.value)
        let uri = apiConfig.baseURL + `/leaves/yearbudget/${data.target.value}`
        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            setLeaves({ blogs: data })
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangeDept = async data => {
        setDeptFilter(data.target.value)
        let uri = apiConfig.baseURL + `/leaves/yearbudget/deptId/${selectedYear}/${data.target.value}`
        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            setLeaves({ blogs: data })
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

    const fetchLeaves = async () => {
        let admin_uri = apiConfig.baseURL + `/leaves/all/${selectedYear}`
        let manager_uri = apiConfig.baseURL + `/leaves/main-dept/year/${mainDeptId}/${selectedYear}`
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
            setLeaves({ blogs: data })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchDepts = async () => {
        // let uri = apiConfig.baseURL + `/utils/depts`
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

    const fetchYearBudgetOptions = () => {
        let minYear = 2023
        let maxYear = moment(currentYear).format('YYYY')
        let yearOptions = []
        for (let i = minYear; i <= maxYear; i++) {
            yearOptions.push({ year: i })
        }
        setYearOptions({ blogs: yearOptions })
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
          </TableRow>
        ));
      };

    useEffect(() => {
        fetchYearBudgetOptions()
        fetchLeaves()
        fetchDepts()
    }, [])

    return (
        <Card>
            <CardHeader title={`รายงานสรุปข้อมูลการลาปฎิบัติงานประจำปีงบประมาณ ${strYearBudget}`} sx={{ textAlign: "center" }} titleTypographyProps={{ variant: 'h3' }} />
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
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">หน่วยงาน</InputLabel>
                                    <Select
                                        fullWidth
                                        label='หน่วยงาน'
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
                                </FormControl>
                            </Grid>
                            <Grid item xs={2}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">ปีงบประมาณ</InputLabel>
                                    <Select
                                        fullWidth
                                        label="ปีงบประมาณ"
                                        value={selectedYear}
                                        onChange={handleYearBudgetChange}
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
                                <TableCell align='center'>ที่</TableCell>
                                <TableCell align='center'>ชื่อ-สกุล</TableCell>
                                <TableCell align='center'>หน่วยงาน</TableCell>
                                <TableCell align='center'>ลาทั้งหมด</TableCell>
                                <TableCell align='center'>ลาพักผ่อน</TableCell>
                                <TableCell align='center'>ลากิจ</TableCell>
                                <TableCell align='center'>ลาป่วย</TableCell>
                                <TableCell align='center'>ลาคลอด</TableCell>
                                <TableCell align='center'>ลาดูแลภรรยาคลอดบุตร</TableCell>
                                <TableCell align='center'>ประกอบพิธีฮัจย์</TableCell>
                                <TableCell align='center'>ปฏิบัติราชการนอกสถานที่</TableCell>
                                <TableCell align='center'>จัดการ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                !leaves.blogs[0] ? (
                                <TableRowsLoader rowsNum={5} />
                              ) : (
                                leaves.blogs
                                .filter(row => {
                                    return search === '' ? row : row.staffName.includes(search);
                                })
                                .slice(pg * rpg, pg * rpg + rpg)
                                .map(row => (
                                    <TableRow key={row.staffName}>
                                        <TableCell align='center' component='th' scope='row'>
                                            {i++}
                                        </TableCell>
                                        <TableCell>{row.staffName}</TableCell>
                                        <TableCell>{row.deptName}</TableCell>
                                        <TableCell align='center'>
                                            {row.totalLeave}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {row.vacationLeave ?? "-"}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {row.personalLeave ?? "-"}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {row.medicalLeave ?? "-"}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {row.birthLeave ?? "-"}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {row.wifeCareLeave ?? "-"}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {row.hajjLeave ?? "-"}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {row.officialLeave ?? "-"}
                                        </TableCell>
                                        <TableCell align='center' color='success'>
                                            <Link passHref href={`../../leaves/cid/${row.cid}`} color='success'>
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

export default TableLeaves
