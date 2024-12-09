import { useLoaderData, useParams } from "react-router-dom";
import useFetch from "../../useFetch";
import { useNavigate } from 'react-router-dom';

const BlogDetails = () => {

    const { id } = useParams();
    console.log(id);

    const url = import.meta.env.VITE_SUPABASE_URL + '/rest/v1/blogs' + '?id=eq.' + id;
    console.log('inside BlogDetails, url=[' + url + ']');
    const headers = { 'apikey': import.meta.env.VITE_SUPABASE_KEY };
    const { data: blog, isPending, error } = useFetch(url, headers);

    const navigate = useNavigate();

    const handleClick = () => {
        let tempId = '1dec'; // Use this for testing until changes can be made to update the Supabase database!
        //json-server -p 4100 -w ./data/blogs.json
        //fetch('http://localhost:4100/blogs')
        fetch('http://localhost:4100/blogs/' + tempId, {
            method: 'DELETE',
            //headers: { "Content-Type": "application/json" },
            //body: JSON.stringify(blog)
        }).then(() => {
            console.log('blog id#' + tempId + ' deleted!');
            //setIsPending(false);
            // useHistory was replaced by useNavigate in ver 6
            //history.go(-1); // go back one page in history
            navigate('/blogs/bloghome');
        });
    };

    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog[0].title}</h2>
                    <p>Written by {blog[0].author}</p>
                    <pre>{blog[0].body.replaceAll("\\n", '\n').replaceAll('\\"', '"')}</pre>
                    <button onClick={handleClick}>Delete</button>
                </article>
            )}
        </div>
    );

};

export default BlogDetails;
