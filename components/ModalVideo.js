import Image from 'next/image'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import {socket} from '../socket'
import ProgressBar from './ProgressBar'

const ModalContainer = styled.div`
position:fixed;
top:0;
left:0;
bottom:0;
right:0;
background-color:${props => props.show ? 'rgba(0,0,0,.7)' : 'transparent'};
pointer-events: ${props => props.show ? 'visible' : 'none'};
`

const ModalMain = styled.div`
transform:${props=>props.show ? 'translate(-50%,-50%);' : 'translate(-50%,-1000%)'};
top: 50%;
left: 50%;
position: fixed;
margin:0 auto;
width:80%;
padding:10px;
background-color:#fff;
transition:.4s ease;
display:flex;
flex-direction: column;
`

const Button = styled.button`
background-color: #3B82F6;
cursor:pointer;
border:none;
color:#fff;
padding:10px 15px;
border-radius:2px;
margin:10px 5px;
`

const Formats = styled.div`
display:flex;
flex-wrap: wrap;
justify-content:space-around;
`
const ContainerImage = styled.div`
display:flex;
@media (max-width: 490px) {
    flex-direction: column;
  }
`

const Header = styled.h3`
font-size:1.3em;
margin:0 10px;
@media (min-width: 768px) {
    font-size:2em;
}
`

const Download = styled.a`
background:black;
color:white;
display:inline-block;
width:100%;
text-align:center;
padding:10px 15px;
`

const ContainerDownload = styled.div`
display:flex;
align-items: center;
justify-content: center;
flex:1;
`

export default function ModalVideo({show,onClose, video,url}){
    const [percentage,setPercentage] = useState(null);
    const [downloading,setDownloading] = useState(false);
    const [link,setLink] = useState('');
    const image = video?.thumbnails[3];
    const formatAudio = video?.formatsAudio[0];
    const format1080 = video?.formatsVideo.find(video=>video.quality==='hd1080');
    const format720 = video?.formatsVideo.find(video=>video.quality==='hd720');
    const format480 = video?.formatsVideo.find(video=>video.quality==='large');
    const format360 = video?.formatsVideo.find(video=>video.quality==='medium');
    const formatsVideo = [format1080,format720,format480,format360];

    useEffect(()=>{
        socket.on('download',(data)=>{
            setPercentage(data.percentage?.total || data.percentage)
        })
        socket.on('downloaded',(data)=>{
            console.log(data)
            setDownloading(false)
            setPercentage(null)
        })
    },[])

    const handleDownload = (format,itag) => {
        fetch(`https://downtube-back-production.up.railway.app/api/download/${format}`,{
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({itag,url,uid:socket.id}),
            method:'POST'
        }).then(res=>res.json()).then(data=>{
            setDownloading(true)
            setLink(data.link)
        }).catch(err=>{
            setDownloading(false)
        })
    }

    return(
        <>
        {video && (
            <ModalContainer show={show} onClick={onClose}>
                <ModalMain show={show} onClick={e=>e.stopPropagation()}>
                    <ContainerImage>
                        <Image alt={video?.title} src={image.url} width={image.width} height={image.height}/>
                        <Header>Seleccionar formato:</Header>
                    </ContainerImage>
                    {
                        !downloading && (
                            <>
                                <Formats>
                                    {
                                        formatsVideo.map((video)=>{
                                            if(video) return(
                                                <Button onClick={()=>handleDownload('video',video.itag)}>{video.qualityLabel}</Button>
                                            )
                                            else return <></>
                                        })
                                    }
                                </Formats>
                                <Formats>
                                    {
                                        formatAudio && (
                                            <Button onClick={()=>handleDownload('audio',formatAudio.itag)}>MP3</Button>
                                        )
                                    }
                                </Formats>
                            </>
                        )
                    }
                    <ContainerDownload>
                    {
                        percentage && (
                            <ProgressBar type="linear" percentage={percentage}/>
                        )
                    }
                    {
                        link && !downloading && (
                            <Download href={link} download>Descargar</Download>
                        )
                    }
                     </ContainerDownload>
                </ModalMain>
            </ModalContainer>
        )}
        </>
    )
}