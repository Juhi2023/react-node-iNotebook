const connectToMongo = require('./connection/db');
const express = require('express');
const path = require('path')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth')
const notesRoutes = require('./routes/note')
const cors = require('cors')

dotenv.config({path: './config.env'})

connectToMongo(process.env.MONGO_URI);
const port = process.env.PORT || 5000;

const app = express()
app.use(express.json());
app.use(cors())


app.use('/', authRoutes)
app.use('/', notesRoutes)

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
 });
}
app.listen(port, ()=>{
    console.log(`iNoteBook backend Listening at port ${port}`)
})
