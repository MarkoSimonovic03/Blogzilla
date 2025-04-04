// This asynchronous function is responsible for deleting a blog and its associated comments. 
// It first fetches all comments and filters the ones related to the given blog ID.
// For each of those comments, it sends a DELETE request to remove them from the server.
// Then, it proceeds to delete the blog itself by sending a DELETE request for the specified blog ID.
// If any error occurs during these operations, it logs the error and returns false.
// If everything succeeds, it returns true.

const useFetchDeleteBlog = async (id) => {
    try {

        const commentsResponse = await fetch('http://localhost:3000/comments');

        if (!commentsResponse.ok) {
            throw new Error('Failed to fetch data');
        }

        const comments = await commentsResponse.json();

        const commentsToDelete  = comments.filter(comment => comment.blogId === id);

        for (const comment of commentsToDelete) {
            const response = await fetch(`http://localhost:3000/comments/${comment.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete comment');
            }
        }

        const blogResponse = await fetch(`http://localhost:3000/blogs/${id}`, {
            method: 'DELETE'
        });

        if (!blogResponse.ok) {
            throw new Error('Failed to fetch data');
        }

        return true;

    } catch (error) {
        console.error('Error deleting blog and comments:', error);
        return false;
    }
};

export default useFetchDeleteBlog;