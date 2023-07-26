'use client'

import { useState,useEffect } from "react"

import PromptCard from "./PromptCard"

const PromptCardList = ({data, handleTagClick})=>{
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post)=>(
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
        ))}
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState('')
  const [allPost ,setAllPost] = useState([])
  const [searchResult,setSearchResult] = useState([])
  const [searchTimeout,setSearchTimeout] = useState(null)


  //initialisation of page data
  const fetchPosts = async()=>{
    const res = await fetch(`/api/prompt/`)
    const data = await res.json()
    setAllPost(data)
    console.log('AllPost',allPost)
  }
  useEffect(() => {
      fetchPosts()
  }, [])

   
  const filterPrompt = (searchtext) => {
    const regex = new RegExp(searchtext,"i")
    //"i" flag for insensitive search
    //console.log('all data from regexfct ',allPost)
    return allPost.filter((item)=>{
      return regex.test(item.prompt)
      //console.log('regex', regex.test(item.prompt))
    })
  }

  const testFunction = (str='hello') =>{
    console.log('filterPrompt',filterPrompt(str))
  }
  testFunction()
  const handleSearchChange = (e) =>{
    clearTimeout(searchTimeout)
    //to block the research since we are typing in the search bar
    setSearchText(e.target.value)
    setSearchTimeout(
      setTimeout(()=>{
        const searchResult = filterPrompt(e.target.value)
        setSearchResult(searchResult)
        //console.log("i'm working")
      },500)
    )
  }

  useEffect(()=>{
    console.log('searchResult',searchResult)
  },[searchResult])


  return (
    <section className="feed">
      <form className="relative w-full flex-center" onSubmit={(e)=>e.preventDefault()}>
        <input
          type='text'
          placeholder="Search for a tag or user name"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={searchText.replaceAll(' ', '') === ''?allPost:searchResult}
        handleTagClick = {()=>{}}
      />
    </section>
  )
}

export default Feed
