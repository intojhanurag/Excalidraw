"use client"
import { FiPlus } from 'react-icons/fi';         // Feather Plus
import { FiUsers,FiCopy,FiEdit2,FiClock } from 'react-icons/fi';
import { Card } from '../component/Card';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


export default function dashboard(){

    const [openModal,setOpenModal]=useState<"create"|"join"|null>(null);
    const [rooms,setRooms]=useState<any[]>([]);
    const [copied,setCopied]=useState(false);
    const router = useRouter();

    useEffect(() => {
        const savedRooms = localStorage.getItem("rooms");
        if (savedRooms) {
            setRooms(JSON.parse(savedRooms));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("rooms", JSON.stringify(rooms));
    }, [rooms]);

    async function handleCreateRoom(roomName:string){
        const token=localStorage.getItem("token");

        const res=await fetch("http://localhost:3001/room",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify({name:roomName})
        })

        const data=await res.json();

        if(res.ok && data.roomId){
            console.log(data.roomId)
            fetchRooms();
        }else{
            alert(data.message||"Room creation failed")
        }
    }

    async function  handleJoinRoom(roomSlug:string) {
        const res=await fetch(`http://localhost:3001/room/${roomSlug}`)
        const data=await res.json();

        if(data.room){

            router.push(`/canvas/${data.room.id}`);
        }else{
            alert("Room not found")
        }
        
    }

    async function  fetchRooms() {
        const token=localStorage.getItem("token");
        const res=await fetch("http://localhost:3001/my-rooms",{
            headers:{Authorization:`Bearer ${token}`}
        })

        const data=await res.json();

        setRooms(data.rooms||[])
        
    }

    useEffect(()=>{
        fetchRooms();
    },[])

    function handleCopy(roomId:string){
        navigator.clipboard.writeText(roomId);
        setCopied(true);
        setTimeout(()=>setCopied(false),1500)
        
    }
    return (
        <div>
             {copied && (
                <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="bg-green-600 text-white px-6 py-3 rounded shadow transition">
                    Room ID copied!
                    </div>
                </div>
            )}
            <div className='flex justify-between items-center px-4 py-4'>
                <span className=' text-2xl font-kalam cursor-pointer' onClick={()=>router.push("/")}>CoSketch</span>
                <div className='flex gap-2'>
                    <button className='bg-black text-white rounded-sm p-2' onClick={()=>setOpenModal("create")}>Create Room</button>
                    <button className='bg-white shadow border border-black text-black rounded-sm p-2'>Logout</button>
                </div>
            </div>
            <div className='bg-white grid grid-cols-1 p-4 md:grid-cols-2 gap-4 '>
                <div className='flex items-center gap-4 text-2xl border border-gray-300 rounded-xl shadow p-5 cursor-pointer' onClick={()=>setOpenModal("create")}>
                    <FiPlus className='bg-gray-100 rounded-full text-4xl p-1 hover:bg-black hover:text-white'/>
                    <div>
                        <div className='text-black text-xl'>
                        <h1 className='font-bold' >Create New Room</h1>
                        </div>
                        <div className='text-gray-500 text-sm '>
                            Start a new collaborative drawing session
                        </div>
                    </div>
                </div>

                <div className='flex items-center gap-4 text-2xl border border-gray-300 rounded-xl shadow p-5 cursor-pointer' onClick={()=>setOpenModal("join")}>
                    <FiUsers className='bg-gray-100 text-3xl rounded-full hover:bg-black hover:text-white'/>
                    <div>
                        <div className='text-black text-xl'>
                            <h1 className='font-bold'>Join Existing Room</h1>
                        </div>
                        <div className='text-gray-500 text-sm'>
                            Enter a room code to collaborate
                        </div>
                    </div>

                </div>
            </div>

            <div className='pt-20 p-4 rounded-xl'>
                <div className='border shadow p-4'>
                    <h1 className=' font-semibold '>Your Rooms</h1>
            
                </div>
                
                {rooms.map(room=>(
                    <div className='border shadow p-4 flex justify-between'>
                        
                        <div className='flex items-center gap-4 '>
                            <FiEdit2/>
                            <div>
                                <div className='font-bold'>
                                    {room.name}
                                </div>
                                <div className='flex flex-col md:flex-row md:items-center text-sm'>
                                    <div className='flex items-center'>
                                        <FiClock className='hidden md:inline'/>
                                        <span className='pl-2 hidden md:inline'>Created {room.createAt?new Date(room.createAt).toLocaleString():""}</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <span className='md:pl-4 pr-2'>RoomId: {room.id}</span>
                                        <FiCopy className='cursor-pointer' onClick={()=>handleCopy(room.id)}/>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        
                        <div className='flex items-center'>
                            <FiUsers/>
                            <span>{room.people}</span>
                            <button className='text-blue-600 pl-6 cursor-pointer' onClick={()=>router.push(`/canvas/${room.id}`)}>
                                Join
                            </button>

                        </div>
                    </div>
                ))}
                
            </div>

            {openModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <Card
                        heading={openModal === "create" ? "Create New Room" : "Join Existing Room"}
                        onCancel={() => setOpenModal(null)}
                        onCreate={roomName => {
                            // handle create/join logic here
                            if(openModal==="create"){
                                handleCreateRoom(roomName)
                            } else if(openModal==="join"){
                                handleJoinRoom(roomName);
                            }
                            setOpenModal(null);
                        }}
                        createLabel={openModal === "create" ? "Create" : "Join"}
                    />
                </div>
            )}
        </div>
    )
}