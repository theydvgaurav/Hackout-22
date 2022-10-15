import { createStore, action, persist } from 'easy-peasy';

const defaultState = {
    name: '',
    email: '',
    token: ''
};

const store = createStore(
    persist({
        ...defaultState,

        

    }));

export default store;