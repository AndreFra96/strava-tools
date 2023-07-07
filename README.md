## Introduzione

L'obiettivo di questo progetto è quello di implementare alcune funzionalità aggiuntive per Strava utilizzando le api ufficiali.

## Installazione ed esecuzione in locale

Per eseguire il progetto in locale eseguire i seguenti passaggi:

### 1. Ottenere una copia in locale del progetto

Il primo step necessario è quello di ottenere una copia locale del codice dove effettuare le modifiche, per farlo eseguire il seguente comando:

```shell
git clone https://github.com/AndreFra96/strava-tools.git
```

Dopo di che è possibile spostarsi all'interno della repository locale appena scaricata

```shell
cd strava-tools
```

### 2. Eseguire il setup

Una volta scaricata la copia in locale è necessario installare le dipendenze (già definite nel file package.json), per farlo eseguire il seguente comando:

```shell
npm install
```

Una volta installate le dipendenze è necessario preparare l'ambiente di esecuzione, per farlo aggiungere all'interno della cartella strava-tools un file chiamato `.env.local` con il seguente contenuto:

```
STRAVA_CLIENT_ID=<CLIENT_ID>
STRAVA_CLIENT_SECRET=<CLIENT_SECRET>
STRAVA_REDIRECT_URI=http://localhost:3000/attivita
STRAVA_BASE_URL=https://www.strava.com/api/v3
```

Sostituire <CLIENT_ID> e <CLIENT_SECRET> con id e secret ottenuti dal pannello di controllo di strava.

### 3. Lanciare l'applicazione in locale

A questo punto è possibile eseguire l'applicazione in locale lanciando il seguente comando:

```shell
npm run dev
```

L'applicazione verrà lanciata e resa disponibile di default in localhost sulla porta 3000.
