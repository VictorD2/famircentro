/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import videojs, { VideoJsPlayerOptions, VideoJsPlayer } from 'video.js';
import "video.js/dist/video-js.css";
interface Props {
    settings: VideoJsPlayerOptions
}
const VideoReproductor = (props: Props) => {
    const refContainer = useRef<HTMLVideoElement | null>();
    const refVideo = useRef<VideoJsPlayer>();
    const noClick = (e: React.PointerEvent<HTMLVideoElement>) => {
        // e.preventDefault();
    }
    useEffect(() => {
        refVideo.current = videojs(refContainer.current, props.settings);
        return () => {
            // Para resetear el videojs
            refVideo.current?.dispose();
        }
    }, [])
    //vjs-big-play-centered
    return (
        <div>
            <div data-vjs-player>
                <video onContextMenu={noClick} className="video-js vjs-default-skin vjs-fluid" ref={node => refContainer.current = node} />
            </div>
        </div>
    )
}

export default VideoReproductor
