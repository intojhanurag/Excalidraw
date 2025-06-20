"use client"
import { FiPlus } from 'react-icons/fi';         // Feather Plus
import { FiUsers,FiCopy,FiEdit2,FiClock,FiCheck,FiTrash2,FiEye} from 'react-icons/fi';
import { Card } from '../component/Card';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '../component/ProtectedRoute';
import { ClipLoader } from 'react-spinners';


export default function dashboard(){

    const [openModal,setOpenModal]=useState<"create"|"join"|null>(null);
    const [rooms,setRooms]=useState<any[]>([]);
    const [showParticipants,setShowParticipants]=useState<string|null>(null)
    const [copiedSlug,setCopiedSlug]=useState<string|null>(null)
    const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

    const [showLogoutConfirm,setShowLoagoutConfirm]=useState(false);
    const [loading,setLoading]=useState(false)

    const[trashSlug,setTrashSlug]=useState<string|null>(null)
    const router = useRouter();

    const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.replace("/"); // or router.push("/")
    };

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

        const res=await fetch("http://localhost:3001/create-room",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify({name:roomName})
        })

        const data=await res.json();

        if(res.ok && data.roomId){
            fetchRooms();
        }else{
            alert(data.message||"Room creation failed")
        }
    }

    async function handleJoinRoom(roomSlug: string) {
        const res = await fetch(`http://localhost:3001/room/${roomSlug}/join`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
        const data = await res.json();

        if (data.message === "Joined room") {
            router.push(`/canvas/${roomSlug}`);
        } else {
            alert("Room not found or join failed");
        }
    }

    async function handleLeaveRoom(slug:string) {
        const token=localStorage.getItem("token");

        const res=await fetch("http://localhost:3001/leave-room",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,

            },
            body: JSON.stringify({ slug }),
        })

        const data = await res.json();
        // Optionally show a message or refresh the room list
        alert(data.message);
        // Refresh rooms list if needed
        fetchRooms();
        
    }

    async function  fetchRooms() {
        setLoading(true);
        const token=localStorage.getItem("token");
        const res=await fetch("http://localhost:3001/my-rooms",{
            headers:{Authorization:`Bearer ${token}`}
        })

        const data=await res.json();

        setRooms(data.rooms||[])
        setLoading(false)
        
        
    }

    useEffect(()=>{
        setLoading(true);
        fetchRooms();
        
    },[])

   

    const handleCopy = async(slug: string) => {
    if (navigator.clipboard) {
        await navigator.clipboard.writeText(slug)
        .then(() => {
            // Optionally show a toast or message
            setCopiedSlug(slug)
            setTimeout(() => setCopiedSlug(null), 1500);
        })
        .catch(() => {
            alert("Failed to copy!");
        });
    } else {
        // Fallback for older browsers
        alert("Clipboard not supported");
    }
    };
    return (
        <ProtectedRoute>
        <div>
            <div className='flex justify-between items-center px-4 py-4'>
                <span className=' text-2xl font-kalam cursor-pointer' onClick={()=>router.push("/")}>CoSketch</span>
                <div className='flex gap-2'>
                    <button className='bg-black text-white rounded-sm p-2' onClick={()=>setOpenModal("create")}>Create Room</button>
                    <button className='bg-white shadow border border-black text-black rounded-sm p-2' onClick={()=>setShowLoagoutConfirm(true)}>Logout</button>
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
                
                {loading? (
                    <div className="flex justify-center items-center h-40">
                        <ClipLoader size={40} color="#36d7b7" />
                    </div>

                ):(
                
                
                rooms.map(room=>(
                    <div className='border shadow p-4 flex justify-between gap-2 cursor-pointer hover:bg-slate-100' key={room.slug}
                    onMouseEnter={() => setHoveredRoom(room.slug)}
                    onMouseLeave={() => setHoveredRoom(null)}
                    >
                        
                        <div className='flex items-center gap-2 md:gap-4'>
                            <FiEdit2/>
                            <div>
                                <div className='font-bold'>
                                    {room.name}
                                </div>
                                <div className='flex flex-col md:flex-row md:items-center text-sm'>
                                    <div className='flex items-center'>
                                        <FiClock className='hidden md:inline'/>
                                        <span className='pl-2 hidden md:inline'>Created {room.createdAt?new Date(room.createdAt).toLocaleString():""}</span>
                                    </div>
                                    <div className='flex items-center gap-2 justify-between'>
                                        <span className='md:pl-4 pr-2'>Room Code: {room.slug}</span>
                                       
                                        
                                                               
                                        <span onClick={()=>handleCopy(room.slug)} style={{ cursor: "pointer" }}>
                                            {copiedSlug===room.slug ? <FiCheck color="green" /> : <FiCopy />}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        
                        <div className='flex items-center gap-2'>
                            <FiUsers/>
                            <span> {room.noOfParticipants}</span>
                            <button className='text-blue-600 pl-6 cursor-pointer' onClick={()=>router.push(`/canvas/${room.slug}`)}>
                                Join
                            </button>
                            {hoveredRoom === room.slug && (
                                <FiTrash2
                                className="ml-2 cursor-pointer text-red-500"
                                onClick={()=>setTrashSlug(room.slug)}
                                title="Leave Room"
                                />
                            )}

                        </div>
                    </div>)
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
                        bottomHeading={openModal==="create"?"Enter Room Name":"Enter Room Id"}
                        placehold={openModal==="create"?"Enter Room Name":"Enter Room Id"}
                    />
                </div>
            )}
        </div>
        {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <div className="text-lg font-semibold mb-4">Are you sure you want to logout?</div>
            <div className="flex gap-4">
                <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleLogout}
                >
                Yes
                </button>
                <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => setShowLoagoutConfirm(false)}
                >
                Cancel
                </button>
            </div>
            </div>
        </div>
        )}

        {trashSlug && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center border">
            <div className="text-lg font-semibold mb-4 items-center">
                Are you sure you want to delete this room?
                
                This action cannot be undone?
            </div>
            <div className="flex gap-4">
                <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={()=>handleLeaveRoom(trashSlug)}
                >
                Yes
                </button>
                <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={()=>setTrashSlug(null)}
                >
                Cancel
                </button>
            </div>
            </div>
        </div>
        )}

    </ProtectedRoute>
        
    )
}