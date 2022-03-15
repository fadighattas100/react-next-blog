'use strict';

import {useEffect, useState} from "react";
import {useRouter} from "next/router";

import {isEmpty, isObjectEmpty} from "../../helpers/Helpers";

import actions from "../api/Modules/Posts/Show/PostShow";
import {GET_POST_SHOW_ACTION} from "../api/Modules/Posts/Show/ActionsTypes/PostShowActionsTypes";

import MasterLayout from "../../layouts/MasterLayout";
import PostCard from "../../components/Posts/Show/Card/PostCard";

const Show = ({}) => {

    //Router
    const router = useRouter();
    const {id} = router.query;

    //State
    const [post, setPost] = useState({});

    //State Updates
    useEffect(() => {
        if (!isEmpty(id)) {
            loadPost(id);
        }
    }, [router.query.id]);

    //Load Data
    const loadPost = async (id) => {
        await actions[GET_POST_SHOW_ACTION]({
            id: id,
            successCallBack: async (response) => {
                setPost(response.data);
            }
        });
    };

    //UI
    return (
        <MasterLayout title={`Post | ${post.title}`} pageName={`post`}>
            {
                !isObjectEmpty(post) ?
                    <PostCard id={post.id} title={post.title} body={post.body}/>
                    :
                    ''
            }
        </MasterLayout>
    );
}

export default Show