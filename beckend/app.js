const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const router = require("./routes/router");

require("dotenv").config();
require("./db/conn");
// middleware
const corsOptions = {
    //  origin: "https://my-app-frontend-2vea.onrender.com"
    origin: "http://localhost:3000"
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors(corsOptions));
app.use('/uploads', express.static('uploads'));
app.use(router);
// connect MongoDB
// mongoose.connect(process.env.MONGODB_URI).then(() => {
    const PORT = process.env.PORT || 8000
    app.listen(PORT, () => {
        console.log(`App is Listening on PORT ${PORT}`);
    })
// }).catch(err => {
//     console.log(err);
// });


// route
// app.get("/", (req, res) => {
//     res.status(201).json({message: "Connected to Backend!"});
// });
