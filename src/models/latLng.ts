type Coordinates = [number, number];

/**
 * Coordinates rappresenta un'array con due numeri, dove il primo numero rappresenta
 * la latitudine e il secondo la longitudine
 * 
 * @see https://developers.strava.com/docs/reference/#api-models-LatLng
 */
export interface LatLng {
    latitude: Coordinates[number];
    longitude: Coordinates[number];
}