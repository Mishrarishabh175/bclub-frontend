import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import config from "../../config/config";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  const [subscribe,setSubscribe] = useState({
    name:"",
    email:"",
    times: 0
  })
  const handleSubscribeEmail = (e)=>{
    console.log(subscribe)
    setSubscribe((prev)=>{
      return {
      ...prev,
      email:e.target.value
    }
  })
  }
  const handleSubscribeName = (e)=>{
    console.log(subscribe)
    setSubscribe((prev)=>{
      return {
      ...prev,
      name:e.target.value
    }
  })
}
  const handleSubscribe = (e)=>{
    e.preventDefault()
    if(subscribe.times===0 && subscribe.email.includes("@"))
    {
      axios.post(config.base_url+"subscribe/",{
          email:subscribe.email,
          name:subscribe.name,
          date: new Date()
      },{withCredentials:true})
      .then((res)=>{
        console.log(res.data)
        setSubscribe((prev)=>{
          return {name:"",email:"",times:prev.times+1}
        })
      })
      .catch((error)=>{
          console.log(error)
      })
    }
    
    
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '80vh',
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Container component="form" maxWidth="sm" sx={{backgroundColor:"#067196",py:8,px:8}}>
          <Typography 
          variant="h4" 
          component="h1" 
          sx=
          {{
            fontWeight:'500',
            textAlign:"center",
            color:'white',
            // px:2,
            borderBottom: "2px solid white"
          }} 
            gutterBottom
          >
            Subscribe
          </Typography>
          
          <Typography variant="h5" component="h2" sx={{fontWeight:'400',textAlign:"center",color:'white'}} gutterBottom>
            {'Subscribe our newsletter to stay updated'}
          </Typography>
          <TextField onChange={handleSubscribeName} value={subscribe.name} id="filled-basic" margin="normal" fullWidth={true} size='small' sx={{backgroundColor:'white'}} type="text" color='primary' label="Enter full name" variant="filled" />
          <TextField onChange={handleSubscribeEmail} value={subscribe.email} id="filled-basic" margin="normal" fullWidth={true} size='small' sx={{backgroundColor:'white'}} type="email" color='primary' label="Enter a valid email address" variant="filled" />
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubscribe}
            >
              Subscribe
            </Button>
        </Container>
        
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            My sticky footer can be found here.
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}