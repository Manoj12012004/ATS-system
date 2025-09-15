import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RecruiterApplications = () => {
    const [app, setApp] = useState([]);
    const { jid } = useParams(); // Destructure directly
    const authData = useAuth();
    const user = authData?.user;

    useEffect(() => {
        if (user?.role === "RECRUITER" && jid) {
            API.get(`/rid/jobs/${jid}/applications`, {
                headers: { 'Authorization': `Bearer ${authData.token}` }
            })
                .then(res => setApp(res.data.data))
                .catch(err => console.error("Error fetching applications:", err));
        }
    }, [user?.role, jid, authData.token]);

    const handleStatusChange = async (applicationId, status) => {
        try {
            await API.put(`/rid/applications/${applicationId}`, { status }, { headers: { 'Authorization': `Bearer ${authData.token}` } });
            setApp(app.map(a => a.Id === applicationId ? { ...a, Status: status } : a));
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">Applications for Job ID: {jid}</h2>
            {app.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                <div className="bg-white rounded-lg shadow-md">
                    <ul className="divide-y divide-gray-200">
                        {app.map((application, index) => (
                            <li key={application.id || index} className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-lg font-semibold">{application.Name}</p>
                                        <p className="text-sm text-gray-500">{application.Email}</p>
                                    </div>
                                    <a href={application.Resume_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Resume</a>
                                    <div>
                                        <select value={application.Status} onChange={(e) => handleStatusChange(application.Id, e.target.value)} className="p-2 rounded-md border-gray-300">
                                            <option value="Applied">Applied</option>
                                            <option value="Interviewing">Interviewing</option>
                                            <option value="Accepted">Accepted</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const RecruiterDash = () => {
    const [profile, setProfile] = useState(null);
    const [jobs, setJobs] = useState([]);
    const auth = useAuth();

    useEffect(() => {
        API.get('/rid', { headers: { 'Authorization': `Bearer ${auth.token}` }, withCredentials: true })
            .then(res => {
                setProfile(res.data.profile);
                setJobs(res.data.jobs);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            {profile && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h1 className="text-3xl font-bold">Welcome, {profile.Name}</h1>
                    <p className="text-gray-600">Email: {profile.Email}</p>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job, index) => (
                    <div key={job.job_id || index} className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-2">{job.Title}</h2>
                        <p className="text-gray-600">Applications: {job.applications_count}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const JobsByRecruiter = () => {
    const [jobs, setJobs] = useState([]);
    const auth = useAuth();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        API.get('/rid/jobs', { headers: { 'Authorization': `Bearer ${auth.token}` } })
            .then(res => {
                setJobs(res.data.jobs);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">Your Posted Jobs</h2>
            {jobs.length === 0 ? (
                <p>No jobs posted yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job, index) => (
                        <div key={job.job_id || index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-6">
                                <h5 className="text-xl font-bold mb-2">
                                    <Link to={`/${id}/jobs/${job.job_id}`} className="text-blue-600 hover:underline">{job.Title}</Link>
                                </h5>
                                <p className="text-gray-600 mb-4">Applications: {job.applications_count}</p>
                                <Link to={`/${id}/jobs/${job.job_id}/applications`}>
                                    <button className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300">
                                        View Applications
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const RecruiterProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const authData = useAuth();

    useEffect(() => {
        API.get('/rid/profile', { headers: { "Authorization": `Bearer ${authData.token}` } })
            .then((res) => {
                setProfile(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="container mx-auto my-10 p-5 bg-white rounded-lg shadow-md max-w-2xl">
            <h3 className="text-3xl font-bold mb-6">My Profile</h3>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                    <input
                        type='text'
                        name='name'
                        value={profile.name}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                    <input
                        type='email'
                        name='email'
                        value={profile.email}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                    <input
                        type='text'
                        name='role'
                        value={profile.role}
                        disabled
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export { JobsByRecruiter, RecruiterApplications, RecruiterDash, RecruiterProfile };
