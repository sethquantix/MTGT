
export const parseParameters = path => {
    let query = path.substring(1);
    let lets = query.split('&');
    return lets.reduce((x, next) => {
        let pair = next.split('=');
        return {...x, [decodeURIComponent(pair[0])]: decodeURIComponent(pair[1])};
    }, {});
};

export const toLocale = date => {
    const opts = { month: 'long', day: 'numeric', hour12: true, hour: '2-digit', minute: '2-digit' };

    const _date = new Date(date);
    return _date.toLocaleDateString('en-US', opts);
}

export const grnRand = () => Math.floor(1 + Math.random() * Math.floor(274));
