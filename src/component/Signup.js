import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import logo from './logo.png'

function Signup() {

  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    image: ''
  })

  const [error, setError] = useState('')

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("firstname", values.firstname);
    formData.append("lastname", values.lastname);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("image", values.image);


    axios.post('http://localhost:3494/signup', formData)
      .then(res => {
        if (res.data.Status === 'Success') {
          navigate('/Login')
        }
        else {
          setError(res.data.Error)
        }
      })
      .then(err => console.log(err))
  }




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
              {/* <li className=" li1 nav-item mx-3">
                <Link to="/addtocart" style={{ width: 'fit-content' }} className="nav-link active" aria-current="page" href="#">Add to Cart</Link>
              </li> */}
              <li className="nav-item mx-4">
                <a className="nav-link disabled">Sign Up</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>






      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid" alt="Phone image" />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <h1>Create an Account</h1>
              <div className='text-danger'>
                {error && error}
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-floating form-outline mb-4">
                  <input type="text" onChange={e => setValues({ ...values, firstname: e.target.value })} id="form1Example13" placeholder="Frist Name"
                    className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="floatingInput form1Example13">Frist Name</label>
                </div>
                <div className="form-floating form-outline mb-4">
                  <input type="text" onChange={e => setValues({ ...values, lastname: e.target.value })} id="form1Example13" placeholder="Last Name"
                    className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="floatingInput form1Example13">Last Name</label>
                </div>
                <div className="form-floating form-outline mb-4">
                  <input type="email" onChange={e => setValues({ ...values, email: e.target.value })} id="form1Example13" placeholder="Email address"
                    className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="floatingInput form1Example13">Email address</label>
                </div>

                <div className="form-floating form-outline mb-4">
                  <input type="password" onChange={e => setValues({ ...values, password: e.target.value })} id="form1Example23" placeholder="Password"
                    className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="floatingInput form1Example23">Password</label>
                </div>
                <div className="col-12 mb-3">
                  <label className="form-label" for="inputGroupFile01">Select Profile</label>
                  <input type="file" onChange={e => setValues({ ...values, image: e.target.files[0] })} className="form-control" id="inputGroupFile01" />
                </div>

                {/* <div className="justify-content-around mb-4">
                <a href="#!">Forgot password?</a>
              </div> */}
                <button type="submit" className="btn btn-outline-primary btn-lg btn-block">Create Account</button>

                <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to='/Login'><a href="#!"
                  className="fw-bold text-body"><u>Login here</u></a></Link></p>
              </form>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Signup
