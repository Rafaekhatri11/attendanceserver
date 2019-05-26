const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res)=>{
    res.send("Hello World");
})
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})