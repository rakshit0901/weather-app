import React from 'react';
import SocialMediaButtons from './SocialMediaButtons';

const WeatherDisplay = ({ data, shareOnSocialMedia }) => {
  return (
    <div className="container">
      <div className="top">
        <div className="location">
          <p>{data.name}</p>
        </div>
        <div className="temp">
          {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
        </div>
        <div className="description">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>
      </div>
      {data.name && (
        <div className="bottom">
          <div className="feels">
            {data.main ? <p>Feels like: {data.main.feels_like.toFixed()}°C</p> : null}
          </div>
          <div className="wind">
            {data.wind ? <p>Wind speed: {data.wind.speed} m/s</p> : null}
          </div>
          <div className="humidity">
            {data.main ? <p>Humidity: {data.main.humidity.toFixed()}%</p> : null}
          </div>
          <SocialMediaButtons data={data} shareOnSocialMedia={shareOnSocialMedia} />
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
