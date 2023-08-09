'use client'
import { useEffect } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

function VideoPlayer({ url }: { url: string }) {
  console.log(url)
  useEffect(() => {
    // Referencia al elemento de video

    // Configuración del reproductor de video
    videojs('#my-video', {
      autoplay: 'muted',
      controls: 'true',
      loop: 'true',

      sources: [
        {
          src: url,
          type: 'application/x-mpegURL'
        }
      ]
    })
  }, [url])

  return (
    <div>
      <video
        id='my-video'
        className='video-js vjs-default-skin vjs-big-play-centered  h-[664px] w-[1040px]'
        controls
        width='1040px'
        height='664px'
        preload='auto'
      ></video>
    </div>
  )
}

export default VideoPlayer
