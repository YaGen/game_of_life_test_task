import { CellState } from "./interfaces";

export const parseFieldText = (
  value: string
): {
  error: boolean;
  field: CellState[][] | null;
} => {
  try {
    const firstLine = value.split("\n")[0];
    const firstLineRegexp = /(\+?\d+)\s(\+?\d+)/i;

    const flMatch = firstLine.match(firstLineRegexp);
    if (!flMatch) {
      return { error: true, field: null };
    }

    const height = +flMatch[1];
    const width = +flMatch[2];

    const textField = value.split("\n").slice(1).join("").trim();
    if (textField.length !== height * width) {
      return { error: true, field: null };
    }

    const fieldRegexp = /^[\.\*]+$/gm;
    if (!fieldRegexp.test(textField)) {
      return { error: true, field: null };
    }

    let field: CellState[][] = [];
    textField.split("").forEach((cell: string, idx) => {
      const cellState = cell === "." ? CellState.Dead : CellState.Live;
      if (idx % width === 0) {
        field.push([cellState]);
      } else {
        field[field.length - 1].push(cellState);
      }
    });

    return {
      field,
      error: false,
    };
  } catch (e) {
    return { error: true, field: null };
  }
};

const getNewCellState = (
  cell: CellState,
  rowIdx: number,
  cellIdx: number,
  initialArray: CellState[][]
): CellState => {
  let amountOfLiveNeighbours = 0;
  let rowLength = initialArray[0].length;

  for (
    let i = rowIdx !== 0 ? rowIdx - 1 : rowIdx;
    i <= (rowIdx !== initialArray.length - 1 ? rowIdx + 1 : rowIdx);
    i++
  ) {
    for (
      let j = cellIdx !== 0 ? cellIdx - 1 : cellIdx;
      j <= (cellIdx !== rowLength - 1 ? cellIdx + 1 : cellIdx);
      j++
    ) {
      if (i === rowIdx && j === cellIdx) {
      } else {
        if (initialArray[i][j] === CellState.Live) {
          amountOfLiveNeighbours++;
        }
      }
    }
  }

  if (amountOfLiveNeighbours < 2 && cell === CellState.Live) {
    return CellState.Dead;
  }

  if (amountOfLiveNeighbours > 3 && cell === CellState.Live) {
    return CellState.Dead;
  }

  if (amountOfLiveNeighbours === 3 && cell === CellState.Dead) {
    return CellState.Live;
  }

  return cell;
};

export const getNextGeneration = (field: CellState[][]): CellState[][] => {
  return field.map((row, rowIdx, initialArray) =>
    row.map((cell, cellIdx) =>
      getNewCellState(cell, rowIdx, cellIdx, initialArray)
    )
  );
};

export async function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
