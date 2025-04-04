import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import fetchBlogCommentsWithUsers from '../hooks/useFetchDetail';
import useFetchDeleteBlog from '../hooks/useFetchDeleteBlog';
import useFetchDelete from '../hooks/useFetchDelete';
import useFetchPost from '../hooks/useFetchPost';

function Detail() {
    const { id } = useParams();

    const [currentUser, setCurrentUser] = useState(null);

    const [blog, setBlog] = useState(null);
    const [user, setUser] = useState(null);
    const [comments, setComments] = useState(null);

    const [text, setText] = useState('');

    const [rerender, setRerender] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
        loadBlogs();
    }, [rerender])

    // Loads the blog data, user information, and comments with users' details.
    const loadBlogs = async () => {
        const { blog, user, expandedComments } = await fetchBlogCommentsWithUsers(id);
        if(blog){
            setBlog(blog);
            setUser(user);
            setComments(expandedComments);
        }else{
            navigate('/');
        }
    };

    // Handles the submission of a new comment and updates the comment list.
    const handleSubmit = async (e) => {
        e.preventDefault()

        const newComment = {
            blogId: blog.id,
            userId: currentUser.id,
            text,
            createdAt: new Date().toISOString().split('T')[0]
        };

        const createdComment = await useFetchPost('/comments', newComment);
    
        if (createdComment) {
            setText('');
            setRerender(!rerender);
        }
    }

    // Deletes the blog and navigates to the homepage if successful.
    const handleDeleteBlog = async () => {
        const isDeleted = await useFetchDeleteBlog(id);
        if (isDeleted) {
            navigate('/');
        }
    };

    // Deletes a specific comment and triggers a rerender if successful.
    const handleDeleteComment = async (id) => {
        const isDeleted = await useFetchDelete(`/comments/${id}`);
        if(isDeleted){
            setRerender(!rerender);
        }
    }

    return (
        <section>
            <div className='container p-5'>
                <div className='card-blog p-5'>
                    {blog && <>
                    <div>
                        <div className='d-flex justify-content-between align-items-start'>
                            <h2 className='fw-bold mb-3'>{blog.title}</h2>
                            {currentUser && (currentUser.role === 'admin' || currentUser.id === user.id) && (
                                <div className='d-flex flex-column gap-1'>
                                    <button className='btn btn-danger' onClick={handleDeleteBlog}>Delete</button>
                                    <Link to={`/edit/${blog.id}`} className='btn btn-primary text-decoration-none'>Edit</Link>
                                </div>
                            )}
                        </div>
                        <p className='fst-italic fs-4'>{blog.body}</p>
                        <p>{blog.date}</p>
                    </div>
                    
                    <p className='text-end fs-4'>By: <span className='fw-bold'>{user ? user.username : 'unknown'}</span></p>

                    {comments && comments.length > 0 && <p>Comments:</p>}
                    {comments && comments.map((comment) => (
                        <div key={comment.id} className='comment p-3'>
                            <div className='d-flex justify-content-between align-items-start'>
                                <p className='author m-0 fw-bold'>{comment.username}</p>
                                {currentUser && currentUser.role === 'admin' && (
                                    <button className='btn btn-danger' onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                                )}
                            </div>
                            <p className='m-0'>{comment.text}</p>
                            <p className='date m-0 text-end text-small'>{comment.createdAt ? comment.createdAt : 'Unknown date'}</p>
                        </div>
                    ))}

                    {currentUser ? (
                        <form className='mt-4' onSubmit={handleSubmit}>
                            <div className='mb-3' >
                                <label htmlFor='comment' className='form-label'>Write a comment</label>
                                <textarea
                                    className='form-control'
                                    id='comment'
                                    rows='4'
                                    placeholder='Enter your comment here...'
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    required>
                                </textarea>
                            </div>
                            <button type='submit' className='btn btn-primary'>Submit</button>
                        </form>
                    ) :
                        (<p>Login to leave a comment...</p>)
                    }
                    </>
                    }
                </div>
            </div>
        </section>
    )
}

export default Detail