import "../App.css";
import React , {useState, useEffect} from "react"
import axios from 'axios';
import {Grid, TableContainer, Button, Table, Paper, TableHead, TableRow, TableCell, TableBody, makeStyles, ButtonGroup} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import { green, yellow} from '@material-ui/core/colors'
import Swal from 'sweetalert2';

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


  


export default function Tasks() {
    const classes = useStyles();

    function fetchTasks() {
        axios.get('http://localhost:8080/tasks').then((response) => {
          // handle success
          setTasks(response.data);
        });
      }


  function Complete(taskId1) {
   
    var dateVariable = Date().toLocaleString();

    const value = {
      completed: dateVariable
  };
    axios
      .put(`http://localhost:8080/completing/${taskId1}`, value)
      .then((response) => {
        // handle success
        Swal.fire({
          icon: 'success',
          title: "Completed Task on...",
          text: dateVariable
        
         
        })
      });

      
  }


    const [tasks, setTasks] = useState([]);
    const [displayTasks, setDisplayTasks] = useState(true);

    useEffect(() => {
        fetchTasks();
      }, []);


  return(

    <div className="patientTable">
    <main className="text-align-center">


  

        <TableContainer component={Paper} className={classes.tableContainer}>
            

            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table" variant="outlined" >
    


      
          <TableRow >
      
            <TableCell

            
            ><strong> Task Name</strong>  <ButtonGroup className="refreshButton"> 

<GreenButton
      variant='contained'
       color='secondary'
       size="small"
       onClick={fetchTasks}
   
       >Refresh</GreenButton>

  </ButtonGroup></TableCell>
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
          {tasks.map((row) => (
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

           
               
                <TableCell align="right"> 
              <Grid container justifyContent="flex-end">
                <Button
                 size="small"
                  className="smallButton"
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                  Complete(row.taskId);
                  }}
               
                >
                
                 Complete
                </Button>
                </Grid>

                </TableCell>

                
            </TableRow>
          ))}
        </TableBody>
      </Table>
  




            </TableContainer>


        


    </main>

   
    </div>
  ) 
  

  
}
