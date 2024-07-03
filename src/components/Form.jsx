import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form as BootstrapForm, Button, Row, Col, Container, Card } from 'react-bootstrap';
import Navbar from "../components/Navbar"
const Form = () => {

    useEffect(() => {
        if(localStorage.getItem("isLoggedIn")=="false"){
            window.location.replace("http://localhost:5173");
        }
    }, []);

    const [formats, setFormats] = useState([]);
    const [report, setReport] = useState({
        uuid: '',
        frNo: '',
        formatNo: '',
        inspectionAndTesting: '',
        safetyDevices: '',
        inspectionFrequency: '',
        testProcedure: '',
        testDate: '',
        safetyDevicesNo: 1,
        author: localStorage.getItem("cpf"),
    });
    const [devices, setDevices] = useState([
        {
            uuid: '',
            srno: 1,
            safetyDevice: '',
            safetyDeviceTag: '',
            activity: '',
            observation: '',
            testProcedure: '',
            requirements: '',
            remarks: '',
        },
    ]);

    const getFormatData = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/getAllFormats');
            setFormats(res.data);
        } catch (error) {
            console.error('Error fetching formats:', error);
        }
    };

    useEffect(() => {
        getFormatData();
    }, []);

    const handleReportChange = (e) => {
        const { name, value } = e.target;

        if (name === 'frNo') {
            console.log('frNo Set:', value);

            let obj = formats.find(o => o.frNo === value);
            console.log('Found object:', obj);

            if (obj) {
                setReport({
                    uuid: '',  // uuid handled by backend
                    frNo: obj.frNo,
                    formatNo: obj.formatNo,
                    inspectionAndTesting: obj.inspectionAndTesting,
                    safetyDevices: obj.safetyDevices,
                    inspectionFrequency: obj.inspectionFrequency,
                    testProcedure: obj.testProcedure,
                    testDate: obj.testDate,
                    safetyDevicesNo: 1,
                    author: report.author,
                });

            }
        } else {
            setReport((prevReport) => ({ ...prevReport, [name]: value }));
        }

        // console.log('Changed field:', name);
        // console.log('Current formats:', formats);
    };

    const handleDeviceChange = (index, e) => {
        const { name, value } = e.target;
        const newDevices = devices.slice();
        newDevices[index][name] = value;
        console.log(newDevices);
        setDevices(newDevices);
    };

    const addDevice = () => {
        setDevices((prevDevices) => [
            ...prevDevices,
            {
                uuid: '',
                srno: prevDevices.length + 1,
                safetyDevice: '',
                safetyDeviceTag: '',
                activity: '',
                observation: '',
                testProcedure: '',
                requirements: '',
                remarks: '',
            },
        ]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const finalData = {
            report: {
                ...report,
                timestamp: ''  // ensure timestamp is blank
            },
            devices,
        };
        console.log("Sending the data:");
        console.log(finalData);
        try {
            const res = await axios.post('http://localhost:8080/api/reports', finalData);
            console.log('Response:', res);
            window.location.replace("http://localhost:5173/Reports");
        } catch (error) {
            console.error('Error submitting report:', error);
        }
    };

    return (
        <>
        <Navbar />
        <Container>
            <br />
            <h1 className='text-center'>New Report</h1>
            <Card border="secondary">
                <Card.Body>
                    <BootstrapForm onSubmit={handleSubmit}>
                        <h2>Report Details</h2>
                        <Row>
                            <Col>
                                <BootstrapForm.Group controlId="formatNo">
                                    <BootstrapForm.Label>Format No</BootstrapForm.Label>
                                    <BootstrapForm.Select
                                        name="frNo"
                                        value={report.frNo}
                                        onChange={handleReportChange}
                                        required
                                    >
                                        <option value="">Select Format No</option>
                                        {formats.map((item) => (
                                            <option key={item.id} value={item.frNo}>
                                                {item.frNo}
                                            </option>
                                        ))}
                                    </BootstrapForm.Select>
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
                                        onChange={handleReportChange}
                                        required
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
                                        onChange={handleReportChange}
                                        required
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
                                        onChange={handleReportChange}
                                        required
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
                                        onChange={handleReportChange}
                                        required
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
                                        onChange={handleReportChange}
                                        required
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
                                        value={localStorage.getItem("cpf")}
                                        onChange={handleReportChange}
                                        required
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
                                                    onChange={(e) => handleDeviceChange(index, e)}
                                                    required
                                                    disabled
                                                />
                                            </BootstrapForm.Group>
                                        </Col>
                                        <Col>
                                            <BootstrapForm.Group controlId={`safetyDevice-${index}`}>
                                                <BootstrapForm.Label>Safety Device</BootstrapForm.Label>
                                                {/* <BootstrapForm.Control
                                                    type="text"
                                                    name="safetyDevice"
                                                    value={device.safetyDevice}
                                                    onChange={(e) => handleDeviceChange(index, e)}
                                                    required
                                                /> */}
                                                <BootstrapForm.Select
                                                    name="safetyDevice"
                                                    value={device.safetyDevice}
                                                    onChange={(e) => handleDeviceChange(index, e)}
                                                    required
                                                >
                                                    <option value="">Select Safety Device</option>
                                                    {report.safetyDevices.split(",").map((item) => (
                                                        <option key={item} value={item}>
                                                            {item}
                                                        </option>
                                                    ))}
                                                </BootstrapForm.Select>
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
                                                    onChange={(e) => handleDeviceChange(index, e)}
                                                    required
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
                                                    onChange={(e) => handleDeviceChange(index, e)}
                                                    required
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
                                                    onChange={(e) => handleDeviceChange(index, e)}
                                                    required
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
                                                    onChange={(e) => handleDeviceChange(index, e)}
                                                    required
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
                                                    onChange={(e) => handleDeviceChange(index, e)}
                                                    required
                                                />
                                            </BootstrapForm.Group>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        ))}
                        <Button variant="primary" onClick={addDevice}>
                            Add Device
                        </Button>
                        <Button variant="success" type="submit" className="ms-2">
                            Submit
                        </Button>
                    </BootstrapForm>
                </Card.Body>
            </Card>
        </Container>
        </>
    );
};

export default Form;