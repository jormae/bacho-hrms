// ** MUI Imports
import React, { useContext, useState,useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import {Paper,Skeleton, Box, Typography} from '@mui/material/'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TablePagination from '@mui/material/TablePagination'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Link from 'next/link'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'
import moment from 'moment'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import SaveIcon from '@material-ui/icons/Save'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import LoadingButton from '@mui/lab/LoadingButton'
import Slide from '@mui/material/Slide'
import toast, { Toaster } from 'react-hot-toast'

import { DuplicateAttendancesContext } from 'src/pages/data-correct/attendance/index'
import { Cancel, DeleteCircle, Reply } from 'mdi-material-ui'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const TableDuplicateAttendances = () => {

  // const duplicateAttendances = useContext(DuplicateAttendancesContext)
//   const router = useRouter()
// if (router.isReady) {
//   router.query.cid
//   router.query.attendanceTypeId
//   router.query.date
// }
const [err, setError] = useState()

  const [isLoading, setIsLoading] = useState(true)
  const [attendances, setAttendances] = useState({ blogs: [] })

  const [attendanceId, setAttendanceId] = useState()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  console.log(attendanceId)
  const { register } = useForm()
  const [search, setSearch] = useState('')
  const i = 1

  const [pg, setpg] = React.useState(0)
  const [rpg, setrpg] = React.useState(10)

  function handleChangePage(event, newpage) {
    setpg(newpage)
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10))
    setpg(0)
  }

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = (id) => {
    setOpen(true)
    setAttendanceId(id)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = async () => {
    setConfirmLoading(true)
    const uri = apiConfig.baseURL + `/attendances/${attendanceId}`
        fetch(uri, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setConfirmLoading(false)
            setOpen(false)
            if (data.status == 'success') {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
            fetchAttendances()
        })
        .catch(function (error) {
            console.log(JSON.stringify(error))
        })
  }

  const fetchAttendances = async () => {
    let uri = apiConfig.baseURL + `/attendances/duplicate/attendances`
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
        setIsLoading(false)
        setAttendances({ blogs: data })
       
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAttendances()
  }, [])


  const TableRowsLoader = ({ rowsNum }) => {
    return [...Array(rowsNum)].map((row, index) => (
      <TableRow key={index}>
        <TableCell component="th" scope="row">
          <Skeleton animation="wave" variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Card>
        <Toaster />
      <CardHeader title={`รายงานข้อมูลการลงเวลาทำงานซ้ำ`} titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'คุณแน่ใจ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            กรุณายืนยันการลบข้อมูลลงเวลางาน?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='secondary' onClick={handleClose} startIcon={<Cancel />}>
            ยกเลิก
          </Button>
          <Box sx={{ '& > button': { m: 1 } }}></Box>
          <LoadingButton
            color='primary'
            onClick={()=>handleDelete()}
            loading={confirmLoading}
            loadingPosition='start'
            startIcon={<DeleteCircle />}
            variant='contained'
            size='large'
            autoFocus
          >
            ตกลง
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <CardContent>
        <Grid item xs={12} md={12} lg={12}>
          <form noValidate autoComplete='off'>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='ค้นหาเจ้าหน้าที่'
                  placeholder='พิมพ์ชื่อ-สกุล'
                  {...register('search', {
                    onChange: e => {
                      setSearch(e.target.value)
                    },
                    onBlur: e => { }
                  })}
                />
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Divider sx={{ margin: 0, mt: 5 }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>ที่</TableCell>
                <TableCell align='center'>ชื่อ-สกุล</TableCell>
                <TableCell align='center'>หน่วยงาน</TableCell>
                <TableCell align='center'>เวร</TableCell>
                <TableCell align='center'>ลงเวลา</TableCell>
                <TableCell align='center'>ประเภทลงเวลางาน</TableCell>
                <TableCell align='center'>จำนวน</TableCell>
                <TableCell align='center'>จัดการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                isLoading ? (
                <TableRowsLoader rowsNum={5} />
              ) : (
                attendances.blogs
                .filter(row => {
                  return search.toLowerCase() === '' ? row : row.staffName.toLowerCase().includes(search)
                })
                .slice(pg * rpg, pg * rpg + rpg)
                .map(row => (
                  <TableRow key={row.attendanceId}>
                    <TableCell align='center' component='th' scope='row'>
                      {i++}
                    </TableCell>
                    <TableCell>{row.staffName}</TableCell>
                    <TableCell>{row.deptName}</TableCell>
                    <TableCell align='center'>
                      {row.shiftName} ({row.startShiftTime} - {row.endShiftTime})
                    </TableCell>
                    <TableCell align='center'>
                      {moment(row.attendanceDateTime).add(-7, 'hour').add(543, 'year').format('DD/MM/YYYY HH:mm')}
                    </TableCell>
                    <TableCell align='center'>{row.attendanceTypeId == 1 ? 'เข้างาน' : 'ออกงาน'}</TableCell>
                    <TableCell align='center'>{row.TOTAL_RECORD}</TableCell>
                    <TableCell align='center' color='success'>
                    <Button variant='contained' color="error" sx={{mr:2, font:'fff'}} onClick={()=>handleClickOpen(row.id)}   startIcon={<DeleteCircle style={{color:'fff'}} />}>
                    <Typography color="white">ลบ</Typography>
                      </Button>
                      <Link href={`../data-correct/attendance/${row.cid}/${row.attendanceTypeId}/${moment(row.attendanceDateTime).add(-7, 'hour').format('YYYYMMDDHHmmss')}`} color='success'>
                      <Button type='button' variant='contained'>
                        <Typography color="white">รายละเอียด</Typography>
                      </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                )))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component='div'
          count={attendances.blogs.length}
          rowsPerPage={rpg}
          page={pg}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  )
}

export default TableDuplicateAttendances
