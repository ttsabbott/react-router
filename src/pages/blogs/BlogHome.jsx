const BlogHome = () => {
    const title = 'Blog';
    const likes = 50;
    //const person = {name:'yoshi', age: 30}; // React can't output an object nor boolean values!
    const link = "http://www.google.com";

    return (
        <div>
            <h1>{title}</h1>
            <p>Liked {likes} times</p>
            {/* <p>{person}</p> */}
            <p>{10}</p>
            <p>{"hello"}</p>
            <p>{[1, 2, 3, 4, 5]}</p>
            <p>{Math.random() * 10}</p>
            <a href={link}>Google site</a>
        </div>
    );
}

export default BlogHome;
