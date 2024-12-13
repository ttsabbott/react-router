import { useState } from "react";
//import { useHistory } from 'react-router-dom'; // useHistory was replaced by useNavigate in ver 6
import { useNavigate } from 'react-router-dom';

import supabase from '../../supabaseClient';
// import { createClient } from '@supabase/supabase-js';
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

const BlogCreate = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');
    const [isPending, setIsPending] = useState(false);

    //const history = useHistory(); // useHistory was replaced by useNavigate in ver 6
    const navigate = useNavigate();

    /*
    const handleSubmit = (e) => {

        e.preventDefault();
        //console.log('handleSubmit');

        const blog = { title, body, author };
        console.log(blog);

        setIsPending(true);

        //json-server -p 4100 -w ./data/blogs.json
        //fetch('http://localhost:4100/blogs')
        fetch('http://localhost:4100/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('new blog added');
            setIsPending(false);
            // useHistory was replaced by useNavigate in ver 6
            //history.go(-1); // go back one page in history
            navigate('/blogs/bloghome');
        });

    };
    */

    const [loading, setLoading] = useState(false);

    const handleInsertSupabase = async (e) => {
        e.preventDefault();
        console.log('handleInsertSupabase');
        setLoading(true);
        const blog = { title, body, author };
        console.log(blog);
        try {
            const { blog: insertedData, error } = await supabase
                .from('blogs')
                .insert([blog])
                .single();
            if (error) {
                throw error;
            }
            console.log('Data inserted successfully:', insertedData);
            navigate('/blogs/bloghome');
            // Optionally clear the form or update state
        } catch (error) {
            console.error('Error inserting data:', error);
            // Handle errors, e.g., display an error message
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        navigate(-1); //'/blogs/bloghome');
    };

    return (
        <div className="blog-create">
            <h2>Add a New Blog!</h2>
            <form onSubmit={handleInsertSupabase}>
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
                <nav>
                    {!isPending && <button>Add Blog</button>}
                    {isPending && <button disabled>Adding Blog...</button>}
                    <button onClick={handleCancel}>Cancel</button>
                </nav>
            </form>
        </div>
    );

};

export default BlogCreate;
