'use strict';

import PropTypes from "prop-types";
import Link from 'next/link'

import {isEmpty} from "../../../../helpers/Helpers";

import {Button} from "react-bootstrap";

const PostCard = ({id, title, body, image, link}) => {

    //UI
    return (
        <div className="card mt-5 mb-2" style={{width: '22rem'}}>
            <img className="card-img-top" src={`${image}/?n=${id}`} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title" style={{minHeight: '72px'}}>{title}</h5>
                <p className="card-text" style={{minHeight: '144px'}}>{body}</p>
                {
                    !isEmpty(link) ?
                        <Link href={link}>
                            <Button className={'btn btn-primary'}>Show</Button>
                        </Link>
                        :
                        ''
                }
            </div>
        </div>
    );
}

PostCard.defaultProps = {
    id: 0,
    title: '',
    body: '',
    image: 'https://picsum.photos/286/180',
    link: '',
}

PostCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
}

export default PostCard