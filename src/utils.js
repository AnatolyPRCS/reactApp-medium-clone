// import {parse} from "query-string";

export const range = (start, end) => {
    return [...Array(end).keys()].map(el => el + start)
}

export const limit = 10

export const getPaginator = search => {
    // console.log('GetPaginator ',search)
    const parsedSearch = {
        page: search.match(/\d{0,}/g).join('')
    }
    // const parsedSearch = parse(search)
    const currentPage = parsedSearch.page ? +parsedSearch.page : 1
    const offset = limit*(currentPage-1)
    return {currentPage, offset}
}