const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
// const loginRouter = require('./routes/login');

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// for signupadmin only;
const signupRoute = require('./routes/signupadminonly'); 
app.use('/api/signup-admin', signupRoute); 

//for login
const loginRoute = require('./routes/login');
app.use('/api/login', loginRoute);

//for announcements
const announcementRoutes = require('./routes/announcement');
app.use('/api/announcements', announcementRoutes);
console.log("Announcement Route file loaded:", announcementRoutes);

//for feedback
const feedbackRoutes =require('./routes/feedback');
app.use('/api/feedback', feedbackRoutes);

//for holidays
const holidayRoutes =require('./routes/holidays');
app.use('/api/holidays', holidayRoutes);

//for resetpass
const resetpassRoutes =require('./routes/resetpass');
app.use('/api/resetpass', resetpassRoutes);

//for forgotpass
const forgotpassRoutes =require('./routes/forgotpass');
app.use('/api/forgotpass', forgotpassRoutes);

//for helpdesk
const helpdeskRoutes =require('./routes/helpdesk');
app.use('/api/helpdesk', helpdeskRoutes);

//for discussions
const discussionRoutes =require('./routes/discussions');
app.use('/api/discussions', discussionRoutes);
console.log("Route file loaded:", discussionRoutes);


// for employee
const employeeRoutes = require("./routes/employee");
app.use('/api/employee', employeeRoutes);

app.get('/', (req, res) => {
  res.send('✅ Technics Portal API is running');
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));







