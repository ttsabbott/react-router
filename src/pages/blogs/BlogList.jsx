import { Link } from "react-router-dom";

// Different way to define the props, either by using the props variable (option A), or by listing out the props to be used (option B):
// Option A:
//const BlogList = (props) => {
//  const blogs = props.blogs;
//  const title = props.title;
// Option B:
//const BlogList = ({ blogs, title, handleDelete }) => {
const BlogList = ({ blogs, title }) => {
    //console.log(blogs);
    return (
        <div className="blog-list">
            <h2>{title}</h2>
            {blogs && blogs.message ? <div>{blogs.message}<br />{blogs.hint}</div> :
                blogs.map((blog) => (
                    <div className="blog-preview" key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>
                            <h2>{blog.title}</h2>
                            <p>Written by {blog.author}</p>
                            {/* <button onClick={() => handleDelete(blog.id)}>delete blog</button> */}
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default BlogList;
