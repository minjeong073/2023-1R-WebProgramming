import { useEffect, useRef, useState } from "react";
import "./worldcup.css";

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
import a13 from "./assets/Incredibles.jpg";
import a14 from "./assets/CharlieAndTheChocolateFactory.jpg";
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
    { name: "인크레더블", src: a13 },
    { name: "찰리와 초콜릿 공장", src: a14 },
    { name: "니모를 찾아서", src: a15 },
    { name: "너의 이름은", src: a16 },
  ];

  const [game, setGame] = useState([]);
  const [round, setRound] = useState(0);
  const [nextGame, setNextGame] = useState([]);

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

  useEffect(() => {
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

  if (game.length === 1)
    return (
      <div className="wrapper">
        <div className="header_title">영화 월드컵 우승!</div>
        <div>
          <img src={game[0].src} className="movie_image" />
          <p className="movie_name">{game[0].name}</p>
        </div>
      </div>
    );

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
          src={game[round * 2].src}
          className="movie_image"
          onClick={() => {
            transformSelectImage(1);
            setTimeout(() => {
              setNextGame((prev) => prev.concat(game[round * 2]));
              setRound((r) => r + 1);
              returnImage(1);
            }, 3000);
          }}
        />
        <p className="movie_name">{game[round * 2].name}</p>
      </div>
      <div ref={nonSelectImage}>
        <img
          src={game[round * 2 + 1].src}
          className="movie_image"
          onClick={() => {
            transformSelectImage(2);
            setTimeout(() => {
              setNextGame((prev) => prev.concat(game[round * 2 + 1]));
              setRound((r) => r + 1);
              returnImage(2);
            }, 3000);
          }}
        />
        <p className="movie_name">{game[round * 2 + 1].name}</p>
      </div>
      <img src={versus} className="versus_image" ref={versusImage} />
    </div>
  );
}

export default Worldcup;
