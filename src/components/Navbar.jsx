import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
const Navbar = () => {

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
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link to="/Reports" className="nav-link">Home</Link>
                            <Link to="/Reports" className="nav-link">View Reports</Link>
                            <Link to="/createReport" className="nav-link">Create Report</Link>
                            <Link to="/" className="nav-link fw-semibold">Sign Out</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar