const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');
const userRoute = require("./routes/userRoute")
const replicateRouter = require("./routes/replicateRouter")
const app = express();
app.use(cors());
require('dotenv').config()
app.use(bodyParser.json());
const PORT = process.env.PORT || 8000;
require("./db/db")

app.use('/api/auth', userRoute);
app.use('/api/replicate', replicateRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });