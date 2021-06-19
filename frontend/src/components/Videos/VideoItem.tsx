import React from 'react';
import ReactPlayer from 'react-player';
import { useHistory } from 'react-router-dom';

import { Video } from './Video';

interface Props {
    video: Video
}

const VideoItem = ({ video }: Props) => {

    const history = useHistory();

    return (
        <div className="col-md-4">
            <div
            className="card video-card"
            onClick={() => history.push(`/update/${video.id}`)}>
                <div className="card-header d-flex justify-content-between">
                    <h3>{video.title}</h3>
                    <span className="text-danger fw-bold">X</span>
                </div>
                <div className="card-body">
                    <p>{video.description}</p>
                    <div className="ratio ratio-16x9">
                        <ReactPlayer
                        url={video.url}
                        width='100%'
                        height='100%'
                        controls
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoItem;