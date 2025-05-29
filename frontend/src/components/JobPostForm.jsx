import React from "react";
import { Button, Form } from "react-bootstrap";
import API from "../api/axios";

const JobPostForm=()=>{
    const [formData, setFormData] = React.useState({
        title: "",
        description: "",
        location: "",
        salary: "",
        skills: "",
        experience_years: "",
    });
    const [status, setStatus] = React.useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/rid/jobs/create",{headers: { Authorization: `Bearer ${auth.token}` }}, formData);
            setStatus({ type: "success", message: response.data.message });
        } catch (error) {
            setStatus({ type: "error", message: error.response.data.message });
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formDescription">
                <Form.Label>Job Description</Form.Label>
                <Form.Control
                    as="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formSalary">
                <Form.Label>Salary</Form.Label>
                <Form.Control
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formSkills">
                <Form.Label>Skills</Form.Label>
                <Form.Control
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formExperienceYears">
                <Form.Label>Experience Years</Form.Label>
                <Form.Control
                    type="number"
                    name="experience_years"
                    value={formData.experience_years}
                    onChange={handleChange}
                    required/>
            </Form.Group>
            <Button type="submit">Post Job</Button>
            {status && (
                <div className={`alert alert-${status.type}`}>
                    {status.message}
                </div>
            )}
        </Form>
        )
}
export default JobPostForm;