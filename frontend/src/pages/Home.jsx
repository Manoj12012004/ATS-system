import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-50">
      <header className="bg-blue-600 text-white text-center py-20">
        <h1 className="text-5xl font-bold">Find Your Next Career Move</h1>
        <p className="text-xl mt-4">Connecting talented employees with top companies</p>
        <div className="mt-8 space-x-4">
          <Link to="/register">
            <button className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
              Get Started
            </button>
          </Link>
          <Link to="/jobs">
            <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-full hover:bg-white hover:text-blue-600 transition duration-300">
              Browse Jobs
            </button>
          </Link>
        </div>
      </header>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Why Join Our Job Portal?</h2>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-8 h-full">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">For Employees</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>- Discover jobs that fit</li>
                  <li>- Apply effortlessly</li>
                  <li>- Track application status</li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-8 h-full">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">For Recruiters</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>- Post job listings</li>
                  <li>- View and manage applicants</li>
                  <li>- Hire top talent</li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-8 h-full">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Instant Notifications</h3>
                <p className="text-gray-600">
                  Stay updated on new jobs, messages, and candidate responses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 text-white text-center py-20">
        <h3 className="text-4xl font-bold mb-4">Start your journey today</h3>
        <p className="text-xl mb-8">Sign up now to connect with the future of work.</p>
        <Link to="/register">
          <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
            Join Now
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
