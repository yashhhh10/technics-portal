const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema({
    holidayName : {type: String, required :true},
    holidayDate: {type: Date, required :true}
});

module.exports = mongoose.model('Holiday',holidaySchema);
