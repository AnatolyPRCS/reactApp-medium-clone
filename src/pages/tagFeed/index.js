import React, {useEffect} from "react";

import {useFetch} from "../../hooks/useFetch";

import Feed from "../../components/Feed/feed";
import Pagination from "../../components/Pagination/pagination";
import {getPaginator, limit} from "../../utils";
import PopularTags from '../../components/PopularTags/popularTags'
import Loading from "../../components/Loading/loading";
import ErrorMessage from "../../components/ErrorMessage/errorMessage";
import FeedToggler from "../../components/FeedToggler/feedToggler";

const TagFeed = ({location, match}) => {

    console.log("TagFeed",location,match)

    const tagName = match.params.slug
    const url = match.url

    const {offset, currentPage} = getPaginator(location.search)

    const stringifiedParams = `limit=${limit}&offset=${offset}&tag=${tagName}`

    const apiUrl = `/articles?${stringifiedParams}`
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)
    console.log('response TagFeed',response)

    useEffect(() => {
        doFetch()
    }, [doFetch, currentPage, tagName])

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
                        <FeedToggler tagName={tagName}/>
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

export default TagFeed