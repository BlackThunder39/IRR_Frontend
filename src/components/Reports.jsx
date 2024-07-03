import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Container, Form, Button , Row, Col } from 'react-bootstrap';
import Navbar from "../components/Navbar"
const Reports = () => {

    useEffect(() => {
        if(localStorage.getItem("isLoggedIn")=="false"){
            window.location.replace("http://localhost:5173");
        }
    }, []);
    const [reports, setReports] = useState([]);
    const [searchText, setSearchText] = useState("");

    const fetchReports = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/reports');
            console.log(response.data);
            setReports(response.data);
        } catch (error) {
            console.error('Error fetching reports:', error);
        }
    };

    const fetchSearchResults = async (query) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/search/${query}`);
            setReports(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchText.trim()) {
            fetchSearchResults(searchText);
        }
    };

    return (
        <>
        <Navbar />
        <Container>
            <h1 className='text-center my-4'>Reports</h1>
            <Form className="mb-4" onSubmit={handleSearchSubmit}>
            <Row className="align-items-center">
                <Col xs={10}>
                    <Form.Group controlId="search">
                        <Form.Control
                            type="text"
                            placeholder="Enter the UUID, Fr. No, Device's Name or Author's CPF"
                            value={searchText}
                            onChange={handleSearchChange}
                        />
                    </Form.Group>
                </Col>
                <Col xs={2}>
                    <Button variant="primary" type="submit" className="w-100">Search</Button>
                </Col>
            </Row>
        </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>FR No</th>
                        <th>Format No</th>
                        <th>Inspection And Testing</th>
                        <th>Safety Devices</th>
                        <th>Inspection Frequency</th>
                        <th>Test Procedure</th>
                        <th>Test Date</th>
                        <th>Author</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report.uuid}>
                            <td>
                                <Link to={`/reports/${report.uuid}`}>{report.frNo}</Link>
                            </td>
                            <td>{report.formatNo}</td>
                            <td>{report.inspectionAndTesting}</td>
                            <td>{report.safetyDevices}</td>
                            <td>{report.inspectionFrequency}</td>
                            <td>{report.testProcedure}</td>
                            <td>{report.testDate}</td>
                            <td>{report.author}</td>
                            <td>{report.timeStamp}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
        </>
    );
};

export default Reports;
