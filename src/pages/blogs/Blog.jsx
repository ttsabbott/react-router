import React from 'react';
import './Blog.css';
import BlogNavBar from './BlogNavBar.jsx';
import BlogHome from './BlogHome.jsx';

function Blog() {
    return (
        <div className="blog-css">
            <BlogNavBar />
            <div className="content">
                <BlogHome />
            </div>
        </div>
    );
}

export default Blog;
