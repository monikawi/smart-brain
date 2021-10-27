import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPhotoSubmit }) => {
  return (  
    <div className='formWrapper'>
      <p className='f3'>{'This Magic Brain will detect faces in your pictures. Give it a try!'}</p>
      <div className='center'>
        <div className='center form pa5 br3 shadow-4 geoBg'>
          <input onChange={onInputChange} className='f4 pa2 w-70 center' type="text"/>
          <div onClick={onPhotoSubmit} className='btn w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</div>
        </div>
      </div>
    </div>
    );
}
 
export default ImageLinkForm;