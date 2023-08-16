import React, { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate, useResolvedPath } from 'react-router-dom'
import axios from 'axios'
// import '../App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Card from 'react-bootstrap/Card';
import logo from './logo.png'
// import Button from 'react-bootstrap/Button';
// import moment from 'moment';
import Banner from './banner'



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import ClipLoader from "react-spinners/ClipLoader";





function Dashboard() {


    // const navigate = useNavigate();


    const [tot_pro_atc, setTot_pro_atc] = useState('');


    const [cross, setCross] = useState('')

    const [data, setData] = useState([]);

    const [auth, setAuth] = useState('')
    const [firstname, setFirstname] = useState('')
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(true)

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('https://rvmserver.onrender.com/')
            .then(res => {
                if (res.data.Status === 'Success') {
                    if (res.data.role === 'customer') {
                        setAuth(true);
                        setCross(true);
                        setImage(res.data.image);
                        setFirstname(res.data.firstname);
                    }
                    else {
                        setAuth(false)
                        setCross(false)
                    }
                }
                else {
                    setAuth(false)
                    setCross(false)
                }
            })

        axios.get('https://rvmserver.onrender.com/getproduct')
            .then(res => {
                if (res.data.Status === 'Success') {
                    setData(res.data.Result)
                    setLoading(false);
                }
                else {
                    alert('Error in add item');
                }
            })


        axios.get('https://rvmserver.onrender.com/tot_pro_atc')
            .then(res => {
                setTot_pro_atc(res.data[0].tot_pro)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const handleLogout = () => {
        axios.get('https://rvmserver.onrender.com/logout')
            .then(res => {
                setAuth(false)
            })
            .catch(err => (console.log(err)))
    }

    const addtocart = (id) => {
        axios.post('https://rvmserver.onrender.com/atc/' + id)
            .then(res => {
                if (res.data.Status === 'Success') {
                    // navigate('/' + id)
                    // alert(res.data.Status)
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
                }
                else {
                    alert(res.data.Error)
                }
            }).catch(err => console.log(err))
    }

    const handleDelete = (id) => {
        axios.delete('https://rvmserver.onrender.com/pro_delete/' + id)
            .then(res => {
                if (res.data.Status === "Success") {
                    // window.location.reload(true);
                }
                else {
                    alert(res.data.Error)
                }
            }).catch(err => console.log(err))
    }

    function StartMarquee() {
        var marquee = document.getElementById("marquee");
        marquee.start();
    }
    function StopMarquee() {
        var marquee = document.getElementById("marquee");
        marquee.stop();
    }



    return (
        <>
            <div className="running">
                <marquee id="marquee" onMouseOver={StopMarquee} onMouseOut={StartMarquee}>
                    <p>50% off Sale Women Men | Free shipping on $75+ <a style={{ color: "white" }} href="">Details</a></p>
                </marquee>
            </div>

            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-transparent w-100">
                <div className="navbar11 container-fluid bg-warning">
                    <Link to="/" title='rVm Collection' className="navbar-brand fs-4 p-3"><img src={logo} width="80px" /></Link>
                    <button className="navbar-toggler shodow-none border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="sidebar offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header border-bottom">
                            <h5 className="offcanvas-title text-success" id="offcanvasNavbarLabel">rVm Collection</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="li1 nav-item">
                                    <Link to="/" className="nav-link active" style={{ width: 'fit-content' }} aria-current="page" href="#">Home</Link>
                                </li>
                                <li className="li1 nav-item mx-2">
                                    <a className="nav-link disabled" style={{ width: 'fit-content' }} href="#">About</a>
                                </li>
                                <li className="li1 nav-item mx-2">
                                    <Link to="/addtocart" className="nav-link active" style={{ width: 'fit-content' }} href="#">Add To Cart  <span class="cart-qty">{tot_pro_atc}</span>  </Link>
                                </li>
                                <li className="li1 nav-item mx-2">
                                    <Link to='/contact' className="nav-link active" style={{ width: 'fit-content' }} href="#">Contact</Link>
                                </li>
                            </ul>
                            <div className="d-flex align-items-center gap-3">

                                {
                                    auth ?
                                        <>
                                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                                <li className="li1 nav-item mx-2">
                                                    <Link to="/addproduct" className="nav-link active" style={{ width: 'fit-content' }} href="#">Add Product</Link>
                                                </li>
                                            </ul>

                                            {<img src={'https://rvmserver.onrender.com/images/' + image}
                                                className=" rounded-circle" height="38" alt="Rv" />}

                                            <div className="text-primary">{firstname}</div>

                                            <Link to="/" onClick={handleLogout} className="btn btn-outline-danger">Logout</Link>
                                        </>
                                        :
                                        <div>
                                            <Link to="/login" className="btn btn-outline-success">Sign in</Link>
                                        </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </nav>


            <Banner />


            <section>
                <div className="container my-5">
                    <header className="mb-4 text-center">
                        <h1>Featured Products</h1>
                        <p className="fs-5">Collection New Modern Design</p>
                    </header>


                    <div class="row d-flex justify-content-center">
                        <ClipLoader
                            color="#36d7b7"
                            loading={loading}
                            size={60}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>



                    <div className="row container" style={{ display: 'flex' }}>
                        {
                            data.map((user, index) => {
                                return <Card key={index} className="cross-button1 edit-button1 mb-3" style={{ width: '42vh', height: "80vh", border: '0px solid' }}>
                                    <Card.Img className="mt-2" variant="top" src={'https://rvmserver.onrender.com/images/' + user.image} style={{ width: '250px', height: '350px', textAlign: "center", margin: "auto" }} />

                                    {/* {
                                        cross ?
                                            <i title='Delete Item' onClick={e => handleDelete(user.product_id)} className='cross-button2 bi bi-x'></i>
                                            : (<></>)
                                    } */}


                                    <Card.Body className=''>
                                        <Card.Title className='text-secondary'>{user.com_name}</Card.Title>
                                        <Card.Title className='text-dark'>{user.about}</Card.Title>
                                        <Card.Title className="rating-box">
                                            <span className="rating-star full-star"></span>
                                            <span className="rating-star full-star"></span>
                                            <span className="rating-star full-star"></span>
                                            <span className="rating-star full-star"></span>
                                            <span className="rating-star full-star"></span>
                                        </Card.Title>
                                        <Card.Title>
                                            ${user.price}

                                            <i title="Add To Cart" onClick={e => addtocart(user.product_id)} className="bi bi-cart fs-3" style={{ position: "relative", left: '186px', cursor: "pointer" }}></i>
                                            <ToastContainer />

                                        </Card.Title>
                                        {/* <Card.Text>
                                            {user.email}
                                        </Card.Text> */}
                                    </Card.Body>
                                </Card>
                            })
                        }
                    </div>
                </div>
            </section >
            {/* <Outlet /> */}
        </>


    )
}


export default Dashboard

