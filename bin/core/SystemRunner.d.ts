import CellManager from './CellManager';
import Store from './Store';
import SystemManager from './SystemManager';
/**
 * Runs each system in order over the appropriate cells.
 */
export default class SystemRunner {
    cells: CellManager;
    systems: SystemManager;
    store: Store;
    /**
     * Constructs a new SystemManager.
     *
     * @param systems - instanceof SystemManager.
     * @param cells   - instanceof CellManager.
     * @param store   - instanceof Store.
     *
     * @returns new SystemManager.
     */
    constructor(systems: SystemManager, cells: CellManager, store: Store);
    /**
     * Called on each tick. Updates all systems by running them over the appropriate instances based on a bitmask.
     *
     * @returns this for chaining.
     */
    update(): SystemRunner;
}
