import React from "react";

function Signup() {
    return(
        <>
            <div class="bg-black text-white font-Figtree">
    <div class="nav-box bg-black py-5 pl-10 pt-8">
        <div class="logo">
            <img src="img/spotify.svg" class="set-logo cursor-pointer filter invert h-9" alt="Spotify" />
        </div>
    </div>
    <div class="main flex justify-center items-center">
        <div class="main-box bg-black p-8 pt-0 rounded-md max-w-sm w-full text-left">
            <h1 class="log-name text-5xl font-medium mb-8">Sign up to Start Listening</h1>
            <div class="signup">
                <div class="form">
                    <div class="fieldset mb-4">
                        <div class="label text-sm">
                            <label class="username">Email address</label>
                        </div>
                        <div class="input-username pt-3">
                            <input class="has-padding take1 has-border bg-black border text-white w-full h-10 px-4 rounded-md" id="signup-username" type="text" placeholder="name@domain.com" />
                        </div>
                    </div>
                    <div class="phone mb-4">
                        <a href="#" class="text-green-600 underline">Use phone number instead.</a>
                    </div>
                </div>
            </div>
            <div class="login-box">
                <button class="login-btn bg-green-600 text-black font-semibold w-full py-2 rounded-3xl">Next</button>
            </div>
            <hr class="hr-class my-8 border-gray-700" />
            <ul class="social-login">
                <li class="mb-2">
                    <button class="social-btn border border-slate-500 rounded-3xl text-white flex items-center justify-center w-full py-2" >
                        <img src="img/google.svg" class="set-logo btn-logo cursor-pointer h-6 mr-2" alt="Google" />
                        <span class="btn-name">Continue with Google</span>
                    </button>
                </li>
                
            </ul>
            <div class="signup-acc">
                <h2 class="h2-signup text-lg">
                    <span>Already have an account?</span>
                    <a href="#" class="text-green-500">Log in here</a>
                </h2>
            </div>
            <hr class="hr-class mt-8 border-gray-700" />
        </div>
    </div>
    <footer class="bg-black p-5 text-center">
        <div class="footer-class">
            <p class="text-white">
                This site is protected by reCAPTCHA and the Google
                <a href="https://policies.google.com/privacy" class="text-green-500"> Privacy Policy </a>
                and
                <a href="https://policies.google.com/terms" class="text-green-500"> Terms of Service </a>
                apply.
            </p>
        </div>
    </footer>
</div>
        </>
    )
}

export default Signup;