import System from './System';

export default class Renderer extends System
{
    /**
     * The cell combination to act on.
     */
    public static cells = ['transform'];

    /**
     * Is ran each tick for every entity that matches the cell mask
     *
     * @param transform - Transform cell. Each update call the next matching entity transform is injected.
     */
    public update(transform)
    {
        const view = this.store.views[this.eid];

        view.x        = transform.x;
        view.y        = transform.y;
        view.rotation = transform.rotation;
        view.scale.x  = transform.scaleX;
        view.scale.y  = transform.scaleY;

        const sprite = this.getCell('sprite');

        if(!sprite) {return}

        view.anchor.x = sprite.anchorX;
        view.anchor.y = sprite.anchorY;
    }
}
