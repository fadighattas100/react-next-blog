'use strict';

import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Link from "next/link";

import {isEmpty} from "../../helpers/Helpers";

import actions from "../api/Modules/Posts/Show/PostShow";
import {GET_POST_SHOW_ACTION} from "../api/Modules/Posts/Show/ActionsTypes/PostShowActionsTypes";

import MasterLayout from "../../layouts/MasterLayout";
import PostCard from "../../components/Posts/Show/Card/PostCard";

const Index = ({}) => {

    //Router
    const router = useRouter();
    let {posts_ids} = router.query;

    //State
    let [posts, setPosts] = useState([]);

    //State Updates
    useEffect(() => {
        if (!isEmpty(posts_ids)) {
            posts_ids = posts_ids.split(",");
            loadPost(posts_ids);
        }

    }, [router.query.posts_ids]);

    //Load Data
    const loadPost = async (posts_ids) => {
        posts_ids.map(async (id) => {
            await actions[GET_POST_SHOW_ACTION]({
                id: id,
                successCallBack: async (response) => {
                    setPosts(posts => [...posts, response.data]);
                }
            });
        });
    };

    //UI
    return (
        <MasterLayout title={`Posts`} pageName={`posts`}>
                <div className="row row-flex">
                    {!isEmpty(posts_ids) && !isEmpty(posts) ?
                        posts.map((post) => {
                            return <div key={post.id} className={'col-md-4 col-sm-6 col-xs-12'}>
                                <PostCard id={post.id} title={post.title} body={post.body} link={`/cards/${post.id}`}/>
                            </div>
                        })
                        :
                        <div className={'col-12 mt-5'}><p>No post's are selected go <Link href={'/'}>home</Link></p></div>
                    }
                </div>
        </MasterLayout>
    );
};

export default Index