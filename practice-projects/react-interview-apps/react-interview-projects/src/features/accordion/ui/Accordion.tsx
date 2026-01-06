"use client";

import { useState } from "react";
import styles from "./accordion.module.scss";
import { ACCORDION_DATA } from "../model/mock-data";

export default function Accordion() {
  const [isMulti, setIsMulti] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);

  function handleItemClick(id: number): void {
    if (isMulti) {
      console.log("Handling multi click");

      const exists = selected.filter((item) => item === id);
      if (exists) {
        setSelected((prevItems) => prevItems.filter((item) => item !== id));
      } else {
        setSelected((prevItems) => [...prevItems, id]);
      }
    } else {
      console.log("Handling single click");
      console.log("selected before", selected);
      if (selected.length) {
        const newSelected = selected;
        newSelected.pop();
        console.log(
          "handling the case when the item is already in the array / selected after popping",
          newSelected
        );
        setSelected(newSelected);
      } else {
        setSelected((prevItems) => [...prevItems, id]);
      }
    }
  }

  function handleMultiClick() {
    setSelected([]);
    setIsMulti((prev) => !prev);
  }

  return (
    <div className={styles.accordionContainer}>
      <button onClick={() => handleMultiClick()} className={styles.enableMulti}>
        Enable multiselection
      </button>
      <div>
        {ACCORDION_DATA.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={styles.accordionItem}
          >
            <h3 className={`${styles.accordionHeader}`}>{item.title}</h3>
            <p
              className={`${styles.accordionDesc} ${
                selected.includes(item.id) ? styles.open : ""
              }`}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
