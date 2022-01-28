var express = require("express")
var cors = require('cors');
var bodyParser = require("body-parser");
var db = require("./Database.js")

var app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 8080

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

// Root endpoint
app.get("/", (req, res, next) => {
   res.json({"message":"Connected to the Tasks API"})
});

//List all tasks where complete is null

app.get("/tasks", (req, res, next) => {
    console.log("Retreiving all tasks.");
    let sql = `SELECT taskName, assignedContact, priority, taskId, meetingId, startDate, endDate, notes FROM task WHERE completed is NULL ORDER BY endDate ASC`;
    var params = []

    db.all(sql, params, (err, rows) => {

        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
      
        res.send(rows)
        
      });
});

//list all completed tasks

app.get("/completedtasks", (req, res, next) => {
    console.log("Retreiving all completed tasks.");
    let sql = `SELECT taskName, assignedContact, priority, taskId, meetingId, startDate, endDate, notes, completed FROM task WHERE completed is not NULL ORDER BY endDate ASC`;
    var params = []

    db.all(sql, params, (err, rows) => {

        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
      
        res.send(rows)
        
      });
});

//Create new todo

app.post("/createtask", (req, res, next) => {
    var errors=[]
  

    var data = {
        taskName: req.body.taskName,
        assignedContact: req.body.assignedContact,
        meetingId: req.body.meetingId,
        priority: req.body.priority,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        notes: req.body.notes

    }
    var sql ='INSERT INTO task (taskName, assignedContact, meetingId, priority, startDate, endDate, Notes ) VALUES (?,?,?,?,?,?, ?)'
    var params =[data.taskName, data.assignedContact, data.meetingId, data.priority, data.startDate, data.endDate, data.notes]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
        console.log('Task Saved :)');
    });
});


app.put("/updateTask/:taskId", (req, res, next) => {
    console.log("UPDATE Task:" + req.params.taskId);
    var data = {
        taskName: req.body.taskName,
        assignedContact: req.body.assignedContact,
        priority: req.body.priority,
        taskId: req.body.taskId,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        notes: req.body.notes
    }
    console.log("UPDATE Task, taskId =  " + data.taskId);
    db.run(
        `UPDATE task set 
           taskName = COALESCE(?,taskName), 
           assignedContact = COALESCE(?,assignedContact),
           priority = COALESCE(?,priority),
           taskId = COALESCE(?,taskId), 
           startDate = COALESCE(?,startDate),
           endDate = COALESCE(?,endDate),
           notes = COALESCE(?,notes)
             WHERE taskId = ?`,

        [data.taskName, data.assignedContact, data.priority, data.taskId, data.startDate, data.endDate, data.notes, req.params.taskId],
        function (err, response) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})

//complete task by task id

app.put("/completing/:taskId", (req, res, next) => {
    console.log("Completing Task.......:" + req.params.taskId);
    var data = {
     completed: req.body.completed
    }
    console.log("Completed on  = " + data.completed);
    db.run(
        `UPDATE task set 
           completed = COALESCE(?,completed)
             WHERE taskId = ?`,

        [data.completed, req.params.taskId],
        function (err, response) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})

//Start of meeting requests

app.get("/meetings", (req, res, next) => {
    console.log("Retreiving all meetings.");
    let sql = `SELECT * FROM meeting ORDER BY meetingId`;
    var params = []

    db.all(sql, params, (err, rows) => {

        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
      
        res.send(rows)
        
      });
});

app.post("/createmeeting", (req, res, next) => {
   {/* {var errors=[]
    if (!req.body.meetingId){
        errors.push("No ID specified");
    }

    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }*/}



    var data = {
       meetingDate: req.body.meetingDate,
       meetingTime: req.body.meetingTime,
       attendees: req.body.attendees,
       location: req.body.location,
       minutes: req.body.minutes

    }
    var sql ='INSERT INTO meeting(meetingDate, meetingTime, attendees, location, minutes ) VALUES (?,?,?,?,?)'
    var params =[ data.meetingDate, data.meetingTime, data.attendees, data.location, data.minutes]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
        console.log('Meeting Saved :)');
    });
});

app.put("/updatemeeting/:meetingId", (req, res, next) => {
    console.log("UPDATE Meeting:" + req.params.meetingId);
    var data = {
        meetingDate: req.body.meetingDate,
        meetingTime: req.body.meetingTime,
        attendees: req.body.attendees,
        location: req.body.location,
        minutes: req.body.minutes
    }

    db.run(
        `UPDATE meeting set 
           meetingDate = COALESCE(?,meetingDate),
           meetingTime = COALESCE(?,meetingTime),
           attendees = COALESCE(?,attendees), 
           location = COALESCE(?,location),
           minutes = COALESCE(?,minutes)
             WHERE meetingId = ?`,

        [ data.meetingDate, data.meetingTime, data.location, data.attendees, data.minutes, req.params.meetingId],
        function (err, response) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})


app.get("/tasksbymeetingId/:meetingId", (req, res, next) => {
    sql = "select * from task where meetingId = ?"
   var params = [req.params.meetingId]
   db.all(sql, params, (err, rows) => {
       if (err) {
         res.status(400).json({"error":err.message});
         return;
       }
       res.send(rows)
     });
});

app.get("/opentasks", (req, res, next) => {
    sql = "select count(*) AS openTasks from task where endDate is null"
   db.all(sql, (err, rows) => {
       if (err) {
         res.status(400).json({"error":err.message});
         return;
       }
       res.json(rows[0].openTasks)
     });
});

app.get("/closedtasks", (req, res, next) => {
    sql = "select count(*) AS closedtasks from task where endDate is not null"
   db.all(sql, (err, rows) => {
       if (err) {
         res.status(400).json({"error":err.message});
         return;
       }
       res.json(rows[0].closedtasks)
     });
});



app.get("/meetingsnew", (req, res, next) => {
    console.log("Retreiving all meetings.");
    let sql = `SELECT meetingDate FROM meeting ORDER BY meetingDate ASC`;
    var params = []

    db.all(sql, params, (err, rows) => {

        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
      
        res.send(rows[0].meetingDate)
        
      });
});