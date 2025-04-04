import React, { useEffect, useState } from 'react'
import useFetchGet from '../hooks/useFetchGet'
import { Link } from 'react-router-dom';


function Home() {
    const [blogs, setBlogs] = useState(null);
    const [allBlogs, setAllBlogs] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        loadBlogs();
    }, []);

    // Loads blogs from the API and updates the state.
    const loadBlogs = async () => {
        const data = await useFetchGet('/blogs');
        if (data) {
            setAllBlogs(data);
            setBlogs(data);
        }
    };
    
    // Filters blogs based on search string in title or body.
    const research = (searchString) => {
        const filteredBlogs = allBlogs.filter(b => b.title.toLowerCase().includes(searchString.toLowerCase())
            || b.body.toLowerCase().includes(searchString.toLowerCase()));
        setBlogs(filteredBlogs);
    }

    return (
        <section>
            <div className='container p-5'>
                <form className="mb-4">
                    <div className='d-flex align-items-center gap-3 fs-3 fw-bold' style={{'whiteSpace' : 'nowrap'}}>
                        <label htmlFor="search" className=''>Search blogs...</label>
                        <input
                            type="text"
                            id="search"
                            name="search"
                            className="form-control"
                            placeholder="Search blogs..."
                            value={search}
                            onChange={e => {
                                setSearch(e.target.value);
                                research(e.target.value);
                            }}
                        />
                    </div>
                </form>
                {blogs && blogs.map(blog => (
                    <div className='card-blog mb-3 p-4' key={blog.id}>
                        <Link to={`/detail/${blog.id}`} className='text-decoration-none'>
                            <h2 className='fw-bold'>{blog.title}</h2>
                            <p className='mb-3'>{blog.body}</p>
                            <div className='d-flex justify-content-between mb-1'>
                                <p className='text-danger fw-bold m-0'>View More...</p>
                                <p className='m-0'>{blog.createdAt}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Home