import { useLoaderData, useParams } from "react-router-dom";
import useFetch from "../../useFetch";

const BlogDetails = () => {

    const { id } = useParams();
    console.log(id);

    const url = import.meta.env.VITE_SUPABASE_URL + '/rest/v1/blogs' + '?id=eq.' + id;
    console.log('inside BlogDetails, url=[' + url + ']');
    const headers = { 'apikey': import.meta.env.VITE_SUPABASE_KEY };
    const { data: blog, isPending, error } = useFetch(url, headers);

    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog[0].title}</h2>
                    <p>Written by {blog[0].author}</p>
                    <pre>{blog[0].body.replaceAll("\\n", '\n').replaceAll('\\"', '"')}</pre>
                </article>
            )}
        </div>
    );

};

export default BlogDetails;
