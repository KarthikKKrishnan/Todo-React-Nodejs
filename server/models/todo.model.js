import mongoose from "mongoose"

const schema = new mongoose.Schema({
    item:{
        type:String
    },
    date:{
        type:String
    }
}) 
export default mongoose.model.todos||mongoose.model("todo",schema);