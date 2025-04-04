// useFetchPut is an asynchronous function that sends a PUT request to the specified URL with the provided body.
// If the request is successful, it returns the JSON response, otherwise logs the error and returns null.

const useFetchPut = async (url, body) => {
    try {
        const res = await fetch(`http://localhost:3000${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            return null;
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

export default useFetchPut;
