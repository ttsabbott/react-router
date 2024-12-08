import { Link, useLoaderData } from "react-router-dom";
import useFetch from "../../useFetch";

export default function Careers() {
    //const careers = useLoaderData();
    const url = import.meta.env.VITE_SUPABASE_URL + '/rest/v1/careers';
    const headers = { 'apikey': import.meta.env.VITE_SUPABASE_KEY };
    const { data: careers, isPending, error } = useFetch(url, headers);
    return (
        <div>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {careers &&
                <div className="careers">
                    {careers.map(career => (
                        <Link to={career.id.toString()} key={career.id}>
                            <p>{career.title}</p>
                            <p>Based in {career.location}</p>
                        </Link>
                    ))}
                </div>
            } {/*} handleDelete={handleDelete} />}*/}
        </div>
    );
};

// data loader
/*
export const careersLoader = async () => {
    const supa_url = import.meta.env.VITE_SUPABASE_URL;
    const supa_key = import.meta.env.VITE_SUPABASE_KEY;
    //console.log(supa_url, supa_key);
    const headers = {
        'apikey': supa_key,
    };
    const careersLink = supa_url + '/rest/v1/careers';
    //console.log(careersLink);
    const res = await fetch(careersLink, {
        method: 'GET', // or 'POST', 'PUT', etc.
        headers: headers
    });
    //const res = await fetch('http://localhost:4000/careers');
    if (!res.ok) {
        throw Error('Could not fetch the careers');
    }
    return res.json();
}
*/
