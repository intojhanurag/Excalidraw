import { Divide } from "lucide-react";
import { ReactNode, useState } from "react";



interface FeatureCardProps{
    heading:string;
    description:string;
    logo:ReactNode

}

export function FeatureCard({ heading, description,logo}: FeatureCardProps){
    return (
        <div className="block max-w-sm p-4 hover:shadow-xl  bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="p-2">
                {logo}
            </div>
            <div className="text-sm md:text-base p-2 font-bold">
                {heading}
            </div>
            <div className="text-gray-500 text-sm md:text-base p-2">
                {description}
            </div>
        </div>
    )

}