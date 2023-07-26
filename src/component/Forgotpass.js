import React from 'react'
import { Link } from 'react-router-dom'
import logo from './logo.png'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Forgotpass() {

    const [data, setData] = useState({
        email: ''
    })
    const [error, setError] = useState('')

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://rvmserver.onrender.com/forgotpassword', data)
            .then(res => {
                if (res.data.Status === 'Success') {
                    alert(res.data.Status)
                    navigate('/login')
                }
                else {
                    setError(res.data.Error)
                    // alert(res.data.Error)
                }
            }).catch(err => console.log(err))
    }







    return (
        <div>

            <nav className="navbar navbar-expand-lg bg-warning">
                <div className="container-fluid">
                    <Link to="/" title='rVm Collection' className="navbar-brand fs-4 p-3"><img src={logo} width="80px" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className=" li1 nav-item mx-3">
                                <Link to="/" style={{ width: 'fit-content' }} className="nav-link active" aria-current="page" href="#">Home</Link>
                            </li>
                            <li className=" li1 nav-item mx-3">
                                <Link to="/login" style={{ width: 'fit-content' }} className="nav-link active" aria-current="page" href="#">Login</Link>
                            </li>
                            <li className="nav-item mx-4">
                                <a className="nav-link disabled">Forgot_Password</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>











            <section class="vh-100 gradient-custom">
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div class="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                                <div class="card-body p-5 text-center" onSubmit={handleSubmit}>

                                    <form class="mb-md-5 mt-md-4 pb-5">

                                        <h2 class="fw-bold mb-2 text-uppercase">Password Reset</h2>
                                        <p class="text-white-50 mb-5">Enter your email address and we'll send you an email with instructions to reset your password.</p>

                                        <div className='text-danger'>
                                            {error && error}
                                        </div>

                                        <div class="form-floating form-outline form-white mb-4">
                                            <input type="email" onChange={e => setData({ ...data, email: e.target.value })} id="typeEmailX" class="form-control form-control-lg " placeholder='Reset Password' />
                                            <label class="form-label text-dark" for="typeEmailX">Email</label>
                                        </div>
                                        <button class="btn btn-outline-light btn-lg px-5" type="submit">RESET PASSWORD</button>
                                    </form>
                                    <div>
                                        <Link to='/login' class="text-white-50 fw-bold">Login</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Forgotpass
