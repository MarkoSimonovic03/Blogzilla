// This asynchronous function fetches a blog, its associated comments, and users who made those comments.
// It first fetches data for the blog, comments, and users from their respective API endpoints.
// If any of the requests fail, it throws an error.
// After fetching the data, it finds the user associated with the blog and associates each comment with its respective user.
// The comments are filtered by the given blog ID, and for each comment, the username is added by looking up the user who made the comment.
// The function then returns an object containing the blog, the blog's user, and the expanded list of comments with usernames.
// If any error occurs during the process, it logs the error and returns null for all data.

const fetchBlogCommentsWithUsers = async (id) => {
    try {
        const blogResponse = await fetch(`http://localhost:3000/blogs/${id}`);
        const commentsResponse = await fetch('http://localhost:3000/comments');
        const usersResponse = await fetch('http://localhost:3000/users');

        if (!commentsResponse.ok || !usersResponse.ok || !blogResponse.ok) {
            throw new Error('Failed to fetch data');
        }

        const blog = await blogResponse.json();
        const comments = await commentsResponse.json();
        const users = await usersResponse.json();     

        const user = users.find(u => u.id === blog.userId)

        const filteredComments = comments.filter(comment => comment.blogId === id);
        const expandedComments = filteredComments.map(comment => {
            const user = users.find(user => user.id === comment.userId);
            return {
                ...comment,
                username: user ? user.username : 'Unknown',
            };
        });
               
        return {blog, user, expandedComments};
    } catch (error) {
        console.error('Error fetching:', error);
        return { blog: null, user: null, expandedComments: null };
    }
};

export default fetchBlogCommentsWithUsers;