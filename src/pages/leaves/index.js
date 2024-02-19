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

const Leaves = () => {
    const userRoleId = typeof window !== 'undefined' ? localStorage.getItem('userRoleId') : null
    const [err, setError] = useState()
    const [leaves, setLeaves] = useState({ blogs: [] })
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

    const [tabHistoryValue, setTabHistoryValue] = useState('newLeave')

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleTabHistoryChange = (event, newValue) => {
        setTabHistoryValue(newValue)
    }

    const fetchLeaves = async () => {
        let uri = apiConfig.baseURL + `/leaves/all/2024`
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

    useEffect(() => {
        fetchLeaves()
    }, [])

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
                        <Tab label='อนุมัติ' value='directorSigned' />
                        <Tab label='ไม่อนุมัติ' value='rejectedLeaves' />
                    </TabList>
                </Box>
                <TabPanel value='newLeave'>
                    <Grid container wrap='nowrap'>
                        <TableLeavesNew />
                    </Grid>
                </TabPanel>
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
                {err ? (
                    <Grid item xs={12} md={12}>
                        <Alert severity='error'>
                            <AlertTitle>Error!</AlertTitle>
                            {err}
                        </Alert>
                    </Grid>
                ) : (
                    <div>
                        {/* <Grid container item></Grid> */}
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
                    </div>
                )}
            </Grid>
        )
    }
}

export default Leaves
