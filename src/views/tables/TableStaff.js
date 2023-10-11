// ** MUI Imports
import React, { useContext, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from "@mui/material/TablePagination"
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import TextField  from "@mui/material/TextField";
import Chip from '@mui/material/Chip';

import { DataContext } from 'src/pages/staff'

const TableStaff = (props) => {

  const staff = useContext(DataContext)

  const { register } = useForm();
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

  return (
    <Card>
      <CardHeader title='ทะเบียนเจ้าหน้าที่ทั้งหมด' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <Grid item xs={12} md={12} lg={12}>
          <form noValidate autoComplete='off'>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField fullWidth label='ค้นหาเจ้าหน้าที่' placeholder='ค้นหาเจ้าหน้าที่' {...register('search', {
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
                <TableCell align='center'>เลขประชาชน</TableCell>
                <TableCell align='center'>ชื่อ-สกุล</TableCell>
                <TableCell align='center'>ตำแหน่ง</TableCell>
                <TableCell align='center'>งาน</TableCell>
                <TableCell align='center'>กลุ่มงาน</TableCell>
                <TableCell align='center'>ประเภท</TableCell>
                <TableCell align='center'>จัดการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            { staff.blogs.filter((row)=>{
                return search.toLowerCase() === '' ? row : row.staffName.toLowerCase().includes(search);
              }).slice(pg * rpg, pg *
                rpg + rpg).map(row => (
                <TableRow key={row.cid} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align='center'  component='th' scope='row'>{i++}</TableCell>
                  <TableCell align='center'>
                  {row.cid}
                  </TableCell>
                  <TableCell >{row.staffName}</TableCell>
                  <TableCell >{row.positionName}</TableCell>
                  <TableCell >{row.deptName}</TableCell>
                  <TableCell>{row.mainDeptName}</TableCell>
                  <TableCell>{row.workStatusId == 1 ? 'ทำงาน' : 'ไม่ทำงาน'}</TableCell>
                  <TableCell align='center'>
                    <Link href={`staff/${row.cid}`} color='success'>
                      <Button type='button' variant='outlined'>
                        รายละเอียด
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={staff.blogs.length}
          rowsPerPage={rpg}
          page={pg}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
       
      </CardContent>
    </Card>
  )
}

export default TableStaff
