const initialState = {
    loading: false,
};

export default function AppReducer (state= initialState, action){
    switch (action.type) {
        case "api.loading":
            return {
                ...state,
                loading: true
            }
        case "api.success":
            return {
                ...state,
                loading: false
            }

        default:
            return state
    }
}