import * as React from "react";
import Field from "./Field";

import "./App.css";
import Button from "./Button";
import { CellState } from "~/utils/interfaces";
import html2canvas from "html2canvas";
import { getNextGeneration, parseFieldText, wait } from "~/utils/utils";
import InputFieldBlock from "./InputFieldBlock";

export interface AppProps {}

export const App: React.FC<AppProps> = () => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);
  const [grid, setGrid] = React.useState<CellState[][] | null>(null);
  const [generation, setGeneration] = React.useState<number>(1);

  const fieldRef = React.useRef<HTMLDivElement>(null);
  const scrollableContainerRef = React.useRef<HTMLDivElement>(null);

  const firstUpdate = React.useRef(true);

  React.useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (!inputValue) {
      setError(false);
    } else {
      let { error } = parseFieldText(inputValue);
      setError(error);
    }
  }, [inputValue]);

  return (
    <div className="app-container">
      <h1>Game of life</h1>
      <InputFieldBlock
        value={inputValue}
        onValueChange={setInputValue}
        error={error}
      />
      <Button
        label="Generate from input"
        onClick={() => {
          if (scrollableContainerRef && scrollableContainerRef.current) {
            scrollableContainerRef.current.innerHTML = "";
          }
          setGeneration(1);
          const { error, field } = parseFieldText(inputValue);
          setError(error);
          setGrid(field);
        }}
      />
      {grid && (
        <>
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <Field field={grid} generation={generation} ref={fieldRef} />
            <div
              className="scrollable-container"
              ref={scrollableContainerRef}
            ></div>
          </div>
          <Button
            label="Generate from previous result"
            onClick={async () => {
              if (fieldRef && fieldRef.current) {
                const res = await html2canvas(fieldRef.current);
                if (scrollableContainerRef && scrollableContainerRef.current) {
                  scrollableContainerRef.current.prepend(res);
                  scrollableContainerRef.current.scroll(0, 0);
                }
              }

              // make sure that background color transition is finished
              await wait(100);

              setGeneration(generation + 1);
              setGrid(getNextGeneration(grid));
            }}
          />
        </>
      )}
    </div>
  );
};
