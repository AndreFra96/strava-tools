import { getAthleteActivies, getAthleteStats } from "@/functions";
import { cookies } from "next/dist/client/components/headers";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type Session = {
    error?: string;
    data?: any
}

let session:Session|null = null;

export default async function Attivita() {

    const stats = await getStats();
    const activies = await getActivies();

    return (        
        <div>                   
            {/* <div id="back_button_container">            
                <button onClick={() => {location.href="/user/"}}>Home</button>             
            </div>  */}
            {/* {JSON.stringify(stats)} */}

            <a href="/user/">Home</a>
            <table style={{border: "1px solid black"}}>
               {
                activies.map((item:any) => {
                    return <tr key={item}>
                        <td>{item.name}</td>
                        <td>{item.distance}</td>
                    </tr>
                })
               }
            </table>
            
            
        </div> 
        
    )
}

/**
 * Se la sessione non è ancora stata caricata, carica la sessione
 * 
 * (session non caricata vuol dire session = null)
 */
function getSession() {
    console.log("iniziato get session");
    if(session !== null) return session;
    console.log("caricata sessione");
    
    const session_cookie = cookies().get('strava_session')

    if(!session_cookie || !session_cookie.value){
        session = {
            error: 'Session not found',
        }
        return session
    }

    session = {
        data: JSON.parse(session_cookie.value)
    }

    return session;
}

async function getStats(){

    const session =  getSession();


    if(session.error)
        return  {error: session?.error}


    return await getAthleteStats(session.data.access_token, session.data.athlete.id)

}

async function getActivies(){

    const session =  getSession();

    if(session.error)
        return  {error: session?.error} //provaaaa

    return await getAthleteActivies(session.data.access_token)

}