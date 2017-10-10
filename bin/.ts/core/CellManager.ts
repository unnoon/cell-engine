/**
 * Created by Rogier on 27/06/2017.
 */
import each from 'bottom_line/collections/each';
import is   from 'bottom_line/lang/is'

/**
 * Cell manager that keeps track of all registered cells.
 */
export default class CellManager
{
    public cells = [];
    public order: object;

    /**
     * Constructs a new CellManager
     *
     * @param cells - Object containing all available cells
     * @param order - The Cell order. Which should represent the most cache friendly configuration.
     *
     * @returns new CellManager
     */
    constructor(cells: object, order: object)
    {
        this.order = order;

        each(order, (name, key) =>
        {
            if(is.nan(Number(key))) {return} // skip string keys

            this.cells[Number(key)] = cells[name];
        });
    }

    /**
     * Returns the index of a cell as defined by order.
     *
     * @param cell - The cell name to get the index from.
     *
     * @returns The index of the cell or -1 otherwise.
     */
    public indexOf(cell: string): number
    {
        const index = this.order[cell];

        return is.undefined(index) ? -1 : index
    }

    /**
     * Gets a cell based on name or index.
     *
     * @param {number | string} index_name - Index or name of the cell that needs to be retrieved.
     *
     * @returns {object}
     */
    public get(index_name: number|string)
    {
        return this.cells[is.string(index_name) ? this.order[index_name] : index_name]
    }

    /**
     * Generic iterator the returns a [name, cell] pair.
     *
     * @returns Generic key, value IterableIterator
     *
     * @yields Array containing key & cell [number, object].
     */
    public [Symbol.iterator](): IterableIterator<[number, object]>
    {
        return this.cells.entries()
    }

    /**
     * Generic iterator the returns a [name, cell] pair.
     *
     * @returns Generic key, value IterableIterator
     *
     * @yields Array containing key & cell [number, object].
     */
    public entries(): IterableIterator<[number, object]>
    {
        return this.cells.entries()
    }
}
