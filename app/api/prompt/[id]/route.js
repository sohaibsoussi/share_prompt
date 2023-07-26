import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
//GET (read)
export const GET = async(req,{params}) =>{
    try{
        await connectToDB()
        const prompt = await Prompt.findById(params.id).populate('creator')
        if(!prompt) return new Response('Prompt not found',{status:404})
        return new Response(JSON.stringify(prompt),{status:200})

    }catch(err){
        return new Response('Failed to fetch all prompts',{status:500})
    }
}
//PATCH (update)
export const PATCH = async(req,{params})=>{
    const {prompt, tag} = await req.json()
    try{
        await connectToDB()
        const existingPrompt = await Prompt.findById(params.id)
        if(!existingPrompt){
            return new Response('cannot find the prompt',{status:404})
        }
        existingPrompt.prompt = prompt
        existingPrompt.tag = tag
        await existingPrompt.save()

        return new Response("Successfully updated the prompt",{status:202})
    }catch(err){
        return new Response("Error during the update",{status:500})
    }
}
//DELETE (delete)
export const DELETE = async(req, {params})=>{
    try{
        
        await connectToDB()
   
        await Prompt.findByIdAndDelete(params.id)
    
        return new Response("prompt has been deleted successfully",{status:200})

    }catch(err){
        console.log("error deleting prompt")
        return new Response("error deleting prompt",{status:500})
    }
}