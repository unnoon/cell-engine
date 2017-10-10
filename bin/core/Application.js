/**
 * Created by Rogier on 27/06/2017.
 */
import * as PIXI from 'pixi.js';
import Stage from './Stage';
/**
 * Application instance binding common functionality such as Ticker, Loader etc.
 */
export default class Application extends PIXI.Application {
    /**
     * Creates a new instance of Application.
     *
     * @param width   - Width of the stage.
     * @param height  - Height of the stage.
     * @param options - Optional options such as backgroundColor.
     *
     * @returns new Application
     */
    constructor(width, height, options) {
        super(width, height, options);
        document.body.appendChild(this.view);
        // create the root of the scene graph
        this.stage = new Stage(width, height);
    }
}
//# sourceMappingURL=Application.js.map