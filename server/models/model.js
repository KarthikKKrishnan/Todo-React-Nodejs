import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    item: {
        type: String
    },
    date: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model.todos || mongoose.model("todo", schema);
