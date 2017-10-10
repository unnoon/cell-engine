import System from '../systems/System';
import CellManager from './CellManager';
import EventQueue from './EventQueue';
import Store from './Store';
/**
 * Manages the systems. Providing enumeration as defined by order.
 */
export default class SystemManager {
    systems: any[];
    order: object;
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
    constructor(systems: object, order: object, cells: CellManager, store: Store, events: EventQueue);
    /**
     * Gets a system based on it's name.
     *
     * @param index - The name of the system to retrieve.
     *
     * @returns The System.
     */
    get(index: number): System;
    /**
     * Generic iterator the returns a [index, system] pair.
     *
     * @returns Generic key, value IterableIterator
     *
     * @yields Array containing key & System [number, System].
     */
    [Symbol.iterator](): IterableIterator<[number, System]>;
    /**
     * Generic iterator the returns a [index, system] pair.
     *
     * @returns Generic key, value IterableIterator
     *
     * @yields Array containing key & System [number, System].
     */
    entries(): IterableIterator<[number, System]>;
}
