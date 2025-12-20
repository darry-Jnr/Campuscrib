"use client";

import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  disabled?: boolean;
  title: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string
}

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  disabled,
  footer,
  actionLabel

}: ModalProps) => {
  const [showModal, setShowModal] = useState(!!isOpen);

useEffect(()=> {
  setShowModal(!!isOpen)
}, [isOpen])

  const handleClose = () => {
    if (disabled) return ;
    setShowModal(false)
    onClose();
  }

  const handleonSubmit = () => {
    if (disabled) return ;
    onSubmit();
  }

   if (!isOpen) return null;
  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-neutral-800/70">
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 mx-auto h-full lg:h-auto md:h-auto">
        <div
          className={`
            transform duration-300 h-full
            ${
              showModal
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }
            `}
        >
          <div className="h-full  lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none">
            
            {/* HEADER */}
            <div className="flex items-center p-6 rounded-t justify-center relative border-b-2">
              <button onClick={handleClose} disabled={disabled} className="p-1 border-0 hover:opacity-70 transition absolute left-9">
                <IoMdClose size={18} />
              </button>
             <div className="text-lg font-semibold">{title}</div>
            </div>


              {/* BODY */}
              <div className="relative p-6 flex-auto">{body}</div>


              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <Button 
                label={actionLabel}
                onClick={handleonSubmit}
                outline={false}
              
                />
                {footer}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
