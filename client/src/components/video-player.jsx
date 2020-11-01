import React, { useState, useEffect, useRef } from 'react'
import './video-player.scss'

const VideoPlayer = ({src, width, height, top}) => {
   
    const video = useRef(null)
    const blueJuice = useRef(null)
    const controls = useRef(null)
    const playIcon = useRef(null)
    const [playing,setPlaying] = useState(false)

    const togglePlay = () => {
        if(video.current.paused){
           setPlaying(true)
           video.current.play()
           playIcon.current.style.visibility = 'hidden'
        }else{
            setPlaying(false)
            video.current.pause()
        }
    }
    const handleTimeUpdate = () => {
        const juicePos = video.current.currentTime / video.current.duration
        blueJuice.current.style.width = juicePos*100+"%"
        if(video.current.ended){
            setPlaying(false)
            playIcon.current.style.visibility = 'visible'
        }
    }
    const handleMouseOver = () => {
        controls.current.style.visibility = 'visible'
    }
    const handleMouseOut = () => {
        controls.current.style.visibility = 'hidden'
    }
    const handlePlayIconClick = () => {
        playIcon.current.style.visibility = 'hidden'
        video.current.play()
        setPlaying(true)

    }
    const handleExpandClick = () => {
        video.current.requestFullscreen()
    }


   return (
      <div
        onMouseOver={handleMouseOver} 
        onMouseOut={handleMouseOut}
      >
          
            <div style={{display:'flex', flexDirection:'row', width:width}}>
                <video 
                    ref={video} 
                    className="video-screen" 
                    width={width}
                    height={height}
                    src={src}  
                    onClick = {togglePlay}
                    onTimeUpdate = {handleTimeUpdate}
                >

                </video>
                
                <div 
                    className="play-icon" 
                    ref={playIcon} 
                    onClick={handlePlayIconClick}
                    style={{top:top}}
                
                >
                    <i class="far fa-play-circle text-white"></i>
                </div>
            </div>
           
            <div className="controls" ref={controls}>
                <button onClick={togglePlay}>
                    {
                        playing?
                           <i class="fas fa-pause"></i>
                        :  <i class="fas fa-play"></i>

                    }
                </button>
                <button className="time">
                    2.00/5.30
                </button>
                <div className="progress-bar bg-white">
                    <div className="blue-juice" ref={blueJuice}>

                    </div>
                </div>
                {/* <button>
                    <i class="fas fa-cog"></i>
                </button> */}
                <button
                  onClick={handleExpandClick}
                >
                   <i class="fas fa-expand-alt"></i>
                </button>
                <button>
                   <i class="fas fa-volume-up"></i>
                </button>
            </div>
      </div>
   )

}
export default VideoPlayer