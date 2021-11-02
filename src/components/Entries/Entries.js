import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Entries = () => {
  const { user } = useContext(UserContext);


  return ( 
    <>
      <div className='white f4'>
        {`${user.name}, your current entry count is:`}
      </div>
      <div className='white f1'>
        {user.entries}
      </div>
    </>
  );
}
 
export default Entries;