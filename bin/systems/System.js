import each from 'bottom_line/collections/each';
import find from 'bottom_line/collections/find';
import BitSet from 'cell-bitset/BitSet';
export default class System {
    constructor(cells, store, events) {
        this.bitmask = new BitSet();
        this.eid = -1;
        const systemCells = this.constructor['cells']; // get the right static var.... TODO make a decorator for this
        this.store = store;
        this.events = events;
        each(systemCells, (cell) => this.bitmask.set(cells.indexOf(cell)));
    }
    getChildren() {
        return this.getCell('node').children;
    }
    getChild(name, cell) {
        const eid = find(this.getChildren(), (child_eid) => this.store.get('node', child_eid).name === name);
        return cell
            ? this.store.get(cell, eid)
            : eid;
    }
    getCell(name) {
        if (!~this.eid) {
            return;
        }
        return this.store.get(name, this.eid);
    }
}
//# sourceMappingURL=System.js.map