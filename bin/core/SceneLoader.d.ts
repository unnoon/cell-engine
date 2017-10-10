import { ReactHTMLElement } from 'react';
import CellManager from './CellManager';
import EventQueue from './EventQueue';
import Store from './Store';
/**
 * Scene loader that loads an application based on a React scene.
 */
export default class SceneLoader {
    cells: CellManager;
    components: any;
    events: any;
    /**
     * Constructs a new SceneLoader.
     *
     * @param cells      - Instance of CellManager.
     * @param components - Object containing all React available scene components
     * @param events     - Instance of the EventQueue.
     *
     * @returns new SceneLoader.
     */
    constructor(cells: CellManager, components: object, events: EventQueue);
    /**
     * Loads a react node and all its children. Typically used to load a scene.
     *
     * @param sceneNode - React node to load.
     * @param parent    - Render node to attach the loaded node to.
     * @param loader    - Loader object to retrieve asset information.
     * @param store     - Store the register data elements.
     *
     * @returns this for chaining.
     */
    load(sceneNode: ReactHTMLElement<any>, parent: object, loader: PIXI.loaders.Loader, store: Store): SceneLoader;
    /**
     * Loads a react node. Compiling the scene using predefined components.
     *
     * @param node - React node to load. Can be a string in case of a text node.
     *
     * @returns The top node of the loaded scene.
     */
    private loadNode(node);
    /**
     * Retrieves all cells from the React node properties object.
     *
     * @param properties - React node properties object.
     *
     * @returns Object containing all cells retrieved from the properties object.
     */
    private getCells(properties);
    /**
     * Merges 2 react nodes.
     *
     * @param node1 - React node 1.
     * @param node2 - React node 2.
     *
     * @returns Merged node.
     */
    private mergeNodes(node1, node2);
    /**
     * Merges 2 nodes children' into 1 array.
     *
     * @param node1children - Children node 1.
     * @param node2children - Children node 2.
     *
     * @returns Merged array of children.
     */
    private mergeChildren(node1children?, node2children?);
    /**
     * Sets a proper id/key onto an element.
     *
     * @param element - Element to set an id for.
     *
     * @returns Element clone with proper id
     */
    private setId(element);
    /**
     * Creates a view node from a React node.
     *
     * @param reactNode - The react node to create a view from.
     * @param loader    - Loader object to retrieve assets.
     *
     * @returns The constructed sceneNode.
     */
    private createSceneNode(reactNode, loader);
    /**
     * Creates a view node from a React node.
     *
     * @param reactNode - The react node to create a view from.
     * @param loader    - Loader object to retrieve assets.
     *
     * @returns The constructed sceneNode.
     */
    private reactNode2SceneNode(reactNode, loader);
    /**
     * Creates a text node from a string.
     *
     * @param text - Text string to convert to a node.
     *
     * @returns The text constructed text node.
     */
    private string2SceneNode(text);
}
