import { useLoaderData, useParams } from "react-router-dom";

export default function CareerDetails() {
    const { id } = useParams();
    const careerArray = useLoaderData();
    const career = careerArray[0];
    console.log(career);
    //console.log(career[0].title)
    return (
        <div className="career-details">
            <h2>Career Details for {career.title}</h2>
            <p>Starting salary: {career.salary}</p>
            <p>Location: {career.location}</p>
            <p>yada yada yada</p>
        </div>
    );
}

// loader function
export const careerDetailsLoader = async ({ params }) => {
    const { id } = params;
    const supa_url = import.meta.env.VITE_SUPABASE_URL;
    const supa_key = import.meta.env.VITE_SUPABASE_KEY;
    //console.log(supa_url, supa_key);
    const headers = {
        'apikey': supa_key,
    };
    const careersDetailsLink = supa_url + '/rest/v1/careers' + '?id=eq.' + id;
    //console.log(careersDetailsLink);
    const res = await fetch(careersDetailsLink, {
        method: 'GET', // or 'POST', 'PUT', etc.
        headers: headers
    });
    //console.log(res);
    //const res = await fetch('http://localhost:4000/careers/' + id);
    if (!res.ok) {
        throw Error('Could not find that career');
    }
    return res.json();
}
