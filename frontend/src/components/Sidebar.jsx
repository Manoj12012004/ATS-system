import { useAuth } from '../components/AuthContext';
import { useLocation, Link, useParams } from 'react-router-dom';

const SideBar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const { id } = useParams();

    const commonLinks = [
        { name: "Dashboard", path: `/${id}`, icon: "fa-solid fa-tachometer-alt" },
        { name: "Jobs", path: `/${id}/jobs`, icon: "fa-solid fa-briefcase" },
        { name: "Applications", path: `/${id}/applications`, icon: "fa-solid fa-file-alt" },
        { name: "Profile", path: `/${id}/profile`, icon: "fa-solid fa-user" },
    ];

    const recruiterLinks = [
        ...commonLinks,
        { name: "Post Job", path: `/${id}/jobs/create`, icon: "fa-solid fa-plus-square" },
    ];

    const links = user.role === "EMPLOYEE" ? commonLinks : recruiterLinks;

    return (
        <div className="flex flex-col w-64 bg-white shadow-lg h-screen">
            <div className="flex items-center justify-center h-20 shadow-md">
                <h1 className="text-2xl font-bold text-gray-800">Job Portal</h1>
            </div>
            <nav className="flex-grow mt-5">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        to={link.path}
                        className={`flex items-center px-6 py-3 text-gray-600 hover:bg-gray-200 hover:text-gray-800 ${location.pathname === link.path ? 'bg-gray-300 text-gray-800' : ''}`}>
                        {link.icon && <i className={`${link.icon} mr-3`}></i>}
                        {link.name}
                    </Link>
                ))}
            </nav>
            <div className="px-6 py-4">
                <button onClick={logout} className='w-full flex items-center justify-center gap-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600'>
                    <i className='fa-solid fa-sign-out-alt'></i>Logout
                </button>
            </div>
        </div>
    );
};

export default SideBar;
