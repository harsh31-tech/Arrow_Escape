export function canSlideOff(line, board, gridSize) {
  const { direction, row, col, length, id } = line;
  const others = board.filter((s) => s.id !== id);

  const occupied = (r, c) =>
    others.some((s) => {
      const isH = s.direction === 'left' || s.direction === 'right';
      if (isH) {
        return s.row === r && c >= s.col && c < s.col + s.length;
      } else {
        return s.col === c && r >= s.row && r < s.row + s.length;
      }
    });

  if (direction === 'right') {
    for (let c = col + length; c < gridSize; c++) if (occupied(row, c)) return false;
    return true;
  }
  if (direction === 'left') {
    for (let c = 0; c < col; c++) if (occupied(row, c)) return false;
    return true;
  }
  if (direction === 'down') {
    for (let r = row + length; r < gridSize; r++) if (occupied(r, col)) return false;
    return true;
  }
  if (direction === 'up') {
    for (let r = 0; r < row; r++) if (occupied(r, col)) return false;
    return true;
  }
  return false;
}