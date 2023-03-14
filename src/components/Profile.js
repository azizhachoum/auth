import { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { HiOutlineMail, HiUser } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);


  const token = localStorage.getItem('accessToken');
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;

  useEffect(() => {
    const fetchProfile = async () => {
       
      try {
        const response = await axios.get(`http://localhost:3000/api/auth/profile/${userId}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        setUser(response.data.user);
        setUsername(response.data.user.name);
        setEmail(response.data.user.email);
        setPassword(response.data.user.password);
      } catch (error) {
        console.error(error);
      }
    };
    if (userId) {
      fetchProfile();
    }
  }, [userId, token]);

  const submit = async (event) => {
    event.preventDefault();
  
    try {
        setIsLoading(true);
      await axios.put(`http://localhost:3000/api/auth/profile/${userId}`, {
        username,
        email,
        password
      }, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      alert('Profile updated successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
        setIsLoading1(true);
      const response = await axios.delete(`http://localhost:3000/api/auth/profile/${userId}`);
      alert('User deleted successfully');
      // Rediriger vers la page d'accueil ou la page de connexion si l'utilisateur est déconnecté
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        navigate('/')
    } catch (error) {
      console.error(error);
    }
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
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card ">
              <div className="card-body p-5 text-center">
                <form onSubmit={submit}>
                  <div className="pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase form-label">
                    Profile
                    </h2>
                    <p className="text-white-50 mb-5 form-label">
                    Welcom {username}!
                    </p>

                    <div className="form-outline form-white mb-4">
                      <input
                      value={username}
                        type="name"
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control form-control-lg"
                        style={style.formControl}
                      />
                      <label className="form-label" htmlFor="typeNameX">
                        Name
                      </label>
                      <HiUser size={25} color="#fff" style={{marginLeft: "10px"}} />
                    </div>

                    <div className="form-outline form-white mb-4">
                    
                      <input
                      value={email}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control form-control-lg"
                        style={style.formControl}
                      />
                      <label className="form-label" htmlFor="typeEmailX">
                        Email  
                      </label>
                      <HiOutlineMail size={25} color="#fff" style={{marginLeft : "10px"}} />
                    </div>

                    <button
                        className="btn btn-outline-light btn-lg px-4"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="spinner-border text-light" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          "Update"
                        )}
                      </button>

                      <button
                      onClick={handleDelete}
                      style={{marginLeft:"20px"}}
                        className="btn btn-outline-light btn-lg px-4"
                        type="submit"
                        disabled={isLoading1}
                      >
                        {isLoading1 ? (
                          <div className="spinner-border text-light" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          "Delete"
                        )}
                      </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>
</section>
</>
  );
};

export default Profile;
