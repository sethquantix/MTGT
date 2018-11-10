
export const parseParameters = path => {
    let query = path.substring(1);
    let lets = query.split('&');
    return lets.reduce((x, next) => {
        let pair = next.split('=');
        return {...x, [decodeURIComponent(pair[0])]: decodeURIComponent(pair[1])};
    }, {});
};

