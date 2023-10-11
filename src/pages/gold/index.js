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

import CardGolds from 'src/views/cards/CardGolds'
import FormGold from 'src/views/form-layouts/FormGold'
import TableGold from 'src/views/tables/TableGold'

const FormLayouts = () => {
  const [loans, setLoans] = useState({ blogs: [] })
  const memberName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null

  // const fetchLoans = async () => {
  //   let uri = apiConfig.baseURL + `/loans`
  //   console.log(uri)
  //   try {
  //     const { data } = await axios.get(uri)
  //     setLoans({ blogs: data })
  //   } catch (error) {
  //     // console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   fetchLoans()
  // }, [])

  return (
    <Grid container spacing={6}>
       <Grid container item>
        <CardGolds />
       </Grid>
        <Grid item xs={12}>
          <FormGold />
        </Grid>
        <Grid item xs={12}>
          <TableGold />
        </Grid>
    </Grid>
  )
}

export default FormLayouts
