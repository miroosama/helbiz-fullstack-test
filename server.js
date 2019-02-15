const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors');

const transfers = require('./routes/api/transfer')

const app = express();
app.use(cors());
app.options('*', cors())
//Bodyparser middleware
app.use(bodyParser.json());

//db config

const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log("mongodb connected..."))
  .catch(err => console.log(err))

//use routes
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
})

app.use('/api/transfers', transfers)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
