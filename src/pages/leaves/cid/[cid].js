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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip';
import moment from 'moment'

export const ReportMonthlyLeaveDeptContext = createContext()

const Leaves = () => {
    const router = useRouter()
    if (router.isReady) {
        router.query.cid
    }
    const { register, handleSubmit } = useForm()
    const currentYear = moment().format('YYYY')
    const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null
    const [search, setSearch] = useState('')
    const [deptFilter, setDeptFilter] = useState('all')

    const [yearOptions, setYearOptions] = useState({ blogs: [] })
    const [selectedYear, setSelectedYear] = useState(currentYear)
    const [leaveReports, setLeaveReports] = useState({ blogs: [] })
    const strYearBudget = parseInt(selectedYear) + 543
    console.log(leaveReports)
    console.log(leaveReports.blogs)
    console.log(leaveReports['blogs'])
    console.log(leaveReports['blogs'][0]?.staffName)
    let i = 1
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
        setSelectedYear(data.target.value)
        let uri = apiConfig.baseURL + `/leaves/cid/${data.target.value}/${router.query.cid}`
        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            setLeaveReports({ blogs: data })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchLeaveReports = async () => {
        let uri = apiConfig.baseURL + `/leaves/cid/${selectedYear}/${router.query.cid}`
        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            setLeaveReports({ blogs: data })
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

    useEffect(() => {
        if (router.isReady) {
            router.query
        }
        fetchYearBudgetOptions()
        fetchLeaveReports()
    }, [router.isReady, router.query]) // eslint-disable-line react-hooks/exhaustive-deps


    const SkeletonLeaveReportLoading = () => (
        <Box sx={{ width: '100%' }}>
            {leaveReports.blogs ? (
                <Card>
                    <CardHeader title={`รายงานข้อมูลลาปฏิบัติงานและราชการนอกสถานที่ปีงบประมาณ ${strYearBudget}`} titleTypographyProps={{ variant: 'h6' }} />
                    <Divider sx={{ margin: 0 }} />
                    <CardContent>
                        <Grid item xs={12} md={12} lg={12}>
                            <form noValidate autoComplete='off'>
                                <Grid container spacing={5}>
                                    <Grid item xs={10}>
                                        ชื่อ-สกุล : {leaveReports['blogs'][0]?.staffName}
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
                                                <TableCell align='center'>{row.totalLeaveDays ?? 0} วัน </TableCell>
                                                <TableCell>{row.leaveReason ?? "-"}</TableCell>
                                                <TableCell align='center'> {row.replacementColleagueName ?? "-"}</TableCell>
                                                <TableCell align='center'>{row.leaveStatusId == 6 ? <Chip variant="outlined" color="warning" label={row.leaveStatusName} /> : <Chip variant="outlined" color="success" label={row.leaveStatusName} />}</TableCell>
                                                <TableCell align='center'>{row.filePath ?? "-"} </TableCell>
                                                <TableCell align='center'>{row.totalCancelLeaveDay ? <Chip variant="outlined" color="primary" label={`ยกเลิกวันลา ${row.totalCancelLeaveDay} วัน`} /> : ''}</TableCell>
                                                <TableCell align='center' color='success'>
                                                    <Link passHref href={`../../leaves/leaveId/${row.leaveId}`} color='success'>
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
