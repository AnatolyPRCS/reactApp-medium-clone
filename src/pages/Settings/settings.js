import React, {useContext, useEffect, useState} from "react";

import {Redirect} from "react-router-dom";

import {CurrentUserContext} from "../../contexts/currentUser";

import BackendErrorMessages from "../../components/backendErrorMessages";

import {useFetch} from "../../hooks/useFetch";
import {useLocalStorage} from "../../hooks/useLocalStorage";

const Settings = () => {
    const [currentUserState, dispatch] = useContext(CurrentUserContext)

    const apiUrl = '/user'
    const [{response, error}, doFetch] = useFetch(apiUrl)

    const [image, setImage] = useState('')
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSuccessefullLogout, setIsSuccessefullLogout] = useState(false)

    const [, setToken] = useLocalStorage('token')

    console.log('Settings currentUserState ',currentUserState)

    const handleSubmit = event => {
        event.preventDefault()
        doFetch({
            method: 'put',
            data: {
                user: {
                    ...currentUserState.currentUser,
                    image,
                    bio,
                    email,
                    password
                }
            }
        })
    }

    const logout = event => {
        event.preventDefault()
        setToken('')
        dispatch({type: 'LOGOUT'})
        setIsSuccessefullLogout(true)
    }

    useEffect(() => {
        if (!currentUserState.currentUser) return
        setImage(currentUserState.currentUser.image === null ? '' : currentUserState.currentUser.image)
        setUsername(currentUserState.currentUser.username)
        setBio(currentUserState.currentUser.bio === null ? '' : currentUserState.currentUser.bio)
        setEmail(currentUserState.currentUser.email)
    },[currentUserState.currentUser])

    useEffect(()=> {
        if (!response) return
        dispatch({type: 'SET_AUTHORIZED', payload: response.user})
    },[response, dispatch])

    if (isSuccessefullLogout) {
        return <Redirect to="/" />
    }

    return (
        <div className="settings-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">
                            YourSettings
                        </h1>
                        {error && <BackendErrorMessages backendErrors={error.errors}/>}
                        <form onSubmit={handleSubmit} action="">
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="URL of profile picture"
                                        value={image}
                                        onChange={e => setImage(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Username"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea
                                        className="form-control form-control-lg"
                                        row="8"
                                        placeholder="Short bio"
                                        value={bio}
                                        onChange={e => setBio(e.target.value)}
                                    >
                                    </textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="Password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </fieldset>
                                <button
                                    type="submit"
                                    className="btn btn-primary pull-xs-right"
                                >
                                    Update settings
                                </button>
                            </fieldset>
                        </form>
                        <hr/>
                        <button
                            className="btn btn-outline-danger"
                            onClick={logout}
                        >
                            Or click here to logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings