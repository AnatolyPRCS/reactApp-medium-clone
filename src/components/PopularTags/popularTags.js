import React, {useEffect} from "react";
import {useFetch} from "../../hooks/useFetch";
import Loading from "../Loading/loading";
import ErrorMessage from "../ErrorMessage/errorMessage";
import {Link} from "react-router-dom";

const PopularTags = () => {
    const [{response, isLoading, error}, doFetch] = useFetch('/tags')

    useEffect(() => {
        doFetch()
    },[doFetch])

    if (isLoading || !response ) return <Loading />
    if (error) return <ErrorMessage />

    return (
        <div className="sidebar">
            <p>PopularTags</p>
            <div className="tag-list">
                {response.tags.map(tag => (
                    <Link
                        to={`/tags/${tag}`}
                        className='tag-default tag-pill'
                        key={tag}
                    >
                        {tag}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default PopularTags