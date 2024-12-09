import { useState, useEffect } from "react";
import BlogList from "./BlogList";
import useFetch from "../../useFetch";

// The Blog module was created using "iamshaujp"'s course: Complete-React-Tutorial
// https://github.com/iamshaunjp/Complete-React-Tutorial/blob/lesson-32/dojo-blog/src/index.css
// https://www.youtube.com/watch?v=XW0t2lk4Ffo&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=32

const BlogHome = () => {

    const url = import.meta.env.VITE_SUPABASE_URL + '/rest/v1/blogs';
    const headers = { 'apikey': import.meta.env.VITE_SUPABASE_KEY };
    const { data: blogs, isPending, error } = useFetch(url, headers);

    const title = 'Blog Home';
    // const likes = 50;
    //const person = {name:'yoshi', age: 30}; // React can't output an object nor boolean values!
    // const link = "http://www.google.com";

    //let name = 'bosco';
    const [name, setName] = useState('bosco');
    // const [age, setAge] = useState(5);
    // const handleClick = (e) => {
    //     //console.log('hello',e);
    //     setName(name === 'bosco' ? 'leena' : 'bosco');
    //     setAge(age + 1);
    //     //name = 'leena';
    //     //console.log(name); // name will be changed, but the screen is not because the name variable is NOT reactive!
    // }
    // const handleClickAgain = (name) => {
    //     console.log('hello ' + name);
    // }

    // const [blogs, setBlogs] = useState(null);
    // const [isPending, setIsPending] = useState(true);
    // const [error, setError] = useState(null);
    // const [blogs, setBlogs] = useState([
    //     { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
    //     { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
    //     { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3 }
    // ]);

    const handleDelete = (id) => {
        const newBlogs = blogs.filter(blog => blog.id !== id);
        setBlogs(newBlogs);
    }

    // useEffect(() => { // this function fires on every render!
    //     setTimeout(() => {
    //         console.log('use effect ran... ' + name);
    //         const supa_url = import.meta.env.VITE_SUPABASE_URL;
    //         const supa_key = import.meta.env.VITE_SUPABASE_KEY;
    //         //console.log(supa_url, supa_key);
    //         const headers = {
    //             'apikey': supa_key,
    //         };
    //         const blogsLink = supa_url + '/rest/v1/blogs';
    //         //console.log(blogsLink);
    //         fetch(blogsLink, {
    //             method: 'GET', // or 'POST', 'PUT', etc.
    //             headers: headers
    //         })
    //             //fetch('http://localhost:4100/blogs')
    //             .then(res => {
    //                 if (!res.ok) {
    //                     throw Error('could not fetch data for that resource');
    //                 }
    //                 return res.json()
    //             })
    //             .then((data) => {
    //                 console.log(data);
    //                 setBlogs(data);
    //                 setIsPending(false);
    //                 setError(null);  
    //             })
    //             .catch(err => {
    //                 console.log(err.message);
    //                 setError(err.message);
    //                 setIsPending(false);
    //             })
    //     }, 1500); // Simulate the request taking 1.5 seconds
    // }, []); // using an empty array as the 2nd parm, makes this only run once during initiation
    // //}, [name]); // adding a variable name here means whenever it changes, then run this method

    return (
        <div>
            <h1>{title}</h1>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blogs && <BlogList blogs={blogs} title="All Blogs!" />} {/* handleDelete={handleDelete} />} */}
            {/* <BlogList blogs={blogs.filter((blog) => blog.author === 'mario')} title="Mario's blogs" handleDelete={handleDelete} /> */}
            {/* <BlogList blogs={blogs.filter((blog) => blog.author !== 'mario')} title="Not Mario's blogs" handleDelete={handleDelete} /> */}
            {/* <div className="extra">
                <p>{name} is {age} years old</p>
                <button onClick={handleClick}>Click me</button>
                <button onClick={() => { console.log('ugh'); }}>Click me again</button>
                <button onClick={() => { handleClickAgain('bosco'); }}>Click me again</button>
                <button onClick={() => handleClickAgain('bosco')}>Click me again</button>
                <p>Liked {likes} times</p> */}
            {/* <p>{person}</p> */}
            {/* <p>{10}</p>
                <p>{"hello"}</p>
                <p>{[1, 2, 3, 4, 5]}</p>
                <p>{Math.random() * 10}</p>
                <a href={link}>Google site</a>
            </div> */}
        </div>
    );

};

export default BlogHome;
