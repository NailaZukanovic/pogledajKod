const mongoose = require('mongoose');

const eventSchema = mongoose.Schema(
    {
        _id : mongoose.Schema.Types.ObjectId,
        title: { type: String, required: true},
        start: { type: Date, required: true},
        end: {type: Date, required: true}
    }
)

module.exports = mongoose.model('Event', eventSchema);
