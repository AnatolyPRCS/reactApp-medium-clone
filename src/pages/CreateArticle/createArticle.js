import React, {useContext, useEffect, useState} from "react";

import ArticleForm from "../../components/ArticleForm/ArticleForm";
import {useFetch} from "../../hooks/useFetch";
import {Redirect} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/currentUser";

const CreateArticle = () => {

    const apiUrl = '/articles'
    const [{response,error}, doFetch] = useFetch(apiUrl)

    const [currentUserState] = useContext(CurrentUserContext)

    console.log('createArticle Error',error)

    const initialValues = {
        title: '',
        description: '',
        body: '',
        tagList: []
    }

    const [isSuccessefullSubmit,setisSuccessefullSubmit] = useState(false)

    const handleSubmit = article => {
        console.log('handleSubmit createArticle',article)
        doFetch({
            method: 'post',
            data: {
                article
            }
        })
    }


    useEffect(()=> {
        if (!response) return
        setisSuccessefullSubmit(true)
    },[response])

    if (currentUserState === false) {
        return <Redirect to="/"/>
    }

    if (isSuccessefullSubmit) {
        return <Redirect to={`/articles/${response.article.slug}`}/>
    }

    return (
        <div>
            <ArticleForm
                errors={(error && error.errors)}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            />
        </div>
    )
}

export default CreateArticle