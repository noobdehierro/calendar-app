import { ModalActions } from "../reducer/uiReducer";


export const uiOpenModal = (): ModalActions => ({ type: 'uiOpenModal' })
export const uiCloseModal = (): ModalActions => ({ type: 'uiCloseModal' });