/**
 * Cell manager that keeps track of all registered cells.
 */
export default class CellManager {
    cells: any[];
    order: object;
    /**
     * Constructs a new CellManager
     *
     * @param cells - Object containing all available cells
     * @param order - The Cell order. Which should represent the most cache friendly configuration.
     *
     * @returns new CellManager
     */
    constructor(cells: object, order: object);
    /**
     * Returns the index of a cell as defined by order.
     *
     * @param cell - The cell name to get the index from.
     *
     * @returns The index of the cell or -1 otherwise.
     */
    indexOf(cell: string): number;
    /**
     * Gets a cell based on name or index.
     *
     * @param {number | string} index_name - Index or name of the cell that needs to be retrieved.
     *
     * @returns {object}
     */
    get(index_name: number | string): any;
    /**
     * Generic iterator the returns a [name, cell] pair.
     *
     * @returns Generic key, value IterableIterator
     *
     * @yields Array containing key & cell [number, object].
     */
    [Symbol.iterator](): IterableIterator<[number, object]>;
    /**
     * Generic iterator the returns a [name, cell] pair.
     *
     * @returns Generic key, value IterableIterator
     *
     * @yields Array containing key & cell [number, object].
     */
    entries(): IterableIterator<[number, object]>;
}
