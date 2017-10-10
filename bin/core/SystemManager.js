/**
 * Created by Rogier on 27/06/2017.
 */
import each from 'bottom_line/collections/each';
import is from 'bottom_line/lang/is';
/**
 * Manages the systems. Providing enumeration as defined by order.
 */
export default class SystemManager {
    /**
     * Constructs a new SystemManager
     *
     * @param systems    - Object containing all System classes.
     * @param order      - Enum containing the order of execution of the systems.
     * @param cells      - instanceof CellManager.
     * @param store      - instanceof Store.
     * @param events     - instanceof EventQueue.
     *
     * @returns new SystemManager
     */
    constructor(systems, order, cells, store, events) {
        this.systems = [];
        this.order = order;
        each(order, (name, key) => {
            if (is.nan(Number(key))) {
                return;
            } // skip string keys
            this.systems[Number(key)] = new systems[name](cells, store, events);
        });
    }
    /**
     * Gets a system based on it's name.
     *
     * @param index - The name of the system to retrieve.
     *
     * @returns The System.
     */
    get(index) {
        return this.systems[index];
    }
    /**
     * Generic iterator the returns a [index, system] pair.
     *
     * @returns Generic key, value IterableIterator
     *
     * @yields Array containing key & System [number, System].
     */
    [Symbol.iterator]() {
        return this.systems.entries();
    }
    /**
     * Generic iterator the returns a [index, system] pair.
     *
     * @returns Generic key, value IterableIterator
     *
     * @yields Array containing key & System [number, System].
     */
    entries() {
        return this.systems.entries();
    }
}
//# sourceMappingURL=SystemManager.js.map