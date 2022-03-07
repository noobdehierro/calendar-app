import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { State } from '../redux/reducer/rootReducer';



export const PublicRoutes = ({children}:any) => {

   const {uid} = useSelector((state:State)=> state.auth)


//    return <><h3>hola</h3>
//     {children}
//    </>
return uid ? <Navigate to={'/'}/> : {...children}
}
