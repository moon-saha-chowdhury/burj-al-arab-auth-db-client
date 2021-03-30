import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(()=>{
        fetch('http://localhost:5000/bookings?email='+loggedInUser.email)
        // {
            ///if i do jwt token then i will use it on fetch section
        //     method:'GET',
        //     headers:{
        //         'Content-Type': 'application/json',
        //         authorization:`Bearer ${sessionStorage.getItem('token')}`
        //     }
        // }
        .then(res=>res.json())
        .then(data => setBookings(data));

    },[])
    return (
        <div>
            <h1>You have: {bookings.length} bookings</h1>
            {
                bookings.map(book =><li>name: {book.name} From:{(new Date(book.checkIn).toDateString('dd/MM/yyyy'))} To: {(new Date(book.checkOut).toDateString('dd/MM/yyyy'))}</li>)
            }
        </div>
    );
};

export default Bookings;