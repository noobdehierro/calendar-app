
interface AuthState {
    checking: boolean,
    uid: null | string,
    name: null | string
}
export type AuthUser = { uid: string, name: string }


type AuthActions =
    { type: 'authLogin', payload: AuthUser } |
    { type: 'authCheckingFinish' } |
    { type: 'authLogout' }


const initialState: AuthState = {
    checking: true,
    uid: null,
    name: null
}

export const authReducer = (state = initialState, action: AuthActions): AuthState => {
    switch (action.type) {
        case 'authLogin':
            return {
                ...state,
                ...action.payload,
                checking: false
            }
        case 'authCheckingFinish':
            return {
                ...state,
                checking: false
            }
        case "authLogout":
            return {
                uid: null, name: null, checking: false
            }

        default:
            return state;
    }
}