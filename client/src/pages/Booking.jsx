import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Address from "../components/Address";
import PlaceGallery from "../components/PlaceGallery";
import Dates from "../components/Dates";

const Booking = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("http://localhost:4000/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);
  if (!booking) {
    return "";
  }

  return (
    <div className=" my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <Address className="my-2 block">{booking.place.address}</Address>
      <div className=" bg-gray-200 p-6 my-6 rounded-2xl flex justify-between items-center">
        <div>
          <h2 className="text-2xl mb-4">
            Your Booking information:
            <Dates booking={booking} />
          </h2>
        </div>
        <div className=" bg-primary p-4 text-white rounded-2xl">
          <div>Total price :</div>
          <div className=" text-3xl">${booking.price}</div>
        </div>

      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
};

export default Booking;
