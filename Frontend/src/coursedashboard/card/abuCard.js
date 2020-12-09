import React, { useEffect, useState } from 'react';
import './abuCard.css'

export default function AbuCard(){

    const [ani,setAni]=useState('flip-card-container')
    const [aniflip,setAniflip]=useState('flip-card')
    
    function myAni(){
        if(ani === 'flip-card-container'){
            setAni('flip-card-container transf')
            setAniflip('flip-card transf')
        }
        else {
            setAni('flip-card-container')
            setAniflip('flip-card')
        }
    }

    return <div className='abuCard'>
        <div className={ani} style={{"--hue": 220}} onClick={()=>{myAni()}}>
            <div className={aniflip}>

                <div className="card-front">
                <figure>
                    <div className="img-bg"></div>
                    <img src="https://images.unsplash.com/photo-1486162928267-e6274cb3106f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="Brohm Lake"/>
                    <figcaption>Brohm Lake</figcaption>
                </figure>

                <ul>
                    <li>Detail 1</li>
                    <li>Detail 2</li>
                    <li>Detail 3</li>
                    <li>Detail 4</li>
                    <li>Detail 5</li>
                </ul>
                </div>


                <div className="card-back">
                <figure>
                    <div className="img-bg"></div>
                    <img src="https://images.unsplash.com/photo-1486162928267-e6274cb3106f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="Brohm Lake"/>
                </figure>
                
                <button>Book</button>

                <div className="design-container">
                    <span className="design design--1"></span>
                    <span className="design design--2"></span>
                    <span className="design design--3"></span>
                    <span className="design design--4"></span>
                    <span className="design design--5"></span>
                    <span className="design design--6"></span>
                    <span className="design design--7"></span>
                    <span className="design design--8"></span>
                </div>
                </div>

            </div>
        </div>
    </div>
}