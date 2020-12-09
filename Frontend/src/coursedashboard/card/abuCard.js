import React, { useEffect, useState } from 'react';
import './abuCard.css'

export default function AbuCard(props){

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
                    <li>Detail 1</li>
                    <li>Detail 2</li>
                    <li>Detail 3</li>
                    <li>Detail 4</li>
                    <li>Detail 5</li>
                </ul>
                </div>

            </div>
        </div>
    </div>
}