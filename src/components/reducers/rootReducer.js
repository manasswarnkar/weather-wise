const initialState = {
    a: 'Delhi',
    b: 'Mumbai',
    c: 'New York'
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET' :
            return{
                ...state,
                a: action.payload
            };

        default:
            return state;
    }
};
export default rootReducer;