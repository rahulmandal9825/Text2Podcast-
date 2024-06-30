// "use client";

import React from 'react'; // Import useState for error handling
import { user } from '../constants';
import { creatUser } from '@/lib/actions/user.action';
import { auth, currentUser } from '@clerk/nextjs/server';


const RightSidebar = async ()=> {

    const session = await currentUser();
  // const handleClick = async () => {
  //   try {
  //     const data = await creatUser(user);
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };



  return (
    <div className='right_sidebar'>
      {/* <button onClick={handleClick}>CREATE</button> */}
    </div>
  );
}

export default RightSidebar;