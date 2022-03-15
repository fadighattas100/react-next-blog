'use strict';

import BaseRequest from "../../../Requests/Base/BaseRequest";
import * as PostShowActionsTypes from "./ActionsTypes/PostShowActionsTypes";

import PostShowRequests from "../../../Requests/Posts/Show/PostShowRequests";
import * as PostShowRequestsTypes from "../../../Requests/Posts/Show/RequestsTypes/PostShowRequestsTypes";

// actions
const actions = {

    [PostShowActionsTypes.GET_POST_SHOW_ACTION]: async ({
        id,
        queryParams = null,
        successCallBack = null,
        startCallBack = null,
        errorCallback = null,
        finishCallback = null
    }) => {

        let request = PostShowRequests[PostShowRequestsTypes.GET_POST_SHOW_REQUEST_API](id);

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
