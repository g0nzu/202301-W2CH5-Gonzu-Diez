import { toCountNeighbors } from './gameOfLife';
import { applyRules } from './gameOfLife';

describe('Given toCountNeighbors or applyRules functions', () => {
  describe('When we have alive cells', () => {
    test('Then counts number of live neighbors correctly', () => {
      const cells = [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0],
      ];

      const count = toCountNeighbors(cells, 1, 1);

      expect(count).toBe(5);
    });
  });
  describe('When we have no alive cells', () => {
    test('Then we got 0 cells alive', () => {
      const cells = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];

      const count = toCountNeighbors(cells, 1, 1);

      expect(count).toBe(0);
    });
  });
  describe('When we have alive cells', () => {
    test('applyRules should run without errors', () => {
      const cells = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ];

      expect(() => {
        applyRules(cells);
      }).not.toThrow();
    });
  });
  describe('applyRules', () => {
    test('Debería devolver un resultado correcto', () => {
      const cells = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ];

      const newCells = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];

      expect(applyRules(cells)).toEqual(newCells);
    });
  });
});
