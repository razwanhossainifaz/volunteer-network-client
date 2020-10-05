import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from '../../App';
import NavBar from '../NavBar/NavBar';
import './EventTasks.css';

const EventTasks = () => {
    const [events, setEvents] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const loadEvents = () => {
        fetch('https://pure-badlands-37217.herokuapp.com/events?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => setEvents(data))
    }

    if (events.length === 0) {
        loadEvents();
    }
    
    const handleDelete = (id) => {
        fetch(`https://pure-badlands-37217.herokuapp.com/eventDelete/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(result => {
            if (result) {
                loadEvents();
            }
        })
        
            .catch(err => console.log(err))
    }


    return (
        <>
            <NavBar />
         
            <div className="container mt-5">
                {
                    (events.length === 0) ? 
                    <div className="text-center">
                        <h2>You haven't registered for any events yet.</h2>
                        <Link to='/home' style={{fontSize: '20px'}}>Register an event</Link>
                    </div>
                    : 
                    <>
                        <div className="text-center mb-5">
                            <h3 className="text-center">
                                <span style={{color: '#4f82f1'}}>
                                    {loggedInUser.name}
                                </span>
                            , You are registered for all of this events.
                            </h3>
                            <Link to='/home'>Register for an another event.</Link>
                        </div>
                        <div className="row  justify-content-around">
                            {
                                events.map(event => 
                                    <div className="col-md-5 mb-4 task">
                                        <img src={event.photo} alt="" />
                                        <div className="ml-3">
                                            <h2>{event.organization}</h2>
                                            <h5>Date: {event.date}</h5>
                                            {/* <div className="mt-5"> */}
                                                <button onClick={() => handleDelete(event.id)} className="btn btn-danger mt-4">Cancel</button>
                                            {/* </div> */}
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </>
                }
            </div>     
        </>
    );
};

export default EventTasks;


// style={{display: hide ? 'none' : 'null'}}