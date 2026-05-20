import { useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";

const Classroom = () => {
    const [stu, setStu] = useState([]);

    useEffect(() => {
        fetch("https://cs571.org/rest/s25/hw4/students", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
            },
        })
            .then((req) => req.json())
            .then((data) => {
                setStu(data);
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
            <Container fluid>
                <Row>{/* TODO Students go here! */}</Row>
            </Container>
            <p>There are {stu.length} student(s) matching your research</p>
        </div>
    );
};

export default Classroom;
