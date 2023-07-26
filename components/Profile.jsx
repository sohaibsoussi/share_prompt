import PromptCard from "./PromptCard"

const Profile = ({name, desc, data, handleEdit, handleDelete}) => {
  return (
    <section className="w-full"> 
      <p className="head_text text-left blue_gradient mb-7">{name} Profil</p>
      <p className="desc text-left">{desc}</p>
      <div className="mt-14 prompt_layout">
        {data.map((post)=>(
          <PromptCard
            key={post._id}
            post={post}
            handleEdite={()=> handleEdit && handleEdit(post)}
            handleDelete={()=>handleDelete && handleDelete(post)}
          />
          ))}
      </div>
    </section>
  )
}

export default Profile
