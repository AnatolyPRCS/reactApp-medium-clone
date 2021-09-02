import React, {useEffect} from "react";

import {useFetch} from "../../hooks/useFetch";

import Feed from "../../components/Feed/feed";
import Pagination from "../../components/Pagination/pagination";
import {getPaginator, limit} from "../../utils";
import PopularTags from '../../components/PopularTags/popularTags'
import Loading from "../../components/Loading/loading";
import ErrorMessage from "../../components/ErrorMessage/errorMessage";
import FeedToggler from "../../components/FeedToggler/feedToggler";


const YourFeed = ({location, match}) => {

    // console.log("YourFeed",location,match)

    const url = match.url

    const {offset, currentPage} = getPaginator(location.search)

    const stringifiedParams = `limit=${limit}&offset=${offset}`

    const apiUrl = `/articles/feed?${stringifiedParams}`

    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)

    // console.log('response YourFeed',response)

    useEffect(() => {
        doFetch()
    }, [doFetch, currentPage])

    return (
        <div className="home-page">
            <div className="banner">
                <div className="container">
                    <h1>Medium clone</h1>
                    <p>A place to share knowledge</p>
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
                        <PopularTags />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default YourFeed