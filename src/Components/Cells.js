import "./Cells.css";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";

function Cells() {
  const [isCellEmpty, setIsCellEmpty] = useState(true);
  const [bugInfo, setBugInfo] = useState({});
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    let rndInt = Math.floor(Math.random() * 80) + 1;

    fetch("https://acnhapi.com/v1/bugs/" + rndInt)
      .then((response) => response.json())
      .then((data) => {
        if (isCellEmpty) {
          setBugInfo({
            name: data["name"]["name-USen"],
            image: data["icon_uri"],
            rarity: data["availability"]["rarity"],
            monthsAvail: data["availability"]["month-northern"],
            price: data["price"],
          });
          setIsCellEmpty(false);
        }
      });
    //console.log(bugInfo.image);
  }, []);

  function handleDelete(e) {
    setBugInfo({});
    setIsCellEmpty(true);
    //console.log(e);
  }

  function handleSwap() {
    handleDelete();
    fetch("https://acnhapi.com/v1/bugs/" + inputText)
      .then((response) => response.json())
      .then((data) => {
        setBugInfo({
          name: data["name"]["name-USen"],
          image: data["icon_uri"],
          rarity: data["availability"]["rarity"],
          monthsAvail: data["availability"]["month-northern"],
          price: data["price"],
        });
        setIsCellEmpty(true);
      });
  }

  function handleChange(e) {
    setInputText(e.target.value);
    console.log(inputText);
  }

  return (
    <div className="cellsLayout">
      <h2>{bugInfo.name}</h2>
      <img src={bugInfo.image} />
      <h4>{bugInfo.rarity}</h4>
      <h4>Months availible: {bugInfo.monthsAvail}</h4>
      <h4>Selling price: ${bugInfo.price}</h4>
      <div>
        <Button
          className={isCellEmpty ? "addButton" : "swapButton"}
          onClick={handleSwap}
        >
          {isCellEmpty ? "Add" : "Swap"}
        </Button>
        <Input
          type="text"
          placeholder="Bug name/number"
          onChange={handleChange}
        ></Input>
        <Button className="deleteButton" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default Cells;
