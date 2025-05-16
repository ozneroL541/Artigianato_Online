/**
 * This object contains the current state of the program. It has values about: `user info`
 * */
const state = {
    user: {
        isLogged: false,
        jwt_Token: null,
        userType: null, // [Artigiano | Client]
        username: null,
    }
};

const listeners = [];

const updateUserInfo = (newState) => {
    Object.assign(state.user, newState);
    listeners.forEach(listener => listener(state));
};

const subscribe = (listener) => {
    listeners.push(listener);
};

export { state, updateUserInfo, subscribe };
