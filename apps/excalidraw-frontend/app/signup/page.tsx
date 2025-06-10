"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function Signup(){

const [name,setName]=useState("");

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [message,setMessage]=useState("");
const [showPassword,setShowPassword]=useState(false)

const router=useRouter()

async function handleSignup(e:React.FormEvent) {
    e.preventDefault();
    setMessage("")

    try{
        const res=await fetch("http://localhost:3001/signup",{
           method:"POST",
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify({
            name,
            email,
            password

           }) 
        })

        const data=await res.json()

        if (res.ok && data.userId) {
            localStorage.setItem("token", data.token);
            setMessage("Signup successful! You can now sign in.");
            setName("");
            
            setEmail("");
            setPassword("");
            setTimeout(() => {
                router.push("/signin");
            }, 1500); 
            } else {
            setMessage(data.message || "Signup failed.");
            }
        } catch (err) {
            setMessage("Network error.");
        }
    }

 return (
  <div className="fixed inset-0 flex items-center justify-center bg-white">
    <div className="w-full mt-16 max-w-md bg-white shadow sm:rounded-lg flex justify-center">
      <div className="w-full sm:p-8">
        <div className="flex flex-col items-center bg-white border shadow-2xl p-8 m-8 rounded-md">
          <div className="w-full flex-1 ">
            <h1 className="font-bold text-xl">Sign up to your account</h1>
            <div className="text-sm text-gray-500">
              Sign up to sketch your ideas
            </div>

            <div className="mx-auto max-w-xs">
                <form onSubmit={handleSignup}>
                    <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    />
                    
                    <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    />
                    <div className="relative py-3">
                      <input
                        type={showPassword? "text" : "password"}
                        className="
                          w-full 
                          px-4 py-3 
                          rounded-lg border border-gray-300 
                          bg-gray-100 text-sm text-gray-700 
                          focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200
                          pr-10
                        "
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        className="
                        absolute inset-y-0 right-0 flex items-center pr-3
                          text-gray-400 hover:text-gray-600 focus:outline-none
                        "
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    
                    <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span>
                        Sign Up
                    </span>
                    </button>
                    
                </form>
                <div className="text-sm text-center mt-4">
                  Already have an account?
                  <span className="text-blue-700 text-sm cursor-pointer" onClick={()=>router.push("/signin")}>Sign in</span>
                </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
 )
}