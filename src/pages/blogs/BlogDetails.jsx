import { useState, useEffect } from "react";
// import { useLoaderData, useParams } from "react-router-dom";
import { useParams } from "react-router-dom";
// import useFetch from "../../useFetch";
import { useNavigate } from 'react-router-dom';
// import { Link } from "react-router-dom";

import supabase from '../../supabaseClient';
// import { createClient } from '@supabase/supabase-js';
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

const BlogDetails = () => {

    const { id } = useParams();
    console.log(id);

    const [blog, setBlog] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // console.log('before fetchBlog');
        fetchBlog();
        // console.log('after fetchBlog');
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
            setBlog(data[0]);
        }
        setIsPending(false);
        console.log('leaving fetchBlog');
    };

    // const url = import.meta.env.VITE_SUPABASE_URL + '/rest/v1/blogs' + '?id=eq.' + id;
    // // console.log('inside BlogDetails, url=[' + url + ']');
    // const headers = { 'apikey': import.meta.env.VITE_SUPABASE_KEY };
    // const { data: blog, isPending, error } = useFetch(url, headers);

    const navigate = useNavigate();

    /*
    const handleClick = () => {
        let tempId = '1dec'; // Use this for testing until changes can be made to update the Supabase database!
        // json-server -p 4100 -w ./data/blogs.json
        // fetch('http://localhost:4100/blogs')
        fetch('http://localhost:4100/blogs/' + tempId, {
            method: 'DELETE',
            // headers: { "Content-Type": "application/json" },
            // body: JSON.stringify(blog)
        }).then(() => {
            console.log('blog id#' + tempId + ' deleted!');
            // setIsPending(false);
            // useHistory was replaced by useNavigate in ver 6
            // history.go(-1); // go back one page in history
            navigate('/blogs/bloghome');
        });
    };
    */

    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteSupabase = async (e) => {
        e.preventDefault();
        console.log('handleDeleteSupabase');
        setIsLoading(true);
        // const blog = { title, body, author };
        try {
            console.log('id=[' + id + ']');
            const { blog: deletedData, error } = await supabase
                .from('blogs')
                .delete()
                .eq('id', id);
            if (error) {
                throw error;
            }
            console.log('Data deleted successfully:', deletedData);
            navigate('/blogs/bloghome');
            // Optionally clear the form or update state
        } catch (error) {
            console.error('Error deleting data:', error);
            // Handle errors, e.g., display an error message
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        console.log('handleEdit with id # ' + id);
        // <Link to={`/blogs/${blog.id}`}>
        navigate('/blogs/blogeditupdate/' + id);
    };

    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <pre>{blog.body} {/*}.replaceAll("\\n", '\n').replaceAll('\\"', '"')}*/}</pre>
                    {/*
                    <Link to={`/blogs/blogeditupdate/${blog.id}`}>
                        // <h2>Edit</h2>
                        <button onClick={handleEdit} style={{
                            color: 'black',
                            backgroundColor: 'yellow',
                            borderRadius: '8px'
                        }}>Edit</button>
                    </Link>
                    */}
                    <button onClick={handleEdit} style={{
                        color: 'black',
                        backgroundColor: 'yellow',
                        borderRadius: '8px'
                    }}>Edit</button>
                    <button onClick={handleDeleteSupabase}>Delete</button>
                </article>
            )}
        </div>
    );

};

export default BlogDetails;
