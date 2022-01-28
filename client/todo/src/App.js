import './App.css';
import Form from "./components/Form";
import NavBar from './components/NavBar';
import Dashboard from "./components/Dashboard";
import {Route, Switch} from "react-router-dom";
import { BrowserRouter, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Tasks from "./components/Tasks";
import Complete from "./components/Complete";
import MeetingForm from './components/MeetingsForm';
import UpdateMeeting from './components/UpdateMeeting';
import UpdateForm from './components/UpdateForm';
import Meetings from './components/Meetings';


function App() {
  return (
    <div className="App">
       
          <BrowserRouter>
          <NavBar/>
          <Switch>
          <Route exact path= "/" render={props=> <Dashboard {...props} />} />
          <Route exact path ="/form" 
          render={props => <Form {...props}/>}/>
                <Route exact path ="/tasks" 
          render={props => <Tasks {...props}/>}/>

          

                <Route exact path ="/complete" 
          render={props => <Complete {...props}/>}/>

          <Route exact path ="/meetingform" 
          render={props => <MeetingForm {...props}/>}/>

<Route exact path ="/updatemeeting" 
          render={props => <UpdateMeeting {...props}/>}/>

            <Route exact path ="/updateform" 
          render={props => <UpdateForm {...props}/>}/>
          
          <Route exact path ="/meetings" 
          render={props => <Meetings {...props}/>}/>
          
        
        
    

          </Switch>





          </BrowserRouter>


    </div>
  );
}

export default App;
