'use client';

import { IconType } from "react-icons";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled: boolean;
    outline: boolean;
    icon: IconType;
  
}

const Button = ({label, onClick, disabled, outline,icon:Icon}:ButtonProps) => {
  return (
    <button
    onClick={onClick}
        disabled= {disabled}
    
    className={`
    relative disabled:opacity-70 disabled: rounded-lg h-full w-full transition disabled:cursor-not-allowed 
    ${ outline? `bg-white` : `bg-green-500`}
    ${ outline? `border-black` : `border-green-500`}
    ${ outline? `text-black` : `text-white`}
  
    `}>
        {Icon && (
            <Icon size={24} className=" absolute left-4 top-3" />
        )}
        {label}
    </button>
  )
}

export default Button