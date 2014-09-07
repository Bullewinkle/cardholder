(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.app.module('CardEditor', function(CardEditor) {
    var AbstractShapeModel, EditorModel, EditorState, LayerCollection, LayerModel, ShapeCollection;
    AbstractShapeModel = (function(_super) {
      __extends(AbstractShapeModel, _super);

      function AbstractShapeModel() {
        return AbstractShapeModel.__super__.constructor.apply(this, arguments);
      }

      return AbstractShapeModel;

    })(Backbone.Model);
    ShapeCollection = (function(_super) {
      __extends(ShapeCollection, _super);

      function ShapeCollection() {
        return ShapeCollection.__super__.constructor.apply(this, arguments);
      }

      ShapeCollection.prototype.model = AbstractShapeModel;

      return ShapeCollection;

    })(Backbone.Collection);
    LayerModel = (function(_super) {
      __extends(LayerModel, _super);

      function LayerModel() {
        return LayerModel.__super__.constructor.apply(this, arguments);
      }

      LayerModel.prototype.defaults = {
        layerName: 'Default',
        shapeCollection: new ShapeCollection()
      };

      return LayerModel;

    })(Backbone.Model);
    LayerCollection = (function(_super) {
      __extends(LayerCollection, _super);

      function LayerCollection() {
        return LayerCollection.__super__.constructor.apply(this, arguments);
      }

      LayerCollection.prototype.model = LayerModel;

      return LayerCollection;

    })(Backbone.Collection);
    EditorModel = (function(_super) {
      __extends(EditorModel, _super);

      function EditorModel() {
        return EditorModel.__super__.constructor.apply(this, arguments);
      }

      EditorModel.prototype.defaults = {
        layerCollection: new LayerCollection()
      };

      return EditorModel;

    })(Backbone.Model);
    EditorState = (function(_super) {
      __extends(EditorState, _super);

      function EditorState() {
        return EditorState.__super__.constructor.apply(this, arguments);
      }

      EditorState.prototype.defaults = {
        currentLayer: {}
      };

      return EditorState;

    })(Backbone.Model);
    return CardEditor.CardEditorLayout = (function(_super) {
      __extends(CardEditorLayout, _super);

      function CardEditorLayout() {
        this.draw = __bind(this.draw, this);
        this.onRemoveShape = __bind(this.onRemoveShape, this);
        this.onAddShape = __bind(this.onAddShape, this);
        this.removeLayer = __bind(this.removeLayer, this);
        this.addLayer = __bind(this.addLayer, this);
        this.saveGeneratedCardToImage = __bind(this.saveGeneratedCardToImage, this);
        this.resize = __bind(this.resize, this);
        this.onShow = __bind(this.onShow, this);
        return CardEditorLayout.__super__.constructor.apply(this, arguments);
      }

      CardEditorLayout.prototype.logging = true;

      CardEditorLayout.prototype.counter = 0;

      CardEditorLayout.prototype.className = 'card-editor-layout';

      CardEditorLayout.prototype.ui = {
        'canvasContainer': '#canvas-container',
        'saveImageFileButton': '.save-to-image'
      };

      CardEditorLayout.prototype.events = {
        'click @ui.saveImageFileButton': 'saveGeneratedCardToImage'
      };

      CardEditorLayout.prototype.regions = {
        panel1: '#panel-1',
        panel2: '#panel-2',
        panel3: '#panel-3'
      };

      CardEditorLayout.prototype.initialize = function() {
        this.bind('all', function() {
          if (this.logging === true) {
            return console.log("CARD EDITOR LAYOUT:\t", arguments);
          }
        });
        this.editorState = new EditorState();
        return this.model = new EditorModel();
      };

      CardEditorLayout.prototype.template = function(model) {
        return templatizer.cardEditor.editor(this.model);
      };

      CardEditorLayout.prototype.onShow = function() {
        var stageHeight, stageParams, stageWidth;
        this.listenTo(app, 'resize', this.resize);
        stageWidth = this.ui.canvasContainer.width();
        stageHeight = this.ui.canvasContainer.height();
        this.stage = new Kinetic.Stage({
          container: "canvas-container",
          width: stageWidth,
          height: 600
        });
        stageParams = {
          scale: this.stage.scale(),
          width: this.ui.canvasContainer.innerWidth(),
          height: this.ui.canvasContainer.innerHeight()
        };
        this.editorState.set('stageParams', stageParams);
        this.panel1.show(new CardEditor.views.LayersPanel({
          state: this.editorState,
          model: this.model
        }));
        this.panel2.show(new CardEditor.views.LayerChildsPanel({
          state: this.editorState,
          model: this.model
        }));
        this.listenTo(this.model, 'change', this.draw);
        this.listenTo(this.model.get('layerCollection'), 'add', this.addLayer);
        this.listenTo(this.model.get('layerCollection'), 'remove', this.removeLayer);
        this.listenTo(this.model.get('layerCollection'), 'reset set sync fetch', this.draw);
        if (this.model.get('layerCollection').length === 0) {
          this.model.get('layerCollection').add({
            layerName: "Слой " + (this.model.get('layerCollection').length + 1)
          });
        }
        this.editorState.set('currentLayer', this.model.get('layerCollection').models[0]);
        console.log(this.editorState.get('currentLayer'));
        this.listenTo(this.editorState.get('currentLayer').get('shapeCollection'), 'add', this.onAddShape);
        this.listenTo(this.editorState.get('currentLayer').get('shapeCollection'), 'remove', this.onRemoveShape);
        return this.listenTo(this.editorState.get('currentLayer').get('shapeCollection'), 'reset set sync fetch', this.draw);
      };

      CardEditorLayout.prototype.resize = function() {
        var newStageParams, stageParams, xScale, yScale;
        this.trigger('resize');
        stageParams = this.editorState.get('stageParams');
        newStageParams = {};
        newStageParams.width = this.ui.canvasContainer.innerWidth();
        newStageParams.height = newStageParams.width * 0.5625;
        xScale = (newStageParams.width / stageParams.width) * stageParams.scale.x;
        yScale = (newStageParams.height / stageParams.height) * stageParams.scale.y;
        newStageParams.scale = {
          x: xScale,
          y: yScale
        };
        this.stage.setAttr("width", newStageParams.width);
        this.stage.setAttr("height", newStageParams.height);
        this.stage.setAttr("scale", newStageParams.scale);
        this.editorState.set('stageParams', newStageParams);
        return this.stage.draw();
      };

      CardEditorLayout.prototype.saveGeneratedCardToImage = function() {
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

      CardEditorLayout.prototype.addLayer = function(layerModel, layerCollection, options) {
        var layer, params;
        console.log('add layer to stage');
        params = layerModel.toJSON();
        layer = new Kinetic.Layer(params);
        return this.stage.add(layer);
      };

      CardEditorLayout.prototype.removeLayer = function(layerModel, layerCollection, options) {
        var layers;
        console.log('add layer to stage');
        layers = this.stage.getLayers();
        if (layers.length > 0) {
          return layers[layers.length - 1].destroy();
        }
      };

      CardEditorLayout.prototype.onAddShape = function() {
        var layer, shape;
        console.log('addShape');
        layer = this.stage.children[0];
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
        return layer.draw();
      };

      CardEditorLayout.prototype.onRemoveShape = function() {
        var layer, shapes;
        console.log('removeShape');
        layer = this.stage.children[0];
        shapes = layer.children;
        if (shapes && shapes.length > 0) {
          shapes[shapes.length - 1].destroy();
          return layer.draw();
        }
      };

      CardEditorLayout.prototype.draw = function() {
        return this.stage.draw();
      };

      return CardEditorLayout;

    })(Marionette.LayoutView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL0xheW91dC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztzRkFBQTs7QUFBQSxFQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxDQUFZLFlBQVosRUFBMEIsU0FBQyxVQUFELEdBQUE7QUFHekIsUUFBQSwwRkFBQTtBQUFBLElBQU07QUFBTiwyQ0FBQSxDQUFBOzs7O09BQUE7O2dDQUFBOztPQUFpQyxRQUFRLENBQUMsTUFBMUMsQ0FBQTtBQUFBLElBRU07QUFDTCx3Q0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsZ0NBQUEsS0FBQSxHQUFPLGtCQUFQLENBQUE7OzZCQUFBOztPQUQ2QixRQUFRLENBQUMsV0FGdkMsQ0FBQTtBQUFBLElBS007QUFDTCxtQ0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsMkJBQUEsUUFBQSxHQUNDO0FBQUEsUUFBQSxTQUFBLEVBQVcsU0FBWDtBQUFBLFFBQ0EsZUFBQSxFQUFxQixJQUFBLGVBQUEsQ0FBQSxDQURyQjtPQURELENBQUE7O3dCQUFBOztPQUR3QixRQUFRLENBQUMsTUFMbEMsQ0FBQTtBQUFBLElBVU07QUFDTCx3Q0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsZ0NBQUEsS0FBQSxHQUFPLFVBQVAsQ0FBQTs7NkJBQUE7O09BRDZCLFFBQVEsQ0FBQyxXQVZ2QyxDQUFBO0FBQUEsSUFhTTtBQUNMLG9DQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSw0QkFBQSxRQUFBLEdBQ0M7QUFBQSxRQUFBLGVBQUEsRUFBcUIsSUFBQSxlQUFBLENBQUEsQ0FBckI7T0FERCxDQUFBOzt5QkFBQTs7T0FEeUIsUUFBUSxDQUFDLE1BYm5DLENBQUE7QUFBQSxJQWlCTTtBQUNMLG9DQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSw0QkFBQSxRQUFBLEdBQ0M7QUFBQSxRQUFBLFlBQUEsRUFBYyxFQUFkO09BREQsQ0FBQTs7eUJBQUE7O09BRHlCLFFBQVEsQ0FBQyxNQWpCbkMsQ0FBQTtXQXNCTSxVQUFVLENBQUM7QUFDaEIseUNBQUEsQ0FBQTs7Ozs7Ozs7Ozs7O09BQUE7O0FBQUEsaUNBQUEsT0FBQSxHQUFTLElBQVQsQ0FBQTs7QUFBQSxpQ0FDQSxPQUFBLEdBQVMsQ0FEVCxDQUFBOztBQUFBLGlDQUdBLFNBQUEsR0FBVyxvQkFIWCxDQUFBOztBQUFBLGlDQUtBLEVBQUEsR0FDQztBQUFBLFFBQUEsaUJBQUEsRUFBbUIsbUJBQW5CO0FBQUEsUUFDQSxxQkFBQSxFQUF1QixnQkFEdkI7T0FORCxDQUFBOztBQUFBLGlDQVNBLE1BQUEsR0FDQztBQUFBLFFBQUEsK0JBQUEsRUFBaUMsMEJBQWpDO09BVkQsQ0FBQTs7QUFBQSxpQ0FZQSxPQUFBLEdBQ0M7QUFBQSxRQUFBLE1BQUEsRUFBUSxVQUFSO0FBQUEsUUFDQSxNQUFBLEVBQVEsVUFEUjtBQUFBLFFBRUEsTUFBQSxFQUFRLFVBRlI7T0FiRCxDQUFBOztBQUFBLGlDQW1CQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBQ1gsUUFBQSxJQUFDLENBQUEsSUFBRCxDQUFNLEtBQU4sRUFBYSxTQUFBLEdBQUE7QUFDWixVQUFBLElBQWtELElBQUMsQ0FBQSxPQUFELEtBQVksSUFBOUQ7bUJBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSx1QkFBWixFQUFxQyxTQUFyQyxFQUFBO1dBRFk7UUFBQSxDQUFiLENBQUEsQ0FBQTtBQUFBLFFBR0EsSUFBQyxDQUFBLFdBQUQsR0FBbUIsSUFBQSxXQUFBLENBQUEsQ0FIbkIsQ0FBQTtlQUlBLElBQUMsQ0FBQSxLQUFELEdBQWEsSUFBQSxXQUFBLENBQUEsRUFMRjtNQUFBLENBbkJaLENBQUE7O0FBQUEsaUNBeUJBLFFBQUEsR0FBVSxTQUFDLEtBQUQsR0FBQTtlQUNULFdBQVcsQ0FBQyxVQUFVLENBQUMsTUFBdkIsQ0FBOEIsSUFBQyxDQUFBLEtBQS9CLEVBRFM7TUFBQSxDQXpCVixDQUFBOztBQUFBLGlDQTRCQSxNQUFBLEdBQVEsU0FBQSxHQUFBO0FBQ1AsWUFBQSxvQ0FBQTtBQUFBLFFBQUEsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsUUFBZixFQUF5QixJQUFDLENBQUEsTUFBMUIsQ0FBQSxDQUFBO0FBQUEsUUFHQSxVQUFBLEdBQWEsSUFBQyxDQUFBLEVBQUUsQ0FBQyxlQUFlLENBQUMsS0FBcEIsQ0FBQSxDQUhiLENBQUE7QUFBQSxRQUlBLFdBQUEsR0FBYyxJQUFDLENBQUEsRUFBRSxDQUFDLGVBQWUsQ0FBQyxNQUFwQixDQUFBLENBSmQsQ0FBQTtBQUFBLFFBS0EsSUFBQyxDQUFBLEtBQUQsR0FBYSxJQUFBLE9BQU8sQ0FBQyxLQUFSLENBQ1o7QUFBQSxVQUFBLFNBQUEsRUFBVyxrQkFBWDtBQUFBLFVBQ0EsS0FBQSxFQUFPLFVBRFA7QUFBQSxVQUVBLE1BQUEsRUFBUSxHQUZSO1NBRFksQ0FMYixDQUFBO0FBQUEsUUFTQSxXQUFBLEdBQ0M7QUFBQSxVQUFBLEtBQUEsRUFBTyxJQUFDLENBQUEsS0FBSyxDQUFDLEtBQVAsQ0FBQSxDQUFQO0FBQUEsVUFDQSxLQUFBLEVBQU8sSUFBQyxDQUFBLEVBQUUsQ0FBQyxlQUFlLENBQUMsVUFBcEIsQ0FBQSxDQURQO0FBQUEsVUFFQSxNQUFBLEVBQVEsSUFBQyxDQUFBLEVBQUUsQ0FBQyxlQUFlLENBQUMsV0FBcEIsQ0FBQSxDQUZSO1NBVkQsQ0FBQTtBQUFBLFFBYUEsSUFBQyxDQUFBLFdBQVcsQ0FBQyxHQUFiLENBQWlCLGFBQWpCLEVBQWdDLFdBQWhDLENBYkEsQ0FBQTtBQUFBLFFBaUJBLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFpQixJQUFBLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBakIsQ0FDaEI7QUFBQSxVQUFBLEtBQUEsRUFBTyxJQUFDLENBQUEsV0FBUjtBQUFBLFVBQ0EsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQURSO1NBRGdCLENBQWpCLENBakJBLENBQUE7QUFBQSxRQW9CQSxJQUFDLENBQUEsTUFBTSxDQUFDLElBQVIsQ0FBaUIsSUFBQSxVQUFVLENBQUMsS0FBSyxDQUFDLGdCQUFqQixDQUNoQjtBQUFBLFVBQUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxXQUFSO0FBQUEsVUFDQSxLQUFBLEVBQU8sSUFBQyxDQUFBLEtBRFI7U0FEZ0IsQ0FBakIsQ0FwQkEsQ0FBQTtBQUFBLFFBeUJBLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBQyxDQUFBLEtBQVgsRUFBa0IsUUFBbEIsRUFBNEIsSUFBQyxDQUFBLElBQTdCLENBekJBLENBQUE7QUFBQSxRQTBCQSxJQUFDLENBQUEsUUFBRCxDQUFVLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLGlCQUFYLENBQVYsRUFBeUMsS0FBekMsRUFBZ0QsSUFBQyxDQUFBLFFBQWpELENBMUJBLENBQUE7QUFBQSxRQTJCQSxJQUFDLENBQUEsUUFBRCxDQUFVLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLGlCQUFYLENBQVYsRUFBeUMsUUFBekMsRUFBbUQsSUFBQyxDQUFBLFdBQXBELENBM0JBLENBQUE7QUFBQSxRQTRCQSxJQUFDLENBQUEsUUFBRCxDQUFVLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLGlCQUFYLENBQVYsRUFBeUMsc0JBQXpDLEVBQWlFLElBQUMsQ0FBQSxJQUFsRSxDQTVCQSxDQUFBO0FBK0JBLFFBQUEsSUFBbUcsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsaUJBQVgsQ0FBNkIsQ0FBQyxNQUE5QixLQUF3QyxDQUEzSTtBQUFBLFVBQUEsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsaUJBQVgsQ0FBNkIsQ0FBQyxHQUE5QixDQUFrQztBQUFBLFlBQUEsU0FBQSxFQUFZLE9BQUEsR0FBTSxDQUF0RCxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxpQkFBWCxDQUE2QixDQUFDLE1BQTlCLEdBQXFDLENBQWlCLENBQWxCO1dBQWxDLENBQUEsQ0FBQTtTQS9CQTtBQUFBLFFBZ0NBLElBQUMsQ0FBQSxXQUFXLENBQUMsR0FBYixDQUFpQixjQUFqQixFQUFpQyxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxpQkFBWCxDQUE2QixDQUFDLE1BQU8sQ0FBQSxDQUFBLENBQXRFLENBaENBLENBQUE7QUFBQSxRQWlDQSxPQUFPLENBQUMsR0FBUixDQUFZLElBQUMsQ0FBQSxXQUFXLENBQUMsR0FBYixDQUFpQixjQUFqQixDQUFaLENBakNBLENBQUE7QUFBQSxRQW1DQSxJQUFDLENBQUEsUUFBRCxDQUFVLElBQUMsQ0FBQSxXQUFXLENBQUMsR0FBYixDQUFpQixjQUFqQixDQUFnQyxDQUFDLEdBQWpDLENBQXFDLGlCQUFyQyxDQUFWLEVBQW1FLEtBQW5FLEVBQTBFLElBQUMsQ0FBQSxVQUEzRSxDQW5DQSxDQUFBO0FBQUEsUUFvQ0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFDLENBQUEsV0FBVyxDQUFDLEdBQWIsQ0FBaUIsY0FBakIsQ0FBZ0MsQ0FBQyxHQUFqQyxDQUFxQyxpQkFBckMsQ0FBVixFQUFtRSxRQUFuRSxFQUE2RSxJQUFDLENBQUEsYUFBOUUsQ0FwQ0EsQ0FBQTtlQXFDQSxJQUFDLENBQUEsUUFBRCxDQUFVLElBQUMsQ0FBQSxXQUFXLENBQUMsR0FBYixDQUFpQixjQUFqQixDQUFnQyxDQUFDLEdBQWpDLENBQXFDLGlCQUFyQyxDQUFWLEVBQW1FLHNCQUFuRSxFQUEyRixJQUFDLENBQUEsSUFBNUYsRUF0Q087TUFBQSxDQTVCUixDQUFBOztBQUFBLGlDQXFFQSxNQUFBLEdBQVEsU0FBQSxHQUFBO0FBQ1AsWUFBQSwyQ0FBQTtBQUFBLFFBQUEsSUFBQyxDQUFBLE9BQUQsQ0FBUyxRQUFULENBQUEsQ0FBQTtBQUFBLFFBQ0EsV0FBQSxHQUFjLElBQUMsQ0FBQSxXQUFXLENBQUMsR0FBYixDQUFpQixhQUFqQixDQURkLENBQUE7QUFBQSxRQUVBLGNBQUEsR0FBaUIsRUFGakIsQ0FBQTtBQUFBLFFBSUEsY0FBYyxDQUFDLEtBQWYsR0FBdUIsSUFBQyxDQUFBLEVBQUUsQ0FBQyxlQUFlLENBQUMsVUFBcEIsQ0FBQSxDQUp2QixDQUFBO0FBQUEsUUFLQSxjQUFjLENBQUMsTUFBZixHQUF3QixjQUFjLENBQUMsS0FBZixHQUF1QixNQUwvQyxDQUFBO0FBQUEsUUFPQSxNQUFBLEdBQVMsQ0FBQyxjQUFjLENBQUMsS0FBZixHQUF1QixXQUFXLENBQUMsS0FBcEMsQ0FBQSxHQUE2QyxXQUFXLENBQUMsS0FBSyxDQUFDLENBUHhFLENBQUE7QUFBQSxRQVFBLE1BQUEsR0FBUyxDQUFDLGNBQWMsQ0FBQyxNQUFmLEdBQXdCLFdBQVcsQ0FBQyxNQUFyQyxDQUFBLEdBQStDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FSMUUsQ0FBQTtBQUFBLFFBVUEsY0FBYyxDQUFDLEtBQWYsR0FDQztBQUFBLFVBQUEsQ0FBQSxFQUFHLE1BQUg7QUFBQSxVQUNBLENBQUEsRUFBRyxNQURIO1NBWEQsQ0FBQTtBQUFBLFFBY0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxPQUFQLENBQWUsT0FBZixFQUF3QixjQUFjLENBQUMsS0FBdkMsQ0FkQSxDQUFBO0FBQUEsUUFlQSxJQUFDLENBQUEsS0FBSyxDQUFDLE9BQVAsQ0FBZSxRQUFmLEVBQXlCLGNBQWMsQ0FBQyxNQUF4QyxDQWZBLENBQUE7QUFBQSxRQWdCQSxJQUFDLENBQUEsS0FBSyxDQUFDLE9BQVAsQ0FBZSxPQUFmLEVBQXdCLGNBQWMsQ0FBQyxLQUF2QyxDQWhCQSxDQUFBO0FBQUEsUUFrQkEsSUFBQyxDQUFBLFdBQVcsQ0FBQyxHQUFiLENBQWlCLGFBQWpCLEVBQWdDLGNBQWhDLENBbEJBLENBQUE7ZUFvQkEsSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFQLENBQUEsRUFyQk87TUFBQSxDQXJFUixDQUFBOztBQUFBLGlDQTRGQSx3QkFBQSxHQUEwQixTQUFBLEdBQUE7ZUFDekIsSUFBQyxDQUFBLEtBQUssQ0FBQyxTQUFQLENBQ0M7QUFBQSxVQUFBLFFBQUEsRUFBVSxXQUFWO0FBQUEsVUFDQSxRQUFBLEVBQVUsU0FBQyxJQUFELEdBQUE7QUFFVCxnQkFBQSxrQkFBQTtBQUFBLFlBQUEsS0FBQSxHQUFRLElBQVIsQ0FBQTtBQUFBLFlBQ0EsV0FBQSxHQUFjLE1BQU0sQ0FBQyxJQUFQLENBQVksS0FBWixDQURkLENBQUE7bUJBRUEsQ0FBQSxDQUFFLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBdkIsQ0FBNEIsQ0FBQyxPQUE3QixDQUFxQyx5Q0FBckMsRUFKUztVQUFBLENBRFY7U0FERCxFQUR5QjtNQUFBLENBNUYxQixDQUFBOztBQUFBLGlDQXFHQSxRQUFBLEdBQVUsU0FBQyxVQUFELEVBQWEsZUFBYixFQUE4QixPQUE5QixHQUFBO0FBQ1QsWUFBQSxhQUFBO0FBQUEsUUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLG9CQUFaLENBQUEsQ0FBQTtBQUFBLFFBQ0EsTUFBQSxHQUFTLFVBQVUsQ0FBQyxNQUFYLENBQUEsQ0FEVCxDQUFBO0FBQUEsUUFFQSxLQUFBLEdBQVksSUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLE1BQWQsQ0FGWixDQUFBO2VBR0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsS0FBWCxFQUpTO01BQUEsQ0FyR1YsQ0FBQTs7QUFBQSxpQ0EyR0EsV0FBQSxHQUFhLFNBQUMsVUFBRCxFQUFhLGVBQWIsRUFBOEIsT0FBOUIsR0FBQTtBQUNaLFlBQUEsTUFBQTtBQUFBLFFBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxvQkFBWixDQUFBLENBQUE7QUFBQSxRQUNBLE1BQUEsR0FBUyxJQUFDLENBQUEsS0FBSyxDQUFDLFNBQVAsQ0FBQSxDQURULENBQUE7QUFFQSxRQUFBLElBQUcsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsQ0FBbkI7aUJBQ0MsTUFBTyxDQUFBLE1BQU0sQ0FBQyxNQUFQLEdBQWMsQ0FBZCxDQUFnQixDQUFDLE9BQXhCLENBQUEsRUFERDtTQUhZO01BQUEsQ0EzR2IsQ0FBQTs7QUFBQSxpQ0FpSEEsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNYLFlBQUEsWUFBQTtBQUFBLFFBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxVQUFaLENBQUEsQ0FBQTtBQUFBLFFBRUEsS0FBQSxHQUFRLElBQUMsQ0FBQSxLQUFLLENBQUMsUUFBUyxDQUFBLENBQUEsQ0FGeEIsQ0FBQTtBQUFBLFFBSUEsS0FBQSxHQUFZLElBQUEsT0FBTyxDQUFDLGNBQVIsQ0FDWDtBQUFBLFVBQUEsQ0FBQSxFQUFHLEdBQUcsQ0FBQyxTQUFKLENBQWMsQ0FBZCxFQUFpQixJQUFDLENBQUEsS0FBSyxDQUFDLFFBQVAsQ0FBQSxDQUFqQixDQUFIO0FBQUEsVUFDQSxDQUFBLEVBQUcsR0FBRyxDQUFDLFNBQUosQ0FBYyxDQUFkLEVBQWlCLElBQUMsQ0FBQSxLQUFLLENBQUMsU0FBUCxDQUFBLENBQWpCLENBREg7QUFBQSxVQUVBLEtBQUEsRUFBTyxHQUFHLENBQUMsU0FBSixDQUFjLENBQWQsRUFBaUIsQ0FBakIsQ0FGUDtBQUFBLFVBR0EsTUFBQSxFQUFRLEdBQUcsQ0FBQyxTQUFKLENBQWMsRUFBZCxFQUFrQixHQUFsQixDQUhSO0FBQUEsVUFJQSxPQUFBLEVBQVMsR0FBRyxDQUFDLFNBQUosQ0FBYyxDQUFkLEVBQWlCLEdBQWpCLENBSlQ7QUFBQSxVQUtBLFNBQUEsRUFBVyxHQUFHLENBQUMsU0FBSixDQUFjLENBQWQsRUFBaUIsR0FBakIsQ0FMWDtBQUFBLFVBTUEsUUFBQSxFQUFVLEdBQUcsQ0FBQyxTQUFKLENBQWMsQ0FBZCxFQUFpQixHQUFqQixDQU5WO0FBQUEsVUFPQSxPQUFBLEVBQVMsR0FBRyxDQUFDLFNBQUosQ0FBYyxHQUFkLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLENBUFQ7QUFBQSxVQVFBLFNBQUEsRUFBVyxJQVJYO1NBRFcsQ0FKWixDQUFBO0FBQUEsUUFjQSxLQUFLLENBQUMsR0FBTixDQUFVLEtBQVYsQ0FkQSxDQUFBO2VBZUEsS0FBSyxDQUFDLElBQU4sQ0FBQSxFQWhCVztNQUFBLENBakhaLENBQUE7O0FBQUEsaUNBb0lBLGFBQUEsR0FBZSxTQUFBLEdBQUE7QUFDZCxZQUFBLGFBQUE7QUFBQSxRQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksYUFBWixDQUFBLENBQUE7QUFBQSxRQUNBLEtBQUEsR0FBUSxJQUFDLENBQUEsS0FBSyxDQUFDLFFBQVMsQ0FBQSxDQUFBLENBRHhCLENBQUE7QUFBQSxRQUVBLE1BQUEsR0FBUyxLQUFLLENBQUMsUUFGZixDQUFBO0FBR0EsUUFBQSxJQUFHLE1BQUEsSUFBVyxNQUFNLENBQUMsTUFBUCxHQUFnQixDQUE5QjtBQUNDLFVBQUEsTUFBTyxDQUFBLE1BQU0sQ0FBQyxNQUFQLEdBQWMsQ0FBZCxDQUFnQixDQUFDLE9BQXhCLENBQUEsQ0FBQSxDQUFBO2lCQUNBLEtBQUssQ0FBQyxJQUFOLENBQUEsRUFGRDtTQUpjO01BQUEsQ0FwSWYsQ0FBQTs7QUFBQSxpQ0E0SUEsSUFBQSxHQUFNLFNBQUEsR0FBQTtlQUVMLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxDQUFBLEVBRks7TUFBQSxDQTVJTixDQUFBOzs4QkFBQTs7T0FEeUMsVUFBVSxDQUFDLFlBekI1QjtFQUFBLENBQTFCLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRfZWRpdG9yL0xheW91dC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkBhcHAubW9kdWxlICdDYXJkRWRpdG9yJywgKENhcmRFZGl0b3IpIC0+XG5cblx0I0RlZmluZSBlZGl0b3JzIGRhdGEgc3RydWNydXJlXG5cdGNsYXNzIEFic3RyYWN0U2hhcGVNb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsXG5cblx0Y2xhc3MgU2hhcGVDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuXHRcdG1vZGVsOiBBYnN0cmFjdFNoYXBlTW9kZWxcblxuXHRjbGFzcyBMYXllck1vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcblx0XHRkZWZhdWx0czpcblx0XHRcdGxheWVyTmFtZTogJ0RlZmF1bHQnXG5cdFx0XHRzaGFwZUNvbGxlY3Rpb246IG5ldyBTaGFwZUNvbGxlY3Rpb24oKVxuXG5cdGNsYXNzIExheWVyQ29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cblx0XHRtb2RlbDogTGF5ZXJNb2RlbFxuXG5cdGNsYXNzIEVkaXRvck1vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcblx0XHRkZWZhdWx0czpcblx0XHRcdGxheWVyQ29sbGVjdGlvbjogbmV3IExheWVyQ29sbGVjdGlvbigpXG5cblx0Y2xhc3MgRWRpdG9yU3RhdGUgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuXHRcdGRlZmF1bHRzOlxuXHRcdFx0Y3VycmVudExheWVyOiB7fVx0XHRcblxuXHQjIERlZmluZSBlZGl0b3JzIGxheW91dFx0XHRcblx0Y2xhc3MgQ2FyZEVkaXRvci5DYXJkRWRpdG9yTGF5b3V0IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG5cdFx0bG9nZ2luZzogb25cblx0XHRjb3VudGVyOiAwXG5cblx0XHRjbGFzc05hbWU6ICdjYXJkLWVkaXRvci1sYXlvdXQnXG5cblx0XHR1aTpcblx0XHRcdCdjYW52YXNDb250YWluZXInOiAnI2NhbnZhcy1jb250YWluZXInXG5cdFx0XHQnc2F2ZUltYWdlRmlsZUJ1dHRvbic6ICcuc2F2ZS10by1pbWFnZSdcblx0XHRcdFx0XHRcblx0XHRldmVudHM6XG5cdFx0XHQnY2xpY2sgQHVpLnNhdmVJbWFnZUZpbGVCdXR0b24nOiAnc2F2ZUdlbmVyYXRlZENhcmRUb0ltYWdlJ1xuXG5cdFx0cmVnaW9uczpcblx0XHRcdHBhbmVsMTogJyNwYW5lbC0xJ1xuXHRcdFx0cGFuZWwyOiAnI3BhbmVsLTInXG5cdFx0XHRwYW5lbDM6ICcjcGFuZWwtMydcblxuXG5cblx0XHRpbml0aWFsaXplOiAtPlxuXHRcdFx0QGJpbmQgJ2FsbCcsIC0+XG5cdFx0XHRcdGNvbnNvbGUubG9nIFwiQ0FSRCBFRElUT1IgTEFZT1VUOlxcdFwiLCBhcmd1bWVudHMgaWYgQGxvZ2dpbmcgaXMgb25cblxuXHRcdFx0QGVkaXRvclN0YXRlID0gbmV3IEVkaXRvclN0YXRlKClcblx0XHRcdEBtb2RlbCA9IG5ldyBFZGl0b3JNb2RlbCgpXG5cdFx0dGVtcGxhdGU6IChtb2RlbCkgLT5cblx0XHRcdHRlbXBsYXRpemVyLmNhcmRFZGl0b3IuZWRpdG9yIEBtb2RlbFxuXG5cdFx0b25TaG93OiA9PlxuXHRcdFx0QGxpc3RlblRvIGFwcCwgJ3Jlc2l6ZScsIEByZXNpemVcblxuXHRcdFx0I0RlZmluZSBLaW5ldGljIHN0YWdlXG5cdFx0XHRzdGFnZVdpZHRoID0gQHVpLmNhbnZhc0NvbnRhaW5lci53aWR0aCgpXG5cdFx0XHRzdGFnZUhlaWdodCA9IEB1aS5jYW52YXNDb250YWluZXIuaGVpZ2h0KClcblx0XHRcdEBzdGFnZSA9IG5ldyBLaW5ldGljLlN0YWdlXG5cdFx0XHRcdGNvbnRhaW5lcjogXCJjYW52YXMtY29udGFpbmVyXCJcblx0XHRcdFx0d2lkdGg6IHN0YWdlV2lkdGhcblx0XHRcdFx0aGVpZ2h0OiA2MDBcblx0XHRcdHN0YWdlUGFyYW1zID1cblx0XHRcdFx0c2NhbGU6IEBzdGFnZS5zY2FsZSgpXG5cdFx0XHRcdHdpZHRoOiBAdWkuY2FudmFzQ29udGFpbmVyLmlubmVyV2lkdGgoKVxuXHRcdFx0XHRoZWlnaHQ6IEB1aS5jYW52YXNDb250YWluZXIuaW5uZXJIZWlnaHQoKVxuXHRcdFx0QGVkaXRvclN0YXRlLnNldCAnc3RhZ2VQYXJhbXMnLCBzdGFnZVBhcmFtc1xuXHRcdFx0XG5cblx0XHRcdCMgRGVmaW5lIEdVSSBwYW5lbHMsIG11c3QgYmUgaW4gdGhlIGVuZCBvZiBzaG93aW5nIGxvZ2ljLCBiZWNhdXNlIG9mIGNhbnZhcyByZW5kZXJpbmdcblx0XHRcdEBwYW5lbDEuc2hvdyBuZXcgQ2FyZEVkaXRvci52aWV3cy5MYXllcnNQYW5lbCBcblx0XHRcdFx0c3RhdGU6IEBlZGl0b3JTdGF0ZVxuXHRcdFx0XHRtb2RlbDogQG1vZGVsXG5cdFx0XHRAcGFuZWwyLnNob3cgbmV3IENhcmRFZGl0b3Iudmlld3MuTGF5ZXJDaGlsZHNQYW5lbCBcblx0XHRcdFx0c3RhdGU6IEBlZGl0b3JTdGF0ZVxuXHRcdFx0XHRtb2RlbDogQG1vZGVsXG5cblxuXHRcdFx0QGxpc3RlblRvIEBtb2RlbCwgJ2NoYW5nZScsIEBkcmF3XG5cdFx0XHRAbGlzdGVuVG8gQG1vZGVsLmdldCgnbGF5ZXJDb2xsZWN0aW9uJyksICdhZGQnLCBAYWRkTGF5ZXJcblx0XHRcdEBsaXN0ZW5UbyBAbW9kZWwuZ2V0KCdsYXllckNvbGxlY3Rpb24nKSwgJ3JlbW92ZScsIEByZW1vdmVMYXllclxuXHRcdFx0QGxpc3RlblRvIEBtb2RlbC5nZXQoJ2xheWVyQ29sbGVjdGlvbicpLCAncmVzZXQgc2V0IHN5bmMgZmV0Y2gnLCBAZHJhd1xuXG5cdFx0XHQjIEFkZCBmaXJzdCBsYXllclxuXHRcdFx0QG1vZGVsLmdldCgnbGF5ZXJDb2xsZWN0aW9uJykuYWRkIGxheWVyTmFtZTogXCLQodC70L7QuSAjeyBAbW9kZWwuZ2V0KCdsYXllckNvbGxlY3Rpb24nKS5sZW5ndGgrMSB9XCIgaWYgQG1vZGVsLmdldCgnbGF5ZXJDb2xsZWN0aW9uJykubGVuZ3RoIGlzIDBcblx0XHRcdEBlZGl0b3JTdGF0ZS5zZXQgJ2N1cnJlbnRMYXllcicsIEBtb2RlbC5nZXQoJ2xheWVyQ29sbGVjdGlvbicpLm1vZGVsc1swXVxuXHRcdFx0Y29uc29sZS5sb2cgQGVkaXRvclN0YXRlLmdldCAnY3VycmVudExheWVyJ1xuXG5cdFx0XHRAbGlzdGVuVG8gQGVkaXRvclN0YXRlLmdldCgnY3VycmVudExheWVyJykuZ2V0KCdzaGFwZUNvbGxlY3Rpb24nKSwgJ2FkZCcsIEBvbkFkZFNoYXBlXG5cdFx0XHRAbGlzdGVuVG8gQGVkaXRvclN0YXRlLmdldCgnY3VycmVudExheWVyJykuZ2V0KCdzaGFwZUNvbGxlY3Rpb24nKSwgJ3JlbW92ZScsIEBvblJlbW92ZVNoYXBlXG5cdFx0XHRAbGlzdGVuVG8gQGVkaXRvclN0YXRlLmdldCgnY3VycmVudExheWVyJykuZ2V0KCdzaGFwZUNvbGxlY3Rpb24nKSwgJ3Jlc2V0IHNldCBzeW5jIGZldGNoJywgQGRyYXdcblxuXG5cdFx0cmVzaXplOiA9PlxuXHRcdFx0QHRyaWdnZXIgJ3Jlc2l6ZSdcblx0XHRcdHN0YWdlUGFyYW1zID0gQGVkaXRvclN0YXRlLmdldCAnc3RhZ2VQYXJhbXMnXG5cdFx0XHRuZXdTdGFnZVBhcmFtcyA9IHt9XG5cblx0XHRcdG5ld1N0YWdlUGFyYW1zLndpZHRoID0gQHVpLmNhbnZhc0NvbnRhaW5lci5pbm5lcldpZHRoKCkgIyBuZXcgd2lkdGggb2YgcGFnZVxuXHRcdFx0bmV3U3RhZ2VQYXJhbXMuaGVpZ2h0ID0gbmV3U3RhZ2VQYXJhbXMud2lkdGggKiAwLjU2MjUgIyBuZXcgaGVpZ2h0IG9mIHBhZ2VcblxuXHRcdFx0eFNjYWxlID0gKG5ld1N0YWdlUGFyYW1zLndpZHRoIC8gc3RhZ2VQYXJhbXMud2lkdGgpICogc3RhZ2VQYXJhbXMuc2NhbGUueCAjIHBlcmNlbnQgY2hhbmdlIGluIHdpZHRoIChFeDogMTAwMCAtIDQwMC8xMDAwIG1lYW5zIHRoZSBwYWdlIHNjYWxlZCBkb3duIDYwJSwgeW91IHNob3VsZCBwbGF5IHdpdGggdGhpcyB0byBnZXQgd2FudGVkIHJlc3VsdHMpXG5cdFx0XHR5U2NhbGUgPSAobmV3U3RhZ2VQYXJhbXMuaGVpZ2h0IC8gc3RhZ2VQYXJhbXMuaGVpZ2h0KSAqIHN0YWdlUGFyYW1zLnNjYWxlLnlcblx0XHRcdFxuXHRcdFx0bmV3U3RhZ2VQYXJhbXMuc2NhbGUgPVxuXHRcdFx0XHR4OiB4U2NhbGVcblx0XHRcdFx0eTogeVNjYWxlXG5cblx0XHRcdEBzdGFnZS5zZXRBdHRyIFwid2lkdGhcIiwgbmV3U3RhZ2VQYXJhbXMud2lkdGhcblx0XHRcdEBzdGFnZS5zZXRBdHRyIFwiaGVpZ2h0XCIsIG5ld1N0YWdlUGFyYW1zLmhlaWdodFxuXHRcdFx0QHN0YWdlLnNldEF0dHIgXCJzY2FsZVwiLCBuZXdTdGFnZVBhcmFtcy5zY2FsZVxuXG5cdFx0XHRAZWRpdG9yU3RhdGUuc2V0ICdzdGFnZVBhcmFtcycsIG5ld1N0YWdlUGFyYW1zXG5cblx0XHRcdEBzdGFnZS5kcmF3KClcblxuXHRcdHNhdmVHZW5lcmF0ZWRDYXJkVG9JbWFnZTogPT5cblx0XHRcdEBzdGFnZS50b0RhdGFVUkxcblx0XHRcdFx0bWl0ZVR5cGU6IFwiaW1hZ2UvcG5nXCJcblx0XHRcdFx0Y2FsbGJhY2s6IChkYXRhKSAtPlxuXHRcdFx0XHRcdCMgaW1hZ2UgPSBkYXRhLnJlcGxhY2UoXCJpbWFnZS9wbmdcIiwgXCJpbWFnZS9vY3RldC1zdHJlYW1cIilcblx0XHRcdFx0XHRpbWFnZSA9IGRhdGFcblx0XHRcdFx0XHRpbWFnZVdpbmRvdyA9IHdpbmRvdy5vcGVuKGltYWdlKVxuXHRcdFx0XHRcdCQoaW1hZ2VXaW5kb3cuZG9jdW1lbnQuYm9keSkucHJlcGVuZChcIjxwPtCd0LDQttC80LjRgtC1INGB0L7RhdGA0LDQvdC40YLRjCAoY3RybC9jbWQgKyBzKTwvcD5cIilcblxuXHRcdGFkZExheWVyOiAobGF5ZXJNb2RlbCwgbGF5ZXJDb2xsZWN0aW9uLCBvcHRpb25zKSA9PlxuXHRcdFx0Y29uc29sZS5sb2cgJ2FkZCBsYXllciB0byBzdGFnZSdcblx0XHRcdHBhcmFtcyA9IGxheWVyTW9kZWwudG9KU09OKClcblx0XHRcdGxheWVyID0gbmV3IEtpbmV0aWMuTGF5ZXIgcGFyYW1zXG5cdFx0XHRAc3RhZ2UuYWRkIGxheWVyXG5cblx0XHRyZW1vdmVMYXllcjogKGxheWVyTW9kZWwsIGxheWVyQ29sbGVjdGlvbiwgb3B0aW9ucykgPT5cblx0XHRcdGNvbnNvbGUubG9nICdhZGQgbGF5ZXIgdG8gc3RhZ2UnXG5cdFx0XHRsYXllcnMgPSBAc3RhZ2UuZ2V0TGF5ZXJzKClcblx0XHRcdGlmIGxheWVycy5sZW5ndGggPiAwXG5cdFx0XHRcdGxheWVyc1tsYXllcnMubGVuZ3RoLTFdLmRlc3Ryb3koKVxuXG5cdFx0b25BZGRTaGFwZTogPT5cblx0XHRcdGNvbnNvbGUubG9nICdhZGRTaGFwZSdcblxuXHRcdFx0bGF5ZXIgPSBAc3RhZ2UuY2hpbGRyZW5bMF1cblxuXHRcdFx0c2hhcGUgPSBuZXcgS2luZXRpYy5SZWd1bGFyUG9seWdvblxuXHRcdFx0XHR4OiBhcHAuZ2V0UmFuZG9tIDAsIEBzdGFnZS5nZXRXaWR0aCgpXG5cdFx0XHRcdHk6IGFwcC5nZXRSYW5kb20gMCwgQHN0YWdlLmdldEhlaWdodCgpXG5cdFx0XHRcdHNpZGVzOiBhcHAuZ2V0UmFuZG9tIDMsIDlcblx0XHRcdFx0cmFkaXVzOiBhcHAuZ2V0UmFuZG9tIDEwLCAxNDBcblx0XHRcdFx0ZmlsbFJlZDogYXBwLmdldFJhbmRvbSAxLCAyNTVcblx0XHRcdFx0ZmlsbEdyZWVuOiBhcHAuZ2V0UmFuZG9tIDEsIDI1NVxuXHRcdFx0XHRmaWxsQmx1ZTogYXBwLmdldFJhbmRvbSAxLCAyNTVcblx0XHRcdFx0b3BhY2l0eTogYXBwLmdldFJhbmRvbSAwLjEsIDEsIDJcblx0XHRcdFx0ZHJhZ2dhYmxlOiB0cnVlXG5cdFx0XHRsYXllci5hZGQgc2hhcGVcblx0XHRcdGxheWVyLmRyYXcoKVxuXG5cdFx0XHRcblx0XHRvblJlbW92ZVNoYXBlOiA9PlxuXHRcdFx0Y29uc29sZS5sb2cgJ3JlbW92ZVNoYXBlJ1xuXHRcdFx0bGF5ZXIgPSBAc3RhZ2UuY2hpbGRyZW5bMF1cblx0XHRcdHNoYXBlcyA9IGxheWVyLmNoaWxkcmVuXG5cdFx0XHRpZiBzaGFwZXMgYW5kIHNoYXBlcy5sZW5ndGggPiAwXG5cdFx0XHRcdHNoYXBlc1tzaGFwZXMubGVuZ3RoLTFdLmRlc3Ryb3koKVxuXHRcdFx0XHRsYXllci5kcmF3KClcdFxuXG5cdFx0ZHJhdzogPT5cblx0XHRcdCMgY29uc29sZS5sb2cgJ2VkaXRvciBtb2RlbCBjaGFuZ2VkLCBkcmF3ICcsIGFyZ3VtZW50c1xuXHRcdFx0QHN0YWdlLmRyYXcoKVxuIl19