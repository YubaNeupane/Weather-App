import React,{useState,useEffect} from 'react';
const api = {
  key: '473cec06c66fc5846103e9a4b5117088',
  base: 'https://api.openweathermap.org/data/2.5/'
}


function App() {

  const [quary, setQuery] = useState('New York City')
  const [weather, setWeather] = useState({})
  const [location, setLocation] = useState({})

  const  getLocation =() => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(showPosition);
    }
  }

  function showPosition(position) {
    const temp = {
      lat:position.coords.latitude,
      lon:position.coords.longitude
    }
    setLocation(temp)
    fetch(`${api.base}weather?lat=${temp.lat}&lon=${temp.lon}&units=metric&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {
      setWeather(result)
      setQuery('')
    })
  }
 

  useEffect(()=>{
    getLocation()
   
    getData()
  },[])
  
  if(typeof weather.main != 'undefined'){
    console.log()
  }

  const getData = () =>{
    fetch(`${api.base}weather?q=${quary}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('')
        })
  }

  const search = evt =>{
    if(evt.key === 'Enter'){
      getData()
    }
  }

  const dateBuilder = (d) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`


  }

  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp>16) ? 'app warm':'app'):'app'}>
      
      <div>
        <main>
          <div className ='search-box'>
            <input  className = 'search-bar' placeholder='Search...' type='text' onChange={e =>setQuery(e.target.value)} value={quary} onKeyPress={search}/>
          </div>
          {(typeof weather.main != 'undefined') ?(
            <div>
              <div className="location-box">
                <div className='location'>{weather.name},{weather.sys.country}</div>
                <div className='date'>{dateBuilder(new Date())}</div>
              </div>
              <div className='weather-box'>
                <div className='temp'>{Math.round(weather.main.temp)}°c</div>
                <div className='weather'>{weather.weather[0].main}</div>
              </div>
            </div>):(  <div>
              <div className="location-box">
                <div className='location'>CITY NOT FOUND</div>
              </div>
              </div>)}

        </main>
      </div>

      
    </div>
  );
}

export default App;
