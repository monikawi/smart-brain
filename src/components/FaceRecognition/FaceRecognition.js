import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './FaceRecognition.css';

const FaceRecognition = () => {
  const [url, setUrl] = useState('');
  const [bounds, setBounds] = useState([]);
  const { user, setUser } = useContext(UserContext);

  const updateUrl = (e) => {
    setUrl(e.target.value);
    setBounds([]);
  }

  const calculateFaceLocation = (regions) => {
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    const holderArray = [];

    // eslint-disable-next-line array-callback-return
    regions.map((region) => {
      const bound = region.region_info.bounding_box;
      const faceBound = {
        leftCol: bound.left_col * width,
        topRow: bound.top_row * height,
        rightCol: width - (bound.right_col * width),
        bottomRow: height - (bound.bottom_row * height)
      }

      holderArray.push(faceBound);
    })

    setBounds(holderArray);
  }


  const onPhotoSubmit = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/imageurl`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: url
        })
      });
    
      const clarifaiResponse = await response.json();
  
      if (clarifaiResponse.outputs) {
        try {
          const countResponse = await fetch(`${process.env.REACT_APP_API_URL}/count`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: user.id
            })
          })
    
          const count = await countResponse.json();
    
          if (count) {
            setUser({...user, entries: count});
          }
        } catch (e) {
          console.log(e);
        }
  
        calculateFaceLocation(clarifaiResponse.outputs[0].data.regions);
      }  
    } catch (e) {
      // add user feedback
      console.log(e);
    }
  }

  return ( 
    <>
    <div className='formWrapper'>
      <p className='f3'>{'This smart-brain will detect faces in your pictures. Give it a try!'}</p>
      <div className='center'>
        <div className='center form pa5 br3 shadow-4 geoBg'>
          <input onChange={(e) => updateUrl(e)} className='f4 pa2 w-70 center' type="text"/>
          <div onClick={onPhotoSubmit} className='btn w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</div>
        </div>
      </div>
    </div>
    <div className='center ma'>
      <div className='mt4 mb5 relative'>
        {url && (
          <>
            <img id='inputImage' alt='img' src={url} width='500px' height='auto' />
            <div className="absolute">
              {bounds.map((bound) => (
                <div key={bound.id} className='bounding-box' style={{top: bound.topRow, left: bound.leftCol, right: bound.rightCol, bottom: bound.bottomRow}}></div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
}
 
export default FaceRecognition;