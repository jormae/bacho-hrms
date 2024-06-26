// ** MUI Imports
import React, { useEffect, useContext, useState, useRef, Component } from 'react'
import ReactToPrint, { useReactToPrint } from 'react-to-print';
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

import { DashboardStrDateContext, DashboardCidContext } from 'src/pages/index'
import { ReportMonthlyAttendanceDateContext, ReportMonthlyAttendanceCidContext } from 'src/pages/reports/monthly/attendance/print/[cid]/[date].js'
import { Typography } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    [`@page`]: {
        size: 'A4 Portrait',
        margin: 20,
    },
    [`@media print`]: {
        Typography: {
            fontSize: '18px',
            color: 'black',
        },
        table: {
            minWidth: 650,

            // fontSize: '16px',
            color: '000',
            width: 1024,
            "& .MuiTableCell-root": {
                border: '1px solid black'
            },
            margin: 'auto',
            color: 'black',
        },
        TableCell: {
            fontSize: '30px',
            color: 'black',

        }
    },
    color: 'black',

});

const TablePrintReportMonthlyStaffSumAttendance = () => {

    const classes = useStyles();

    const strDate = useContext(ReportMonthlyAttendanceDateContext)
    const cid = useContext(ReportMonthlyAttendanceCidContext)

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

    let i = 1
    const [reportMonthlyStaffAttendances, setReportMonthlyStaffAttendances] = useState({ blogs: [] })
    const [staffInfo, setStaffInfo] = useState()
    const [countMonthlyStaffAttendance, setCountMonthlyStaffAttendance] = useState({ blogs: [] })

    const printRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => printRef.current
    })

    console.log(cid)

    console.log(staffInfo)

    const staffName = staffInfo?.pname + staffInfo?.fname + ' ' + staffInfo?.lname
    const deptName = staffInfo?.deptName

    console.log(staffName)
    console.log("deptName = " + deptName)

    // console.log(countMonthlyStaffAttendance)
    // console.log(countMonthlyStaffAttendance.blogs[0]?.attendanceShift1)
    // console.log(reportMonthlyStaffAttendances.blogs[0]?.pname)

    const strMonth =
        'เดือน ' +
        moment(strDate).format('MMMM') +
        ' พ.ศ.' +
        moment(strDate).add(543, 'year').format('YYYY')
    console.log(strMonth)

    const fetchMonthlyStaffAttendances = async () => {
        let uri = apiConfig.baseURL + `/reports/monthly/sum-attendances/${cid}/${strDate}`
        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            setReportMonthlyStaffAttendances({ blogs: data })
            handlePrint()
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCountMonthlyStaffAttendances = async () => {
        let uri = apiConfig.baseURL + `/reports/monthly/count-attendances/${cid}/${strDate}`
        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            setCountMonthlyStaffAttendance({ blogs: data })
        } catch (error) {
            console.log(error)
        }
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
            setStaffInfo(data[0])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchStaffInfo()
        fetchCountMonthlyStaffAttendances()
        fetchMonthlyStaffAttendances()

        // handlePrint()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    return (

        <div ref={printRef}>
            <Typography align='center' style={{ color: "black", fontSize: '18px', marginTop: '40px' }}>รายงานลงเวลาปฏิบัติงาน ประจำ{strMonth}</Typography>
            <Typography align='center' style={{ color: "black", fontSize: '18px', paddingBottom: '20px' }}>{staffName} ({deptName})</Typography>
            <Table className={classes.table} width="1024" size="small">
                <TableHead>
                    <TableRow style={{ backgroundColor: "#dedede" }}>
                        <TableCell align='center' style={{ color: "black", fontSize: '16px' }}>ที่</TableCell>
                        <TableCell align='center' style={{ color: "black", fontSize: '16px' }}>วันที่</TableCell>
                        <TableCell align='center' style={{ color: "black", fontSize: '16px' }}>วัน</TableCell>
                        {countMonthlyStaffAttendance.blogs[0]?.attendanceShift1 > 0 ? (
                            <TableCell align='center' style={{ color: "black", fontSize: '16px' }}>เวรเช้า</TableCell>
                        ) : ''}
                        {countMonthlyStaffAttendance.blogs[0]?.attendanceShift2 > 0 ? (
                            <TableCell align='center' style={{ color: "black", fontSize: '16px' }}>เวร DAY 4</TableCell>
                        ) : ''}
                        {countMonthlyStaffAttendance.blogs[0]?.attendanceShift3 > 0 ? (
                            <TableCell align='center' style={{ color: "black", fontSize: '16px' }}>เวร DAY</TableCell>
                        ) : ''}
                        {countMonthlyStaffAttendance.blogs[0]?.attendanceShift4 > 0 ? (
                            <TableCell align='center' style={{ color: "black", fontSize: '16px' }}>เวร NIGHT</TableCell>
                        ) : ''}
                        {countMonthlyStaffAttendance.blogs[0]?.attendanceShift5 > 0 ? (
                            <TableCell align='center' style={{ color: "black", fontSize: '16px' }}>เวรเช้าครึ่งวัน</TableCell>
                        ) : ''}
                        {countMonthlyStaffAttendance.blogs[0]?.attendanceShift6 > 0 ? (
                            <TableCell align='center' style={{ color: "black", fontSize: '16px' }}>บ่าย-ดึก</TableCell>
                        ) : ''}
                        {countMonthlyStaffAttendance.blogs[0]?.attendanceShift7 > 0 ? (
                            <TableCell align='center' style={{ color: "black", fontSize: '16px' }}>บ่าย-เที่ยงคืน</TableCell>
                        ) : ''}
                        {countMonthlyStaffAttendance.blogs[0]?.attendanceShift8 > 0 ? (
                            <TableCell align='center' style={{ color: "black", fontSize: '16px' }}>เวร 24 ชั่วโมง</TableCell>
                        ) : ''}
                        {countMonthlyStaffAttendance.blogs[0]?.attendanceShift9 > 0 ? (
                            <TableCell align='center' style={{ color: "black", fontSize: '16px' }}>เวรหัวรุ่ง 1</TableCell>
                        ) : ''}
                        {countMonthlyStaffAttendance.blogs[0]?.attendanceShift10 > 0 ? (
                            <TableCell align='center' style={{ color: "black", fontSize: '16px' }}>เวรหัวรุ่ง 2</TableCell>
                        ) : ''}
                        {/* <TableCell align='center'>รายการลา</TableCell> */}
                        <TableCell align='center' style={{ color: "black", fontSize: '16px' }}>หมายเหตุ</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reportMonthlyStaffAttendances.blogs.map((row, index) => (
                        <TableRow key={index} >
                            <TableCell align='center' component='th' scope='row' style={{ color: "black", fontSize: '16px' }}>
                                {i++}
                            </TableCell>
                            <TableCell align='center' style={{ color: "black", fontSize: '16px' }} >{moment(row.attendanceDate).add(543, 'year').format('DD/MM/YYYY')}</TableCell>
                            <TableCell align='center' style={{ color: "black", fontSize: '16px' }} >{moment(row.attendanceDate).format("dddd")}</TableCell>
                            {countMonthlyStaffAttendance.blogs[0]?.attendanceShift1 > 0 ? (
                                <TableCell align='center' style={{ color: "black", fontSize: '16px' }} >{row.checkinShift1} - {row.checkoutShift1}</TableCell>
                            ) : ''}
                            {countMonthlyStaffAttendance.blogs[0]?.attendanceShift2 > 0 ? (
                                <TableCell align='center' style={{ color: "black", fontSize: '16px' }} >{row.checkinShift2} - {row.checkoutShift2}</TableCell>
                            ) : ''}
                            {countMonthlyStaffAttendance.blogs[0]?.attendanceShift3 > 0 ? (
                                <TableCell align='center' style={{ color: "black", fontSize: '16px' }} >{row.checkinShift3} - {row.checkoutShift3}</TableCell>
                            ) : ''}
                            {countMonthlyStaffAttendance.blogs[0]?.attendanceShift4 > 0 ? (
                                <TableCell align='center' style={{ color: "black", fontSize: '16px' }} >{row.checkinShift4} - {row.checkoutShift4}</TableCell>
                            ) : ''}
                            {countMonthlyStaffAttendance.blogs[0]?.attendanceShift5 > 0 ? (
                                <TableCell align='center' style={{ color: "black", fontSize: '16px' }} >{row.checkinShift5} - {row.checkoutShift5}</TableCell>
                            ) : ''}
                            {countMonthlyStaffAttendance.blogs[0]?.attendanceShift6 > 0 ? (
                                <TableCell align='center' style={{ color: "black", fontSize: '16px' }} >{row.checkinShift6} - {row.checkoutShift6}</TableCell>
                            ) : ''}
                            {countMonthlyStaffAttendance.blogs[0]?.attendanceShift7 > 0 ? (
                                <TableCell align='center' style={{ color: "black", fontSize: '16px' }} >{row.checkinShift7} - {row.checkoutShift7}</TableCell>
                            ) : ''}
                            {countMonthlyStaffAttendance.blogs[0]?.attendanceShift8 > 0 ? (
                                <TableCell align='center' style={{ color: "black", fontSize: '16px' }} >{row.checkinShift8} - {row.checkoutShift8}</TableCell>
                            ) : ''}
                            {countMonthlyStaffAttendance.blogs[0]?.attendanceShift9 > 0 ? (
                                <TableCell align='center' style={{ color: "black", fontSize: '16px' }} >{row.checkinShift9} - {row.checkoutShift9}</TableCell>
                            ) : ''}
                            {countMonthlyStaffAttendance.blogs[0]?.attendanceShift10 > 0 ? (
                                <TableCell align='center' style={{ color: "black", fontSize: '16px' }} >{row.checkinShift10} - {row.checkoutShift10}</TableCell>
                            ) : ''}
                            {/* <TableCell align='center'>{row.leaveTitle}{row.outStation ? "ราชการนอกสถานที่" : ""}</TableCell> */}
                            <TableCell align='center' style={{ color: "black", fontSize: '16px' }} >{row.leaveTitle}{row.outStation ? "ราชการนอกสถานที่" : ""}{row.dayRemark}{row.holidayRemark}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default TablePrintReportMonthlyStaffSumAttendance
