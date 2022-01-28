var sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
      console.error(err.message);
      throw err
    }
    console.log('Connected to the Tasks Database');
  });


  const sql="CREATE TABLE task(taskName text, assignedContact  text, priority text, taskId integer PRIMARY KEY, meetingId integer, startDate text, endDate text, notes text, completed text)";
  db.run(sql, (err) => {
    if (err) {
        // Table already created 
        console.log('Task Table already created.');
    }else{
      console.log('TaskTable created.');
      // First time Table created, insert some rows
      console.log('First time Task Table created, creating some rows.'); 
      var insert = 'INSERT INTO task(taskName, assignedContact, priority, startDate, endDate, notes) VALUES(?,?,?,?,?,?)';

   {/*}   db.run(insert, ["Plan Kick Off Call ", "Adam", "High", "01/02/2022", "11/02/2022", "Book in call with Mosu and James"] );*/}
   
    }
  });


  const sql2="CREATE TABLE meeting(meetingId integer PRIMARY KEY, attendees text, location text, meetingDate text, meetingTime text, minutes text)";
  db.run(sql2, (err) => {
    if (err) {
        // Table already created 
        console.log('Meeting table already created.');
    }else{
      console.log('Meeting table created.');
      // First time Table created, insert some rows
      console.log('First time Meeting Table created, creating some rows.'); 
      var insert = 'INSERT INTO meeting(attendees, location, meetingDate, meetingTime, minutes) VALUES(?,?,?,?,?)';
      {/*db.run(insert, ["James ALONE", "University", "01/01/2021", "09:00", "Temp notes"] );
    db.run(insert, ["James, Mosu, Adam", "Remote", "01/01/2022", "09:00", "Temp notes"] );*/}
   
    }
  });


  module.exports = db;