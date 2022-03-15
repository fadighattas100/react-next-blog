'use strict';

import {BASE_URL} from "../../Requests";
import {REQUESTS_METHODS_TYPES} from "../../Base/BaseRequest";

import * as PostShowRequestsTypes from "./RequestsTypes/PostShowRequestsTypes";

export default class PostShowRequests {
    static [PostShowRequestsTypes.GET_POST_SHOW_REQUEST_API] = (id) => {
        return {
            GET: {
                DESC: `Get post details.`,
                URL: `${BASE_URL}/posts/${id}`,
                METHOD: REQUESTS_METHODS_TYPES.GET
            },
        };
    };
}