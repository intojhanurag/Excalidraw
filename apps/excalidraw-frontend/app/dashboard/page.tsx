"use client"
import { FiPlus } from 'react-icons/fi';         // Feather Plus
import { FiUsers } from 'react-icons/fi';
import { Card } from '../component/Card';
import { useState } from 'react';

export default function dashboard(){

    const [openModal,setOpenModal]=useState<"create"|"join"|null>(null);
    
    return (
        <div>
            <div className='flex justify-between items-center px-4 py-4'>
                <span className=' text-2xl font-kalam'>CoSketch</span>
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
            </div>

            {openModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <Card
                        heading={openModal === "create" ? "Create New Room" : "Join Existing Room"}
                        onCancel={() => setOpenModal(null)}
                        onCreate={roomId => {
                            // handle create/join logic here
                            setOpenModal(null);
                        }}
                        createLabel={openModal === "create" ? "Create" : "Join"}
                    />
                </div>
            )}
        </div>
    )
}