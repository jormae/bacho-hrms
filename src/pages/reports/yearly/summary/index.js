import * as React from 'react'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import { useEffect, useState, createContext } from 'react'
import apiConfig from 'src/configs/apiConfig'
import moment from 'moment'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import CardWelfarePayments from 'src/views/cards/CardWelfarePayments'
import TableReportYearlySummary from 'src/views/tables/TableReportYearlySummary'

export const SummaryContext = createContext()

const FormLayouts = () => {
  const [summaryReports, setSummaryReports] = useState({ blogs: [] })
  const year = moment().format('YYYY')

  const fetchYearlySummaryReports = async () => {
    let uri = apiConfig.baseURL + `/reports/yearly/welfare/summary/${year}`
    console.log(uri)
    try {
        const { data } = await axios.get(uri)
        setSummaryReports({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchYearlySummaryReports()
  }, [])

  const SkeletonReportYearlySummariesLoading = () => (
    <Box sx={{ width: '100%' }}>
      {summaryReports.blogs.length > 0 ? (
         <Grid container spacing={6}>
            <Grid item xs={12}>
            <SummaryContext.Provider value={summaryReports}>
                <TableReportYearlySummary />
              </SummaryContext.Provider>
           </Grid>
        </Grid>
          ) : (
            <Typography variant='h4'>
              <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
            </Typography>
          )}
    </Box>
  )

  return (
    <Grid container spacing={6}>
       <Grid container item>
        {/* <CardWelfarePayments /> */}
       </Grid>
       <Grid item md={12} xs={12}>
        <SkeletonReportYearlySummariesLoading />
      </Grid>
    </Grid>

  )
}

export default FormLayouts
