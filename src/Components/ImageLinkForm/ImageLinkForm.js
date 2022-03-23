import React from 'react';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className='f3 center pa4'>
                {'This Magic Brain will detect faces in your pictures. Give it a try'}
            </p>
            <div className='center'>
                <div className='form pa4 br3 shadow-5'>
                    <input className='w-70 pa2 f4 ' type='text' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;