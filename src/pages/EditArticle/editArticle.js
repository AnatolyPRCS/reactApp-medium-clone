import React, {useContext, useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch";
import ArticleForm from "../../components/ArticleForm/ArticleForm";
import {Redirect} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/currentUser";


const EditArticle = ({match}) => {
    const slug = match.params.slug

    const apiUrl = `/articles/${slug}`
    const [{response: fetchArticleResponse},doFetchArticle] = useFetch(apiUrl) // что это?
    const [{response: updateArticleResponse, error: updateArticleError},doUpdateArticle] = useFetch(apiUrl)

    const [initialValues, setInitialValues] = useState(null)
    const [isSuccessefullSubmit,setIsSuccessefullSubmit] = useState(false)

    const [currentUserState] = useContext(CurrentUserContext)

    const handleSubmit = article => {
        doUpdateArticle({
            method: 'put',
            data: {
                article
            }
        })
    }


    useEffect(()=> {
        doFetchArticle()
    },[doFetchArticle])

    useEffect(()=>{
        if (!fetchArticleResponse) return

        setInitialValues({
            title: fetchArticleResponse.article.title,
            description: fetchArticleResponse.article.description,
            body: fetchArticleResponse.article.body,
            tagList: fetchArticleResponse.article.tagList
        })
    },[fetchArticleResponse])

    useEffect(()=> {
        if (!updateArticleResponse) return

        setIsSuccessefullSubmit(true)
    },[updateArticleResponse])

    if (currentUserState.isLoggedIn === false) {
        return <Redirect to="/"/>
    }

    if (isSuccessefullSubmit) {
        return <Redirect to={`/articles/${slug}`}/>
    }

    return (
        <ArticleForm
            onSubmit={handleSubmit}
            errors={(updateArticleError && updateArticleError.errors) || {}}
            initialValues={initialValues}
        />
    )
}

export default EditArticle