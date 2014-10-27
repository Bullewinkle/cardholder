(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  this.app.module('CardEditorLayout', function(CardEditorLayout) {
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
    return CardEditorLayout.CardEditorLayoutLayout = (function(_super) {
      __extends(CardEditorLayoutLayout, _super);

      function CardEditorLayoutLayout() {
        this.draw = __bind(this.draw, this);
        this.onTextChange = __bind(this.onTextChange, this);
        this.drawRandomBackgroundButton = __bind(this.drawRandomBackgroundButton, this);
        this.onRemoveShape = __bind(this.onRemoveShape, this);
        this.onAddShape = __bind(this.onAddShape, this);
        this.removeLayer = __bind(this.removeLayer, this);
        this.addLayer = __bind(this.addLayer, this);
        this.saveGeneratedCardToImage = __bind(this.saveGeneratedCardToImage, this);
        this.resize = __bind(this.resize, this);
        this.addDrugHandler = __bind(this.addDrugHandler, this);
        this.onAddIcon = __bind(this.onAddIcon, this);
        this._showGuiPanels = __bind(this._showGuiPanels, this);
        this.onShow = __bind(this.onShow, this);
        return CardEditorLayoutLayout.__super__.constructor.apply(this, arguments);
      }

      CardEditorLayoutLayout.prototype.logging = true;

      CardEditorLayoutLayout.prototype.counter = 0;

      CardEditorLayoutLayout.prototype.className = 'card-editor-layout';

      CardEditorLayoutLayout.prototype.ui = {
        'canvasContainer': '#canvas-container',
        'drawRandomBackgroundButton': '.draw-random-background',
        'saveImageFileButton': '.save-to-image',
        'iconsContainer': '.icons-container'
      };

      CardEditorLayoutLayout.prototype.events = {
        'click @ui.drawRandomBackgroundButton': 'drawRandomBackgroundButton',
        'click @ui.saveImageFileButton': 'saveGeneratedCardToImage'
      };

      CardEditorLayoutLayout.prototype.regions = {
        layersPanelRegion: '#layers-panel-region',
        textPanelRegion: '#text-panel-region',
        shapesPanelRegion: '#shapes-panel-region',
        iconsPanelRegion: '#icons-panel-region',
        backgroundsPanelRegion: '#backgrounds-panel-region'
      };

      CardEditorLayoutLayout.prototype.initialize = function() {
        this.bind('all', function() {
          if (this.logging === true) {
            return console.log("CARD EDITOR LAYOUT:\t", arguments);
          }
        });
        this.editorState = new EditorState();
        return this.model = new EditorModel();
      };

      CardEditorLayoutLayout.prototype.template = function() {
        return templatizer.cardEditor.editor(this.model);
      };

      CardEditorLayoutLayout.prototype.onShow = function() {
        var layer, stageHeight, stageParams, stageWidth;
        this.listenTo(app, 'resize', this.resize);
        stageWidth = this.ui.canvasContainer.width();
        stageHeight = this.ui.canvasContainer.height();
        this.stage = new Kinetic.Stage({
          container: "canvas-container",
          width: stageWidth,
          height: stageWidth * 0.5625
        });
        stageParams = {
          scale: this.stage.scale(),
          width: this.ui.canvasContainer.innerWidth(),
          height: this.ui.canvasContainer.innerHeight()
        };
        this.editorState.set('stageParams', stageParams);
        this._showGuiPanels();
        this.listenTo(this.model, 'change', this.draw);
        this.listenTo(this.model.get('layerCollection'), 'add', this.addLayer);
        this.listenTo(this.model.get('layerCollection'), 'remove', this.removeLayer);
        this.listenTo(this.model.get('layerCollection'), 'reset set sync fetch', this.draw);
        if (this.model.get('layerCollection').length === 0) {
          this.model.get('layerCollection').add({
            layerName: "Фон"
          });
        }
        if (this.model.get('layerCollection').length === 1) {
          this.model.get('layerCollection').add({
            layerName: "Слой " + (this.model.get('layerCollection').length)
          });
        }
        this.editorState.set('currentLayer', this.model.get('layerCollection').models[0]);
        console.log('current layer', this.editorState.get('currentLayer'));
        layer = this.stage.children[0];
        if (layer && layer.canvas) {
          app.shared.generators.gradientGen.draw(layer.canvas._canvas, new app.Cards.CardModel());
        }
        this.listenTo(this.editorState.get('currentLayer').get('shapeCollection'), 'add', this.onAddShape);
        this.listenTo(this.editorState.get('currentLayer').get('shapeCollection'), 'remove', this.onRemoveShape);
        this.listenTo(this.editorState.get('currentLayer').get('shapeCollection'), 'reset set sync fetch', this.draw);
        this.draw();
        return this.textPanelRegion.currentView.model.set('name', 'Семен');
      };

      CardEditorLayoutLayout.prototype._showGuiPanels = function() {
        this.layersPanelRegion.show(new CardEditorLayout.views.LayersPanel({
          state: this.editorState,
          model: this.model
        }));
        this.textPanelRegion.show(new CardEditorLayout.views.TextPanel({
          state: this.editorState,
          model: this.model
        }));
        this.listenTo(this.textPanelRegion.currentView, 'text:changed', this.onTextChange);
        this.shapesPanelRegion.show(new CardEditorLayout.views.LayerChildsPanel({
          state: this.editorState,
          model: this.model
        }));
        this.iconsPanelRegion.show(new CardEditorLayout.views.IconsPanel({
          state: this.editorState,
          model: this.model
        }));
        this.listenTo(this.iconsPanelRegion.currentView, 'childview:click:icon', this.onAddIcon);
        return this.backgroundsPanelRegion.show(new CardEditorLayout.views.BackgroundsPanel({
          state: this.editorState,
          model: this.model
        }));
      };

      CardEditorLayoutLayout.prototype.onAddIcon = function() {
        var args, icon, iconGroup, layer, options, view;
        view = arguments[0], options = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
        layer = this.stage.children[this.stage.children.length - 2];
        iconGroup = new Kinetic.Group({
          draggable: true
        });
        icon = new Kinetic.Text({
          x: (this.stage.getWidth() / 2) - 100,
          y: (this.stage.getHeight() / 2) - 100,
          text: options.model.get('content'),
          fontSize: 120,
          fontFamily: 'cardholder-icons',
          fillRed: app.getRandom(1, 255),
          fillGreen: app.getRandom(1, 255),
          fillBlue: app.getRandom(1, 255),
          width: 120,
          height: 120,
          align: 'center'
        });
        iconGroup.add(icon);
        this.addDrugHandler(iconGroup, icon.getX() + icon.getWidth(), icon.getY(), 'first');
        layer.add(iconGroup);
        return layer.draw();
      };

      CardEditorLayoutLayout.prototype.addDrugHandler = function(group, x, y, name) {
        var drugHandler, layer, stage;
        stage = group.getStage();
        layer = group.getLayer();
        drugHandler = new Kinetic.Circle({
          x: x,
          y: y,
          stroke: '#666',
          fill: '#ddd',
          strokeWidth: 2,
          radius: 8,
          name: name,
          draggable: true,
          dragOnTop: false
        });
        drugHandler.on('dragmove', function() {
          return console.log('dragmove');
        });
        drugHandler.on('mousedown touchstart', function() {
          return console.log('mousedown touchstart');
        });
        drugHandler.on('dragend', function() {
          return console.log('dragend');
        });
        drugHandler.on('mouseover', function() {
          return console.log('mouseover');
        });
        drugHandler.on('mouseout', function() {
          return console.log('mouseout');
        });
        return group.add(drugHandler);
      };

      CardEditorLayoutLayout.prototype.resize = function() {
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
        this.stage.setWidth(newStageParams.width);
        this.stage.setHeight(newStageParams.height);
        this.stage.setScale(newStageParams.scale);
        this.editorState.set('stageParams', newStageParams);
        return this.draw();
      };

      CardEditorLayoutLayout.prototype.saveGeneratedCardToImage = function() {
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

      CardEditorLayoutLayout.prototype.addLayer = function(layerModel, layerCollection, options) {
        var layer, params;
        console.log('add layer to stage');
        params = layerModel.toJSON();
        layer = new Kinetic.Layer(params);
        return this.stage.add(layer);
      };

      CardEditorLayoutLayout.prototype.removeLayer = function(layerModel, layerCollection, options) {
        var layers;
        console.log('add layer to stage');
        layers = this.stage.getLayers();
        if (layers.length > 1) {
          return layers[layers.length - 1].destroy();
        }
      };

      CardEditorLayoutLayout.prototype.onAddShape = function() {
        var layer, shape;
        console.log('addShape');
        layer = this.stage.children[this.stage.children.length - 1];
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

      CardEditorLayoutLayout.prototype.onRemoveShape = function() {
        var layer, shapes;
        console.log('removeShape');
        layer = this.stage.children[this.stage.children.length - 1];
        shapes = layer.children;
        if (shapes && shapes.length > 0) {
          shapes[shapes.length - 1].destroy();
          return layer.draw();
        }
      };

      CardEditorLayoutLayout.prototype.drawRandomBackgroundButton = function() {
        this.stage.background = new app.Cards.CardModel();
        return this.draw();
      };

      CardEditorLayoutLayout.prototype.onTextChange = function(text) {
        var cardText;
        console.info(text);
        if (!this.textLayer) {
          this.textLayer = new Kinetic.Layer();
          this.stage.add(this.textLayer);
        }
        console.log(this.textLayer);
        if (!this.textLayer.children[0]) {
          cardText = new Kinetic.Text({
            x: 20,
            y: 20,
            fontSize: 22,
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fill: '#333',
            width: this.stage.width() / 1.25,
            padding: 20,
            align: 'left',
            draggable: true
          });
          this.textLayer.add(cardText);
        } else {
          cardText = this.textLayer.children[0];
        }
        console.log(cardText);
        cardText.setText("Имя: \t\t" + text.name + " \nФамилия: \t\t" + text.surname + " \nEmail: \t\t" + text.email + " \nТелефон: \t\t" + text.phone + " \nДолжность: \t\t" + text.position);
        return this.textLayer.draw();
      };

      CardEditorLayoutLayout.prototype.draw = function() {
        var layer;
        this.trigger('draw');
        this.stage.draw();
        layer = this.stage.children[0];
        this.stage.background = this.stage.background || new app.Cards.CardModel();
        if (layer && layer.canvas) {
          return app.shared.generators.gradientGen.draw(layer.canvas._canvas, this.stage.background);
        }
      };

      return CardEditorLayoutLayout;

    })(Marionette.LayoutView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRFZGl0b3IvQ2FyZEVkaXRvci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOzs7c0JBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxrQkFBWixFQUFnQyxTQUFDLGdCQUFELEdBQUE7QUFHL0IsUUFBQSwwRkFBQTtBQUFBLElBQU07QUFBTiwyQ0FBQSxDQUFBOzs7O09BQUE7O2dDQUFBOztPQUFpQyxRQUFRLENBQUMsTUFBMUMsQ0FBQTtBQUFBLElBRU07QUFDTCx3Q0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsZ0NBQUEsS0FBQSxHQUFPLGtCQUFQLENBQUE7OzZCQUFBOztPQUQ2QixRQUFRLENBQUMsV0FGdkMsQ0FBQTtBQUFBLElBS007QUFDTCxtQ0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsMkJBQUEsUUFBQSxHQUNDO0FBQUEsUUFBQSxTQUFBLEVBQVcsU0FBWDtBQUFBLFFBQ0EsZUFBQSxFQUFxQixJQUFBLGVBQUEsQ0FBQSxDQURyQjtPQURELENBQUE7O3dCQUFBOztPQUR3QixRQUFRLENBQUMsTUFMbEMsQ0FBQTtBQUFBLElBVU07QUFDTCx3Q0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsZ0NBQUEsS0FBQSxHQUFPLFVBQVAsQ0FBQTs7NkJBQUE7O09BRDZCLFFBQVEsQ0FBQyxXQVZ2QyxDQUFBO0FBQUEsSUFhTTtBQUNMLG9DQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSw0QkFBQSxRQUFBLEdBQ0M7QUFBQSxRQUFBLGVBQUEsRUFBcUIsSUFBQSxlQUFBLENBQUEsQ0FBckI7T0FERCxDQUFBOzt5QkFBQTs7T0FEeUIsUUFBUSxDQUFDLE1BYm5DLENBQUE7QUFBQSxJQWlCTTtBQUNMLG9DQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSw0QkFBQSxRQUFBLEdBQ0M7QUFBQSxRQUFBLFlBQUEsRUFBYyxFQUFkO09BREQsQ0FBQTs7eUJBQUE7O09BRHlCLFFBQVEsQ0FBQyxNQWpCbkMsQ0FBQTtX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QVMsQ0FBQyxJQUFYLENBQUEsRUEvQmE7TUFBQSxDQXJRZCxDQUFBOztBQUFBLHVDQXVTQSxJQUFBLEdBQU0sU0FBQSxHQUFBO0FBQ0wsWUFBQSxLQUFBO0FBQUEsUUFBQSxJQUFDLENBQUEsT0FBRCxDQUFTLE1BQVQsQ0FBQSxDQUFBO0FBQUEsUUFPQSxJQUFDLENBQUEsS0FBSyxDQUFDLElBQVAsQ0FBQSxDQVBBLENBQUE7QUFBQSxRQVFBLEtBQUEsR0FBUSxJQUFDLENBQUEsS0FBSyxDQUFDLFFBQVMsQ0FBQSxDQUFBLENBUnhCLENBQUE7QUFBQSxRQVNBLElBQUMsQ0FBQSxLQUFLLENBQUMsVUFBUCxHQUFvQixJQUFDLENBQUEsS0FBSyxDQUFDLFVBQVAsSUFBeUIsSUFBQSxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVYsQ0FBQSxDQVQ3QyxDQUFBO0FBVUEsUUFBQSxJQUFHLEtBQUEsSUFBVSxLQUFLLENBQUMsTUFBbkI7aUJBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQWxDLENBQXVDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBcEQsRUFBNkQsSUFBQyxDQUFBLEtBQUssQ0FBQyxVQUFwRSxFQUREO1NBWEs7TUFBQSxDQXZTTixDQUFBOztvQ0FBQTs7T0FEcUQsVUFBVSxDQUFDLFlBekJsQztFQUFBLENBQWhDLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRFZGl0b3IvQ2FyZEVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkBhcHAubW9kdWxlICdDYXJkRWRpdG9yTGF5b3V0JywgKENhcmRFZGl0b3JMYXlvdXQpIC0+XG5cblx0I0RlZmluZSBlZGl0b3JzIGRhdGEgc3RydWNydXJlXG5cdGNsYXNzIEFic3RyYWN0U2hhcGVNb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsXG5cblx0Y2xhc3MgU2hhcGVDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuXHRcdG1vZGVsOiBBYnN0cmFjdFNoYXBlTW9kZWxcblxuXHRjbGFzcyBMYXllck1vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcblx0XHRkZWZhdWx0czpcblx0XHRcdGxheWVyTmFtZTogJ0RlZmF1bHQnXG5cdFx0XHRzaGFwZUNvbGxlY3Rpb246IG5ldyBTaGFwZUNvbGxlY3Rpb24oKVxuXG5cdGNsYXNzIExheWVyQ29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cblx0XHRtb2RlbDogTGF5ZXJNb2RlbFxuXG5cdGNsYXNzIEVkaXRvck1vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcblx0XHRkZWZhdWx0czpcblx0XHRcdGxheWVyQ29sbGVjdGlvbjogbmV3IExheWVyQ29sbGVjdGlvbigpXG5cblx0Y2xhc3MgRWRpdG9yU3RhdGUgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuXHRcdGRlZmF1bHRzOlxuXHRcdFx0Y3VycmVudExheWVyOiB7fVx0XHRcblxuXHQjIERlZmluZSBlZGl0b3JzIGxheW91dFx0XHRcblx0Y2xhc3MgQ2FyZEVkaXRvckxheW91dC5DYXJkRWRpdG9yTGF5b3V0TGF5b3V0IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG5cdFx0bG9nZ2luZzogb25cblx0XHRjb3VudGVyOiAwXG5cblx0XHRjbGFzc05hbWU6ICdjYXJkLWVkaXRvci1sYXlvdXQnXG5cblx0XHR1aTpcblx0XHRcdCdjYW52YXNDb250YWluZXInOiAnI2NhbnZhcy1jb250YWluZXInXG5cdFx0XHQnZHJhd1JhbmRvbUJhY2tncm91bmRCdXR0b24nOiAnLmRyYXctcmFuZG9tLWJhY2tncm91bmQnXG5cdFx0XHQnc2F2ZUltYWdlRmlsZUJ1dHRvbic6ICcuc2F2ZS10by1pbWFnZSdcblx0XHRcdCdpY29uc0NvbnRhaW5lcic6ICcuaWNvbnMtY29udGFpbmVyJ1xuXHRcdFx0XHRcdFxuXHRcdGV2ZW50czpcblx0XHRcdCdjbGljayBAdWkuZHJhd1JhbmRvbUJhY2tncm91bmRCdXR0b24nOiAnZHJhd1JhbmRvbUJhY2tncm91bmRCdXR0b24nXG5cdFx0XHQnY2xpY2sgQHVpLnNhdmVJbWFnZUZpbGVCdXR0b24nOiAnc2F2ZUdlbmVyYXRlZENhcmRUb0ltYWdlJ1xuXG5cdFx0cmVnaW9uczpcblx0XHRcdGxheWVyc1BhbmVsUmVnaW9uOiAnI2xheWVycy1wYW5lbC1yZWdpb24nXG5cdFx0XHR0ZXh0UGFuZWxSZWdpb246ICcjdGV4dC1wYW5lbC1yZWdpb24nXG5cdFx0XHRzaGFwZXNQYW5lbFJlZ2lvbjogJyNzaGFwZXMtcGFuZWwtcmVnaW9uJ1xuXHRcdFx0aWNvbnNQYW5lbFJlZ2lvbjogJyNpY29ucy1wYW5lbC1yZWdpb24nXG5cdFx0XHRiYWNrZ3JvdW5kc1BhbmVsUmVnaW9uOiAnI2JhY2tncm91bmRzLXBhbmVsLXJlZ2lvbidcblxuXHRcdGluaXRpYWxpemU6IC0+XG5cdFx0XHRAYmluZCAnYWxsJywgLT5cblx0XHRcdFx0Y29uc29sZS5sb2cgXCJDQVJEIEVESVRPUiBMQVlPVVQ6XFx0XCIsIGFyZ3VtZW50cyBpZiBAbG9nZ2luZyBpcyBvblxuXG5cdFx0XHRAZWRpdG9yU3RhdGUgPSBuZXcgRWRpdG9yU3RhdGUoKVxuXHRcdFx0QG1vZGVsID0gbmV3IEVkaXRvck1vZGVsKClcblx0XHR0ZW1wbGF0ZTogLT5cblx0XHRcdHRlbXBsYXRpemVyLmNhcmRFZGl0b3IuZWRpdG9yIEBtb2RlbFxuXG5cdFx0b25TaG93OiA9PlxuXHRcdFx0QGxpc3RlblRvIGFwcCwgJ3Jlc2l6ZScsIEByZXNpemVcblxuXHRcdFx0I0RlZmluZSBLaW5ldGljIHN0YWdlXG5cdFx0XHRzdGFnZVdpZHRoID0gQHVpLmNhbnZhc0NvbnRhaW5lci53aWR0aCgpXG5cdFx0XHRzdGFnZUhlaWdodCA9IEB1aS5jYW52YXNDb250YWluZXIuaGVpZ2h0KClcblx0XHRcdEBzdGFnZSA9IG5ldyBLaW5ldGljLlN0YWdlXG5cdFx0XHRcdGNvbnRhaW5lcjogXCJjYW52YXMtY29udGFpbmVyXCJcblx0XHRcdFx0d2lkdGg6IHN0YWdlV2lkdGhcblx0XHRcdFx0aGVpZ2h0OiBzdGFnZVdpZHRoICogMC41NjI1XG5cdFx0XHRzdGFnZVBhcmFtcyA9XG5cdFx0XHRcdHNjYWxlOiBAc3RhZ2Uuc2NhbGUoKVxuXHRcdFx0XHR3aWR0aDogQHVpLmNhbnZhc0NvbnRhaW5lci5pbm5lcldpZHRoKClcblx0XHRcdFx0aGVpZ2h0OiBAdWkuY2FudmFzQ29udGFpbmVyLmlubmVySGVpZ2h0KClcblx0XHRcdEBlZGl0b3JTdGF0ZS5zZXQgJ3N0YWdlUGFyYW1zJywgc3RhZ2VQYXJhbXNcblxuXHRcdFx0IyBEZWZpbmUgR1VJIHBhbmVscywgbXVzdCBiZSBpbiB0aGUgZW5kIG9mIHNob3dpbmcgbG9naWMsIGJlY2F1c2Ugb2YgY2FudmFzIHJlbmRlcmluZ1xuXHRcdFx0QF9zaG93R3VpUGFuZWxzKClcblxuXHRcdFx0QGxpc3RlblRvIEBtb2RlbCwgJ2NoYW5nZScsIEBkcmF3XG5cdFx0XHRAbGlzdGVuVG8gQG1vZGVsLmdldCgnbGF5ZXJDb2xsZWN0aW9uJyksICdhZGQnLCBAYWRkTGF5ZXJcblx0XHRcdEBsaXN0ZW5UbyBAbW9kZWwuZ2V0KCdsYXllckNvbGxlY3Rpb24nKSwgJ3JlbW92ZScsIEByZW1vdmVMYXllclxuXHRcdFx0QGxpc3RlblRvIEBtb2RlbC5nZXQoJ2xheWVyQ29sbGVjdGlvbicpLCAncmVzZXQgc2V0IHN5bmMgZmV0Y2gnLCBAZHJhd1xuXG5cdFx0XHQjIEFkZCBmaXJzdCBsYXllcnNcblx0XHRcdEBtb2RlbC5nZXQoJ2xheWVyQ29sbGVjdGlvbicpLmFkZCBsYXllck5hbWU6IFwi0KTQvtC9XCIgaWYgQG1vZGVsLmdldCgnbGF5ZXJDb2xsZWN0aW9uJykubGVuZ3RoIGlzIDBcblx0XHRcdEBtb2RlbC5nZXQoJ2xheWVyQ29sbGVjdGlvbicpLmFkZCBsYXllck5hbWU6IFwi0KHQu9C+0LkgI3sgQG1vZGVsLmdldCgnbGF5ZXJDb2xsZWN0aW9uJykubGVuZ3RoIH1cIiBpZiBAbW9kZWwuZ2V0KCdsYXllckNvbGxlY3Rpb24nKS5sZW5ndGggaXMgMVxuXHRcdFx0QGVkaXRvclN0YXRlLnNldCAnY3VycmVudExheWVyJywgQG1vZGVsLmdldCgnbGF5ZXJDb2xsZWN0aW9uJykubW9kZWxzWzBdXG5cdFx0XHRjb25zb2xlLmxvZyAnY3VycmVudCBsYXllcicsQGVkaXRvclN0YXRlLmdldCAnY3VycmVudExheWVyJ1xuXHRcdFx0XG5cdFx0XHRsYXllciA9IEBzdGFnZS5jaGlsZHJlblswXVxuXHRcdFx0aWYgbGF5ZXIgYW5kIGxheWVyLmNhbnZhc1xuXHRcdFx0XHRhcHAuc2hhcmVkLmdlbmVyYXRvcnMuZ3JhZGllbnRHZW4uZHJhdyhsYXllci5jYW52YXMuX2NhbnZhcywgKG5ldyBhcHAuQ2FyZHMuQ2FyZE1vZGVsKCkpKVxuXG5cdFx0XHRAbGlzdGVuVG8gQGVkaXRvclN0YXRlLmdldCgnY3VycmVudExheWVyJykuZ2V0KCdzaGFwZUNvbGxlY3Rpb24nKSwgJ2FkZCcsIEBvbkFkZFNoYXBlXG5cdFx0XHRAbGlzdGVuVG8gQGVkaXRvclN0YXRlLmdldCgnY3VycmVudExheWVyJykuZ2V0KCdzaGFwZUNvbGxlY3Rpb24nKSwgJ3JlbW92ZScsIEBvblJlbW92ZVNoYXBlXG5cdFx0XHRAbGlzdGVuVG8gQGVkaXRvclN0YXRlLmdldCgnY3VycmVudExheWVyJykuZ2V0KCdzaGFwZUNvbGxlY3Rpb24nKSwgJ3Jlc2V0IHNldCBzeW5jIGZldGNoJywgQGRyYXdcblxuXHRcdFx0IyBpY29ucy1jb250YWluZXJcblx0XHRcdEBkcmF3KClcblxuXHRcdFx0IyBTSE9XIEZJWEVTXG5cdFx0XHQjIHJhbmRvbUljb24gPSBhcHAuZ2V0UmFuZG9tKDAsIEBpY29uc1BhbmVsUmVnaW9uLmN1cnJlbnRWaWV3LmNoaWxkcmVuLmxlbmd0aC0xKVxuXHRcdFx0IyBjb25zb2xlLmxvZyBAaWNvbnNQYW5lbFJlZ2lvbi5jdXJyZW50Vmlldy5jaGlsZHJlbiwgXCJ2aWV3I3tyYW5kb21JY29ufVwiXG5cdFx0XHQjIEBpY29uc1BhbmVsUmVnaW9uLmN1cnJlbnRWaWV3LmNoaWxkcmVuLnRvQXJyYXkoKVtyYW5kb21JY29uXS4kZWwudHJpZ2dlcignY2xpY2snKVxuXHRcdFx0QHRleHRQYW5lbFJlZ2lvbi5jdXJyZW50Vmlldy5tb2RlbC5zZXQgJ25hbWUnLCAn0KHQtdC80LXQvSdcblxuXHRcdF9zaG93R3VpUGFuZWxzOiA9PlxuXHRcdFx0QGxheWVyc1BhbmVsUmVnaW9uLnNob3cgbmV3IENhcmRFZGl0b3JMYXlvdXQudmlld3MuTGF5ZXJzUGFuZWwgXG5cdFx0XHRcdHN0YXRlOiBAZWRpdG9yU3RhdGVcblx0XHRcdFx0bW9kZWw6IEBtb2RlbFxuXG5cdFx0XHRAdGV4dFBhbmVsUmVnaW9uLnNob3cgbmV3IENhcmRFZGl0b3JMYXlvdXQudmlld3MuVGV4dFBhbmVsIFxuXHRcdFx0XHRzdGF0ZTogQGVkaXRvclN0YXRlXG5cdFx0XHRcdG1vZGVsOiBAbW9kZWxcblx0XHRcdEBsaXN0ZW5UbyBAdGV4dFBhbmVsUmVnaW9uLmN1cnJlbnRWaWV3LCAndGV4dDpjaGFuZ2VkJywgQG9uVGV4dENoYW5nZVxuXG5cdFx0XHRAc2hhcGVzUGFuZWxSZWdpb24uc2hvdyBuZXcgQ2FyZEVkaXRvckxheW91dC52aWV3cy5MYXllckNoaWxkc1BhbmVsIFxuXHRcdFx0XHRzdGF0ZTogQGVkaXRvclN0YXRlXG5cdFx0XHRcdG1vZGVsOiBAbW9kZWxcblxuXHRcdFx0QGljb25zUGFuZWxSZWdpb24uc2hvdyBuZXcgQ2FyZEVkaXRvckxheW91dC52aWV3cy5JY29uc1BhbmVsIFxuXHRcdFx0XHRzdGF0ZTogQGVkaXRvclN0YXRlXG5cdFx0XHRcdG1vZGVsOiBAbW9kZWxcblx0XHRcdEBsaXN0ZW5UbyBAaWNvbnNQYW5lbFJlZ2lvbi5jdXJyZW50VmlldywgJ2NoaWxkdmlldzpjbGljazppY29uJywgQG9uQWRkSWNvblxuXG5cdFx0XHQjIGRlYnVnZ2VyO1xuXHRcdFx0QGJhY2tncm91bmRzUGFuZWxSZWdpb24uc2hvdyBuZXcgQ2FyZEVkaXRvckxheW91dC52aWV3cy5CYWNrZ3JvdW5kc1BhbmVsXG5cdFx0XHRcdHN0YXRlOiBAZWRpdG9yU3RhdGVcblx0XHRcdFx0bW9kZWw6IEBtb2RlbFxuXG5cdFx0b25BZGRJY29uOiAodmlldywgb3B0aW9ucywgYXJncy4uLikgPT5cblx0XHRcdGxheWVyID0gQHN0YWdlLmNoaWxkcmVuW0BzdGFnZS5jaGlsZHJlbi5sZW5ndGgtMl1cblxuXHRcdFx0IyBzaGFwZSA9IG5ldyBLaW5ldGljLlJlZ3VsYXJQb2x5Z29uXG5cdFx0XHQjIFx0eDogYXBwLmdldFJhbmRvbSAwLCBAc3RhZ2UuZ2V0V2lkdGgoKVxuXHRcdFx0IyBcdHk6IGFwcC5nZXRSYW5kb20gMCwgQHN0YWdlLmdldEhlaWdodCgpXG5cdFx0XHQjIFx0c2lkZXM6IGFwcC5nZXRSYW5kb20gMywgOVxuXHRcdFx0IyBcdHJhZGl1czogYXBwLmdldFJhbmRvbSAxMCwgMTQwXG5cdFx0XHRcdCMgZmlsbFJlZDogYXBwLmdldFJhbmRvbSAxLCAyNTVcblx0XHRcdFx0IyBmaWxsR3JlZW46IGFwcC5nZXRSYW5kb20gMSwgMjU1XG5cdFx0XHRcdCMgZmlsbEJsdWU6IGFwcC5nZXRSYW5kb20gMSwgMjU1XG5cdFx0XHQjIFx0b3BhY2l0eTogYXBwLmdldFJhbmRvbSAwLjEsIDEsIDJcblx0XHRcdCMgXHRkcmFnZ2FibGU6IHRydWVcblxuXHRcdFx0aWNvbkdyb3VwID0gbmV3IEtpbmV0aWMuR3JvdXBcblx0XHRcdFx0ZHJhZ2dhYmxlOiB0cnVlXG5cblx0XHRcdGljb24gPSBuZXcgS2luZXRpYy5UZXh0XG5cdFx0XHRcdHg6IChAc3RhZ2UuZ2V0V2lkdGgoKS8yKS0xMDBcblx0XHRcdFx0eTogKEBzdGFnZS5nZXRIZWlnaHQoKS8yKS0xMDBcblx0XHRcdFx0dGV4dDogb3B0aW9ucy5tb2RlbC5nZXQgJ2NvbnRlbnQnXG5cdFx0XHRcdGZvbnRTaXplOiAxMjBcblx0XHRcdFx0Zm9udEZhbWlseTogJ2NhcmRob2xkZXItaWNvbnMnXG5cdFx0XHRcdGZpbGxSZWQ6IGFwcC5nZXRSYW5kb20gMSwgMjU1XG5cdFx0XHRcdGZpbGxHcmVlbjogYXBwLmdldFJhbmRvbSAxLCAyNTVcblx0XHRcdFx0ZmlsbEJsdWU6IGFwcC5nZXRSYW5kb20gMSwgMjU1XG5cdFx0XHRcdHdpZHRoOiAxMjBcblx0XHRcdFx0aGVpZ2h0OiAxMjBcblx0XHRcdFx0YWxpZ246ICdjZW50ZXInXG5cblxuXG5cdFx0XHRpY29uR3JvdXAuYWRkIGljb25cblx0XHRcdFxuXHRcdFx0QGFkZERydWdIYW5kbGVyKGljb25Hcm91cCwgaWNvbi5nZXRYKCkraWNvbi5nZXRXaWR0aCgpLCBpY29uLmdldFkoKSwgJ2ZpcnN0JylcblxuXHRcdFx0bGF5ZXIuYWRkIGljb25Hcm91cFxuXHRcdFx0bGF5ZXIuZHJhdygpXG5cblx0XHRhZGREcnVnSGFuZGxlcjogKGdyb3VwLCB4LCB5LCBuYW1lKSA9PlxuXHRcdFx0c3RhZ2UgPSBncm91cC5nZXRTdGFnZSgpXG5cdFx0XHRsYXllciA9IGdyb3VwLmdldExheWVyKClcblxuXHRcdFx0ZHJ1Z0hhbmRsZXIgPSBuZXcgS2luZXRpYy5DaXJjbGVcblx0XHRcdFx0eDogeFxuXHRcdFx0XHR5OiB5XG5cdFx0XHRcdHN0cm9rZTogJyM2NjYnXG5cdFx0XHRcdGZpbGw6ICcjZGRkJ1xuXHRcdFx0XHRzdHJva2VXaWR0aDogMlxuXHRcdFx0XHRyYWRpdXM6IDhcblx0XHRcdFx0bmFtZTogbmFtZVxuXHRcdFx0XHRkcmFnZ2FibGU6IHRydWVcblx0XHRcdFx0ZHJhZ09uVG9wOiBmYWxzZVxuXG5cdFx0XHRkcnVnSGFuZGxlci5vbiAnZHJhZ21vdmUnLCAtPlxuXHRcdFx0XHRjb25zb2xlLmxvZyAnZHJhZ21vdmUnXG5cdFx0XHQjIFx0dXBkYXRlKHRoaXMpXG5cdFx0XHQjIFx0bGF5ZXIuZHJhdygpXG5cdFx0XHRkcnVnSGFuZGxlci5vbiAnbW91c2Vkb3duIHRvdWNoc3RhcnQnLCAtPlxuXHRcdFx0XHRjb25zb2xlLmxvZyAnbW91c2Vkb3duIHRvdWNoc3RhcnQnXG5cdFx0XHQjIFx0Z3JvdXAuc2V0RHJhZ2dhYmxlKGZhbHNlKVxuXHRcdFx0IyBcdHRoaXMubW92ZVRvVG9wKClcblx0XHRcdGRydWdIYW5kbGVyLm9uICdkcmFnZW5kJywgLT5cblx0XHRcdFx0Y29uc29sZS5sb2cgJ2RyYWdlbmQnXG5cdFx0XHQjIFx0Z3JvdXAuc2V0RHJhZ2dhYmxlKHRydWUpXG5cdFx0XHQjIFx0bGF5ZXIuZHJhdygpXG5cdFx0XHRkcnVnSGFuZGxlci5vbiAnbW91c2VvdmVyJywgLT5cblx0XHRcdFx0Y29uc29sZS5sb2cgJ21vdXNlb3Zlcidcblx0XHRcdCMgXHR2YXIgbGF5ZXIgPSB0aGlzLmdldExheWVyKClcblx0XHRcdCMgXHRkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJ1xuXHRcdFx0IyBcdHRoaXMuc2V0U3Ryb2tlV2lkdGgoNClcblx0XHRcdCMgXHRsYXllci5kcmF3KClcblx0XHRcdGRydWdIYW5kbGVyLm9uICdtb3VzZW91dCcsIC0+XG5cdFx0XHRcdGNvbnNvbGUubG9nICdtb3VzZW91dCdcblx0XHRcdCMgXHR2YXIgbGF5ZXIgPSB0aGlzLmdldExheWVyKClcblx0XHRcdCMgXHRkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0J1xuXHRcdFx0IyBcdHRoaXMuc3Ryb2tlV2lkdGgoMilcblx0XHRcdCMgXHRsYXllci5kcmF3KClcblxuXHRcdFx0Z3JvdXAuYWRkIGRydWdIYW5kbGVyXG5cblx0XHRyZXNpemU6ID0+XG5cdFx0XHRAdHJpZ2dlciAncmVzaXplJ1xuXHRcdFx0c3RhZ2VQYXJhbXMgPSBAZWRpdG9yU3RhdGUuZ2V0ICdzdGFnZVBhcmFtcydcblx0XHRcdG5ld1N0YWdlUGFyYW1zID0ge31cblxuXHRcdFx0bmV3U3RhZ2VQYXJhbXMud2lkdGggPSBAdWkuY2FudmFzQ29udGFpbmVyLmlubmVyV2lkdGgoKSAjIG5ldyB3aWR0aCBvZiBwYWdlXG5cdFx0XHRuZXdTdGFnZVBhcmFtcy5oZWlnaHQgPSBuZXdTdGFnZVBhcmFtcy53aWR0aCAqIDAuNTYyNSAjIG5ldyBoZWlnaHQgb2YgcGFnZVxuXG5cdFx0XHR4U2NhbGUgPSAobmV3U3RhZ2VQYXJhbXMud2lkdGggLyBzdGFnZVBhcmFtcy53aWR0aCkgKiBzdGFnZVBhcmFtcy5zY2FsZS54ICMgcGVyY2VudCBjaGFuZ2UgaW4gd2lkdGggKEV4OiAxMDAwIC0gNDAwLzEwMDAgbWVhbnMgdGhlIHBhZ2Ugc2NhbGVkIGRvd24gNjAlLCB5b3Ugc2hvdWxkIHBsYXkgd2l0aCB0aGlzIHRvIGdldCB3YW50ZWQgcmVzdWx0cylcblx0XHRcdHlTY2FsZSA9IChuZXdTdGFnZVBhcmFtcy5oZWlnaHQgLyBzdGFnZVBhcmFtcy5oZWlnaHQpICogc3RhZ2VQYXJhbXMuc2NhbGUueVxuXG5cdFx0XHRuZXdTdGFnZVBhcmFtcy5zY2FsZSA9XG5cdFx0XHRcdHg6IHhTY2FsZVxuXHRcdFx0XHR5OiB5U2NhbGVcblx0XHRcdEBzdGFnZS5zZXRXaWR0aCBuZXdTdGFnZVBhcmFtcy53aWR0aFxuXHRcdFx0QHN0YWdlLnNldEhlaWdodCBuZXdTdGFnZVBhcmFtcy5oZWlnaHRcblx0XHRcdEBzdGFnZS5zZXRTY2FsZSBuZXdTdGFnZVBhcmFtcy5zY2FsZVxuXG5cdFx0XHRAZWRpdG9yU3RhdGUuc2V0ICdzdGFnZVBhcmFtcycsIG5ld1N0YWdlUGFyYW1zXG5cblx0XHRcdEBkcmF3KClcblxuXG5cdFx0c2F2ZUdlbmVyYXRlZENhcmRUb0ltYWdlOiA9PlxuXHRcdFx0QHN0YWdlLnRvRGF0YVVSTFxuXHRcdFx0XHRtaXRlVHlwZTogXCJpbWFnZS9wbmdcIlxuXHRcdFx0XHRjYWxsYmFjazogKGRhdGEpIC0+XG5cdFx0XHRcdFx0IyBpbWFnZSA9IGRhdGEucmVwbGFjZShcImltYWdlL3BuZ1wiLCBcImltYWdlL29jdGV0LXN0cmVhbVwiKVxuXHRcdFx0XHRcdGltYWdlID0gZGF0YVxuXHRcdFx0XHRcdGltYWdlV2luZG93ID0gd2luZG93Lm9wZW4oaW1hZ2UpXG5cdFx0XHRcdFx0JChpbWFnZVdpbmRvdy5kb2N1bWVudC5ib2R5KS5wcmVwZW5kKFwiPHA+0J3QsNC20LzQuNGC0LUg0YHQvtGF0YDQsNC90LjRgtGMIChjdHJsL2NtZCArIHMpPC9wPlwiKVxuXG5cdFx0YWRkTGF5ZXI6IChsYXllck1vZGVsLCBsYXllckNvbGxlY3Rpb24sIG9wdGlvbnMpID0+XG5cdFx0XHRjb25zb2xlLmxvZyAnYWRkIGxheWVyIHRvIHN0YWdlJ1xuXHRcdFx0cGFyYW1zID0gbGF5ZXJNb2RlbC50b0pTT04oKVxuXHRcdFx0bGF5ZXIgPSBuZXcgS2luZXRpYy5MYXllciBwYXJhbXNcblx0XHRcdEBzdGFnZS5hZGQgbGF5ZXJcblxuXHRcdHJlbW92ZUxheWVyOiAobGF5ZXJNb2RlbCwgbGF5ZXJDb2xsZWN0aW9uLCBvcHRpb25zKSA9PlxuXHRcdFx0Y29uc29sZS5sb2cgJ2FkZCBsYXllciB0byBzdGFnZSdcblx0XHRcdGxheWVycyA9IEBzdGFnZS5nZXRMYXllcnMoKVxuXHRcdFx0aWYgbGF5ZXJzLmxlbmd0aCA+IDFcblx0XHRcdFx0bGF5ZXJzW2xheWVycy5sZW5ndGgtMV0uZGVzdHJveSgpXG5cblx0XHRvbkFkZFNoYXBlOiA9PlxuXHRcdFx0Y29uc29sZS5sb2cgJ2FkZFNoYXBlJ1xuXG5cdFx0XHRsYXllciA9IEBzdGFnZS5jaGlsZHJlbltAc3RhZ2UuY2hpbGRyZW4ubGVuZ3RoLTFdXG5cblx0XHRcdHNoYXBlID0gbmV3IEtpbmV0aWMuUmVndWxhclBvbHlnb25cblx0XHRcdFx0eDogYXBwLmdldFJhbmRvbSAwLCBAc3RhZ2UuZ2V0V2lkdGgoKVxuXHRcdFx0XHR5OiBhcHAuZ2V0UmFuZG9tIDAsIEBzdGFnZS5nZXRIZWlnaHQoKVxuXHRcdFx0XHRzaWRlczogYXBwLmdldFJhbmRvbSAzLCA5XG5cdFx0XHRcdHJhZGl1czogYXBwLmdldFJhbmRvbSAxMCwgMTQwXG5cdFx0XHRcdGZpbGxSZWQ6IGFwcC5nZXRSYW5kb20gMSwgMjU1XG5cdFx0XHRcdGZpbGxHcmVlbjogYXBwLmdldFJhbmRvbSAxLCAyNTVcblx0XHRcdFx0ZmlsbEJsdWU6IGFwcC5nZXRSYW5kb20gMSwgMjU1XG5cdFx0XHRcdG9wYWNpdHk6IGFwcC5nZXRSYW5kb20gMC4xLCAxLCAyXG5cdFx0XHRcdGRyYWdnYWJsZTogdHJ1ZVxuXHRcdFx0bGF5ZXIuYWRkIHNoYXBlXG5cdFx0XHRsYXllci5kcmF3KClcblxuXHRcdFx0XG5cdFx0b25SZW1vdmVTaGFwZTogPT5cblx0XHRcdGNvbnNvbGUubG9nICdyZW1vdmVTaGFwZSdcblx0XHRcdGxheWVyID0gQHN0YWdlLmNoaWxkcmVuW0BzdGFnZS5jaGlsZHJlbi5sZW5ndGgtMV1cblx0XHRcdHNoYXBlcyA9IGxheWVyLmNoaWxkcmVuXG5cdFx0XHRpZiBzaGFwZXMgYW5kIHNoYXBlcy5sZW5ndGggPiAwXG5cdFx0XHRcdHNoYXBlc1tzaGFwZXMubGVuZ3RoLTFdLmRlc3Ryb3koKVxuXHRcdFx0XHRsYXllci5kcmF3KClcdFxuXG5cdFx0ZHJhd1JhbmRvbUJhY2tncm91bmRCdXR0b246ID0+XG5cdFx0XHQjIGxheWVyID0gQHN0YWdlLmNoaWxkcmVuWzBdLmNhbnZhcy5fY2FudmFzXG5cdFx0XHQjIGxheWVyLmdldENvbnRleHQoJzJkJykuY2xlYXJSZWN0KDAsMCxsYXllci53aWR0aCxsYXllci5oZWlnaHQpXG5cdFx0XHRAc3RhZ2UuYmFja2dyb3VuZCA9IG5ldyBhcHAuQ2FyZHMuQ2FyZE1vZGVsKClcblx0XHRcdCMgYXBwLnNoYXJlZC5nZW5lcmF0b3JzLmdyYWRpZW50R2VuLmRyYXcobGF5ZXIsIEBzdGFnZS5iYWNrZ3JvdW5kIClcblx0XHRcdEBkcmF3KClcblxuXHRcdG9uVGV4dENoYW5nZTogKHRleHQpID0+XG5cdFx0XHRjb25zb2xlLmluZm8gdGV4dFxuXHRcdFx0IyB1bmxlc3MgQHRleHRMYXllciB0aGVuIFxuXHRcdFx0IyBcdEB0ZXh0TGF5ZXIgPSBuZXcgS2luZXRpYy5GYXN0TGF5ZXIgY2xlYXJCZWZvcmVEcmF3OiB0cnVlXG5cdFx0XHQjIFx0QHN0YWdlLmFkZCBAdGV4dExheWVyXG5cdFx0XHR1bmxlc3MgQHRleHRMYXllclxuXHRcdFx0XHRAdGV4dExheWVyID0gbmV3IEtpbmV0aWMuTGF5ZXIoKVxuXHRcdFx0XHRAc3RhZ2UuYWRkIEB0ZXh0TGF5ZXJcblx0XHRcdCMgbGF5ZXIgPSBAc3RhZ2UuY2hpbGRyZW5bQHN0YWdlLmNoaWxkcmVuLmxlbmd0aC0xXVxuXHRcdFx0Y29uc29sZS5sb2cgQHRleHRMYXllclxuXG5cdFx0XHR1bmxlc3MgQHRleHRMYXllci5jaGlsZHJlblswXVxuXHRcdFx0XHRjYXJkVGV4dCA9IG5ldyBLaW5ldGljLlRleHRcblx0XHRcdFx0XHR4OiAyMFxuXHRcdFx0XHRcdHk6IDIwXG5cdFx0XHRcdFx0Zm9udFNpemU6IDIyXG5cdFx0XHRcdFx0Zm9udEZhbWlseTogJ1wiSGVsdmV0aWNhIE5ldWVcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZidcblx0XHRcdFx0XHRmaWxsOiAnIzMzMydcblx0XHRcdFx0XHR3aWR0aDogQHN0YWdlLndpZHRoKCkvMS4yNVxuXHRcdFx0XHRcdHBhZGRpbmc6IDIwXG5cdFx0XHRcdFx0YWxpZ246ICdsZWZ0J1xuXHRcdFx0XHRcdGRyYWdnYWJsZTogdHJ1ZVxuXHRcdFx0XHRAdGV4dExheWVyLmFkZCBjYXJkVGV4dFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRjYXJkVGV4dCA9IEB0ZXh0TGF5ZXIuY2hpbGRyZW5bMF1cdFxuXG5cdFx0XHRjb25zb2xlLmxvZyBjYXJkVGV4dFxuXHRcdFx0Y2FyZFRleHQuc2V0VGV4dCBcItCY0LzRjzogXFx0XFx0I3t0ZXh0Lm5hbWV9IFxcbtCk0LDQvNC40LvQuNGPOiBcXHRcXHQjeyB0ZXh0LnN1cm5hbWUgfSBcXG5FbWFpbDogXFx0XFx0I3t0ZXh0LmVtYWlsfSBcXG7QotC10LvQtdGE0L7QvTogXFx0XFx0I3t0ZXh0LnBob25lfSBcXG7QlNC+0LvQttC90L7RgdGC0Yw6IFxcdFxcdCN7dGV4dC5wb3NpdGlvbn1cIlxuXG5cblxuXHRcdFx0QHRleHRMYXllci5kcmF3KClcblxuXG5cdFx0ZHJhdzogPT5cblx0XHRcdEB0cmlnZ2VyICdkcmF3J1xuXHRcdFx0IyBjb25zb2xlLmxvZyAnZWRpdG9yIG1vZGVsIGNoYW5nZWQsIGRyYXcgJywgYXJndW1lbnRzXG5cdFx0XHQjIGxheWVyID0gbmV3IEtpbmV0aWMuRmFzdExheWVyKClcblx0XHRcdCMgbGF5ZXIuYWRkIG5ldyBLaW5ldGljLlJlY3Rcblx0XHRcdCMgXHR4OjAsIHk6MCwgd2lkdGg6IEBzdGFnZS53aWR0aCgpLCBoZWlnaHQ6IEBzdGFnZS5oZWlnaHQoKVxuXG5cdFx0XHQjIEBzdGFnZS5hZGQgbGF5ZXJcblx0XHRcdEBzdGFnZS5kcmF3KClcblx0XHRcdGxheWVyID0gQHN0YWdlLmNoaWxkcmVuWzBdXG5cdFx0XHRAc3RhZ2UuYmFja2dyb3VuZCA9IEBzdGFnZS5iYWNrZ3JvdW5kIG9yIG5ldyBhcHAuQ2FyZHMuQ2FyZE1vZGVsKClcblx0XHRcdGlmIGxheWVyIGFuZCBsYXllci5jYW52YXNcblx0XHRcdFx0YXBwLnNoYXJlZC5nZW5lcmF0b3JzLmdyYWRpZW50R2VuLmRyYXcobGF5ZXIuY2FudmFzLl9jYW52YXMsIEBzdGFnZS5iYWNrZ3JvdW5kIClcblxuIl19