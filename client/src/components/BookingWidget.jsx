import React, { useContext, useEffect, useState } from "react";
import {differenceInCalendarDays} from "date-fns"
import axios from "axios";
import { Navigate } from 'react-router-dom';
import { UserContext } from "../UserContext";
const BookingWidget = ({place}) => {
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [redirect, setRedirect] = useState("");
    const {user}  = useContext(UserContext)

    useEffect(()=>{
      if (user) {
        setName(user.name);
      }
    },[user])
    let numberOfNights = 0 ;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut),new Date(checkIn))
    }

    async function bookThisPlace() {
        const response = await  axios.post("http://localhost:4000/bookings",{checkIn,checkOut,name,phone,numberOfGuests,place:place._id,price:numberOfNights * place.price})
        const bookingId = response.data._id ;
        setRedirect(`/account/bookings/${bookingId}`)
    }
    if (redirect) {
      return <Navigate to={redirect} />
    }

  return (
    <div>
      <div className=" bg-white shadow p-4 rounded-2xl">
        <div className="tetx-2xl text-center">Price : ${place.price} / nyt</div>
        <div className="border rounded-2xl mt-4">
          <div className="flex">
            <div className="  py-3 px-4 ">
              <label>Check-in</label>
              <input type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} />
            </div>
            <div className="  py-3 px-4 border-l">
              <label>Check-out</label>
              <input type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)} />
            </div>
          </div>
          <div className="  py-3 px-4 border-t">
            <label>No. of guests</label>
            <input type="number" value={numberOfGuests} onChange={e=>setNumberOfGuests(e.target.value)} max={place.maxGuests} />
          </div>
          {numberOfNights > 0 && (
             <div className="  py-3 px-4 border-t">
             <label>Your Full Name :</label>
             <input type="text" value={name} onChange={e=>setName(e.target.value)}  />
             <label>Your Phone Number :</label>
             <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)}  />
           </div>
          )}
        </div>

        <button onClick={bookThisPlace} className="primary mt-4">
        Book this place 
        {numberOfNights >0 && (
            <span> ${numberOfNights * place.price}</span>
        )}
        </button>
      </div>
    </div>
  );
};

export default BookingWidget;
