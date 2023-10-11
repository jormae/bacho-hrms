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
import TableMemberLoanPaymentHistory from 'src/views/tables/TableMemberLoanPaymentHistory'
import FormLoanDetail from 'src/views/form-layouts/FormLoanApproval'
import CardAddLoanPayment from 'src/views/cards/CardLoanPayment'
import CardLoanAgreement from 'src/views/cards/CardLoanAgreement'
import CardLoanReceipt from 'src/views/cards/CardLoanReceipt'
import FormLoanReceipt from 'src/views/form-layouts/FormLoanReceipt'
import BlankLayout from 'src/@core/layouts/BlankLayout'

export const LoanMemberContext = createContext()

export const LoanRecordHistoryContext = createContext()

export const LoanContext = createContext()

const FormLayouts = () => {
  const router = useRouter()
  if (router.isReady) {
    router.query.nationalId
  }
  const [memberLoanHistories, setMemberLoanHistories] = useState({ blogs: [] })
  const [memberDetail, setMemberDetail] = useState()
  const [loanDetail, setLoanDetail] = useState()
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null

  const [value, setValue] = React.useState('member')
  const [tabHistoryValue, setTabHistoryValue] = React.useState('loan')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleTabHistoryChange = (event, newValue) => {
    setTabHistoryValue(newValue)
  }
  
  const fetchMemberDetail = async () => {
    let uri = apiConfig.baseURL + `/members/${router.query.nationalId}`
    console.log(uri)
    try{
     const res = await axios.get(uri)
      setMemberDetail(res.data[0])
    } catch (error) {
      console.log(error)
    }
  }

  const fetchLoanDetail = async () => {
    let uri = apiConfig.baseURL + `/loans/request/${router.query.nationalId}/${router.query.loanId}`
    console.log(uri)
    try{
    const res = await axios.get(uri)
    console.log(res.data[0])
    setLoanDetail(res.data[0])

      // .then(result => setLoanDetail(result.data[0]))
      // .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMemberLoansHistories = async () => {
    let uri = apiConfig.baseURL + `/loans/loan-history/${router.query.nationalId}/${router.query.loanId}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      console.log(data)
      setMemberLoanHistories({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      router.query
      fetchMemberDetail()
      fetchMemberLoansHistories()
      fetchLoanDetail()
    }
  }, [router.isReady, router.query])

  console.log('memberLoanHistories = '+memberLoanHistories)
  console.log('memberDetail = '+memberDetail)
  console.log('loanDetail = '+loanDetail)

  const SkeletonLoanReceiptLoading = () => (
    <Box sx={{ width: '100%' }}>
      {memberDetail?.nationalId ? (
        <LoanContext.Provider value={loanDetail}>
          <FormLoanReceipt />
        </LoanContext.Provider>
      ) : (
        <Typography variant='h4'>
          <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
        </Typography>
      )}
    </Box>
  )

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SkeletonLoanReceiptLoading />
      </Grid>
    </Grid>
  )
}
FormLayouts.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default FormLayouts
