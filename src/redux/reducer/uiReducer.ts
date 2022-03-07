
interface modal {
    modalOpen: boolean
}

const initialState: modal = {
    modalOpen: false,
}

export type ModalActions =
    { type: 'uiOpenModal' } | { type: 'uiCloseModal' }

export const uiReducer = (state = initialState, action: ModalActions): modal => {
    switch (action.type) {
        case "uiOpenModal":
            return {
                ...state,
                modalOpen: true
            }
        case 'uiCloseModal':
            return {
                ...state,
                modalOpen: false
            }
        default:
            return state
    }
}
