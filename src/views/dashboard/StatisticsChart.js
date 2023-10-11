import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Icon from '@mdi/react'
import { mdiAccount } from '@mdi/js'
import { mdiFileSend } from '@mdi/js'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import axios from 'axios'
import moment from 'moment'
import apiConfig from 'src/configs/apiConfig'

const StatisticChart = () => {
  const [chartStats, setChartStats] = useState()
  let totalChart = chartStats?.totalChart
  let totalSummary = chartStats?.totalSummary
  let totalReturnSummary = chartStats?.totalReturnSummary
  let totalReaudit = chartStats?.totalReaudit
  let totalReturnAudit = chartStats?.totalReturnAudit
  let totalSubmitEclaim = chartStats?.totalSubmitEclaim
  let totalReturnEclaim = chartStats?.totalReturnEclaim
  let totalStock = chartStats?.totalStock

  // const date = '2022-10'
  const date = moment().subtract(1, 'months').endOf('month').format('YYYY-MM')
  const fetchStatChart = async () => {
    let uri = apiConfig.baseURL + `/dashboard/chart-status/${date}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setChartStats(data[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchStatChart()
  }, [setChartStats])

  return (
    <Card>
      <CardHeader title='Report Chart Status :: สถานะชาร์ต' />
      <CardContent sx={{ pt: theme => `${theme.spacing(1)} !important` }}>
        <Grid container spacing={[5, 0]}>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  boxShadow: 3,
                  color: 'common.white',
                  backgroundColor: `primary.main`
                }}
              >
                <Icon path={mdiFileSend} title='User Profile' size={1} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='caption'>ชาร์ตทั้งหมด</Typography>
                <Typography variant='h6'>{totalChart}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  boxShadow: 3,
                  color: 'common.white',
                  backgroundColor: `primary.main`
                }}
              >
                <Icon path={mdiFileSend} title='User Profile' size={1} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='caption'>ส่งสรุปชาร์ต</Typography>
                <Typography variant='h6'>{totalSummary}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  boxShadow: 3,
                  color: 'common.white',
                  backgroundColor: `primary.main`
                }}
              >
                <Icon path={mdiFileSend} title='User Profile' size={1} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='caption'>รับคืนชาร์ต</Typography>
                <Typography variant='h6'>{totalReturnSummary}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  boxShadow: 3,
                  color: 'common.white',
                  backgroundColor: `primary.main`
                }}
              >
                <Icon path={mdiFileSend} title='User Profile' size={1} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='caption'>รับคืนออร์ดิตชาร์ต</Typography>
                <Typography variant='h6'>{totalReturnAudit}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={[5, 0]}>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  boxShadow: 3,
                  color: 'common.white',
                  backgroundColor: `success.main`
                }}
              >
                <Icon path={mdiFileSend} title='User Profile' size={1} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='caption'>รีออร์ดิตชาร์ต</Typography>
                <Typography variant='h6'>{totalReaudit}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  boxShadow: 3,
                  color: 'common.white',
                  backgroundColor: `success.main`
                }}
              >
                <Icon path={mdiFileSend} title='User Profile' size={1} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='caption'>ส่งชาร์ตงาน e-claim</Typography>
                <Typography variant='h6'>{totalSubmitEclaim}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  boxShadow: 3,
                  color: 'common.white',
                  backgroundColor: `success.main`
                }}
              >
                <Icon path={mdiFileSend} title='User Profile' size={1} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='caption'>รับคืนจากงาน e-claim</Typography>
                <Typography variant='h6'>{totalReturnEclaim}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  boxShadow: 3,
                  color: 'common.white',
                  backgroundColor: `success.main`
                }}
              >
                <Icon path={mdiFileSend} title='User Profile' size={1} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='caption'>เก็บเข้าคลัง</Typography>
                <Typography variant='h6'>{totalStock}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticChart
