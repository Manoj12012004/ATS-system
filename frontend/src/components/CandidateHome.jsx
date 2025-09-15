import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const JobsList = () => {
    const [jobs, setJobs] = useState([]);
    const authData = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get('/eid/jobs', { headers: { "Authorization": `Bearer ${authData.token}` } })
            .then(res => {
                setJobs(res.data.rows);
                setLoading(false);
            })
            .catch(err => console.error('Error fetching jobs:', err));
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h4 className="text-3xl font-bold mb-6">Available Jobs</h4>
            {jobs.length === 0 ? (
                <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
                    <p className="font-bold">Info</p>
                    <p>No jobs available at the moment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job, index) => (
                        <div key={job.job_id || index} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition duration-300">
                            <div className="p-6">
                                <h5 className="text-xl font-bold mb-2">
                                    <Link to={`/eid/jobs/${job.Id}`} className="text-blue-600 hover:underline">{job.Title}</Link>
                                </h5>
                                <p className="text-gray-600 text-sm mb-1">{job.company} - {job.location}</p>
                                <p className="text-gray-500 text-xs mb-4">Posted on: {new Date(job.posted_date).toLocaleDateString()}</p>
                                <Link to={`/eid/jobs/${job.Id}/apply`}>
                                    <button className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300">
                                        Apply Now
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

const EmployeeDash = () => {
    const [profile, setProfile] = useState({});
    const authData = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        API.get('/eid', { headers: { "Authorization": `Bearer ${authData.token}` } })
            .then((res) => {
                setProfile(res.data);
                setLoading(false);
            })
            .catch(err => {
                const msg = err?.response?.data?.message || "An error occurred";
                setError(msg);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h5 className="text-2xl font-bold">Welcome, {profile.Name}</h5>
                <p className="text-gray-600">{profile.Email}</p>
            </div>

            <h4 className="text-3xl font-bold mb-6">My Job Applications</h4>
            {profile.applications && profile.applications.length > 0 ? (
                <div className="bg-white rounded-lg shadow-md">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Job Title</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profile.applications.map((app, index) => (
                                <tr key={app.application_id || index}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{index + 1}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{app.JobTitle || 'N/A'}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusVariant(app.Status)}`}>{app.Status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>You haven't applied for any jobs yet.</p>
            )}
        </div>
    );
};

const getStatusVariant = (status) => {
    switch (status) {
        case 'Applied':
            return 'bg-blue-100 text-blue-800';
        case 'Interviewed':
            return 'bg-yellow-100 text-yellow-800';
        case 'Accepted':
            return 'bg-green-100 text-green-800';
        case 'Rejected':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const EmployeeProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const authData = useAuth();

    useEffect(() => {
        API.get('/eid/profile', { headers: { "Authorization": `Bearer ${authData.token}` } })
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
                        value={profile.Name}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                    <input
                        type='email'
                        name='email'
                        value={profile.Email}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                    <input
                        type='text'
                        name='role'
                        value={profile.Role}
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

const CandidateApplications = () => {
    const [applications, setApplications] = useState([]);
    const authData = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        API.get("/eid/applications", { headers: { 'Authorization': `Bearer ${authData.token}` } })
            .then(res => {
                setApplications(res.data.data);
                setLoading(false);
            })
            .catch(err => {
                let msg = "Error fetching applications" + err.message;
                setError(msg);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">My Applications</h2>
            {error && <p className="text-red-500">{error}</p>}
            {applications.length === 0 ? (
                <p>You haven't applied for any jobs yet.</p>
            ) : (
                <div className="bg-white rounded-lg shadow-md">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Job Title</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app, index) => (
                                <tr key={app.application_id || index}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{index + 1}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{app.job_title}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{app.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export { CandidateApplications, EmployeeProfile, EmployeeDash, JobsList };