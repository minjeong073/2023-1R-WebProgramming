import { useState } from "react";
import "./App.css";

const App = () => {
  const [row, setRow] = useState([]);

  const onClickButton = () => {
    if (row.length == 0) {
      fetch(
        "http://openapi.seoul.go.kr:8088/6e747a6b44616c733732614e53414f/json/RealtimeCityAir/1/25"
      ).then((res) => {
        res.json().then((res2) => {
          setRow(res2.RealtimeCityAir.row);
        });
      });
    }
  };

  return (
    <>
      <button onClick={onClickButton} className="loadingButton">
        loading
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>name</th>
            <th>PM10</th>
            <th>O3</th>
            <th>state</th>
          </tr>
        </thead>
        <tbody>
          {row.map((obj, index) => {
            return (
              <tr key={index}>
                <td>{obj.MSRSTE_NM}</td>
                <td>{obj.PM10}</td>
                <td>{obj.O3}</td>
                <td>{obj.IDEX_NM}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default App;
