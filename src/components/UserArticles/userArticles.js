import React, {useEffect} from "react";

import {useFetch} from "../../hooks/useFetch";

import Loading from "../Loading/loading";
import ErrorMessage from "../ErrorMessage/errorMessage";
import Feed from "../Feed/feed";
import Pagination from "../Pagination/pagination";

import {getPaginator, limit} from "../../utils";

const getApiUrl = ({username, offset, isFavorites}) => {
    const params = isFavorites
        ? `favorited=${username}&limit=${limit}&offset=${offset}`
        : `author=${username}&limit=${limit}&offset=${offset}`

    return `/articles?${(params)}`
}

const UserArticles = ({username, location, isFavorites,url}) => {
    console.log('### UserArticles RERENDER')
    const {offset, currentPage} = getPaginator(location.search)
    const apiUrl = getApiUrl({username,offset,isFavorites})
    // console.log('UserArticles apiUrl')

    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)

    useEffect(()=> {
        doFetch()
    },[doFetch, isFavorites])

    return (
        <div>
            {isLoading && <Loading/>}
            {error && <ErrorMessage/>}
            {!isLoading && response && (
                <>
                    <Feed articles={response.articles} />
                    <Pagination
                        total={response.articlesCount}
                        limit={limit}
                        url={url}
                        currentPage={currentPage}
                    />
                </>
            )}
        </div>
    )
}

export default UserArticles