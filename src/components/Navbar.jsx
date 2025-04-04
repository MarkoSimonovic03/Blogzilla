import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, [])

  // Logs the user out by clearing localStorage and resetting currentUser state.
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    window.location.reload();
  }

  return (
    <nav className='navbar-light'>
      <div className="container py-3 d-flex ">
        <Link className="navbar-brand fs-2 fw-bold" to="/">Blogzilla</Link>
        <div className="links ms-auto d-flex align-items-center">
          {currentUser ? (
            <>
              <Link className="btn btn-primary" to="/create">Create a New Blog</Link>
              <Link className="nav-link" onClick={handleLogout}>Logout</Link>
            </>
          ) : (
            <>
              <Link className="btn btn-primary" to="/login">Login</Link>
              <Link className="nav-link" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar









// <nav className="navbar navbar-expand-lg navbar-light bg-light fs-4">
//   <div className="container">
//     <Link className="navbar-brand fs-2" to="/">Blogzilla</Link>
//     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//       <span className="navbar-toggler-icon"></span>
//     </button>
//     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//         <li className="nav-item">
//           <Link className="nav-link active" aria-current="page" to="/">Home</Link>
//         </li>
//         {currentUser ? (
//           <div className='d-inline'>
//             <li className="nav-item">
//               <Link className="nav-link" to="/create">Create</Link>
//             </li>
//             <li className="nav-item">
//               <span className="nav-link" onClick={handleLogout}>Logout</span>
//             </li>
//           </div>
//         ) : (
//           <div className='d-inline'>
//             <li className="nav-item">
//               <Link className="nav-link" to="/login">Login</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/register">Register</Link>
//             </li>
//           </div>
//         )
//       }

//       </ul>
//     </div>
//   </div>
// </nav>
