import each from 'bottom_line/collections/each';
import reduce from 'bottom_line/collections/reduce';
/**
 * Runs each system in order over the appropriate cells.
 */
export default class SystemRunner {
    /**
     * Constructs a new SystemManager.
     *
     * @param systems - instanceof SystemManager.
     * @param cells   - instanceof CellManager.
     * @param store   - instanceof Store.
     *
     * @returns new SystemManager.
     */
    constructor(systems, cells, store) {
        this.systems = systems;
        this.cells = cells;
        this.store = store;
    }
    /**
     * Called on each tick. Updates all systems by running them over the appropriate instances based on a bitmask.
     *
     * @returns this for chaining.
     */
    update() {
        const entityMasks = this.store.bitmasks;
        each(this.systems, (system) => {
            const systemMask = system.bitmask;
            each(entityMasks, (entityMask, eid) => {
                if (entityMask.fits(systemMask)) {
                    // construct args
                    const args = reduce(system.constructor['cells'], (acc, component) => {
                        return acc.push(this.store.matrix_cells[this.cells.indexOf(component)][eid]), acc;
                    }, []);
                    system.eid = eid;
                    system.update(...args);
                }
            });
        });
        return this;
    }
}
//# sourceMappingURL=SystemRunner.js.map