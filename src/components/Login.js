import { useState } from "react";
import { HiOutlineMail, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { Link } from "react-router-dom";
import axios from "axios";
import './style.css'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate()

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      navigate('/home', {replace : true})
    } catch (error) {
      setError("Invalid email or password");
    }
    setIsLoading(false);
  };

  const style = {
    formControl: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      border: "none",
      borderRadius: "0.5rem",
      color: "#fff"
    }
  };

  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card ">
                <div className="card-body p-5 text-center">
                  <form onSubmit={submit}>
                    <div className=" pb-5">
                      <h2 className="fw-bold mb-2 text-uppercase form-label">
                        Login
                      </h2>
                      <p className="text-white-50 mb-5 form-label">
                        Please enter your login and password!
                      </p>

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
                        <HiOutlineMail size={25} color="#fff" style={{marginLeft: "10px"}} />
                      </div>

                      <div className="form-outline form-white mb-4">
                        <input
                          type={passwordVisible ? "text" : "password"}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control form-control-lg "
                          style={style.formControl}
                        />
                        <label
                          className="form-label"
                          htmlFor="typePasswordX"
                        >
                          Password
                        </label>
                        <button
                          type="button"
                          className="btn btn-link text-white"
                          onClick={handlePasswordVisibility}
                        >
                          {passwordVisible ? (
                            <HiOutlineEye size={25} color="#fff"
                            />
                          ) : (
                            <HiOutlineEyeOff size={25} color="#fff" />
                          )}
                        </button>
                      </div>
                      <p style={{ color: "red" }}>{error}</p>
                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="spinner-border text-light" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          "Login"
                        )}
                      </button>
                       </div>
                       </form>
                       <p className="small mb-5 pb-lg-2">
                       <Link to="/register" className="text-white-50 " href="#!">
                       Sign In?
                       </Link>
                       </p>
                       </div>
                       </div>
                       </div>
                       </div>
                       </div>
                       </section>
                       </>
                       );
                       };
                       
                       export default Login;