import System from './System';
export default class Renderer extends System {
    /**
     * The cell combination to act on.
     */
    static cells: string[];
    /**
     * Is ran each tick for every entity that matches the cell mask
     *
     * @param transform - Transform cell. Each update call the next matching entity transform is injected.
     */
    update(transform: any): void;
}
