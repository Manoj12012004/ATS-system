import { use } from 'react';
import {useAuth} from '../components/AuthContext';
import { useLocation,Link, useParams } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

const SideBar = () => {
    const {user,logout}=useAuth();
    const location=useLocation();
    const {id}=useParams();
    const empolyeeLinks=[
        {name:"Jobs",path:`/${id}/jobs`,icon:"fa-solid fa-briefcase"},
        {name:"Applications",path:`/${id}/applications`,icon:"fa-solid fa-file-alt"},
        {name:"Profile",path:`/${id}/profile`,icon:"fa-solid fa-user"},
        {name:"Dashboard",path:`/${id}`,icon:"fa-solid fa-tachometer-alt"}
    ]
    const recruiterLinks=[
        {name:"Jobs",path:`/${id}/jobs`,icon:"fa-solid fa-briefcase"},
        {name:"Applications",path:`/${id}/applications`,icon:"fa-solid fa-file-alt"},
        {name:"Profile",path:`/${id}/profile`,icon:"fa-solid fa-user"},
        {name:"Dashboard",path:`/${id}`,icon:"fa-solid fa-tachometer-alt"},
        {name:"Post Job",path:`/${id}/jobs/create`,icon:"fa-solid fa-plus-square"}
    ]

    const links=user.role==="EMPLOYEE"?empolyeeLinks:recruiterLinks;

    return(
        <Navbar bg="light" className="flex-column vh-100 p-3 sidebar shadow-sm" style={{ minWidth: 220 }}>
            <Navbar.Brand className="mb-4 fs-4 fw-bold">Job Portal</Navbar.Brand>
            <Nav className='flex-column w-100'>
                {links.map((link,index)=>(
                    <Nav.Link
                        key={index}
                        as={Link}
                        to={link.path}
                        className={`d-flex align-items-center gap-2 ${location.pathname === link.path ? 'active' : ''}`}
                    >
                        {link.icon && <i className={link.icon}></i>}
                        {link.name}
                    </Nav.Link>
                ))}
            </Nav>
            <div className='mt-auto'>
                <Nav.Link onClick={logout} className='d-flex align-items-center gap-2 bg-dark text-white p-2 border rounded'><i className='fa-solid fa-sign-out-alt'></i>Logout</Nav.Link>
            </div>
        </Navbar>
    )
}
export default SideBar;