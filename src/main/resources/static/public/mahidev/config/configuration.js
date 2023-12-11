const protocol = window.location.protocol;
const base = window.location.host;

export const SETTINGS = {
    baseApiUrl: `${protocol}//${base}`,
    sdisApi: '/api/sdis'
}
