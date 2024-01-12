// ** MUI Imports
import React, { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import AvatarGroup from '@mui/material/AvatarGroup'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import SaveIcon from '@material-ui/icons/Save'
import LoadingButton from '@mui/lab/LoadingButton'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'
import Divider from '@mui/material/Divider'

import { StaffContext } from 'src/pages/staff/[cid]'

const CardUser = () => {
  const staffDetail = useContext(StaffContext)
  const user = typeof staffDetail !== 'undefined' ? staffDetail : ''
  const cid = staffDetail?.cid
  const avatar = staffDetail?.avatar
  const staffName = staffDetail?.staffName
  const positionName = staffDetail?.positionName
  const mainDeptName = staffDetail?.mainDeptName
  console.log('card user = ' + staffDetail.fname)

  const [loading, setLoading] = React.useState(false)

  return (
    <Card sx={{ position: 'relative' }}>
      <Toaster />

      <CardMedia sx={{ height: '12.625rem' }} image='/images/cards/background-user.png' />
      <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar
          alt='Robert Meyer'
          src={`data:image/png;base64,${avatar}`}
          style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center' }}
          sx={{
            width: 120,
            height: 120,
            top: '8.28125rem',
            position: 'absolute',
            border: theme => `0.25rem solid ${theme.palette.common.white}`
          }}
        />
      </Box>
      <CardContent>
        <Box
          sx={{
            mt: 5.75,
            mb: 8.75,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignContent: 'center'
          }}
        >
          <Box
            sx={{
              mt: 5,
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography
              variant='h6'
              align='center'
              sx={{ color: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {staffName}
            </Typography>
            <Divider />
            <Typography align='right' sx={{ color: 'primary.main' }}>
              {positionName}
            </Typography>
            <Typography align='right' sx={{ color: 'primary.main' }}>
              {mainDeptName}
            </Typography>
          </Box>
        </Box>
        {/* <Box
          sx={{
            mt: 5.75,
            mb: 8.75,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Link href={`../../investment-form/${user?.cid}`} color='primary'>
            <Button variant='outlined'>ฝาก-ถอนหุ้น</Button>
          </Link>
          <Link href={`../../loan-form/${user?.cid}`} color='primary'>
            <Button variant='outlined'>ใบคำร้อง</Button>
          </Link>
        </Box> */}
      </CardContent>
    </Card>
  )
}

export default CardUser
