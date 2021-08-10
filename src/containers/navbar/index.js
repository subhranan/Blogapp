import React, { useContext } from 'react';
import { useState } from 'react';
import { SignInBtn } from '../../components';
import { UserContext } from '../../contexts/user';
import { db } from '../../firebase';
import "./style.css";
import Modal from 'react-modal'




export default function Navbar(){
    const[modalIsOpen,setModalIsOpen]=useState(false)
    let emailcheck;
    const [user,setUser]=useContext(UserContext).user
    if (user){
    db.collection('users').where('email','==',user.email).get().then(snapshot=>{
        snapshot.docs.forEach(doc=>{
            emailcheck=(doc.data().email)
        })
        if (emailcheck!==user.email){
            setUser(null);
        }
    })}

    return <div className="navbar">
    <div className="Logo-content">
        <h4>Blogspot</h4>
        
        <p onClick={()=>setModalIsOpen(true)}>About</p>
        <p>Documentation</p></div>
        <Modal isOpen={modalIsOpen}
        style={
            {
                overlay:{
                    width:'60%',
                    left:'10%'
                }
            }
        }
        >
         <div className="modalheader">
            <h1>About</h1>
            <button onClick={()=>{setModalIsOpen(false)}}>close</button>
        </div>
        <div className="modalheader">
            <ul className="stylemodal">
                <li className="parachange"><h3>Our mission :</h3><span className="insidetext"><span className="quote">"Blogspot is a community space driven posting web application made for the students of Jorhat Engineering College.
                In this app, we offer a platform for the students to share ideas of projects, blogs to promote/highlight their interests,
                and many more. We hope that our beloved friends would make the best use of this platform."</span> </span></li>
                <li className="parachange"><h3>Terms of use:</h3>
                    <ol className="insidetext">
                    <li>You must sign-in with a professional account.</li>
                    <li>You must be atleast 16 years of age.</li>
                    <li>By signing-in, you agree to store your credentials in our database.</li>
                    <li>You agree to maintain a friendly environment and promote harmony.</li>
                    <li>Any unethical practice may lead to legal complications.</li>
                    <li>Unprofessional behaviour will not be tolerated.</li>
                    <li>Any action which would violate our welfare-policy may lead to account termination.<h4>You are requested to conact us immediately if you find anything inappropriate.</h4></li>
                    </ol>
                </li>
                <li className="parachange"><h3>Developer team :</h3>
                    <ol className="insidetext">
                        <li>Our Mentor : Mr. Diganta Baishya</li>
                        <li>Aditya Prakash Singh</li>
                        <li>Nilav Sarmah</li>
                        <li>Puneet Singh Bhamrah</li>
                        <li>Rohit Das</li>
                        <li>Roshan Chetry</li>
                        <li>Subhranan Bora</li>
                    </ol>
                </li>
                <li className="parachange"><h4 className="insidetext">Your feedback is what we value the most. Please give them at : blogspotapp@gmail.com</h4></li>
            </ul>
        </div>
        </Modal>
        
        {user? (<div className="navbaruser"><img className="navbar_img" src={user.photoURL}/><h5 className="navbarusername">{user.displayName}</h5></div>):(<SignInBtn/>)}
        
        
    </div>;
}
