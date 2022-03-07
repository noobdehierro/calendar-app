import { fetchConToken, fetchSinToken } from "../../helpers/fetch";
import { eventLogout } from "./events";

interface UserProps {
    uid: string,
    name: string
}

export const startLogin = (email: string, password: string) => {
    return async (dispatch: any) => {

        const resp = await fetchSinToken({endpoint:'auth', data:{ email, password }, method:'POST'});
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            // Swal.fire('Error', body.msg, 'error');
            console.log(body.msg)
        }


    }
}
const login = (user: UserProps) => ({
    type: 'authLogin',
    payload: user
});

export const startLogout = () => {
    return ( dispatch:any ) => {

        localStorage.clear();
        dispatch( eventLogout() );
        dispatch( {type:'authLogout'} );
    }
}

export const startChecking = () => {
    return async(dispatch:any) => {

        const resp = await fetchConToken( {endpoint:'auth/renew' });
        const body = await resp.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime().toString() );

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        } else {
            dispatch( { type: 'authCheckingFinish' } );
        }
    }
}

export const startRegister = ( {email,password,name}:{email:string, password:string, name:string})=>{
    return async( dispatch:any ) => {

        const resp = await fetchSinToken( {endpoint:'auth/new', data:{ email, password, name }, method:'POST'} );
        const body = await resp.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime().toString() );

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        } else {
            // Swal.fire('Error', body.msg, 'error');
            console.log(body.msg)
        }


    }
}