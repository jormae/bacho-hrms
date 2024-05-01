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
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
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
import FormLeaveDetail from 'src/views/form-layouts/FormLeaveDetail'

export const LeaveDetailContext = createContext()

const Leaves = () => {
    const router = useRouter()
    if (router.isReady) {
        router.query.leaveId
    }
    console.log(router.query.leaveId)
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
    const [leaveDetail, setLeaveDetail] = useState()
    console.log(leaveDetail)

    const fetchLeaveDetail = () => {
        let uri = apiConfig.baseURL + `/leaves/leaveId/${router.query.leaveId}`
        console.log(uri)

        axios
            .get(uri)
            .then(result => setLeaveDetail(result.data[0]))
            .catch(error => console.log('An error occurred' + error))
    }

    useEffect(() => {
        if (router.isReady) {
            router.query
        }
        fetchLeaveDetail()
    }, [router.isReady, router.query]) // eslint-disable-next-line react-hooks/exhaustive-deps

    const SkeletonLeaveFormsLoading = () => (
        <Box sx={{ width: '100%' }}>
            <LeaveDetailContext.Provider value={leaveDetail}>
                <FormLeaveDetail />
            </LeaveDetailContext.Provider>
        </Box>
    )

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <SkeletonLeaveFormsLoading />
            </Grid>
        </Grid>
    )
}

export default Leaves
