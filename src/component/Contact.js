import React from 'react'
import logo from './logo.png'
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Contact() {

    const [data, setData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const [error, setError] = useState('')
    const [auth, setAuth] = useState('')

    const navigate = useNavigate()


    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('https://rvmserver.onrender.com/')
            .then(res => {
                if (res.data.Status === 'Success') {
                    if (res.data.role === 'customer') {
                        // navigate('/checkout')
                    }
                    else {
                        // setAuth(false)
                        navigate('/login')
                    }
                }
                else {
                    navigate('/login')
                }
            })
    },[])

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://rvmserver.onrender.com/contact', data)
            .then(res => {
                if (res.data.Status === 'Success') {
                    setAuth(true)
                    toast.success(res.data.Status, {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    // window.location.reload(true);

                }
                else {
                    setAuth(false)
                    setError(res.data.Error)
                }
            }).then(err => console.log(err))
    }






    return (
        <div>

            <nav className="navbar navbar-expand-lg bg-warning ">
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
                            {/* <li className=" li1 nav-item mx-3">
                                <Link to="/addtocart" style={{ width: 'fit-content' }} className="nav-link active" aria-current="page" href="#">Add to Cart</Link>
                            </li> */}
                            <li className="nav-item mx-4">
                                <a className="nav-link disabled">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>








            <section class="ftco-section" style={{ backgroundImage: 'URL(https://wallpapercave.com/dwp1x/wp9103853.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', position: 'relative' }}>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-6 text-center mb-5">
                            <h1 class="heading-section text-white">Contact us</h1>
                        </div>
                    </div>
                    <div class="row justify-content-center p-5">
                        <div class="col-md-12">
                            <div class="wrapper">
                                <div class="row no-gutters">
                                    <div class="col-lg-8 col-md-7 order-md-last d-flex align-items-stretch">
                                        <div class="contact-wrap w-100 p-md-5 p-4">
                                            <h3 class="mb-4 text-white">Please Fill the Form</h3>
                                            <div id="form-message-warning" class="mb-4"></div>
                                            <div id="form-message-success" class="mb-4">
                                            </div>
                                            <div className='text-danger'>
                                                {error && error}
                                            </div>
                                            <form onSubmit={handleSubmit}>
                                                <div class="row ">
                                                    <div class="col-md-6 p-2">
                                                        <div class="form-floating form-group">
                                                            <input type="text" onChange={e => setData({ ...data, name: e.target.value })} class="form-control" name="name" id="name" placeholder="Name" />
                                                            <label class="label" for="floatingInput name">Full Name</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 p-2">
                                                        <div class="form-floating form-group">
                                                            <input type="email" onChange={e => setData({ ...data, email: e.target.value })} class="form-control" name="email" id="email" placeholder="Email" />
                                                            <label class="label" for="floatingInput email">Email Address</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12 p-2">
                                                        <div class="form-floating form-group">
                                                            <input type="text" onChange={e => setData({ ...data, subject: e.target.value })} class="form-control" name="subject" id="subject" placeholder="Subject" />
                                                            <label class="label" for="floatingInput subject">Subject</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12 p-2">
                                                        <div class="form-floating form-group">
                                                            <textarea name="message" style={{ height: '120px' }} onChange={e => setData({ ...data, message: e.target.value })} class="form-control" id="message" cols="30" rows="4" placeholder="Message"></textarea>
                                                            <label class="label" for="# floatingInput">Message</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12 p-2">
                                                        {
                                                            auth ?
                                                                (
                                                                    <div class="form-group">
                                                                        <button type="submit" disabled value="" class="btn btn-warning p-2">Msg Sent Successfully</button>
                                                                    </div>
                                                                )
                                                                :
                                                                (
                                                                    <div class="form-group">
                                                                        <button type="submit" value="" class="btn btn-success p-2">Submit</button>
                                                                    </div>
                                                                )
                                                        }
                                                        <ToastContainer />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-5 d-flex align-items-stretch">
                                        <div class="info-wrap bg-warning w-100 p-md-5 p-4">
                                            <h3>Let's get in touch</h3>
                                            <p class="mb-4">We're open for any suggestion or just to have a chat</p>
                                            <div class="dbox w-100 d-flex align-items-start">
                                                <div class="d-flex align-items-center justify-content-center p-1">
                                                    <span><i class="bi bi-geo-alt-fill"></i></span>
                                                </div>
                                                <div class="text pl-3 p-1">
                                                    <p><span>Address:</span> SVNIT Surat,Gujarat,395007</p>
                                                </div>
                                            </div>
                                            <div class="dbox w-100 d-flex align-items-start">
                                                <div class="icon d-flex align-items-center justify-content-center p-1">
                                                    <span class="bi bi-telephone-fill"></span>
                                                </div>
                                                <div class="text pl-3 p-1">
                                                    <p><span>Phone:</span>+91 1235 2355 98</p>
                                                </div>
                                            </div>
                                            <div class="dbox w-100 d-flex align-items-start">
                                                <div class="icon d-flex align-items-center justify-content-center p-1">
                                                    <span><i class="bi bi-envelope-fill"></i></span>
                                                </div>
                                                <div class="text pl-3 p-1">
                                                    <p><span>Email:</span> test@test.com</p>
                                                </div>
                                            </div>
                                            <div class="dbox w-100 d-flex align-items-start">
                                                <div class="icon d-flex align-items-center justify-content-center p-1">
                                                    <span><i class="bi bi-globe-asia-australia"></i></span>
                                                </div>
                                                <div class="text pl-3 p-1">
                                                    <p><span>Website</span> <a href="http://localhost:3000">http://localhost:3000</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >
        </div >

    )
}

export default Contact
