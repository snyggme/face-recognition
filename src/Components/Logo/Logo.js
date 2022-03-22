import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'

const Logo = () => {
    return (
        <Tilt className='tilt ma4 mt0 br2 shadow-2'>
            <div className='pa3'>
                <img alt='brain' src={brain} />
            </div>
        </Tilt>
    );
}

export default Logo;