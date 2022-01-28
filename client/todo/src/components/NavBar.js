import * as React from 'react';
import MenuIcon from "@material-ui/icons/Menu";
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, Box, Toolbar, Typography, IconButton, 
MenuItem, Menu, withWidth, Button}from '@material-ui/core';
import { withRouter, useHistory}  from "react-router-dom";



const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        
        
    },
    menuBotton: {
        marginRight: theme.spacing(2)

    }, 
 
    title: {
        flexGrow: 1
    },

}))
const NavBar = props => {

    const {history} = props;
    const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

 

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
        history.push(pageURL)
        setAnchorEl(null);
        
  };




  return (
      <div className={classes.root}>
    
    <Box sx={{ flexGrow: 1 }}>
   
    <AppBar position="static"  >
      <Toolbar>
     
        <Typography   sx={{ flexGrow: 1 }} className={classes.title}>
        </Typography>
       
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} className={classes.title}>
         <u> <strong> Group Research Project </strong> </u>    
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
         <strong>Options </strong> 
          </Typography>
      
          <div>
          <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          className={classes.menuBotton}
          sx={{ mr: 2 }}
          onClick={handleMenu}
        >
          <MenuIcon />
        </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={()=>setAnchorEl(null)}
              className={classes.menuBotton}
            >



               <>
              <MenuItem onClick={()=>handleMenuClick('/')}>Dashboard</MenuItem>
              <MenuItem onClick={()=>handleMenuClick('/form')}>New Task</MenuItem>
              <MenuItem onClick={()=>handleMenuClick('/tasks')}> Open Tasks</MenuItem>
              <MenuItem onClick={()=>handleMenuClick('/complete')}> Completed Tasks </MenuItem>
              <MenuItem onClick={()=>handleMenuClick('/meetingForm')}> New Meeting </MenuItem>
              <MenuItem onClick={()=>handleMenuClick('/meetings')}> View Meetings </MenuItem>
          
              </>


            </Menu>
         
          </div>
        
      </Toolbar>
    </AppBar>
  </Box>
  </div>
  );
}

export default withRouter(NavBar);