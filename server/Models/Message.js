const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema({
    content: String,
    from: Object,
    to: String,
    date: String,
    time: String,
    socketid: String
})

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message