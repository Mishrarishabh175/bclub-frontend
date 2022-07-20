import React from 'react'
//import {Navbar,Container,Form,FormControl } from 'react-bootstrap'
import { useNavigate} from "react-router-dom"
import logo from "../../images/bclub-logo.jpg"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
    });
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
}
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));


const pages = ['Home', 'Presidents', 'Event','About us'];
const links = ['/', '/president', '/event','/about'];

export default function  Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const navigate = useNavigate();
  const handleCloseNavMenu = (link) => {
    navigate(link)
    setAnchorElNav(null);
  };

  const handleSearchEnter = (e)=>{
      if(e.key==="Enter")
      {
        console.log(e.target.value);
        navigate("/search/"+e.target.value)

      }
 
  }

  return (
    <HideOnScroll>
        <AppBar position="static" sx={{backgroundColor:"#067196"}}>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <img
              src={logo}
              alt="Bclub"
              loading="lazy"
              style={{
                width:"60px",
                marginRight:"20px"
              }}
            />

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                >
                <MenuIcon />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
                >
                {pages.map((page,i) => (
                    <MenuItem key={page} onClick={()=>handleCloseNavMenu(links[i])}>
                    <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page,i) => (
                <Button
                    key={page}
                    onClick={()=>handleCloseNavMenu(links[i])}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {page}
                </Button>
                ))}
            </Box>
            <Search>
                <SearchIconWrapper>
                <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onKeyDown={handleSearchEnter}
                />
            </Search>
            </Toolbar>
        </Container>
        </AppBar>
    </HideOnScroll>
  );
}


// export default function UserNavbar(){
//     const handleSearchSubmit=()=>{
//         console.log("searched")
//     }
//     const handleSearch = (e)=>{
//         console.log(e.target.value)
//     }
//     return(
//         <header >
//             <Navbar bg="light" expand="lg">
//                 <Container fluid>
//                     <Navbar.Brand href="#">Business Club</Navbar.Brand>
//                     <Navbar.Toggle aria-controls="navbarScroll" />
//                     <Navbar.Collapse id="navbarScroll">

//                     <ul className="navbar-nav mr-auto">
//                         <li className="nav-item active">
//                             <Link className="nav-link" to="/">Home</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/president">President</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/event">Events</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/about">about us</Link>
//                         </li>
//                     </ul>
//                     <div style={{marginLeft:"auto"}}>
//                         <Form className="d-flex"  >
//                             <FormControl
//                             type="search"
//                             placeholder="Search"
//                             className="me-2"
//                             aria-label="Search"
//                             onChange={handleSearch}
//                             />
//                             <img src={searchIcon} onClick={handleSearchSubmit} style={{cursor:"pointer"}} className="ml-2" alt="search icon"></img>
//                         </Form>
//                     </div>
                   
//                     </Navbar.Collapse>
//                 </Container>
//             </Navbar>
//         </header>
//     )
// }