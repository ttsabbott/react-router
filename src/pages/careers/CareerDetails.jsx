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
    const headers = {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5od3ZpdGpldG1scWJjaGRqZmF6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjI4ODQwMiwiZXhwIjoyMDQ3ODY0NDAyfQ.pDq3ZVwZ4Ci08_ope3O4MQThy3FpoKHIUIk0XxGRCFc',
    };
    const detailsLink = 'https://nhwvitjetmlqbchdjfaz.supabase.co/rest/v1/careers?id=eq.' + id;
    console.log(detailsLink);
    const res = await fetch(detailsLink, {
        method: 'GET', // or 'POST', 'PUT', etc.
        headers: headers
    });
    console.log(res);
    //const res = await fetch('http://localhost:4000/careers/' + id);
    if (!res.ok) {
        throw Error('Could not find that career');
    }
    return res.json();
}
