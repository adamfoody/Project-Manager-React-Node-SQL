import "../App.css";
import React , {useState, useEffect} from "react"
import axios from 'axios';
import {Grid, TableContainer, Button, Table, Paper, TableHead, TableRow, TableCell, TableBody, makeStyles, ButtonGroup} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import { green, yellow} from '@material-ui/core/colors'
import Swal from 'sweetalert2';
import DoNotDisturbTwoToneIcon from '@mui/icons-material/DoNotDisturbTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';

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

  const useStyles = makeStyles((theme) => ({
    tableHead: {
        borderBottomStyle: "solid",
        borderBottomColor: "blue"
    },
    stickyHeader:{
      
    }
}));






export default function Meetings() {


    const [meetings, setMeetings] = useState([]);
    const [tasksByMeetingId, setTasksByMeetingId] = useState([]);
    const [displayTasksForMeeting, setDisplayTasksForMeeting] = useState(false);

    function fetchMeetings() {
        axios.get('http://localhost:8080/meetings').then((response) => {
          // handle success
          setMeetings(response.data);
        });
      }

      function fetchTasksById(meetingId1) {
        axios
          .get(`http://localhost:8080/tasksbymeetingId/${meetingId1}`)
          .then((response) => {
            // handle success
            setTasksByMeetingId(response.data);
            setDisplayTasksForMeeting(true);
            Swal.fire({
              icon: 'info',
              title: 'Scroll down for Tasks',
           
            })
            
            
           
          });
      }

      const closeTasks = () => {
        setDisplayTasksForMeeting(false);


      }
  
      useEffect(() => {
        fetchMeetings();
      }, []);
  
      const classes = useStyles();
  
      


  return (


    <div>
       <main className="text-align-center">


  

<TableContainer component={Paper} className={classes.tableContainer}>
    

    <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table" variant="outlined" >




  <TableRow >

    <TableCell><strong> Meeting ID</strong>  <ButtonGroup className="refreshButton"> 
<GreenButton
variant='contained'
color='secondary'
size="small"
onClick={fetchMeetings}

>Refresh</GreenButton>

</ButtonGroup></TableCell>
    <TableCell align="right"> <strong> Attendees </strong> </TableCell>
    <TableCell align="right"> <strong> Location</strong> </TableCell>
    <TableCell align="right"> <strong> Meeting Date</strong> </TableCell>
    <TableCell align="right"><strong> Meeting Time </strong></TableCell>
    <TableCell align="right"><strong> Minutes </strong></TableCell>
    <TableCell align="right"><strong> Complete </strong> </TableCell>
    <TableCell align="right"><strong> View Tasks </strong> </TableCell>
 
  </TableRow>

<TableBody>
  {meetings.map((row) => (
    <TableRow
      key={row.meetingId}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {row.meetingId}
      </TableCell>
      <TableCell align="right">{row.attendees}</TableCell>
      <TableCell align="right">{row.location}</TableCell>
      <TableCell align="right">{row.meetingDate}</TableCell>
      <TableCell align="right">{row.meetingTime}</TableCell>
      <TableCell align="right">{row.minutes}</TableCell>
      

   
       
        <TableCell align="right"> 
      <Grid container justifyContent="flex-end">
        <Button
         size="small"
          className="smallButton"
          color="primary"
          variant="contained"
            
        >
        
         Complete
        </Button>
        </Grid>

        </TableCell>
        <TableCell align="right"> 
      <Grid container justifyContent="flex-end">
        <GreenButton
        variant='contained'
color='secondary'
size="small"
onClick={() => {
                    fetchTasksById(row.meetingId);
                  }}
        >
        
         View Tasks
        </GreenButton>
        </Grid>

        </TableCell>

        
    </TableRow>
  ))}
</TableBody>
</Table>





    </TableContainer>





</main>

{displayTasksForMeeting == true && (

    

    <TableContainer component={Paper} className={classes.tableContainer}>
            

            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table" variant="outlined" >
            
            <TableHead >
<TableCell
        style={{
            borderBottom: "2px solid #3f51b5", borderTop: "2px solid #3f51b5"
            
            
        }}


    >   
          <Button
            align="right"
          color="secondary"
          variant="contained"
          align-self="right"
          size='small'
          onClick={closeTasks}
       
        >
         
        
       Close Tasks: {tasksByMeetingId.taskId}
        </Button>
   
    </TableCell>

    </TableHead>


      
          <TableRow >
      
            <TableCell

            
            ><strong> Task Name</strong>  </TableCell>
            <TableCell align="right"> <strong> Task ID</strong> </TableCell>
            <TableCell align="right"> <strong> Assigned Contact </strong> </TableCell>
            <TableCell align="right"> <strong> Meeting ID </strong> </TableCell>
            <TableCell align="right"><strong> Priority </strong></TableCell>
    
            <TableCell align="right"><strong> Start Date </strong></TableCell>
            <TableCell align="right"><strong> End Date </strong></TableCell>
            <TableCell align="right"><strong> Notes </strong> </TableCell>
            <TableCell align="right"><strong> Complete </strong> </TableCell>
         
          </TableRow>
    
        <TableBody>
          {tasksByMeetingId.map((row) => (
            <TableRow
              key={row.taskId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.taskName}
              </TableCell>
              <TableCell align="right">{row.taskId}</TableCell>
              <TableCell align="right">{row.assignedContact}</TableCell>
              <TableCell align="right">{row.meetingId}</TableCell>
              <TableCell align="right">{row.priority}</TableCell>
              <TableCell align="right">{row.startDate}</TableCell>
              <TableCell align="right">{row.endDate}</TableCell>
              <TableCell align="right">{row.notes}</TableCell>

           
        
               {row.completed === null && ( <TableCell align="right"> 
               <DoNotDisturbTwoToneIcon/>

        </TableCell>
)}
                   
        {row.completed !== null && ( <TableCell align="right"> 

            <CheckCircleTwoToneIcon/>
            

        </TableCell>
)}
               
                
            </TableRow>
          ))}
        </TableBody>
      </Table>
  




            </TableContainer>



)}





    </div>
  );
}
