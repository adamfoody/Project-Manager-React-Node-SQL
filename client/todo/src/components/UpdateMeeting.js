import React, {useState} from 'react';
import axios from 'axios';
import {
  FormControl,
  TextField,
  makeStyles,
  FormLabel,
  Grid,
  Button,
  ButtonGroup,
  Box, Radio, RadioGroup, FormGroup,FormControlLabel
, Container, InputLabel, MenuItem, Select,
Icon} from '@material-ui/core';
import "../App.css"
import Swal from 'sweetalert2';
import { green, orange, yellow} from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core/styles'
import { withRouter, useHistory}  from "react-router-dom";



const GreenButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700]
      },
      color: yellow
    }
  }))(Button)

function UpdateMeeting(props){

    const {history} = props;


    //add with router-router-5.2 shit to get the back button working to 

    const [meetingId, setMeetingId] = useState('');
    const [meetingDate, setMeetingDate]  = useState('');
    const [meetingTime, setMeetingTime] = useState('');
    const [attendees, setAttendees] = useState('');
    const [minutes, setMinutes] = useState('');
    const [location, setLocation] = useState('')



  function updateMeeting(){
    const value = {
        meetingId: meetingId,
        meetingDate: meetingDate,
        meetingTime: meetingTime,
        attendees: attendees,
        minutes: minutes,
        location: location
      
    };
    axios.put(`http://localhost:8080/updatemeeting/${meetingId}`, value)
    .then( (response) => {
        // handle success
        var resData = response.data;
        let data = JSON.stringify(resData);
        Swal.fire({
          icon: 'success',
          title: 'Updated Meeting',
      
       
        })
        handleClearForm();
 
     
    });
  }

    
    const handleClearForm = () => (
      setMeetingId(''),
      setMeetingDate(''),
      setMeetingTime(''),
      setAttendees(''),
      setMinutes(''),
      setLocation('')
    );

    const handleMenuClick = (pageURL) => {
        history.push(pageURL)
    
        
  };
    


  return (<div >

  
        <Box 
    
          display="flex" 
          justifyContent="center"
          alignItems="center"
          className = "Form">

          
        <FormControl>
        
              <FormLabel style={{color:"#3f51b5"}} >
                  <h2 >
                    <strong>
                      <u>  Update Meeting </u>
                    </strong>
                  </h2>
                  </FormLabel>
              
                  
                  <FormGroup    className = "Form" >
                <TextField
               
                         className = "Form"
                      type="number"
                      placeholder="Meeting ID"
                      alignItems="center"
                      variant="outlined"
                      label="Meeting ID"
                      value={meetingId}
                      onChange={(e) => setMeetingId(e.target.value)}
                      >
                     
                      </TextField>
                      </FormGroup>



                      <FormGroup    className = "Form" >
               
                      <FormControl fullWidth>
                <FormLabel>Attendees</FormLabel>
          
                  <Select
                
                 
                    
              
              
              
                    variant="outlined"
                    value={attendees}
                    onChange={(e) => setAttendees(e.target.value)}
     
                    
                  >
                    <MenuItem value={"All"}>All</MenuItem>
                    <MenuItem value={"James/Mosu"}>James/Mosu</MenuItem>
                    <MenuItem value={"James/Adam"}>James/Adam</MenuItem>
                    <MenuItem value={"Mosu/Adam"}>Mosu/Adam</MenuItem>
                    <MenuItem value={"James"}>James</MenuItem>
                    <MenuItem value={"Mosu"}>Mosu</MenuItem>
                    <MenuItem value={"Adam"}>Adam</MenuItem>
                 
                  </Select>
                </FormControl>
                
                     </FormGroup>






            <FormGroup    className = "Form" >
            <FormControl fullWidth>
                <FormLabel>Location</FormLabel>
          
                  <Select
                
                 
                onChange={(e) => setLocation(e.target.value)}
              
                value={location}
              
                    variant="outlined"
     
                    
                  >
                    <MenuItem value={"Remote"}>Remote </MenuItem>
                    <MenuItem value={"University"}>University</MenuItem>
                 
                 
                  </Select>
                </FormControl>

               </FormGroup>
                 
        
                      
              <FormGroup    className = "Form" >
               
              <FormLabel>Meeting Date</FormLabel>
              <TextField
              value={meetingDate}
              onChange={(e) => setMeetingDate(e.target.value)}
             className = "Form"
                   
                 
                     type="date"
                    
               
                     variant="outlined"
                    
                    
              />
              </FormGroup>
                      
         
              <FormGroup    className = "Form" >
            <FormControl fullWidth>
                <FormLabel> Meeting Time</FormLabel>
          
                  <Select
                
                 
                onChange={(e) => setMeetingTime(e.target.value)}
              
                value={meetingTime}
              
                    variant="outlined"
     
                    
                  >
                    <MenuItem value={"09:00"}>09:00 </MenuItem>
                    <MenuItem value={"10:00"}>10:00 </MenuItem>
                    <MenuItem value={"11:00"}>11:00 </MenuItem>
                    <MenuItem value={"12:00"}>12:00 </MenuItem>
                    <MenuItem value={"13:00"}>13:00 </MenuItem>
                    <MenuItem value={"14:00"}>14:00 </MenuItem>
                    <MenuItem value={"15:00"}>15:00 </MenuItem>
                    <MenuItem value={"16:00"}>16:00 </MenuItem>
                    <MenuItem value={"17:00"}>17:00 </MenuItem>
                    <MenuItem value={"18:00"}>18:00 </MenuItem>
                    <MenuItem value={"19:00"}>19:00 </MenuItem>
                    <MenuItem value={"20:00"}>20:00 </MenuItem>
                    <MenuItem value={"21:00"}>21:00 </MenuItem>
                    <MenuItem value={"22:00"}>22:00 </MenuItem>
                    <MenuItem value={"23:00"}>23:00 </MenuItem>
                    <MenuItem value={"24:00"}>24:00 </MenuItem>

                    
                 
                 
                  </Select>
                </FormControl>

               </FormGroup>

            <FormGroup    className = "Form" >
            <TextField 
            className = "Form"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
            
                 type="number"
                 placeholder="Minutes"
                 label="Minutes"

                  multiline
                rows={7}
           
                
         
                 variant="outlined"
                
              
     />
     </FormGroup>
           

           
 
         <Grid >
               <ButtonGroup variant="outlined"    className = "Form" >
               <Button
                 color="primary"
                 variant="contained"
                 className="smallButton"
                 onClick={()=>handleMenuClick('/meetingForm')}
                 
                
               
              
              
               >
                 New Treatment  &#128229;
               </Button>
        
 
               <Button
                 color="secondary"
                 variant="contained"
                 className="smallButton"
                onClick={handleClearForm}
              
                
                 
               >
                 Clear Form &#10006;
               </Button>
              
 
               <GreenButton
              variant='contained'
               color='secondary'
               onClick={updateMeeting}
         
         
         
              
               >Update Meeting &#128233;</GreenButton>
 

 
 
          </ButtonGroup>
          </Grid>
        
       
     </FormControl>
 
     
 
         </Box>


  </div>);
};

export default withRouter(UpdateMeeting);
