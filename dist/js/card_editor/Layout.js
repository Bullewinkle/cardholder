(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

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
        return CardEditorLayout.__super__.constructor.apply(this, arguments);
      }

      CardEditorLayout.prototype.logging = true;

      CardEditorLayout.prototype.counter = 0;

      CardEditorLayout.prototype.className = 'card-editor-layout';

      CardEditorLayout.prototype.ui = {
        'canvasContainer': '#canvas-container',
        'drawRandomBackgroundButton': '.draw-random-background',
        'saveImageFileButton': '.save-to-image',
        'iconsContainer': '.icons-container'
      };

      CardEditorLayout.prototype.events = {
        'click @ui.drawRandomBackgroundButton': 'drawRandomBackgroundButton',
        'click @ui.saveImageFileButton': 'saveGeneratedCardToImage'
      };

      CardEditorLayout.prototype.regions = {
        layersPanelRegion: '#layers-panel-region',
        textPanelRegion: '#text-panel-region',
        shapesPanelRegion: '#shapes-panel-region',
        iconsPanelRegion: '#icons-panel-region',
        backgroundsPanelRegion: '#backgrounds-panel-region'
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

      CardEditorLayout.prototype.template = function() {
        return templatizer.cardEditor.editor(this.model);
      };

      CardEditorLayout.prototype.onShow = function() {
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
          app.CardGenerator.generators.gradientGen.draw(layer.canvas._canvas, new app.CardGenerator.cards.CardModel());
        }
        this.listenTo(this.editorState.get('currentLayer').get('shapeCollection'), 'add', this.onAddShape);
        this.listenTo(this.editorState.get('currentLayer').get('shapeCollection'), 'remove', this.onRemoveShape);
        this.listenTo(this.editorState.get('currentLayer').get('shapeCollection'), 'reset set sync fetch', this.draw);
        this.draw();
        return this.textPanelRegion.currentView.model.set('name', 'Семен');
      };

      CardEditorLayout.prototype._showGuiPanels = function() {
        this.layersPanelRegion.show(new CardEditor.views.LayersPanel({
          state: this.editorState,
          model: this.model
        }));
        this.textPanelRegion.show(new CardEditor.views.TextPanel({
          state: this.editorState,
          model: this.model
        }));
        this.listenTo(this.textPanelRegion.currentView, 'text:changed', this.onTextChange);
        this.shapesPanelRegion.show(new CardEditor.views.LayerChildsPanel({
          state: this.editorState,
          model: this.model
        }));
        this.iconsPanelRegion.show(new CardEditor.views.IconsPanel({
          state: this.editorState,
          model: this.model
        }));
        this.listenTo(this.iconsPanelRegion.currentView, 'childview:click:icon', this.onAddIcon);
        return this.backgroundsPanelRegion.show(new CardEditor.views.BackgroundsPanel({
          state: this.editorState,
          model: this.model
        }));
      };

      CardEditorLayout.prototype.onAddIcon = function() {
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
          fontFamily: 'icomoon',
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

      CardEditorLayout.prototype.addDrugHandler = function(group, x, y, name) {
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
        this.stage.setWidth(newStageParams.width);
        this.stage.setHeight(newStageParams.height);
        this.stage.setScale(newStageParams.scale);
        this.editorState.set('stageParams', newStageParams);
        return this.draw();
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
        if (layers.length > 1) {
          return layers[layers.length - 1].destroy();
        }
      };

      CardEditorLayout.prototype.onAddShape = function() {
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

      CardEditorLayout.prototype.onRemoveShape = function() {
        var layer, shapes;
        console.log('removeShape');
        layer = this.stage.children[this.stage.children.length - 1];
        shapes = layer.children;
        if (shapes && shapes.length > 0) {
          shapes[shapes.length - 1].destroy();
          return layer.draw();
        }
      };

      CardEditorLayout.prototype.drawRandomBackgroundButton = function() {
        this.stage.background = new app.CardGenerator.cards.CardModel();
        return this.draw();
      };

      CardEditorLayout.prototype.onTextChange = function(text) {
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

      CardEditorLayout.prototype.draw = function() {
        var layer;
        this.trigger('draw');
        this.stage.draw();
        layer = this.stage.children[0];
        this.stage.background = this.stage.background || new app.CardGenerator.cards.CardModel();
        if (layer && layer.canvas) {
          return app.CardGenerator.generators.gradientGen.draw(layer.canvas._canvas, this.stage.background);
        }
      };

      return CardEditorLayout;

    })(Marionette.LayoutView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL0xheW91dC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOzs7c0JBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxZQUFaLEVBQTBCLFNBQUMsVUFBRCxHQUFBO0FBR3pCLFFBQUEsMEZBQUE7QUFBQSxJQUFNO0FBQU4sMkNBQUEsQ0FBQTs7OztPQUFBOztnQ0FBQTs7T0FBaUMsUUFBUSxDQUFDLE1BQTFDLENBQUE7QUFBQSxJQUVNO0FBQ0wsd0NBQUEsQ0FBQTs7OztPQUFBOztBQUFBLGdDQUFBLEtBQUEsR0FBTyxrQkFBUCxDQUFBOzs2QkFBQTs7T0FENkIsUUFBUSxDQUFDLFdBRnZDLENBQUE7QUFBQSxJQUtNO0FBQ0wsbUNBQUEsQ0FBQTs7OztPQUFBOztBQUFBLDJCQUFBLFFBQUEsR0FDQztBQUFBLFFBQUEsU0FBQSxFQUFXLFNBQVg7QUFBQSxRQUNBLGVBQUEsRUFBcUIsSUFBQSxlQUFBLENBQUEsQ0FEckI7T0FERCxDQUFBOzt3QkFBQTs7T0FEd0IsUUFBUSxDQUFDLE1BTGxDLENBQUE7QUFBQSxJQVVNO0FBQ0wsd0NBQUEsQ0FBQTs7OztPQUFBOztBQUFBLGdDQUFBLEtBQUEsR0FBTyxVQUFQLENBQUE7OzZCQUFBOztPQUQ2QixRQUFRLENBQUMsV0FWdkMsQ0FBQTtBQUFBLElBYU07QUFDTCxvQ0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsNEJBQUEsUUFBQSxHQUNDO0FBQUEsUUFBQSxlQUFBLEVBQXFCLElBQUEsZUFBQSxDQUFBLENBQXJCO09BREQsQ0FBQTs7eUJBQUE7O09BRHlCLFFBQVEsQ0FBQyxNQWJuQyxDQUFBO0FBQUEsSUFpQk07QUFDTCxvQ0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsNEJBQUEsUUFBQSxHQUNDO0FBQUEsUUFBQSxZQUFBLEVBQWMsRUFBZDtPQURELENBQUE7O3lCQUFBOztPQUR5QixRQUFRLENBQUMsTUFqQm5DLENBQUE7V0FzQk0s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QSxTQUFTLENBQUMsSUFBWCxDQUFBLEVBL0JhO01BQUEsQ0FyUWQsQ0FBQTs7QUFBQSxpQ0F1U0EsSUFBQSxHQUFNLFNBQUEsR0FBQTtBQUNMLFlBQUEsS0FBQTtBQUFBLFFBQUEsSUFBQyxDQUFBLE9BQUQsQ0FBUyxNQUFULENBQUEsQ0FBQTtBQUFBLFFBMEhBLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxDQUFBLENBMUhBLENBQUE7QUFBQSxRQTJIQSxLQUFBLEdBQVEsSUFBQyxDQUFBLEtBQUssQ0FBQyxRQUFTLENBQUEsQ0FBQSxDQTNIeEIsQ0FBQTtBQUFBLFFBNEhBLElBQUMsQ0FBQSxLQUFLLENBQUMsVUFBUCxHQUFvQixJQUFDLENBQUEsS0FBSyxDQUFDLFVBQVAsSUFBeUIsSUFBQSxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxTQUF4QixDQUFBLENBNUg3QyxDQUFBO0FBNkhBLFFBQUEsSUFBRyxLQUFBLElBQVUsS0FBSyxDQUFDLE1BQW5CO2lCQUNDLEdBQUcsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUF6QyxDQUE4QyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQTNELEVBQW9FLElBQUMsQ0FBQSxLQUFLLENBQUMsVUFBM0UsRUFERDtTQTlISztNQUFBLENBdlNOLENBQUE7OzhCQUFBOztPQUR5QyxVQUFVLENBQUMsWUF6QjVCO0VBQUEsQ0FBMUIsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZF9lZGl0b3IvTGF5b3V0LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiQGFwcC5tb2R1bGUgJ0NhcmRFZGl0b3InLCAoQ2FyZEVkaXRvcikgLT5cblxuXHQjRGVmaW5lIGVkaXRvcnMgZGF0YSBzdHJ1Y3J1cmVcblx0Y2xhc3MgQWJzdHJhY3RTaGFwZU1vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcblxuXHRjbGFzcyBTaGFwZUNvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG5cdFx0bW9kZWw6IEFic3RyYWN0U2hhcGVNb2RlbFxuXG5cdGNsYXNzIExheWVyTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuXHRcdGRlZmF1bHRzOlxuXHRcdFx0bGF5ZXJOYW1lOiAnRGVmYXVsdCdcblx0XHRcdHNoYXBlQ29sbGVjdGlvbjogbmV3IFNoYXBlQ29sbGVjdGlvbigpXG5cblx0Y2xhc3MgTGF5ZXJDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuXHRcdG1vZGVsOiBMYXllck1vZGVsXG5cblx0Y2xhc3MgRWRpdG9yTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuXHRcdGRlZmF1bHRzOlxuXHRcdFx0bGF5ZXJDb2xsZWN0aW9uOiBuZXcgTGF5ZXJDb2xsZWN0aW9uKClcblxuXHRjbGFzcyBFZGl0b3JTdGF0ZSBleHRlbmRzIEJhY2tib25lLk1vZGVsXG5cdFx0ZGVmYXVsdHM6XG5cdFx0XHRjdXJyZW50TGF5ZXI6IHt9XHRcdFxuXG5cdCMgRGVmaW5lIGVkaXRvcnMgbGF5b3V0XHRcdFxuXHRjbGFzcyBDYXJkRWRpdG9yLkNhcmRFZGl0b3JMYXlvdXQgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXdcblx0XHRsb2dnaW5nOiBvblxuXHRcdGNvdW50ZXI6IDBcblxuXHRcdGNsYXNzTmFtZTogJ2NhcmQtZWRpdG9yLWxheW91dCdcblxuXHRcdHVpOlxuXHRcdFx0J2NhbnZhc0NvbnRhaW5lcic6ICcjY2FudmFzLWNvbnRhaW5lcidcblx0XHRcdCdkcmF3UmFuZG9tQmFja2dyb3VuZEJ1dHRvbic6ICcuZHJhdy1yYW5kb20tYmFja2dyb3VuZCdcblx0XHRcdCdzYXZlSW1hZ2VGaWxlQnV0dG9uJzogJy5zYXZlLXRvLWltYWdlJ1xuXHRcdFx0J2ljb25zQ29udGFpbmVyJzogJy5pY29ucy1jb250YWluZXInXG5cdFx0XHRcdFx0XG5cdFx0ZXZlbnRzOlxuXHRcdFx0J2NsaWNrIEB1aS5kcmF3UmFuZG9tQmFja2dyb3VuZEJ1dHRvbic6ICdkcmF3UmFuZG9tQmFja2dyb3VuZEJ1dHRvbidcblx0XHRcdCdjbGljayBAdWkuc2F2ZUltYWdlRmlsZUJ1dHRvbic6ICdzYXZlR2VuZXJhdGVkQ2FyZFRvSW1hZ2UnXG5cblx0XHRyZWdpb25zOlxuXHRcdFx0bGF5ZXJzUGFuZWxSZWdpb246ICcjbGF5ZXJzLXBhbmVsLXJlZ2lvbidcblx0XHRcdHRleHRQYW5lbFJlZ2lvbjogJyN0ZXh0LXBhbmVsLXJlZ2lvbidcblx0XHRcdHNoYXBlc1BhbmVsUmVnaW9uOiAnI3NoYXBlcy1wYW5lbC1yZWdpb24nXG5cdFx0XHRpY29uc1BhbmVsUmVnaW9uOiAnI2ljb25zLXBhbmVsLXJlZ2lvbidcblx0XHRcdGJhY2tncm91bmRzUGFuZWxSZWdpb246ICcjYmFja2dyb3VuZHMtcGFuZWwtcmVnaW9uJ1xuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdEBiaW5kICdhbGwnLCAtPlxuXHRcdFx0XHRjb25zb2xlLmxvZyBcIkNBUkQgRURJVE9SIExBWU9VVDpcXHRcIiwgYXJndW1lbnRzIGlmIEBsb2dnaW5nIGlzIG9uXG5cblx0XHRcdEBlZGl0b3JTdGF0ZSA9IG5ldyBFZGl0b3JTdGF0ZSgpXG5cdFx0XHRAbW9kZWwgPSBuZXcgRWRpdG9yTW9kZWwoKVxuXHRcdHRlbXBsYXRlOiAtPlxuXHRcdFx0dGVtcGxhdGl6ZXIuY2FyZEVkaXRvci5lZGl0b3IgQG1vZGVsXG5cblx0XHRvblNob3c6ID0+XG5cdFx0XHRAbGlzdGVuVG8gYXBwLCAncmVzaXplJywgQHJlc2l6ZVxuXG5cdFx0XHQjRGVmaW5lIEtpbmV0aWMgc3RhZ2Vcblx0XHRcdHN0YWdlV2lkdGggPSBAdWkuY2FudmFzQ29udGFpbmVyLndpZHRoKClcblx0XHRcdHN0YWdlSGVpZ2h0ID0gQHVpLmNhbnZhc0NvbnRhaW5lci5oZWlnaHQoKVxuXHRcdFx0QHN0YWdlID0gbmV3IEtpbmV0aWMuU3RhZ2Vcblx0XHRcdFx0Y29udGFpbmVyOiBcImNhbnZhcy1jb250YWluZXJcIlxuXHRcdFx0XHR3aWR0aDogc3RhZ2VXaWR0aFxuXHRcdFx0XHRoZWlnaHQ6IHN0YWdlV2lkdGggKiAwLjU2MjVcblx0XHRcdHN0YWdlUGFyYW1zID1cblx0XHRcdFx0c2NhbGU6IEBzdGFnZS5zY2FsZSgpXG5cdFx0XHRcdHdpZHRoOiBAdWkuY2FudmFzQ29udGFpbmVyLmlubmVyV2lkdGgoKVxuXHRcdFx0XHRoZWlnaHQ6IEB1aS5jYW52YXNDb250YWluZXIuaW5uZXJIZWlnaHQoKVxuXHRcdFx0QGVkaXRvclN0YXRlLnNldCAnc3RhZ2VQYXJhbXMnLCBzdGFnZVBhcmFtc1xuXG5cdFx0XHQjIERlZmluZSBHVUkgcGFuZWxzLCBtdXN0IGJlIGluIHRoZSBlbmQgb2Ygc2hvd2luZyBsb2dpYywgYmVjYXVzZSBvZiBjYW52YXMgcmVuZGVyaW5nXG5cdFx0XHRAX3Nob3dHdWlQYW5lbHMoKVxuXG5cdFx0XHRAbGlzdGVuVG8gQG1vZGVsLCAnY2hhbmdlJywgQGRyYXdcblx0XHRcdEBsaXN0ZW5UbyBAbW9kZWwuZ2V0KCdsYXllckNvbGxlY3Rpb24nKSwgJ2FkZCcsIEBhZGRMYXllclxuXHRcdFx0QGxpc3RlblRvIEBtb2RlbC5nZXQoJ2xheWVyQ29sbGVjdGlvbicpLCAncmVtb3ZlJywgQHJlbW92ZUxheWVyXG5cdFx0XHRAbGlzdGVuVG8gQG1vZGVsLmdldCgnbGF5ZXJDb2xsZWN0aW9uJyksICdyZXNldCBzZXQgc3luYyBmZXRjaCcsIEBkcmF3XG5cblx0XHRcdCMgQWRkIGZpcnN0IGxheWVyc1xuXHRcdFx0QG1vZGVsLmdldCgnbGF5ZXJDb2xsZWN0aW9uJykuYWRkIGxheWVyTmFtZTogXCLQpNC+0L1cIiBpZiBAbW9kZWwuZ2V0KCdsYXllckNvbGxlY3Rpb24nKS5sZW5ndGggaXMgMFxuXHRcdFx0QG1vZGVsLmdldCgnbGF5ZXJDb2xsZWN0aW9uJykuYWRkIGxheWVyTmFtZTogXCLQodC70L7QuSAjeyBAbW9kZWwuZ2V0KCdsYXllckNvbGxlY3Rpb24nKS5sZW5ndGggfVwiIGlmIEBtb2RlbC5nZXQoJ2xheWVyQ29sbGVjdGlvbicpLmxlbmd0aCBpcyAxXG5cdFx0XHRAZWRpdG9yU3RhdGUuc2V0ICdjdXJyZW50TGF5ZXInLCBAbW9kZWwuZ2V0KCdsYXllckNvbGxlY3Rpb24nKS5tb2RlbHNbMF1cblx0XHRcdGNvbnNvbGUubG9nICdjdXJyZW50IGxheWVyJyxAZWRpdG9yU3RhdGUuZ2V0ICdjdXJyZW50TGF5ZXInXG5cdFx0XHRcblx0XHRcdGxheWVyID0gQHN0YWdlLmNoaWxkcmVuWzBdXG5cdFx0XHRpZiBsYXllciBhbmQgbGF5ZXIuY2FudmFzXG5cdFx0XHRcdGFwcC5DYXJkR2VuZXJhdG9yLmdlbmVyYXRvcnMuZ3JhZGllbnRHZW4uZHJhdyhsYXllci5jYW52YXMuX2NhbnZhcywgKG5ldyBhcHAuQ2FyZEdlbmVyYXRvci5jYXJkcy5DYXJkTW9kZWwoKSkpXG5cblx0XHRcdEBsaXN0ZW5UbyBAZWRpdG9yU3RhdGUuZ2V0KCdjdXJyZW50TGF5ZXInKS5nZXQoJ3NoYXBlQ29sbGVjdGlvbicpLCAnYWRkJywgQG9uQWRkU2hhcGVcblx0XHRcdEBsaXN0ZW5UbyBAZWRpdG9yU3RhdGUuZ2V0KCdjdXJyZW50TGF5ZXInKS5nZXQoJ3NoYXBlQ29sbGVjdGlvbicpLCAncmVtb3ZlJywgQG9uUmVtb3ZlU2hhcGVcblx0XHRcdEBsaXN0ZW5UbyBAZWRpdG9yU3RhdGUuZ2V0KCdjdXJyZW50TGF5ZXInKS5nZXQoJ3NoYXBlQ29sbGVjdGlvbicpLCAncmVzZXQgc2V0IHN5bmMgZmV0Y2gnLCBAZHJhd1xuXG5cdFx0XHQjIGljb25zLWNvbnRhaW5lclxuXHRcdFx0QGRyYXcoKVxuXG5cdFx0XHQjIFNIT1cgRklYRVNcblx0XHRcdCMgcmFuZG9tSWNvbiA9IGFwcC5nZXRSYW5kb20oMCwgQGljb25zUGFuZWxSZWdpb24uY3VycmVudFZpZXcuY2hpbGRyZW4ubGVuZ3RoLTEpXG5cdFx0XHQjIGNvbnNvbGUubG9nIEBpY29uc1BhbmVsUmVnaW9uLmN1cnJlbnRWaWV3LmNoaWxkcmVuLCBcInZpZXcje3JhbmRvbUljb259XCJcblx0XHRcdCMgQGljb25zUGFuZWxSZWdpb24uY3VycmVudFZpZXcuY2hpbGRyZW4udG9BcnJheSgpW3JhbmRvbUljb25dLiRlbC50cmlnZ2VyKCdjbGljaycpXG5cdFx0XHRAdGV4dFBhbmVsUmVnaW9uLmN1cnJlbnRWaWV3Lm1vZGVsLnNldCAnbmFtZScsICfQodC10LzQtdC9J1xuXG5cdFx0X3Nob3dHdWlQYW5lbHM6ID0+XG5cdFx0XHRAbGF5ZXJzUGFuZWxSZWdpb24uc2hvdyBuZXcgQ2FyZEVkaXRvci52aWV3cy5MYXllcnNQYW5lbCBcblx0XHRcdFx0c3RhdGU6IEBlZGl0b3JTdGF0ZVxuXHRcdFx0XHRtb2RlbDogQG1vZGVsXG5cblx0XHRcdEB0ZXh0UGFuZWxSZWdpb24uc2hvdyBuZXcgQ2FyZEVkaXRvci52aWV3cy5UZXh0UGFuZWwgXG5cdFx0XHRcdHN0YXRlOiBAZWRpdG9yU3RhdGVcblx0XHRcdFx0bW9kZWw6IEBtb2RlbFxuXHRcdFx0QGxpc3RlblRvIEB0ZXh0UGFuZWxSZWdpb24uY3VycmVudFZpZXcsICd0ZXh0OmNoYW5nZWQnLCBAb25UZXh0Q2hhbmdlXG5cblx0XHRcdEBzaGFwZXNQYW5lbFJlZ2lvbi5zaG93IG5ldyBDYXJkRWRpdG9yLnZpZXdzLkxheWVyQ2hpbGRzUGFuZWwgXG5cdFx0XHRcdHN0YXRlOiBAZWRpdG9yU3RhdGVcblx0XHRcdFx0bW9kZWw6IEBtb2RlbFxuXG5cdFx0XHRAaWNvbnNQYW5lbFJlZ2lvbi5zaG93IG5ldyBDYXJkRWRpdG9yLnZpZXdzLkljb25zUGFuZWwgXG5cdFx0XHRcdHN0YXRlOiBAZWRpdG9yU3RhdGVcblx0XHRcdFx0bW9kZWw6IEBtb2RlbFxuXHRcdFx0QGxpc3RlblRvIEBpY29uc1BhbmVsUmVnaW9uLmN1cnJlbnRWaWV3LCAnY2hpbGR2aWV3OmNsaWNrOmljb24nLCBAb25BZGRJY29uXG5cblx0XHRcdCMgZGVidWdnZXI7XG5cdFx0XHRAYmFja2dyb3VuZHNQYW5lbFJlZ2lvbi5zaG93IG5ldyBDYXJkRWRpdG9yLnZpZXdzLkJhY2tncm91bmRzUGFuZWxcblx0XHRcdFx0c3RhdGU6IEBlZGl0b3JTdGF0ZVxuXHRcdFx0XHRtb2RlbDogQG1vZGVsXG5cblx0XHRvbkFkZEljb246ICh2aWV3LCBvcHRpb25zLCBhcmdzLi4uKSA9PlxuXHRcdFx0bGF5ZXIgPSBAc3RhZ2UuY2hpbGRyZW5bQHN0YWdlLmNoaWxkcmVuLmxlbmd0aC0yXVxuXG5cdFx0XHQjIHNoYXBlID0gbmV3IEtpbmV0aWMuUmVndWxhclBvbHlnb25cblx0XHRcdCMgXHR4OiBhcHAuZ2V0UmFuZG9tIDAsIEBzdGFnZS5nZXRXaWR0aCgpXG5cdFx0XHQjIFx0eTogYXBwLmdldFJhbmRvbSAwLCBAc3RhZ2UuZ2V0SGVpZ2h0KClcblx0XHRcdCMgXHRzaWRlczogYXBwLmdldFJhbmRvbSAzLCA5XG5cdFx0XHQjIFx0cmFkaXVzOiBhcHAuZ2V0UmFuZG9tIDEwLCAxNDBcblx0XHRcdFx0IyBmaWxsUmVkOiBhcHAuZ2V0UmFuZG9tIDEsIDI1NVxuXHRcdFx0XHQjIGZpbGxHcmVlbjogYXBwLmdldFJhbmRvbSAxLCAyNTVcblx0XHRcdFx0IyBmaWxsQmx1ZTogYXBwLmdldFJhbmRvbSAxLCAyNTVcblx0XHRcdCMgXHRvcGFjaXR5OiBhcHAuZ2V0UmFuZG9tIDAuMSwgMSwgMlxuXHRcdFx0IyBcdGRyYWdnYWJsZTogdHJ1ZVxuXG5cdFx0XHRpY29uR3JvdXAgPSBuZXcgS2luZXRpYy5Hcm91cFxuXHRcdFx0XHRkcmFnZ2FibGU6IHRydWVcblxuXHRcdFx0aWNvbiA9IG5ldyBLaW5ldGljLlRleHRcblx0XHRcdFx0eDogKEBzdGFnZS5nZXRXaWR0aCgpLzIpLTEwMFxuXHRcdFx0XHR5OiAoQHN0YWdlLmdldEhlaWdodCgpLzIpLTEwMFxuXHRcdFx0XHR0ZXh0OiBvcHRpb25zLm1vZGVsLmdldCAnY29udGVudCdcblx0XHRcdFx0Zm9udFNpemU6IDEyMFxuXHRcdFx0XHRmb250RmFtaWx5OiAnaWNvbW9vbidcblx0XHRcdFx0ZmlsbFJlZDogYXBwLmdldFJhbmRvbSAxLCAyNTVcblx0XHRcdFx0ZmlsbEdyZWVuOiBhcHAuZ2V0UmFuZG9tIDEsIDI1NVxuXHRcdFx0XHRmaWxsQmx1ZTogYXBwLmdldFJhbmRvbSAxLCAyNTVcblx0XHRcdFx0d2lkdGg6IDEyMFxuXHRcdFx0XHRoZWlnaHQ6IDEyMFxuXHRcdFx0XHRhbGlnbjogJ2NlbnRlcidcblxuXG5cblx0XHRcdGljb25Hcm91cC5hZGQgaWNvblxuXHRcdFx0XG5cdFx0XHRAYWRkRHJ1Z0hhbmRsZXIoaWNvbkdyb3VwLCBpY29uLmdldFgoKStpY29uLmdldFdpZHRoKCksIGljb24uZ2V0WSgpLCAnZmlyc3QnKVxuXG5cdFx0XHRsYXllci5hZGQgaWNvbkdyb3VwXG5cdFx0XHRsYXllci5kcmF3KClcblxuXHRcdGFkZERydWdIYW5kbGVyOiAoZ3JvdXAsIHgsIHksIG5hbWUpID0+XG5cdFx0XHRzdGFnZSA9IGdyb3VwLmdldFN0YWdlKClcblx0XHRcdGxheWVyID0gZ3JvdXAuZ2V0TGF5ZXIoKVxuXG5cdFx0XHRkcnVnSGFuZGxlciA9IG5ldyBLaW5ldGljLkNpcmNsZVxuXHRcdFx0XHR4OiB4XG5cdFx0XHRcdHk6IHlcblx0XHRcdFx0c3Ryb2tlOiAnIzY2Nidcblx0XHRcdFx0ZmlsbDogJyNkZGQnXG5cdFx0XHRcdHN0cm9rZVdpZHRoOiAyXG5cdFx0XHRcdHJhZGl1czogOFxuXHRcdFx0XHRuYW1lOiBuYW1lXG5cdFx0XHRcdGRyYWdnYWJsZTogdHJ1ZVxuXHRcdFx0XHRkcmFnT25Ub3A6IGZhbHNlXG5cblx0XHRcdGRydWdIYW5kbGVyLm9uICdkcmFnbW92ZScsIC0+XG5cdFx0XHRcdGNvbnNvbGUubG9nICdkcmFnbW92ZSdcblx0XHRcdCMgXHR1cGRhdGUodGhpcylcblx0XHRcdCMgXHRsYXllci5kcmF3KClcblx0XHRcdGRydWdIYW5kbGVyLm9uICdtb3VzZWRvd24gdG91Y2hzdGFydCcsIC0+XG5cdFx0XHRcdGNvbnNvbGUubG9nICdtb3VzZWRvd24gdG91Y2hzdGFydCdcblx0XHRcdCMgXHRncm91cC5zZXREcmFnZ2FibGUoZmFsc2UpXG5cdFx0XHQjIFx0dGhpcy5tb3ZlVG9Ub3AoKVxuXHRcdFx0ZHJ1Z0hhbmRsZXIub24gJ2RyYWdlbmQnLCAtPlxuXHRcdFx0XHRjb25zb2xlLmxvZyAnZHJhZ2VuZCdcblx0XHRcdCMgXHRncm91cC5zZXREcmFnZ2FibGUodHJ1ZSlcblx0XHRcdCMgXHRsYXllci5kcmF3KClcblx0XHRcdGRydWdIYW5kbGVyLm9uICdtb3VzZW92ZXInLCAtPlxuXHRcdFx0XHRjb25zb2xlLmxvZyAnbW91c2VvdmVyJ1xuXHRcdFx0IyBcdHZhciBsYXllciA9IHRoaXMuZ2V0TGF5ZXIoKVxuXHRcdFx0IyBcdGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInXG5cdFx0XHQjIFx0dGhpcy5zZXRTdHJva2VXaWR0aCg0KVxuXHRcdFx0IyBcdGxheWVyLmRyYXcoKVxuXHRcdFx0ZHJ1Z0hhbmRsZXIub24gJ21vdXNlb3V0JywgLT5cblx0XHRcdFx0Y29uc29sZS5sb2cgJ21vdXNlb3V0J1xuXHRcdFx0IyBcdHZhciBsYXllciA9IHRoaXMuZ2V0TGF5ZXIoKVxuXHRcdFx0IyBcdGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnXG5cdFx0XHQjIFx0dGhpcy5zdHJva2VXaWR0aCgyKVxuXHRcdFx0IyBcdGxheWVyLmRyYXcoKVxuXG5cdFx0XHRncm91cC5hZGQgZHJ1Z0hhbmRsZXJcblxuXHRcdHJlc2l6ZTogPT5cblx0XHRcdEB0cmlnZ2VyICdyZXNpemUnXG5cdFx0XHRzdGFnZVBhcmFtcyA9IEBlZGl0b3JTdGF0ZS5nZXQgJ3N0YWdlUGFyYW1zJ1xuXHRcdFx0bmV3U3RhZ2VQYXJhbXMgPSB7fVxuXG5cdFx0XHRuZXdTdGFnZVBhcmFtcy53aWR0aCA9IEB1aS5jYW52YXNDb250YWluZXIuaW5uZXJXaWR0aCgpICMgbmV3IHdpZHRoIG9mIHBhZ2Vcblx0XHRcdG5ld1N0YWdlUGFyYW1zLmhlaWdodCA9IG5ld1N0YWdlUGFyYW1zLndpZHRoICogMC41NjI1ICMgbmV3IGhlaWdodCBvZiBwYWdlXG5cblx0XHRcdHhTY2FsZSA9IChuZXdTdGFnZVBhcmFtcy53aWR0aCAvIHN0YWdlUGFyYW1zLndpZHRoKSAqIHN0YWdlUGFyYW1zLnNjYWxlLnggIyBwZXJjZW50IGNoYW5nZSBpbiB3aWR0aCAoRXg6IDEwMDAgLSA0MDAvMTAwMCBtZWFucyB0aGUgcGFnZSBzY2FsZWQgZG93biA2MCUsIHlvdSBzaG91bGQgcGxheSB3aXRoIHRoaXMgdG8gZ2V0IHdhbnRlZCByZXN1bHRzKVxuXHRcdFx0eVNjYWxlID0gKG5ld1N0YWdlUGFyYW1zLmhlaWdodCAvIHN0YWdlUGFyYW1zLmhlaWdodCkgKiBzdGFnZVBhcmFtcy5zY2FsZS55XG5cblx0XHRcdG5ld1N0YWdlUGFyYW1zLnNjYWxlID1cblx0XHRcdFx0eDogeFNjYWxlXG5cdFx0XHRcdHk6IHlTY2FsZVxuXHRcdFx0QHN0YWdlLnNldFdpZHRoIG5ld1N0YWdlUGFyYW1zLndpZHRoXG5cdFx0XHRAc3RhZ2Uuc2V0SGVpZ2h0IG5ld1N0YWdlUGFyYW1zLmhlaWdodFxuXHRcdFx0QHN0YWdlLnNldFNjYWxlIG5ld1N0YWdlUGFyYW1zLnNjYWxlXG5cblx0XHRcdEBlZGl0b3JTdGF0ZS5zZXQgJ3N0YWdlUGFyYW1zJywgbmV3U3RhZ2VQYXJhbXNcblxuXHRcdFx0QGRyYXcoKVxuXG5cblx0XHRzYXZlR2VuZXJhdGVkQ2FyZFRvSW1hZ2U6ID0+XG5cdFx0XHRAc3RhZ2UudG9EYXRhVVJMXG5cdFx0XHRcdG1pdGVUeXBlOiBcImltYWdlL3BuZ1wiXG5cdFx0XHRcdGNhbGxiYWNrOiAoZGF0YSkgLT5cblx0XHRcdFx0XHQjIGltYWdlID0gZGF0YS5yZXBsYWNlKFwiaW1hZ2UvcG5nXCIsIFwiaW1hZ2Uvb2N0ZXQtc3RyZWFtXCIpXG5cdFx0XHRcdFx0aW1hZ2UgPSBkYXRhXG5cdFx0XHRcdFx0aW1hZ2VXaW5kb3cgPSB3aW5kb3cub3BlbihpbWFnZSlcblx0XHRcdFx0XHQkKGltYWdlV2luZG93LmRvY3VtZW50LmJvZHkpLnByZXBlbmQoXCI8cD7QndCw0LbQvNC40YLQtSDRgdC+0YXRgNCw0L3QuNGC0YwgKGN0cmwvY21kICsgcyk8L3A+XCIpXG5cblx0XHRhZGRMYXllcjogKGxheWVyTW9kZWwsIGxheWVyQ29sbGVjdGlvbiwgb3B0aW9ucykgPT5cblx0XHRcdGNvbnNvbGUubG9nICdhZGQgbGF5ZXIgdG8gc3RhZ2UnXG5cdFx0XHRwYXJhbXMgPSBsYXllck1vZGVsLnRvSlNPTigpXG5cdFx0XHRsYXllciA9IG5ldyBLaW5ldGljLkxheWVyIHBhcmFtc1xuXHRcdFx0QHN0YWdlLmFkZCBsYXllclxuXG5cdFx0cmVtb3ZlTGF5ZXI6IChsYXllck1vZGVsLCBsYXllckNvbGxlY3Rpb24sIG9wdGlvbnMpID0+XG5cdFx0XHRjb25zb2xlLmxvZyAnYWRkIGxheWVyIHRvIHN0YWdlJ1xuXHRcdFx0bGF5ZXJzID0gQHN0YWdlLmdldExheWVycygpXG5cdFx0XHRpZiBsYXllcnMubGVuZ3RoID4gMVxuXHRcdFx0XHRsYXllcnNbbGF5ZXJzLmxlbmd0aC0xXS5kZXN0cm95KClcblxuXHRcdG9uQWRkU2hhcGU6ID0+XG5cdFx0XHRjb25zb2xlLmxvZyAnYWRkU2hhcGUnXG5cblx0XHRcdGxheWVyID0gQHN0YWdlLmNoaWxkcmVuW0BzdGFnZS5jaGlsZHJlbi5sZW5ndGgtMV1cblxuXHRcdFx0c2hhcGUgPSBuZXcgS2luZXRpYy5SZWd1bGFyUG9seWdvblxuXHRcdFx0XHR4OiBhcHAuZ2V0UmFuZG9tIDAsIEBzdGFnZS5nZXRXaWR0aCgpXG5cdFx0XHRcdHk6IGFwcC5nZXRSYW5kb20gMCwgQHN0YWdlLmdldEhlaWdodCgpXG5cdFx0XHRcdHNpZGVzOiBhcHAuZ2V0UmFuZG9tIDMsIDlcblx0XHRcdFx0cmFkaXVzOiBhcHAuZ2V0UmFuZG9tIDEwLCAxNDBcblx0XHRcdFx0ZmlsbFJlZDogYXBwLmdldFJhbmRvbSAxLCAyNTVcblx0XHRcdFx0ZmlsbEdyZWVuOiBhcHAuZ2V0UmFuZG9tIDEsIDI1NVxuXHRcdFx0XHRmaWxsQmx1ZTogYXBwLmdldFJhbmRvbSAxLCAyNTVcblx0XHRcdFx0b3BhY2l0eTogYXBwLmdldFJhbmRvbSAwLjEsIDEsIDJcblx0XHRcdFx0ZHJhZ2dhYmxlOiB0cnVlXG5cdFx0XHRsYXllci5hZGQgc2hhcGVcblx0XHRcdGxheWVyLmRyYXcoKVxuXG5cdFx0XHRcblx0XHRvblJlbW92ZVNoYXBlOiA9PlxuXHRcdFx0Y29uc29sZS5sb2cgJ3JlbW92ZVNoYXBlJ1xuXHRcdFx0bGF5ZXIgPSBAc3RhZ2UuY2hpbGRyZW5bQHN0YWdlLmNoaWxkcmVuLmxlbmd0aC0xXVxuXHRcdFx0c2hhcGVzID0gbGF5ZXIuY2hpbGRyZW5cblx0XHRcdGlmIHNoYXBlcyBhbmQgc2hhcGVzLmxlbmd0aCA+IDBcblx0XHRcdFx0c2hhcGVzW3NoYXBlcy5sZW5ndGgtMV0uZGVzdHJveSgpXG5cdFx0XHRcdGxheWVyLmRyYXcoKVx0XG5cblx0XHRkcmF3UmFuZG9tQmFja2dyb3VuZEJ1dHRvbjogPT5cblx0XHRcdCMgbGF5ZXIgPSBAc3RhZ2UuY2hpbGRyZW5bMF0uY2FudmFzLl9jYW52YXNcblx0XHRcdCMgbGF5ZXIuZ2V0Q29udGV4dCgnMmQnKS5jbGVhclJlY3QoMCwwLGxheWVyLndpZHRoLGxheWVyLmhlaWdodClcblx0XHRcdEBzdGFnZS5iYWNrZ3JvdW5kID0gbmV3IGFwcC5DYXJkR2VuZXJhdG9yLmNhcmRzLkNhcmRNb2RlbCgpXG5cdFx0XHQjIGFwcC5DYXJkR2VuZXJhdG9yLmdlbmVyYXRvcnMuZ3JhZGllbnRHZW4uZHJhdyhsYXllciwgQHN0YWdlLmJhY2tncm91bmQgKVxuXHRcdFx0QGRyYXcoKVxuXG5cdFx0b25UZXh0Q2hhbmdlOiAodGV4dCkgPT5cblx0XHRcdGNvbnNvbGUuaW5mbyB0ZXh0XG5cdFx0XHQjIHVubGVzcyBAdGV4dExheWVyIHRoZW4gXG5cdFx0XHQjIFx0QHRleHRMYXllciA9IG5ldyBLaW5ldGljLkZhc3RMYXllciBjbGVhckJlZm9yZURyYXc6IHRydWVcblx0XHRcdCMgXHRAc3RhZ2UuYWRkIEB0ZXh0TGF5ZXJcblx0XHRcdHVubGVzcyBAdGV4dExheWVyXG5cdFx0XHRcdEB0ZXh0TGF5ZXIgPSBuZXcgS2luZXRpYy5MYXllcigpXG5cdFx0XHRcdEBzdGFnZS5hZGQgQHRleHRMYXllclxuXHRcdFx0IyBsYXllciA9IEBzdGFnZS5jaGlsZHJlbltAc3RhZ2UuY2hpbGRyZW4ubGVuZ3RoLTFdXG5cdFx0XHRjb25zb2xlLmxvZyBAdGV4dExheWVyXG5cblx0XHRcdHVubGVzcyBAdGV4dExheWVyLmNoaWxkcmVuWzBdXG5cdFx0XHRcdGNhcmRUZXh0ID0gbmV3IEtpbmV0aWMuVGV4dFxuXHRcdFx0XHRcdHg6IDIwXG5cdFx0XHRcdFx0eTogMjBcblx0XHRcdFx0XHRmb250U2l6ZTogMjJcblx0XHRcdFx0XHRmb250RmFtaWx5OiAnXCJIZWx2ZXRpY2EgTmV1ZVwiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmJ1xuXHRcdFx0XHRcdGZpbGw6ICcjMzMzJ1xuXHRcdFx0XHRcdHdpZHRoOiBAc3RhZ2Uud2lkdGgoKS8xLjI1XG5cdFx0XHRcdFx0cGFkZGluZzogMjBcblx0XHRcdFx0XHRhbGlnbjogJ2xlZnQnXG5cdFx0XHRcdFx0ZHJhZ2dhYmxlOiB0cnVlXG5cdFx0XHRcdEB0ZXh0TGF5ZXIuYWRkIGNhcmRUZXh0XG5cdFx0XHRlbHNlXG5cdFx0XHRcdGNhcmRUZXh0ID0gQHRleHRMYXllci5jaGlsZHJlblswXVx0XG5cblx0XHRcdGNvbnNvbGUubG9nIGNhcmRUZXh0XG5cdFx0XHRjYXJkVGV4dC5zZXRUZXh0IFwi0JjQvNGPOiBcXHRcXHQje3RleHQubmFtZX0gXFxu0KTQsNC80LjQu9C40Y86IFxcdFxcdCN7IHRleHQuc3VybmFtZSB9IFxcbkVtYWlsOiBcXHRcXHQje3RleHQuZW1haWx9IFxcbtCi0LXQu9C10YTQvtC9OiBcXHRcXHQje3RleHQucGhvbmV9IFxcbtCU0L7Qu9C20L3QvtGB0YLRjDogXFx0XFx0I3t0ZXh0LnBvc2l0aW9ufVwiXG5cblxuXG5cdFx0XHRAdGV4dExheWVyLmRyYXcoKVxuXG5cblx0XHRkcmF3OiA9PlxuXHRcdFx0QHRyaWdnZXIgJ2RyYXcnXG5cdFx0XHQjIGNvbnNvbGUubG9nICdlZGl0b3IgbW9kZWwgY2hhbmdlZCwgZHJhdyAnLCBhcmd1bWVudHNcblx0XHRcdCMgbGF5ZXIgPSBuZXcgS2luZXRpYy5GYXN0TGF5ZXIoKVxuXHRcdFx0IyBsYXllci5hZGQgbmV3IEtpbmV0aWMuUmVjdFxuXHRcdFx0IyBcdHg6MCwgeTowLCB3aWR0aDogQHN0YWdlLndpZHRoKCksIGhlaWdodDogQHN0YWdlLmhlaWdodCgpXG5cblx0XHRcdCMgXHQjIGNvcm5lclJhZGl1c1xuXHRcdFx0IyBcdCMgZmlsbFxuXHRcdFx0IyBcdGZpbGxSZWQ6IGFwcC5nZXRSYW5kb20gMCwgMjU1XG5cdFx0XHQjIFx0ZmlsbEdyZWU6bjogYXBwLmdldFJhbmRvbSAwLCAyNTVcblx0XHRcdCMgXHRmaWxsQmx1ZTogYXBwLmdldFJhbmRvbSAwLCAyNTVcblx0XHRcdCMgXHRmaWxsQWxwaGE6IGFwcC5nZXRSYW5kb20gMCwgMjU1XG5cdFx0XHQjIFx0IyBmaWxsUGF0dGVybkltYWdlXG5cdFx0XHQjIFx0IyBmaWxsXG5cdFx0XHQjIFx0IyBmaWxsUGF0dGVyblhcblx0XHRcdCMgXHQjIGZpbGxQYXR0ZXJuWVxuXHRcdFx0IyBcdCMgZmlsbFBhdHRlcm5PZmZzZXRcblx0XHRcdCMgXHQjIG9iamVjdFxuXHRcdFx0IyBcdCMgZmlsbFBhdHRlcm5PZmZzZXRYXG5cdFx0XHQjIFx0IyBmaWxsUGF0dGVybk9mZnNldFlcblx0XHRcdCMgXHQjIGZpbGxQYXR0ZXJuU2NhbGVcblx0XHRcdCMgXHQjIG9iamVjdFxuXHRcdFx0IyBcdCMgZmlsbFBhdHRlcm5TY2FsZVhcblx0XHRcdCMgXHQjIGZpbGxQYXR0ZXJuU2NhbGVZXG5cdFx0XHQjIFx0IyBmaWxsUGF0dGVyblJvdGF0aW9uXG5cdFx0XHQjIFx0IyBmaWxsUGF0dGVyblJlcGVhdFxuXHRcdFx0IyBcdCMgY2FuXG5cdFx0XHQjIFx0IyBmaWxsTGluZWFyR3JhZGllbnRTdGFydFBvaW50XG5cdFx0XHQjIFx0IyBvYmplY3Rcblx0XHRcdCMgXHQjIGZpbGxMaW5lYXJHcmFkaWVudFN0YXJ0UG9pbnRYXG5cdFx0XHQjIFx0IyBmaWxsTGluZWFyR3JhZGllbnRTdGFydFBvaW50WVxuXHRcdFx0IyBcdCMgZmlsbExpbmVhckdyYWRpZW50RW5kUG9pbnRcblx0XHRcdCMgXHQjIGZpbGxMaW5lYXJHcmFkaWVudEVuZFBvaW50WFxuXHRcdFx0IyBcdCMgZmlsbExpbmVhckdyYWRpZW50RW5kUG9pbnRZXG5cdFx0XHQjIFx0IyBmaWxsTGluZWFyR3JhZGllbnRDb2xvclN0b3BzXG5cdFx0XHQjIFx0IyBhcnJheVxuXHRcdFx0IyBcdCMgZmlsbFJhZGlhbEdyYWRpZW50U3RhcnRQb2ludFxuXHRcdFx0IyBcdCMgb2JqZWN0XG5cdFx0XHQjIFx0IyBmaWxsUmFkaWFsR3JhZGllbnRTdGFydFBvaW50WFxuXHRcdFx0IyBcdCMgZmlsbFJhZGlhbEdyYWRpZW50U3RhcnRQb2ludFlcblx0XHRcdCMgXHQjIGZpbGxSYWRpYWxHcmFkaWVudEVuZFBvaW50XG5cdFx0XHQjIFx0IyBvYmplY3Rcblx0XHRcdCMgXHQjIGZpbGxSYWRpYWxHcmFkaWVudEVuZFBvaW50WFxuXHRcdFx0IyBcdCMgZmlsbFJhZGlhbEdyYWRpZW50RW5kUG9pbnRZXG5cdFx0XHQjIFx0IyBmaWxsUmFkaWFsR3JhZGllbnRTdGFydFJhZGl1c1xuXHRcdFx0IyBcdCMgZmlsbFJhZGlhbEdyYWRpZW50RW5kUmFkaXVzXG5cdFx0XHQjIFx0IyBmaWxsUmFkaWFsR3JhZGllbnRDb2xvclN0b3BzXG5cdFx0XHQjIFx0IyBhcnJheVxuXHRcdFx0IyBcdCMgZmlsbEVuYWJsZWRcblx0XHRcdCMgXHQjIGZsYWdcblx0XHRcdCMgXHQjIGZpbGxQcmlvcml0eVxuXHRcdFx0IyBcdCMgY2FuXG5cdFx0XHQjIFx0IyBzdHJva2Vcblx0XHRcdCMgXHQjIHN0cm9rZVxuXHRcdFx0IyBcdCMgc3Ryb2tlUmVkXG5cdFx0XHQjIFx0IyBzZXRcblx0XHRcdCMgXHQjIHN0cm9rZUdyZWVuXG5cdFx0XHQjIFx0IyBzZXRcblx0XHRcdCMgXHQjIHN0cm9rZUJsdWVcblx0XHRcdCMgXHQjIHNldFxuXHRcdFx0IyBcdCMgc3Ryb2tlQWxwaGFcblx0XHRcdCMgXHQjIHNldFxuXHRcdFx0IyBcdCMgc3Ryb2tlV2lkdGhcblx0XHRcdCMgXHQjIHN0cm9rZVxuXHRcdFx0IyBcdCMgc3Ryb2tlU2NhbGVFbmFibGVkXG5cdFx0XHQjIFx0IyBmbGFnXG5cdFx0XHQjIFx0IyBzdHJva2VFbmFibGVkXG5cdFx0XHQjIFx0IyBmbGFnXG5cdFx0XHQjIFx0IyBsaW5lSm9pblxuXHRcdFx0IyBcdCMgY2FuXG5cdFx0XHQjIFx0IyBsaW5lQ2FwXG5cdFx0XHQjIFx0IyBjYW5cblx0XHRcdCMgXHQjIHNoYWRvd0NvbG9yXG5cdFx0XHQjIFx0IyBzaGFkb3dSZWRcblx0XHRcdCMgXHQjIHNldFxuXHRcdFx0IyBcdCMgc2hhZG93R3JlZW5cblx0XHRcdCMgXHQjIHNldFxuXHRcdFx0IyBcdCMgc2hhZG93Qmx1ZVxuXHRcdFx0IyBcdCMgc2V0XG5cdFx0XHQjIFx0IyBzaGFkb3dBbHBoYVxuXHRcdFx0IyBcdCMgc2V0XG5cdFx0XHQjIFx0IyBzaGFkb3dCbHVyXG5cdFx0XHQjIFx0IyBzaGFkb3dPZmZzZXRcblx0XHRcdCMgXHQjIG9iamVjdFxuXHRcdFx0IyBcdCMgc2hhZG93T2Zmc2V0WFxuXHRcdFx0IyBcdCMgc2hhZG93T2Zmc2V0WVxuXHRcdFx0IyBcdCMgc2hhZG93T3BhY2l0eVxuXHRcdFx0IyBcdCMgc2hhZG93XG5cdFx0XHQjIFx0IyBzaGFkb3dFbmFibGVkXG5cdFx0XHQjIFx0IyBmbGFnXG5cdFx0XHQjIFx0IyBkYXNoXG5cdFx0XHQjIFx0IyBkYXNoRW5hYmxlZFxuXHRcdFx0IyBcdCMgZmxhZ1xuXHRcdFx0IyBcdCMgdmlzaWJsZVxuXHRcdFx0IyBcdCMgbGlzdGVuaW5nXG5cdFx0XHQjIFx0IyB3aGV0aGVyXG5cdFx0XHQjIFx0IyBpZFxuXHRcdFx0IyBcdCMgdW5pcXVlXG5cdFx0XHQjIFx0IyBuYW1lXG5cdFx0XHQjIFx0IyBub25cblx0XHRcdCMgXHQjIG9wYWNpdHlcblx0XHRcdCMgXHQjIGRldGVybWluZXNcblx0XHRcdCMgXHQjIHNjYWxlXG5cdFx0XHQjIFx0IyBzZXRcblx0XHRcdCMgXHQjIHNjYWxlWFxuXHRcdFx0IyBcdCMgc2V0XG5cdFx0XHQjIFx0IyBzY2FsZVlcblx0XHRcdCMgXHQjIHNldFxuXHRcdFx0IyBcdCMgcm90YXRpb25cblx0XHRcdCMgXHQjIHJvdGF0aW9uXG5cdFx0XHQjIFx0IyBvZmZzZXRcblx0XHRcdCMgXHQjIG9mZnNldFxuXHRcdFx0IyBcdCMgb2Zmc2V0WFxuXHRcdFx0IyBcdCMgc2V0XG5cdFx0XHQjIFx0IyBvZmZzZXRZXG5cdFx0XHQjIFx0IyBzZXRcblx0XHRcdCMgXHQjIGRyYWdnYWJsZVxuXHRcdFx0IyBcdCMgbWFrZXNcblx0XHRcdCMgXHQjIGRyYWdEaXN0YW5jZVxuXHRcdFx0IyBcdCMgZHJhZ0JvdW5kRnVuY1xuXG5cdFx0XHQjIEBzdGFnZS5hZGQgbGF5ZXJcblx0XHRcdEBzdGFnZS5kcmF3KClcblx0XHRcdGxheWVyID0gQHN0YWdlLmNoaWxkcmVuWzBdXG5cdFx0XHRAc3RhZ2UuYmFja2dyb3VuZCA9IEBzdGFnZS5iYWNrZ3JvdW5kIG9yIG5ldyBhcHAuQ2FyZEdlbmVyYXRvci5jYXJkcy5DYXJkTW9kZWwoKVxuXHRcdFx0aWYgbGF5ZXIgYW5kIGxheWVyLmNhbnZhc1xuXHRcdFx0XHRhcHAuQ2FyZEdlbmVyYXRvci5nZW5lcmF0b3JzLmdyYWRpZW50R2VuLmRyYXcobGF5ZXIuY2FudmFzLl9jYW52YXMsIEBzdGFnZS5iYWNrZ3JvdW5kIClcblxuIl19