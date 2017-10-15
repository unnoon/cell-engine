<img src="https://github.com/unnoon/cell-engine/raw/master/rsc/img/CELL-ENGINE.png" width="250" height="267" />

[![Build Status](https://travis-ci.org/unnoon/cell-engine.svg?branch=dev)](https://travis-ci.org/unnoon/cell-engine?branch=dev)
[![Inline docs](http://inch-ci.org/github/unnoon/cell-engine.svg?branch=dev)](http://inch-ci.org/github/unnoon/cell-engine?branch=dev)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

Data-driven ECS (Entity Component System) game/application engine.

## NOTE

Very alpha. Although basic functionality is there, it's currently lacking lots of features (such as a good event system :). 

## Installation

[npm](https://www.npmjs.com)

`npm install cell-engine`

## Demo

<img src="https://github.com/unnoon/cell-demos/raw/master/demos/clockclock/rsc/img/clockclock.jpg" width="500" height="252" />

Check out the [clockclock](http://grogger.io/portfolio/clockclock/) demo for a working example.

## Cell System === Entity Component System

In frontend development the term 'component' is usually associated with a partial reusable piece of view ('prefabs' speaking in Unity terms). 
Since react is used to create such pieces I decided to maintain the term 'component' for 'prefabs' and use the term 'cell' for 'component'. 
Entities are solely represented by an id.

### ~~Entity~~ id

Well okay technically entities are still there but solely represented by an id, nothing more than a bag of cells (pieces of data) that store their own entity id. 
Adding or removing features/traits or changing an 'entity' completely becomes as easy as adding or removing cells.  

### Cells (data/model, Component in ECS) .json

Cells are pure data! Represented by flat json files. Each cell stores the entity id (eid) that it is part of.
This should make serialization of the whole application as simple as saving all cells to json (future work). 

```json
// transform.json
{
  "eid": -1,
  "x": 0,
  "y": 0,
  "rotation": 0,
  "scaleX": 1.0,
  "scaleY": 1.0
}
```

### Systems (behaviour/logic/controller) .ts

Systems provide the behaviour that is exhibited by the entities. Systems are designed to act on entities with a certain combination of cells (which is efficiently determined by matching bitmasks).
Trigger or untrigger a system for a specific entity is easily achieved by added or removing the appropriate cells. 
Note that the order in which systems are executed is important to make sure changed data is caught on by the next system.

```js
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
        const view = this.store.views[this.eid]; // NOTE views are normally not accessed from systems!!

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
```

### Components (Prefabs) .tsx

Components represent parts of reusable views and their cell data settings. Cells are represented as 'c-' prefixed attributes. The element itself is interpreted as a 'node' cell. 
React is solely used to create such components, because it allows a readable way to define structure as well as some validation on cells. 

```js
import * as React from 'react';

export default
<clock c-clock={{}} c-sprite={{texture: 'img_clock'}}>
    <dial name='dial1'/>
    <dial name='dial2' c-transform={{rotation: Math.PI/2}}/>
</clock>;
```

### Views

Ultimately cell-engine should be renderer independent. View nodes are kept separate in a special array in the store. 
The render system (only) should translate the application data to the views. 

## Cache friendly Store

Because the whole application is represented by a collection of json's the complete application can be represented by a 2 dimensional array: cell x eid.
Systems can iterate effeciently over all entities and triggered appropriately by using bitmasks that represent the combination of cells.
Because systems are executed in a specific order this provides a predictable way in which cells are looked up and should reduce the number of cache misses.  

## Future work

- Proper event system
- Unit tests
- Input handling using streams (RxJS)
- Proper tween cell
- Renderer independence
- Physics
- Particle system
- Serialization/saving loading
- Dependency injection (for engine code)
- View porting
- Optimum store initialization based on system order
- cell-skeleton project generator
- etc. etc.


