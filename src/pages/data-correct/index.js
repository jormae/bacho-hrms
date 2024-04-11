import Grid from '@mui/material/Grid'
import TableMember from 'src/views/tables/TableStaff'
import toast, { Toaster } from 'react-hot-toast'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import { useEffect, useState, createContext } from 'react'
import { useForm } from 'react-hook-form'
import apiConfig from 'src/configs/apiConfig'
import { Box } from '@mui/material/'
import Error401 from '../401'

export const DataContext = createContext()

export const CardContext = createContext()

const FormLayouts = () => {

  const [err, setError] = useState()
  const [staff, setStaff] = useState({ blogs: [] })
  const userRoleId = typeof window !== 'undefined' ? localStorage.getItem('userRoleId') : null
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const fetchStaff = async () => {
    let uri = apiConfig.baseURL + `/staff`
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
      setStaff({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = data => {
    let uri = apiConfig.baseURL + '/member/upload/'
    fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        if (data.status == 'success') {
          toast.success(data.message)
          fetchStaff()
        } else {
          toast.error(data.errors[0].msg)
        }
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      })

    resetField('an')
  }

  const verifyToken = async () => {
    const token = localStorage.getItem('token')
    let uri = apiConfig.baseURL + '/auth/token'
    fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.status !== 'success') {
          localStorage.removeItem('token')
          localStorage.removeItem('staffName')
          window.location = '/pages/login'
        }
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  useEffect(() => {
    // verifyToken()
    fetchStaff()
  }, [])

    //   const SkeletonLeaveReportLoading = () => (
    //     <Box sx={{ width: '100%' }}>
    //         <Grid container wrap='nowrap'>
    //             <Grid item xs={12} md={12} lg={12}>
    //             <DataContext.Provider value={staff}>
    //               <TableMember />
    //             </DataContext.Provider>
    //             </Grid>
    //         </Grid>
    //     </Box>
    // )

    if (userRoleId != 1) {
        return <Error401 />;
    }
    else {

        return (
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    {/* <SkeletonLeaveReportLoading /> */}
                    <Box sx={{ width: '100%' }}>
                      <Grid container wrap='nowrap'>
                          <Grid item xs={12} md={12} lg={12}>
                          <DataContext.Provider value={staff}>
                            <TableMember />
                          </DataContext.Provider>
                          </Grid>
                      </Grid>
                  </Box>
                </Grid>
            </Grid>
            
        )
    }

}

export default FormLayouts
