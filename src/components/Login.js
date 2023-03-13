import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './style.css'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate()


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
                        disabled={isLoading}
                        type="submit"
                      >
                        Login
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
</>)}
export default Login;