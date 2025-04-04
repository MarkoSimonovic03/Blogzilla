import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useFetchGet from '../hooks/useFetchGet';
import useFetchPut from '../hooks/useFetchPut';


function Create() {
    const { id } = useParams();
    const [currentUser, setCurrentUser] = useState(null);

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [blog, setBlog] = useState({});
    const navigate = useNavigate();

    useEffect(() => {        
        loadBlog();
    },[])

    // Loads the blog data and checks if the current user is authorized to view or edit it.
    const loadBlog = async () => {
        const curUser = JSON.parse(localStorage.getItem("currentUser"));
        const data = await useFetchGet(`/blogs/${id}`);
        
        if(curUser && data && (curUser.role == 'admin' || curUser.id == data.userId)){
            setCurrentUser(curUser);
            setBlog(data);
            setTitle(data.title);
            setBody(data.body);
        }else{
            navigate('/');
        }
    };

    // Handles form submission to update blog and navigate accordingly.
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedBlog = {
            id : blog.id,
            userId: blog.userId,
            title,
            body,
            createdAt: blog.createdAt
        };

        const data = await useFetchPut(`/blogs/${id}`, updatedBlog);
        if(data){
            navigate(`/detail/${id}`)
        }
        else{
            navigate('/')
        }
    };

    return (
        <section>
            <div className='container p-5'>
                <h2>Edit blog</h2>
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
                    <button type="submit" className="btn btn-primary">Save changes</button>
                </form>
            </div>
        </section>
    )
}

export default Create