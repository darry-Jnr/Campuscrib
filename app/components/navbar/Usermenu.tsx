'use clients';
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";

const Usermenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, [])

    return (
        <div className="flex border md:border-gray-400 rounded-full p-2 flex-row items-center gap-3">
               <AiOutlineMenu onClick={toggleOpen} size={24} />
               <div className="hidden md:block">
               <Avatar />
               </div>
               
               {isOpen &&(
                <div
                className="absolute rounded-xl shadow-md md:w-[200px] bg-white overflow-hidden top-12 right-0 text-sm"
                >
                <div className="flex flex-col cursor-pointer">
                    <>
                    <MenuItem
                    onClick={() => {}}
                    label="Login"
                    />

                    <MenuItem
                    onClick={() => {}}
                    label="Sign Up"
                    />
                    </>
                </div>
                </div>
               )}
        </div>
    )
};
export default Usermenu;