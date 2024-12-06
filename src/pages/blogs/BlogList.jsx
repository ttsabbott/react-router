// const BlogList = (props) => {
//     const blogs = props.blogs;
//     const title = props.title;
const BlogList = ({blogs, title, handleDelete}) => {
    console.log(blogs);
    return (
        <div className="blog-list">
            <h2>{title}</h2>
            { blogs && blogs.message ? <div>{blogs.message}<br/>{blogs.hint}</div> : 
            blogs.map((blog) => (
                <div className="blog-preview" key={blog.id}>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <button onClick={() => handleDelete(blog.id)}>delete blog</button>
                </div>
            ))}
        </div>
    );
}

export default BlogList;
