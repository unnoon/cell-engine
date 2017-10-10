/**
 * Created by Rogier on 27/06/2017.
 */
import * as PIXI from 'pixi.js';

/**
 * Stage wrapper class.
 */
export default class Stage extends PIXI.Container
{
    /**
     * Constructs a new stage.
     *
     * @param width  - The width of the stage.
     * @param height - The height of the stage.
     *
     * @returns new Stage
     */
    constructor(width: number, height: number)
    {
        super();

        this.width  = width;
        this.height = height;

        this.x = width / 2;
        this.y = height / 2;
    }
}
