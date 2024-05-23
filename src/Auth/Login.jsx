import React, { useState } from "react";
import axios from "axios";

function Login({ isTrue }) {
  const [isLogin, setIsLogin] = useState(isTrue);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const switchForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);
    // Add logic to submit login data
    axios.post("https://presidioserver.vercel.app/login", loginData).then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userid", res.data.id);
      // close the modal
      window.location.reload();
    }
    ).catch((err) => {
      console.error(err);
    });

  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", signupData);
    // Add validation for phone number
    if (signupData.phoneNumber.length !== 10) {
      console.error("Phone number must be 10 digits");
      return;
    }
    // Add validation for password
    if (signupData.password.length < 6) {
      console.error("Password must be at least 6 characters long");
      return;
    }
    // Add logic to submit signup data
    axios
      .post("https://presidioserver.vercel.app/register", signupData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userid", res.data.id);
        window.location.reload();

      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      {isLogin ? (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-text">Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-secondary transition-colors duration-300"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-gray-700">
            Don't have an account?{" "}
            <button
              onClick={switchForm}
              className="text-primary font-semibold focus:outline-none"
            >
              Signup
            </button>
          </p>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-text">Signup</h2>
          <form onSubmit={handleSignupSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstname" className="block text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstName"
                  value={signupData.firstName}
                  onChange={handleSignupChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastname" className="block text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastName"
                  value={signupData.lastName}
                  onChange={handleSignupChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={signupData.email}
                onChange={handleSignupChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={signupData.password}
                onChange={handleSignupChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="phonenumber" className="block text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                id="phonenumber"
                name="phoneNumber"
                value={signupData.phoneNumber}
                onChange={handleSignupChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-secondary transition-colors duration-300"
            >
              Signup
            </button>
          </form>
          <p className="mt-4 text-gray-700">
            Already have an account?{" "}
            <button
              onClick={switchForm}
              className="text-primary font-semibold focus:outline-none"
            >
              Login
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

export default Login;
