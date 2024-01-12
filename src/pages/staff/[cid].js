import { useEffect, useState, createContext } from 'react'
import * as React from 'react'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import apiConfig from 'src/configs/apiConfig'
import FormStaffDetail from 'src/views/form-layouts/FormStaffDetail'
import axios from 'axios'
import CardUser from 'src/views/cards/CardUser'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import FormAccount from 'src/views/form-layouts/FormAccount'
import { ConsoleNetworkOutline } from 'mdi-material-ui'

// const defaultData = {
//   ptName: 'Loading',
//   admitDate: '2022-04-09T17:00:00.000Z',
//   dischargeDate: '2022-04-11T17:00:00.000Z',
//   doctorCode: 'Loading',
//   wardCode: 'Loading',
//   dischargeStatusCode: 'Loading',
//   dischargeTypeCode: 'Loading',
//   referCauseCode: 0,
//   referHospitalCode: 0,
//   pttypeCode: 'Loading',
//   admitDuration: 'Loading'
// }

export const StaffContext = createContext()

export const PositionsContext = createContext()

export const StaffTypesContext = createContext()

export const StaffRolesContext = createContext()

export const PaymentTypesContext = createContext()

export const StaffStatusContext = createContext()

export const ReferHospitalsContext = createContext()

export const PttypesContext = createContext()

export const InvesmentHistoryContext = createContext()

export const LoanHistoryContext = createContext()

export const DividendHistoryContext = createContext()

export const SuretyHistoryContext = createContext()

export const SpouseContext = createContext()

