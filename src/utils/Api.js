import Storage from "Root/Storage";

const client = process.env.NODE_ENV === "production" ? "adffdn8fw3qmj1mn9ulk1jw4d9wnq8" : "ffmytki05p9we8ubrs4tx3jbiprl6j";

const uri = process.env.NODE_ENV === "production" ? "https://mtgtournaments.org/api" : "http://localhost:3000";

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

const getProfile = async token => {
    const res = await fetch(uri + "/users/profile", {
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

const create = async ({ owner, ...data }) => {
    data = {...data, owner: owner};
    const res = await fetch(uri + '/events/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + owner
        },
        body: JSON.stringify(data)
    });
    return await res.json();
};

const searchChannel = async ({ query }) => {
    query = encodeURIComponent(query);
    if (!query) {
        return {res: []};
    }
    const res = await fetch("https://api.twitch.tv/kraken/search/channels?query=" + encodeURIComponent(query), {
        headers: {
            "Client-ID": client
        }
    });
    return await res.json();
};

const searchImage = async ({query}) => {
    query = encodeURIComponent(query);
    if (!query) {
        return {res: []};
    }
    const res = await fetch("https://api.scryfall.com/cards/autocomplete?q=" + query);
    return await res.json();
};

const code = async ({ code }) => {
    const res = await fetch(uri + "/users/profile", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Storage.Get("id")
        },
        body: JSON.stringify({magicCode: encodeURIComponent(code)})
    });
    console.log(res);
    return await res.json();
};

const handle = async ({ handle }) => {
    const res = await fetch(uri + "/users/profile", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Storage.Get("id")
        },
        body: JSON.stringify({magicHandle: encodeURIComponent(handle)})
    });
    return await res.json();
};

const register = async ({eventId, id }) => {
    const res = await fetch(uri + '/events/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + id
        },
        body: JSON.stringify({id: eventId})
    });
    const json = await res.json();
    console.log(json);
    return json;
};

const unregister = async ({eventId, id }) => {
    const res = await fetch(uri + '/events/unregister', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + id
        },
        body: JSON.stringify({id: eventId})
    });
    return await res.json();
};

const Api = {
    getUsers,
    Profile: {
        code,
        handle,
        getProfile
    },
    Scryfall: {
        searchImage,
    },
    Events: {
        getRegistered,
        getCreated,
        getAvailable,
        create,
        register,
        unregister
    },
    Twitch: {
        searchChannel,
        twitchAuth,
        twitchLogin
    }
};

export default Api;
