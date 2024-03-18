import React from "react";

function Login() {
  return (
    <>
      <div class="text-white bg-gray-800 font-Figtree">
        <div class="nav-box flex bg-black py-8 pl-11">
          <div class="logo">
            <img
              src="img/spotify.svg"
              class="set-logo filter invert cursor-pointer h-9"
              alt="Spotify"
            />
          </div>
        </div>
        <div class="main flex justify-center m-8 items-center">
          <div class="main-container w-full max-w-3xl">
            <div class="main-box bg-black p-16  rounded-md">
              <h1 class="log-name text-5xl font-semibold text-center mb-12">
                Log in to Spotify
              </h1>
              <ul class="social-login grid grid-cols-1 px-40 gap-y-4">
                <li>
                  <button class="social-btn border bg-black text-white flex items-center justify-center w-full py-2 rounded-3xl">
                    <img
                      src="img/google.svg"
                      class="set-logo btn-logo cursor-pointer h-6 mr-2"
                      alt="Google"
                    />
                    <span class="btn-name">Continue with Google</span>
                  </button>
                </li>
                <li>
                  <button class="social-btn border phone-social bg-black text-white flex items-center justify-center w-full py-2 rounded-3xl">
                    <span class="phone-btn">Continue with Phone number</span>
                  </button>
                </li>
              </ul>
              <hr class="hr-class my-12 mx-20 border-gray-700" />
              <div class="signup px-40">
                <div class="form">
                  <div class="fieldset mb-6">
                    <div class="label">
                      <label class="username text-sm">Email or Username</label>
                    </div>
                    <div class="input-username">
                      <input
                        class="has-padding take1 border bg-black text-white w-full h-10 px-4 rounded-md"
                        id="signup-username"
                        type="text"
                        placeholder="Email or Username"
                      />
                    </div>
                  </div>
                  <div class="fieldset mb-6">
                    <div class="label">
                      <label class="password text-sm">Password</label>
                    </div>
                    <div class="input-password">
                      <input
                        class="has-padding1 take2 border bg-black text-white w-full h-10 px-4 rounded-md"
                        id="signup-password"
                        type="password"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div class="check mb-6">
                    <input type="checkbox" id="accept-terms" />
                    <label for="accept-terms" class="text-sm">
                      Remember me
                    </label>
                  </div>
                  <div class="login-box mb-6">
                    <button class="login-btn bg-green-500 text-white w-full py-2  rounded-3xl">
                      Log In
                    </button>
                  </div>
                  <div class="forget-password text-center ">
                    <a href="#" class="text-white underline">
                      Forget your password?
                    </a>
                  </div>
                </div>
              </div>
              <hr class="hr-class my-12 mx-20 border-gray-700" />
              <div class="signup-acc">
                <h2 class="h2-signup text-center text-lg">
                  <span class="text-gray-400">Don't have an account? </span>
                  <a href="#" class="underline">
                    Sign up for Spotify
                  </a>
                </h2>
              </div>
            </div>
          </div>
        </div>
        <footer class="bg-black p-7 text-center">
          <div class="footer-class">
            <p class="text-white">
              This site is protected by reCAPTCHA and the Google
              <a href="https://policies.google.com/privacy" class="underline">
                {" "}
                Privacy Policy{" "}
              </a>
              and
              <a href="https://policies.google.com/terms" class="underline">
                {" "}
                Terms of Service{" "}
              </a>
              apply.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Login;
