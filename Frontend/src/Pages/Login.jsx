import React from "react";
import { Link } from 'react-router-dom'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authslice.js";
function Login() {
  const [showPass, setshowPass] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(email) && email !== "");
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%^&*])[A-Za-z\d!@#\$%^&*]{8,}$/;
    setPasswordError(!passwordRegex.test(password) && password !== "");
  };

  const handleLogin = async (e) => {
    e.preventDefault()
    validateEmail();
    validatePassword();
    const data = {
      email,
      password
    }
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const dataa = await response.json()
      if (!response.ok) throw new Error('User cannot login.')
      else {
        alert("User Login Successfully.")
        localStorage.setItem("accessToken", dataa.data.accessToken)
        localStorage.setItem("refreshToken", dataa.data.refreshToken)
        dispatch(login({ data }))
        navigate("/")
      }
    } catch (error) {
      console.log("Error: ", Error)
    }
    if (rememberMe) {
      // Save email and password for at least one month
      localStorage.setItem("rememberedEmail", email);
      localStorage.setItem("rememberedPassword", password);
      // Set expiry date for one month from now
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 1);
      localStorage.setItem("expiryDate", expiryDate.toISOString());
    } else {
      // Clear remembered email and password if "Remember me" is unchecked
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
      localStorage.removeItem("expiryDate");
    }
  };

  // Load remembered email and password if available
  useState(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    const expiryDate = localStorage.getItem("expiryDate");

    if (rememberedEmail && rememberedPassword && expiryDate) {
      const expiry = new Date(expiryDate);
      if (expiry > new Date()) {
        setEmail(rememberedEmail);
        setPassword(rememberedPassword);
        setRememberMe(true);
      } else {
        // Clear remembered email and password if expired
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
        localStorage.removeItem("expiryDate");
      }
    }
  }, []);
  return (
    <form id="login-form" action="post">
      <div className="text-white bg-gray-800 font-Figtree">
        <div className="nav-box flex bg-black py-8 pl-11">
          <div className="logo">
            <img
              src="img/spotify.svg"
              className="set-logo filter invert cursor-pointer h-9"
              alt="Spotify"
            />
          </div>
        </div>
        <div className="main flex justify-center m-8 items-center">
          <div className="main-container w-full max-w-3xl">
            <div className="main-box bg-black p-16  rounded-md">
              <h1 className="log-name text-5xl font-semibold text-center mb-12">
                Log in to Spotify
              </h1>
              <ul className="social-login grid grid-cols-1 px-40 gap-y-4">
                <li>
                  <button className="social-btn border bg-black text-white flex items-center justify-center w-full py-2 rounded-3xl">
                    <img
                      src="img/google.svg"
                      className="set-logo btn-logo cursor-pointer h-6 mr-2"
                      alt="Google"
                    />
                    <a href="https://accounts.google.com/v3/signin/identifier?authuser=0&continue=https%3A%2F%2Fmyaccount.google.com%2F&ec=GAlAwAE&hl=en_GB&service=accountsettings&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S889392548%3A1710778596054848&theme=glif&ddm=0" className="btn-name">Continue with Google</a>
                  </button>
                </li>
                <li>
                  <button className="social-btn border phone-social bg-black text-white flex items-center justify-center w-full py-2 rounded-3xl">
                    <Link className="phone-btn" to="phoneno">Continue with Phone number</Link>
                  </button>
                </li>
              </ul>
              <hr className="hr-class my-12 mx-20 border-gray-700" />
              <div className="signup px-40">
                <div className="form">
                  <div className="fieldset mb-6">
                    <div className="label">
                      <div className="label">
                        <label className="username text-sm">Email</label>
                      </div>
                      <div className="input-username">
                        <input
                          className="has-padding take1 border bg-black text-white w-full h-10 px-4 rounded-md"
                          id="signup-username"
                          type="text"
                          placeholder="Email"
                          value={email}
                          name="email"
                          pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                          onChange={(e) => setEmail(e.target.value)}
                          onBlur={validateEmail}
                          title={emailError ? "Please enter valid email address" : ""}
                          required
                        />
                      </div>
                    </div>
                    <div className="fieldset mb-6">
                      <div className="label">
                        <div className="label">
                          <label className="password text-sm">Password</label>
                        </div>
                        <div className="input-password">
                          <input
                            className="has-padding1 take2 border bg-black text-white w-full h-10 px-4 rounded-md"
                            id="signup-password"
                            type={showPass ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%^&*])[A-Za-z\d!@#\$%^&*]{8,}$"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={validatePassword}
                            title={passwordError ? "Please enter valid password" : ""}
                            required
                          />
                        </div>
                      </div>
                      <div className="check mb-6 flex gap-2 my-2 items-center">
                        <input type="checkbox" id="accept-terms" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                        <label htmlFor="accept-terms">
                          Remember me
                        </label>
                        <input type="checkbox" id="ShowPass" checked={showPass} onChange={(e) => setshowPass(e.target.checked)} />
                        <label htmlFor="ShowPass">
                          Show Password
                        </label>
                      </div>
                      <div className="login-box mb-6">
                        <button className="login-btn bg-green-500 text-white w-full py-2  rounded-3xl" onClick={handleLogin}>
                          Log In
                        </button>
                      </div>
                      <div className="forget-password text-center ">
                        <a href="/forgot-password" className="text-white underline">
                          Forget your password?
                        </a>
                      </div>
                    </div>
                  </div>
                  <hr className="hr-className my-12 mx-20 border-gray-700" />
                  <div className="signup-acc">
                    <h2 className="h2-signup text-center text-lg">
                      <span className="text-gray-400">Don't have an account? </span>
                      <a href="/signup" className="underline">
                        Sign up for Spotify
                      </a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <footer className="bg-black p-7 text-center">
              <div className="footer-className">
                <p className="text-white">
                  This site is protected by reCAPTCHA and the Google
                  <a href="https://policies.google.com/privacy" className="underline">
                    {" "}
                    Privacy Policy{" "}
                  </a>
                  and
                  <a href="https://policies.google.com/terms" className="underline">
                    {" "}
                    Terms of Service{" "}
                  </a>
                  apply.
                </p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </form>
  );
}
export default Login;

