/**
 * Created by Rogier on 27/06/2017.
 */
import each from 'bottom_line/collections/each';
import is   from 'bottom_line/lang/is';

import System      from '../systems/System';
import CellManager from './CellManager';
import EventQueue  from './EventQueue';
import Store       from './Store';

/**
 * Manages the systems. Providing enumeration as defined by order.
 */
export default class SystemManager
{
    public systems = [];
    public order: object;

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
    constructor(systems: object, order: object, cells: CellManager, store: Store, events: EventQueue)
    {
        this.order = order;

        each(order, (name: string, key: string) =>
        {
            if(is.nan(Number(key))) {return} // skip string keys

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
    public get(index: number): System
    {
        return this.systems[index]
    }

    /**
     * Generic iterator the returns a [index, system] pair.
     *
     * @returns Generic key, value IterableIterator
     *
     * @yields Array containing key & System [number, System].
     */
    public [Symbol.iterator](): IterableIterator<[number, System]>
    {
        return this.systems.entries()
    }

    /**
     * Generic iterator the returns a [index, system] pair.
     *
     * @returns Generic key, value IterableIterator
     *
     * @yields Array containing key & System [number, System].
     */
    public entries(): IterableIterator<[number, System]>
    {
        return this.systems.entries()
    }
}
