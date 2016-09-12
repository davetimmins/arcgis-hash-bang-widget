# arcgis-hash-bang-widget
:hash: An ArcGIS JS V4 widget that gets and sets the URL hash, or does something else. Less bang, more hash.

[![npm](https://img.shields.io/npm/v/arcgis-hash-bang-widget.svg?maxAge=2592000)](https://www.npmjs.com/package/arcgis-hash-bang-widget)

Create the widget

```js
require([
  "custom-widgets/HashBang"
], function(HashBang) {

  // create your map and view

  var hashBang = new HashBang({
    view: view,
    silentMode: true // default is false
  });
```

If you set `silentMode` to `true` then the viewpoint will be stored in the browsers `localStorage` and leave the URL hash alone.

Get it from here or via npm `npm install arcgis-hash-bang-widget --save`

#### Running locally

Download / clone this repository then run `npm install` > `npm start`
