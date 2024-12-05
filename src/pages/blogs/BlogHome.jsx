import { useState } from "react";
import BlogList from "./BlogList";

const BlogHome = () => {
    const title = 'Blog Home';
    const likes = 50;
    //const person = {name:'yoshi', age: 30}; // React can't output an object nor boolean values!
    const link = "http://www.google.com";

    //let name = 'bosco';
    const [name, setName] = useState('bosco');
    const [age, setAge] = useState(5);
    const handleClick = (e) => {
        //console.log('hello',e);
        setName(name === 'bosco' ? 'leena' : 'bosco');
        setAge(age + 1);
        //name = 'leena';
        //console.log(name); // name will be changed, but the screen is not because the name variable is NOT reactive!
    }
    const handleClickAgain = (name) => {
        console.log('hello ' + name);
    }

    const [blogs, setBlogs] = useState([
        { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
        { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
        { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3 }
    ]);

    return (
        <div>
            <h1>{title}</h1>
            <BlogList blogs={blogs} title="All Blogs" />
            <div className="extra">
                <p>{name} is {age} years old</p>
                <button onClick={handleClick}>Click me</button>
                <button onClick={() => {
                    console.log('ugh');
                }}>Click me again</button>
                <button onClick={() => {
                    handleClickAgain('bosco');
                }}>Click me again</button>
                <button onClick={() => handleClickAgain('bosco')}>Click me again</button>
                <p>Liked {likes} times</p>
                {/* <p>{person}</p> */}
                <p>{10}</p>
                <p>{"hello"}</p>
                <p>{[1, 2, 3, 4, 5]}</p>
                <p>{Math.random() * 10}</p>
                <a href={link}>Google site</a>
            </div>
        </div>
    );
}

export default BlogHome;
