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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import { StaffStrDateContext, StaffCidContext } from 'src/pages/staff/[cid]'

const TableReportYearlyStaffOutStation = () => {

    const StaffCid = useContext(StaffCidContext)

    let cid
    if (StaffCid) {
        cid = StaffCid
    }

    console.log('StaffCid = ' + StaffCid)
    console.log('cid = ' + cid)
    const i = 1

    const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

    const [yearOptions, setYearOptions] = useState({ blogs: [] })
    const currentYear = moment().format('YYYY')

    const [selectedYear, setSelectedYear] = useState(currentYear)
    const [outStationReports, setOutStationReports] = useState({ blogs: [] })
    const strYearBudget = parseInt(selectedYear) + 543
    console.log(outStationReports)

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
        let uri = apiConfig.baseURL + `/leaves/cid-outstation/${data.target.value}/${cid}`
        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            setOutStationReports({ blogs: data })
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

    const fetchLeaveReports = async () => {
        let uri = apiConfig.baseURL + `/leaves/cid-outstation/${selectedYear}/${cid}`
        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            setOutStationReports({ blogs: data })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchYearBudgetOptions()
        fetchStaffInfo()
        fetchLeaveReports()
    }, [])

    return (
        <Card>
            <CardHeader title={`รายงานข้อมูลราชการนอกสถานที่ปีงบประมาณ ${strYearBudget}`} titleTypographyProps={{ variant: 'h6' }} />
            <Divider sx={{ margin: 0 }} />
            <CardContent>
                <Grid item xs={12} md={12} lg={12}>
                    <form noValidate autoComplete='off'>
                        <Grid container spacing={5}>
                            <Grid item xs={10}>
                                ชื่อ-สกุล : {outStationReports['blogs'][0]?.staffName}
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
                            {outStationReports.blogs.slice(pg * rpg, pg * rpg + rpg).map(row => (
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
                    count={outStationReports.blogs.length}
                    rowsPerPage={rpg}
                    page={pg}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </CardContent>
        </Card>
    )
}

export default TableReportYearlyStaffOutStation
