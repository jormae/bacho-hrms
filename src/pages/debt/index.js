import * as React from 'react'
import { useEffect, useState, createContext } from 'react'
import { useForm } from 'react-hook-form'
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
import apiConfig from 'src/configs/apiConfig'
import TableLoan from 'src/views/tables/TableLoan'
import CardMember from 'src/views/cards/CardMember'
import CardTotalLoan from 'src/views/cards/CardTotalLoan'
import CardAddMember from 'src/views/cards/CardAddMember'
import TableAllowance from 'src/views/tables/TableAllowance'
import CardAddAllowance from 'src/views/cards/CardAddAllowance'
import FormAllowance from 'src/views/form-layouts/FormAllowance'
import CardAllowances from 'src/views/cards/CardAllowances'
import FormDebt from 'src/views/form-layouts/FormDebt'
import TableDebt from 'src/views/tables/TableDebt'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton'
import AssessmentIcon from '@material-ui/icons/Assessment';
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Skeleton from '@mui/material/Skeleton'
import SaveIcon from '@material-ui/icons/Save';
import MenuItem from '@mui/material/MenuItem'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Button from '@mui/material/Button'
import TablePagination from "@mui/material/TablePagination"

import moment from 'moment'
import 'moment/locale/th' 
import CardDebts from 'src/views/cards/CardADebts'

