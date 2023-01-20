import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

// 유저는 현재위치의 날씨를 볼 수 있다(지역, 기온, 날씨 상태)
// 유저는 다른 도시의 버튼들을 볼 수 있다
// 유저는 다른 도시 버튼을 클릭하면 해당 도시의 날씨 정보를 볼 수 있다
// 유저는 데이터가 로딩될 때 로딩 스피너를 볼 수 있다

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const cities = ["New York", "London", "Dubai", "Seoul"];
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
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c1bf7f1a52627b76245947adeac87b7e&units=metric`;
    setLoading(true);
    let response = await fetch(url); // API 호출
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  const getWeatherByCity = async () => {
    // 도시별 날씨 가져오기
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c1bf7f1a52627b76245947adeac87b7e&units=metric`;
    setLoading(true);
    let response = await fetch(url); // API 호출
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  /*
  useEffect(() => {
    // UI가 처음에 그려지고 한 번 실행
    getCurrentLocation();
  }, []);

  useEffect(() => {
    // 배열에 있는 state 값이 바뀔 때마다 실행
    getWeatherByCity();
  }, [city]);
*/

  useEffect(() => {
    if (city == "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader color="#f88c6b" loading={loading} size={150} />
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} setCity={setCity} />
        </div>
      )}
      {/* loading이 true이면 로딩 스피너를 보여주고, false이면 날씨정보를 보여줌 */}
    </div>
  );
}

export default App;
