// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import FileDocumentMultipleOutline from 'mdi-material-ui/FileDocumentMultipleOutline'
import BarcodeScan from 'mdi-material-ui/BarcodeScan'
import ChartLine from 'mdi-material-ui/ChartLine'
import Profile from 'mdi-material-ui/FaceManProfile'
import { Account, ChartAreaspline, Clock, ClockAlert, ClockCheck, DownloadBox } from 'mdi-material-ui'
import UserIcon from 'src/layouts/components/UserIcon'
import { ListAlt, ListAltRounded } from '@mui/icons-material'

const navigation = () => {
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null
  const memberName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null
  const memberRoleName = typeof window !== 'undefined' ? localStorage.getItem('memberRoleName') : null
  const userRoleId = typeof window !== 'undefined' ? localStorage.getItem('userRoleId') : null

  return [
    {
      sectionTitle: 'เมนูหลัก'
    },
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'เจ้าหน้าที่',
      icon: Account,
      path: '/staff'
    },
    {
      title: 'ข้อมูลลงเวลางาน',
      icon: ClockCheck,
      path: '/attendance'
    },
    {
      title: 'ดาว์นโหลด',
      icon: DownloadBox,
      path: 'https://portal.bachohospital.org/public/download'
    },

    // {
    //   title: 'ข้อมูลลาปฏิบัติงาน',
    //   icon: ListAltRounded,
    //   path: '/leave'
    // },
    {
      sectionTitle: 'รายงานรายเดือน'
    },
    {
      title: 'ลงเวลาปฏิบัติงาน',
      icon: Clock,
      path: '/reports/monthly/attendance'
    },
    {
      sectionTitle: 'รายงานรายปี'
    },
    {
      title: 'สรุปลาปฏิบัติงาน',
      icon: ChartAreaspline,
      path: '/leaves'
    }
  ]
}

export default navigation
