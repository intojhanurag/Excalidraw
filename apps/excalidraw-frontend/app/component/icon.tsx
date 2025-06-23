import { ReactNode } from "react";

export function IconButton({
    icon, onClick, activated
}: {
    icon: ReactNode,
    onClick: () => void,
    activated: boolean
}) {
    return <div className={`m-2 pointer rounded-full border p-2 bg-black text-white hover:bg-gray ${activated ? "bg-blue-500" : "text-white"  }` } onClick={onClick}>
        {icon}
    </div>
}