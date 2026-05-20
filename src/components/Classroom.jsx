import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import Student from "./Student.jsx";

const Classroom = () => {
    const [stus, setStus] = useState([]);

    useEffect(() => {
        fetch("https://cs571.org/rest/s25/hw4/students", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
            },
        })
            .then((req) => req.json())
            .then((data) => {
                setStus(data);
                console.log(data);
            });
    }, []);

    return (
        <div>
            <h1>Badger Book</h1>
            <p>Search for students below!</p>
            <hr />
            <Form>
                <Form.Label htmlFor="searchName">Name</Form.Label>
                <Form.Control id="searchName" />
                <Form.Label htmlFor="searchMajor">Major</Form.Label>
                <Form.Control id="searchMajor" />
                <Form.Label htmlFor="searchInterest">Interest</Form.Label>
                <Form.Control id="searchInterest" />
                <br />
                <Button variant="neutral">Reset Search</Button>
            </Form>
            <p>There are {stus.length} student(s) matching your research</p>
            <Container fluid>
                <Row>
                    {stus.map((stu) => (
                        <Col key={stu.id} xs={12} sm={12} md={6} lg={4} xl={3}>
                            <Student {...stu} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Classroom;
