const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}`;

     export const getWeaterData = async (city) => {
       try {
         const response = await fetch(`${url}&q=${encodeURIComponent(city)}&aqi=yes`);
         if (!response.ok) {
           throw new Error(`HTTP error! Status: ${response.status}`);
         }
         return await response.json();
       } catch (error) {
         return { error: error.message };
       }
     };

     export const getWeaterDataForLocation = async (lat, lon) => {
       try {
         const response = await fetch(`${url}&q=${lat},${lon}&aqi=yes`);
         if (!response.ok) {
           throw new Error(`HTTP error! Status: ${response.status}`);
         }
         return await response.json();
       } catch (error) {
         return { error: error.message }
       }
     };