import { useEffect, useState, createContext } from 'react'
import * as React from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import apiConfig from 'src/configs/apiConfig'
import axios from 'axios'
import CardUser from 'src/views/cards/CardUser'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Link from 'next/link'
import moment from 'moment'

import TablePrintReportMonthlyStaffLeaves from 'src/views/tables/TablePrintReportMonthlyStaffLeaves'

export const ReportMonthlyLeaveCidContext = createContext()

export const ReportMonthlyLeaveDateContext = createContext()

const FormLayouts = () => {
  const router = useRouter()
  if (router.isReady) {
    router.query.cid
    router.query.date
  }

  const cid = router.query.cid
  const date = router.query.date

  useEffect(() => {
    if (router.isReady) {
      router.query
    }
  }, [router.isReady, router.query])

  const SkeletonReportMonthlyStaffSumLeavesLoading = () => (
    <Box sx={{ width: '100%' }}>
      <Grid container wrap='nowrap'>
        <Grid item xs={12} md={12} lg={12}>
          <ReportMonthlyLeaveCidContext.Provider value={cid}>
            <ReportMonthlyLeaveDateContext.Provider value={date}>
              <TablePrintReportMonthlyStaffLeaves />
            </ReportMonthlyLeaveDateContext.Provider>
          </ReportMonthlyLeaveCidContext.Provider>
        </Grid>
      </Grid>
    </Box>
  )

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SkeletonReportMonthlyStaffSumLeavesLoading />
      </Grid>
    </Grid>
  )
}

export default FormLayouts
