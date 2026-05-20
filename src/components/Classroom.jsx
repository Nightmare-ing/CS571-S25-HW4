import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap";
import Student from "./Student.jsx";

const Classroom = () => {
    const [stus, setStus] = useState([]);
    const [filters, setFilters] = useState({
        searchName: "",
        searchMajor: "",
        searchInrst: "",
    });
    const [page, setPage] = useState(1);

    const searchedStus = filterWith(filters);

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

    function filterWith(filters) {
        let filteredData = stus;
        if (filters.searchName) {
            filteredData = filteredData.filter((stu) =>
                `${stu.name.first.toLowerCase()} ${stu.name.last.toLowerCase()}`.includes(
                    filters.searchName.toLowerCase(),
                ),
            );
        }

        if (filters.searchMajor) {
            filteredData = filteredData.filter((stu) =>
                stu.major
                    .toLowerCase()
                    .includes(filters.searchMajor.toLowerCase()),
            );
        }

        if (filters.searchInrst) {
            filteredData = filteredData.filter(
                (stu) =>
                    stu.interests.filter((interest) =>
                        interest
                            .toLowerCase()
                            .includes(filters.searchInrst.toLowerCase()),
                    ).length,
            );
        }

        return filteredData;
    }

    function updateSearch(key, value) {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setPage(1);
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
                    value={filters.searchName}
                    onChange={(e) => {
                        updateSearch("searchName", e.target.value);
                    }}
                />
                <Form.Label htmlFor="searchMajor">Major</Form.Label>
                <Form.Control
                    id="searchMajor"
                    value={filters.searchMajor}
                    onChange={(e) => {
                        updateSearch("searchMajor", e.target.value);
                    }}
                />
                <Form.Label htmlFor="searchInterest">Interest</Form.Label>
                <Form.Control
                    id="searchInterest"
                    value={filters.searchInrst}
                    onChange={(e) => {
                        updateSearch("searchInrst", e.target.value);
                    }}
                />
                <br />
                <Button
                    variant="neutral"
                    onClick={() => {
                        setFilters({
                            searchName: "",
                            searchMajor: "",
                            searchInrst: "",
                        });
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
