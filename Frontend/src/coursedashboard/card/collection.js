import React, { useEffect, useState } from 'react';
import ACard from './abuCard';
import './abuCard.css'

export default function AbuCard(){

    const cards = [
        {
            img: 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            caption: 'Life on Earth',
            hue: 220
        },
        {
            img: "https://images.unsplash.com/photo-1486162928267-e6274cb3106f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            caption: 'The Molecules of Life',
            hue: 110
        },
        {
            img: "https://images.pexels.com/photos/3554423/pexels-photo-3554423.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            caption: 'Control Systems in Plants',
            hue: 330
        }
    ]

    return <div className='abuCard'>
        <div className='abuCardCollection-flex'>
            {cards.map((card, ind)=>{
                return <ACard section={card} key={ind}></ACard>
            })}
        </div>
    </div>
}