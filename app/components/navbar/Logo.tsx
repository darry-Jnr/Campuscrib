'use client';

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Logo = () => {
  const router = useRouter();

  return (
    <motion.div
      onClick={() => router.push("/")}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      className="flex items-center gap-2 cursor-pointer select-none"
    >
      {/* Text */}
      <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-800">
        Campus
        <span className=" text-green-500  bg-clip-text ">
          Crib
        </span>
      </h1>
    </motion.div>
  );
};

export default Logo;