const FormLayouts = () => {
  const date = moment().format('YYYY-MM')
  const strDate = 'เดือน '+ moment(date).format('MMMM') +' พ.ศ.'+ moment(date).add(543, 'year').format('YYYY');
  const strShortDate = moment(date).format('MM') +'/'+ moment(date).add(543, 'year').format('YYYY');
  const { register: register, handleSubmit, control, formState: { errors } } = useForm();
  const [loading, setLoading] = React.useState(false)
  const memberRoleId = typeof window !== 'undefined' ? localStorage.getItem('memberRoleId') : null
  const memberName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null  
  const [debts, setDebts] = useState({ blogs: [] })
  const [memberInfo, setMemberInfo] = useState()

  // const { register } = useForm();
    const [search, setSearch] = useState('')
    const i = 1;
  
    const [pg, setpg] = React.useState(0);
    const [rpg, setrpg] = React.useState(10);
  
    function handleChangePage(event, newpage) {
        setpg(newpage);
    }
  
    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    }

  const onSubmit =  data => {
    setLoading(true)
    console.log(data)
    let uri = apiConfig.baseURL + `/debts`

    fetch(uri, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(async data => {
        console.log(data)
        setLoading(false)
        if (data.status == 'success') {
        toast.success(data.message)
        fetchDebts()
        } else {
        toast.error(data.message || data.errors[0].msg)
        }
    })
    .catch(function (error) {
        console.log(JSON.stringify(error))
    })
}

    const fetchMemberInfo = async () => {
        let uri = apiConfig.baseURL + `/members`
        console.log(uri)
        try {
          await axios
            .get(uri)
            .then(result => setMemberInfo(result.data))
            .catch(error => console.log('An error occurred' + error))
        } catch (error) {
          console.log(error)
        }
      }

      const fetchDebts = async () => {
        const date = moment().format('YYYY-MM')

        let uri = apiConfig.baseURL + `/debts/date/${date}`
        try {
          const { data } = await axios.get(uri)
          setDebts({ blogs: data })
        } catch (error) {
          console.log(error)
        }
      }

      const deleteDebt = debtId => {
        setLoading(true)
        console.log('deleteDebt')
        console.log(debtId)
    
        let uri = apiConfig.baseURL + `/debts/${debtId}`
        console.log(uri)
    
        fetch(uri, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            setLoading(false)
            if (data.status == 'success') {
              toast.success(data.message)
              fetchDebts();
            } else {
              toast.error(data.message)
            }
          })
          .catch(function (error) {
            console.log(JSON.stringify(error))
          })
      }

  useEffect(() => {
    fetchMemberInfo()
    fetchDebts()
  }, [])

  return (
    <Grid container spacing={6}>
       <Grid container item>
        <CardDebts />
       </Grid>

        <Grid item xs={12}>
        <Card>
      <CardHeader title={`เพิ่มข้อมูลลูกหนี้ประจำ${strDate}`} titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <Toaster />
      <form key={2} noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
            <FormControl fullWidth>
                  <InputLabel>ชื่อลูกหนี้</InputLabel>
                  {memberInfo ? (
                  <Select label='ชื่อลูกหนี้' defaultValue={memberInfo?.nationalId ?? ''} {...register('nationalId')}>
                    {memberInfo.map(item => {
                      return (
                        <MenuItem key={item.nationalId} value={item.nationalId}>
                          {item.memberName}
                        </MenuItem>
                      )
                    })}
                  </Select>
                  ) : (
                      <Skeleton variant='rectangular' width={250} height={55} />
                    )}
                </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
                <TextField fullWidth type='number' label='หนี้ธนาคาร' {...register('bank')} />
            </Grid>
            <Grid item xs={12} md={2}>
                <TextField fullWidth type='number' label='หนี้กยศ.' {...register('studentLoan')} />
            </Grid>
            <Grid item xs={12} md={2}>
                <TextField fullWidth type='number' label='เงินสมทบ' {...register('allowance')} />
            </Grid>
            <Grid item xs={12} md={2}>
                <TextField fullWidth type='number' label='ค่าเช่าบ้าน' {...register('houseRent')} />
            </Grid>
            <input type="hidden" value={memberName} {...register('username')}/>
            <input type="hidden" value={date} {...register('yearMonth')}/>
            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ '& > button': { m: 1 } }}></Box>
                <LoadingButton
                  type='submit'
                  color='primary'
                  onClick={handleSubmit(onSubmit)}
                  loading={loading}
                  loadingPosition='start'
                  startIcon={<SaveIcon />}
                  variant='contained'
                  size='large'
                >
                  บันทึก
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
        </Grid>
       
        <Grid item xs={12}>
            {debts.blogs.length > 0 ? (
              <Card>
              <CardHeader title={`ทะเบียนหนี้ประจำเดือน ${strDate}`} titleTypographyProps={{ variant: 'h6' }} />
              <Toaster />
        
              <Divider sx={{ margin: 0 }} />
              <CardContent>
              <Grid item xs={12} md={12} lg={12}>
                  <form noValidate autoComplete='off'>
                      <Grid container spacing={5}>
                        <Grid item xs={12}>
                          <TextField fullWidth label='ค้นหาสมาชิก' placeholder='ค้นหาสมาชิก' {...register('search', {
                            onChange: (e) => {setSearch(e.target.value)},
                            onBlur: (e) => {},
                          })} />
                        </Grid>
                      </Grid>
                  </form>
                </Grid>
                <Divider sx={{ margin: 0, mt:5 }} />  
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell align='center'>ที่</TableCell>
                        <TableCell align='center'>เดือน</TableCell>
                        <TableCell align='center'>รหัสสมาชิก</TableCell>
                        <TableCell align='center'>ชื่อลูกหนี้</TableCell>
                        <TableCell align='center'>สามัญ</TableCell>
                        <TableCell align='center'>ฉุกเฉิน</TableCell>
                        <TableCell align='center'>หนี้ธนาคาร</TableCell>
                        <TableCell align='center'>หนี้กยศ</TableCell>
                        <TableCell align='center'>ค่าเช่าบ้าน</TableCell>
                        <TableCell align='center'>เงินสมทบ</TableCell>
                        <TableCell align='center'>รวมทั้งหมด</TableCell>
                        <TableCell align='center'>จัดการ</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {debts.blogs.filter((row)=>{
                        return search.toLowerCase() === '' ? row : row.memberName.toLowerCase().includes(search);
                      }).slice(pg * rpg, pg * rpg + rpg).map(row => (
                        <TableRow key={row.debtId}>
                          <TableCell align='center' component='th' scope='row'>{i++} </TableCell>
                          <TableCell align='center'> {strShortDate}</TableCell>
                          <TableCell align='center'>{row.nationalId}</TableCell>
                          <TableCell align='left'>{row.memberName}</TableCell>
                          {/* <TableCell align='center'>{row.bank ?? row.bank.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</TableCell> */}
                          <TableCell align='center'>{row.debt1 ?? 0}</TableCell>
                          <TableCell align='center'>{row.debt2 ?? 0}</TableCell>
                          <TableCell align='center'>{row.bank}</TableCell>
                          <TableCell align='center'>{row.studentLoan}</TableCell>
                          <TableCell align='center'>{row.allowance}</TableCell>
                          <TableCell align='center'>{row.houseRent}</TableCell>
                          <TableCell align='center' color='danger'>{(row.houseRent + row.bank + row.studentLoan +row.allowance+ row.debt1+row.debt2)}</TableCell>
                          <TableCell align='center'>
                            {/* <Link href={`debt/${row.debtId}`} color='success'> */}
                            {row.debtId ? (
                              <Button type='button' variant='outlined' onClick={() => deleteDebt(row.debtId)}>
                                ลบ
                              </Button>
                              ) : ''}
                            {/* </Link> */}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 20, 50]}
                  component="div"
                  count={debts.blogs.length}
                  rowsPerPage={rpg}
                  page={pg}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </CardContent>
            </Card>
              ) : (
                <Typography variant='h4'>
                  <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
                </Typography>
              )}
        </Grid>
        
    </Grid>
  )
}

export default FormLayouts
