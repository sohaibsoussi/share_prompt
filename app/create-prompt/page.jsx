"use client"

import React from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'

const CreatePrompt = () => {
  const router = useRouter()
  const {data:session} = useSession()
  //just a way to have data of the session you considerate it as [session]=useSession()
  //this was the old version but now we use const {data:session} = useSession()

  const [submitting, setSubmitting] = useState(false)

  const [post, setPost] = useState({
    prompt:'',
    tag:''
  })
  
  const createPrompt = async (e) =>{
    e.preventDefault()
    setSubmitting(true)

    try{
      const res = await fetch("/api/prompt/new",{
        method:'POST',
        body:JSON.stringify({
          prompt: post.prompt,
          userId:session?.user.id,
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
        type='Create' 
        post={post} 
        setPost={setPost} 
        submitting={submitting}
        handleSubmit = {createPrompt}
      />
    </div>
  )
}

export default CreatePrompt
