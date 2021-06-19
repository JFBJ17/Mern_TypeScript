import React, {useEffect, useState} from 'react';
import {Video} from './Video';
import * as videoService from './VideoService';
import VideoItem from './VideoItem'

const VideoList = () => {

    const [videos, setVideos] = useState<Video[]>([]);

    const loadVideos = async () => {
        const res = await videoService.getVideos();
        const formtedVideos = res.data.map(video => {
            return({
                ...video,
                created_at: video.created_at ? new Date(video.created_at) : new Date()
            });
        })
        .sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
        setVideos(formtedVideos);
    }

    useEffect(() => {
        loadVideos();
    }, []);

    return(
        <div className="row">
            {videos.map(video => {
                return(
                    <VideoItem video={video} key={video.id} />
                );
            })}
        </div>
    );
}

export default VideoList;