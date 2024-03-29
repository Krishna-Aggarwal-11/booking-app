import React, { useState } from 'react'

const PlaceGallery = ({place}) => {
    const [showAllPhoto, setShowAllPhoto] = useState(false);

    if (showAllPhoto) {
        return (
          <div className=" absolute bg-black text-white inset-0 min-h-screen">
            <div className=" bg-black p-8 grid gap-4">
              <div>
                <h2 className="mr-48 text-3xl">Photos of {place.title}</h2>
                <button
                  onClick={() => setShowAllPhoto(false)}
                  className=" right-12 top-12 flex gap-1 py-2 px4 rounded-2xl fixed shadow  bg-white text-black shadow-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Close Photos
                </button>
              </div>
              {place?.photo?.length > 0 &&
                place.photo.map((photos) => (
                  <div key={photos}>
                    <img src={"http://localhost:4000/upload/" + photos} alt="" />
                  </div>
                ))}
            </div>
          </div>
        );
      }

  return (
    <div>
        <div className=" relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
          <div>
            {place.photo?.[0] && (
              <div>
                <img onClick={()=>setShowAllPhoto(true)}
                  className=" object-cover cursor-pointer aspect-square"
                  src={"http://localhost:4000/upload/" + place.photo?.[0]}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="grid ">
            {place.photo?.[1] && (
              <img onClick={()=>setShowAllPhoto(true)}
                className=" object-cover cursor-pointer aspect-square"
                src={"http://localhost:4000/upload/" + place.photo?.[1]}
                alt=""
              />
            )}
            <div className="overflow-hidden">
              {place.photo?.[2] && (
                <img onClick={()=>setShowAllPhoto(true)}
                  className=" object-cover cursor-pointer aspect-square relative top-2"
                  src={"http://localhost:4000/upload/" + place.photo?.[2]}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhoto(true)}
          className=" flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl  shadow-md shadow-gray-500
         "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          Show more
        </button>
      </div>

    </div>
  )
}

export default PlaceGallery