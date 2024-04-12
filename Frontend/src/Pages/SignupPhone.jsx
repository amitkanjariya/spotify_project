import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signup() {
    const [showPass, setshowPass] = useState(false)
    const [phoneNO, setphoneNO] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNOError, setphoneNOError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate()
    const validatephoneNO = () => {
        const phoneNOregex = /^\d{10}$/;
        setphoneNOError(!phoneNOregex.test(phoneNO) && phoneNO !== "");
    };

    const validatePassword = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%^&*])[A-Za-z\d!@#\$%^&*]{8,}$/;
        setPasswordError(!passwordRegex.test(password) && password !== "");
    };
    const handleSignup = async (e) => {
        e.preventDefault()
        validatephoneNO()
        validatePassword()
        const data = {
            phoneNO,
            password
        }
        try {
            const response = await fetch("http://localhost:5000/signup/phoneno", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            // console.log(response.json())
            if (!response.ok) throw new Error('User cannot Signup.')
            else {
                alert("User Signup Successfully.")
                navigate("/login/phoneno")
            }
        } catch (error) {
            console.log("Error: ", Error)
        }
    }
    return (
        <form id="login-form" action="post">
            <div className="bg-black text-white font-Figtree">
                <div className="nav-box bg-black py-5 pl-10 pt-8">
                    <div className="logo">
                        <img src=".././img/spotify.svg" className="set-logo cursor-pointer filter invert h-9" alt="Spotify" />
                    </div>
                </div>
                <div className="main flex justify-center items-center">
                    <div className="main-box bg-black p-8 pt-0 rounded-md max-w-sm w-full text-left">
                        <h1 className="log-name text-5xl font-medium mb-8">Sign up to Start Listening</h1>
                        <div className="signup">
                            <div className="form">
                                <div className="fieldset mb-4 flex flex-col gap-3">
                                    <div className="label text-sm">
                                        <label className="username">Phone Number:</label>
                                    </div>
                                    <div className="input-username pt-3">
                                        <input className="has-padding take1 has-border bg-black border text-white w-full h-10 px-4 rounded-md"
                                            type="phoneNO"
                                            placeholder="phoneNO:"
                                            pattern=" /^\d{10}$/"
                                            value={phoneNO}
                                            name="phoneNO"
                                            onChange={(e) => setphoneNO(e.target.value)}
                                            onBlur={validatephoneNO}
                                            title={phoneNOError ? "Please enter valid phoneNO no." : ""}
                                            maxLength={10}
                                            required
                                        />

                                    </div>
                                    <div className="label text-sm">
                                        <label className="Password">Password</label>
                                    </div>
                                    <div className="input-username pt-3">
                                        <input className="has-padding take1 has-border bg-black border text-white w-full h-10 px-4 rounded-md"
                                            type={showPass ? "text" : "password"}
                                            placeholder="Password"
                                            pattern="/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/"
                                            value={password}
                                            name="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            onBlur={validatePassword}
                                            title={passwordError ? "Please enter valid password" : ""}
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="ShowPass" checked={showPass} onChange={(e) => setshowPass(e.target.checked)} />
                                        <label htmlFor="ShowPass">
                                            Show Password
                                        </label>
                                    </div>
                                </div>
                                <div className="phoneNO mb-4">
                                    <a href="/signup" className="text-green-600 underline">Use email instead.</a>
                                </div>
                            </div>
                        </div>
                        <div className="login-box">
                            <button className="login-btn bg-green-600 text-black font-semibold w-full py-2 rounded-3xl" onClick={handleSignup}>Next</button>
                        </div>
                        <hr className="hr-className my-8 border-gray-700" />
                        <ul className="social-login">
                            <li className="mb-2">
                                <button className="social-btn border border-slate-500 rounded-3xl text-white flex items-center justify-center w-full py-2" >
                                    <img src=".././img/google.svg" className="set-logo btn-logo cursor-pointer h-6 mr-2" alt="Google" />
                                    <a className="btn-name" href="https://accounts.google.com/v3/signin/identifier?authuser=0&continue=https%3A%2F%2Fmyaccount.google.com%2F&ec=GAlAwAE&hl=en_GB&service=accountsettings&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S889392548%3A1710778596054848&theme=glif&ddm=0">Continue with Google</a>
                                </button>
                            </li>

                        </ul>
                        <div className="signup-acc">
                            <h2 className="h2-signup text-lg">
                                <span>Already have an account?</span>
                                <a href="/login" className="text-green-500">Log in here</a>
                            </h2>
                        </div>
                        <hr className="hr-className mt-8 border-gray-700" />
                    </div>
                </div>
                <footer className="bg-black p-5 text-center">
                    <div className="footer-className">
                        <p className="text-white">
                            This site is protected by reCAPTCHA and the Google
                            <a href="https://policies.google.com/privacy" className="text-green-500"> Privacy Policy </a>
                            and
                            <a href="https://policies.google.com/terms" className="text-green-500"> Terms of Service </a>
                            apply.
                        </p>
                    </div>
                </footer>
            </div>
        </form>
    )
}

export default Signup;