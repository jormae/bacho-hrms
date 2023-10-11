import { useEffect, useState, createContext } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Icon from '@mdi/react'
import Link from 'next/link'
import { mdiAccount } from '@mdi/js'
import { CardActionArea } from '@mui/material';
import moment from 'moment'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

const CardZakats = () => {

  const [zakats, setZakats] = useState(0)
  const memberName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null
  let today = moment().format('YYYY-MM')
  console.log(zakats)

  const fetchZakats = async () => {
    let uri = apiConfig.baseURL + `/zakats/sum`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setZakats(data)
    } catch (error) {
      // console.log(error)
    }
  }

  useEffect(() => {
    fetchZakats()
  }, [])
  
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6} lg={4}>
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
                      backgroundColor: `success.main`
                    }}
                  >
                    <MonetizationOnIcon fontSize='large'/>
                  </Avatar>
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: 30 }}>
                    <Typography variant='h6' sx={{ width: 300 }}>
                      รายรับ
                    </Typography>
                        <Typography variant='h6' sx={{ width: 300 }}>{zakats[0]?.INCOME_ZAKAT?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') ?? 0} บาท</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        </CardActionArea>
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
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
                      backgroundColor: `success.main`
                    }}
                  >
                    <MonetizationOnIcon fontSize='large'/>
                  </Avatar>
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: 30 }}>
                    <Typography variant='h6' sx={{ width: 300 }}>
                      รายจ่าย
                    </Typography>
                        <Typography variant='h6' sx={{ width: 300 }}>{zakats[0]?.EXPENSE_ZAKAT?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') ?? 0} บาท</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        </CardActionArea>
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
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
                      backgroundColor: `success.main`
                    }}
                  >
                    <MonetizationOnIcon fontSize='large'/>
                  </Avatar>
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: 30 }}>
                    <Typography variant='h6' sx={{ width: 300 }}>
                      คงเหลือ
                    </Typography>
                        <Typography variant='h6' sx={{ width: 300 }}>{zakats[0]?.TOTAL_ZAKAT_BALANCE?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') ?? 0} บาท</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        </CardActionArea>
      </Grid>
    
    </Grid>

    
  )
}

export default CardZakats
