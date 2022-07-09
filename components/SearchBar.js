import styled from "styled-components"
import { useState } from "react"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons"

const Bar = styled.form`
display:flex;
background-color: #D9D9D9;
margin:70px 20px;
padding:10px 20px;
width:100%;
border-radius:30px;
`

const Input = styled.input`
background-color: transparent;
border:0;
outline: none;
flex:1;
`

const Button = styled.button`
display: flex;
align-items: center;
justify-content: center;
background-color: transparent;
border: none;
cursor:pointer;
`


export default function SearchBar({onClick,setLoading,url,setUrl}){

    const handleClick = (e) =>{
        e.preventDefault();
        setLoading(true)
        onClick(null)
        fetch(`https://downtube-back-production.up.railway.app/api/info?url=${url}`).then(res=>res.json()).then(data=>{
            if(!data.success){
                onClick(data)
                console.log(data)
                setLoading(false)
                return;
            }
            onClick(data)
            setLoading(false)
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <Bar>
            <Input value={url} placeholder='http://youtube.com/' onChange={e=>setUrl(e.target.value)}/>
            <Button onClick={handleClick}>
                <FontAwesomeIcon  icon={faSearch} />
            </Button>
        </Bar>
    )
}