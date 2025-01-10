
function Show({post}) {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p>{post.body}</p>
    </div>
  )
}

export default Show