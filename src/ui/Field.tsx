import * as React from "react";
import { GAME_FIELD_SIZE } from "~/utils/constants";
import { CellState } from "~/utils/interfaces";
import { Cell } from "./Cell";

export interface FieldProps {
  field: CellState[][] | null;
  generation: number;
}

const Field: React.ForwardRefRenderFunction<HTMLDivElement, FieldProps> = (
  { field, generation },
  ref: React.Ref<HTMLDivElement>
) => {
  if (!field) {
    return null;
  }
  const rowHeight = GAME_FIELD_SIZE / field[0].length;
  return (
    <div>
      <div
        id="snapshot-container"
        ref={ref}
        style={{ minWidth: GAME_FIELD_SIZE, width: GAME_FIELD_SIZE }}
      >
        <h2>Generation {generation}</h2>
        <div
          className="game-field"
          style={{ height: `calc(${rowHeight * field.length}px)` }}
        >
          {field.map((row: CellState[], rowIdx) => {
            return (
              <div className="row" key={rowIdx}>
                {row.map((cell: CellState, cellIdx) => {
                  return <Cell state={cell} key={`${rowIdx}_${cellIdx}`} />;
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(Field);
