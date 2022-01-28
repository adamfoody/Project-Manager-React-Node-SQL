import React, {useState, useEffect} from 'react'
import axios from "axios"
import {
Button,
    Link,
    Grid,
  Typography, Pape, Box, Paper, TextField
   
 } from '@material-ui/core';
 import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
 import "../App.css"
 import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
 import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
 import PriorityHighTwoToneIcon from '@mui/icons-material/PriorityHighTwoTone';
 import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
 import LocalHospitalTwoToneIcon from '@mui/icons-material/LocalHospitalTwoTone';
 import SavedSearchTwoToneIcon from '@mui/icons-material/SavedSearchTwoTone';
 import ReceiptLongTwoToneIcon from '@mui/icons-material/ReceiptLongTwoTone';
 import { Clock } from "./Clock";
 import { DateToday } from "./DateToday";
 

function Dashboard() {

  const [openTasks, setOpenTasks] = useState('');

  const [closedTasks, setClosedTasks] = useState('');

  const [nextMeeting, setNextMeeting] = useState('');

  function fetchOpenTasks(){
    axios.get('http://localhost:8080/opentasks').then((response) => {
      setOpenTasks(response.data)

    });

  }

  function fetchClosedTasks(){
    axios.get('http://localhost:8080/closedtasks').then((response) => {
      setClosedTasks(response.data)

    });

  }

  function fetchNextMeeting(){
    axios.get('http://localhost:8080/meetingsnew').then((response) => {
      setNextMeeting(response.data)

    });

  }
  useEffect(() => {
    fetchOpenTasks()
    fetchClosedTasks()
    fetchNextMeeting()
 
  }, []);


    
   

   
 
    return (
      <div align="center" className='HomePage'>
       
<Box sx={{ width: '100%' }}>
     <Grid  item xs={12} md={4} container spacing={3} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3}}>
     <Grid item xs={6} className="hpGrid2">
       
         <Paper
            sx={{
             p: 2,
             display: 'flex',
            flexDirection: 'column',
            height: 240,
            margin: 5,
            }}
            >

        <Typography component="p" variant="h5">  Date </Typography>
  

        <Typography component="p" variant="h5" style={{  color:"red" }}>
        <DateToday/>
  
     
        </Typography>
            <div>
                <CalendarTodayTwoToneIcon
                style={{ fontSize: 50, color:"#3f51b5" }} />
            </div>
        </Paper>

            </Grid>
            <Grid item xs={6}className="hpGrid2">
            <Paper
            sx={{
             p: 2,
             display: 'flex',
            flexDirection: 'column',
            height: 240,
            margin: 5,
            }}
            >

        <Typography component="p" variant="h5">  Time</Typography>
        <Typography component="p" variant="h5" style={{  color:"red" }}>
            <Clock/>
        </Typography>
            <div>
            <AccessTimeTwoToneIcon
                style={{ fontSize: 50, color:"#3f51b5" }} />
            </div>
        </Paper>
       
       </Grid>
       <Grid item xs={6} className="hpGrid2">
       
       <Paper
          sx={{
           p: 2,
           display: 'flex',
          flexDirection: 'column',
          height: 240,
          margin: 5,
          }}
          >

      <Typography component="p" variant="h5">  Open Tasks </Typography>
      <Typography component="p" variant="h5" style={{  color:"red" }}>
          {openTasks}
      </Typography>
          <div>
              <PeopleAltIcon
              style={{ fontSize: 50, color:"#3f51b5" }} />
          </div>
     
  
      </Paper>

          </Grid>
          <Grid item xs={6}className="hpGrid2">
          <Paper
          sx={{
           p: 2,
           display: 'flex',
          flexDirection: 'column',
          height: 240,
          margin: 5,
          }}
          >

      <Typography component="p" variant="h5">  Week </Typography>
      <Typography component="p" variant="h5" style={{  color:"red" }}>
1
      </Typography>
          <div>
              <LocalHospitalTwoToneIcon
              style={{ fontSize: 50, color:"#3f51b5" }} />
          </div>
     
      </Paper>
     
     </Grid>
       <Grid item xs={6}className="hpGrid2">
            <Paper
            sx={{
             p: 2,
             display: 'flex',
            flexDirection: 'column',
            height: 240,
            margin: 5,
            }}
            >

        <Typography component="p" variant="h5">  Completed Meeting </Typography>
        <Typography component="p" variant="h5" style={{  color:"red" }}>
            0
        </Typography>
            <div>
            <CheckBoxTwoToneIcon
       style={{ fontSize: 50, color:"#3f51b5" }} />
               
            </div>
        </Paper>
       
       </Grid>
       <Grid item xs={6}className="hpGrid2">
            <Paper
            sx={{
             p: 2,
             display: 'flex',
            flexDirection: 'column',
            height: 240,
            margin: 5,
            }}
            >
      <Typography component="p" variant="h5" style={{  color:"red" }}>
       
     
      </Typography>
     
        <Typography component="p" variant="h5"> Upcoming Meeting </Typography>
        <Typography component="p" variant="h5" style={{  color:"red" }} >
     {nextMeeting}
        </Typography>
            <div>
                <ReceiptLongTwoToneIcon
                style={{ fontSize: 50, color:"#3f51b5" }} />
            </div>
        </Paper>
       
       </Grid>
       <Grid item xs={6}className="hpGrid2">

       <Paper
            sx={{
             p: 2,
             display: 'flex',
            flexDirection: 'column',
            height: 240,
            margin: 5,
            }}
            >
                 <Typography component="p" variant="h5">  Overdue Tasks </Typography>
      <Typography component="p" variant="h5" style={{  color:"red" }}>
   
       0
     
      </Typography>
          <div>
              <PriorityHighTwoToneIcon
              style={{ fontSize: 50, color:"#3f51b5" }} />
          </div>
          </Paper>
       </Grid>
       <Grid item xs={6}className="hpGrid2">

<Paper
     sx={{
      p: 2,
      display: 'flex',
     flexDirection: 'column',
     height: 240,
     margin: 5,
     }}
     >
          <Typography component="p" variant="h5">  Completed Tasks </Typography>
<Typography component="p" variant="h5" style={{  color:"red" }}>

     {closedTasks}
</Typography>
   <div>
       <CheckBoxTwoToneIcon
       style={{ fontSize: 50, color:"#3f51b5" }} />
   </div>
   </Paper>
</Grid>

       


    </Grid>
 


    
 
</Box>

       
        </div>
    )
}

export default Dashboard;