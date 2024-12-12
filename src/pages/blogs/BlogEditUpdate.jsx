import { useState, useEffect } from "react";
//import { useLoaderData, useParams } from "react-router-dom";
import { useParams } from "react-router-dom";
//import { useHistory } from 'react-router-dom'; // useHistory was replaced by useNavigate in ver 6
import { useNavigate } from 'react-router-dom';
// import useFetch from "../../useFetch";

import supabase from '../../supabaseClient';
// import { createClient } from '@supabase/supabase-js';
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

const BlogEditUpdate = () => {

    const { id } = useParams();
    console.log(id);

    const [title, setTitle] = useState(''); //blog[0].title);
    const [body, setBody] = useState(''); //blog[0].body);
    const [author, setAuthor] = useState(''); //blog[0].author);
    const [isUpdating, setIsUpdating] = useState(false);

    //const [blog, setBlog] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('before fetchBlog');
        fetchBlog();
        console.log('after fetchBlog');
    }, []);

    const fetchBlog = async () => {
        console.log('inside fetchBlog');
        setIsPending(true);
        let { data, error } = await supabase.from('blogs').select('*').eq('id', id);
        if (error) {
            console.error('Error fetching blog:', error.message);
            setError(error.message);
        } else {
            console.log(data[0]);
            //setBlog(data[0]);
            setTitle(data[0].title);
            setBody(data[0].body);
            setAuthor(data[0].author);
        }
        setIsPending(false);
        console.log('leaving fetchBlog');
    };

    // const url = import.meta.env.VITE_SUPABASE_URL + '/rest/v1/blogs' + '?id=eq.' + id;
    // console.log('inside BlogEditUpdate, url=[' + url + ']');
    // const headers = { 'apikey': import.meta.env.VITE_SUPABASE_KEY };
    // console.log('before useFetch');
    // const { data: blog, isPending, error } = useFetch(url, headers);
    // console.log(JSON.stringify(blog, null, 4));
    // //console.log(JSON.stringify(blog[0], null, 4));

    //setTitle(blog[0].title);
    //setBody(blog[0].body);
    //setAuthor(blog[0].author);
    //const history = useHistory(); // useHistory was replaced by useNavigate in ver 6
    const navigate = useNavigate();

    /*
    const handleSubmit = (e) => {

        e.preventDefault();
        //console.log('handleSubmit');

        const blog = { title, body, author };
        console.log(blog);

        setIsUpdating(true);

        //json-server -p 4100 -w ./data/blogs.json
        //fetch('http://localhost:4100/blogs')
        fetch('http://localhost:4100/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('new blog added');
            setIsUpdating(false);
            // useHistory was replaced by useNavigate in ver 6
            //history.go(-1); // go back one page in history
            navigate('/blogs/bloghome');
        });

    };
    */

    const handleUpdateSupabase = async (e) => {
        e.preventDefault();
        console.log('handleUpdateSupabase');
        setIsUpdating(true);
        //const blog = { title, body, author };
        //console.log(blog);
        try {
            console.log('id=[' + id + ']');
            console.log(title, body, author);
            const { data, error } = await supabase
                .from('blogs')
                .update({ title: title, body: body, author: author })
                .eq('id', id)
                .select();
            if (error) {
                throw error;
            }
            console.log('Data updated successfully:', data);
            navigate('/blogs/bloghome');
            // Optionally clear the form or update state
        } catch (error) {
            console.error('Error updating data:', error);
            // Handle errors, e.g., display an error message
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="blog-create">
            <h2>Edit/Update a Blog!</h2>
            <form onSubmit={handleUpdateSupabase}>
                {isPending && <div>Loading...</div>}
                {error && <div>{error}</div>}
                <label htmlFor="">Blog title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="">Blog body:</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows="5" cols="50"
                ></textarea>
                <label htmlFor="">Blog author:</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                    <option value="abbott">abbott</option>
                </select>
                {!isUpdating && <button>Update Blog</button>}
                {isUpdating && <button disabled>Updating Blog...</button>}
            </form>
        </div>
    );

};

export default BlogEditUpdate;
