import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useFetchPost from '../hooks/useFetchPost';


function Create() {
    const [currentUser, setCurrentUser] = useState(null);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const curUser = JSON.parse(localStorage.getItem("currentUser"));
        if(curUser){
            setCurrentUser(curUser);
        }else{
            navigate('/');
        }
    }, []);

    // Handles the submission of a new blog, posts it, and navigates to the blog's detail page if successful.
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBlog = {
            userId: currentUser.id,
            title,
            body,
            createdAt: new Date().toISOString().split('T')[0]
        };

        const nBlog = await useFetchPost('/blogs', newBlog);
        if(nBlog){
            navigate(`/detail/${nBlog.id}`);
        }else{
            navigate('/')
        }
    };

    return (
        <section>
            <div className='container p-5'>
                <h2>Create a new blog</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Blog Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Enter blog title...'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="body" className="form-label">Blog Content</label>
                        <textarea
                            className="form-control"
                            id="body"
                            rows="5"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder='Write your blog content here...'
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Blog</button>
                </form>
            </div>
        </section>

    )
}

export default Create