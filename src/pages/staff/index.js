import Grid from '@mui/material/Grid'
import TableMember from 'src/views/tables/TableStaff'
import toast, { Toaster } from 'react-hot-toast'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import { useEffect, useState, createContext } from 'react'
import { useForm } from 'react-hook-form'
import apiConfig from 'src/configs/apiConfig'

export const DataContext = createContext()

export const CardContext = createContext()

const FormLayouts = () => {
  const [staff, setStaff] = useState({ blogs: [] })
  console.log(staff)

  // const staffName = typeof window !== 'undefined' ? localStorage.getItem('staffName') : null

  const fetchStaff = async () => {
    let uri = apiConfig.baseURL + `/staff`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setStaff({ blogs: data })
    } catch (error) {
      // console.log(error)
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

  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={12} md={6} lg={4}>
          <CardMember />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CardTotalLoan />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CardAddMember/>
        </Grid> */}

      <DataContext.Provider value={staff}>
        <Grid item xs={12}>
          {/* <TableTodo /> */}
          <TableMember />
        </Grid>
      </DataContext.Provider>
    </Grid>
  )
}

export default FormLayouts
