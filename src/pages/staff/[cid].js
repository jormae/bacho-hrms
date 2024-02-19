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
import FormWork from 'src/views/form-layouts/FormWork'
import TableReportMonthlyStaffAttendance from 'src/views/tables/TableReportMonthlyStaffAttendance'
import moment from 'moment'
import 'moment/locale/th' // without this line it didn't work
import Leaves from '../leaves/cid/[cid]'
import TableReportYearlyStaffLeave from 'src/views/tables/TableReportYearlyStaffLeave'
import TableReportYearlyStaffOutStation from 'src/views/tables/TableReportYearlyStaffOutStation'
import TableReportYearlyStaffAttendance from 'src/views/tables/TableReportYearlyStaffAttendance'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

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

export const ContractTypesContext = createContext()

export const DeptsContext = createContext()

export const PnamesContext = createContext()

export const StaffStatusContext = createContext()

export const ReferHospitalsContext = createContext()

export const PttypesContext = createContext()

export const InvesmentHistoryContext = createContext()

export const StaffStrDateContext = createContext()

export const StaffCidContext = createContext()

export const DividendHistoryContext = createContext()

export const SuretyHistoryContext = createContext()

export const SpouseContext = createContext()

const FormLayouts = () => {
  const router = useRouter()
  if (router.isReady) {
    router.query.cid
  }
  const [err, setError] = useState()
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
  const [staffDetail, setStaffDetail] = useState()

  const selectedStaffCid = router.query.cid ?? staffDetail?.cid
  const [positions, setPositions] = useState([])
  const [contractTypes, setContractTypes] = useState([])
  const [depts, setDepts] = useState([])
  const [pNames, setPnames] = useState([])
  const [StaffStatus, setReferCauses] = useState([])
  const [staffSuretyHistories, setStaffSuretyHistories] = useState({ blogs: [] })
  const [value, setValue] = React.useState('personalInfo')
  const [tabHistoryValue, setTabHistoryValue] = React.useState('monthly-attendance')
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  // console.log('router.query.cid = ' + router.query.cid)
  // console.log(staffDetail)
  // console.log("Selected staff cid = " + staffDetail?.cid)

  const strDate =
    moment(date).format('DD') +
    ' เดือน ' +
    moment(date).format('MMMM') +
    ' พ.ศ.' +
    moment(date).add(543, 'year').format('YYYY')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleTabHistoryChange = (event, newValue) => {
    setTabHistoryValue(newValue)
  }

  const fetchStaffDetail = async () => {
    let uri = apiConfig.baseURL + `/staff/${router.query.cid}`

    // console.log(uri)
    try {
      await axios
        .get(uri, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }
        })
        .then(result => setStaffDetail(result.data[0]))
        .catch(error => {
          console.error(error)
          console.error(error.response.data)
          setError(error.message + ` (${error.response.data})`)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchPositions = async () => {
    let uri = apiConfig.baseURL + `/utils/positions`

    // console.log(uri)
    try {
      await axios
        .get(uri)
        .then(result => setPositions(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchPnames = async () => {
    let uri = apiConfig.baseURL + `/utils/pname`

    // console.log(uri)
    try {
      await axios
        .get(uri)
        .then(result => setPnames(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchContractTypes = async () => {
    let uri = apiConfig.baseURL + `/utils/contract-types`

    // console.log(uri)
    try {
      await axios
        .get(uri)
        .then(result => setContractTypes(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchDepts = async () => {
    let uri = apiConfig.baseURL + `/utils/depts`
    try {
      await axios
        .get(uri)
        .then(result => setDepts(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      router.query
      fetchStaffDetail()
      fetchPnames()
      fetchContractTypes()
      fetchPositions()
      fetchDepts()
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
              <PnamesContext.Provider value={pNames}>
                <StaffStatusContext.Provider value={StaffStatus}>
                  <FormStaffDetail />
                </StaffStatusContext.Provider>
              </PnamesContext.Provider>
            </StaffContext.Provider>
          ) : (
            <Typography variant='h4'>
              <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
            </Typography>
          )}
        </TabPanel>
        <TabPanel value='workInfo'>
          {staffDetail?.cid ? (
            <StaffContext.Provider value={staffDetail}>
              <PositionsContext.Provider value={positions}>
                <ContractTypesContext.Provider value={contractTypes}>
                  <DeptsContext.Provider value={depts}>
                    <FormWork />
                  </DeptsContext.Provider>
                </ContractTypesContext.Provider>
              </PositionsContext.Provider>
            </StaffContext.Provider>
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
          {staffDetail?.cid ? (
            <Grid container wrap='nowrap'>
              <Grid item xs={12} md={12} lg={12}>
                <StaffStrDateContext.Provider value={strDate}>
                  <StaffCidContext.Provider value={selectedStaffCid}>
                    <TableReportMonthlyStaffAttendance />
                  </StaffCidContext.Provider>
                </StaffStrDateContext.Provider>
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
          {staffDetail?.cid ? (
            <Grid container wrap='nowrap'>
              <Grid item xs={12} md={12} lg={12}>
                <StaffCidContext.Provider value={selectedStaffCid}>
                  <TableReportYearlyStaffAttendance />
                </StaffCidContext.Provider>
              </Grid>
            </Grid>
          ) : (
            <Typography variant='h4'>
              <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
            </Typography>
          )}
        </TabPanel>
        <TabPanel value='yearly-leave'>
          {staffDetail?.cid ? (
            <Grid container wrap='nowrap'>
              <Grid item xs={12} md={12} lg={12}>
                <StaffCidContext.Provider value={selectedStaffCid}>
                  <TableReportYearlyStaffLeave />
                </StaffCidContext.Provider>
              </Grid>
            </Grid>
          ) : (
            <Typography variant='h4'>
              <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
            </Typography>
          )}
        </TabPanel>
        <TabPanel value='yearly-outstation'>
          {staffDetail?.cid ? (
            <Grid container wrap='nowrap'>
              <Grid item xs={12} md={12} lg={12}>
                <StaffCidContext.Provider value={selectedStaffCid}>
                  <TableReportYearlyStaffOutStation />
                </StaffCidContext.Provider>
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
    <div>
      {err ? (
        <Grid container spacing={6}>
          <Grid item xs={12} md={12}>
            <Alert severity='error'>
              <AlertTitle>Error!</AlertTitle>
              {err}
            </Alert>
          </Grid>
        </Grid>
      ) : (
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
      )}
    </div>
  )
}

export default FormLayouts
