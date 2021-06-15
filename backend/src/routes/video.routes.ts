import {Router} from 'express';

import * as videoCtrl from './video.controller'
const router = Router();

router.route('/videos')
    .get(videoCtrl.getVideos)
    .post(videoCtrl.createVideo);

router.route('/videos/:id')
    .get(videoCtrl.getVideo)
    .delete(videoCtrl.deleteVideo)
    .put(videoCtrl.updateVideo)

// router.get('/videos', videoCtrl.getVideos)

export default router;