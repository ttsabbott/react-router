import '../pages/blogs/Blog.css';
import { Outlet } from "react-router-dom";
import BlogNavBar from "../pages/blogs/BlogNavBar";
//import BlogHome from "../pages/blogs/BlogHome";

export default function BlogLayout() {
    return (
        <div className="help-layout">
            {/* <div className="blog-css"> */}
            {/* <h2>Blog layout</h2>
            <p>Placeholder...</p> */}
            <BlogNavBar />
            {/* <nav>
                <NavLink to="bloghome">Blog Home</NavLink>
                <NavLink to="blogcreate">Create</NavLink>
            </nav> */}
            {/* <div className="content"> */}
                <Outlet />
            {/* </div> */}
            {/* <hr />
            <div className="blog-css">
                <BlogNavBar />
                <div className="content">
                    <BlogHome />
                </div>
            </div> */}
        </div>
    );
};
