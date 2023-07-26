import {Schema, model, models} from 'mongoose'

const PromptShema = new Schema({
    creator: {
        type:Schema.Types.ObjectId,
        ref:'User'//due to one to many relationship,one user can make multiple prompts
    },
    prompt:{
        type:String,
        required:[true, 'Prompt is required!']
    },
    tag:{
        type:String,
        required:[true, 'Tag is required!']
    }
})

const Prompt = models.Prompt || model('Prompt',PromptShema)
//think of it like a way to access to your database only not saving data on it

export default Prompt