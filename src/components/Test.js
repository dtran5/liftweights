import React, { useState } from 'react';

import { db } from '../firebase'


const Test = () => {
    

    db.collection("users")
      .add({
          name: 'John',
          email: "john@smith.com"
      })
      .then(() => {
          alert("worked")
      })
      .catch(()=>{
          alert("failed")
      })

    // db.collection('users')
    //   .get()
    //   .then( snapshot => {
    //       console.log(snapshot);
    //   })
    //   .catch(error => console.log(error))
    return (
        <div>
          Test
        </div>
    
      )
}


export default Test