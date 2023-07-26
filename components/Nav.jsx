'use client'

import Link from "next/link"
import Image from "next/image"
import Logo from '../public/images/logo3.png'
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  
  const {data:session} = useSession()
  //const [isUserLoggedIn, setIsUserLoggedIn ]= useState(true) it was just for test
  const[providers,setProviders]=useState(null)
  const[toggleDropDown,setToggleDropDown] = useState(true)

  useEffect(()=>{
    const setUpProviders = async()=>{
      const response = await getProviders()
      setProviders(response)
    }
    setUpProviders()
  },[])

  //empty array so it's going just to run in the start
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href='/' className="flex gap-2 flex-center">
        <Image 
          src={Logo} 
          alt="logo" 
          width={35} 
          height={35} 
          className="object-contain"
        />
        <p className="orange_gradient font-semibold text-xl">SharePrompts</p>
      </Link>
      {/*alert(session?.user)*/}
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5 ">
            <Link href='/create-prompt' className="black_btn">
              Create Post
            </Link>
            <button 
              type="button" 
              onClick={signOut}
             className="outline_btn"
            >
            Sign Out
            </button>
            <Link href='/profile'>
              <Image 
                src={session?.user.image}
                width={37}
                height={37}
                alt="profile picture"
                className='rounded-full border-2 border-gray-800 relative'
              />
              <span className='h-3 w-3 bg-green-500 absolute rounded-full top-3 right-16 border-l border-b border-gray-800'></span>
            </Link>
          </div>
        ):(
          <>
          {/*console.log(providers)*/}
          {
              providers && 
              Object.values(providers).map((provider)=>(
                <button
                  type="button"
                  key={provider.name}
                  onClick={()=>signIn(provider.id)}
                  className="black_btn"
                >
                Sign In
                </button>
              )
            )
          }
          </>
        )
      }
      </div>
      {/*Mobile navigation*/}
      <div className="sm:hidden flex relative">
        {
          session?.user ? (
            <div className="flex">
              <Image 
                src={session?.user.image}
                width={37}
                height={37}
                alt="profile picture"
                className='relative rounded-full transition-all border-2 border-gray-800'
                onClick={()=>setToggleDropDown((prev)=>!prev)}
              />
              <span className='h-3 w-3 bg-green-500 absolute rounded-full top-1 right-7 border-r border-b border-gray-800'></span>
              {
                toggleDropDown && (
                  <div className='dropdown'>
                    <Link 
                      href="/profile"
                      className="dropdown_link"
                      onClick={()=>setToggleDropDown(false)}
                    >
                      My Profile
                    </Link>
                    <Link 
                      href="/create-prompt"
                      className="dropdown_link"
                      onClick={()=>setToggleDropDown(false)}
                    >
                      Create Prompt
                  </Link>
                  <button 
                    type="button"
                    className="mt-5 w-full black_btn"
                    onClick={()=>{
                      setToggleDropDown(false)
                      signOut()
                    }}
                  >Sign Out</button>
                  </div>
                )
              }
            </div>
        
        ):(
          <>
          {
            providers && 
            Object.values(providers).map((provider)=>(
              <button
                type="button"
                key={provider.name}
                onClick={()=>signIn(provider.id)}
                className="black_btn"
              >
              Sign In
              </button>
            )
          )
        }
          </>
        ) }
      </div>
    </nav>
  )
}

export default Nav
