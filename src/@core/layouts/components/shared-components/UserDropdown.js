// ** React Imports
import { useState, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import CogOutline from 'mdi-material-ui/CogOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState(null)

  // ** Hooks
  const router = useRouter()

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = url => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const handleDropdownCloseAndLogout = url => {
    localStorage.removeItem('token');
    localStorage.removeItem('memberRoleId');
    localStorage.removeItem('memberRoleName');
    localStorage.removeItem('memberName');
    localStorage.removeItem('username');

    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  }

  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null
  const memberName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null
  const memberRoleName = typeof window !== 'undefined' ? localStorage.getItem('memberRoleName') : null
  const memberRoleId = typeof window !== 'undefined' ? localStorage.getItem('memberRoleId') : null

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar
          alt='John Doe'
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src='/images/avatars/1.png'
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar alt='John Doe' src='/images/avatars/1.png' sx={{ width: '2.5rem', height: '2.5rem' }} />
            </Badge>
            <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{memberName}</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {memberRoleName}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose(`/`)}>
          <Box sx={styles}>
            <HomeOutline sx={{ marginRight: 2 }} />
            Dashboard
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose(`/member/${username}`)}>
          <Box sx={styles}>
            <AccountOutline sx={{ marginRight: 2 }} />
            ข้อมูลของฉัน
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/loan-form')}>
          <Box sx={styles}>
            <EmailOutline sx={{ marginRight: 2 }} />
            คำร้องขอสวัสดิการ
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose(`/investment-form/${username}`)}>
          <Box sx={styles}>
            <EmailOutline sx={{ marginRight: 2 }} />
            คำร้องฝากถอน-หุ้น
          </Box>
        </MenuItem>
        {memberRoleId != 4 ? (
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose(`/gold`)}>
            <Box sx={styles}>
              <EmailOutline sx={{ marginRight: 2 }} />
              รายการทอง
            </Box>
          </MenuItem>
          ) : ''}
           {memberRoleId != 4 ? (
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose(`/allowance`)}>
            <Box sx={styles}>
              <EmailOutline sx={{ marginRight: 2 }} />
              รายการเงินสมทบ
            </Box>
          </MenuItem>
           ) : ''}
           {memberRoleId != 4 ? (
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose(`/zakat`)}>
            <Box sx={styles}>
              <EmailOutline sx={{ marginRight: 2 }} />
              รายการซากาต
            </Box>
          </MenuItem>
           ) : ''}
           {memberRoleId != 4 ? (
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose(`/debt`)}>
            <Box sx={styles}>
              <EmailOutline sx={{ marginRight: 2 }} />
              รายการหนี้รายเดือน
            </Box>
          </MenuItem>
           ) : ''}
          {memberRoleId != 4 ? (
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose(`/reports/monthly/welfare-payment`)}>
            <Box sx={styles}>
              <EmailOutline sx={{ marginRight: 2 }} />
              รายงานสวัสดิการรายเดือน
            </Box>
          </MenuItem>
           ) : ''}
          {memberRoleId != 4 ? (
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose(`/reports/yearly/summary`)}>
            <Box sx={styles}>
              <EmailOutline sx={{ marginRight: 2 }} />
              รายงานสรุปสวัสดิการรายปี
            </Box>
          </MenuItem>
         ) : ''}
        
        {/* <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <MessageOutline sx={{ marginRight: 2 }} />
            Chat
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <CogOutline sx={{ marginRight: 2 }} />
            Settings
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <CurrencyUsd sx={{ marginRight: 2 }} />
            Pricing
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <HelpCircleOutline sx={{ marginRight: 2 }} />
            FAQ
          </Box>
        </MenuItem> */}
        <Divider />
        <MenuItem sx={{ py: 2 }} onClick={() => handleDropdownCloseAndLogout('/pages/login')}>
          <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Logout
        </MenuItem>
        {/* <MenuItem sx={{ py: 2 }} onClickCapture={logout}>
          <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Logout
        </MenuItem> */}
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
