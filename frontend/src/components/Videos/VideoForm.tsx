import React, {useState, useEffect} from "react";
import { Video } from "./Video";
import * as videoService from './VideoService';
import {toast} from 'react-toastify';
import {useHistory, useParams} from 'react-router-dom';

type InputChange = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface Params {
    id?: string
}

const VideoForm = () => {

    const history = useHistory();
    const params = useParams<Params>();

    const initialState = {
        title: '',
        description: '',
        url: ''
    }

    const [video, setVideo] = useState<Video>(initialState);

    const handleInputChange = (e: InputChange) => {
        setVideo({
            ...video,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await videoService.createVideo(video);
        toast.success('New video added');
        history.push('/');
    }

    const getVideo = async (id: string) => {
        const res = await videoService.getVideoById(id);
        const {title, description, url} = res.data;
        setVideo({
            title,
            description,
            url
        });
    }

    useEffect(() => {
        if(params.id) getVideo(params.id);
    }, [params.id]);

    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card-header">
                        <h3>New Video</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Title"
                                    className="form-control"
                                    autoFocus
                                    onChange={handleInputChange}
                                    value={video.title}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="url"
                                    placeholder="https://somesite.com"
                                    onChange={handleInputChange}
                                    value={video.url}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    name="description"
                                    rows={3}
                                    className="form-control"
                                    placeholder="Description"
                                    onChange={handleInputChange}
                                    value={video.description}
                                ></textarea>
                            </div>
                            <div className="d-grid gap-1 d-md-flex justify-content-md-end">
                                {
                                    params.id ?
                                    <button className="btn btn-primary">
                                    Upted video
                                    </button>
                                    :
                                    <button className="btn btn-primary">
                                    Create video
                                    </button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoForm;
