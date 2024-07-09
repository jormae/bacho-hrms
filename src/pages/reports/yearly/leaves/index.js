import * as React from 'react'
import { useEffect, useState, createContext } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TableLeaves from 'src/views/tables/TableLeaves'
import Error401 from 'src/pages/401'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TableApprovedLeaves from 'src/views/tables/TableLeavesDirectorSigned'
import TableLeavesDirectorSigned from 'src/views/tables/TableLeavesDirectorSigned'
import TableLeavesNew from 'src/views/tables/TableLeavesNew'
import TableLeavesColleagueSigned from 'src/views/tables/TableLeavesColleagueSigned'
import TableLeavesHeadDeptSigned from 'src/views/tables/TableLeavesHeadDeptSigned'
import TableLeavesRejected from 'src/views/tables/TableLeavesRejected'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'

const Leaves = () => {
  const userRoleId = typeof window !== 'undefined' ? localStorage.getItem('userRoleId') : null
  const [err, setError] = useState()
  const [leaves, setLeaves] = useState({ blogs: [] })
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const [tabHistoryValue, setTabHistoryValue] = useState('newLeave')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleTabHistoryChange = (event, newValue) => {
    setTabHistoryValue(newValue)
  }

  const fetchLeaves = async () => {
    let uri = apiConfig.baseURL + `/leaves/all/2024`
    console.log(uri)
    try {
      const { data } = await axios
        .get(uri, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }
        })
        .catch(error => {
          console.error(error)
          console.error(error.response.data)
          setError(error.message + ` (${error.response.data})`)
        })
      setLeaves({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchLeaves()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const SkeletonLeaveReportLoading = () => (
    <Box sx={{ width: '100%' }}>
      <Grid container wrap='nowrap'>
        <Grid item xs={12} md={12} lg={12}>
          <TableLeaves />
        </Grid>
      </Grid>
    </Box>
  )

  if (userRoleId != '1' && userRoleId != '10') {
    return <Error401 />
  } else {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box sx={{ width: '100%' }}>
            <Grid container wrap='nowrap'>
              <Grid item xs={12} md={12} lg={12}>
                <SkeletonLeaveReportLoading />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    )
  }
}

export default Leaves
