import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import Student from "./Student.jsx";

const Classroom = () => {
    const [stus, setStus] = useState([]);
    const [searchedStus, setSearchedStus] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchMajor, setSearchMajor] = useState("");
    const [searchInrst, setSearchInrst] = useState("");

    useEffect(() => {
        fetch("https://cs571.org/rest/s25/hw4/students", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
            },
        })
            .then((req) => req.json())
            .then((data) => {
                setStus(data);
                setSearchedStus(data);
                console.log(data);
            });
    }, []);

    function filterWith(name, major, inrst) {
        let filteredData = stus;
        if (name) {
            filteredData = filteredData.filter((stu) =>
                `${stu.name.first.toLowerCase()} ${stu.name.last.toLowerCase()}`.includes(
                    name.toLowerCase(),
                ),
            );
        }

        if (major) {
            filteredData = filteredData.filter((stu) =>
                stu.major.toLowerCase().includes(major.toLowerCase()),
            );
        }

        if (inrst) {
            filteredData = filteredData.filter(
                (stu) =>
                    stu.interests.filter((interest) =>
                        interest.toLowerCase().includes(inrst.toLowerCase()),
                    ).length,
            );
        }

        setSearchedStus(filteredData);
    }

    return (
        <div>
            <h1>Badger Book</h1>
            <p>Search for students below!</p>
            <hr />
            <Form>
                <Form.Label htmlFor="searchName">Name</Form.Label>
                <Form.Control
                    id="searchName"
                    value={searchName}
                    onChange={(e) => {
                        const value = e.target.value;
                        setSearchName(value);
                        filterWith(value, searchMajor, searchInrst);
                    }}
                />
                <Form.Label htmlFor="searchMajor">Major</Form.Label>
                <Form.Control
                    id="searchMajor"
                    value={searchMajor}
                    onChange={(e) => {
                        const value = e.target.value;
                        setSearchMajor(value);
                        filterWith(searchName, value, searchInrst);
                    }}
                />
                <Form.Label htmlFor="searchInterest">Interest</Form.Label>
                <Form.Control
                    id="searchInterest"
                    value={searchInrst}
                    onChange={(e) => {
                        const value = e.target.value;
                        setSearchInrst(value);
                        filterWith(searchName, searchMajor, value);
                    }}
                />
                <br />
                <Button variant="neutral">Reset Search</Button>
            </Form>
            <p>
                There are {searchedStus.length} student(s) matching your
                research
            </p>
            <Container fluid>
                <Row>
                    {searchedStus.map((stu) => (
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
