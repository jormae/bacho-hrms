// ** MUI Imports
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from "@mui/material/TablePagination"
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Badge from '@mui/material/Badge';

import TextField  from "@mui/material/TextField";
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'
import moment from 'moment'

import TableLoanRequest from './TableLoanRequest'
import TableInvestmentRequest from './TableInvestmentRequest'

const TableDashboardRequests = () => {

    const [tabRequests, setTabRequests] = React.useState('request-loan')
    const [badgeCouter, setBadgeCouter ]= useState(0)

    const handleTabChange = (event, newValue) => {
        setTabRequests(newValue)
    }

    const fetchBadgeCouter = async () => {
        let uri = apiConfig.baseURL + `/dashboard/count-request`
        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            console.log(data)
            setBadgeCouter(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBadgeCouter();
      }, []);

    return (
    <Card>
      <CardHeader title={`รายการคำร้องรออนุมัติ `}  titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
      <Box sx={{ width: '100%' }}>
      <TabContext value={tabRequests}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleTabChange} aria-label='lab API tabs example' >
                    <Tab label='คำร้องสวัสดิการ' value='request-loan' />
                    <Badge badgeContent={badgeCouter[0]?.TOTAL_REQUEST} color="primary" sx={{mt:4}} />
                    <Tab label='คำร้องหุ้น' value='request-investment' />
                    <Badge badgeContent={badgeCouter[1]?.TOTAL_REQUEST} color="primary" sx={{mt:4}} />
                </TabList>
            </Box>
                <TabPanel value='request-loan'>
                        <Grid container wrap='nowrap'>
                            <Grid item xs={12} md={12} lg={12}>
                                    <TableLoanRequest />
                            </Grid>
                        </Grid>
                </TabPanel>
                <TabPanel value='request-investment'>
                        <Grid container wrap='nowrap'>
                            <Grid item xs={12} md={12} lg={12}>
                                    <TableInvestmentRequest />
                            </Grid>
                        </Grid>
                </TabPanel>
            </TabContext>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TableDashboardRequests
