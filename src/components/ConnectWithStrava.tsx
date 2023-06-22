

export default function ConnectWithStrava() {
    const stravaLink = `https://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${process.env.STRAVA_REDIRECT_URI}&scope=activity:read_all`
    return <a href={stravaLink} ><div style={{
        cursor: "pointer",
        width: "195px",
        height: "45px",
        backgroundImage: "url(/connect-with-strava.svg)",
    }}></div></a>
}