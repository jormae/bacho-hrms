import * as React from 'react'
import { useEffect, useState, createContext } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TableLeaves from 'src/views/tables/TableLeaves'
import Error401 from '../401'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TableApprovedLeaves from 'src/views/tables/TableLeavesDirectorSigned'
import TableLeavesDirectorSigned from 'src/views/tables/TableLeavesDirectorSigned'
import TableLeavesNew from 'src/views/tables/TableLeavesNew'
import TableLeavesColleagueSigned from 'src/views/tables/TableLeavesColleagueSigned'
import TableLeavesHeadDeptSigned from 'src/views/tables/TableLeavesHeadDeptSigned'
import TableLeavesRejected from 'src/views/tables/TableLeavesRejected'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'
import TableReportDailyAttendance from 'src/views/tables/TableReportDailyAttendance'
import TableAttendance from 'src/views/tables/TableAttendance'

const Attendance = () => {
    const userRoleId = typeof window !== 'undefined' ? localStorage.getItem('userRoleId') : null
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

    const SkeletonLeaveReportLoading = () => (
        <Box sx={{ width: '100%' }}>
            <Grid container wrap='nowrap'>
                <Grid item xs={12} md={12} lg={12}>
                    <TableAttendance />
                </Grid>
            </Grid>
        </Box>
    )

    if (userRoleId == (7)) {
        return <Error401 />;
    }
    else {

        return (
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <SkeletonLeaveReportLoading />
                </Grid>
            </Grid>
            
        )
    }
}

export default Attendance
