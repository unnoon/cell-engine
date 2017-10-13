/**
 * Created by Rogier on 27/06/2017.
 */
import * as PIXI from 'pixi.js';
import Stage from './Stage';
/**
 * Application instance binding common functionality such as Ticker, Loader etc.
 */
export default class Application extends PIXI.Application {
    stage: Stage;
    /**
     * Creates a new instance of Application.
     *
     * @param options - Optional options such as width, height, backgroundColor, parent.
     *
     * @returns new Application
     */
    constructor(options?: any);
    /**
     * Attaches the view to the HTMLElement matching the #id provided or the document.body otherwise.
     *
     * @param parent - A HTML element id.
     *
     * @returns this for chaining.
     */
    add2Parent(parent?: string): this;
}
