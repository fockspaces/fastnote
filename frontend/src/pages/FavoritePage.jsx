import "../styles/ListPage/listPage.scss";
import React from "react";
import ListContainer from "../components/ListPage/Document/ListContainer";
import Logo from "../components/Logo";

function FavoritePage() {
  return (
    <div className="list-page p-4 flex flex-col gap-4">
        <Logo />
      <ListContainer query={"is_favorite=true&is_trash=false"} />
    </div>
  );
}

export default FavoritePage;
