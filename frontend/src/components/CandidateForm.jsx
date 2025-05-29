import React from "react";
import axios from "axios";
import  {Button, Form} from "react-bootstrap";

const CandidateForm = () => {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        phone: "",
        skills: "",
        education: "",
        experience_years: "",
    })
    const [resume, setResume] = React.useState(null);
    const [status, setStatus] = React.useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("skills", formData.skills);
        formDataToSend.append("education", formData.education);
        formDataToSend.append("experience_years", formData.experience_years);
        if (resume) {
            formDataToSend.append("resume", resume);
        }

        try {
            const response = await axios.post("/api/candidates", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setStatus({ type: "success", message: response.data.message });
        } catch (error) {
            setStatus({ type: "error", message: error.response.data.message });
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
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
            <Form.Group controlId="formEducation">
                <Form.Label>Education</Form.Label>
                <Form.Control
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formExperienceYears">
                <Form.Label>Years of Experience</Form.Label>
                <Form.Control
                    type="number"
                    name="experience_years"
                    value={formData.experience_years}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formResume">
                <Form.Label>Resume</Form.Label>
                <Form.Control
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                />
            </Form.Group>
            <Button type="submit" className="btn btn-primary">
                Submit
            </Button>
            {status && (
                <div className={`alert alert-${status.type}`} role="alert">
                    {status.message}
                </div>
            )}
        </Form>
    )
}
export default CandidateForm;