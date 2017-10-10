/**
 * Created by Rogier on 27/06/2017.
 */
import { assign , clone, cloneDeep, concat, each, find, isArray, map, merge, pull, startsWith } from 'lodash';
import * as React from 'react';
import { DetailedReactHTMLElement, ReactHTMLElement, ReactNode } from 'react';

import is      from 'bottom_line/lang/is';
import rightOf from 'bottom_line/sequences/rightOf';

import CellManager from './CellManager';
import EventQueue  from './EventQueue';
import Store       from './Store';

// entity id
let eid = 0;

/**
 * Scene loader that loads an application based on a React scene.
 */
export default class SceneLoader
{
    public cells: CellManager;
    public components;
    public events;

    /**
     * Constructs a new SceneLoader.
     *
     * @param cells      - Instance of CellManager.
     * @param components - Object containing all React available scene components
     * @param events     - Instance of the EventQueue.
     *
     * @returns new SceneLoader.
     */
    constructor(cells: CellManager, components: object, events: EventQueue)
    {
        this.cells      = cells;
        this.components = components;
        this.events     = events;
    }

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
    public load(sceneNode: ReactHTMLElement<any>, parent: object, loader: PIXI.loaders.Loader, store: Store): SceneLoader
    {
        const reactScene  = this.loadNode(sceneNode);
        const renderScene = this.createSceneNode(reactScene, loader);

        store.init(reactScene as DetailedReactHTMLElement<any, any>);
        parent['addChild'](renderScene);

        return this
    }

    /**
     * Loads a react node. Compiling the scene using predefined components.
     *
     * @param node - React node to load. Can be a string in case of a text node.
     *
     * @returns The top node of the loaded scene.
     */
    private loadNode(node: ReactHTMLElement<any>|string): DetailedReactHTMLElement<any, any>|string
    {
        if(is.string(node)) {return node}

        const component = this.components[node.type];
        const nodeClone = this.setId(node);

        const mergedNode = component
            ? this.mergeNodes(React.cloneElement(component), nodeClone)
            : nodeClone;

        let children: Array<ReactHTMLElement<any>|string>;

        children = mergedNode.props.children || [];
        children = isArray(children) ? Array.from(children) : [children];
        children = map(children, (child) => this.loadNode(child));

        return React.cloneElement(mergedNode, mergedNode.props, children);
    }

    /**
     * Retrieves all cells from the React node properties object.
     *
     * @param properties - React node properties object.
     *
     * @returns Object containing all cells retrieved from the properties object.
     */
    private getCells(properties: {[key: string]: any}): object
    {
        const cells = {};

        each(properties, (data: object, cell: string) =>
        {
            cell = startsWith(cell, 'c-') ? rightOf(cell, 'c-') as string: '';

            if(!cell) {return;} // continue

            cells[cell] = assign(clone(this.cells.get(cell)), data);

            cells[cell].eid = properties.id;
        });

        return cells;
    }

    /**
     * Merges 2 react nodes.
     *
     * @param node1 - React node 1.
     * @param node2 - React node 2.
     *
     * @returns Merged node.
     */
    private mergeNodes(node1: DetailedReactHTMLElement<any, any>, node2: DetailedReactHTMLElement<any, any>): DetailedReactHTMLElement<any, any>
    {
        const mergedProps    = merge(cloneDeep(node1.props), node2.props);
        const mergedChildren = this.mergeChildren(node1.props.children, node2.props.children);

        return this.setId(React.cloneElement(node1, mergedProps, mergedChildren));
    }

