import { useEffect, useState, createContext } from 'react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import apiConfig from 'src/configs/apiConfig'
import axios from 'axios'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
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
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Link from 'next/link'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import moment from 'moment'

export const ReportMonthlyLeaveDeptContext = createContext()

const Leaves = () => {
    const router = useRouter()
    if (router.isReady) {
        router.query.cid
    }
    const { register, handleSubmit } = useForm()
    const yearBudget = 2024

    // const { onChange } = register('firstName');
    const currentMonth = moment().format('YYYY-MM')
    const [date, setDate] = useState(currentMonth)
    const strDate = 'เดือน ' + moment(date).format('MMMM') + ' พ.ศ.' + moment(date).add(543, 'year').format('YYYY')
    const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null
    const [search, setSearch] = useState('')
    const [deptFilter, setDeptFilter] = useState('all')
    const [deptOptions, setDeptOptions] = useState({ blogs: [] })
    const [leaveReports, setLeaveReports] = useState({ blogs: [] })

    const i = 1
    const [pg, setpg] = useState(0)
    const [rpg, setrpg] = useState(10)

    function handleChangePage(event, newpage) {
        setpg(newpage)
    }

    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value, 10))
        setpg(0)
    }

    const handleChange = async data => {
        console.log(data.target.value)
        setDate(data.target.value)
        let uri = apiConfig.baseURL + `/reports/monthly/leaves/date/${data.target.value}`
        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            setLeaveReports({ blogs: data })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchLeaveReports = async () => {
        let uri = apiConfig.baseURL + `/leaves/cid/${yearBudget}/${router.query.cid}`
        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            setLeaveReports({ blogs: data })
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
        if (router.isReady) {
            router.query
        }
        fetchDepts()
        fetchLeaveReports()
    }, [router.isReady, router.query])

    const SkeletonLeaveReportLoading = () => (
        <Box sx={{ width: '100%' }}>
            {leaveReports.blogs ? (
                <Card>
                    <CardHeader title={`รายงานสรุปข้อมูลลงเวลาทำงาน ${strDate}`} titleTypographyProps={{ variant: 'h6' }} />
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
                                            onChange={e => setDeptFilter(e.target.value)}
                                        >
                                            <MenuItem value='all'>ทั้งหมด</MenuItem>
                                            {deptOptions.blogs.map(row => (
                                                <MenuItem key={row.deptId} value={row.deptName}>
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
                                            onChange={handleChange}
                                            defaultValue={currentMonth}
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
                                        <TableCell align='center'>ประเภทลา</TableCell>
                                        <TableCell align='center'>วันที่เริ่มลา</TableCell>
                                        <TableCell align='center'>วันที่สิ้นสุดลา</TableCell>
                                        <TableCell align='center'>ช่วงเวลา</TableCell>
                                        <TableCell align='center'>จำนวนวันลา</TableCell>
                                        <TableCell align='center'>เหตุผลของการลา</TableCell>
                                        <TableCell align='center'>ผู้รับผิดชอบงานแทน</TableCell>
                                        <TableCell align='center'>สถานะการอนุมัติ</TableCell>
                                        <TableCell align='center'>เอกสาร</TableCell>
                                        <TableCell align='center'>หมายเหตุ</TableCell>
                                        <TableCell align='center'>จัดการ</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {leaveReports.blogs
                                        .filter(row => {
                                            // return search === '' ? row : (row.staffName.includes(search) || row.deptName.includes(search));
                                            return deptFilter === 'all' ? row : row.deptName.includes(deptFilter)
                                        })
                                        .slice(pg * rpg, pg * rpg + rpg)
                                        .map(row => (
                                            <TableRow key={row.leaveId}>
                                                <TableCell align='center' component='th' scope='row'>
                                                    {i++}
                                                </TableCell>
                                                <TableCell>{row.leaveTypeName}</TableCell>
                                                <TableCell>{moment(row.leaveStartDate).add(543, 'year').format('DD/MM/YYYY')}</TableCell>
                                                <TableCell>{moment(row.leaveEndDate).add(543, 'year').format('DD/MM/YYYY')}</TableCell>
                                                <TableCell align='center'>{row.leaveSessionName ?? "-"}</TableCell>
                                                <TableCell align='center'>{row.totalLeaveDay ?? "-"} วัน </TableCell>
                                                <TableCell>{row.leaveReason ?? "-"}</TableCell>
                                                <TableCell align='center'> {row.replacementColleagueName ?? "-"}</TableCell>
                                                <TableCell align='center'> {row.leaveStatusName ?? "-"}</TableCell>
                                                <TableCell align='center'>{row.filePath ?? "-"} </TableCell>
                                                <TableCell>{row.leaveRemark ?? "-"}</TableCell>
                                                <TableCell align='center' color='success'>
                                                    <Link passHref href={`../../monthly/leave/cid/${row.cid}`} color='success'>
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
                            count={leaveReports.blogs.length}
                            rowsPerPage={rpg}
                            page={pg}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </CardContent>
                </Card>
            ) : (
                <Typography variant='h4'>
                    <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
                </Typography>
            )}
        </Box>
    )

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <SkeletonLeaveReportLoading />
            </Grid>
        </Grid>
    )
}

export default Leaves
