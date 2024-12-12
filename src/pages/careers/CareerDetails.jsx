import { useLoaderData, useParams } from "react-router-dom";
import useFetch from "../../useFetch";

const CareerDetails = () => {

    const { id } = useParams();
    console.log(id);

    const url = import.meta.env.VITE_SUPABASE_URL + '/rest/v1/careers' + '?id=eq.' + id;
    //console.log('inside CareerDetails, url=[' + url + ']');
    const headers = { 'apikey': import.meta.env.VITE_SUPABASE_KEY };
    const { data: career, isPending, error } = useFetch(url, headers);

    return (
        <div className="career-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {career && (
                <article>
                    <h2>Career Details for {career[0].title}</h2>
                    <p>Starting salary: {career[0].salary}</p>
                    <p>Location: {career[0].location}</p>
                </article>
            )}
        </div>
    );

};

export default CareerDetails;
