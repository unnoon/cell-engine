/**
 * Created by Rogier on 27/06/2017.
 */

import * as PIXI from 'pixi.js';
import Stage from './Stage';

import is from 'bottom_line/lang/is';

/**
 * Application instance binding common functionality such as Ticker, Loader etc.
 */
export default class Application extends PIXI.Application
{
    public stage: Stage;

    /**
     * Creates a new instance of Application.
     *
     * @param options - Optional options such as width, height, backgroundColor, parent.
     *
     * @returns new Application
     */
    constructor(options?)
    {
        super(options);

        this.add2Parent(options.parent);

        // create the root of the scene graph
        this.stage = new Stage(this.view.width, this.view.height);
    }

    /**
     * Attaches the view to the HTMLElement matching the #id provided or the document.body otherwise.
     *
     * @param parent - A HTML element id.
     *
     * @returns this for chaining.
     */
    public add2Parent(parent?: string)
    {
        let target;

        if(is.string(parent))
        {
            target = document.getElementById(parent);
        }

        if(!target)
        {
            target = document.body;
        }

        target.appendChild(this.view);

        return this
    }
}
