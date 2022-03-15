'use strict';

import {BASE_URL} from "../../Requests";
import {REQUESTS_METHODS_TYPES} from "../../Base/BaseRequest";

import * as PostsDataGridRequestsTypes from "./RequestsTypes/PostsDataGridRequestsTypes";

export default class PostsDataGridRequests {
    static [PostsDataGridRequestsTypes.GET_POSTS_DATA_GRID_REQUEST_API] = () => {
        return {
            GET: {
                DESC: `Get posts data grid.`,
                URL: `${BASE_URL}/posts`,
                METHOD: REQUESTS_METHODS_TYPES.GET
            },
        };
    };
}