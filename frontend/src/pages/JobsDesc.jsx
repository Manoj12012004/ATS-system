import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../components/AuthContext";

const JobDetail = () => {
    const { jid } = useParams();
    const [job, setJob] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        API.get(`/eid/jobs/${jid}`, { headers: { "Authorization": `Bearer ${auth.token}` } })
            .then(res => { setJob(res.data) })
            .catch(err => { console.log(err) });
    }, [jid]);

    const handleApply = () => {
        API.post(
            `/eid/jobs/${jid}/apply`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            }
        )
            .then((res) => setMessage(res.data.message))
            .catch((err) => {
                if (err.response && err.response.status === 409) {
                    setMessage('You already applied for this job.');
                } else {
                    console.error('Application error:', err);
                    setMessage('Error submitting application.');
                }
            });
    };

    return (
        <div className="container mx-auto p-8">
            {job ? (
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-4xl font-bold mb-4">{job.title}</h2>
                    <p className="text-lg mb-2"><strong>Company:</strong> {job.Company}</p>
                    <p className="text-lg mb-2"><strong>Location:</strong> {job.Location}</p>
                    <p className="text-lg mb-4"><strong>Description:</strong> {job.Description}</p>
                    <p className="text-gray-500 mb-6"><strong>Posted:</strong> {new Date(job.CreatedAt).toLocaleDateString()}</p>
                    <div className="flex items-center space-x-4">
                        <button onClick={handleApply} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Apply
                        </button>
                        <button onClick={() => navigate('/${auth.user.id}/jobs')} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                            ← Back to Jobs
                        </button>
                    </div>
                    {message && <p className="mt-4 text-green-500">{message}</p>}
                </div>
            ) : (
                <p className="text-center text-lg">Loading job details...</p>
            )}
        </div>
    );
}

export default JobDetail;
