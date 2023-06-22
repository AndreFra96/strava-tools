'use client';

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Attivita() {
    const params = useSearchParams();
    const [session, setSession] = useState({})

    useEffect(() => {
        if (!params.has('code')) return;
        const code = params.get('code');
        fetch(`/auth/${code}`).then(async (response) => {
            setSession(await response.json())
        })
    }, [params])

    return (
        <div>{JSON.stringify(session)}</div>
    )
}