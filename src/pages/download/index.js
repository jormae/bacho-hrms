import toast, { Toaster } from 'react-hot-toast'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import { useEffect, useState, createContext } from 'react'
import { useForm } from 'react-hook-form'
import apiConfig from 'src/configs/apiConfig'
import Error401 from '../401'
import Error404 from '../404'
import Error500 from '../500'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { Box,Card,CardHeader, Button, Divider, CardContent, Grid, List, ListItem, ListItemAvatar, ListItemText, ListItemButton, Typography,IconButton, Avatar } from '@mui/material/'
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material';
import Link from 'next/link'
import Cookies from 'js-cookie'
import verifyToken from 'src/middlewares/authorization'

export const DataContext = createContext()

export const CardContext = createContext()

const FormLayouts = () => {

  const [err, setError] = useState()
  const [staff, setStaff] = useState({ blogs: [] })
  const userRoleId = typeof window !== 'undefined' ? localStorage.getItem('userRoleId') : null
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null





  useEffect(() => {

  }, []) // eslint-disable-line react-hooks/exhaustive-deps



        return (
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    {/* <SkeletonLeaveReportLoading /> */}
                    <Box sx={{ width: '100%' }}>
                      <Grid container wrap='nowrap'>
                          <Grid item xs={12} md={12} lg={12}>
                          <Card>
                            <CardHeader title='ทะเบียนเจ้าหน้าที่ทั้งหมด' titleTypographyProps={{ variant: 'h6' }} />
                            <Link href={`staff/add`} color='success' passHref>
                              <Button variant='contained' sx={{float:'right', mr:'20px', mt:'-50px'}}>เพิ่มเจ้าหน้าที่</Button>
                            </Link>
                            <Divider sx={{ margin: 0 }} />
                            <CardContent>
                              <Grid item xs={12} md={12} lg={12}>
                                <form noValidate autoComplete='off'>
                                  <Grid container spacing={5}>
                                    <Grid item xs={12}>
                                      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                                        Avatar with text and icon
                                      </Typography>
                                        <List >
                                            <ListItem
                                              secondaryAction={
                                                <IconButton edge="end" aria-label="delete">
                                                  <DeleteIcon />
                                                </IconButton>
                                              }
                                            >
                                            </ListItem>,
                                        </List>
                                    </Grid>
                                  </Grid>
                                </form>
                              </Grid>
                              <Divider sx={{ margin: 0, mt: 5 }} />

                            </CardContent>
                          </Card>
                          </Grid>
                      </Grid>
                  </Box>
                </Grid>
            </Grid>
            
        )

}

export default FormLayouts
