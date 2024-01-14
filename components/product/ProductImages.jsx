"use client"
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const productImages = {
    images: ['']
}

/**
 * 
 * @param {productImages} props 
 * @returns 
 */
export default function ProductImages(props) {
    const [index, setIndex] = useState(0);

    return (
        <div>
            <Carousel pause='hover' activeIndex={index} onSelect={(i) => setIndex(i)}>
                {props.images.map(el => {
                    return (
                        <Carousel.Item key={el} className='container py-4 px-4' >
                            <img src={el} alt="" style={{ width: '100%'}} />
                        </Carousel.Item>
                    )
                })}
            </Carousel>
            <div className='d-flex gap-2 mt-2'>
                {props.images.map((el, i) => {
                    return (
                        <img onClick={() => setIndex(i)} src={el} key={i} width={100} style={{ cursor: 'pointer' }} />
                    )
                })}
            </div>
        </div>
    )
}