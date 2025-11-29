import React from "react";
import { useState } from "react";
 import { useEffect } from "react";
 
 
 
 const NameHandler = ( {children}) => {
   
   const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  
  
  // Name Handler

  const nameHandler = () => {
      console.log("name Handler", name);
      localStorage.setItem("userName", name);
      
      setLoading(true);
      setTimeout(() => {
          console.log("this function will be executed after 5 second ");
       setLoading(false);
       document.getElementById("my_modal_1").close();
     }, 2000);
   };


   useEffect(() => {


     let validName = localStorage.getItem("userName");
     console.log(validName);
     if (!validName) {
       document.getElementById("my_modal_1").showModal();
     } else {

       console.log("name is there already");
     }
   }, []);  
 

  return (
    <>
      {children}

      <div>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <legend className="fieldset-legend">What is your name?</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <div className="modal-action">
              {loading ? (
                <button className="btn btn-primary">
                  <span className="loading loading-spinner"></span>
                  loading
                </button>
              ) : (
                <button className="btn btn-primary" onClick={nameHandler}>
                  Ok!
                </button>
              )}

              {/* <form method="dialog"> */}
              {/* if there is a button in form, it will close the modal */}
              {/* <button className="btn">Close</button>
              </form> */}
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default NameHandler;
