// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/firstTimersDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// MongoDB Schema and Model
const formSchema = new mongoose.Schema({
  name: String,
  gender: String,
  occupation: String,
  contactAddress: String,
  telephone: String,
  email: String,
  bornAgain: String,
  hearAboutChurch: String,
  others: String,
  age: String,
  remarks: String
});

const FormData = mongoose.model('FormData', formSchema);

// API Endpoints

// Receive form data and save to MongoDB
app.post('/submit', async (req, res) => {
  try {
    const newForm = new FormData(req.body);
    await newForm.save();
    res.status(200).send({ message: 'Data saved successfully!' });
  } catch (error) {
    res.status(500).send({ message: 'Error saving data', error });
  }
});

// Fetch all form data and return as JSON
app.get('/data', async (req, res) => {
  try {
    const data = await FormData.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching data', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
