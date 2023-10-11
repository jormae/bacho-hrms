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
import TableLoan from 'src/views/tables/TableLoan'
import CardMember from 'src/views/cards/CardMember'
import CardTotalLoan from 'src/views/cards/CardTotalLoan'
import CardAddMember from 'src/views/cards/CardAddMember'
import TableAllowance from 'src/views/tables/TableAllowance'
import CardAddAllowance from 'src/views/cards/CardAddAllowance'
import FormAllowance from 'src/views/form-layouts/FormAllowance'
import CardAllowances from 'src/views/cards/CardAllowances'
import TableZakat from 'src/views/tables/TableZakat'
import FormZakat from 'src/views/form-layouts/FormZakat'
import CardZakats from 'src/views/cards/CardZakats'

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
        <CardZakats />
       </Grid>
        <Grid item xs={12}>
          <FormZakat />
        </Grid>
        <Grid item xs={12}>
          <TableZakat />
        </Grid>
    </Grid>
  )
}

export default FormLayouts
