import React from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
 // optional for custom styles

const Home = () => {
  return (
    <Container fluid className="p-0 home-hero-section">
      <div className="hero bg-primary text-white d-flex flex-column justify-content-center align-items-center text-center p-5">
        <h1 className="display-4 fw-bold">Find Your Next Career Move</h1>
        <p className="lead mb-4">Connecting talented employees with top companies</p>
        <div className="d-flex gap-3">
          <Link to="/register">
            <Button size="lg" variant="light" className="fw-bold">
              Get Started
            </Button>
          </Link>
          <Link to="/jobs">
            <Button size="lg" variant="outline-light">
              Browse Jobs
            </Button>
          </Link>
        </div>
      </div>

      <Container className="py-5">
        <h2 className="text-center mb-5">Why Join Our Job Portal?</h2>
        <Row className="g-4 justify-content-center">
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>For Employees</Card.Title>
                <Card.Text>
                  - Discover jobs that fit<br />
                  - Apply effortlessly<br />
                  - Track application status
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>For Recruiters</Card.Title>
                <Card.Text>
                  - Post job listings<br />
                  - View and manage applicants<br />
                  - Hire top talent
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Instant Notifications</Card.Title>
                <Card.Text>
                  Stay updated on new jobs, messages, and candidate responses.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <section className="text-center bg-light py-5">
        <h3 className="mb-3">Start your journey today</h3>
        <p className="mb-4">Sign up now to connect with the future of work.</p>
        <Link to="/register">
          <Button size="lg" variant="primary">
            Join Now
          </Button>
        </Link>
      </section>
    </Container>
  );
};

export default Home;
