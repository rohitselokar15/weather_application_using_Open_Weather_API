import React, { useEffect, useState } from 'react'

const Weather = () => {

  const mpsTokmph = (mps)=>{
    return (mps*3.6).toFixed(2);
  }

  const[city,setCity] = useState(null);
  const[search,setSearch] = useState();
  const[temperature,setTemperature] = useState(null);
  const[humidity,setHumidity] = useState(null);
  const[speed,setSpeed] = useState(null);
  const [error, setError] = useState(false);

  useEffect(()=>{
    const fetchApi = async () =>{
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=0e3d8ba5b10454e874914fa52c6c39ee`;
      const response = await fetch(url);
      const data = await response.json();

      if(response.ok){
        setCity(data.name);
        setTemperature(data.main.temp);
        setHumidity(data.main.humidity);
        setSpeed(mpsTokmph(data.wind.speed));
        setError(false);
      }
      else{
        setError(true);
        console.error("error");
      }
    };
    fetchApi();
  },[search])

  return (
    <>
      <div className='h-screen flex flex-col justify-center items-center bg-slate-700'>
        <div className='rounded-lg shadow-xl p-2 px-12 bg-white w-[80%] mx-auto md:w-[45%] lg:w-[35%] xl:w-[25%]'>
          
          <p className='text-center font-bold text-[28px] mb-5'>Weather App</p>

          <div className='my-4'>
            <input className='border p-1 text-black w-full'
              placeholder='Enter City '
              value={search}
              onChange={(e)=>{
                setSearch(e.target.value)
              }}
            />
          </div>

          <div className=' text-center'>
           <div>
              <i className="fa-solid fa-street-view fa-2xl"></i>
              <span className='text-[35px] font-bold mx-4 font-mono'>{city}</span>
           </div>
            {
              temperature !==null ? (
                <>
                  <p className='text-[35px] my-4'>{temperature}°C</p>
                  <p className='my-2'>Min : {temperature}°C | Max : {temperature}°C</p>
                  <p className='my-3'>Humidity : {humidity}%</p>
                  <p>Wind : {speed}km/h</p>
                </>
              ):(
                <p className='my-5 text-[20px]'>Loading...</p>
              )
            }
          </div>
        </div>
      </div>

    </>
  )
}

export default Weather
