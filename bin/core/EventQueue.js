/**
 * Created by Rogier on 27/06/2017.
 */
import find from 'bottom_line/collections/find';
/**
 * Fake/Fast Event Queue implementation until I have time to create something better.
 */
export default class EventQueue {
    constructor() {
        this.queue = [];
    }
    /**
     * Pushes an event object {event: string, sender: number} on the queue.
     *
     * @param event - The event object to be pushed.
     *
     * @returns this for chaining.
     */
    push(event) {
        this.queue.push(event);
        return this;
    }
    /**
     * Clears the event queue.
     *
     * @returns this for chaining.
     */
    clear() {
        this.queue = [];
        return this;
    }
    /**
     * Gets an event based on an event name.
     *
     * @param name - The name of the event to get.
     *
     * @returns The even object.
     */
    get(name) {
        return find(this.queue, (eventObj) => eventObj.event === name);
    }
}
//# sourceMappingURL=EventQueue.js.map