// useFetchGet is an asynchronous function that fetches data from a specified URL, 
// returns the JSON response, and handles errors by logging them and returning null.
const useFetchGet = async (url) => {
    try {
        const res = await fetch(`http://localhost:3000${url}`);

        if (!res.ok) {
            return null;
        }

        const data = await res.json();

        return data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

export default useFetchGet;