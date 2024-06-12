import { useEffect, useState } from "react";
import axios from "axios";

function Trip() {
  const [tripData, setTripData] = useState([]);
  const [searchTrip, setSearchTrip] = useState("");

  const getTripData = async () => {
    const result = await axios.get(
      `http://localhost:4001/trips?keywords=${searchTrip}`
    );
    // console.log(result.data.data);
    setTripData(result.data.data);
  };

  useEffect(() => {
    getTripData();
  }, [searchTrip]);

  const handleSearchChange = (event) => {
    setSearchTrip(event.target.value);
  };

  return (
    <div className="app flex flex-col justify-center items-center font-Kanit">
      <h1 className="app-title text-5xl font-bold mb-10 w-screen text-center p-5 mt-10 text-blue-700">
        เที่ยวไหนดี
      </h1>
      <div className="trip-input w-3/4 text-xl ">
        <input
          className="trip-input w-full"
          type="text"
          placeholder="ค้นหาที่เที่ยว"
          value={searchTrip}
          onChange={handleSearchChange}
        />
        <p className="text-center text-gray-500">หาที่เที่ยวแล้วไปกัน ...</p>
        <hr className="border-1 border-gray-500" />
      </div>
      <br />
      <div className="trip-list w-screen ">
        {tripData.map((trip) => (
          <div
            className="trip flex flex-row justify-around g-16 p-5 relative "
            key={trip.eid}
          >
            <div className="trip-preview pl-72">
              <img
                src={trip.photos[0]}
                alt="trip-photo"
                className="rounded-3xl w-96 h-64"
              />
            </div>
            <div className="trip-detail basis-1/2">
              <div className="trip-title text-2xl font-semibold mb-2">
                {trip.title}
              </div>
              <div className="trip-description ">
                {trip.description.substring(0, 100)}
              </div>
              <button
                className="trip-more-info text-blue-500 underline underline-offset-1"
                onClick={() => (window.location.href = trip.url)}
              >
                อ่านต่อ
              </button>
              <div className="trip-tag">
                หมวด
                {trip.tags.map((tag, index) => (
                  <button
                    className="underline underline-offset-auto p-1 cursor-pointer"
                    key={index}
                    onClick={() =>
                      setSearchTrip((prevSearchTrip) =>
                        prevSearchTrip.includes(tag)
                          ? prevSearchTrip
                          : prevSearchTrip
                          ? `${prevSearchTrip} ${tag}`
                          : tag
                      )
                    }
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <div className="trip-photo-more flex flex-row justify-start gap-10 pt-4">
                {trip.photos.slice(1).map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt="trip-photo-more"
                    width="150"
                    className="rounded-xl"
                  />
                ))}
              </div>
            </div>
            <button
              className="hyper-link absolute top-48 right-72"
              onClick={() => {
                navigator.clipboard.writeText(trip.url);
              }}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnQWKofQxiQHCLIXa6LYNYc0htUvYPr481Jw&s"
                alt="hyper-link"
                width="60"
                height="60"
              ></img>
            </button>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trip;
