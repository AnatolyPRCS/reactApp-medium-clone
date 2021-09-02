import React from "react";
import {useFetch} from "../../hooks/useFetch";

const AddToFavorites = ({isFavorited, favoritesCount, articleSlug}) => {
    console.log('AddtoFavorites', isFavorited, favoritesCount, articleSlug)

    const apiUrl=`/articles/${articleSlug}/favorite`
    const [{response}, doFetch] = useFetch(apiUrl)

    const favoritesCountWithResponse = response
        ? response.article.favoritesCount
        : favoritesCount
    const isFavoritedWithResponse = response
        ? response.article.favorited
        : isFavorited

    const classes = [
        'btn',
        'btn-sm',
        isFavoritedWithResponse ? 'btn-primary' : 'btn-outline-primary'
    ]

    const handleLike = event => {
        event.preventDefault()
        doFetch({
            method: isFavoritedWithResponse ? 'delete' : 'post'
        })
    }



    return (
        <button
            className={classes.join(' ')}
            onClick={handleLike}
        >
            <i className="ion-heart"></i>
            <span>&nbsp; {favoritesCountWithResponse}</span>
        </button>
    )
}

export default AddToFavorites