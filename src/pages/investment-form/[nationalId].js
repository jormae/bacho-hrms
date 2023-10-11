import { useEffect, useState, createContext } from 'react'
import * as React from 'react'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import apiConfig from 'src/configs/apiConfig'
import FormMemberDetail from 'src/views/form-layouts/FormMemberDetail'
import axios from 'axios'
import CardUser from 'src/views/cards/CardUser'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import FormSpouseDetail from 'src/views/form-layouts/FormSpouseDetail'
import TableMemberInvestmentHistory from 'src/views/tables/TableMemberInvestmentHistory'
import TableMemberLoanHistory from 'src/views/tables/TableMemberLoanHistory'
import TableMemberDividendHistory from 'src/views/tables/TableMemberDividendHistory'
import TableMemberLoanRecordHistory from 'src/views/tables/TableMemberLoanPaymentHistory'
import FormLoanDetail from 'src/views/form-layouts/FormLoanApproval'
import FormLoan from 'src/views/form-layouts/FormLoan'
import FormLoanPayment from 'src/views/form-layouts/FormLoanPayment'
import FormInvestmentPayment from 'src/views/form-layouts/FormInvestment'

const defaultData = {
  ptName: 'Loading',
  admitDate: '2022-04-09T17:00:00.000Z',
  dischargeDate: '2022-04-11T17:00:00.000Z',
  doctorCode: 'Loading',
  wardCode: 'Loading',
  dischargeStatusCode: 'Loading',
  dischargeTypeCode: 'Loading',
  referCauseCode: 0,
  referHospitalCode: 0,
  pttypeCode: 'Loading',
  admitDuration: 'Loading'
}

export const MemberContext = createContext()

export const InvesmentPaymentHistoryContext = createContext()

const FormLayouts = () => {
  const router = useRouter()
  if (router.isReady) {
    router.query.nationalId
  }
  const [memberDetail, setMemberDetail] = useState()
  const [memberInvestmentHistories, setInvestmentHistories] = useState({ blogs: [] })
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null

  const fetchMemberInvestmentDetail = () => {
    let uri = apiConfig.baseURL + `/investments/summary/${router.query.nationalId}`
    console.log(uri)

    axios
      .get(uri)
      .then(result => setMemberDetail(result.data[0]))
      .catch(error => console.log('An error occurred' + error))
  }

  const fetchInvestmentsHistories = async () => {
    let uri = apiConfig.baseURL + `/investments/${router.query.nationalId}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setInvestmentHistories({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      router.query
      fetchMemberInvestmentDetail()
      fetchInvestmentsHistories()
    }
  }, [router.isReady, router.query, ])

  // const SkeletonMemberCardLoading = () => (
  //   <Box sx={{ width: '100%' }}>
  //     {memberDetail?.nationalId ? (
  //       <MemberContext.Provider value={memberDetail}>
  //         <CardUser />
  //       </MemberContext.Provider>
  //     ) : (
  //       <Typography variant='h4'>
  //         <Skeleton width='100%' height={300} sx={{ animationDuration: '3.0s' }} />
  //       </Typography>
  //     )}
  //   </Box>
  // )
  
  const SkeletonInvestmentPaymentFormLoading = () => (
    <Box sx={{ width: '100%' }}>
      {memberDetail?.nationalId ? (
        <MemberContext.Provider value={memberDetail}>
          <FormInvestmentPayment />
        </MemberContext.Provider>
      ) : (
        <Typography variant='h4'>
          <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
        </Typography>
      )}
    </Box>
  )

  const SkeletonInvestmentHistoryLoading = () => (
    <Box sx={{ width: '100%' }}>
      {memberInvestmentHistories?.investmentId ? (
        <InvesmentPaymentHistoryContext.Provider value={memberInvestmentHistories}>
          <TableMemberInvestmentHistory />
        </InvesmentPaymentHistoryContext.Provider>
      ) : (
        <Typography variant='h4'>
          <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
        </Typography>
      )}
    </Box>
  )

  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={4}>
        <SkeletonMemberCardLoading />
      </Grid> */}
      <Grid item xs={12}>
        {/* <SkeletonInvestmentPaymentFormLoading /> */}
        <FormInvestmentPayment />
      </Grid>
      <Grid item xs={12}>
        <SkeletonInvestmentHistoryLoading />
      </Grid>
    </Grid>
  )
}

export default FormLayouts
