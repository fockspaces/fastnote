import '../../styles/IntroPage/section.scss'
import React, { useEffect, useState } from "react";
import Tiptap from "../EditPage/Editor/Tiptap";

const Section = () => {
  const initContent = localStorage.getItem("content") || "";
  const [content, setContent] = useState(initContent);

  useEffect(() => {
    localStorage.setItem("content", content);
  }, [content]);

  useEffect(() => {
    return () => {
      localStorage.setItem("content", content);
    };
  }, []);

  return (
    <div className="section-container">
      <section className="section" id="section--1">
        <div className="section__title">
          <h2 className="section__header">學經歷</h2>
        </div>
        <div class="operations">
          <div class="operations__tab-container">
            <button
              class="btn operations__tab operations__tab--1 operations__tab--active"
              data-tab="1"
            >
              <span>01</span>國立清華大學
            </button>
            <button class="btn operations__tab operations__tab--2" data-tab="2">
              <span>02</span>北京大學
            </button>
            <button class="btn operations__tab operations__tab--3" data-tab="3">
              <span>03</span>均豪精密
            </button>
          </div>
          <div class="operations__content operations__content--1 operations__content--active">
            <div class="operations__icon operations__icon--1"></div>
            <h5 class="operations__header">National Tsing Hua university</h5>
            <p style={{ fontSize: "12px" }}>
              Bachelor - Power Mechanical Engineering / Electrical Engineering •
              Sep 2017 - Present
            </p>
            <p>雙專長電機系，主要以電路控制、IC設計為研究方向</p>
          </div>

          <div class="operations__content operations__content--2">
            <div class="operations__icon operations__icon--2"></div>
            <h5 class="operations__header">Peking University</h5>
            <p style={{ fontSize: "12px" }}>
              Exchange Student - School of Electronics Engineering & Computer
              Science • Sep 2021 - Jan 2022
            </p>
            <p>
              1. 機器學習 : 使用Scikit-Learn分析 RF, XGBoost, KNN,
              LR模型在心臟疾病預測的表現，平均準確率達86%。
              <br />
              2. 資料結構 : C++實作Graph, Hash Set,
              Heap等資料結構；應用並查集、樹狀數組、Trie架構提升演算效率。
              <br />
              3. 演算法 : C實作Depth First
              Search(DFS)結合動態規劃，完成地圖路徑搜尋專案。
            </p>
          </div>
          <div class="operations__content operations__content--3">
            <div class="operations__icon operations__icon--3"></div>
            <h5 class="operations__header">
              智慧系統研發 實習生 GPM-IS Internship
            </h5>
            <p style={{ fontSize: "12px" }}>
              Gallant Precision Machining Co. Ltd • Apr 2018 - Jan 2020
            </p>
            <p>
              1. C# : 基於 Math.NET, ScottPlot
              等套件開發自動頻譜轉換程式。以Windows
              Form顯示即時更新數據、調整介面。 <br />
              2. SQL & Visualization :
              以System.Thead控制SQL資料庫推送，並回傳馬達震動數據做即時運算，視覺化頻譜圖。
              <br />
              3. Git :
              版本控制開發專案，篩選異常資料點，維護並分析健康診斷訓練模型。
            </p>
          </div>
        </div>{" "}
      </section>
      <section className="section" id="section--2">
        <div className="section__title section__title--testimonials">
          <h2 className="section__header">Academic Experience</h2>
        </div>
        {/* ... */}
      </section>
      <section className="try-it" id="try-it">
        <h2>Try It Now</h2>
        <Tiptap note={{ content }} setContent={setContent} />
      </section>
    </div>
  );
};

export default Section;
