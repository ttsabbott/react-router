import { useState, useEffect } from "react";

const useFetch = (url, headers) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    console.log('inside useFetch, url=[' + url + ']');

    useEffect(() => { // this function fires on every render!

        const abortCont = new AbortController();

        setTimeout(() => {
            console.log('use fetch ran... ');
            // const supa_url = import.meta.env.VITE_SUPABASE_URL;
            // const supa_key = import.meta.env.VITE_SUPABASE_KEY;
            // //console.log(supa_url, supa_key);
            // const headers = {
            //     'apikey': supa_key,
            // };
            // const dataLink = supa_url + '/rest/v1/blogs';
            //console.log(dataLink);
            fetch(url, {
                method: 'GET', // or 'POST', 'PUT', etc.
                headers: headers,
                signal: abortCont.signal
            })
                //json-server -p 4100 -w ./data/blogs.json
                //fetch('http://localhost:4100/blogs')
                .then(res => {
                    if (!res.ok) {
                        console.log('could not fetch data for that resource');
                        throw Error('could not fetch data for that resource');
                    }
                    console.log('about to return res.json');
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                    setIsPending(false);
                    setData(data);
                    setError(null);
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log('fetch aborted');
                    } else {
                        console.log(err.message);
                        setIsPending(false);
                        setError(err.message);
                    }
                })
        }, 1000); // Simulate the request taking 0.5 seconds

        return () => abortCont.abort(); //console.log('cleanup');

    }, [url]); // using an empty array as the 2nd parm, makes this only run once during initiation
    //}, [name]); // adding a variable name here means whenever it changes, then run this method

    return { data, isPending, error };

}

export default useFetch;
