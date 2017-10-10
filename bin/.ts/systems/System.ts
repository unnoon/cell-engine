import each   from 'bottom_line/collections/each';
import find   from 'bottom_line/collections/find';
import BitSet from 'cell-bitset/BitSet';

export default class System
{
    public static cells: string[];

    public bitmask = new BitSet();
    public store;
    public events;
    public eid     = -1;

    constructor(cells, store, events)
    {
        const systemCells = this.constructor['cells']; // get the right static var.... TODO make a decorator for this

        this.store  = store;
        this.events = events;

        each(systemCells, (cell) => this.bitmask.set(cells.indexOf(cell)));
    }

    public getChildren(): number[]
    {
        return this.getCell('node').children;
    }

    public getChild(name: string, cell?: string): any
    {
        const eid = find(this.getChildren(), (child_eid) => this.store.get('node', child_eid).name === name);

        return cell
            ? this.store.get(cell, eid)
            : eid
    }

    public getCell(name: string): {[key: string]: any}
    {
        if(!~this.eid) {return}

        return this.store.get(name, this.eid)
    }
}
