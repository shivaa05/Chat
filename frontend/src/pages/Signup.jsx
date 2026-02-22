import React, { useState } from "react";
import { Lock, Mail, User, User2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { authUser, signupFunction } = useAuthStore();

  const submitHandler = (e) => {
    e.preventDefault();
    signupFunction(username, password, email);
  };
  return (
    <div className="flex items-center justify-center h-full w-screen border">
      <div className="h-[80%] w-[60%] backdrop-blur-2xl bg-slate-950 rounded-xl shadow-2xl flex gap-3">
        <div className="w-full md:w-1/2 h-full flex gap-5 flex-col px-5 py-8">
          <h1 className="text-4xl font-bold text-blue-400">Signup</h1>

          <form
            className="h-full flex gap-5 flex-col mt-5"
            onSubmit={submitHandler}
          >
            <div className="flex gap-3 flex-col">
              <label className="text-xl font-bold">Username:</label>
              <div className="flex gap-1 border px-2 py-1 items-center rounded-lg">
                <User2 className="text-white size-5" />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="outline-none text-lg w-full"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3 flex-col">
              <label className="text-xl font-bold">Email:</label>
              <div className="flex gap-2 border px-2 py-1 items-center rounded-lg">
                <Mail className="text-white size-5" />
                <input
                  type="text"
                  placeholder="example@gmail.com"
                  className="outline-none text-lg w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3 flex-col">
              <label className="text-xl font-bold">Password:</label>
              <div className="flex gap-2 border px-2 py-1 items-center rounded-lg">
                <Lock className="text-white size-5" />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="outline-none text-lg w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 text-center">
              <button
                type="submit"
                className=" py-2 text-lg cursor-pointer bg-slate-800 rounded-xl hover:bg-slate-800/80 shadow-2xs"
              >
                Signup
              </button>

              <p>
                Already have an account?{" "}
                <span
                  className="text-slate-400 cursor-pointer"
                  onClick={() => navigate("/signin")}
                >
                  Signin
                </span>
              </p>
            </div>
          </form>
        </div>
        <div className="hidden w-1/2 md:flex flex-col justify-center items-center">
          <img
            src="/message.png"
            alt=""
            className="w-72 animate-bounce duration-1000 ease-out"
          />
          <h2 className="text-3xl font-bold bg-linear-to-r from-blue-400 via-sky-400 to-sky-300 bg-clip-text text-transparent">
            Start the Conversation
          </h2>
          <p className="w-2/3 text-center text-sm font-semibold text-gray-300">
            Sign up to chat instantly, share moments, and stay connected with
            the people who matter—anytime, anywhere.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
