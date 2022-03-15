'use strict';

import React, {useRef} from "react";
import {useRouter} from "next/router";

import MasterLayout from "../layouts/MasterLayout";
import PostsDataGridTable from "../components/Posts/DataGrid/PostsDataGridTable";
import {Button} from "react-bootstrap";


export default function Home() {

    const router = useRouter();

    const postsTableRef = useRef(React.createRef());

    return (
        <MasterLayout title={'Blog'} pageName={'home'}>

            <PostsDataGridTable tableRef={postsTableRef}/>

            <div style={{display: 'flex', justifyContent: 'center'}} className={'mt-3 mb-5'}>
                <Button variant="success" onClick={() => {
                    const selectedPostsIds = postsTableRef.current.selectionContext.selected.toString();
                    router.push({pathname: `/cards`, query: {posts_ids: selectedPostsIds}});
                }}> Show Selected Posts </Button>
            </div>

        </MasterLayout>
    )
}
