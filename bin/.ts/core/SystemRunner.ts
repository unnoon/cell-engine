import each   from 'bottom_line/collections/each';
import reduce from 'bottom_line/collections/reduce';

import CellManager   from './CellManager';
import Store         from './Store';
import SystemManager from './SystemManager';

/**
 * Runs each system in order over the appropriate cells.
 */
export default class SystemRunner
{
    public cells: CellManager;
    public systems: SystemManager;
    public store: Store;

    /**
     * Constructs a new SystemManager.
     *
     * @param systems - instanceof SystemManager.
     * @param cells   - instanceof CellManager.
     * @param store   - instanceof Store.
     *
     * @returns new SystemManager.
     */
    constructor(systems: SystemManager, cells: CellManager, store: Store)
    {
        this.systems = systems;
        this.cells   = cells;
        this.store   = store;
    }

    /**
     * Called on each tick. Updates all systems by running them over the appropriate instances based on a bitmask.
     *
     * @returns this for chaining.
     */
    public update(): SystemRunner
    {
        const entityMasks = this.store.bitmasks;

        each(this.systems, (system) =>
        {
            const systemMask  = system.bitmask;

            each(entityMasks, (entityMask, eid) =>
            {
                if(entityMask.fits(systemMask))
                {
                    // construct args
                    const args = reduce(system.constructor['cells'], (acc, component) =>
                    {
                        return acc.push(this.store.matrix_cells[this.cells.indexOf(component)][eid]), acc;
                    }, []);

                    system.eid = eid;

                    system.update(...args);
                }
            });
        });

        return this
    }
}
