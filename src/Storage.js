
const Storage = window.localStorage;

const Store = (key, value) => {
    Storage.setItem(key, value);
};

const Delete = key => {
    Storage.removeItem(key);
};

const Get = (key) => Storage.getItem(key);

export default { Store: Store, Get : Get, Delete: Delete };
