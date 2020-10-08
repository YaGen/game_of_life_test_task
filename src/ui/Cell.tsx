import * as React from "react";
import { CellState } from "~/utils/interfaces";

type Props = {
  state: CellState;
};

export const Cell: React.FC<Props> = ({ state }) => {
  return <div className={`cell cell__${state.toLowerCase()}`} />;
};
