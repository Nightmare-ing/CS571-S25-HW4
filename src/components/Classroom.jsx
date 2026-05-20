import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap";
import Student from "./Student.jsx";

const Classroom = () => {
    const [stus, setStus] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchMajor, setSearchMajor] = useState("");
    const [searchInrst, setSearchInrst] = useState("");
    const [page, setPage] = useState(1);

    const searchedStus = filterWith(searchName, searchMajor, searchInrst);

    useEffect(() => {
        fetch("https://cs571.org/rest/s25/hw4/students", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
            },
        })
            .then((req) => req.json())
            .then((data) => {
                setStus(data);
            });
    }, []);

    useEffect(() => {
        setPage(1);
    }, [searchName, searchMajor, searchInrst]);

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

        return filteredData;
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
                    }}
                />
                <Form.Label htmlFor="searchMajor">Major</Form.Label>
                <Form.Control
                    id="searchMajor"
                    value={searchMajor}
                    onChange={(e) => {
                        const value = e.target.value;
                        setSearchMajor(value);
                    }}
                />
                <Form.Label htmlFor="searchInterest">Interest</Form.Label>
                <Form.Control
                    id="searchInterest"
                    value={searchInrst}
                    onChange={(e) => {
                        const value = e.target.value;
                        setSearchInrst(value);
                    }}
                />
                <br />
                <Button
                    variant="neutral"
                    onClick={() => {
                        setSearchName("");
                        setSearchMajor("");
                        setSearchInrst("");
                    }}
                >
                    Reset Search
                </Button>
            </Form>
            <p>
                There are {searchedStus.length} student(s) matching your
                research
            </p>
            <Container fluid>
                <Row>
                    {searchedStus
                        .slice((page - 1) * 24, page * 24)
                        .map((stu) => (
                            <Col
                                key={stu.id}
                                xs={12}
                                sm={12}
                                md={6}
                                lg={4}
                                xl={3}
                            >
                                <Student {...stu} />
                            </Col>
                        ))}
                </Row>
            </Container>
            <Pagination>
                {Array.from(
                    { length: Math.ceil(searchedStus.length / 24) },
                    (_, i) => i + 1,
                ).map((i) => (
                    <Pagination.Item
                        active={i === page}
                        onClick={() => {
                            setPage(i);
                        }}
                        key={i}
                    >
                        {i}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
};

export default Classroom;
