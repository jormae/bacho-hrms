import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import { Input } from '@mui/material'
import TextField from '@mui/material/TextField'
import TableMember from 'src/views/tables/TableStaff'
import toast, { Toaster } from 'react-hot-toast'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import { useEffect, useState, createContext } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import apiConfig from 'src/configs/apiConfig'
import FormLoan from 'src/views/form-layouts/FormLoan'
import FormLoanPayment from 'src/views/form-layouts/FormLoanPayment'

export const DataContext = createContext()

export const PaymentSuggestionContext = createContext()

export const MemberContext = createContext()

const FormLayouts = () => {

  const router = useRouter()
  if (router.isReady) {
    router.query.nationalId
    router.query.loanId
  }
  console.log('link = '+router.query.loanId)
  const [member, setMember] = useState()
  const [paymentSuggestionInfo, setPaymentSuggestionInfo] = useState()
  const staffName = typeof window !== 'undefined' ? localStorage.getItem('staffName') : null

  const fetchMember = async () => {
    let uri = apiConfig.baseURL + `/members/${router.query.nationalId}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setMember({ blogs: data })
    } catch (error) {
      // console.log(error)
    }
  }

  const fetchPaymentSuggestionInfo = async () => {
    // let uri = apiConfig.baseURL + `/loans/payment-suggestion/1960500015821`
    let uri = apiConfig.baseURL + `/loans/payment-suggestion/${router.query.loanId}`
    console.log(uri)

    try {
      await axios
        .get(uri)
        .then(result => setPaymentSuggestionInfo(result.data[0]))
        .catch(error => console.log('An error occurred' + error))
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
    let uri = apiConfig.baseURL + '/loans/insert/'
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
          fetchMembers()
          fetchStatNewMember()
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
        console.log(data)
        if (data.status !== 'success') {
          localStorage.removeItem('token')
          localStorage.removeItem('staffName')
          window.location = '/pages/login'
          console.log(data)
        }
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  useEffect(() => {
    if (router.isReady) {
      router.query
      verifyToken()
      fetchMember()
      fetchPaymentSuggestionInfo()
    }
  }, [router.isReady, router.query])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <MemberContext.Provider value={member}>
          <PaymentSuggestionContext.Provider value={paymentSuggestionInfo}>
            <Card>
              <CardHeader title='แจ้งข้อมูลการชำระเงินกู้สวัสดิการ' titleTypographyProps={{ variant: 'h6' }} />
              <Toaster />
              <Divider sx={{ margin: 0 }} />
                <FormLoanPayment/>
            </Card>
          </PaymentSuggestionContext.Provider>
        </MemberContext.Provider>
      </Grid>
    </Grid>
  )
}

export default FormLayouts
