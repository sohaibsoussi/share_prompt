'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Profile from "@components/Profile"

const MyProfile = () => {

    const {data:session} = useSession()
    const [myPosts, setMyPosts] = useState([])
    const router = useRouter()


    const fetchPosts = async()=>{
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json()
      console.log(data)
      setMyPosts(data)
    }

    useEffect(() => {
        if(session?.user.id )
            fetchPosts()
    }, [])

    const handleEdit = (post) =>{
      router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async(post) =>{

      const hasConfirmed = confirm(
        "Are you sure you want to delete this prompt"
      )

      if(hasConfirmed){
        try{

          await fetch(`/api/prompt/${post._id.toString()}`,{
            method:'DELETE',
          })
          
          const filtredPosts = myPosts.filter((p)=>p._id !== post._id)
          console.log(filtredPosts)
          setMyPosts(filtredPosts)

        }catch(err){
          console.log(err)
        }
      }
    }
  return (
      <Profile
        name='My'
        desc="Welcome to your personalized profile page! This is your own unique corner of our platform, where you can manage your information and activities. From here, you can update your profile details, track your activity, and access customized features that we've tailored specifically for you 🦄"
        data={myPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
  )
}

export default MyProfile
