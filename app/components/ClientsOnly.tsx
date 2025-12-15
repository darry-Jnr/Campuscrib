'use client';

import { useEffect, useState } from "react"

interface ClientsOnlyProps {
    children : React.ReactNode
}

const ClientsOnly = ({children}: ClientsOnlyProps) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect (() => {
        setHasMounted(true)
    }, [])

    if (!hasMounted) {
        return null;
    }
  return (
    <div>
        <>
        {children}
        </>
    </div>
  )
}

export default ClientsOnly