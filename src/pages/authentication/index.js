import React, {useEffect, useState, useContext} from "react";
import {useFetch} from "../../hooks/useFetch";

import {Link,Redirect} from "react-router-dom";
import {useLocalStorage} from "../../hooks/useLocalStorage";

import {CurrentUserContext} from "../../contexts/currentUser";
import BackendErrorMessages from "../../components/backendErrorMessages";

const Authentication = props => {
    const isLogin = props.match.path === '/login'
    const pageTitle = isLogin ? 'Sign In' : 'Sign Up'
    const descriptionLink = isLogin ? '/register' : '/login'
    const descriptionText = isLogin ? 'Need an account?' : 'Have an account?'
    const apiUrl = isLogin ? '/users/login' : '/users'

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)
    const [isSuccessfullSubmit, setIsSuccessefullSubmit] = useState(false)
    const [, setToken] = useLocalStorage('token')
    const [, dispatch] = useContext(CurrentUserContext)

    // console.log(isLogin)

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('Email ',email,' Password',password)
        const user = isLogin ? {email,password} : {username,email,password}
        doFetch({
            method: 'post',
            data: {
                user
            }
        })
    }

    useEffect(()=> {
        if (!response) return
        setToken(response.user.token)
        setIsSuccessefullSubmit(true)
        dispatch({type: 'SET_AUTHORIZED', payload: response.user})
        // setCurrentUserState(state => ({
        //     ...state,
        //     isLoggedIn: true,
        //     isLoading: false,
        //     currentUser: response.user
        // }))
    },[response, setToken, dispatch])

    if (isSuccessfullSubmit) {
        return <Redirect to='/'/>
    }

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">{pageTitle}</h1>
                        <p className="text-xs-center">
                            <Link to={descriptionLink}>
                                {descriptionText}
                            </Link>
                        </p>
                        <form onSubmit={handleSubmit}>
                            {error && <BackendErrorMessages backendErrors={error.errors} />}
                            <fieldset>
                                {!isLogin &&
                                    <fieldset className="form-group">
                                        <input
                                            type="text"
                                            placeholder="Username"
                                            className="form-control form-control-lg"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}/>

                                    </fieldset>
                                }
                                <fieldset className="form-group">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="form-control form-control-lg"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}/>

                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="form-control form-control-lg"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}/>
                                </fieldset>
                                <button
                                    disabled={isLoading}
                                    className="btn btn-lg btn-primary pull-xs-right" type="submit">
                                    {pageTitle}
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authentication