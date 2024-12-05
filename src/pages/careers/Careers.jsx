import { Link, useLoaderData } from "react-router-dom";

export default function Careers() {
    const careers = useLoaderData();
    return (
        <div className="careers">
            {careers.map(career => (
                <Link to={career.id.toString()} key={career.id}>
                    <p>{career.title}</p>
                    <p>Based in {career.location}</p>
                </Link>
            ))}
        </div>
    );
}

// data loader
export const careersLoader = async () => {
    const headers = {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5od3ZpdGpldG1scWJjaGRqZmF6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjI4ODQwMiwiZXhwIjoyMDQ3ODY0NDAyfQ.pDq3ZVwZ4Ci08_ope3O4MQThy3FpoKHIUIk0XxGRCFc',
    };
    const res = await fetch('https://nhwvitjetmlqbchdjfaz.supabase.co/rest/v1/careers', {
        method: 'GET', // or 'POST', 'PUT', etc.
        headers: headers
    });
    //const res = await fetch('http://localhost:4000/careers');
    if (!res.ok) {
        throw Error('Could not fetch the careers');
    }
    return res.json();
}
