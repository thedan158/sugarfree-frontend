const initialState = {
    countries: [],
    documentType: [],
}

export default function SettingReducer(state = initialState, action) {
    switch (action.type) {
        case "getCountry.reply":
            return {
                ...state,
                countries: action.data
            }
        case "getDocumentType.reply":
            return {
                ...state,
                documentType: action.data.data
            }
        default:
            return state
    }
}

