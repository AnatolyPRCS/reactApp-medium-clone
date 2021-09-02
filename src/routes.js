import React from "react";

import {Switch, Route} from 'react-router-dom'

import GlobalFeed from './pages/globalFeed'
import Article from "./pages/article";
import Authentication from "./pages/authentication";
import TagFeed from "./pages/tagFeed";
import YourFeed from "./pages/YourFeed";
import CreateArticle from "./pages/CreateArticle/createArticle";
import EditArticle from "./pages/EditArticle/editArticle";
import Settings from "./pages/Settings/settings";
import UserProfile from "./pages/UserProfile/userProfile";


// eslint-disable-next-line
export default () => {
    return (
        <Switch>
            <Route path='/' component={GlobalFeed} exact/>
            <Route path='/profiles/:slug' component={UserProfile}/>
            <Route path='/profiles/:slug/favorites' component={UserProfile}/>
            <Route path='/settings' component={Settings}/>
            <Route path='/articles/new' component={CreateArticle}/>
            <Route path='/articles/:slug/edit' component={EditArticle}/>
            <Route path='/feed' component={YourFeed}/>
            <Route path='/tags/:slug' component={TagFeed}/>
            <Route path='/articles/:slug' component={Article} />
            <Route path='/login' component={Authentication}/>
            <Route path='/register' component={Authentication}/>
        </Switch>
    )
}