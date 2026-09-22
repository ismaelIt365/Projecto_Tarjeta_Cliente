// Keep this content contract in sync with the two public sites and the editor.
export const promotionDefaults = {
    espana: {
        locale: 'es',
        headline: 'LLEGA A',
        headlineBold: 'ZARAGOZA',
        address: 'José Luís Pomarón, 17',
        intro: 'Y PARA CELEBRARLO,\nTE REGALAMOS',
        offerFirst: 'UNA BARRA DE PAN',
        offerJoin: 'O UN',
        offerSecond: 'CAFÉ',
        formTitle: 'INSCRÍBETE AQUÍ PARA CONSEGUIRLO',
        emailPlaceholder: 'ESCRIBE TU EMAIL',
        buttonText: 'LO QUIERO',
        newsletterLabel: 'Suscríbete a la newsletter',
        privacyText: 'Al hacer uso de esta web, aceptas nuestras',
        privacyLabel: 'políticas de privacidad',
        privacyUrl: 'https://365obrador.com/es/politica-de-privacidad/',
        logoUrl: '',
        imageUrl: '',
        imageAlt: 'Croissant y café',
        backgroundColor: '#ece9e3',
        primaryColor: '#ea7463',
        accentColor: '#e66c5a',
        showNewsletterCheckbox: true,
        showLogo: true,
        showHeadline: true,
        showAddress: true,
        showPromoText: true,
        showPromoImage: true,
    },
    catalunya: {
        locale: 'ca',
        headline: '',
        headlineBold: '',
        address: '',
        intro: 'I PER CELEBRAR-HO,\nET REGALEM',
        offerFirst: 'UNA BARRA DE PA',
        offerJoin: 'O UN',
        offerSecond: 'CAFÈ',
        formTitle: 'INSCRIU-TE AQUÍ PER ACONSEGUIR-LO',
        emailPlaceholder: 'ESCRIU EL TEU CORREU',
        buttonText: 'HO VULL',
        newsletterLabel: 'Subscriu-te a la newsletter',
        privacyText: 'En fer ús d’aquesta web, acceptes les nostres',
        privacyLabel: 'polítiques de privacitat',
        privacyUrl: 'https://365obrador.com/es/politica-de-privacidad/',
        logoUrl: '',
        imageUrl: '',
        imageAlt: 'Croissant i cafè',
        backgroundColor: '#ece9e3',
        primaryColor: '#ea7463',
        accentColor: '#e66c5a',
        showNewsletterCheckbox: true,
        showLogo: true,
        showHeadline: true,
        showAddress: true,
        showPromoText: true,
        showPromoImage: true,
    },
};
export function isPromotionId(id) {
    return Object.prototype.hasOwnProperty.call(promotionDefaults, id);
}
// Validate the whole document; never accept HTML, API endpoints or arbitrary properties.
export function validatePromotionContent(value, id) {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        throw new Error('Contenido inválido');
    const defaults = promotionDefaults[id];
    // Older published documents and history snapshots retain their original appearance.
    const data = {
        backgroundColor: defaults.backgroundColor,
        primaryColor: defaults.primaryColor,
        accentColor: defaults.accentColor,
        showNewsletterCheckbox: defaults.showNewsletterCheckbox,
        ...value,
    };
    const keys = Object.keys(defaults);
    if (Object.keys(data).some((key) => !keys.includes(key)))
        throw new Error('Campo no permitido');
    for (const key of keys) {
        const field = data[key];
        if (typeof field !== typeof defaults[key])
            throw new Error(`Campo inválido: ${key}`);
        if (typeof field === 'string') {
            if (key.endsWith('Color') && !/^#[0-9a-f]{6}$/i.test(field))
                throw new Error('Color inválido: ' + key);
            const limit = key.endsWith('Url') ? 2048 : key === 'intro' ? 300 : 180;
            if (field.length > limit)
                throw new Error(`Texto demasiado largo: ${key}`);
            if (key.endsWith('Url') && field) {
                let url;
                try {
                    url = new URL(field);
                }
                catch {
                    throw new Error(`URL inválida: ${key}`);
                }
                if (url.protocol !== 'https:' || url.username || url.password)
                    throw new Error(`Usa una URL HTTPS: ${key}`);
            }
        }
    }
    if (data.locale !== defaults.locale)
        throw new Error('El idioma de esta promoción no se puede cambiar');
    for (const key of [
        'formTitle',
        'emailPlaceholder',
        'buttonText',
        'newsletterLabel',
        'privacyText',
        'privacyLabel',
        'privacyUrl',
    ]) {
        if (!data[key].trim())
            throw new Error(`Campo obligatorio: ${key}`);
    }
    return Object.fromEntries(keys.map((key) => [key, data[key]]));
}
