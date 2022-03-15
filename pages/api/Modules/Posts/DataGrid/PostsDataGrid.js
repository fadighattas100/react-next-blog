'use strict';

import BaseRequest from "../../../Requests/Base/BaseRequest";
import * as PostsDataGridActionsTypes from "./ActionsTypes/PostsDataGridActionsTypes";

import PostsDataGridRequests from "../../../Requests/Posts/DataGrid/PostsDataGridRequests";
import * as PostsDataGridRequestsTypes from "../../../Requests/Posts/DataGrid/RequestsTypes/PostsDataGridRequestsTypes";

// actions
const actions = {

    [PostsDataGridActionsTypes.GET_POSTS_DATA_GRID_ACTION]: async ({
            queryParams = null,
            successCallBack = null,
            startCallBack = null,
            errorCallback = null,
            finishCallback = null
        }) => {

        let request = PostsDataGridRequests[PostsDataGridRequestsTypes.GET_POSTS_DATA_GRID_REQUEST_API]();

        return await BaseRequest.send({
            URL: request.GET.URL,
            HTTP_METHOD: request.GET.METHOD,
            DESC: request.GET.DESC,
            QUERY_PARAMS: queryParams,
            startCallBack: startCallBack,
            successCallBack: successCallBack,
            errorCallback: errorCallback,
            finishCallback: finishCallback
        });
    },
}

export default actions;
