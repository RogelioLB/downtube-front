import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import {socket} from '../socket'
import NavBar from '../components/NavBar'
import SearchBar from '../components/SearchBar'
import { CircularProgress } from '@mui/material'
import Card from '../components/Card'
import ModalVideo from '../components/ModalVideo'

export default function Home() {
  const [video,setVideo] = useState(null)
  const [loading,setLoading] = useState(false);
  const [showVideoModal,setShowVideoModal] = useState(false);
  const [url,setUrl] = useState("");

  useEffect(function(){
    socket.on('connect',()=>{
      console.log(socket.id)
    })
  },[])

  return (
    <div>
      <Head>
        <title>DownTube - A place to download videos from YouTube.</title>
      </Head>
      <NavBar />
      <div className={styles.container}>
        <SearchBar onClick={data=>setVideo(data)} setLoading={setLoading} url={url} setUrl={setUrl}/>
        {
          loading && (
            <CircularProgress/>
          )
        }
        {
          video && !loading && (
            <Card videoDetails={video} showVideoModal={setShowVideoModal}/>
          )
        }
      </div>
      <ModalVideo show={showVideoModal} onClose={()=>setShowVideoModal(false)} video={video} url={url}/>
    </div>
  )
}
