import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function About(){
    return (
        <Box
                
                sx={{
                py: 10,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                    ? theme.palette.grey[200]
                    : theme.palette.grey[800],
                }}
            >
                <Container maxWidth="sm" sx={{ml:8}}>
                <Typography variant="h1" sx={{color:'#067196',display: { xs: 'none', md: 'flex' },fontWeight:'400'}}>
                    ABOUT US
                </Typography>
                </Container>
                <Container maxWidth="sm" sx={{ml:5}}>
                <Typography variant="h3" sx={{color:'#067196',display: { xs: 'flex', md: 'none' },fontWeight:'400'}}>
                    ABOUT US
                </Typography>
                </Container>
            </Box>
    )
}