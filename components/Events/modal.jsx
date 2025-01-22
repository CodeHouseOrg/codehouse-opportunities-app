import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export const EventModal = ({open,onClose}) => {
 

  return (
    <div>
    
      <Modal open={open} onClose={onClose} center>
        <h1 className='font-semibold'>Summer Hackathon </h1>
        <h2>Host : <p>CodeHouse</p> </h2>
        <h2>When: <p>Aug 17 9am - Aug 17 5pm</p></h2>
        <h2>Where: <p> Rubin Museum 123 5th ave New York, NY USA</p></h2>
        <h2>About: <p> We’re dedicated to the ABC’s and support Alphabet  services through various program initiatives. Join us on our journey.</p></h2>
       <h2>Ticket Price: <p>$20</p></h2>
       <button>Attend</button>
        <p>
          
        </p>
      </Modal>
    </div>
  );
};
