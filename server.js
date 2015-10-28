//  Base Setup
//============
var mongoose = require('mongoose');
var express = require("express");
var session = require('express-session');
var app = express();
var bodyParser = require("body-parser");

// Body-parser config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup rendering
app.set('view engine', 'ejs');

// Database Setup
var port = process.env.PORT || 8080; //sets port
var config = require('./config');
mongoose.connect(config.database);

var Driver = require('./app/models/driver');
var Job = require('./app/models/job')

// Routes

// middleware to use for all requests
app.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// Views
app.get('/', function(req, res) {
   res.render('index.html.ejs')
});

app.get('/jobs', function(req, res) {
    console.log(Job.all)
    res.render('jobs.html.ejs');

})

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

var apiRouter = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
apiRouter.route('/').get(function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

apiRouter.route('/drivers') 

    .post(function(req, res) {
        
        var newDriver = new Driver();      // create a new instance of the driver model
        newDriver.name = req.body.name;  // set the drivers name (comes from the request)
        console.log(newDriver)
        // save the driver and check for errors
        newDriver.save(function(err) {
            console.log("Saving...")
            if (err) {
               res.send(err);
            }
                res.json({ message: 'driver created!' });
           
        });
        	console.log(res.json)
            // console.log(res)

    })

    .get(function(req, res) {
        Driver.find(function(err, drivers){
            if (err)
                return res.send(err);
            res.json(drivers);
        });
    });


apiRouter.route('/drivers/:driver_id')

    .get(function(req, res){
        Driver.findById(req.params.driver_id, function(err, driver){
            if (err)
                res.send(err);
            res.json(driver)
        });
    })

    .put(function(req, res) {
        Driver.findById(req.params.driver_id, function(err, driver){
            if (err)
                res.send(err);
            driver.name = req.body.name;

            driver.save(function(err){
                if(err)
                    res.send(err);
                res.json({ message:"Driver info successfully updated"})
            });
        });

    })

    .delete(function(req, res) {
        console.log(req.params);
        Driver.remove({
            _id: req.params.driver_id
        }, function(err, driver){
            if (err)
                res.send(err);
            res.json({message: "Driver Profile Successfully Removed"})
        })
    });


apiRouter.route('/jobs') 

    .post(function(req, res) {
        
        var newJob = new Job();      // create a new instance of the driver model
        newJob.title = req.body.title
        newJob.description = req.body.title  // set the drivers name (comes from the request)
        console.log(newJob)
        // save the driver and check for errors
        newJob.save(function(err) {
            console.log("Saving...")
            if (err) {
               res.send(err);
            }
                res.json({ message: 'Job created!' });
           
        });
            console.log(res.json)
            // console.log(res)

    })

    .get(function(req, res) {
        Job.find(function(err, jobs){
            if (err)
                return res.send(err);
            res.json(jobs);
        });
    });


apiRouter.route('/jobs/:job_id')

    .get(function(req, res){
        Job.findById(req.params.driver_id, function(err, driver){
            if (err)
                res.send(err);
            res.json(job)
        });
    })

    .put(function(req, res) {
        Job.findById(req.params.job_id, function(err, job){
            if (err)
                res.send(err);
            job.name = req.body.name;

            job.save(function(err){
                if(err)
                    res.send(err);
                res.json({ message:"Job details successfully updated"})
            });
        });

    })

    .delete(function(req, res) {
        console.log(req.params);
        Job.remove({
            _id: req.params.driver_id
        }, function(err, job){
            if (err)
                res.send(err);
            res.json({message: "Job Successfully Removed"})
        })
    });

app.use('/api', apiRouter);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);


