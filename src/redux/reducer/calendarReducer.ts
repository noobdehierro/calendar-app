import { Evento } from "../../helpers/events";

interface CalendarState {
    events: Evento[],
    activeEvent: null | Evento

}

export type CalendarActions =
    { type: 'eventSetActive', payload: Evento } |
    { type: 'eventLoaded', payload: Evento[] } |
    { type: 'eventClearActiveEvent' } |
    { type: 'eventAddNew', payload: Evento } |
    { type: 'eventUpdated', payload: Evento } |
    { type: 'eventDeleted' } |
    { type: 'eventLogout' }


const initialState: CalendarState = {
    events: [],
    activeEvent: null
};




export const calendarReducer = (state = initialState, action: CalendarActions): CalendarState => {
    switch (action.type) {
        case "eventSetActive":

            return {
                ...state,
                activeEvent: action.payload
            }

        case "eventLoaded":
            return {
                ...state,
                events: [...action.payload]
            }
        case "eventClearActiveEvent":
            return {
                ...state,
                activeEvent: null
            }
        case 'eventAddNew':
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }
        case 'eventUpdated':
            return {
                ...state,
                events: state.events.map(
                    e => (e.id === action.payload.id) ? action.payload : e
                )
            }

            case 'eventDeleted':
            return {
                ...state,
                events: state.events.filter(
                    e => ( e.id !== state.activeEvent!.id )
                ),
                activeEvent: null
            }

            case 'eventLogout':
            return {
                ...initialState
            }

        default:
            return state;
    }
}
