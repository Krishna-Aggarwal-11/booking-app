import React from 'react'

const PlaceImg = ({place , index=0,className=null}) => {
    if (!place.photo?.length) {
        return ""
    }
    if (!className) {
        className = "object-cover"
    }
  return (
    <img className={className} src={"http://localhost:4000/upload/" + place.photo[index]} alt=""/>

  )
}

export default PlaceImg