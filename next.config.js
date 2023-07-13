/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = async (phase) => {
  console.log(`Ci troviamo nella fase: ${phase}`);
  onLaunch();
  return nextConfig;
};

/**
 * Eseguito all'avvio dell'applicazione, qui vengono eseguiti i controlli iniziali
 * @throws {Error} se almeno una variabile d'ambiente non è definita
 */
function onLaunch() {
  checkEnv();

  //qui possiamo inserire altro codice da eseguire all'avvio dell'applicazione
}

/**
 * Controlla se tutte le variabili d'ambiente sono state definite
 * @throws {Error} se almeno una variabile d'ambiente non è definita
 */
function checkEnv() {
  console.log("Eseguo controllo variabili d'ambiente");
  const requiredEnv = [
    "STRAVA_CLIENT_ID",
    "STRAVA_CLIENT_SECRET",
    "STRAVA_REDIRECT_URI",
    "STRAVA_BASE_URL",
  ];
  requiredEnv.forEach((env) => {
    if (!process.env[env])
      throw new Error(`La variabile d'ambiente ${env} non è definita`);
  });
}
