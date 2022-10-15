import { createStore, action, persist } from 'easy-peasy';

const defaultState = {
    
};

const store = createStore(
    persist({
        ...defaultState,

        

    }));

export default store;