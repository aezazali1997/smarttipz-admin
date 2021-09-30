import React from 'react'
import { Player, BigPlayButton } from 'video-react';

const VideoPlayer = () => {
    return (
        <Player
            className="w-full"
            playsInline
            poster="/assets/poster.png"
            src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
        >
            <BigPlayButton position="center" />
        </Player>
    )
}

export default VideoPlayer;
