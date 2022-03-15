'use strict';

import React, {useState, useEffect} from 'react';
import {useRouter} from "next/router";

import {isObjectEmpty, removeObjectFromArrayByKey} from "../../../helpers/Helpers";

import actions from "../../../pages/api/Modules/Posts/DataGrid/PostsDataGrid";
import {GET_POSTS_DATA_GRID_ACTION} from "../../../pages/api/Modules/Posts/DataGrid/ActionsTypes/PostsDataGridActionsTypes";

import {Button} from 'react-bootstrap';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const MainTable = ({tableRef}) => {

    //Router
    const router = useRouter();

    //State
    const [posts, setPosts] = useState([]);

    //State Updates
    useEffect(() => {
        loadPosts();
    }, []);

    //Load Data
    const loadPosts = async () => {
        await actions[GET_POSTS_DATA_GRID_ACTION]({
            successCallBack: (response) => {
                setPosts(response.data);
            }
        });
    };

    //Table Options
    const getTableColumns = () => {
        return [
            {
                dataField: 'id',
                text: 'Post ID',
                hidden: true
            },
            {
                dataField: 'title',
                text: 'Post Title',
                sort: true
            },
            {
                isDummyField: true,
                dataField: 'actions',
                text: 'Actions',
                formatter: (cell, row, rowIndex) => {
                    return <div>

                        <Button
                            style={{marginLeft: '10px', marginRight: '10px'}}
                            color="primary"
                            variant="success"
                            onClick={async () => {
                                await router.push(`/cards/${row.id}`);
                            }}>
                            Show
                        </Button>

                        <Button
                            color="danger"
                            variant="danger"
                            onClick={() => {
                                setPosts(removeObjectFromArrayByKey(posts, 'id', row.id));
                            }}>
                            Delete
                        </Button>

                    </div>
                }
            }
        ];
    }

    const getTableSelectRowOptions = () => {
        return {
            mode: 'checkbox',
            selected: [1, 4],
            onSelect: (row, isSelect, rowIndex, e) => {
                //console.log(row, isSelect, rowIndex);
                //console.log(tableRef.current.selectionContext.selected);
            }
        }
     }

    const getTablePagination = () => {
        return paginationFactory({
            totalSize: posts.length,
            sizePerPage: 20,
            paginationSize: 4,
            sizePerPageList: [20, 40, 80, 100],
            alwaysShowAllBtns: true
        });
    }

    //UI
    return (
        <div className={'mt-5'}>
            {!isObjectEmpty(posts) ?
                <BootstrapTable
                    ref={tableRef}
                    keyField='id'
                    data={posts}
                    columns={getTableColumns()}
                    selectRow={getTableSelectRowOptions()}
                    pagination={getTablePagination()}
                />
                :
                ''}
        </div>
    );
}

MainTable.defaultProps =
{
    tableRef: React.createRef(),
}

export default MainTable;