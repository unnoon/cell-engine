/**
 * Created by Rogier on 27/06/2017.
 */
import each                           from 'bottom_line/collections/each';
import reduce                         from 'bottom_line/collections/reduce';
import is                             from 'bottom_line/lang/is';
import rightOf                        from 'bottom_line/sequences/rightOf';
import BitSet                         from 'cell-bitset';
import { assign , clone, startsWith } from 'lodash';
import { DetailedReactHTMLElement }   from 'react';
import CellManager                    from './CellManager';

/**
 * Cache friendly store implementation that stores data in cell arrays where each index corresponds to an entity.
 */
export default class Store
{
    public bitmasks: BitSet[]       = [];
    public views                    = [];
    public matrix_cells: object[][] = [];
    public cells: CellManager;

    /**
     * Creates a new instance of Store.
     *
     * @param cells - Instance of CellManager.
     *
     * @returns new Store.
     */
    constructor(cells: CellManager)
    {
        this.cells = cells;

        each(this.cells, (cell, index) => this.matrix_cells[index] = [])
    }

    /**
     * Initializes the store based on a react scene.
     *
     * @param node - The react scene root node.
     *
     * @returns this for chaining.
     */
    public init(node: DetailedReactHTMLElement<any, any>): Store
    {
        const properties = node.props;
        const eid        = properties.id;

        const data_node =
        {
            eid,
            type : node.type,
            name : properties.name,
            children: reduce(properties.children, (acc, child) => {if(is.not.string(child)) {acc.push(child.props.id)} return acc}, []),
        };

        this.bitmasks[eid] = BitSet.create();
        this.views[eid]    = Reflect.getMetadata('link:structure-view', node); // link view hacky

        this.add('node', eid, data_node);
        this.add('transform', eid);

        each(properties, (data: object, name_cell: string) =>
        {
            name_cell = startsWith(name_cell, 'c-') ? rightOf(name_cell, 'c-') as string : '';

            if(!name_cell) {return} // continue

            this.add(name_cell, eid, data);
        });

        each(properties.children, (child) =>
        {
            if(is.string(child)) {return}

            this.init(child);
        });

        return this
    }

    /**
     * Gets a cell based on a cell name & entity id.
     *
     * @param cell - Name of the cell to get.
     * @param eid  - Entity id to get the cell for.
     *
     * @returns The cell object.
     */
    public get(cell: string, eid: number): object
    {
        return this.matrix_cells[this.cells.indexOf(cell)][eid]
    }

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
    public add(name_cell: string, eid: number, data: object = {}): Store
    {
        const cid = this.cells.indexOf(name_cell);

        this.bitmasks[eid].set(cid);

        const cell = assign(clone(this.cells.get(name_cell)), data);

        cell.eid = eid;

        this.matrix_cells[cid][eid] = cell;

        return this
    }

    /**
     * Removes a cell for a specific entity(id).
     *
     * @param name_cell - Name of the cell to remove.
     * @param eid       - Entity id of which the cell needs to be removed.
     *
     * @returns this for chaining.
     */
    public remove(name_cell: string, eid: number): Store
    {
        const cid = this.cells.indexOf(name_cell);

        this.bitmasks[eid].set(cid, 0);

        this.matrix_cells[cid][eid] = null;

        return this
    }
}
