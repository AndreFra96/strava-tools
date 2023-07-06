

export default function ConnectWithStrava() {
    const stravaLink = `/api/login`
    return <a href={stravaLink} ><div style={{
        cursor: "pointer",
        width: "195px",
        height: "45px",
        backgroundImage: "url(/connect-with-strava.svg)",
    }}></div></a>
}