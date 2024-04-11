import Grid from '@mui/material/Grid'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import { useEffect, useState, createContext } from 'react'
import { useForm } from 'react-hook-form'
import apiConfig from 'src/configs/apiConfig'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { Box } from '@mui/material/'
import TableDuplicateAttendances from 'src/views/tables/TableDuplicateAttendances'
import Error401 from 'src/pages/401'
import TableStaffDuplicateAttendances from 'src/views/tables/TableStaffDuplicateAttendances'
import moment from 'moment'

export const AttendancesContext = createContext()

export const CidContext = createContext()

export const AttendanceTypeIdContext = createContext()

export const DateContext = createContext()

const FormLayouts = () => {
  const router = useRouter()
  if (router.isReady) {
    router.query.cid
    router.query.attendanceTypeId
    router.query.date
  }
  console.log('router date = '+ moment(router.query.date).format('YYYY-MM-DD HH:mm:ss'))
  const [err, setError] = useState()
  const [attendances, setAttendances] = useState({ blogs: [] })
  const userRoleId = typeof window !== 'undefined' ? localStorage.getItem('userRoleId') : null
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const fetchAttendances = async () => {
    let uri = apiConfig.baseURL + `/attendances/duplicate/attendances/${router.query.cid}/${router.query.attendanceTypeId}/${router.query.date}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri, {
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
      setAttendances({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   if (router.isReady) {
  //     router.query
  //     fetchAttendances()
  //   }
  // }, [router.isReady, router.query])

      const SkeletonDataCorrectLoading = () => (
        <Box sx={{ width: '100%' }}>
            <Grid container wrap='nowrap'>
                <Grid item xs={12} md={12} lg={12}>
                    {/* <CidContext.Provider value={cid}> */}
                      {/* <AttendanceTypeIdContext.Provider value={attendances}>
                        <DateContext.Provider value={attendances}> */}
                          {/* <AttendancesContext.Provider value={attendances}> */}
                              <TableStaffDuplicateAttendances />
                          {/* </AttendancesContext.Provider> */}
                        {/* </DateContext.Provider>
                      </AttendanceTypeIdContext.Provider>
                    </CidContext.Provider> */}
                </Grid>
            </Grid>
        </Box>
    )

    if (userRoleId != 1) {
        return <Error401 />;
    }
    else {

        return (
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <SkeletonDataCorrectLoading />
                </Grid>
            </Grid>
            
        )
    }

}

export default FormLayouts
