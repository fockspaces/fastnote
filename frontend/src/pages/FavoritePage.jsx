import "../styles/ListPage/listPage.scss";
import React from "react";
import ListContainer from "../components/ListPage/Document/ListContainer";

function FavoritePage() {
  return (
    <div className="list-page p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">FavoritePage</h1>
      <ListContainer query={"is_favorite=true&is_trash=false"} />
    </div>
  );
}

export default FavoritePage;
