import BitSet from 'cell-bitset/BitSet';
export default class System {
    static cells: string[];
    bitmask: BitSet;
    store: any;
    events: any;
    eid: number;
    constructor(cells: any, store: any, events: any);
    getChildren(): number[];
    getChild(name: string, cell?: string): any;
    getCell(name: string): {
        [key: string]: any;
    };
}
