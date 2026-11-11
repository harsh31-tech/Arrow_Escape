export const LEVELS = [
  { id: 1,  size: 3, timeLimitSec: 60, hearts: 3 },
  { id: 2,  size: 3, timeLimitSec: 60, hearts: 3 },
  { id: 3,  size: 3, timeLimitSec: 50, hearts: 3 },
  { id: 4,  size: 4, timeLimitSec: 60, hearts: 3 },
  { id: 5,  size: 4, timeLimitSec: 55, hearts: 3 },
  { id: 6,  size: 4, timeLimitSec: 50, hearts: 2 },
  { id: 7,  size: 4, timeLimitSec: 50, hearts: 2 },
  { id: 8,  size: 5, timeLimitSec: 60, hearts: 3 },
  { id: 9,  size: 5, timeLimitSec: 55, hearts: 2 },
  { id: 10, size: 5, timeLimitSec: 50, hearts: 2 },
  { id: 11, size: 5, timeLimitSec: 45, hearts: 2 },
  { id: 12, size: 5, timeLimitSec: 45, hearts: 1 },
];

export const TOTAL_LEVELS = LEVELS.length;

const BAR_COLORS = ['#FF7A59', '#6C8AE4', '#7BC47F', '#F2B84B'];

export function getLevelSegments(levelId) {
  if (levelId === 1) {
    return [
      { id: '1a', direction: 'right', length: 2, row: 0, col: 0, color: BAR_COLORS[0] },
      { id: '1b', direction: 'left',  length: 1, row: 1, col: 2, color: BAR_COLORS[1] },
      { id: '1c', direction: 'down',  length: 2, row: 1, col: 0, color: BAR_COLORS[2] },
    ];
  }
  return [
    { id: `${levelId}a`, direction: 'right', length: 2, row: 0, col: 0, color: BAR_COLORS[0] },
    { id: `${levelId}b`, direction: 'left',  length: 1, row: 2, col: 2, color: BAR_COLORS[1] },
  ];
}