"use client";

import useAutoPlayVideo from '@/hooks/useAutoPlayVideo';

const VideoPlayer = ({ videoUrl, videoTag }: { videoUrl: string, videoTag?: string }) => {
    const { videoRef } = useAutoPlayVideo(videoUrl);

    return (
        <video ref={videoRef} playsInline loop muted>
            <source src={videoUrl} type="video/mp4" />
            {videoTag}
            Your browser does not support the video tag.
        </video>
    );
};

export default VideoPlayer;