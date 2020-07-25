import React,{useState,useEffect} from 'react';
import Forcast from './Forcast'
import BotttomNav from './BottomNav'
import Typography from '@material-ui/core/Typography'

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

const api = {
  key: '473cec06c66fc5846103e9a4b5117088',
  base: 'https://api.openweathermap.org/data/2.5/'
}


function App() {

  const [quary, setQuery] = useState('New York City')
  const [weather, setWeather] = useState({})
  const [location, setLocation] = useState({})
  const [unit, setUnit] = useState('metric')
  const [forecast,setForecast] = useState([])


  const getForecast = (id) =>{
      fetch(`${api.base}forecast/?id=${id}&units=${unit}&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setForecast(result.list)
        console.log(forecast)
      })
    

  }

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
    fetch(`${api.base}weather?lat=${temp.lat}&lon=${temp.lon}&units=${unit}&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {
      getForecast(result.id)
      setWeather(result)
      console.log(result)
     
      setQuery('')
    })
  }
 
  useEffect(()=>{
    getLocation()
  getData()
    //getForecast()

    // setUnit('Imperial')
    // setUnit('metric')
    // getData()
    // setUnit('Imperial')
    // setUnit('metric')
    // getData()
    // setUnit('Imperial')
    // setUnit('metric')
    // getData()
    // setUnit('Imperial')
    // setUnit('metric')
    // getData()

  },[])


  
  

  if(typeof weather.main != 'undefined'){
  }

  const getData = () =>{
    fetch(`${api.base}weather?q=${quary}&units=${unit}&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          getForecast(result.id)
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
  const handleUnitChange = (e) =>{
    // if(e.target.checked){
    //   setUnit('Imperial')
    //   getDataWithName(weather.name)
    // }else{
    //   setUnit('metric')
    //   getDataWithName(weather.name)
    // }
  }

  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp>16) ? 'app warm':'app'):'app'}>
      <div>
        <main>
          <div className ='search-box'>
            <TextField className ='search-box' style={{width:'100%',}} id="standard-basic"label="Type zip code or city name" variant="filled"  onChange={e =>setQuery(e.target.value)} value={quary} onKeyPress={search}/>  
            {/* <FormControlLabel
              value="end"
              control={<Switch color="secondary" />}
              label="Imperial"
              labelPlacement="end"
              onChange={handleUnitChange}
              checked={unit === 'Imperial'?true:false}
             /> */}
          </div>
          {(typeof weather.main != 'undefined') ?(
            <div>
              <div className="location-box">
                <div className='location'>{weather.name},{weather.sys.country}</div>
                <div className='date'>{dateBuilder(new Date())}</div>
              </div>
              <div className='weather-box'>
              <div className='temp'>{Math.round(weather.main.temp)}°{unit === 'Imperial' ? 'F' : 'C'}</div>
                <div className='weather'>{weather.weather[0].main}</div>
              </div>

              <div>
              <Typography variant="h6" component="h3" style={{color:'white',marginBottom:'-2%'}}>FORECAST:</Typography>
              <Forcast data={forecast}style={{marginTop:0}}></Forcast>
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
