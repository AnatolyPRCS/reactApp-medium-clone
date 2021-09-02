import React, {useEffect} from "react";

import {useFetch} from "../../hooks/useFetch";

import Feed from "../../components/Feed/feed";
import Pagination from "../../components/Pagination/pagination";
import {getPaginator, limit} from "../../utils";
import PopularTags from '../../components/PopularTags/popularTags'
import Loading from "../../components/Loading/loading";
import ErrorMessage from "../../components/ErrorMessage/errorMessage";
import FeedToggler from "../../components/FeedToggler/feedToggler";

// import {stringify} from "query-string";

const GlobalFeed = ({location, match}) => {
    const {offset, currentPage} = getPaginator(location.search)
    const url = match.url

    // const stringifiedParams = stringify({
    //     limit,
    //     offset
    // })

    const stringifiedParams = `limit=${limit}&offset=${offset}`
    const apiUrl = `/articles?${stringifiedParams}`
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)
    console.log('GlobalFeed response ',response)
    useEffect(() => {
        doFetch()
    }, [doFetch, currentPage])

    return (
        <div className="home-page">
            <div className="banner">
                <div className="container">
                    <h1>Medium clone</h1>
                    <p>A place to share knowleadge</p>
                </div>
            </div>
            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        <FeedToggler/>
                        {isLoading && <Loading />}
                        {error && <ErrorMessage />}
                        {!isLoading && response && (
                            <>
                                <Feed articles={response.articles} />
                                <Pagination
                                    total={response.articlesCount}
                                    limit={limit}
                                    url={url}
                                    currentPage={currentPage} />
                            </>
                        ) }
                    </div>
                    <div className="col-md-3">
                        <PopularTags/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GlobalFeed