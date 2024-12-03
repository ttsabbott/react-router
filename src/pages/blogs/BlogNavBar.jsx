const BlogNavBar = () => {
    return (
        <nav className="navbar">
            <h1>The Dojo Blog</h1>
            <div className="links">
                <a href="/react-router/blogs">Blog Home</a>
                {/* How to inline styles, note: background-color becomes backgroundColor (camel case) */}
                <a href="/react-router/blogs/create" style={{
                    color: 'white',
                    backgroundColor: 'green',
                    borderRadius: '8px'
                }}>New Blog</a>
            </div>
        </nav>
    );
}

export default BlogNavBar;
