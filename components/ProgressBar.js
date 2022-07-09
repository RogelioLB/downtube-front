import styled from "styled-components"

const Linear = styled.div`
width:100%;
height:20px;
background-color: #e3e3e3;
border-radius: 12px;
`

const Background = styled.div`
width:${props=>props.percentage ? `${props.percentage}%` : "0%"};
height:100%;
background:#3B82F6;
border-radius:12px;
`

export default function ProgressBar({type,percentage}){
    return(
        <>
        {type === "linear" && (
            <Linear>
                <Background percentage={percentage}/>
            </Linear>
        )}
        </>
    )
}