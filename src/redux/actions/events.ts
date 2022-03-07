import { Evento } from '../../helpers/events';
import { fetchConToken } from '../../helpers/fetch';
import { prepareEvents } from '../../helpers/prepareEvents';
import { CalendarActions } from '../reducer/calendarReducer';


export const eventSetActive = (event: Evento): CalendarActions => ({
    type: 'eventSetActive',
    payload: event
});

export const eventClearActiveEvent = () => ({ type: 'eventClearActiveEvent' });



export const eventStartLoading = () => {
    return async (dispatch: any) => {

        try {

            const resp = await fetchConToken({ endpoint: 'events' });
            const body = await resp.json();

            const events = prepareEvents(body.eventos);
            dispatch({
                type: 'eventLoaded',
                payload: events
            });

        } catch (error) {
            console.log(error)
        }

    }
}

export const eventStartAddNew = (event: Evento) => {
    return async (dispatch: any, getState: any) => {

        const { uid, name } = getState().auth;

        try {
            const resp = await fetchConToken({ endpoint: 'events', data: event, method: 'POST' });
            const body = await resp.json();


            if (body.ok) {
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                dispatch({
                    type: 'eventAddNew',
                    payload: event
                });
            }


        } catch (error) {
            console.log(error);
        }
    }
}

export const eventStartUpdate = (event:Evento)=>{
    return async(dispatch:any) => {

        try {
            const resp = await fetchConToken({endpoint:`events/${ event.id }`, data:event, method:'PUT' });
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( {
                    type: 'eventUpdated',
                    payload: event
                });
            } else {
                console.log(body.msg)
            }


        } catch (error) {
            console.log(error)
        }

    }
}

export const eventStartDelete = ()=>{
    return async ( dispatch:any, getState:any ) => {

        const { id } = getState().calendar.activeEvent;
        try {
            const resp = await fetchConToken({endpoint:`events/${ id }`, method:'DELETE' });
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( { type: 'eventDeleted' });
            } else {
                // Swal.fire('Error', body.msg, 'error');
                console.log(body.msg)
            }


        } catch (error) {
            console.log(error)
        }

    }
}

export const eventLogout =() => ({ type: 'eventLogout' });