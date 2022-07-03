import { Download } from '@mui/icons-material'
import Image from 'next/image'
import styled from 'styled-components'

const Container = styled.div`
background-color: #fafafa;
border-radius:5px;
box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.25);
width: 100%;
padding:1.6em;
position:relative;
display:flex;
@media (max-width: 768px) {
    flex-direction: column;
  }
`

const Details = styled.div`
padding:.8em;
`

const Title = styled.h2`
font-size:1em;
`

const Author = styled.div`
display:flex;
align-items: center;
`

const Name = styled.h3`
margin-left:.5em;
font-size:.85em;
`

const Button = styled.button`
background-color: #3B82F6;
border:none;
position:absolute;
bottom:15px;
right:10px;
border-radius: 50%;
width:4em;
height:4em;
display:flex;
align-items: center;
justify-content: center;
box-shadow:0 0 4px rgba(0,0,0,.7);
cursor: pointer;
`

export default function Card({videoDetails,showVideoModal}){
    const image = videoDetails.thumbnails[3];
    const author = videoDetails.author;
    const authorImage = videoDetails.author.thumbnails[0];
    return(
        <Container>
            <Image alt={videoDetails.title} src={image.url} width={image.width} height={image.height}/>
            <Details>
                <Title>{videoDetails.title}</Title>
                <Author>
                    <Image alt={author.name} src={authorImage.url} width={authorImage.width} height={authorImage.height} style={{borderRadius:"50%"}}/>
                    <Name>{author.name}</Name>
                </Author>
            </Details>
            <Button onClick={()=>showVideoModal(true)}>
                <Download sx={{color:'#fff'}}/>
            </Button>
        </Container>
    )
}