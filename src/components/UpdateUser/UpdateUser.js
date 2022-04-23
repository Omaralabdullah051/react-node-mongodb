import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    useEffect(() => {
        const url = `http://localhost:5000/user/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setUser(data));
    }, [id]);

    const handleUpdateUser = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;

        const updateUser = { name, email };

        const url = `http://localhost:5000/user/${id}`;
        fetch(url, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updateUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log('success', data);
                alert('users added successfully');
                e.target.reset();
            })
    }

    const emailRef = useRef('');
    useEffect(() => {
        emailRef.current.focus();
    }, [])
    return (
        <div>
            <h2>Updating user: {user.name}</h2>
            <form onSubmit={handleUpdateUser}>
                <input ref={emailRef} type="text" name="name" id="name" placeholder='Name' required />
                <br />
                <input type="email" name="email" id="email" placeholder='Email' required />
                <br />
                <input type="submit" value="Update User" />
            </form>
        </div>
    );
};

export default UpdateUser;