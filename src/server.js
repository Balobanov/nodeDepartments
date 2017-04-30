const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bodyParser = require('body-parser');
const Schema = mongoose.Schema;

// Create our app
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    if (req.headers['x-forwarded-proto'] === 'https') {
        res.redirect('http://' + req.hostname + req.url);
    } else {
        next();
    }
});

mongoose.connect('mongodb://localhost:27017/departmentsApp');


var departmentSchema = Schema({
    name: String,
    _employees: [{type: Schema.Types.ObjectId, ref: 'Employee'}]
});

var employeeSchema = Schema({
    name: String
});

var Department = mongoose.model('Department', departmentSchema);
var Employee = mongoose.model('Employee', employeeSchema);


// Create Department
//new Department({name:"One"}).save().then(dep=>{console.log('New Department:', dep)});

//Find Department
// Department.findOne({name:"One"}).then(dep=>{
//     console.log('Found department ',dep);
// });

//Save Employee to Department
// new Employee({name:"Denis"})
//     .save()
//     .then(empl=>{
//         Department.findOne({name: "One"}).then(dep => {
//             dep._employees.push(empl._id);
//             dep.save();
//         });
//     });

// Department
//     .findOne({ name: 'One' })
//     .populate('_employees')
//     .exec((err, department) => {
//         if (err) return handleError(err);
//         console.log('Department is: ', department._employees[0]);
//     });



// Departments routs
router.get("/departments", (req, res) => {
    Department
        .find({})
        .then(dep => {
            res.status(200).json(dep);
        })
        .catch(() => {
            res.sendStatus(400);
        });
});

router.post("/departments", (req, res) => {
    new Department({name: req.body.name})
        .save()
        .then(dep => {
            res.status(200).json(dep);
        })
        .catch(() => {
            res.sendStatus(400);
        });
});

router.put("/departments", (req, res) => {
    Department.findOne({name: req.body.name})
        .then(dep => {
            if (dep) {
                dep.name = req.body.name || dep.name;
                dep.save()
                    .then(() => {
                        res.sendStatus(200);
                    });
            } else {
                new Department({name: req.body.name})
                    .save()
                    .then(()=>{res.sendStatus(200)})
                    .catch(()=>{res.sendStatus(400)});
            }
        })
        .catch(() => {
            res.sendStatus(400);
        });
});

router.delete("/departments", (req, res) => {
    Department
        .remove({name: req.body.name})
        .then(() => {
            res.sendStatus(200);
        })
        .catch(() => {
            res.sendStatus(400);
        });
});

app.use('/', router);

app.use(express.static('public'));

app.listen(PORT, function () {
    console.log('Express server is up on port ' + PORT);
});