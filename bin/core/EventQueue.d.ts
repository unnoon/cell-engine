/**
 * Fake/Fast Event Queue implementation until I have time to create something better.
 */
export default class EventQueue {
    queue: Array<{
        event: string;
        sender: number;
    }>;
    /**
     * Pushes an event object {event: string, sender: number} on the queue.
     *
     * @param event - The event object to be pushed.
     *
     * @returns this for chaining.
     */
    push(event: {
        event: string;
        sender: number;
    }): this;
    /**
     * Clears the event queue.
     *
     * @returns this for chaining.
     */
    clear(): this;
    /**
     * Gets an event based on an event name.
     *
     * @param name - The name of the event to get.
     *
     * @returns The even object.
     */
    get(name: string): any;
}
