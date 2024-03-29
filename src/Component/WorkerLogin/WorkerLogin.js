import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../Images/Indoor.png';
import plumber from '../Images/plumber.png';


import './WorkerLogin.css';
function Login() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('worker-info')) {
      alert("You Need to LogOut");
      history.push("/")
    }

  }, [])
  async function login() {

    let data = {
      "username": name,
      "password": password
    }
    await fetch('https://anonymousunknown.pythonanywhere.com/account/login/token/', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((result) => {
        result.json().then((response) => {
          localStorage.setItem("token", response.access)
          localStorage.setItem('worker-info', JSON.stringify(response))
          history.push('/');
        })
      })
    }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent fixed-top" style={{ height: '5em' }} >
        <div className="container-fluid">
          <form className="d-flex">
            <Link to="/"><button className="btn btn-outline-success" type="submit">Home</button></Link>
          </form>
        </div>
      </nav>


      <section className="form log">
        <div className="container">
          <div className="row no-gutters log2">
            <div className=" col-lg-5">
              <img src={plumber} className="img-fluid" alt="" />
            </div>
            <div className=" col-lg-7 px-5 ">
              <h1 className="font-weight-bold py-3"><span><img src={logo} className="bd-placeholder-img  m-2 " alt="" width="50em" height="50em" /></span>INDOOR</h1>
              <h5 className="text-muted" >Sign into your account</h5>
              <section className="form">
                <div className="form-row">
                  <div className="col-lg-9">
                    <input className="form-control my-3 p-2" type="text" placeholder="User Name" required="required"
                      onChange={(e) => setName(e.target.value)} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-lg-9">
                    <input className="form-control my-3 p-2" type="password" placeholder="password" required="required"
                      onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-lg-7">
                    <button className="btn1 my-3 p-2" type="submit" onClick={login}>Login</button>
                  </div>
                </div>
                <a href="/">Forget password</a>
                <p>Don't have an account? <Link to="/WorkerRegister">Register here</Link></p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Login;


