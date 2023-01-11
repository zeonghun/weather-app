import "./App.css";
import { useEffect, useState } from "react";

// 유저는 현재위치의 날씨를 볼 수 있다(지역, 기온, 날씨 상태)
// 유저는 다른 도시의 버튼들을 볼 수 있다
// 유저는 다른 도시 버튼을 클릭하면 해당 도시의 날씨 정보를 볼 수 있다
// 유저는 데이터가 로딩될 때 로딩 스피너를 볼 수 있다

function App() {
  const getCurrentLocation = () => {
    // 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude; // 위도
      let lon = position.coords.longitude; // 경도
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    // 현재 위치 기반 날씨 가져오기
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c1bf7f1a52627b76245947adeac87b7e`;
    let response = await fetch(url); // API 호출
    let data = await response.json();
    console.log("data", data);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return <div>weather-app</div>;
}

export default App;
