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

function UpdateForm (props){

  const {history} = props;


    const [taskName, setTaskName] = useState('');
    const [assignedContact, setAssignedContact] = useState('');
    const [priority, setPriority] = useState('');
    const [taskId, setTaskId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [notes, setNotes] = useState('')

  function updateTask(){
    const value = {
        taskName: taskName,
        assignedContact: assignedContact,
        priority: priority,
        taskId: taskId,
        startDate: startDate,
        endDate: endDate,
        notes: notes
      
    };
    axios.put(`http://localhost:8080/updateTask/${taskId}`, value)
    .then( (response) => {
        // handle success
        var resData = response.data;
        let data = JSON.stringify(resData);
        Swal.fire({
          icon: 'success',
          title: 'Updated Task',
      
       
        })
        handleClearTaskForm();
     
    });
  }

    
    const handleClearTaskForm = () => (
       setTaskName(''),
       setAssignedContact(''),
       setPriority(''),
       setTaskId(''),
       setStartDate(''),
       setEndDate(''),
       setNotes('')

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
                      <u>  Update Task </u>
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
               
 
               <TextField
             className = "Form"
             value={taskId}
             onChange={(e) => setTaskId(e.target.value)}
                   
                     label="Task ID"
                     type="number"
                     placeholder="Task ID"
               
                     variant="outlined"
                    
                    
              />
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
                 onClick={()=>handleMenuClick('/form')}
           
                 
                
               
              
              
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
               onClick={updateTask}
         
         
              
               >Update Task &#128233;</GreenButton>
 

 
 
          </ButtonGroup>
          </Grid>
        
       
     </FormControl>
 
     
 
         </Box>


  </div>);
};

export default withRouter(UpdateForm);
