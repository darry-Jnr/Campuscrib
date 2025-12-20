"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";



const LoginButton = () => {
    const router = useRouter();
  return (
    <div>
      <Button 
      label="Login"
      outline={true}
      onClick={()=> {router.push('/auth/login')}}
      />
    </div>
  )
}

export default LoginButton
