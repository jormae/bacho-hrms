import { useEffect, useState, createContext } from 'react'
import * as React from 'react'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import apiConfig from 'src/configs/apiConfig'
import axios from 'axios'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import FormMember from 'src/views/form-layouts/FormMember'

export const MemberContext = createContext()

export const PositionsContext = createContext()

export const MemberTypesContext = createContext()

export const MemberRolesContext = createContext()

export const PaymentTypesContext = createContext()

export const MemberStatusContext = createContext()

export const ReferHospitalsContext = createContext()

export const PttypesContext = createContext()

export const InvesmentHistoryContext = createContext()

export const LoanHistoryContext = createContext()

export const DividendHistoryContext = createContext()

export const SpouseContext = createContext()

const FormLayouts = () => {

  const [memberDetail, setMemberDetail] = useState()
  const [position, setPositions] = useState([])
  const [memberTypes, setMemberTypes] = useState([])
  const [memberRoles, setMemberRoles] = useState([])
  const [paymentTypes, setPaymentTypes] = useState([])
  const [MemberStatus, setReferCauses] = useState([])
  const [value, setValue] = React.useState('member')

  const handleChange = (event, newValue) => {
    setValue(newValue)
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

  const fetchMemberTypes = async () => {
    let uri = apiConfig.baseURL + `/utils/member-types`
    try {
      await axios
        .get(uri)
        .then(result => setMemberTypes(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMemberRoles = async () => {
    let uri = apiConfig.baseURL + `/utils/member-roles`
    try {
      await axios
        .get(uri)
        .then(result => setMemberRoles(result.data))
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

  const fetchMemberStatus = async () => {
    let uri = apiConfig.baseURL + `/utils/member-status`
    try {
      await axios
        .get(uri)
        .then(result => setReferCauses(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

      // fetchMemberDetail()
      fetchPositions()
      fetchMemberTypes()
      fetchMemberRoles()
      fetchPaymentTypes()
      fetchMemberStatus()

    }, [])

  const SkeletonMemberFormsLoading = () => (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            <Tab label='ข้อมูลสมาชิก' value='member' />
          </TabList>
        </Box>
      <TabPanel value='member'>
            <MemberContext.Provider value={memberDetail}>
              <PositionsContext.Provider value={position}>
                <MemberTypesContext.Provider value={memberTypes}>
                  <MemberRolesContext.Provider value={memberRoles}>
                    <PaymentTypesContext.Provider value={paymentTypes}>
                      <MemberStatusContext.Provider value={MemberStatus}>
                        <FormMember />
                      </MemberStatusContext.Provider>
                    </PaymentTypesContext.Provider>
                  </MemberRolesContext.Provider>
                </MemberTypesContext.Provider>
              </PositionsContext.Provider>
            </MemberContext.Provider>
        </TabPanel>
      </TabContext>
    </Box>
  )

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SkeletonMemberFormsLoading />
      </Grid>
    </Grid>
  )
}

export default FormLayouts
