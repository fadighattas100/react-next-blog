'use strict';

import axios from 'axios';
import {isEmpty} from "../../../../helpers/Helpers";


export const REQUESTS_METHODS_TYPES = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

export const RESPONSES_STATUS_CODS = {
    OK: 200,
    UNAUTHORIZED_ERROR: 401,
    FORBIDDEN_ERROR: 403,
    NOT_FOUND_ERROR: 404,
    UNPROCESSABLE_ENTITY_ERROR: 422, //validation error
    SERVER_ERROR: 500,
};

export default class BaseRequest {

    constructor() {
    }

    static send = async ({
                             URL,
                             HTTP_METHOD = REQUESTS_METHODS_TYPES.GET,
                             DATA = null,
                             QUERY_PARAMS = null,
                             startCallBack = null,
                             successCallBack = null,
                             finishCallback = null,
                             errorCallback = null,
                             HTTP_HEADERS = {
                                 "Content-Type": "application/json",
                                 "Accept": "application/json",
                             },
                             // RESPONSE_TYPE = "application/json",
                             RESPONSE_TYPE = "",
                             RAW_RESPONSE = false
                         }) => {


        let options = {
            url: URL,
            headers: HTTP_HEADERS,
            method: HTTP_METHOD,
        };

        if (!isEmpty(QUERY_PARAMS)) {
            options.params = QUERY_PARAMS
        }

        if (!isEmpty(DATA)) {
            options.data = DATA;
        }

        options.responseType = RESPONSE_TYPE;

        if (startCallBack)
            startCallBack();

        return await axios(options)
            .then(async (response) => {

                if (response.status === RESPONSES_STATUS_CODS.OK) {
                    if (successCallBack) {
                        await successCallBack(response);
                    }
                    return response;
                }

                console.error(`Response status is not 200, OK.`);
                return false;

            })
            .catch(async (error) => {

                console.log(error);

                switch (error.response.status) {
                    case RESPONSES_STATUS_CODS.UNAUTHORIZED_ERROR:
                        console.error("You don't have access to this action.");
                        break;
                    case  RESPONSES_STATUS_CODS.FORBIDDEN_ERROR:
                        console.error("You don't have access to this content.");
                        break;
                    case RESPONSES_STATUS_CODS.NOT_FOUND_ERROR:
                        console.error("API Not Found.");
                        break;
                    case RESPONSES_STATUS_CODS.SERVER_ERROR:
                        console.error(`Sorry, something went wrong, try later.`);
                        break;
                    default:
                        console.error(`Sorry, something went wrong, try later.`);
                }

                if (errorCallback)
                    await errorCallback(error);

                return false;
            })
            .finally(async () => {

                if (finishCallback)
                    await finishCallback();

                return true;
            });
    }
}
