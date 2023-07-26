"use client"

import React from 'react'
import { useState,useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@components/Form'

const EditPrompt = () => {
  const router = useRouter()
  //just a way to have data of the session you considerate it as [session]=useSession()
  //this was the old version but now we use const {data:session} = useSession()
 
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')
  //to get the id from the pushed router 

  const [submitting, setSubmitting] = useState(false)

  const [post, setPost] = useState({
    prompt:'',
    tag:''
  })
  
  useEffect(()=>{
    const getPromptDetails = async()=>{
        const res = await fetch(`/api/prompt/${promptId}`)
        const data = await res.json()
        setPost({
            prompt:data.prompt,
            tag:data.tag
        })
    }
    if(promptId) getPromptDetails()
  },[promptId])

  const updatePrompt = async (e) =>{
    e.preventDefault()
    setSubmitting(true)
    if(!promptId) return alert("no prompt id is found")

    try{
      const res = await fetch(`/api/prompt/${promptId}`,{
        method:'PATCH',
        body:JSON.stringify({
          prompt: post.prompt,
          //userId:session?.user.id,cuz we know who made it
          tag:post.tag,
        })
      })
      if(res.ok){
        router.push('/')
        //to comeback to homepage
      }
    }catch(err){
      console.log(err)
    }finally{
      setSubmitting(false)
    }

  }

  return (
    <div>
      <Form 
        type='Update' 
        post={post} 
        setPost={setPost} 
        submitting={submitting}
        handleSubmit = {updatePrompt}
      />
    </div>
  )
}

export default EditPrompt
