import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Form as BootstrapForm, Row, Col, Button } from 'react-bootstrap';
import Navbar from "../components/Navbar"
const ViewReport = () => {
    const { id } = useParams();
    const [report, setReport] = useState(null);
    const [devices, setDevices] = useState([]);
    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/reports/${id}`);
                console.log(response.data);
                setReport(response.data.report);
                setDevices(response.data.devices);
            } catch (error) {
                console.error('Error fetching report:', error);
                
            }
        };
        fetchReport();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/reports/${id}`);
            navigate('/reports'); // Redirect to the reports list page after deletion
        } catch (error) {
            console.error('Error deleting report:', error);
        }
    };

    if (!report) {
        return <h1 className='container'>Report  Not Found..... Check the entered ID</h1>;
    }

    return (
        <>
        <Navbar />
        <Container>
            <br />
            <h1 className='text-center'>View Report</h1>
            <br />
            <h3>Report made at {report.timeStamp} <br /> By: {report.author} </h3>
            <br />
            <h5>Report ID: {report.uuid}</h5>
            <br />
            <Card border="secondary">
                <Card.Body>
                    <h2>Report Details</h2>
                    <Row>
                        <Col>
                            <BootstrapForm.Group controlId="formatNo">
                                <BootstrapForm.Label>Format No</BootstrapForm.Label>
                                <BootstrapForm.Control
                                    type="text"
                                    name="formatNo"
                                    value={report.formatNo}
                                    disabled
                                />
                            </BootstrapForm.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <BootstrapForm.Group controlId="inspectionAndTesting">
                                <BootstrapForm.Label>Inspection And Testing</BootstrapForm.Label>
                                <BootstrapForm.Control
                                    type="text"
                                    name="inspectionAndTesting"
                                    value={report.inspectionAndTesting}
                                    disabled
                                />
                            </BootstrapForm.Group>
                        </Col>
                        <Col>
                            <BootstrapForm.Group controlId="safetyDevices">
                                <BootstrapForm.Label>Safety Devices</BootstrapForm.Label>
                                <BootstrapForm.Control
                                    type="text"
                                    name="safetyDevices"
                                    value={report.safetyDevices}
                                    disabled
                                />
                            </BootstrapForm.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <BootstrapForm.Group controlId="testProcedure">
                                <BootstrapForm.Label>Test Procedure</BootstrapForm.Label>
                                <BootstrapForm.Control
                                    type="text"
                                    name="testProcedure"
                                    value={report.testProcedure}
                                    disabled
                                />
                            </BootstrapForm.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <BootstrapForm.Group controlId="inspectionFrequency">
                                <BootstrapForm.Label>Inspection Frequency</BootstrapForm.Label>
                                <BootstrapForm.Control
                                    type="text"
                                    name="inspectionFrequency"
                                    value={report.inspectionFrequency}
                                    disabled
                                />
                            </BootstrapForm.Group>
                        </Col>
                        <Col>
                            <BootstrapForm.Group controlId="testDate">
                                <BootstrapForm.Label>Test Date</BootstrapForm.Label>
                                <BootstrapForm.Control
                                    type="date"
                                    name="testDate"
                                    value={report.testDate}
                                    disabled
                                />
                            </BootstrapForm.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <BootstrapForm.Group controlId="author">
                                <BootstrapForm.Label>Author</BootstrapForm.Label>
                                <BootstrapForm.Control
                                    type="text"
                                    name="author"
                                    value={report.author}
                                    disabled
                                />
                            </BootstrapForm.Group>
                        </Col>
                    </Row>
                    <br />
                    <h2 className='text-center'>Safety Devices</h2><br />

                    {devices.map((device, index) => (
                        <Card key={index} className="mb-3" border="secondary">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <BootstrapForm.Group controlId={`deviceSrNo-${index}`}>
                                            <BootstrapForm.Label>SR No</BootstrapForm.Label>
                                            <BootstrapForm.Control
                                                type="number"
                                                name="srno"
                                                value={device.srno}
                                                disabled
                                            />
                                        </BootstrapForm.Group>
                                    </Col>
                                    <Col>
                                        <BootstrapForm.Group controlId={`safetyDevice-${index}`}>
                                            <BootstrapForm.Label>Safety Device</BootstrapForm.Label>
                                            <BootstrapForm.Control
                                                type="text"
                                                name="safetyDevice"
                                                value={device.safetyDevice}
                                                disabled
                                            />
                                        </BootstrapForm.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <BootstrapForm.Group controlId={`safetyDeviceTag-${index}`}>
                                            <BootstrapForm.Label>Safety Device Tag</BootstrapForm.Label>
                                            <BootstrapForm.Control
                                                type="text"
                                                name="safetyDeviceTag"
                                                value={device.safetyDeviceTag}
                                                disabled
                                            />
                                        </BootstrapForm.Group>
                                    </Col>
                                    <Col>
                                        <BootstrapForm.Group controlId={`activity-${index}`}>
                                            <BootstrapForm.Label>Activity</BootstrapForm.Label>
                                            <BootstrapForm.Control
                                                type="text"
                                                name="activity"
                                                value={device.activity}
                                                disabled
                                            />
                                        </BootstrapForm.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <BootstrapForm.Group controlId={`observation-${index}`}>
                                            <BootstrapForm.Label>Observation</BootstrapForm.Label>
                                            <BootstrapForm.Control
                                                type="text"
                                                name="observation"
                                                value={device.observation}
                                                disabled
                                            />
                                        </BootstrapForm.Group>
                                    </Col>
                                    
                                </Row>
                                <Row>
                                    <Col>
                                        <BootstrapForm.Group controlId={`requirements-${index}`}>
                                            <BootstrapForm.Label>Requirements</BootstrapForm.Label>
                                            <BootstrapForm.Control
                                                type="text"
                                                name="requirements"
                                                value={device.requirements}
                                                disabled
                                            />
                                        </BootstrapForm.Group>
                                    </Col>
                                    <Col>
                                        <BootstrapForm.Group controlId={`remarks-${index}`}>
                                            <BootstrapForm.Label>Remarks</BootstrapForm.Label>
                                            <BootstrapForm.Control
                                                type="text"
                                                name="remarks"
                                                value={device.remarks}
                                                disabled
                                            />
                                        </BootstrapForm.Group>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))}
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Card.Body>
            </Card>
        </Container>
        </>
    );
};

export default ViewReport;
