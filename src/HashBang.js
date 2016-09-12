
define([  
  "esri/widgets/support/viewModelWiring",
  "esri/widgets/Widget",

  "./HashBang/HashBangViewModel"
],
function (  
  viewModelWiring, Widget, 
  HashBangViewModel
) {

  return Widget.createSubclass([],
  {
    properties: {
      view: {
        dependsOn: ["viewModel.view"]
      },
      viewModel: {
        type: HashBangViewModel
      },
      silentMode: {
        dependsOn: ["viewModel.silentMode"]
      }
    },

    declaredClass: "custom.widgets.HashBang",

    postCreate: function () {
      this.inherited(arguments);
    },

    _getViewAttr: viewModelWiring.createGetterDelegate("view"),
    _setViewAttr: viewModelWiring.createSetterDelegate("view"),

    _getSilentModeAttr: viewModelWiring.createGetterDelegate("silentMode"),
    _setSilentModeAttr: viewModelWiring.createSetterDelegate("silentMode")
  });
});