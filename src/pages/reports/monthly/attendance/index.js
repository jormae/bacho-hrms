import * as React from 'react'
import { useEffect, useState, createContext } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TableReportMonthlyAttendance from 'src/views/tables/TableReportMonthlyAttendance'
import TableReportDailyAttendance from 'src/views/tables/TableReportDailyAttendance'
import Error401 from 'src/pages/401'

const ReportMonthlyAttendance = () => {

    const userRoleId = typeof window !== 'undefined' ? localStorage.getItem('userRoleId') : null

    const SkeletonLoading = () => (
        <Box sx={{ width: '100%' }}>
            <Grid container wrap='nowrap'>
                <Grid item xs={12} md={12} lg={12}>
                    <TableReportMonthlyAttendance />
                </Grid>
            </Grid>
        </Box>
    )

    if (userRoleId == 7) {
        return <Error401 />;
    }
    else {

        return (
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <SkeletonLoading />
                </Grid>
            </Grid>
        )

    }
}

export default ReportMonthlyAttendance
