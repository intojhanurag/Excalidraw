"use client"

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Pencil, Share2, Users2, Sparkles, Github, Download,Menu,X,Group,Cloud,Image,Star,ChartArea, Linkedin,Twitter,Eye,Phone} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FeatureCard } from "./component/FeatureCard";

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
        <div className="mt-4 text-xl p-4">
          Create, connect, and collaborate the moment inspiration strikes.
          
        </div>
        <div>
          <button className="bg-black text-white p-2 rounded-xl m-4">StartDrawing</button>
          <button className="bg-white text-black border border-black p-2 rounded-xl m-4">WatchDemo</button>
        </div>

      </div>
      <div className="text-center mt-10 font-semibold text-2xl md:text-3xl">
          Key Features
      </div>

      <div className="flex justify-center">
        
        <div className="grid sm:grid-cols-2 gap-4 items-center p-4">
          <div >
            <FeatureCard 
              heading="Live Collaboration Canvas"
              description="Sketch, write, and build ideas together — all updates appear in real-time, no refresh needed."
              logo={<Share2 size={40} className="bg-slate-200 rounded-sm  p-2 text-black"/>}
            />
          </div>
          <div>
            <FeatureCard 
              heading="Dedicated Team Spaces"
              description="Keep projects organized with custom workspaces for every team, goal, or brilliant side quest."
              logo={<Group size={40} className="bg-slate-200 rounded-sm  p-2 text-black"/>}
            />

          </div>
          <div>
            <FeatureCard 
              heading="Always-Synced Cloud Power"
              description="Your work auto-saves and syncs across all devices — pick up right where you left off, anytime."
              logo={<Cloud size={40} className="bg-slate-200 rounded-sm  p-2 text-black"/>}
            />


          </div>
          <div>
            <FeatureCard 
              heading="Adaptive Drawing Toolkit"
              description="Intuitive tools that adjust to your style — whether you're wireframing, mind-mapping, or just vibing."
              logo={<Image size={40} className="bg-slate-200 rounded-sm  p-2 text-black"/>}
            />


          </div>
          <div>
            <FeatureCard 
              heading="Ultra-Smooth Experience
"
              description="Engineered for speed — zero lag, just a clean, responsive canvas that flows with your thoughts."
              logo={<Star size={40} className="bg-slate-200 rounded-sm  p-2 text-black"/>}
            />


          </div>
          <div>
            <FeatureCard 
              heading="Creative Flow, Supercharged
"
              description="Draw freely — our AI translates your rough sketches into polished, stunning artwork in seconds."
              logo={<Pencil size={40} className="bg-slate-200 rounded-sm  p-2 text-black"/>}
            />


          </div>
        <div>

      </div>
      </div>
    </div>
    <div className="mt-10">
      <div className="font-bold text-center text-xl md:text-2xl">
        Bring Your ideas to life-together!
      </div>
      <div className="text-gray-500 text-center text-sm md:text-xl">
        Join thousands of teams using DrawFlow to collaborate visually with ease.

      </div>
      <div className="flex justify-center mt-5">
        <button className="text-white bg-black p-2 rounded-2xl">
          Join free today
        </button>
      </div>
      <div className="relative flex items-center justify-center w-full my-8">
        <hr className="w-[60%] h-1 bg-gray-200 border-0 rounded-sm dark:bg-gray-700" />
        <div className="absolute px-4 bg-white -translate-x-1/2 left-1/2 dark:bg-gray-900">
          <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 18 14">
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
          </svg>
        </div>
      </div>

      <footer className="md:flex justify-evenly m-8 mt-14">
        <div className="mt-5"> 
          <div className="mt-5 md:text-2xl">
            <span className='text-2xl font-kalam cursor-pointer md:text-2xl' onClick={()=>router.push("/")}>CoSketch</span>
          </div>
          <div className="gap-4 flex mt-4">
            <Linkedin className="border border-gray-300 p-2 rounded-sm mr-2 cursor-pointer" size={40}/>
            < Twitter className="border border-gray-300 p-2 rounded-sm mr-2 cursor-pointer" size={40}/>
          </div>
          
        </div>

        <div className="mt-5">
          
          <div className="font-bold mt-5 md:text-2xl">
            Think it. Sketch it. Share it.
          </div>
          <div className="mt-4 md:flex justify-evenly">
            <div className="flex cursor-pointer">
              <Eye className="mr-2"/>
              Insights
              
            </div>
            <div className="flex cursor-pointer">
              <Phone className="mr-2"/>
              Contact
            </div>
          </div>
        </div>

      </footer>
    </div>



    </div>
  )
    
}

export default App;