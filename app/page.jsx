import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
        Discover and Share
        <br className='max-md:hidden' />
        <span className="orange_gradient text-center"> AI-Powered Prompt</span>
    </h1>
    <p className="desc text-center">
    Are you looking for inspiration to spark your creativity? PromptShare is the ultimate app designed to provide a plethora of writing prompts to kick-start your imagination and fuel your storytelling.
    </p>
    <Feed/>
    </section>
  )
}

export default Home
