import React, { Component } from "react";
import Card from "./Card";
import CatCard from "./CatCard";

export default class CardBlockShop extends Component {
  renderCards = (list, grid) => {
    return  list
        ? list.map((card, i) => <Card key={card._id} {...card} grid={grid} />)
        : null;
    };
    renderCatCards = (list, grid) => {
      return  list
          ? list.map((card, i) => <CatCard key={card._id} {...card} grid={grid} />)
          : null;
      };
  render() {
    const { list, grid,cat } = this.props;
    return (
      <div >
        <div>
          <div className="card_block_shop">
            {list ? (
              list.length === 0 ? (
                <div className="no_result">لايوجد نتائج</div>
              ) : null
            ) : null}
            {cat? this.renderCatCards(list, grid) :this.renderCards(list, grid)}
          </div>
        </div>
      </div>
    );
  }
}
