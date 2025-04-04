// This asynchronous function sends a DELETE request to the specified URL.  
// If the request is successful (status OK), it returns true.  
// If the request fails or an error occurs, it logs the error and returns false.

const useFetchDelete = async (url) => {
    try {
        const res = await fetch(`http://localhost:3000${url}`, {
            method: 'DELETE'
        });

        if (!res.ok) {
            return false;
        }

        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }
};

export default useFetchDelete;