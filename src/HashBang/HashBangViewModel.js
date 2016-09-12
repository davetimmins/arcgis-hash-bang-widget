define([
  "esri/core/Accessor", 
  "esri/core/HandleRegistry",
  "esri/core/watchUtils",
  "esri/Viewpoint"
], function(Accessor, HandleRegistry, watchUtils, Viewpoint) {

  var state = {
    disabled: "disabled",
    ready: "ready"
  };

  return Accessor.createSubclass({

    declaredClass: "custom.widgets.HashBangViewModel",
    properties: {
      state: {
        dependsOn: ["view.ready"],
        readOnly: !0
      },
      view: {},
      silentMode: false
    },

    constructor: function() {

      this._handles = new HandleRegistry;
      this._stationaryChanged =  this._stationaryChanged.bind(this);
      this._setInitialViewpoint = this._setInitialViewpoint.bind(this);
    },

    initialize: function() {

      watchUtils.whenOnce(this, "view").then(function(view) { 

        this._handles.add(watchUtils.init(this, "state", function(stateVal) {

          this._handles.remove("view-ready-watcher");

          if (stateVal === state.ready) {

            this._setInitialViewpoint();             
            this._handles.add(watchUtils.whenTrue(this.view, "stationary", this._stationaryChanged), "stationary-watcher");  
          }
        }.bind(this)), "view-ready-watcher");
      }.bind(this));
    },

    destroy: function() {
            
      this._handles.destroy();
      this._handles = null;
    },
    
    _handles: null,

    state: state.disabled,
    _stateGetter: function() {

      return this.get("view.ready") ? state.ready : state.disabled
    },
      
    view: null,

    _silentModeGetter: function() {

      return this._get("silentMode");
    },
    _silentModeSetter: function(silentMode) {

      this._set("silentMode", silentMode)
    },

    _stationaryChanged: function (obj, prop, callback) {

      var viewpointJSON = JSON.stringify(this.view.viewpoint.toJSON());

      if (this.silentMode) {

        localStorage.setItem('arcgisMapViewpoint', viewpointJSON);
      } else {

        window.location.hash = viewpointJSON;
      }   
      
    },  

    _setInitialViewpoint: function (newValue) {
      
      var hashExtent = null;

      if (this.silentMode) {

        try {

          if (localStorage.arcgisMapViewpoint) {

            hashExtent = Viewpoint.fromJSON(JSON.parse(localStorage.getItem('arcgisMapViewpoint')));   
          }          
        } catch (ex) {
            // TODO : maybe log this
        }  
      }
      else {
      
        if (window.location.hash) {

          try {

            hashExtent = Viewpoint.fromJSON(JSON.parse(window.location.hash.replace('#', '')));             
          } catch (ex) {
              // TODO : maybe log this
          }              
        }
      }

      if (hashExtent && hashExtent.declaredClass === 'esri.Viewpoint') {
        this.view.goTo(hashExtent);
      } 
    }
  })
});
