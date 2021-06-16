import { Request, RequestHandler, Response } from 'express';
import connect from '../database'

export const getVideos: RequestHandler = async (req, res): Promise<Response | undefined> => {
    try {
        const conn = await connect();
        const videos = await conn.query('SELECT * FROM video');
        return res.json(videos[0]);
    } catch (error) {
        console.error('Connect failed: ', error);
    }
}

export const getVideo: RequestHandler = async (req, res): Promise<Response | undefined> => {
    const id = req.params.id;
    try {
        const conn = await connect();
        const videoFound = await conn.query('SELECT * FROM video WHERE id = ?', [id]);
        if (!videoFound[0].toString().length) return res.status(204).json();
        return res.json(videoFound[0])
    } catch (error) {
        console.error('Connect failed: ', error)
    }
}

export const createVideo: RequestHandler = async (req, res): Promise<Response | undefined> => {
    const newVideo = req.body;
    try {
        const conn = await connect();
        const videos = await conn.query('SELECT url FROM video WHERE url = ?', [newVideo.url]);
        // console.log(videos[0].toString().length);
        if (!videos[0].toString().length) {
            // return console.log('no existe')
            await conn.query('INSERT INTO video SET ?', [newVideo]);
            return res.json('creating video')
        }
        // console.log('existe')
        return res.status(301).json('Creation failed');
    } catch (error) {
        console.error('Connect failed: ', error)
    }
}

export const updateVideo: RequestHandler = async (req, res): Promise<Response | undefined> => {
    const id = req.params.id;
    try {
        const conn = await connect();
        const videoFound = await conn.query('SELECT * FROM video WHERE id = ?', [id]);
        if (!videoFound[0].toString().length) return res.status(204).json();
        await conn.query('UPDATE video SET ? WHERE id = ?', [req.body, id]);
        return res.json(videoFound[0]);
    } catch(error) {
        console.log('Connect failed: ', error)
    }
}

export const deleteVideo: RequestHandler = async (req, res): Promise<Response | undefined> => {
    const id = req.params.id;
    try {
        const conn = await connect();
        const videoFound = await conn.query('SELECT * FROM video WHERE id = ?', [id]);
        if (!videoFound[0].toString().length) return res.status(204).json();
        await conn.query('DELETE FROM video WHERE id = ?', [id]);
        return res.json(videoFound[0])
    } catch(error) {
        console.log('Connect failed: ', error)
    }
}