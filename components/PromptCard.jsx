'use client'

import { useState } from "react"
import Image from "next/image"
import Tick from '../public/icons/tick.svg'
import Copy from '../public/icons/copy.svg'
import { useSession } from "next-auth/react"
import { usePathname} from "next/navigation"

const PromptCard = ({post, handleTagClick, handleDelete, handleEdite}) => {
  const pathname = usePathname()
  const {data:session} = useSession()
  const[copied, setCopied] = useState("")
  const handleCopy = () =>{
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(()=>setCopied(''),3000)
  }
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="cursor-pointer flex-1 flex justify-start
         items-center gap-3">
          <Image 
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
              ? Tick
              : Copy
            }
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className='text-gray-700 text-sm font-satoshi my-4'>
        {post.prompt}
      </p>
      <p className="font-inner text-sm blue_gradient cursor-pointer"
            onClick={()=>handleTagClick && handleTagClick(post.tag)}
      >
      {/*the onclick event mean if handleTagClick exist then show all the relevant tag  */}
      {post.tag}
      </p>
      { 
        session?.user.id === post.creator._id 
        && pathname === '/profile'
        && (
          <div className="flex flex-1 gap-4 mt-5 justify-end">
            <p
              className="cursor-pointer font-inter text-sm green_gradient"
              onClick={handleEdite}
            >
              Edite
            </p>
            <p
              className="cursor-pointer font-inter text-sm orange_gradient"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )
      }
    </div>
  )
}

export default PromptCard
