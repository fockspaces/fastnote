import "../../styles/IntroPage/header.scss";
import React from "react";

const Header = () => {
  return (
    <header className="header" id="headq">
      <div className="header__title">
        <h1>張峰銘</h1>
        <h2>
          <span className="highlight">Chang Feng Ming </span>
        </h2>
        <p>
          大學期間，我同時修習動力機械與電機工程系。控制系統、IC晶片設計、計算機架構都是
          我所擅長的領域。
          大五到北京大學交換一學期，修讀資訊工程系，接觸了演算法以及機器學習相關課程，發
          現自己對於雲端運算、物聯網應用方面更感興趣，決定朝該領域深入研究。
        </p>
        <button className="btn--text btn--scroll-to">
          Learn more &DownArrow;
        </button>
        <img
          src="img/Me.jpg"
          className="header__img"
          alt="Minimalist bank items"
        />
      </div>
    </header>
  );
};

export default Header;
