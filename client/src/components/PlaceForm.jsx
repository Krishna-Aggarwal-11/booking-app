import React, { useEffect, useState } from "react";
import PhotoUploader from "./PhotoUploader";
import Perks from "./Perks";
import axios from "axios";
import AccountNav from "./AccountNav";
import { Navigate, useParams } from "react-router-dom";

const PlaceForm = () => {
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(1);
  const [redirect, setRedirect] = useState(false);

  useEffect(()=>{
    if (!id) {
      return;
    }
    axios.get("http://localhost:4000/places/"+id).then(response=>{
      const {data} = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photo);
      setDescription(data.description);
      setExtraInfo(data.extraInfo);
      setPerks(data.perks);
      setCheckIn(data.checkIn)
      setCheckOut(data.checkOut)
      setMaxGuests(data.maxGuests)
      setPrice(data.price)
    })
  },[id])

  function inputHeader(text) {
    return <h2 className=" text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className=" text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function addNewPlace(e) {
    e.preventDefault();
    const palceData = {title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price
    }
    if (id) {
      //update info
      await axios.put("http://localhost:4000/places",{id,...palceData});
      setRedirect(true)
    }else{
      await axios.post("http://localhost:4000/places",palceData);
      setRedirect(true)
    }
  }
  if (redirect) {
    return <Navigate to={"/account/places"}/>
  }
  

  return (
    <div>
        <AccountNav/>
      <form onSubmit={addNewPlace} className="">
        {preInput("Title", "Title for your place.")}
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {preInput("Address", "Address for your place.")}
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {preInput("Photos", "Photos for your place.")}
        <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Descriptions", "Description for your place.")}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {preInput("Perks", "select all the perks for your place.")}
        <div className="mt-2 gap-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <Perks selector={perks} onChange={setPerks} />
        </div>
        {preInput("Extra info", "some extra info for your place.")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        {preInput(
          "Check in&out times",
          "add check in and out times , remember to have some time for cleaning the room"
        )}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check In times</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              placeholder="18"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check Out times</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              placeholder="14"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per nyt</h3>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
};

export default PlaceForm;
