// ** React Imports
import { forwardRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import axios from 'axios'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import { Input } from '@mui/material'

import moment from 'moment'
import toast, { Toaster } from 'react-hot-toast'

const FormReturnChart = () => {
  // moment.locale('th')
  // const today = moment().add(543, 'year').format('L')

  const staffName = localStorage.getItem('staffName')
  const today = moment().format('YYYY-MM-DD')

  // console.log(today)
  const [charts, setCharts] = useState({ blogs: [] })
  const [an, setAn] = useState()

  const fetchCharts = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/chart/return-chart`)
      setCharts({ blogs: data })

      // console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  // const notify = () => toast('Here is your toast.')
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = data => {
    console.log(data)
    an = data.an

    fetch('http://localhost:3001/chart/return-chart/${an}/${staffName}/${date}', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        if (data.status == 'success') {
          toast.success(data.message)
          fetchCharts()
        } else {
          // console.log(data.errors[0].msg)
          toast.error(data.errors[0].msg)
        }
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      })

    resetField('an')
    fetchCharts()
  }

  useEffect(() => {
    const staffName = localStorage.getItem('staffName')
    verifyToken()
    fetchCharts()
  }, [setCharts])

  return (
    <Card>
      <CardHeader title='รับชาร์ต' titleTypographyProps={{ variant: 'h6' }} />
      <Toaster />
      <Divider sx={{ margin: 0 }} />
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}></Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoFocus
                fullWidth
                label='สแกนบาร์โค้ด'
                placeholder='สแกนบาร์โค้ด'
                {...register('an', { required: true })}
              />
              <Input type='hidden' {...register('staffName', { value: staffName })} />
              <Input type='hidden' {...register('date', { value: today })} />
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  )
}

export default FormReturnChart