const FormLayouts = () => {
  const router = useRouter()
  if (router.isReady) {
    router.query.cid
  }
  const [staffDetail, setStaffDetail] = useState()
  console.log(staffDetail)
  const cid = staffDetail?.cid
  const [position, setPositions] = useState([])
  const [staffTypes, setStaffTypes] = useState([])
  const [staffRoles, setStaffRoles] = useState([])
  const [paymentTypes, setPaymentTypes] = useState([])
  const [StaffStatus, setReferCauses] = useState([])
  const [spouseDetails, setSpouseDetails] = useState()
  const [staffInvestmentHistories, setStaffInvestmentHistories] = useState({ blogs: [] })
  const [staffLoanHistories, setStaffLoanHistories] = useState({ blogs: [] })
  const [staffDividendHistories, setStaffDividendHistories] = useState({ blogs: [] })
  const [staffSuretyHistories, setStaffSuretyHistories] = useState({ blogs: [] })
  const [value, setValue] = React.useState('personalInfo')
  const [tabHistoryValue, setTabHistoryValue] = React.useState('monthly-attendance')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleTabHistoryChange = (event, newValue) => {
    setTabHistoryValue(newValue)
  }

  const fetchStaffDetail = () => {
    let uri = apiConfig.baseURL + `/staff/${router.query.cid}`
    console.log(uri)

    axios
      .get(uri)
      .then(result => setStaffDetail(result.data[0]))
      .catch(error => console.log('An error occurred' + error))
  }

  const fetchPositions = async () => {
    let uri = apiConfig.baseURL + `/utils/positions`
    console.log(uri)
    try {
      await axios
        .get(uri)
        .then(result => setPositions(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchStaffTypes = async () => {
    let uri = apiConfig.baseURL + `/utils/staff-types`
    try {
      await axios
        .get(uri)
        .then(result => setStaffTypes(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchStaffRoles = async () => {
    let uri = apiConfig.baseURL + `/utils/staff-roles`
    try {
      await axios
        .get(uri)
        .then(result => setStaffRoles(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchPaymentTypes = async () => {
    let uri = apiConfig.baseURL + `/utils/payment-types`
    try {
      await axios
        .get(uri)
        .then(result => setPaymentTypes(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchStaffStatus = async () => {
    let uri = apiConfig.baseURL + `/utils/staff-status`
    try {
      await axios
        .get(uri)
        .then(result => setReferCauses(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchSpouseDetail = () => {
    let uri = apiConfig.baseURL + `/spouses/${router.query.cid}`
    console.log(uri)

    axios
      .get(uri)
      .then(result => setSpouseDetails(result.data[0]))
      .catch(error => console.log('An error occurred' + error))
  }

  const fetchStaffInvestments = async () => {
    let uri = apiConfig.baseURL + `/investments/history/${router.query.cid}`
    try {
      const { data } = await axios.get(uri)
      setStaffInvestmentHistories({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchStaffLoans = async () => {
    let uri = apiConfig.baseURL + `/loans/staff/${router.query.cid}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setStaffLoanHistories({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchStaffDividends = async () => {
    let uri = apiConfig.baseURL + `/dividends/${router.query.cid}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setStaffDividendHistories({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchStaffSureties = async () => {
    let uri = apiConfig.baseURL + `/loans/surety/${router.query.cid}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      console.log(data)
      setStaffSuretyHistories({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      router.query
      fetchStaffDetail()
      fetchPositions()
      fetchStaffTypes()
      fetchStaffRoles()
      fetchPaymentTypes()
      fetchStaffStatus()
      fetchSpouseDetail()
      fetchStaffInvestments()
      fetchStaffLoans()
      fetchStaffDividends()
      fetchStaffSureties()
    }
  }, [router.isReady, router.query])

  const SkeletonStaffCardLoading = () => (
    <Box sx={{ width: '100%' }}>
      {staffDetail?.cid ? (
        <StaffContext.Provider value={staffDetail}>
          <CardUser />
        </StaffContext.Provider>
      ) : (
        <Typography variant='h4'>
          <Skeleton width='100%' height={300} sx={{ animationDuration: '3.0s' }} />
        </Typography>
      )}
    </Box>
  )

  const SkeletonStaffFormsLoading = () => (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            <Tab label='ข้อมูลส่วนตัว' value='personalInfo' />
            <Tab label='ข้อมูลการทำงาน' value='workInfo' />
            <Tab label='ข้อมูลบัญชีผู้ใช้' value='accountInfo' />
          </TabList>
        </Box>
        <TabPanel value='personalInfo'>
          {staffDetail?.cid ? (
            <StaffContext.Provider value={staffDetail}>
              <PositionsContext.Provider value={position}>
                <StaffTypesContext.Provider value={staffTypes}>
                  <StaffRolesContext.Provider value={staffRoles}>
                    <PaymentTypesContext.Provider value={paymentTypes}>
                      <StaffStatusContext.Provider value={StaffStatus}>
                        <FormStaffDetail />
                      </StaffStatusContext.Provider>
                    </PaymentTypesContext.Provider>
                  </StaffRolesContext.Provider>
                </StaffTypesContext.Provider>
              </PositionsContext.Provider>
            </StaffContext.Provider>
          ) : (
            <Typography variant='h4'>
              <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
            </Typography>
          )}
        </TabPanel>
        <TabPanel value='workInfo'>
          {staffDetail?.cid ? (
            <SpouseContext.Provider value={spouseDetails}>
              <FormAccount />
            </SpouseContext.Provider>
          ) : (
            <Typography variant='h4'>
              <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
            </Typography>
          )}
        </TabPanel>
        <TabPanel value='accountInfo'>
          {staffDetail?.cid ? (
            <StaffContext.Provider value={staffDetail}>
              <FormAccount />
            </StaffContext.Provider>
          ) : (
            <Typography variant='h4'>
              <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
            </Typography>
          )}
        </TabPanel>
      </TabContext>
    </Box>
  )

  const SkeletonStaffInvestmentAndLoadHistotiesLoading = () => (
    <Box sx={{ width: '100%' }}>
      <TabContext value={tabHistoryValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabHistoryChange} aria-label='lab API tabs example'>
            <Tab label='ข้อมูลปฏิบัติงาน(รายเดือน)' value='monthly-attendance' />
            <Tab label='ข้อมูลสรุปปฏิบัติงาน(รายปี)' value='yearly-attendance' />
            <Tab label='ประวัติลา' value='yearly-leave' />
            <Tab label='ประวัติราชการนอกสถานที่' value='yearly-outstation' />
          </TabList>
        </Box>
        <TabPanel value='monthly-attendance'>
          {staffLoanHistories.blogs.length > 0 ? (
            <Grid container wrap='nowrap'>
              <Grid item xs={12} md={12} lg={12}>
                <LoanHistoryContext.Provider value={staffLoanHistories}>
                  {/* <TableStaffLoanHistory /> */}
                </LoanHistoryContext.Provider>
              </Grid>
            </Grid>
          ) : (
            <Typography variant='h4'>
              <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
            </Typography>
          )}
        </TabPanel>
        {/* <TabPanel value='otherLoan'>
          {staffLoanHistories.blogs.length > 0 ? (
            <Grid container wrap='nowrap'>
               <Grid item xs={12} md={12} lg={12}>
                <LoanHistoryContext.Provider value={staffLoanHistories}>
                  <TableStaffLoanHistory />
                </LoanHistoryContext.Provider>
              </Grid>
            </Grid>
          ) : (
            <Typography variant='h4'>
              <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
            </Typography>
          )}
        </TabPanel> */}
        <TabPanel value='yearly-attendance'>
          {staffInvestmentHistories.blogs.length > 0 ? (
            <Grid container wrap='nowrap'>
              <Grid item xs={12} md={12} lg={12}>
                <InvesmentHistoryContext.Provider value={staffInvestmentHistories}>
                  {/* <TableStaffInvestmentHistory /> */}
                </InvesmentHistoryContext.Provider>
              </Grid>
            </Grid>
          ) : (
            <Typography variant='h4'>
              <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
            </Typography>
          )}
        </TabPanel>
        <TabPanel value='yearly-leave'>
          {staffDividendHistories.blogs.length > 0 ? (
            <Grid container wrap='nowrap'>
              <Grid item xs={12} md={12} lg={12}>
                <DividendHistoryContext.Provider value={staffDividendHistories}>
                  {/* <TableStaffDividendHistory /> */}
                </DividendHistoryContext.Provider>
              </Grid>
            </Grid>
          ) : (
            <Typography variant='h4'>
              <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
            </Typography>
          )}
        </TabPanel>
        <TabPanel value='yearly-outstation'>
          {staffSuretyHistories.blogs.length > 0 ? (
            <Grid container wrap='nowrap'>
              <SuretyHistoryContext.Provider value={staffSuretyHistories}>
                {/* <TableStaffSuretyHistory /> */}
              </SuretyHistoryContext.Provider>
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
      <Grid item lg={4} md={12} xs={12}>
        <SkeletonStaffCardLoading />
      </Grid>
      <Grid item lg={8} md={12} xs={12}>
        <SkeletonStaffFormsLoading />
      </Grid>
      <Grid item md={12} xs={12}>
        <SkeletonStaffInvestmentAndLoadHistotiesLoading />
      </Grid>
    </Grid>
  )
}

export default FormLayouts
