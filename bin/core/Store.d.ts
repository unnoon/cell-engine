import BitSet from 'cell-bitset';
import { DetailedReactHTMLElement } from 'react';
import CellManager from './CellManager';
/**
 * Cache friendly store implementation that stores data in cell arrays where each index corresponds to an entity.
 */
export default class Store {
    bitmasks: BitSet[];
    views: any[];
    matrix_cells: object[][];
    cells: CellManager;
    /**
     * Creates a new instance of Store.
     *
     * @param cells - Instance of CellManager.
     *
     * @returns new Store.
     */
    constructor(cells: CellManager);
    /**
     * Initializes the store based on a react scene.
     *
     * @param node - The react scene root node.
     *
     * @returns this for chaining.
     */
    init(node: DetailedReactHTMLElement<any, any>): Store;
    /**
     * Gets a cell based on a cell name & entity id.
     *
     * @param cell - Name of the cell to get.
     * @param eid  - Entity id to get the cell for.
     *
     * @returns The cell object.
     */
    get(cell: string, eid: number): object;
    /**
     * Adds a cell for a specific entity(id).
     * Additionally specific settings can be supplied to be assigned to the cell.
     *
     * @param name_cell - Name of the cell to add.
     * @param eid       - Entity id to add the cell to.
     * @param data      - Data object with entity specific cell settings.
     *
     * @returns this for chaining.
     */
    add(name_cell: string, eid: number, data?: object): Store;
    /**
     * Removes a cell for a specific entity(id).
     *
     * @param name_cell - Name of the cell to remove.
     * @param eid       - Entity id of which the cell needs to be removed.
     *
     * @returns this for chaining.
     */
    remove(name_cell: string, eid: number): Store;
}
