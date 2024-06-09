import React, { useEffect, useState } from "react";

const Weather = () => {
  const mpsTokmph = (mps) => {
    return (mps * 3.6).toFixed(2);
  };

  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (search) {
      const fetchApi = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=0e3d8ba5b10454e874914fa52c6c39ee`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          setCity(data.name);
          setTemperature(data.main.temp);
          setHumidity(data.main.humidity);
          setSpeed(mpsTokmph(data.wind.speed));
          setError(false);
        } else {
          setError(true);
          console.error("error");
        }
      };
      fetchApi();
    }
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(query);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <>
      <div
        className={`h-screen flex flex-col justify-center items-center ${
          isDarkMode ? "bg-black" : "bg-slate-300"
        }`}
      >
        <div className="flex justify-end pl-96">
          <button className="my-2" onClick={toggleDarkMode}>
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M13 3a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0V3ZM6.3 5A1 1 0 0 0 5 6.2l1.4 1.5a1 1 0 0 0 1.5-1.5L6.3 5Zm12.8 1.3A1 1 0 0 0 17.7 5l-1.5 1.4a1 1 0 0 0 1.5 1.5L19 6.3ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-9 4a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H3Zm16 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2ZM7.8 17.7a1 1 0 1 0-1.5-1.5L5 17.7A1 1 0 1 0 6.3 19l1.5-1.4Zm9.9-1.5a1 1 0 0 0-1.5 1.5l1.5 1.4a1 1 0 0 0 1.4-1.4l-1.4-1.5ZM13 19a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="rounded-lg shadow-xl p-3 px-12 bg-white w-[90%] mx-auto md:w-[45%] lg:w-[35%] xl:w-[25%] dark:bg-gray-700 dark:text-white">
          <p className="text-center font-bold text-[28px]">Weather App</p>

          <form className="my-4" onSubmit={handleSearch}>
            <input
              className=" p-1 border text-black"
              placeholder="Enter City "
              value={query}
              onChange={(e) => {
                setQuery(e.target.value); //Update query state on input change
              }}
            />
            <button
              type="submit"
              className="p-1 border bg-gray-200 px-3 text-gray-900"
            >
              {/* <i class="fa-solid fa-magnifying-glass"></i> */}
              Search
            </button>
          </form>

          <div className="text-center">
            {error ? (
              <p className="mt-6 font-semibold my-2 ">
                <i className="fa-solid fa-xmark text-red-500 fa-xl mx-2" />
                not found
              </p>
            ) : (
              <>
                <div>
                  <i className="fa-solid fa-street-view fa-2xl"></i>
                  <span className="text-[35px] font-bold mx-4 font-mono">
                    {city}
                  </span>
                </div>
                {temperature !== null ? (
                  <>
                    <p className="text-[35px] my-4">{temperature}°C</p>
                    <p className="my-2">
                      Min : {temperature}°C | Max : {temperature}°C
                    </p>
                    <p className="my-3">Humidity : {humidity}%</p>
                    <p>Wind : {speed}km/h</p>
                  </>
                ) : (
                  <p className="my-5 text-[20px]">Loading...</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
