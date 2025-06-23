import { FiPlus, FiLogIn } from "react-icons/fi";
import { useState } from "react";

interface CardProps {
  heading: string;
  onCancel?: () => void;
  onCreate?: (roomName: string) => void;
  createLabel?: string;
  bottomHeading: string;
  placehold: string;
}

export function Card({
  heading,
  onCancel,
  onCreate,
  createLabel,
  bottomHeading,
  placehold,
}: CardProps) {
  const [roomId, setRoomId] = useState("");

 
  const icon =
    heading.toLowerCase().includes("create") ? (
      <FiPlus className="text-3xl text-green-600 mb-2" />
    ) : (
      <FiLogIn className="text-3xl text-blue-600 mb-2" />
    );

  return (
    <div className="bg-white p-8 border rounded-2xl shadow-xl w-[90vw] max-w-sm flex flex-col items-center">
      {icon}
      <h1 className="text-2xl font-bold mb-2 text-center">{heading}</h1>
      <span className="text-gray-500 text-sm mb-4 text-center">{bottomHeading}</span>
      <input
        className="w-full px-4 py-2 mb-6 border border-gray-300 rounded focus:outline-none focus:border-black transition"
        type="text"
        value={roomId}
        onChange={e => setRoomId(e.target.value)}
        placeholder={placehold}
      />
      <div className="flex justify-end gap-2 w-full">
        <button
          className="px-4 py-2 rounded bg-gray-200 text-black hover:bg-gray-300 transition"
          onClick={onCancel}
          type="button"
        >
          Cancel
        </button>
        <button
          className={`px-4 py-2 rounded text-white transition ${
            heading.toLowerCase().includes("create")
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={() => onCreate?.(roomId)}
          type="button"
        >
          {createLabel}
        </button>
      </div>
    </div>
  );
}