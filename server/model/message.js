import mongoose from 'mongoose'

const MessageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
        maxLength: 300,
        trim: true,
    },
    seen: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
})

const Message = mongoose.model("Message", MessageSchema);

export default Message