import  express from "express";
import cookieParser from "cookie-parser";
import cors from  'cors';
import mysql from 'mysql';
import  jwt  from "jsonwebtoken";

let app =express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin:["http://localhost:3000"],
        methods:["POST","PUT","DELETE","GET"],
        credentials:true
    }
));
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'task',
    port:3306 
})
conn.connect((err)=>{
if(err)
console.log("database not connected")
else
console.log("database connected")
})
app.post('/signup',(req,res)=>{

let data=[req.body.name,req.body.lastname, req.body.email, req.body.password, req.body.gender, req.body.hobbies,req.body.dept_name, req.body.category, req.body.location, req.body.salary]
let sqlQuery="INSERT INTO task5_login (`name`,`lastname`,`email`,`password`,`gender`,`hobbies`,`dept_name`,`category`,`location`,`salary`) Values(?)"
conn.query(sqlQuery,[data],(err,result)=>{
if(err){
    return res.json({Status: err.sqlMessage})
}else
return res.json({Status:"Success"})
})
})
//////ADMIN COUNT METHOD///////
app.get('/adminCount', (req, res) => {
    const sql = "Select count(id) as admin from admin";
    conn.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})
/////Employee Count method////
app.get('/employeeCount', (req, res) => {
    const sql = "Select count(id) as employee from task5_login";
    conn.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})
/////Manager login/////
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM admin Where email = ? AND  password = ?";
    conn.query(sql, [req.body.email, req.body.password], (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in runnig query"});
        if(result.length > 0) {
            const id = result[0].id;
            const token = jwt.sign({role: "admin"}, "jwt-secret-key", {expiresIn: '1d'});
            res.cookie('token', token);
            return res.json({Status: "Success"})
        } else {
            return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    })
})
///verify user////

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Error: "You are no Authenticated"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) return res.json({Error: "Token wrong"});
            req.role = decoded.role;
            req.id = decoded.id;
            next();
        } )
    }
}


//////Dashboard/////
app.get('/dashboard',verifyUser, (req, res) => {
    return res.json({Status: "Success", role: req.role, id: req.id})
})
////getemployee///
app.get('/getEmployee', (req, res) => {
    const sql = "SELECT * FROM task5_login";
    conn.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get employee error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})
///update employee////
app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE task5_login set dept_name = ? WHERE id = ?";
    conn.query(sql, [req.body.dept_name, id], (err, result) => {
        if(err) return res.json({Error: "update employee error in sql"});
        return res.json({Status: "Success"})
    })
})
////delete employee///
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "Delete FROM task5_login WHERE id = ?";
    conn.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "delete employee error in sql"});
        return res.json({Status: "Success"})
    })
})

/////logout////
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
})
////////empgetit//////
app.get('/ItDeptEmployee',(req,res)=>{
    const sql = "select * from task5_login where dept_name='IT' AND Location like('A%')";
    conn.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get employee error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})
/////////////sales emp///////
app.get('/salesDeptEmployee',(req,res)=>{
    const sql = "select * from task5_login where dept_name='Sales' order by name asc";
    conn.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get employee error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})
////employeeLogin////

app.post('/employeelogin', (req, res) => {
    const sql = "SELECT * FROM task5_login Where email = ?";
    conn.query(sql, [req.body.email], (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in runnig query"});
        if(result.length > 0) {
     
                if(err) return res.json({Error: "password error"});
                else{
                    const token = jwt.sign({role: "employee", id: result[0].id}, "jwt-secret-key", {expiresIn: '1d'});
                    res.cookie('token', token);
                    return res.json({Status: "Success", id: result[0].id})
                } 

     
        } else {
            return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    })
})
//////
app.get('/getdetailEmp/:id',(req,res)=>{
   
    const id = req.params.id
    const sql = `SELECT * FROM task5_login where id = ${id}`;
    conn.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get employee error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})


app.listen(5000,()=>{
    console.log("server is running on port 5000 :)")
})












// import express from 'express'
// import mysql from 'mysql'
// import cors from 'cors'
// import cookieParser from 'cookie-parser'
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// import multer from 'multer'
// import path from 'path'

// const app = express();
// app.use(cors(
//     {
//         origin: ["http://localhost:3000"],
//         methods: ["POST", "GET", "PUT","DELETE"],
//         credentials: true
//     }
// ));

// app.use(express.json());
// app.use(express.static('public'));

// const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "task"
// })

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'images/')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
//     }
// })

// const upload = multer({
//     storage: storage
// })

// con.connect(function(err) {
//     if(err) {
//         console.log("Error in Connection");
//     } else {
//         console.log("Connected");
//     }
// })



// app.get('/get/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = "SELECT * FROM employee where id = ?";
//     con.query(sql, [id], (err, result) => {
//         if(err) return res.json({Error: "Get employee error in sql"});
//         return res.json({Status: "Success", Result: result})
//     })
// })












// app.get('/salary', (req, res) => {
//     const sql = "Select sum(salary) as sumOfSalary from employee";
//     con.query(sql, (err, result) => {
//         if(err) return res.json({Error: "Error in runnig query"});
//         return res.json(result);
//     })
// })

// app.post('/create',upload.single('image'), (req, res) => {
//     const sql = "INSERT INTO employee (`name`,`email`,`password`, `address`, `salary`,`image`) VALUES (?)";
//     bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
//         if(err) return res.json({Error: "Error in hashing password"});
//         const values = [
//             req.body.name,
//             req.body.email,
//             hash,
//             req.body.address,
//             req.body.salary,
//             req.file.filename
//         ]
//         con.query(sql, [values], (err, result) => {
//             if(err) return res.json({Error: "Inside singup query"});
//             res.send(result);
//             return res.json({Status: "Success"});
//         })
//     } )
// })

// app.listen(5000, ()=> {
//     console.log("Running..:(");
// })