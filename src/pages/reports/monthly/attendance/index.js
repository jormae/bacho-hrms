import * as React from 'react'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import { useEffect, useState, createContext } from 'react'
import { useForm } from 'react-hook-form'
import apiConfig from 'src/configs/apiConfig'
import moment from 'moment'
import 'moment/locale/th'  // without this line it didn't work
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Skeleton from '@mui/material/Skeleton'
import TableReportPaid from 'src/views/tables/TableReportAttendance1'
import TableReportPendingPayment from 'src/views/tables/TableReportPendingPayment'
import TableReportFollowupPayment from 'src/views/tables/TableReportFollowupPayment'
import CardWelfarePayments from 'src/views/cards/CardWelfarePayments'
import TextField  from "@mui/material/TextField";
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import AssessmentIcon from '@material-ui/icons/Assessment';
import LoadingButton from '@mui/lab/LoadingButton'
import Badge from '@mui/material/Badge';

export const PaidContext = createContext()

export const PendingPaymentContext = createContext()

export const FollowupPaymentContext = createContext()

export const StrDateContext = createContext()

export const StrSumPaymentContext = createContext()

const FormLayouts = () => {

  const i = 1;  
  moment.locale('th')
  const [paidReports, setPaidReports] = useState({ blogs: [] })
  const [pendingPaymentReports, setPendingPaymentReports] = useState({ blogs: [] })
  const [followupPaymentReports, setFollowupPaymentReports] = useState({ blogs: [] })
  const [tabPayments, setTabPayments] = React.useState('pending-payment')
  const [date, setDate ]= useState(moment().format('YYYY-MM'))
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const [loading, setLoading] = React.useState(false)
  const [searchDate, setSearchDate ]= useState()
  const [badgeCouter, setBadgeCouter ]= useState(0)
  const [sumPayment, setSumPayment ]= useState(0)
  const strDate = 'เดือน '+ moment(date).format('MMMM') +' พ.ศ.'+ moment(date).add(543, 'year').format('YYYY');

  const handleTabChange = (event, newValue) => {
    setTabPayments(newValue)
  }

  const fetchBadgeCouter = async () => {
    let uri = apiConfig.baseURL + `/reports/monthly/welfare/count-payment/${date}`
    try {
        const { data } = await axios.get(uri)
        console.log(data)
        setBadgeCouter(data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchSumPayment = async () => {
    let uri = apiConfig.baseURL + `/reports/monthly/welfare/sum-payment/${date}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      console.log(data)
      setSumPayment(data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchPaidReports = async () => {
    let uri = apiConfig.baseURL + `/reports/monthly/welfare/paid/${date}`
    console.log('paid uri = '+uri)
    try {
        const { data } = await axios.get(uri)
        setPaidReports({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchPendingPaymentReports = async () => {
    let uri = apiConfig.baseURL + `/reports/monthly/welfare/pending-payment/${date}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setPendingPaymentReports({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchFollowupPaymentReports = async () => {
    let uri = apiConfig.baseURL + `/reports/monthly/welfare/followup-payment/${date}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setFollowupPaymentReports({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = async data => {
    setLoading(true)
    let strYearMonth = data.reportDate.slice(0,7);
    setSearchDate(strYearMonth)
    setDate(strYearMonth)

    let balance_uri = apiConfig.baseURL + `/reports/monthly/welfare/sum-payment/${strYearMonth}`
    try {
      const { data } = await axios.get(balance_uri)
      setSumPayment(data)
    } catch (error) {
      console.log(error)
    }

    let badge_uri = apiConfig.baseURL + `/reports/monthly/welfare/count-payment/${strYearMonth}`
    try {
        const { data } = await axios.get(badge_uri)
        setBadgeCouter(data)
    } catch (error) {
      console.log(error)
    }

    let pending_uri = apiConfig.baseURL + `/reports/monthly/welfare/pending-payment/${strYearMonth}`
    try {
      const { data } = await axios.get(pending_uri)
      setPendingPaymentReports({ blogs: data })
      setLoading(false)
    } catch (error) {
      console.log(error)
    }

    let paid_uri = apiConfig.baseURL + `/reports/monthly/welfare/paid/${strYearMonth}`
    console.log(paid_uri)
    try {
      const { data } = await axios.get(paid_uri)
      console.log(data)
      setPaidReports({ blogs: data })
    } catch (error) {
      console.log(error)
    }

}

  useEffect(() => {
    fetchSumPayment();
    fetchBadgeCouter();
    fetchPaidReports();
    fetchPendingPaymentReports();
    fetchFollowupPaymentReports();
  }, [])

  const SkeletonReportMonthlyWelfarePaymentsLoading = () => (
    <Box sx={{ width: '100%' }}>
      <TabContext value={tabPayments}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label='lab API tabs example' >
            <Tab label='รายการรอชำระเงิน' value='pending-payment' />
            <Badge badgeContent={badgeCouter[0]?.TOTAL_MEMBER} color="primary" sx={{mt:4}} />
            <Tab label='รายการชำระเงิน' value='paid' />
            <Badge badgeContent={badgeCouter[1]?.TOTAL_MEMBER} color="primary" sx={{mt:4}} />
          </TabList>
        </Box>
        <TabPanel value='paid'>
          {paidReports.blogs.length > 0 ? (
            <Grid container wrap='nowrap'>
              <Grid item xs={12} md={12} lg={12}>
                <PaidContext.Provider value={paidReports}>
                  <StrDateContext.Provider value={strDate}>
                    <TableReportPaid />
                  </StrDateContext.Provider>
                </PaidContext.Provider>
              </Grid>
            </Grid>
          ) : (
            <Typography variant='h4'>
              <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
            </Typography>
          )}
        </TabPanel>
        <TabPanel value='pending-payment'>
          {pendingPaymentReports.blogs.length > 0 ? (
            <Grid container wrap='nowrap'>
              <Grid item xs={12} md={12} lg={12}>
              <PendingPaymentContext.Provider value={pendingPaymentReports}>
                <StrDateContext.Provider value={strDate}>
                  <TableReportPendingPayment />
                </StrDateContext.Provider>
              </PendingPaymentContext.Provider>
              </Grid>
            </Grid>
          ) : (
            <Typography variant='h4'>
              <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
            </Typography>
          )}
        </TabPanel>
        <TabPanel value='followup-payment'>
          {followupPaymentReports.blogs.length > 0 ? (
            <Grid container wrap='nowrap'>
              <Grid item xs={12} md={12} lg={12}>
              <FollowupPaymentContext.Provider value={followupPaymentReports}>
                <TableReportFollowupPayment />
              </FollowupPaymentContext.Provider>
              </Grid>
            </Grid>
          ) : (
            <Typography variant='h4'>
              <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
            </Typography>
          )}
        </TabPanel>
      </TabContext>
    </Box>
  )

  return (
    <Grid container spacing={6}>
       <Grid container item>
          <StrSumPaymentContext.Provider value={sumPayment}>
            <CardWelfarePayments />
          </StrSumPaymentContext.Provider>
       </Grid>
       <Grid item md={12} xs={12}>
        <Card>
          <CardHeader title='ค้นหารายงาน' titleTypographyProps={{ variant: 'h6' }} />
          <Divider sx={{ margin: 0 }} />
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={6}><Typography style={{ fontSize: 24 }} >  </Typography></Grid>
                <Grid item xs={4} md={4}>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="เลือกวันที่" {...register('reportDate')}/>
                </LocalizationProvider> */}
                  {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Container components={['DatePicker']}>
                      <DatePicker label="Basic date picker" {...register('reportDate', { required: true })}/>
                    </Container>
                  </LocalizationProvider> */}
                  <TextField type="date" fullWidth label='วันที่' {...register('reportDate', { required: true })}/>
                </Grid>
                <Grid item xs={2}>
                  <Box
                    sx={{
                      gap: 5,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box sx={{ '& > button': { m: 1 } }}></Box>
                    <LoadingButton
                      type='submit'
                      color='primary'
                      onClick={handleSubmit(onSubmit)}
                      loading={loading}
                      loadingPosition='start'
                      startIcon={<AssessmentIcon />}
                      variant='contained'
                      size='large'
                    >
                      แสดง
                    </LoadingButton>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </Card>
      </Grid>

       <Grid item md={12} xs={12}>        
        <SkeletonReportMonthlyWelfarePaymentsLoading />
      </Grid>
    </Grid>

  )
}

export default FormLayouts
