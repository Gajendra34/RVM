import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from './logo.png'
import axios from 'axios'

function AddProduct() {

    const [data, setData] = useState({
        com_name: '',
        about: '',
        price: '',
        image: ''
    })


    const navigate = useNavigate();

    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("com_name", data.com_name);
        formData.append("about", data.about);
        formData.append("price", data.price);
        formData.append("image", data.image);


        axios.post('http://localhost:3494/add_product', formData)
            .then(res => {
                if (res.data.Status === 'Success') {
                    navigate('/')
                }
                else {
                    setError(res.data.Error)
                }
            })
            .then(err => console.log(err))
    }


    axios.defaults.withCredentials = true;


    useEffect(() => {
        axios.get('http://localhost:3494/addproduct_page')
            .then(res => {
                if (res.data.Status === 'Success') {
                    if (res.data.role === 'customer') {
                        // navigate('/addproduct')
                    }
                    else {
                        navigate('/')
                    }
                }
                else {
                    navigate('/')
                }
            })
    })




    const [all_cate, setAll_cate] = useState('');
    const [all_item, setAll_item] = useState('');
    const [all_user, setAll_user] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3494/all_cate')
            .then(res => {
                setAll_cate(res.data[0].cate)
            })
            .catch(err => {
                console.log(err);
            })

        axios.get('http://localhost:3494/all_item')
            .then(res => {
                setAll_item(res.data[0].item)
            })
            .catch(err => {
                console.log(err);
            })

        axios.get('http://localhost:3494/all_user')
            .then(res => {
                setAll_user(res.data[0].user)
            })
            .catch(err => {
                console.log(err);
            })
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
                                <a className="nav-link disabled">Add Product</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>








            <div className='working-panel text-white p-3 d-flex justify-content-around'>
                <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                    <div className='pb-1'>
                        <h4>All Category</h4>
                    </div>
                    <hr />
                    <div className=''>
                        <h5>Total:{all_cate}</h5>
                    </div>
                </div>
                <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                    <div className='pb-1'>
                        <h4>All Items</h4>
                    </div>
                    <hr />
                    <div className=''>
                        <h5>Total:{all_item}</h5>
                    </div>
                </div>
                <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                    <div className='pb-1'>
                        <h4>All Users</h4>
                    </div>
                    <hr />
                    <div className=''>
                        <h5>Total:{all_user} </h5>
                    </div>
                </div>
            </div>


















            <section className="add_pro vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <div className='p-2 d-flex justify-content-center fs-1'>
                                <p>Add Product</p>
                            </div>
                            <div className='text-danger'>
                                {error && error}
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating form-outline mb-4">
                                    <input type="text" onChange={e => setData({ ...data, com_name: e.target.value })} id="form1Example13" placeholder="Compant Name"
                                        className="form-control form-control-lg" />
                                    <label className="form-label" htmlFor="floatingInput form1Example13">Compant Name</label>
                                </div>
                                <div className="form-floating form-outline mb-4">
                                    <input type="text" onChange={e => setData({ ...data, about: e.target.value })} id="form1Example13" placeholder="about product"
                                        className="form-control form-control-lg" />
                                    <label className="form-label" htmlFor="floatingInput form1Example13">About</label>
                                </div>
                                <div className="form-floating form-outline mb-4">
                                    <input type="text" onChange={e => setData({ ...data, price: e.target.value })} id="form1Example13" placeholder="price"
                                        className="form-control form-control-lg" />
                                    <label className="form-label" htmlFor="floatingInput form1Example13">price(in Dollar)</label>
                                </div>
                                <div className="col-12 mb-3">
                                    <label className="form-label" for="inputGroupFile01">Product Image</label>
                                    <input type="file" onChange={e => setData({ ...data, image: e.target.files[0] })} className="form-control" id="inputGroupFile01" />
                                </div>
                                <button type="submit" className="btn btn-outline-warning btn-lg btn-block">Add Product</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddProduct
