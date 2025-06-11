import { useState } from "react";


interface CardProps{
    heading:string;
    onCancel?:()=>void
    onCreate?:(roomId:string)=>void
    createLabel?:string
}

export function Card({ heading, onCancel, onCreate, createLabel = "Create" }: CardProps){
    const [roomId,setRoomId]=useState("");

    return (
        <div className="bg-white p-8 border rounded-2xl">
            <h1 className="text-xl font-bold mb-4">{heading}</h1>
            <span className="text-gray-500 text-sm">Enter Room Name</span>
            <label className="block text-gray-700 mb-2"></label>

            <input
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-black"
                type="text"
                value={roomId}
                onChange={e => setRoomId(e.target.value)}
                placeholder="Room ID"
            />
            <div className="flex justify-end gap-2">
                <button
                className="px-4 py-2 rounded bg-gray-200 text-black hover:bg-gray-300"
                onClick={onCancel}
                type="button"
                >
                Cancel
                </button>
                <button
                className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800"
                onClick={() => onCreate?.(roomId)}
                type="button"
                >
                {createLabel}
                </button>
            </div>

        </div>
    )
}