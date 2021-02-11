import React from "react";
import Card from "./Card";
import CatCard from "./CatCard";

export default function CardBlock(props) {
  const renderCards = list =>
    list ? list.map((cardBlock, i) => <Card {...cardBlock} key={i} />) : null;
    const renderCatCards = list =>
    list ? list.map((cardBlock, i) => <CatCard {...cardBlock} key={i} />) : null;
  return (
    <div className="card_block">
      <div className="wrapper">
        {props.title ? <div className="title">{props.title}</div> : null}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent:'space-between'
          }}
        >
          {props.cat? renderCatCards(props.list):renderCards(props.list)}
        </div>
      </div>
    </div>
  );
}