    /**
     * Merges 2 nodes children' into 1 array.
     *
     * @param node1children - Children node 1.
     * @param node2children - Children node 2.
     *
     * @returns Merged array of children.
     */
    private mergeChildren(node1children: ReactNode[]|ReactNode = [], node2children: ReactNode[]|ReactNode = []): Array<DetailedReactHTMLElement<any, any>>
    {   // make stupid shit an array....
        const children1 = (isArray(node1children) ? Array.from(node1children) : [node1children]) as Array<DetailedReactHTMLElement<any, any>>;
        const children2 = (isArray(node2children) ? Array.from(node2children) : [node2children]) as Array<DetailedReactHTMLElement<any, any>>;

        const mergedChildren = [];

        each(children1, (child) =>
        {
            const match = child.props.name && find(children2, (pChild) => pChild.props.name && pChild.props.name === child.props.name);

            if(match)
            {
                mergedChildren.push(this.mergeNodes(child, match));
                pull(children2, match);
            }
            else
            {
                mergedChildren.push(this.setId(cloneDeep(child)));
            }
        });

        return concat(mergedChildren, children2);
    }

    /**
     * Sets a proper id/key onto an element.
     *
     * @param element - Element to set an id for.
     *
     * @returns Element clone with proper id
     */
    private setId(element: DetailedReactHTMLElement<any, any>): DetailedReactHTMLElement<any, any>
    {
        if(element.key !== null) {return element}

        const props = cloneDeep(element.props);

        props.id = props.key = props.hasOwnProperty('id') ? props.id : eid++;

        return React.cloneElement(element, props);
    }

    /**
     * Creates a view node from a React node.
     *
     * @param reactNode - The react node to create a view from.
     * @param loader    - Loader object to retrieve assets.
     *
     * @returns The constructed sceneNode.
     */
    private createSceneNode(reactNode: DetailedReactHTMLElement<any, any>|string, loader: PIXI.loaders.Loader): PIXI.DisplayObject
    {
        if(is.string(reactNode)) {return this.string2SceneNode(reactNode)}
        else                     {return this.reactNode2SceneNode(reactNode, loader)}
    }

    /**
     * Creates a view node from a React node.
     *
     * @param reactNode - The react node to create a view from.
     * @param loader    - Loader object to retrieve assets.
     *
     * @returns The constructed sceneNode.
     */
    private reactNode2SceneNode(reactNode: DetailedReactHTMLElement<any, any>, loader: PIXI.loaders.Loader): PIXI.DisplayObject
    {
        const properties                  = reactNode.props;
        const cells: {[key: string]: any} = this.getCells(properties);

        const on            = cells.on;
        const spriteData    = cells.sprite;
        const transformData = cells.transform;
        const sceneNode = spriteData
            ? PIXI.Sprite.fromImage(loader.resources[spriteData.texture].url)
            : new PIXI.Container();

        if(spriteData && sceneNode instanceof PIXI.Sprite)
        {
            sceneNode.anchor.x = spriteData.anchorX;
            sceneNode.anchor.y = spriteData.anchorY;
        }

        if(transformData)
        {
            sceneNode.x = transformData.x;
            sceneNode.y = transformData.y;
            sceneNode.rotation = transformData.rotation;
        }

        if(on)
        {
            sceneNode.interactive = true;
            sceneNode.buttonMode  = true;

            if(on.click)
            {
                sceneNode.on('click', () => this.events.push({event: on.click, sender: on.eid}))
            }
        }

        let children;

        children = properties.children || [];
        children = isArray(children) ? Array.from(children) : [children];

        Reflect.defineMetadata('link:structure-view', sceneNode, reactNode);

        each(children, (child) =>
        {
            sceneNode.addChild(this.createSceneNode(child, loader));
        });

        return sceneNode;
    }

    /**
     * Creates a text node from a string.
     *
     * @param text - Text string to convert to a node.
     *
     * @returns The text constructed text node.
     */
    private string2SceneNode(text: string): PIXI.Text
    {
        const defaultStyle = new PIXI.TextStyle({fontFamily: 'Arial', fontSize: 32});
        const sceneNode    = new PIXI.Text(text, defaultStyle);

        sceneNode.anchor.set(0.5);

        return sceneNode
    }
}
