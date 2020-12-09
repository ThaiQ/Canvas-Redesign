import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import './abuCard.css'

export default function AbuCard(props){

    function onClick(href){
        window.location.href=href
    }

    return <div className='abuCard'>
        <div className={'flip-card-container'} style={{"--hue": props.section.hue}}>
            <div className={'flip-card'}>

                <div className="card-front">
                <figure>
                    <div className="img-bg"></div>
                    <img src={props.section.img} alt={props.section.caption}/>
                    <figcaption>{props.section.caption}</figcaption>
                </figure>

                <ul>
                    {props.section.sections.map((section,ind)=>{
                        return <li className='course-section-list' key={ind} onClick={()=>{onClick(section.href)}}>{section.title}</li>
                    })}
                </ul>
                </div>

            </div>
        </div>
    </div>
}