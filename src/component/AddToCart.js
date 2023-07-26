import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from './logo.png'
import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.css';


// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';





function AddToCart() {

    const [data, setData] = useState([]);

    const [tot_pro_atc, setTot_pro_atc] = useState('');
    const [tot_price_atc, setTot_price_atc] = useState('');




    useEffect(() => {
        axios.get('https://rvmserver.onrender.com/addtocart')
            .then(res => {
                if (res.data.Status === 'Success') {
                    setData(res.data.Result)
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

    const handleDelete = (id) => {
        axios.delete('https://rvmserver.onrender.com/pro_delete_atc/' + id)
            .then(res => {
                if (res.data.Status === "Success") {
                    // window.location.reload(true);
                    // toast.success(res.data.Status, {
                    //     position: "bottom-left",
                    //     autoClose: 5000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: true,
                    //     draggable: true,
                    //     progress: undefined,
                    //     theme: "dark",
                    // });
                }
                else {
                    alert(res.data.Error)
                }
            }).catch(err => console.log(err))
    }

    const [isPriceZero, setIsPriceZero] = useState('');
    useEffect(() => {
        if (tot_price_atc) {
            setIsPriceZero(true)
        }
        else {
            setIsPriceZero(false)
        }
    })









    return (
        <>

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
                            <li className="nav-item mx-4">
                                <a className="nav-link disabled">Add To Cart</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>





            <section class="h-100 h-custom" style={{ backgroundColor: '#d2c9ff' }}>
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-12">
                            <div class="card card-registration card-registration-2" style={{ borderRadius: '15px' }}>
                                <div class="card-body p-0">
                                    <div class="row g-0">
                                        <div class="col-lg-8">
                                            <div class="p-5">
                                                <div class="d-flex justify-content-between align-items-center mb-5">
                                                    <h1 class="fw-bold mb-0 text-black">Shopping Cart</h1>
                                                    <h6 class="mb-0 text-muted">{tot_pro_atc} items</h6>
                                                </div>
                                                {
                                                    data.map((product, index) => {
                                                        return <>
                                                            <hr class="my-4" />
                                                            <div class="row mb-4 d-flex justify-content-between align-items-center">
                                                                <div class="col-md-2 col-lg-2 col-xl-2">
                                                                    <img
                                                                        src={'https://rvmserver.onrender.com/images/' + product.image}
                                                                        class="img-fluid rounded-3" alt="Cotton T-shirt" />
                                                                </div>
                                                                <div class="col-md-3 col-lg-3 col-xl-3">
                                                                    <h6 class="text-muted">{product.com_name}</h6>
                                                                    <h6 class="text-black mb-0">{product.about}</h6>
                                                                </div>


                                                                {/* <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                                    <button class="btn btn-link px-2">
                                                                        <i class="bi bi-file-minus"></i>
                                                                    </button>
                                                                    <input id="form1" min="0" name="quantity" value="1" type="number"
                                                                        class="form-control form-control-sm" />
                                                                    <button class="btn btn-link px-2">
                                                                        <i class="bi bi-file-plus"></i>
                                                                    </button>
                                                                </div> */}


                                                                <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                                    <h6 class="mb-0">${product.price}</h6>
                                                                </div>

                                                                <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                                                    <i title="Delete" onClick={e => handleDelete(product.product_id)} class="bi bi-trash" style={{ cursor: 'pointer' }}></i>

                                                                </div>
                                                                {/* <ToastContainer /> */}

                                                            </div>
                                                            <hr class="my-4" />
                                                        </>
                                                    })
                                                }

                                                <div class="pt-5">
                                                    <Link to="/"><h6 class="mb-0"><a href="#!" class="text-body"><i
                                                        class="fas fa-long-arrow-alt-left me-2"></i>Back to shop</a></h6></Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4" style={{ backgroundColor: '#cecece', borderRadius: '0 15px 15px 0' }}>
                                            <div class="p-5">
                                                <h3 class="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                                                <hr class="my-4" />

                                                <div class="d-flex justify-content-between mb-4">
                                                    <h5 class="text-uppercase">items {tot_pro_atc}</h5>
                                                    <h5>${tot_price_atc}</h5>
                                                </div>

                                                <hr class="my-4" />

                                                <div class="d-flex justify-content-between mb-5">
                                                    <h5 class="text-uppercase">delivery Charges</h5>
                                                    <h5>$0.00</h5>
                                                </div>
                                                <div class="d-flex justify-content-between mb-5">
                                                    <h5 class="text-uppercase">Discount</h5>
                                                    <h5>$0.00</h5>
                                                </div>
                                                <div class="d-flex justify-content-between mb-5">
                                                    <h5 class="text-uppercase">Taxes</h5>
                                                    <h5>$0.00</h5>
                                                </div>

                                                <hr class="my-4" />

                                                <div class="d-flex justify-content-between mb-5">
                                                    <h5 class="text-uppercase">Sub Total</h5>
                                                    <h5>${tot_price_atc}</h5>
                                                </div>

                                                {/* <Link to='/checkout'><button type="button" class="btn btn-dark btn-block btn-lg"
                                                    data-mdb-ripple-color="dark">Proceed To Checkout</button></Link> */}

                                                {
                                                    isPriceZero ? (<Link to='/checkout'><button type="button" class="btn btn-dark btn-block btn-lg"
                                                        data-mdb-ripple-color="dark">Proceed To Checkout</button></Link>)
                                                        : (<button type="button" disabled class="btn btn-dark btn-block btn-lg"
                                                            data-mdb-ripple-color="dark">Proceed To Checkout</button>)
                                                }

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}


export default AddToCart

