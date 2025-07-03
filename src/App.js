import { useEffect } from 'react';
import Card from './components/jsx/Card';
import { useWeather } from './context/Weather';
import './App.css';

function App() {

  const Weather = useWeather();
  

  useEffect(() => {
    Weather.fetchUserLocation()
  },[] )

  return (
    <div className="App">
     
      <Card onClick={Weather.fetchData} value="Search"/>

    </div>
  );
}

export default App;
