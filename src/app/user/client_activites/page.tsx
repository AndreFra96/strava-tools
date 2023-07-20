'use client';

import { useEffect, useState } from "react";

export default function ClientActivities() {

    const [paginaAttiva, setPaginaAttiva] = useState(1);
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("scarico i dati della pagina " + paginaAttiva)
        fetch(`/api/strava/activity?page=${paginaAttiva}`).then(async (data) => {
            setData(await data.json());
        })
    }, [paginaAttiva])

    return <div>
        {paginaAttiva}
        {JSON.stringify(data)}
        <table>
            <thead>
                <tr>
                    <th>ciasonc</th>
                    <th>ncasocns</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Nome</td>
                    <td>Valore</td>
                </tr>
            </tbody>
        </table>

        <button onClick={() => setPaginaAttiva(1)}>pagina 1</button>
        <button onClick={() => setPaginaAttiva(2)}>pagina 2</button>
    </div>
}