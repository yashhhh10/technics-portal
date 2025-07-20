const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/users');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const user = await User.findOne({ email: 'admin@example.com' });
    if (user) {
      console.log('✅ User found in DB:', user);
    } else {
      console.log('❌ User NOT found in DB');
    }
    mongoose.disconnect();
  })
  .catch(err => console.error('DB Error:', err));
