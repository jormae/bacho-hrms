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

const Leaves = () => {
    const userRoleId = typeof window !== 'undefined' ? localStorage.getItem('userRoleId') : null
    const [tabHistoryValue, setTabHistoryValue] = useState('newLeave')

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleTabHistoryChange = (event, newValue) => {
        setTabHistoryValue(newValue)
    }

    const SkeletonLeaveReportLoading = () => (
        <Box sx={{ width: '100%' }}>
            <Grid container wrap='nowrap'>
                <Grid item xs={12} md={12} lg={12}>
                    <TableLeaves />
                </Grid>
            </Grid>
        </Box>
    )

    const SkeletonLeaveStatusReportLoading = () => (

        <Box sx={{ width: '100%' }}>
            <TabContext value={tabHistoryValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleTabHistoryChange} aria-label='lab API tabs example'>
                        <Tab label='รออนุมัติ' value='newLeave' />
                        {/* <Tab label='ผู้รับผิดชอบแทนรับทราบ' value='colleagueSigned' /> */}
                        {/* <Tab label='หัวหน้างานรับทราบ' value='headSigned' /> */}
                        {/* <Tab label='หัวหน้ากลุ่มเห็นชอบ' value='managerSigned' /> */}
                        <Tab label='อนุมัติ' value='directorSigned' />
                        <Tab label='ไม่อนุมัติ' value='rejectedLeaves' />
                    </TabList>
                </Box>
                <TabPanel value='newLeave'>
                    <Grid container wrap='nowrap'>
                        <TableLeavesNew />
                    </Grid>
                </TabPanel>
                {/* <TabPanel value='colleagueSigned'>
                    <Grid container wrap='nowrap'>
                        <TableLeavesColleagueSigned />
                    </Grid>
                </TabPanel>
                <TabPanel value='headSigned'>
                    <Grid container wrap='nowrap'>
                        <TableLeavesHeadDeptSigned />
                    </Grid>
                </TabPanel>
                <TabPanel value='managerSigned'>
                    <Grid container wrap='nowrap'>
                        <TableLeavesDirectorSigned />
                    </Grid>
                </TabPanel> */}
                <TabPanel value='directorSigned'>
                    <Grid container wrap='nowrap'>
                        <TableLeavesDirectorSigned />
                    </Grid>
                </TabPanel>
                <TabPanel value='rejectedLeaves'>
                    <Grid container wrap='nowrap'>
                        <TableLeavesRejected />
                    </Grid>
                </TabPanel>
            </TabContext>
        </Box>
    )

    if (userRoleId == (7)) {
        return <Error401 />;
    }
    else {

        return (
            <Grid container spacing={6}>
                <Grid container item></Grid>
                <Grid item xs={12}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <SkeletonLeaveReportLoading />
                        </Grid>
                    </Grid>
                </Grid>
                {userRoleId == 1 ? (
                    <Grid item xs={12}>
                        <SkeletonLeaveStatusReportLoading />
                    </Grid>
                ) : null}
            </Grid>
        )
    }
}

export default Leaves
