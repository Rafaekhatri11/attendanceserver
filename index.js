const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
var nodemailer = require('nodemailer')
const ejs = require("ejs");


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res)=>{
    res.send("Hello World");
})

app.set('view engine', 'ejs')


// var student = [
//    {
//         date : "dfsd",
//         present: true,
//         absent: false ,
//         late: false
//    }
// ]
app.post('/exportTabel', (req,res ) => {
    // console.log(req.body)
     let body = JSON.parse(req.body);
    let student = body.student;
    var transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth:{
            user: "safetoschoolsfb@gmail.com",
            pass : "Sts$202020"
        }
    });
    res.render("table", {student}, (err, data) => {
        if(err){
            console.log(err)
        }
         res.send(data)
       
            let mailOptions = {
                from: 'safetoschoolsfb@gmail.com', // sender address
                to: body.email, // list of receivers
                subject: "Student Alert", // Subject line
                text: "This is the eamil from safetoschools", // plain text body
                html: data // html body
            }
            let info = transporter.sendMail(mailOptions).then( (err, res) => {
                console.log(res, "iuoeiwruoiw");
            }).catch((errr) => {
                console.log(errr);
            })
        
        
    })
   
    // let people = ['geddy', 'neil', 'alex'],
    // html = res.render('<%= people.join(", "); %>', {people: people});
    // res.render("table", {name: student})
});

app.post('/emailapi', (req,res) =>{
    console.log(req.body)
    var transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth:{
            user: "safetoschoolsfb@gmail.com",
            pass : "Sts$2020"
        }

        
    });
   
    
        let data = req.body;
        data.map((text,index) => {
            console.log (text)
            if(text.absent === true){
                console.log("absent");

                let mailOptions = {
                    from: 'safetoschoolsfb@gmail.com', // sender address
                    to: text.email, // list of receivers
                    subject: "Student Alert", // Subject line
                    text: "This is the eamil from safetoschools", // plain text body
                    html: `<b>This is inform you that ${text.name} is absent today </b>` // html body
                }
                let info = transporter.sendMail(mailOptions).then( (err, res) => {
                    console.log(res, "iuoeiwruoiw");
                }).catch((errr) => {
                    console.log(errr);
                })
            }
            else if(text.late === true){
                console.log("late");
                let mailOptions = {
                    from: 'safetoschoolsfb@gmail.com', // sender address
                    to: text.email, // list of receivers
                    subject: "Student Alert", // Subject line
                    text: "This is the eamil from safetoschools", // plain text body
                    html: `<b>This is inform you that ${text.firstname +" " +text.lastname} will late today </b>` // html body
                }
                let info = transporter.sendMail(mailOptions).then( (err, res) => {
                    console.log(res, "iuoeiwruoiw");
                }).catch((errr) => {
                    console.log(errr);
                })
            
            }
        })
        
})
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})