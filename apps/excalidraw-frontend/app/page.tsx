"use client"

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Pencil, Share2, Users2, Sparkles, Github, Download,Menu,X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function App() {
  const router=useRouter();
  const [menuOpen,setMenuOpen]=useState(false)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 640) { // 640px is Tailwind's 'sm'
        setMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <header className="flex justify-between rounded-md  mt-8 m-8  border border-gray-200 p-2 md:p-4 shadow-2xl md:pl-6 md:ml-24 md:mr-24 md:pr-6">
        <div>
          <span className=' text-2xl font-kalam cursor-pointer' onClick={()=>router.push("/")}>CoSketch</span>
        </div>
        <div className="hidden sm:flex gap-5 items-center">
          <span className="cursor-pointer">Features</span>
          <span className="cursor-pointer">Github</span>
          <span className="cursor-pointer">Signin</span>
          <span className="bg-black text-white rounded-lg px-2 py-1 pt-1 text-sm cursor-pointer">Try Now</span>

        </div>
        { !menuOpen && (
            <button className="sm:hidden p-2" onClick={()=>setMenuOpen(true)}
              aria-label="Open menu">
              <Menu className="w-7 h-7"/>
              
            </button>

          )
        }
        
        { menuOpen && (
            <button className="sm:hidden p-2" onClick={()=>setMenuOpen(false)}
              aria-label="Close menu">
              <X className="w-7 h-7"/>
            </button>
        )
        }
      </header>
      { menuOpen && (
          <div className="flex-col gap-4 border rounded-xl shadow-2xl m-8 p-2">
            <div className="font-medium cursor-pointer">Features</div>
            <div className="font-medium cursor-pointer">Github</div>
            <div className="font-medium cursor-pointer">Signin</div>
            <div className="font-medium cursor-pointer">Try Now</div>

          </div>

        )
      }
      <div className="text-center mt-24">
        <div className="text-4xl md:text-6xl">
          <span className="font-bold">Ideas </span>
           don't wait

        </div>
        <div className="text-4xl md:text-6xl">
          why should you? Go Instantly
        </div>
        <div className="mt-4 text-xl">
          Create, connect, and collaborate the moment inspiration strikes.
          
        </div>

      </div>

    </div>
  )
    
}

export default App;