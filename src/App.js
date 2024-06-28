import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import "./index.css";

const App = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [permissionPrompt, setPermissionPrompt] = useState(true);
  const [loading, setLoading] = useState(false);

  const apiKey = 'd1a21ed24394b8ccd226fd615bf1b880';

  useEffect(() => {
    if ("geolocation" in navigator) {
      setPermissionPrompt(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPermissionPrompt(false);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          setPermissionPrompt(false);
          console.error('Error fetching geolocation:', error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      setLoading(true);
      const geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      axios.get(geoUrl)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching the weather data:', error);
          setLoading(false);
        });
    }
  }, [latitude, longitude, apiKey]);

  const searchLocation = useCallback((event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      setLoading(true);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
      axios.get(url)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching the weather data:', error);
          setLoading(false);
        });
    }
  }, [location, apiKey]);

  const shareOnSocialMedia = (platform) => {
    const shareText = `The weather in ${data.name} is ${data.main.temp}°C with ${data.weather[0].main}.`;
    const shareUrl = encodeURIComponent(window.location.href);
    const shareData = encodeURIComponent(shareText);

    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${shareData}&url=${shareUrl}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
        break;
      default:
        break;
    }
    window.open(url, '_blank');
  };

  return (
    <div className="app">
      <SearchBar location={location} setLocation={setLocation} searchLocation={searchLocation} />
      {permissionPrompt && <p className="info-message">Please allow location access to get the weather information for your current location.</p>}
      {loading && <p className="info-message">Loading...</p>}
      <WeatherDisplay data={data} shareOnSocialMedia={shareOnSocialMedia} />
    </div>
  );
}

export default App;
