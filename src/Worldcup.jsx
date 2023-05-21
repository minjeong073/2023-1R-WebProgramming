import { useEffect, useRef, useState } from "react";
import "./worldcup.css";
import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";

import a01 from "./assets/HowlsMovingCastle.jpg";
import a02 from "./assets/BossBaby.jpg";
import a03 from "./assets/HowToTrainYourDragon.jpg";
import a04 from "./assets/MyNeighborTotoro.jpg";
import a05 from "./assets/WallaceAndGromit.jpg";
import a06 from "./assets/DespicableMe.jpg";
import a07 from "./assets/WallE.jpg";
import a08 from "./assets/SpiritedAway.jpg";
import a09 from "./assets/Coco.jpg";
import a10 from "./assets/Frozen.jpg";
import a11 from "./assets/MonstersINC.jpg";
import a12 from "./assets/CorpseBride.jpg";
import a13 from "./assets/AlvinAndTheChipmunks.jpg";
import a14 from "./assets/ToyStory.jpg";
import a15 from "./assets/FindingNEMO.jpg";
import a16 from "./assets/YourName.jpg";
import versus from "./assets/versus.png";

function Worldcup() {
  const candidate = [
    { name: "하울의 움직이는 성", src: a01 },
    { name: "보스베이비", src: a02 },
    { name: "드래곤 길들이기", src: a03 },
    { name: "이웃집 토토로", src: a04 },
    { name: "월레스와 그로밋", src: a05 },
    { name: "슈퍼배드", src: a06 },
    { name: "월 E", src: a07 },
    { name: "센과 치히로의 행방불명", src: a08 },
    { name: "코코", src: a09 },
    { name: "겨울왕국", src: a10 },
    { name: "몬스터 주식회사", src: a11 },
    { name: "유령신부", src: a12 },
    { name: "앨빈과 슈퍼밴드", src: a13 },
    { name: "토이스토리", src: a14 },
    { name: "니모를 찾아서", src: a15 },
    { name: "너의 이름은", src: a16 },
  ];

  // stat 초기화 함수 ({'name':0} 형태)
  const initStatState = candidate.reduce((acc, { name }) => {
    acc[name] = 0;
    return acc;
  }, {});

  const [game, setGame] = useState([]);
  const [round, setRound] = useState(0);
  const [nextGame, setNextGame] = useState([]);
  const [stat, setStat] = useState(initStatState);

  const selectImage = useRef(null);
  const nonSelectImage = useRef(null);
  const versusImage = useRef(null);

  const transformSelectImage = (num) => {
    if (num === 1) {
      nonSelectImage.current.style.display = "none";
      versusImage.current.style.display = "none";
    } else {
      selectImage.current.style.display = "none";
      versusImage.current.style.display = "none";
    }
  };
  const returnImage = () => {
    selectImage.current.style.display = "";
    nonSelectImage.current.style.display = "";
    versusImage.current.style.display = "";
  };

  // 처음 Worldcup component가 실행되는 부분
  // 단 한번 실행되는 함수
  useEffect(() => {
    const str = localStorage.getItem('2019111791');
    if (str != null) {
      setStat(JSON.parse(str));
    }
    setGame(
      candidate
        .map((c) => {
          return { name: c.name, src: c.src, order: Math.random() };
        })
        .sort((l, r) => {
          return l.order - r.order;
        })
    );
  }, []);

  useEffect(() => {
    if (game.length > 1 && round + 1 > game.length / 2) {
      setGame(nextGame);
      setNextGame([]);
      setRound(0);
    }
  }, [round]);

  const left = round * 2;
  const right = round * 2 + 1;

  const leftFunction = () => {
    /*
    setStat((prevStat) => {
      prevStat[game[left * 2].name] = prevStat[game[left * 2].name] + 1;
      return prevStat
      }
    )

    -> 배열을 직접 변경하면 값 변화를 예측할 수 없음
    두번씩 반복됨
    spread operator 로 배열 가져와서 복사한 후 새로 값 변경해야함
    */

    setStat({
      ...stat,
      [game[left].name]: stat[game[left].name] + 1,
    });
    transformSelectImage(1);
    setTimeout(() => {
      setNextGame((prev) => prev.concat(game[left]));
      setRound((round) => round + 1);
      returnImage(1);
    }, 3000);
  };

  const rightFunction = () => {
    setStat({
      ...stat,
      [game[right].name]: stat[game[right].name] + 1,
    });
    transformSelectImage(2);
    setTimeout(() => {
      setNextGame((prev) => prev.concat(game[right]));
      setRound((round) => round + 1);
      returnImage(2);
    }, 3000);
  };

  // Chart
  const localStorage_data = JSON.parse(localStorage.getItem('2019111791'))
  // 승리 횟수 내림차순 정렬
  var sorted = [];
  for (var name in localStorage_data)
    sorted.push([name, localStorage_data[name]]);
  sorted = sorted.sort((l, r) => {
    return r[1] - l[1];
  });

  const dataLabel = [];
  sorted.forEach(data => {
    dataLabel.push(data[0])
  })
  const dataCount = [];
  sorted.forEach(data => {
    dataCount.push(data[1]);
  });

  const data = {
    labels: dataLabel,
    datasets: [
      {
        label: '1:1 우승 횟수',
        data: dataCount,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1
      }
    ]
  };

  if (game.length === 1) {
    localStorage.setItem('2019111791', JSON.stringify(stat));

    return (
      <div className="wrapper">
        <div className="header_title">애니메이션 영화 월드컵 우승!</div>
        <div className="winner_information">
          <div className="winner_movie">
            <img src={game[0].src} className="winner_movie_image" />
            <p className="movie_name winner_movie_name">{game[0].name}</p>
          </div>
          <div className='movie_statistics'>
            {/* <table>
              <thead>
                <tr>
                  <td>영화 이름</td>
                  <td>이긴 횟수</td>
                  <td>퍼센트(%)</td>
                </tr>
              </thead>
              <tbody>
                {Object.keys(stat).map((name) => {
                  return (
                    <tr key={name}>
                      <td>{name}</td>
                      <td>{stat[name]}</td>
                      <td>{stat[name] / 16 * 100}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table> */}
            <div className="movie_chart">
              <Bar data={data} />
            </div>
            <div>

            </div>
          </div>
        </div>
      </div>
    );
  }


  if (game.length === 0 || round + 1 > game.length / 2)
    return <p>로딩중입니다</p>;

  return (
    <div className="wrapper">
      <div className="header_title">
        애니메이션 영화 월드컵 {round + 1} / {game.length / 2}{" "}
        <b>{game.length === 2 ? "결승" : game.length + "강"}</b>
        <p className="subtitle">가장 감명 깊게 본 영화를 선택하세요!</p>
      </div>
      <div ref={selectImage}>
        <img
          src={game[left].src}
          className='movie_image'
          onClick={leftFunction}
        />
        <p className='movie_name'>{game[left].name}</p>
      </div>
      <div ref={nonSelectImage}>
        <img
          src={game[right].src}
          className='movie_image'
          onClick={rightFunction}
        />
        <p className='movie_name'>{game[right].name}</p>
      </div>
      <img src={versus} className="versus_image" ref={versusImage} />
    </div>
  );
}

export default Worldcup;
