// ** MUI Imports
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

const CardNews = () => {
  return (
    <Card sx={{pt:5}}>
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
              <Box sx={{ display: 'flex', flexDirection: 'column', width:30 }}>
                <Typography variant='h6' sx={{width:300}}>News</Typography>
                <Typography variant='h6'>10</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        </CardContent>
    </Card>
  )
}

export default CardNews
