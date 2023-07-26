import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from './logo.png'
import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.css';





// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';





function CheckOut() {

    const [error, setError] = useState('');

    const [data1, setData1] = useState([]);
    // const [data3, setData3] = useState([]);
    const [tot_pro_atc, setTot_pro_atc] = useState('');
    const [tot_price_atc, setTot_price_atc] = useState('');







    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        country: '',
        zip_code: ''
    })


    const navigate = useNavigate();

    const [auth1, setAuth1] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault();

        // const formData = new FormData();
        // formData.append("firstname", data.firstname);
        // formData.append("lastname", data.lastname);
        // formData.append("phone", data.phone);
        // formData.append("email", data.email);
        // formData.append("address", data.address);
        // formData.append("city", data.city);
        // formData.append("state", data.state);
        // formData.append("country", data.country);
        // formData.append("zip_code", data.zip_code);

        axios.post('https://rvmserver.onrender.com/checkout', data)
            .then(res => {
                if (res.data.Status === 'Success') {
                    // navigate('/')
                    alert(res.data.Status)
                    setAuth1(true)
                }
                else {
                    setError(res.data.Error)
                    setAuth1(false)
                    // alert(res.data.Error)
                }
            })
            .then(err => console.log(err))

    }


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





        axios.get('https://rvmserver.onrender.com/addtocart')
            .then(res => {
                if (res.data.Status === 'Success') {
                    setData1(res.data.Result)
                }
                else {
                    alert(res.data.Error)
                }
            }).catch(err => console.log(err))

        axios.get('https://rvmserver.onrender.com/tot_pro_atc')
            .then(res => {
                setTot_pro_atc(res.data[0].tot_pro)
            })
            .catch(err => {
                console.log(err);
            })

        axios.get('https://rvmserver.onrender.com/tot_price_atc')
            .then(res => {
                setTot_price_atc(res.data[0].tot_price)
            })
            .catch(err => {
                console.log(err);
            })

    },[])






    const [auth, setAuth] = useState('')
    const [data2, setData2] = useState([])


    const genbill = () => {
        axios.get('https://rvmserver.onrender.com/genbill')
            .then(res => {
                if (res.data.Status === 'Success') {
                    setAuth(true)
                    setData2(res.data.Result)
                }
                else {
                    setAuth(false);
                }
            }).catch(err => console.log(err))
    }

    const del_atc_item = () => {
        axios.get('https://rvmserver.onrender.com/del_atc_item')
            .then(res => {
                // console.log(res)
            }).catch(err => console.log(err))
    }






    return (
        <>
            {auth1 ?
                (
                    <>
                        {auth ?
                            (
                                <div>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="container mb-5 mt-3">
                                                <div className="row d-flex align-items-baseline">
                                                    <div className="pt-5 pb-3">
                                                        <Link onClick={del_atc_item} to="/"><h6 className="mb-0"><a href="#!" className="text-body"><i
                                                            className="fas fa-long-arrow-alt-left me-2"></i>Back to shop</a></h6></Link>
                                                    </div>
                                                    <hr />
                                                </div>
                                                <div className="container">

                                                    {
                                                        data2.map((a, b) => {
                                                            return (
                                                                <>
                                                                    <div key={b} className="col-md-12">
                                                                        <div className="text-center">
                                                                            <p className="lead fw-bold" style={{ color: '#f37a27' }}>Purchase Reciept</p>
                                                                            <hr />
                                                                            <img src={logo} width="50px" />
                                                                            <p className="lead" style={{ color: 'red', textAlign: 'center', fontSize: '45px' }}>Thank You!</p>
                                                                            <p className="lead" style={{ color: 'green', textAlign: 'center', fontWeight: 'bold' }}>Your Order Placed Successfully!</p>
                                                                        </div>

                                                                    </div>



                                                                    <div className="row">
                                                                        <div className="col-xl-8">
                                                                            <p style={{ color: '#f37a27', fontWeight: 'bold', textTransform: 'uppercase' }}>Customer Information</p>
                                                                            <ul className="list-unstyled">
                                                                                <li className="text-muted">Name: <span style={{ color: '#5d9fc5' }}>{a.firstname} {a.lastname}</span></li>
                                                                                <li className="text-muted">Email: <span style={{ color: '#5d9fc5' }}>{a.email}</span></li>
                                                                                <li className="text-muted">Phone Number: <span style={{ color: '#5d9fc5' }}>{a.phone}</span></li>
                                                                                <li className="text-muted">Billing Address <span style={{ color: '#5d9fc5' }}>{a.address}</span></li>
                                                                            </ul>
                                                                        </div>
                                                                        <div className="col-xl-4">
                                                                            <p className="text-muted">Invoice</p>
                                                                            <ul className="list-unstyled">
                                                                                <li className="text-muted"><i className="fas fa-circle" style={{ color: '#84B0CA' }}></i> <span
                                                                                    className="fw-bold">Receipt Number:</span>#123-456</li>
                                                                                <li className="text-muted"><i className="fas fa-circle" style={{ color: '#84B0CA' }}></i> <span
                                                                                    className="fw-bold">Creation Date: </span>23-02-1002</li>
                                                                                <li className="text-muted"><i className="fas fa-circle" style={{ color: '#84B0CA' }}></i> <span
                                                                                    className="me-1 fw-bold">Status:</span><span className="badge bg-warning text-black fw-bold">
                                                                                        Unpaid</span></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )
                                                        })

                                                    }

                                                    <div className="row my-2 mx-1 justify-content-center">
                                                        <p style={{ color: '#f37a27', fontWeight: 'bold' }}>ORDER DETAILS</p>
                                                        <table className="table table-striped table-borderless">
                                                            <thead style={{ backgroundColor: '#84B0CA' }} className="text-white">
                                                                <tr>
                                                                    <th scope="col">No.</th>
                                                                    <th scope="col">item Description</th>
                                                                    <th scope="col">Qty</th>
                                                                    <th scope="col">Unit Price</th>
                                                                    <th scope="col">Amount</th>
                                                                </tr>
                                                            </thead>
                                                            {data1.map((a, b) => {
                                                                return (
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>{a.product_id}</td>
                                                                            <td>{a.about}({a.com_name})</td>
                                                                            <td>1</td>
                                                                            <td>${a.price}</td>
                                                                            <td>${a.price}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                )
                                                            })

                                                            }

                                                        </table>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-xl-8">
                                                            <p className="ms-3">Received By: Jane Smith</p>

                                                        </div>
                                                        <div className="col-xl-3">
                                                            <ul className="list-unstyled">
                                                                <li className="text-muted ms-3"><span className="text-black me-4">SubTotal</span>${tot_price_atc}</li>
                                                                <li className="text-muted ms-3"><span className="text-black me-4">Shipping Charge</span>$0</li>
                                                                <li className="text-muted ms-3"><span className="text-black me-4">Discount</span>$0</li>
                                                            </ul>
                                                            <p className="text-black float-start"><span className="text-black me-3"> Total Amount</span><span
                                                                style={{ fontSize: '25px' }}>${tot_price_atc}</span></p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                            :
                            (
                                <>
                                    < nav className="navbar navbar-expand-lg bg-warning">
                                        <div className="container-fluid">
                                            <Link to="/" title='rVm Collection' className="navbar-brand fs-4 p-3"><img src={logo} width="80px" /></Link>
                                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                                <span className="navbar-toggler-icon"></span>
                                            </button>
                                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                                    <li className=" li1 nav-item ">
                                                        <Link to="/" style={{ width: 'fit-content' }} className="nav-link active" aria-current="page" href="#">Home</Link>
                                                    </li>
                                                    <li className="li1 nav-item">
                                                        <Link to="/addtocart" className="nav-link active mx-2" style={{ width: 'fit-content' }} href="#">Add To Cart</Link>
                                                    </li>
                                                    <li className="nav-item mx-2">
                                                        <a className="nav-link disabled">CheckOut</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </nav>






                                    <section className="py-5" style={{ backgroundColor: '#d2c9ff' }}>
                                        <div className="container">
                                            <div className="row" >
                                                <div className="col-xl-8 col-lg-8 mb-4">
                                                    <div className="card shadow-0 border">

                                                        <div className="p-4">
                                                            <h3 className="card-title mb-3">Complete Your Order</h3>
                                                            <div className='text-danger'>
                                                                {error && error}
                                                            </div>

                                                            <form onSubmit={handleSubmit}>
                                                                <div className="row">
                                                                    <h5 className="card-title mb-3">User info</h5>
                                                                    <div className="col-6 mb-3">
                                                                        <p className="mb-0">First name</p>
                                                                        <div className="form-outline">
                                                                            <input type="text" onChange={e => setData({ ...data, firstname: e.target.value })} id="typeText" placeholder="Type here" className="form-control" />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-6">
                                                                        <p className="mb-0">Last name</p>
                                                                        <div className="form-outline">
                                                                            <input type="text" onChange={e => setData({ ...data, lastname: e.target.value })} id="typeText" placeholder="Type here" className="form-control" />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-6 mb-3">
                                                                        <p className="mb-0">Phone</p>
                                                                        <div className="form-outline">
                                                                            <input type="text" onChange={e => setData({ ...data, phone: e.target.value })} id="typePhone" placeholder="Type here" className="form-control" />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-6 mb-3">
                                                                        <p className="mb-0">Email</p>
                                                                        <div className="form-outline">
                                                                            <input type="email" onChange={e => setData({ ...data, email: e.target.value })} id="typeEmail" placeholder="example@gmail.com" className="form-control" />
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <hr className="my-4" />

                                                                <h5 className="card-title mb-3">Shipping info</h5>

                                                                <div className="row">
                                                                    <div className="col-sm-8 mb-3">
                                                                        <p className="mb-0">Address</p>
                                                                        <div className="form-outline">
                                                                            <input type="text" onChange={e => setData({ ...data, address: e.target.value })} id="typeText" placeholder="Type here" className="form-control" />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-sm-4 mb-3">
                                                                        <p className="mb-0">City</p>
                                                                        <div className="form-outline">
                                                                            <input type="text" onChange={e => setData({ ...data, city: e.target.value })} id="typeText" placeholder="Type here" className="form-control" />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-sm-4 mb-3">
                                                                        <p className="mb-0">State</p>
                                                                        <div className="form-outline">
                                                                            <input type="text" onChange={e => setData({ ...data, state: e.target.value })} id="typeText" placeholder="Type here" className="form-control" />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-sm-4 col-6 mb-3">
                                                                        <p className="mb-0">Country</p>
                                                                        <div className="form-outline">
                                                                            <input type="text" onChange={e => setData({ ...data, country: e.target.value })} id="typeText" placeholder="Type here" className="form-control" />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-sm-4 col-6 mb-3">
                                                                        <p className="mb-0">Zip Code</p>
                                                                        <div className="form-outline">
                                                                            <input type="text" onChange={e => setData({ ...data, zip_code: e.target.value })} id="typeText" placeholder="Type here" className="form-control" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <hr className="my-4" />

                                                                <h5 className="card-title mb-3">Payment info</h5>

                                                                <div className="col-sm-4 mb-3">
                                                                    <p className="mb-0">Select Payment Mode</p>
                                                                    <select className="form-select">
                                                                        <option value="1">Cash On Delivery</option>
                                                                        {/* <option value="2">Moscow</option>
                                                                            <option value="3">Samarqand</option> */}
                                                                    </select>
                                                                </div>

                                                                <div className="float-end">
                                                                    <button type='submit' disabled className="btn btn-success shadow-0 border">Place Order</button>
                                                                </div>
                                                            </form>
                                                            <div className="float-end">
                                                                <button type='submit' onClick={genbill} className="btn btn-success shadow-0 border">Generate Invoice</button>
                                                            </div>
                                                        </div>


                                                    </div>


                                                </div>
                                                <div className="col-xl-4 col-lg-4 d-flex justify-content-center justify-content-lg-end">
                                                    <div className="ms-lg-4 mt-4 mt-lg-0" style={{ maxWidth: '320px' }}>
                                                        <h6 className="mb-3">Summary</h6>
                                                        <hr />
                                                        <div className="d-flex justify-content-between">
                                                            <p className="mb-2">Total Items:</p>
                                                            <p className="mb-2 fw-bold">{tot_pro_atc}</p>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <p className="mb-2">Total price:</p>
                                                            <p className="mb-2 fw-bold">${tot_price_atc}</p>
                                                        </div>

                                                        <hr />
                                                        <h6 className="text-dark my-4">Items in cart</h6>
                                                        {
                                                            data1.map((product, index) => {
                                                                return <>  <div key={index} className="d-flex align-items-center mb-4">
                                                                    <div className="me-3 position-relative">
                                                                        <img src={'https://rvmserver.onrender.com/images/' + product.image} style={{ height: '96px', width: '96px' }} className="img-sm rounded border" />
                                                                    </div>
                                                                    <div className="">
                                                                        <div className="nav-link text-muted">
                                                                            {product.com_name}
                                                                        </div>
                                                                        <div className="nav-link">
                                                                            {product.about}
                                                                        </div>
                                                                        <div className="price text-muted">Price: ${product.price}</div>
                                                                    </div>
                                                                </div>
                                                                </>

                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </>
                            )
                        }
                    </>


                )

                :

                (
                    <>

                        <nav className="navbar navbar-expand-lg bg-warning">
                            <div className="container-fluid">
                                <Link to="/" title='rVm Collection' className="navbar-brand fs-4 p-3"><img src={logo} width="80px" /></Link>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className=" li1 nav-item ">
                                            <Link to="/" style={{ width: 'fit-content' }} className="nav-link active" aria-current="page" href="#">Home</Link>
                                        </li>
                                        <li className="li1 nav-item">
                                            <Link to="/addtocart" className="nav-link active mx-2" style={{ width: 'fit-content' }} href="#">Add To Cart</Link>
                                        </li>
                                        <li className="nav-item mx-2">
                                            <a className="nav-link disabled">CheckOut</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>






                        <section className="py-5" style={{ backgroundColor: '#d2c9ff' }}>
                            <div className="container">
                                <div className="row" >
                                    <div className="col-xl-8 col-lg-8 mb-4">
                                        <div className="card shadow-0 border">

                                            <div className="p-4">
                                                <h3 className="card-title mb-3">Complete Your Order</h3>
                                                <div className='text-danger'>
                                                    {error && error}
                                                </div>

                                                <form onSubmit={handleSubmit}>
                                                    <div className="row">
                                                        <h5 className="card-title mb-3">User info</h5>
                                                        <div className="col-6 mb-3">
                                                            <p className="mb-0">First name</p>
                                                            <div className="form-outline">
                                                                <input type="text" onChange={e => setData({ ...data, firstname: e.target.value })} id="typeText" placeholder="Type here" className="form-control" />
                                                            </div>
                                                        </div>

                                                        <div className="col-6">
                                                            <p className="mb-0">Last name</p>
                                                            <div className="form-outline">
                                                                <input type="text" onChange={e => setData({ ...data, lastname: e.target.value })} id="typeText" placeholder="Type here" className="form-control" />
                                                            </div>
                                                        </div>

                                                        <div className="col-6 mb-3">
                                                            <p className="mb-0">Phone</p>
                                                            <div className="form-outline">
                                                                <input type="text" onChange={e => setData({ ...data, phone: e.target.value })} id="typePhone" placeholder="Type here" className="form-control" />
                                                            </div>
                                                        </div>

                                                        <div className="col-6 mb-3">
                                                            <p className="mb-0">Email</p>
                                                            <div className="form-outline">
                                                                <input type="email" onChange={e => setData({ ...data, email: e.target.value })} id="typeEmail" placeholder="example@gmail.com" className="form-control" />
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <hr className="my-4" />

                                                    <h5 className="card-title mb-3">Shipping info</h5>

                                                    <div className="row">
                                                        <div className="col-sm-8 mb-3">
                                                            <p className="mb-0">Address</p>
                                                            <div className="form-outline">
                                                                <input type="text" onChange={e => setData({ ...data, address: e.target.value })} id="typeText" placeholder="Type here" className="form-control" />
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-4 mb-3">
                                                            <p className="mb-0">City</p>
                                                            <div className="form-outline">
                                                                <input type="text" onChange={e => setData({ ...data, city: e.target.value })} id="typeText" placeholder="Type here" className="form-control" />
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-4 mb-3">
                                                            <p className="mb-0">State</p>
                                                            <div className="form-outline">
                                                                <input type="text" onChange={e => setData({ ...data, state: e.target.value })} id="typeText" placeholder="Type here" className="form-control" />
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-4 col-6 mb-3">
                                                            <p className="mb-0">Country</p>
                                                            <div className="form-outline">
                                                                <input type="text" onChange={e => setData({ ...data, country: e.target.value })} id="typeText" placeholder="Type here" className="form-control" />
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-4 col-6 mb-3">
                                                            <p className="mb-0">Zip Code</p>
                                                            <div className="form-outline">
                                                                <input type="text" onChange={e => setData({ ...data, zip_code: e.target.value })} id="typeText" placeholder="Type here" className="form-control" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr className="my-4" />

                                                    <h5 className="card-title mb-3">Payment info</h5>

                                                    <div className="col-sm-4 mb-3">
                                                        <p className="mb-0">Select Payment Mode</p>
                                                        <select className="form-select">
                                                            <option value="1">Cash On Delivery</option>
                                                            {/* <option value="2">Moscow</option>
                                                <option value="3">Samarqand</option> */}
                                                        </select>
                                                    </div>

                                                    <div className="float-end">
                                                        <button type='submit' className="btn btn-success shadow-0 border">Place Order</button>
                                                    </div>
                                                </form>
                                            </div>


                                        </div>


                                    </div>
                                    <div className="col-xl-4 col-lg-4 d-flex justify-content-center justify-content-lg-end">
                                        <div className="ms-lg-4 mt-4 mt-lg-0" style={{ maxWidth: '320px' }}>
                                            <h6 className="mb-3">Summary</h6>
                                            <hr />
                                            <div className="d-flex justify-content-between">
                                                <p className="mb-2">Total Items:</p>
                                                <p className="mb-2 fw-bold">{tot_pro_atc}</p>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <p className="mb-2">Total price:</p>
                                                <p className="mb-2 fw-bold">${tot_price_atc}</p>
                                            </div>

                                            <hr />
                                            <h6 className="text-dark my-4">Items in cart</h6>
                                            {
                                                data1.map((product, index) => {
                                                    return <>  <div key={index} className="d-flex align-items-center mb-4">
                                                        <div className="me-3 position-relative">
                                                            <img src={'https://rvmserver.onrender.com/images/' + product.image} style={{ height: '96px', width: '96px' }} className="img-sm rounded border" />
                                                        </div>
                                                        <div className="">
                                                            <div className="nav-link text-muted">
                                                                {product.com_name}
                                                            </div>
                                                            <div className="nav-link">
                                                                {product.about}
                                                            </div>
                                                            <div className="price text-muted">Price: ${product.price}</div>
                                                        </div>
                                                    </div>
                                                    </>

                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )
            }

        </>
    )
}

export default CheckOut
