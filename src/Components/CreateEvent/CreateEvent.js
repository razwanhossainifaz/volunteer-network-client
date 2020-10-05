import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './CreateEvent.css'

const CreateEvent = () => {
    const history = useHistory();
    useEffect(() => {
        fetch('https://pure-badlands-37217.herokuapp.com/organizations')
            .then(res => res.json())
            .then(data => {
                const newEvent = {...event};
                newEvent.id = (data.length + 1).toString();
                setEvent(newEvent);
            })
    }, [])

    const [event, setEvent] = useState({
        id: '',
        title: '',
        photo: ''
    })

    const handleBlur = (e) => {
        const newEvent = {...event};
        newEvent[e.target.name] = e.target.value;
        setEvent(newEvent);
    }

    const handleSubmit = (e) => {
        fetch('https://pure-badlands-37217.herokuapp.com/createEvents', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(event)
        })
        alert('Success');
        history.push('/events')

        e.preventDefault();
    }

    return (
        <div className="text-center">
            <div className="logo mt-5">
                <Link to="/">
                    <img src="https://i.ibb.co/9nJfMcV/Group-1329.png" alt="" />
                </Link>
            </div>

            <section className="createAccount-section mt-5 mb-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="createAccountWihEmail">
                            <h2 className="text-center">Create an event</h2>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <input className="form-control" onBlur={handleBlur} type="text" name="id" id="" placeholder="ID" value={event.id} disabled/>
                                <br />
                                <input className="form-control" onBlur={handleBlur} type="text" name="title" id="" placeholder="Title" required />
                                <br />
                                <input className="form-control" onBlur={handleBlur} type="text" name="photo" id="" placeholder="Photo URL" required />
                                <br />
                                <button type="submit" className="btn btn-primary mt-3 mb-4">Create an event</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CreateEvent;