import {useContext, useEffect} from "react";
import {useFetch} from "../hooks/useFetch";
import {CurrentUserContext} from "../contexts/currentUser";
import {useLocalStorage} from "../hooks/useLocalStorage";

const CurrentUserChecker = ({children}) => {
    const [{response}, doFetch] = useFetch('/user')
    const [, dispatch] = useContext(CurrentUserContext)
    const [token] = useLocalStorage('token')

    useEffect(()=> {
        if (!token) {
            dispatch({type: 'SET_UNAUTHORIZED'})
            // setCurrentUserState(state => ({
            //         ...state,
            //         isLoggedIn:false
            //     }))
            return
        }
        doFetch()
        dispatch({type: 'LOADING'})
        // setCurrentUserState(state => ({
        //         ...state,
        //         isLoading:true
        //     }))
    },[dispatch , token , doFetch])

    useEffect(()=> {
        if (!response) return
        dispatch({type: 'SET_AUTHORIZED', payload:response.user})
        // setCurrentUserState(state => ({
        //     ...state,
        //     isLoggedIn: true,
        //     isLoading: false,
        //     currentUser: response.user
        // }))
    },[response, dispatch])
    return children
}

export default CurrentUserChecker