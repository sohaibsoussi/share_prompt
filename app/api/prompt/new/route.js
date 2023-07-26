import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async(req) =>{
    const {userId, prompt, tag} = await req.json()

    try{
        await connectToDB()
        const newPrompt = new Prompt({creator:userId,prompt,tag})
        await newPrompt.save()
        // this what actually save a model in the database
        return new Response(JSON.stringify(newPrompt),{status:201})
    }catch(err){
        return new Response("Failed to create a new prompt",{status:500})
    }
}