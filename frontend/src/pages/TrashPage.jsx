import "../styles/ListPage/listPage.scss";
import React from "react";
import ListContainer from "../components/ListPage/Document/ListContainer";

function TrashPage() {
  return (
    <div className="list-page p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">TrashPage</h1>
      <ListContainer query={"is_trash=true"} is_trash={true} />
    </div>
  );
}

export default TrashPage;
