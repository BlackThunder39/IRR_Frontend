import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../Styles/Login.css';

const Login = () => {

    useEffect(() => {
        localStorage.setItem("isLoggedIn", "false");
    }, []);

    const [CPF, setCPF] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const updateCPF = (e) => {
        setCPF(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/login', {
                cpf: CPF,
                password: password
            });
            console.log(response.data.length);
            if (response.data.length != 0) {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("cpf", CPF);
                console.log("logged in!!");
                setLoggedIn(true);

                window.location.replace("http://localhost:5173/Reports");
            } else {
                console.log('Verification failed');
                setLoginError(true);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const redirectToCreateReport = () => {

    };

    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand fs-2 fw-semibold text-center" href="#">
                        <img src="https://ongcindia.com/documents/77751/1767704/2201_logojpg.jpg/0da1ed25-6080-dc19-7100-a5010d5dca86" alt="Logo" height="50" className="d-inline-block align-text-top" />
                        &nbsp;&nbsp;Inspection and Reporting Requirements (IRR) for Offshore Process Complex
                    </a>
                </div>
            </nav>
            <div id="loginFormContainer">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card shadow"  id="loginForm">
                                <div className="card-body">
                                    <h3 className="card-title text-center mb-4">Login</h3>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="CPFNo" className="form-label">CPF Number:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="CPF Number"
                                                onChange={updateCPF}
                                                id="CPFInput"
                                                value={CPF}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="Password" className="form-label">Password:</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                onChange={updatePassword}
                                                id="PasswordInput"
                                                value={password}
                                            />
                                        </div>
                                        <div className="d-grid">
                                            <button type="submit" className="btn btn-danger">Submit</button>
                                        </div>
                                        {loginError && (
                                            <p className="text-danger mt-2">Verification failed. Please check your credentials.</p>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3 justify-content-center">
                        <div className="col-md-6">
                            <div className="text-center">
                                {redirectToCreateReport()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
            );
}

            export default Login;
