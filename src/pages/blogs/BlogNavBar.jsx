import { NavLink, Outlet, Link } from 'react-router-dom';

const BlogNavBar = () => {
    return (
        <nav className="navbar">
            <h1>Blog Nav Bar</h1>
            <div className="links">
                <nav>
                    <NavLink to="bloghome">Blog Home</NavLink>
                    <NavLink to="blogcreate">New Blog</NavLink>
                    {/* change anchor tags to link tags */}
                    {/* <Link to="/blogs/bloghome">Blog Home</Link> */}
                    {/* <a href="/react-router/blog">Blog Home</a> */}
                    {/* How to inline styles, note: background-color becomes backgroundColor (camel case) */}
                    {/* <Link to="/blogs/blogcreate" style={{
                        color: 'white',
                        backgroundColor: 'green',
                        borderRadius: '8px'
                    }}>New Blog</Link> */}
                    {/* <a href="/react-router/blogs/create" style={{
                        color: 'white',
                        backgroundColor: 'green',
                        borderRadius: '8px'
                    }}>New Blog</a> */}
                </nav>
            </div>
        </nav>
    );
};

export default BlogNavBar;
