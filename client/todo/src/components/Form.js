import React, {useState, useEffect} from 'react';
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

function Form (props){

  const {history} = props;

    const [taskName, setTaskName] = useState('');
    const [assignedContact, setAssignedContact] = useState('');
    const [priority, setPriority] = useState('');
    const [meetingId, setMeetingId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [notes, setNotes] = useState('')
    const [meeting, setMeeting] = useState([]);



  function createTask() {
    const value = {
        taskName: taskName,
        assignedContact: assignedContact,
        priority: priority,
        startDate: startDate,
        endDate: endDate,
        notes: notes,
        meetingId: meetingId
    };

    axios.post('http://localhost:8080/createtask', value).then((response) => {
      // handle success
      var resData = response.data;
      Swal.fire({
        icon: 'success',
        title: 'New Task Saved!',
     
      })
      handleClearTaskForm();
    });
  }


  const handleMenuClick = (pageURL) => {
    history.push(pageURL)

    
};


    
    const handleClearTaskForm = () => (
       setTaskName(''),
       setAssignedContact(''),
       setPriority(''),
       setMeetingId(''),
       setStartDate(''),
       setEndDate(''),
       setNotes('')

    );

    function fetchMeeting() {
      axios.get('http://localhost:8080/meetings').then((response) => {
        // handle success
        setMeeting(response.data);
      });
    }

    useEffect(() => {
      fetchMeeting();
    }, []);


    


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
                      <u>  Create Task </u>
                    </strong>
                  </h2>
                  </FormLabel>
              
                  
                  <FormGroup    className = "Form" >
                <TextField
               
                         className = "Form"
                      type="text"
                      placeholder="Task Name"
                      alignItems="center"
                      variant="outlined"
                      label="Task Name"
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                      >
                     
                      </TextField>
                      </FormGroup>



                      <FormGroup    className = "Form" >
               
                      <FormControl fullWidth>
                <FormLabel>Assigned Contact</FormLabel>
          
                  <Select
                
                 
                    
              
              
              
                    variant="outlined"
                    value={assignedContact}
                    onChange={(e) => setAssignedContact(e.target.value)}
     
                    
                  >
                    <MenuItem value={"Mosu"}>Mosu</MenuItem>
                    <MenuItem value={"Adam"}>Adam</MenuItem>
                    <MenuItem value={"James"}>James</MenuItem>
                 
                  </Select>
                </FormControl>
                
                     </FormGroup>






            <FormGroup    className = "Form" >
            <FormControl fullWidth>
                <FormLabel>Task Priority</FormLabel>
          
                  <Select
                
                 
                onChange={(e) => setPriority(e.target.value)}
              
                value={priority}
              
                    variant="outlined"
     
                    
                  >
                    <MenuItem value={"High"}>High </MenuItem>
                    <MenuItem value={"Medium"}>Medium</MenuItem>
                    <MenuItem value={"Low"}>Low</MenuItem>
                 
                  </Select>
                </FormControl>

               </FormGroup>
                 
               <FormGroup    className = "Form" >
            <FormControl fullWidth>
                <FormLabel>Meeting ID</FormLabel>
          
                  <Select
                    on
                    onChange={(e) => setMeetingId(e.target.value)}
              
                value={meetingId}
              
           
              
                    variant="outlined"
     
                    
                  >

              {meeting.map((meeting) => 
                    <MenuItem
                   key={meeting.meetingId}
                   value={meeting.meetingId}>
                {meeting.meetingId}</MenuItem>
                    )}


                  </Select>
                </FormControl>

               </FormGroup>

                      
              <FormGroup    className = "Form" >
               
              <FormLabel>Start Date</FormLabel>
              <TextField
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
             className = "Form"
                   
                 
                     type="date"
                    
               
                     variant="outlined"
                    
                    
              />
              </FormGroup>
                      
              <FormGroup    className = "Form" >
               
 
                  
              <FormLabel>End Date</FormLabel>
              <TextField
             className = "Form"
             value={endDate}
             onChange={(e) => setEndDate(e.target.value)}
                     type="date"
                     variant="outlined"          
                    
              />
              </FormGroup>

            <FormGroup    className = "Form" >
            <TextField 
            className = "Form"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            
                 type="number"
                 placeholder="Notes"
                 label="Notes"

                  multiline
                rows={5}
           
                
         
                 variant="outlined"
                
              
     />
     </FormGroup>
           

           
 
         <Grid >
               <ButtonGroup variant="outlined"    className = "Form" >
               <Button
                 color="primary"
                 variant="contained"
                 className="smallButton"
                 onClick={createTask}
                 
                
               
              
              
               >
                 Save Task  &#128229;
               </Button>
        
 
               <Button
                 color="secondary"
                 variant="contained"
                 className="smallButton"
                 onClick = {handleClearTaskForm}
              
                
                 
               >
                 Clear Form &#10006;
               </Button>
              
 
               <GreenButton
              variant='contained'
               color='secondary'
               onClick={()=>handleMenuClick('/updateform')}
         
         
              
               >Update ToDo &#128233;</GreenButton>
 

 
 
          </ButtonGroup>
          </Grid>
        
       
     </FormControl>
 
     
 
         </Box>


  </div>);
};

export default withRouter(Form);
