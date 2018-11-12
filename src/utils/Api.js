
const uri = "http://localhost:3000";


const getUsers = async (payload) => {
    const res = await fetch(uri + "/users");
    const data = await res.json();
    return data;
};

const twitchAuth = async code => {
    const res = await fetch(uri + "/twitch/auth", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            code: code
        })
    });
    return await res.json();
};

const twitchLogin = async token => {
    const res = await fetch(uri + "/twitch/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token})
    });
    return await res.json();
};

const twitchProfile = async token => {
    const res = await fetch(uri + "/twitch/profile", {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    return await res.json();
};

const getRegistered = async id => {
    const res = await fetch(uri + '/events/registered', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + id
        }
    });
    return await res.json();
};

const getCreated = async id => {
    const res = await fetch(uri + '/events/created', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + id
        }
    });
    return await res.json();
};

const getAvailable = async ({ id, scope }) => {
    console.log(id, scope);
    const res = await fetch(uri + '/events/available?scope=' + scope, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + id
        }
    });
    return await res.json();
};

const Api = {
    getUsers,
    Events: {
        getRegistered,
        getCreated,
        getAvailable
    },
    Twitch: {
        twitchAuth,
        twitchLogin,
        twitchProfile
    }
};

export default Api;
