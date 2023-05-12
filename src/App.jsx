import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

const App = () => {
  const [row, setRow] = useState([]);

  // useEffect 활용 방법
  // 1번째
  useEffect(() => {
    console.log("mount or update");

    // 내용이 지워질 때 (unmount 될 때) 실행하기 전에 실행되는
    return () => {
      console.log("unmount");
    };
  });

  // 2번째 : mount
  // 빈 배열 던짐
  useEffect(() => {
    console.log("mount only");
  }, []);

  // 3번째 :
  useEffect(() => {
    console.log("update only", row);
  }, [row]); // row 가 update 됐을 때만 해당 함수 실행

  useEffect(() => {
    if (row.length == 0) {
      fetch(
        "http://openapi.seoul.go.kr:8088/6e747a6b44616c733732614e53414f/json/RealtimeCityAir/1/25"
      ).then((res) => {
        res.json().then((res2) => {
          setRow(res2.RealtimeCityAir.row);
        });
      });
    }
  }, []);

  return (
    <>
      <button className="loadingButton">loading</button>
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
