const protocol = window.location.protocol;
const base = window.location.host;

export const SETTINGS = {
    baseApiUrl: `${protocol}//${base}`,
    sdisApi: '/api/sdis',
    header: {
        title: 'SDIS 84',
        src: 'public/resources/img/sdis84.jpeg', //si l'urlExterne n'est pas atteignable, l'image locale définie ici (src) est chargé.
        urlExterne: 'https://www.pompiercenter.com/images/sdis/logos/84logo_horizontal-couleur.jpg', //mettre vide pour forcer l'utilisation de l'image local (src)
        alternativeText: 'SDIS 84',
        width: '160px'
    }
}
