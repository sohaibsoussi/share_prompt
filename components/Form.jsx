import Link from "next/link"
const Form = ({type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world and let your imagination run wild
        with any AI platform  
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col cap-7 glassmorphism"
      >
        <label>
          <span 
            className="font-satoshi font-semibold text-base text-gray-700">
            Your AI prompt
          </span>
        </label>
        <textarea
          value={post.prompt}
          onChange={(e)=>setPost({...post,prompt: e.target.value})}
          placeholder="Write your prompt here"
          required
          className="form_textarea"
        />
        <label className=" mt-5">
          <span 
            className="font-satoshi font-semibold text-base text-gray-700 ">
            Tag
          </span>
          <span 
            className=" text-gray-500">
            &nbsp;(for e.g: #bestDockerPrompt🐋)
          </span>
        
          <input
            value={post.tag}
            onChange={(e)=>setPost({...post,tag: e.target.value})}
            type="text"
            placeholder="#Tag"
            required
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 mt-5 gap-5">
          <Link href='/' className="text-gray-500 text-sm hover:text-gray-600">
            Cancel
          </Link>
          <button
            type="submit"
            disabled = {submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white hover:bg-orange-600'
          >
          {submitting? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
