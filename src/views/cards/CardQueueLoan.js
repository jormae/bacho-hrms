import { useEffect, useState } from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Icon from '@mdi/react'
import { mdiAccount } from '@mdi/js'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'
import Link from 'next/link'
import { CardActionArea } from '@mui/material';

const CardQueueLoan = () => {
  const [totalQueueLoan, setTotalQueueLoan] = useState(0)

  const fetchTotalQueueLoan = async () => {
    let uri = apiConfig.baseURL + `/dashboard/totalQueueLoan`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      console.log(data[0].totalQueueLoan)
      setTotalQueueLoan(data[0].totalQueueLoan)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTotalQueueLoan()
  }, [])
  return (
    <Link href="/loan-request" color='success'>
    <CardActionArea>
    <Card sx={{ pt: 5 }}>
      <CardContent sx={{ pt: theme => `${theme.spacing(1)} !important` }}>
        <Grid container spacing={[5, 0]}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 70,
                  height: 70,
                  boxShadow: 3,
                  color: 'common.white',
                  backgroundColor: `warning.main`
                }}
              >
                <Icon path={mdiAccount} title='User Profile' size={2} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: 30 }}>
                <Typography variant='h6' sx={{ width: 300 }}>
                  รายการขอกู้สวัสดิการ
                </Typography>
                <Typography variant='h6' sx={{ width: 300 }}>{totalQueueLoan ?? 0} รายการ</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    </CardActionArea>
    </Link>
  )
}

export default CardQueueLoan
