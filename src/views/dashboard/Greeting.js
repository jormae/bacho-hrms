// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Link from 'next/link'
import { CardActionArea } from '@mui/material';

const Greeting = () => {
  const userName = typeof window !== 'undefined' ? localStorage.getItem('username') : null
  const memberName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null
  const memberRoleName = typeof window !== 'undefined' ? localStorage.getItem('memberRoleName') : null
  const theme = useTheme()

  return (
    <Link href={`/member/${userName}`} color='success'>
    <CardActionArea>

    <Card sx={{ position: 'relative' }}>
      <CardMedia sx={{ height: '11.625rem' }} image='/images/cards/background-user.png' />
      <Box sx={{ width:'100%', display: 'flex',  flexWrap: 'wrap',flexDirection: 'column', alignItems:'center'}}>

      <Avatar
        alt='Robert Meyer'
        src='/images/avatars/1.png'
        style={{ display: 'flex',  flexWrap: 'wrap',flexDirection: 'column', alignItems:'center' }}
        sx={{
          width: 120,
          height: 120,
          top: '7.28125rem',
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
            alignContent:'center',
          }}
        >
          <Box sx={{mt:5, width:'100%', display: 'flex',  flexWrap: 'wrap',flexDirection: 'column', alignItems:'center'}}>
            <Typography variant='h6' align='center' sx={{ color: 'primary.main',display: 'flex', alignItems: 'center', justifyContent: 'center', }}>{memberName}</Typography>
            <Typography align="right" sx={{ color: 'primary.main' }}>{memberRoleName}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            mt: 5.75,
            mb: 8.75,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
        </Box>
      </CardContent>
    </Card>
    </CardActionArea>
    </Link>
  )
}

export default Greeting
