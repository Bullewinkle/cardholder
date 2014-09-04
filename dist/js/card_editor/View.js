(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('CardEditor', function(CardEditor) {
    var Layer, LayerCollection;
    CardEditor.CardEditorView = (function(_super) {
      __extends(CardEditorView, _super);

      function CardEditorView() {
        this.saveGeneratedCardToImage = __bind(this.saveGeneratedCardToImage, this);
        this.removeShape = __bind(this.removeShape, this);
        this.addShape = __bind(this.addShape, this);
        this.removeLayer = __bind(this.removeLayer, this);
        this.addLayer = __bind(this.addLayer, this);
        this.onShow = __bind(this.onShow, this);
        return CardEditorView.__super__.constructor.apply(this, arguments);
      }

      CardEditorView.prototype.logging = false;

      CardEditorView.prototype.counter = 0;

      CardEditorView.prototype.className = 'card-editor-view';

      CardEditorView.prototype.ui = {
        'canvasContainer': '#canvas-container',
        'slider': '#kaleidoscope-slider',
        'layerList': '.ui-layer-list',
        'addLayer': '.add-layer',
        'removeLayer': '.remove-layer',
        'shapeList': '.ui-shape-list',
        'addShape': '.add-shape',
        'removeShape': '.remove-shape',
        'saveToImage': '.save-to-image'
      };

      CardEditorView.prototype.events = {
        'change @ui.slider': 'onSliderChange',
        'click @ui.addLayer': 'addLayer',
        'click @ui.removeLayer': 'removeLayer',
        'click @ui.addShape': 'addShape',
        'click @ui.removeShape': 'removeShape',
        'click @ui.saveToImage': 'saveGeneratedCardToImage'
      };

      CardEditorView.prototype.template = function(model) {
        return templatizer.cardEditor.editor(this.model);
      };

      CardEditorView.prototype.initialize = function() {
        this.bind('all', function() {
          if (this.logging === true) {
            return console.log("CARDS COMPOSITE VIEW:\t", arguments);
          }
        });
        this.state = new Backbone.Model({
          currentLayer: {}
        });
        this.model = new Backbone.Model();
        return this.collection = new LayerCollection();
      };

      CardEditorView.prototype.onShow = function() {
        var stageHeight, stageWidth;
        this.ui.layerList.sortable();
        this.ui.layerList.disableSelection();
        this.ui.shapeList.sortable();
        this.ui.shapeList.disableSelection();
        stageWidth = this.ui.canvasContainer.width();
        stageHeight = this.ui.canvasContainer.height();
        return this.stage = new Kinetic.Stage({
          container: "canvas-container",
          width: stageWidth,
          height: 600
        });
      };

      CardEditorView.prototype.addLayer = function(e, layer, params) {
        params = params || {
          name: 'default layer'
        };
        layer = layer || new Kinetic.Layer(params);
        this.stage.add(layer);
        this.state.set('currentLayer', layer);
        this.collection.add(layer.toObject());
        this.ui.layerList.append("<li class='ui-state-default ui-sortable-handle'><span class='ui-icon ui-icon-arrowthick-2-n-s'></span>Слой " + (this.stage.getLayers().length) + "</li>");
        return console.log(this.stage.getLayers().length);
      };

      CardEditorView.prototype.removeLayer = function() {
        var layers;
        layers = this.stage.getLayers();
        if (layers.length > 0) {
          this.ui.layerList.find(".ui-sortable-handle").eq(layers.length - 1).remove();
          layers[layers.length - 1].destroy();
          this.state.set('currentLayer', layers[layers.length - 1]);
        }
        return console.log(this.stage.getLayers().length);
      };

      CardEditorView.prototype.addShape = function() {
        var layer, shape;
        console.log('addShape');
        layer = this.state.get('currentLayer');
        shape = new Kinetic.RegularPolygon({
          x: app.getRandom(0, this.stage.getWidth()),
          y: app.getRandom(0, this.stage.getHeight()),
          sides: app.getRandom(3, 9),
          radius: app.getRandom(10, 140),
          fillRed: app.getRandom(1, 255),
          fillGreen: app.getRandom(1, 255),
          fillBlue: app.getRandom(1, 255),
          opacity: app.getRandom(0.1, 1, 2),
          draggable: true
        });
        layer.add(shape);
        layer.draw();
        return this.ui.shapeList.append("<li class='ui-state-default ui-sortable-handle'><span class='ui-icon ui-icon-arrowthick-2-n-s'></span>Случайная фигура " + (this.state.get('currentLayer').children.length) + "</li>");
      };

      CardEditorView.prototype.removeShape = function() {
        var layer, shapes;
        console.log('removeShape');
        layer = this.state.get('currentLayer');
        shapes = layer.children;
        if (shapes.length > 0) {
          this.ui.shapeList.find(".ui-sortable-handle").eq(shapes.length - 1).remove();
          shapes[shapes.length - 1].destroy();
          return layer.draw();
        }
      };

      CardEditorView.prototype.saveGeneratedCardToImage = function() {
        return this.stage.toDataURL({
          miteType: "image/png",
          callback: function(data) {
            var image, imageWindow;
            image = data;
            imageWindow = window.open(image);
            return $(imageWindow.document.body).prepend("<p>Нажмите сохранить (ctrl/cmd + s)</p>");
          }
        });
      };

      return CardEditorView;

    })(Marionette.ItemView);
    Layer = (function(_super) {
      __extends(Layer, _super);

      function Layer() {
        return Layer.__super__.constructor.apply(this, arguments);
      }

      return Layer;

    })(Backbone.Model);
    return LayerCollection = (function(_super) {
      __extends(LayerCollection, _super);

      function LayerCollection() {
        return LayerCollection.__super__.constructor.apply(this, arguments);
      }

      LayerCollection.prototype.model = Layer;

      return LayerCollection;

    })(Backbone.Collection);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL1ZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxZQUFaLEVBQTBCLFNBQUMsVUFBRCxHQUFBO0FBQ3pCLFFBQUEsc0JBQUE7QUFBQSxJQUFNLFVBQVUsQ0FBQztBQUNoQix1Q0FBQSxDQUFBOzs7Ozs7Ozs7O09BQUE7O0FBQUEsK0JBQUEsT0FBQSxHQUFTLEtBQVQsQ0FBQTs7QUFBQSwrQkFDQSxPQUFBLEdBQVMsQ0FEVCxDQUFBOztBQUFBLCtCQUdBLFNBQUEsR0FBVyxrQkFIWCxDQUFBOztBQUFBLCtCQUtBLEVBQUEsR0FDQztBQUFBLFFBQUEsaUJBQUEsRUFBbUIsbUJBQW5CO0FBQUEsUUFDQSxRQUFBLEVBQVUsc0JBRFY7QUFBQSxRQUVBLFdBQUEsRUFBYSxnQkFGYjtBQUFBLFFBR0EsVUFBQSxFQUFhLFlBSGI7QUFBQSxRQUlBLGFBQUEsRUFBZ0IsZUFKaEI7QUFBQSxRQU1BLFdBQUEsRUFBYSxnQkFOYjtBQUFBLFFBT0EsVUFBQSxFQUFZLFlBUFo7QUFBQSxRQVFBLGFBQUEsRUFBZSxlQVJmO0FBQUEsUUFVQSxhQUFBLEVBQWUsZ0JBVmY7T0FORCxDQUFBOztBQUFBLCtCQWtCQSxNQUFBLEdBQ0M7QUFBQSxRQUFBLG1CQUFBLEVBQXFCLGdCQUFyQjtBQUFBLFFBQ0Esb0JBQUEsRUFBc0IsVUFEdEI7QUFBQSxRQUVBLHVCQUFBLEVBQXlCLGFBRnpCO0FBQUEsUUFHQSxvQkFBQSxFQUFzQixVQUh0QjtBQUFBLFFBSUEsdUJBQUEsRUFBeUIsYUFKekI7QUFBQSxRQUtBLHVCQUFBLEVBQXlCLDBCQUx6QjtPQW5CRCxDQUFBOztBQUFBLCtCQTZCQSxRQUFBLEdBQVUsU0FBQyxLQUFELEdBQUE7ZUFDVCxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQXZCLENBQThCLElBQUMsQ0FBQSxLQUEvQixFQURTO01BQUEs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NkMsTUFBTSxDQUFDLE1BQVAsR0FBYyxDQUEzRCxDQUE2RCxDQUFDLE1BQTlELENBQUEsQ0FBQSxDQUFBO0FBQUEsVUFDQSxNQUFPLENBQUEsTUFBTSxDQUFDLE1BQVAsR0FBYyxDQUFkLENBQWdCLENBQUMsT0FBeEIsQ0FBQSxDQURBLENBQUE7aUJBRUEsS0FBSyxDQUFDLElBQU4sQ0FBQSxFQUhEO1NBSlk7TUFBQSxDQS9GYixDQUFBOztBQUFBLCtCQXdHQSx3QkFBQSxHQUEwQixTQUFBLEdBQUE7ZUFDekIsSUFBQyxDQUFBLEtBQUssQ0FBQyxTQUFQLENBQ0M7QUFBQSxVQUFBLFFBQUEsRUFBVSxXQUFWO0FBQUEsVUFDQSxRQUFBLEVBQVUsU0FBQyxJQUFELEdBQUE7QUFFVCxnQkFBQSxrQkFBQTtBQUFBLFlBQUEsS0FBQSxHQUFRLElBQVIsQ0FBQTtBQUFBLFlBQ0EsV0FBQSxHQUFjLE1BQU0sQ0FBQyxJQUFQLENBQVksS0FBWixDQURkLENBQUE7bUJBRUEsQ0FBQSxDQUFFLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBdkIsQ0FBNEIsQ0FBQyxPQUE3QixDQUFxQyx5Q0FBckMsRUFKUztVQUFBLENBRFY7U0FERCxFQUR5QjtNQUFBLENBeEcxQixDQUFBOzs0QkFBQTs7T0FEdUMsVUFBVSxDQUFDLFNBQW5ELENBQUE7QUFBQSxJQXFITTtBQUFOLDhCQUFBLENBQUE7Ozs7T0FBQTs7bUJBQUE7O09BQW9CLFFBQVEsQ0FBQyxNQXJIN0IsQ0FBQTtXQXlITTtBQUNMLHdDQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSxnQ0FBQSxLQUFBLEdBQU8sS0FBUCxDQUFBOzs2QkFBQTs7T0FENkIsUUFBUSxDQUFDLFlBMUhkO0VBQUEsQ0FBMUIsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZF9lZGl0b3IvVmlldy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkBhcHAubW9kdWxlICdDYXJkRWRpdG9yJywgKENhcmRFZGl0b3IpIC0+XG5cdGNsYXNzIENhcmRFZGl0b3IuQ2FyZEVkaXRvclZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkl0ZW1WaWV3XG5cdFx0bG9nZ2luZzogb2ZmXG5cdFx0Y291bnRlcjogMFxuXG5cdFx0Y2xhc3NOYW1lOiAnY2FyZC1lZGl0b3ItdmlldydcblxuXHRcdHVpOlxuXHRcdFx0J2NhbnZhc0NvbnRhaW5lcic6ICcjY2FudmFzLWNvbnRhaW5lcidcblx0XHRcdCdzbGlkZXInOiAnI2thbGVpZG9zY29wZS1zbGlkZXInXG5cdFx0XHQnbGF5ZXJMaXN0JzogJy51aS1sYXllci1saXN0J1xuXHRcdFx0J2FkZExheWVyJyA6ICcuYWRkLWxheWVyJ1xuXHRcdFx0J3JlbW92ZUxheWVyJyA6ICcucmVtb3ZlLWxheWVyJ1xuXG5cdFx0XHQnc2hhcGVMaXN0JzogJy51aS1zaGFwZS1saXN0J1xuXHRcdFx0J2FkZFNoYXBlJzogJy5hZGQtc2hhcGUnXG5cdFx0XHQncmVtb3ZlU2hhcGUnOiAnLnJlbW92ZS1zaGFwZSdcblxuXHRcdFx0J3NhdmVUb0ltYWdlJzogJy5zYXZlLXRvLWltYWdlJ1xuXHRcdFx0XHRcdFxuXHRcdGV2ZW50czpcblx0XHRcdCdjaGFuZ2UgQHVpLnNsaWRlcic6ICdvblNsaWRlckNoYW5nZSdcblx0XHRcdCdjbGljayBAdWkuYWRkTGF5ZXInOiAnYWRkTGF5ZXInXG5cdFx0XHQnY2xpY2sgQHVpLnJlbW92ZUxheWVyJzogJ3JlbW92ZUxheWVyJ1xuXHRcdFx0J2NsaWNrIEB1aS5hZGRTaGFwZSc6ICdhZGRTaGFwZSdcblx0XHRcdCdjbGljayBAdWkucmVtb3ZlU2hhcGUnOiAncmVtb3ZlU2hhcGUnXG5cdFx0XHQnY2xpY2sgQHVpLnNhdmVUb0ltYWdlJzogJ3NhdmVHZW5lcmF0ZWRDYXJkVG9JbWFnZSdcblxuXHRcdCMgY29sbGVjdGlvbkV2ZW50czpcblx0XHQjIFx0J2FkZCc6ICdhZGRMYXllcidcdFxuXG5cdFx0dGVtcGxhdGU6IChtb2RlbCkgLT5cblx0XHRcdHRlbXBsYXRpemVyLmNhcmRFZGl0b3IuZWRpdG9yIEBtb2RlbFxuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdEBiaW5kICdhbGwnLCAtPlxuXHRcdFx0XHRjb25zb2xlLmxvZyBcIkNBUkRTIENPTVBPU0lURSBWSUVXOlxcdFwiLCBhcmd1bWVudHMgaWYgQGxvZ2dpbmcgaXMgb25cblxuXHRcdFx0QHN0YXRlICAgICAgPSBuZXcgQmFja2JvbmUuTW9kZWxcblx0XHRcdFx0Y3VycmVudExheWVyOiB7fVxuXHRcdFx0QG1vZGVsICAgICAgPSBuZXcgQmFja2JvbmUuTW9kZWwoKVxuXHRcdFx0QGNvbGxlY3Rpb24gPSBuZXcgTGF5ZXJDb2xsZWN0aW9uKClcblxuXHRcdG9uU2hvdzogPT5cblxuXHRcdFx0QHVpLmxheWVyTGlzdC5zb3J0YWJsZSgpXG5cdFx0XHRAdWkubGF5ZXJMaXN0LmRpc2FibGVTZWxlY3Rpb24oKVxuXHRcdFx0XG5cdFx0XHRAdWkuc2hhcGVMaXN0LnNvcnRhYmxlKClcblx0XHRcdEB1aS5zaGFwZUxpc3QuZGlzYWJsZVNlbGVjdGlvbigpXG5cblx0XHRcdHN0YWdlV2lkdGggPSBAdWkuY2FudmFzQ29udGFpbmVyLndpZHRoKClcblx0XHRcdHN0YWdlSGVpZ2h0ID0gQHVpLmNhbnZhc0NvbnRhaW5lci5oZWlnaHQoKVxuXG5cdFx0XHRAc3RhZ2UgPSBuZXcgS2luZXRpYy5TdGFnZVxuXHRcdFx0XHRjb250YWluZXI6IFwiY2FudmFzLWNvbnRhaW5lclwiXG5cdFx0XHRcdHdpZHRoOiBzdGFnZVdpZHRoXG5cdFx0XHRcdGhlaWdodDogNjAwXG5cblx0XHRhZGRMYXllcjogKGUsIGxheWVyLCBwYXJhbXMpID0+XG5cdFx0XHRwYXJhbXMgPSBwYXJhbXMgb3Jcblx0XHRcdFx0bmFtZTogJ2RlZmF1bHQgbGF5ZXInXG5cdFx0XHRsYXllciA9IGxheWVyIG9yIG5ldyBLaW5ldGljLkxheWVyIHBhcmFtc1xuXG5cdFx0XHRAc3RhZ2UuYWRkIGxheWVyXG5cdFx0XHRAc3RhdGUuc2V0ICdjdXJyZW50TGF5ZXInLCBsYXllclxuXHRcdFx0QGNvbGxlY3Rpb24uYWRkIGxheWVyLnRvT2JqZWN0KClcblx0XHRcdEB1aS5sYXllckxpc3QuYXBwZW5kIFwiPGxpIGNsYXNzPSd1aS1zdGF0ZS1kZWZhdWx0IHVpLXNvcnRhYmxlLWhhbmRsZSc+PHNwYW4gY2xhc3M9J3VpLWljb24gdWktaWNvbi1hcnJvd3RoaWNrLTItbi1zJz48L3NwYW4+0KHQu9C+0LkgI3sgQHN0YWdlLmdldExheWVycygpLmxlbmd0aCB9PC9saT5cIlxuXHRcdFx0Y29uc29sZS5sb2cgQHN0YWdlLmdldExheWVycygpLmxlbmd0aFxuXHRcdFxuXHRcdHJlbW92ZUxheWVyOiA9PlxuXHRcdFx0bGF5ZXJzID0gQHN0YWdlLmdldExheWVycygpXG5cdFx0XHRpZiBsYXllcnMubGVuZ3RoID4gMFxuXHRcdFx0XHRAdWkubGF5ZXJMaXN0LmZpbmQoXCIudWktc29ydGFibGUtaGFuZGxlXCIpLmVxKGxheWVycy5sZW5ndGgtMSkucmVtb3ZlKClcblx0XHRcdFx0bGF5ZXJzW2xheWVycy5sZW5ndGgtMV0uZGVzdHJveSgpXG5cdFx0XHRcdEBzdGF0ZS5zZXQgJ2N1cnJlbnRMYXllcicsIGxheWVyc1tsYXllcnMubGVuZ3RoLTFdXG5cdFx0XHRjb25zb2xlLmxvZyBAc3RhZ2UuZ2V0TGF5ZXJzKCkubGVuZ3RoXG5cblx0XHRhZGRTaGFwZTogPT5cblx0XHRcdGNvbnNvbGUubG9nICdhZGRTaGFwZSdcblx0XHRcdGxheWVyID0gQHN0YXRlLmdldCAnY3VycmVudExheWVyJ1xuXG5cdFx0XHRzaGFwZSA9IG5ldyBLaW5ldGljLlJlZ3VsYXJQb2x5Z29uXG5cdFx0XHRcdHg6IGFwcC5nZXRSYW5kb20gMCwgQHN0YWdlLmdldFdpZHRoKClcblx0XHRcdFx0eTogYXBwLmdldFJhbmRvbSAwLCBAc3RhZ2UuZ2V0SGVpZ2h0KClcblx0XHRcdFx0c2lkZXM6IGFwcC5nZXRSYW5kb20gMywgOVxuXHRcdFx0XHRyYWRpdXM6IGFwcC5nZXRSYW5kb20gMTAsIDE0MFxuXHRcdFx0XHRmaWxsUmVkOiBhcHAuZ2V0UmFuZG9tIDEsIDI1NVxuXHRcdFx0XHRmaWxsR3JlZW46IGFwcC5nZXRSYW5kb20gMSwgMjU1XG5cdFx0XHRcdGZpbGxCbHVlOiBhcHAuZ2V0UmFuZG9tIDEsIDI1NVxuXHRcdFx0XHRvcGFjaXR5OiBhcHAuZ2V0UmFuZG9tIDAuMSwgMSwgMlxuXHRcdFx0XHRkcmFnZ2FibGU6IHRydWVcblx0XHRcdGxheWVyLmFkZCBzaGFwZVxuXHRcdFx0bGF5ZXIuZHJhdygpXG5cblx0XHRcdEB1aS5zaGFwZUxpc3QuYXBwZW5kIFwiPGxpIGNsYXNzPSd1aS1zdGF0ZS1kZWZhdWx0IHVpLXNvcnRhYmxlLWhhbmRsZSc+PHNwYW4gY2xhc3M9J3VpLWljb24gdWktaWNvbi1hcnJvd3RoaWNrLTItbi1zJz48L3NwYW4+0KHQu9GD0YfQsNC50L3QsNGPINGE0LjQs9GD0YDQsCAjeyBAc3RhdGUuZ2V0KCdjdXJyZW50TGF5ZXInKS5jaGlsZHJlbi5sZW5ndGggfTwvbGk+XCJcblxuXHRcdHJlbW92ZVNoYXBlOiA9PlxuXHRcdFx0Y29uc29sZS5sb2cgJ3JlbW92ZVNoYXBlJ1xuXHRcdFx0bGF5ZXIgPSBAc3RhdGUuZ2V0ICdjdXJyZW50TGF5ZXInXG5cdFx0XHRzaGFwZXMgPSBsYXllci5jaGlsZHJlblxuXHRcdFx0aWYgc2hhcGVzLmxlbmd0aCA+IDBcblx0XHRcdFx0QHVpLnNoYXBlTGlzdC5maW5kKFwiLnVpLXNvcnRhYmxlLWhhbmRsZVwiKS5lcShzaGFwZXMubGVuZ3RoLTEpLnJlbW92ZSgpXG5cdFx0XHRcdHNoYXBlc1tzaGFwZXMubGVuZ3RoLTFdLmRlc3Ryb3koKVxuXHRcdFx0XHRsYXllci5kcmF3KClcblxuXHRcdHNhdmVHZW5lcmF0ZWRDYXJkVG9JbWFnZTogPT5cblx0XHRcdEBzdGFnZS50b0RhdGFVUkxcblx0XHRcdFx0bWl0ZVR5cGU6IFwiaW1hZ2UvcG5nXCJcblx0XHRcdFx0Y2FsbGJhY2s6IChkYXRhKSAtPlxuXHRcdFx0XHRcdCMgaW1hZ2UgPSBkYXRhLnJlcGxhY2UoXCJpbWFnZS9wbmdcIiwgXCJpbWFnZS9vY3RldC1zdHJlYW1cIilcblx0XHRcdFx0XHRpbWFnZSA9IGRhdGFcblx0XHRcdFx0XHRpbWFnZVdpbmRvdyA9IHdpbmRvdy5vcGVuKGltYWdlKVxuXHRcdFx0XHRcdCQoaW1hZ2VXaW5kb3cuZG9jdW1lbnQuYm9keSkucHJlcGVuZChcIjxwPtCd0LDQttC80LjRgtC1INGB0L7RhdGA0LDQvdC40YLRjCAoY3RybC9jbWQgKyBzKTwvcD5cIik7XG5cblxuXHRcdFx0XG5cblx0Y2xhc3MgTGF5ZXIgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuXHRcdCMgZGVmYXVsdHM6XG5cdFx0IyBcdHpJbmRleDogMFxuXG5cdGNsYXNzIExheWVyQ29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cblx0XHRtb2RlbDogTGF5ZXJcbiJdfQ==