const express = require("express");
const app = express();
const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());


app.get('/test', (req,res)=>{
    res.send("Hello World");
})
const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})