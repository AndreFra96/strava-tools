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
    console.log(activies)
    return (        
        <div>                   
            {/* <div id="back_button_container">            
                <button onClick={() => {location.href="/user/"}}>Home</button>             
            </div>  */}
            {/* {JSON.stringify(stats)} */}

            <div style={{marginBottom: "10px"}}>
                <a href="/user">Home</a>
            </div>
            
            <table style={{
                border: "2px solid black",
                width: "100%",
                marginLeft: "auto",
                marginTop: "auto",
                marginRight: "auto",
                }
                }>
                <tr style={{textAlign: "left"}}>
                    <th>                    
                        Name                        
                    </th>
                    <th>
                        Distance
                    </th>
                    <th>
                        Sport
                    </th>
                    <th>
                        Time
                    </th>
                </tr>
               {
                activies.map((item:any, index:number) => {
                    const myColor = index % 2 === 0 ? {backgroundColor:	"aliceblue"} : {backgroundColor: "white"};
                    return <tr key={item} style={myColor}>
                        <td>{item.name}</td>
                        <td>{item.distance}</td>
                        <td>{item.type}</td>
                        <td>
                        {
                        Math.floor(item.moving_time / 3600)}h : {Math.floor((item.moving_time % 3600) / 60)}m</td>
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