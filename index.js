require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const user = require('./backend/routes/UserRoutes');
const task = require('./backend/routes/TaskRoutes');
const list = require('./backend/routes/ListRoutes');

//port for the server to listen
const PORT = process.env.PORT || 4500;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//backend routes:
app.use('/users', user);

app.use('/tasks', task);

app.use('/lists', list);

//ensures that server will only run in the main file
if(require.main === module)
{
  //runs the server
  app.listen(PORT, () => console.log(`Server is now running at ${PORT}`));
}

//DB Connection 
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once('open', () => console.log('MongoDB Connection Success!'));

module.exports = { app };