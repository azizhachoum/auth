import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Register = () => {
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    const [error, setError] = useState("");
  const navigate = useNavigate()
    const submit = async (e) => {
      try{
        const data = {name, email, password}

        e.preventDefault()
        await axios.post('http://localhost:3000/api/auth/register', data )
        navigate('/login')
          
     } catch(error){
      setError("Invalid inputs");
  }
    

  }    
  const style = {

    formControl: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      border: "none",
      borderRadius: "0.5rem",
      color: "#fff"
    }
  }

  return (
    <>

      <section className="vh-100">
        <div className="container py-5 h-100">
        <img src="https://www.cytekia.com/assets/imgs/logo.png" alt="Logo" style={{ width: "200px", height: "auto", position: "absolute", top: "10px", left: "10px" }} />
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card ">
                <div className="card-body p-5 text-center">
                  <form onSubmit={submit}>
                    <div className="pb-5">
                      <h2 className="fw-bold mb-2 text-uppercase form-label">
                      Register
                      </h2>
                      <p className="text-white-50 mb-5 form-label">
                      Please sign up!
                      </p>

                      <div className="form-outline form-white mb-4">
                        <input
                          type="name"
                          onChange={(e) => setName(e.target.value)}
                          className="form-control form-control-lg"
                          style={style.formControl}
                        />
                        <label className="form-label" htmlFor="typeNameX">
                          Name
                        </label>
                      </div>

                      <div className="form-outline form-white mb-4">
                        <input
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control form-control-lg"
                          style={style.formControl}
                        />
                        <label className="form-label" htmlFor="typeEmailX">
                          Email
                        </label>
                      </div>

                      <div className="form-outline form-white mb-4">
                        <input type="password" onChange={(e) => setPassword(e.target.value)}
                          className="form-control form-control-lg "
                          style={style.formControl}
                        />
                        <label
                          className="form-label"
                          htmlFor="typePasswordX"
                        >
                          Password
                        </label>
                      </div>
                      <p style={{ color: "red" }}>{error}</p>
                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                  <p className="small mb-5 pb-lg-2">
                    <Link to="/login" className="text-white-50" href="#!">
                    Already have an account? Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>
</section>
</>
  
  )
}

export default Register