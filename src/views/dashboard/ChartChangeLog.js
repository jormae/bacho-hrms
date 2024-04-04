import { useEffect, useState, createContext } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'
import moment from 'moment'
import { CheckCircle } from 'mdi-material-ui'

const data = [
  {
    sales: '894k',
    trendDir: 'up',
    subtitle: 'USA',
    title: '$8,656k',
    avatarText: 'US',
    trendNumber: '25.8%',
    avatarColor: 'success',
    trend: <ChevronUp sx={{ color: 'success.main', fontWeight: 600 }} />
  },
  {
    sales: '645k',
    subtitle: 'UK',
    trendDir: 'down',
    title: '$2,415k',
    avatarText: 'UK',
    trendNumber: '6.2%',
    avatarColor: 'error',
    trend: <ChevronDown sx={{ color: 'error.main', fontWeight: 600 }} />
  },
  {
    sales: '148k',
    title: '$865k',
    trendDir: 'up',
    avatarText: 'IN',
    subtitle: 'India',
    trendNumber: '12.4%',
    avatarColor: 'warning',
    trend: <ChevronUp sx={{ color: 'success.main', fontWeight: 600 }} />
  },
  {
    sales: '86k',
    title: '$745k',
    trendDir: 'down',
    avatarText: 'JA',
    subtitle: 'Japan',
    trendNumber: '11.9%',
    avatarColor: 'secondary',
    trend: <ChevronDown sx={{ color: 'error.main', fontWeight: 600 }} />
  },
  {
    sales: '42k',
    title: '$45k',
    trendDir: 'up',
    avatarText: 'KO',
    subtitle: 'Korea',
    trendNumber: '16.2%',
    avatarColor: 'error',
    trend: <ChevronUp sx={{ color: 'success.main', fontWeight: 600 }} />
  }
]

const ChartChangeLogs = () => {
  const [chartLogs, setChartChangeLogs] = useState({ blogs: [] })
  const date = moment().format('YYYY-MM')

  const fetchChartLogs = async () => {
    let uri = apiConfig.baseURL + `/dashboard/chart-log/${date}`
    console.log(uri)

    try {
      const { data } = await axios.get(uri)
      setChartChangeLogs({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchChartLogs()
  }, [])

  return (
    <Card>
      <CardHeader
        title='สถิติแก้ไขชาร์ตประจำเดือน'
        titleTypographyProps={{ sx: { lineHeight: '1.2 !important', letterSpacing: '0.31px !important' } }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
        {chartLogs.blogs.map((item, index) => {
          return (
            <Box
              key={item.action}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ...(index !== chartLogs.length - 1 ? { mb: 5.875 } : {})
              }}
            >
              <CheckCircle
                sx={{
                  width: 26,
                  height: 26,
                  marginRight: 3,
                  fontSize: '1rem',
                  color: 'common.white',
                  float: 'left',
                  backgroundColor: 'info.main',
                  borderRadius: 50
                }}
              />

              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='caption' sx={{ lineHeight: 1.5 }}>
                    {item.action}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', textAlign: 'end', flexDirection: 'column' }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.72, letterSpacing: '0.22px' }}>
                    {item.totalRecord}
                  </Typography>
                  <Typography variant='caption' sx={{ lineHeight: 1.5 }}>
                    รายการ
                  </Typography>
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default ChartChangeLogs
