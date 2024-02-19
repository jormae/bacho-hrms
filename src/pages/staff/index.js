import Grid from '@mui/material/Grid'
import TableMember from 'src/views/tables/TableStaff'
import toast, { Toaster } from 'react-hot-toast'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import { useEffect, useState, createContext } from 'react'
import { useForm } from 'react-hook-form'
import apiConfig from 'src/configs/apiConfig'
import Error401 from '../401'
import Error404 from '../404'
import Error500 from '../500'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

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

  if (userRoleId != 1) {
    return <Error401 />;
  }
  else {

    return (
      <Grid container spacing={6}>
        {err ? (
          <Grid item xs={12} md={12}>
            <Alert severity='error'>
              <AlertTitle>Error!</AlertTitle>
              {err}
            </Alert>
          </Grid>
        ) : (
          <DataContext.Provider value={staff}>
            <Grid item xs={12}>
              <TableMember />
            </Grid>
          </DataContext.Provider>
        )}
      </Grid>
    )
  }
}

export default FormLayouts
