import { getAthleteActivies, getAthleteStats } from "@/functions";
import { cookies } from "next/dist/client/components/headers";

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
            <table style={{ border: "1px solid black" }}>
                {
                    activies.map((item: any) => {
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
 * Restituisce la sessione attiva
 * 
 * TODO: questa funzione dovrebbe essere spostata in un file a parte
 */
function getSession() {
    //grazie al middleware abbiamo certezza che la sessione sia presente
    const session = cookies().get('strava_session')!.value;
    return JSON.parse(session);
}

async function getStats() {

    const session = getSession();

    return await getAthleteStats(session.access_token, session.athlete.id)

}

async function getActivies() {

    const session = getSession();

    return await getAthleteActivies(session.access_token)

}