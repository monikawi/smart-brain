import React from 'react';
 
const Entries = ({ user }) => {
  const { name, entries } = user;

  return ( 
    <>
      <div className='white f3'>
        {`${name}, your current entry count`}
      </div>
      <div className='white f1'>
        {entries}
      </div>
    </>
  );
}
 
export default Entries;