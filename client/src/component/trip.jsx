import { useEffect, useState } from "react";
import axios from "axios";

function Trip() {
  const [tripData, setTripData] = useState([]);
  const [searchTrip, setSearchTrip] = useState("");

  const getTripData = async () => {
    const result = await axios.get(
      `http://localhost:4001/trips?keywords=${searchTrip}`
    );
    console.log(result.data.data);
    setTripData(result.data.data);
  };

  useEffect(() => {
    getTripData();
  }, [searchTrip]);

  const handleSearchChange = (event) => {
    setSearchTrip(event.target.value);
  };

  return (
    <div className="app">
      <h1>เที่ยวไหนดี</h1>
      <input
        type="text"
        placeholder="ค้นหาที่เที่ยว"
        value={searchTrip}
        onChange={handleSearchChange}
      />
      <p>หาที่เที่ยวแล้วไปกัน</p>
      <hr />
      <br />
      <div className="trip-list">
        {tripData.map((trip) => (
          <div className="trip" key={trip.eid}>
            <div className="trip-preview">
              <img
                src={trip.photos[0]}
                alt="trip-photo"
                width="250"
                height="250"
              />
            </div>
            <div className="trip-detail">
              <div className="trip-title">{trip.title}</div>
              <div className="trip-description">{trip.description}</div>
              <button onClick={() => (window.location.href = trip.url)}>
                อ่านต่อ
              </button>
              <div className="tag">
                หมวด
                <div className="tags">
                  {trip.tags.map((tag, index) => (
                    <span key={index}> {tag}</span>
                  ))}
                </div>
              </div>
              <div className="trip-photo-more">
                {trip.photos.slice(1).map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt="trip-photo-more"
                    width="250"
                    height="250"
                  />
                ))}
              </div>
              <button
                className="copy-link"
                onClick={() => {
                  navigator.clipboard.writeText(trip.url);
                }}
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnQWKofQxiQHCLIXa6LYNYc0htUvYPr481Jw&s"
                  alt="hyper-link"
                  width="100"
                  height="100"
                ></img>
              </button>
            </div>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trip;
