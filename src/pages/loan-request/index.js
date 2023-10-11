import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import { Input } from '@mui/material'
import TextField from '@mui/material/TextField'
import TableLoanRequest from 'src/views/tables/TableLoanRequest'
import toast, { Toaster } from 'react-hot-toast'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import { useEffect, useState, createContext } from 'react'
import { useForm } from 'react-hook-form'
import apiConfig from 'src/configs/apiConfig'

export const DataContext = createContext()

export const CardContext = createContext()

const FormLayouts = () => {
  const [loanRequests, setLoanRequests] = useState({ blogs: [] })
  const staffName = typeof window !== 'undefined' ? localStorage.getItem('staffName') : null

  const fetchLoanRequests = async () => {
    let uri = apiConfig.baseURL + `/loans/request`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setLoanRequests({ blogs: data })
    } catch (error) {
      // console.log(error)
    }
  }

  useEffect(() => {
    fetchLoanRequests()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
          {/* <CardNewLoanRequest /> */}
      </Grid>
      <DataContext.Provider value={loanRequests}>
        <Grid item xs={12}>
          <TableLoanRequest />
        </Grid>
      </DataContext.Provider>
    </Grid>
  )
}

export default FormLayouts
