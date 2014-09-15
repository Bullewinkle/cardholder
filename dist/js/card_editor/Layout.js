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
        var args, icon, layer, options, view;
        view = arguments[0], options = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
        layer = this.stage.children[this.stage.children.length - 2];
        icon = new Kinetic.Text({
          x: (this.stage.getWidth() / 2) - 100,
          y: (this.stage.getHeight() / 2) - 100,
          text: options.model.get('content'),
          fontSize: 200,
          fontFamily: 'icomoon',
          fillRed: app.getRandom(1, 255),
          fillGreen: app.getRandom(1, 255),
          fillBlue: app.getRandom(1, 255),
          width: 200,
          height: 200,
          align: 'center',
          draggable: true
        });
        layer.add(icon);
        return layer.draw();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL0xheW91dC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOzs7c0JBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxZQUFaLEVBQTBCLFNBQUMsVUFBRCxHQUFBO0FBR3pCLFFBQUEsMEZBQUE7QUFBQSxJQUFNO0FBQU4sMkNBQUEsQ0FBQTs7OztPQUFBOztnQ0FBQTs7T0FBaUMsUUFBUSxDQUFDLE1BQTFDLENBQUE7QUFBQSxJQUVNO0FBQ0wsd0NBQUEsQ0FBQTs7OztPQUFBOztBQUFBLGdDQUFBLEtBQUEsR0FBTyxrQkFBUCxDQUFBOzs2QkFBQTs7T0FENkIsUUFBUSxDQUFDLFdBRnZDLENBQUE7QUFBQSxJQUtNO0FBQ0wsbUNBQUEsQ0FBQTs7OztPQUFBOztBQUFBLDJCQUFBLFFBQUEsR0FDQztBQUFBLFFBQUEsU0FBQSxFQUFXLFNBQVg7QUFBQSxRQUNBLGVBQUEsRUFBcUIsSUFBQSxlQUFBLENBQUEsQ0FEckI7T0FERCxDQUFBOzt3QkFBQTs7T0FEd0IsUUFBUSxDQUFDLE1BTGxDLENBQUE7QUFBQSxJQVVNO0FBQ0wsd0NBQUEsQ0FBQTs7OztPQUFBOztBQUFBLGdDQUFBLEtBQUEsR0FBTyxVQUFQLENBQUE7OzZCQUFBOztPQUQ2QixRQUFRLENBQUMsV0FWdkMsQ0FBQTtBQUFBLElBYU07QUFDTCxvQ0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsNEJBQUEsUUFBQSxHQUNDO0FBQUEsUUFBQSxlQUFBLEVBQXFCLElBQUEsZUFBQSxDQUFBLENBQXJCO09BREQsQ0FBQTs7eUJBQUE7O09BRHlCLFFBQVEsQ0FBQyxNQWJuQyxDQUFBO0FBQUEsSUFpQk07QUFDTCxvQ0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsNEJBQUEsUUFBQSxHQUNDO0FBQUEsUUFBQSxZQUFBLEVBQWMsRUFBZDtPQURELENBQUE7O3lCQUFBOztPQUR5QixRQUFRLENBQUMsTUFqQm5DLENBQUE7V0FzQk0s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LFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBekMsQ0FBOEMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUEzRCxFQUFvRSxJQUFDLENBQUEsS0FBSyxDQUFDLFVBQTNFLEVBREQ7U0E5SEs7TUFBQSxDQXZQTixDQUFBOzs4QkFBQTs7T0FEeUMsVUFBVSxDQUFDLFlBekI1QjtFQUFBLENBQTFCLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRfZWRpdG9yL0xheW91dC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkBhcHAubW9kdWxlICdDYXJkRWRpdG9yJywgKENhcmRFZGl0b3IpIC0+XG5cblx0I0RlZmluZSBlZGl0b3JzIGRhdGEgc3RydWNydXJlXG5cdGNsYXNzIEFic3RyYWN0U2hhcGVNb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsXG5cblx0Y2xhc3MgU2hhcGVDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuXHRcdG1vZGVsOiBBYnN0cmFjdFNoYXBlTW9kZWxcblxuXHRjbGFzcyBMYXllck1vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcblx0XHRkZWZhdWx0czpcblx0XHRcdGxheWVyTmFtZTogJ0RlZmF1bHQnXG5cdFx0XHRzaGFwZUNvbGxlY3Rpb246IG5ldyBTaGFwZUNvbGxlY3Rpb24oKVxuXG5cdGNsYXNzIExheWVyQ29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cblx0XHRtb2RlbDogTGF5ZXJNb2RlbFxuXG5cdGNsYXNzIEVkaXRvck1vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcblx0XHRkZWZhdWx0czpcblx0XHRcdGxheWVyQ29sbGVjdGlvbjogbmV3IExheWVyQ29sbGVjdGlvbigpXG5cblx0Y2xhc3MgRWRpdG9yU3RhdGUgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuXHRcdGRlZmF1bHRzOlxuXHRcdFx0Y3VycmVudExheWVyOiB7fVx0XHRcblxuXHQjIERlZmluZSBlZGl0b3JzIGxheW91dFx0XHRcblx0Y2xhc3MgQ2FyZEVkaXRvci5DYXJkRWRpdG9yTGF5b3V0IGV4dGVuZHMgTWFyaW9uZXR0ZS5MYXlvdXRWaWV3XG5cdFx0bG9nZ2luZzogb25cblx0XHRjb3VudGVyOiAwXG5cblx0XHRjbGFzc05hbWU6ICdjYXJkLWVkaXRvci1sYXlvdXQnXG5cblx0XHR1aTpcblx0XHRcdCdjYW52YXNDb250YWluZXInOiAnI2NhbnZhcy1jb250YWluZXInXG5cdFx0XHQnZHJhd1JhbmRvbUJhY2tncm91bmRCdXR0b24nOiAnLmRyYXctcmFuZG9tLWJhY2tncm91bmQnXG5cdFx0XHQnc2F2ZUltYWdlRmlsZUJ1dHRvbic6ICcuc2F2ZS10by1pbWFnZSdcblx0XHRcdCdpY29uc0NvbnRhaW5lcic6ICcuaWNvbnMtY29udGFpbmVyJ1xuXHRcdFx0XHRcdFxuXHRcdGV2ZW50czpcblx0XHRcdCdjbGljayBAdWkuZHJhd1JhbmRvbUJhY2tncm91bmRCdXR0b24nOiAnZHJhd1JhbmRvbUJhY2tncm91bmRCdXR0b24nXG5cdFx0XHQnY2xpY2sgQHVpLnNhdmVJbWFnZUZpbGVCdXR0b24nOiAnc2F2ZUdlbmVyYXRlZENhcmRUb0ltYWdlJ1xuXG5cdFx0cmVnaW9uczpcblx0XHRcdGxheWVyc1BhbmVsUmVnaW9uOiAnI2xheWVycy1wYW5lbC1yZWdpb24nXG5cdFx0XHR0ZXh0UGFuZWxSZWdpb246ICcjdGV4dC1wYW5lbC1yZWdpb24nXG5cdFx0XHRzaGFwZXNQYW5lbFJlZ2lvbjogJyNzaGFwZXMtcGFuZWwtcmVnaW9uJ1xuXHRcdFx0aWNvbnNQYW5lbFJlZ2lvbjogJyNpY29ucy1wYW5lbC1yZWdpb24nXG5cdFx0XHRiYWNrZ3JvdW5kc1BhbmVsUmVnaW9uOiAnI2JhY2tncm91bmRzLXBhbmVsLXJlZ2lvbidcblxuXHRcdGluaXRpYWxpemU6IC0+XG5cdFx0XHRAYmluZCAnYWxsJywgLT5cblx0XHRcdFx0Y29uc29sZS5sb2cgXCJDQVJEIEVESVRPUiBMQVlPVVQ6XFx0XCIsIGFyZ3VtZW50cyBpZiBAbG9nZ2luZyBpcyBvblxuXG5cdFx0XHRAZWRpdG9yU3RhdGUgPSBuZXcgRWRpdG9yU3RhdGUoKVxuXHRcdFx0QG1vZGVsID0gbmV3IEVkaXRvck1vZGVsKClcblx0XHR0ZW1wbGF0ZTogLT5cblx0XHRcdHRlbXBsYXRpemVyLmNhcmRFZGl0b3IuZWRpdG9yIEBtb2RlbFxuXG5cdFx0b25TaG93OiA9PlxuXHRcdFx0QGxpc3RlblRvIGFwcCwgJ3Jlc2l6ZScsIEByZXNpemVcblxuXHRcdFx0I0RlZmluZSBLaW5ldGljIHN0YWdlXG5cdFx0XHRzdGFnZVdpZHRoID0gQHVpLmNhbnZhc0NvbnRhaW5lci53aWR0aCgpXG5cdFx0XHRzdGFnZUhlaWdodCA9IEB1aS5jYW52YXNDb250YWluZXIuaGVpZ2h0KClcblx0XHRcdEBzdGFnZSA9IG5ldyBLaW5ldGljLlN0YWdlXG5cdFx0XHRcdGNvbnRhaW5lcjogXCJjYW52YXMtY29udGFpbmVyXCJcblx0XHRcdFx0d2lkdGg6IHN0YWdlV2lkdGhcblx0XHRcdFx0aGVpZ2h0OiBzdGFnZVdpZHRoICogMC41NjI1XG5cdFx0XHRzdGFnZVBhcmFtcyA9XG5cdFx0XHRcdHNjYWxlOiBAc3RhZ2Uuc2NhbGUoKVxuXHRcdFx0XHR3aWR0aDogQHVpLmNhbnZhc0NvbnRhaW5lci5pbm5lcldpZHRoKClcblx0XHRcdFx0aGVpZ2h0OiBAdWkuY2FudmFzQ29udGFpbmVyLmlubmVySGVpZ2h0KClcblx0XHRcdEBlZGl0b3JTdGF0ZS5zZXQgJ3N0YWdlUGFyYW1zJywgc3RhZ2VQYXJhbXNcblxuXHRcdFx0IyBEZWZpbmUgR1VJIHBhbmVscywgbXVzdCBiZSBpbiB0aGUgZW5kIG9mIHNob3dpbmcgbG9naWMsIGJlY2F1c2Ugb2YgY2FudmFzIHJlbmRlcmluZ1xuXHRcdFx0QF9zaG93R3VpUGFuZWxzKClcblxuXHRcdFx0QGxpc3RlblRvIEBtb2RlbCwgJ2NoYW5nZScsIEBkcmF3XG5cdFx0XHRAbGlzdGVuVG8gQG1vZGVsLmdldCgnbGF5ZXJDb2xsZWN0aW9uJyksICdhZGQnLCBAYWRkTGF5ZXJcblx0XHRcdEBsaXN0ZW5UbyBAbW9kZWwuZ2V0KCdsYXllckNvbGxlY3Rpb24nKSwgJ3JlbW92ZScsIEByZW1vdmVMYXllclxuXHRcdFx0QGxpc3RlblRvIEBtb2RlbC5nZXQoJ2xheWVyQ29sbGVjdGlvbicpLCAncmVzZXQgc2V0IHN5bmMgZmV0Y2gnLCBAZHJhd1xuXG5cdFx0XHQjIEFkZCBmaXJzdCBsYXllcnNcblx0XHRcdEBtb2RlbC5nZXQoJ2xheWVyQ29sbGVjdGlvbicpLmFkZCBsYXllck5hbWU6IFwi0KTQvtC9XCIgaWYgQG1vZGVsLmdldCgnbGF5ZXJDb2xsZWN0aW9uJykubGVuZ3RoIGlzIDBcblx0XHRcdEBtb2RlbC5nZXQoJ2xheWVyQ29sbGVjdGlvbicpLmFkZCBsYXllck5hbWU6IFwi0KHQu9C+0LkgI3sgQG1vZGVsLmdldCgnbGF5ZXJDb2xsZWN0aW9uJykubGVuZ3RoIH1cIiBpZiBAbW9kZWwuZ2V0KCdsYXllckNvbGxlY3Rpb24nKS5sZW5ndGggaXMgMVxuXHRcdFx0QGVkaXRvclN0YXRlLnNldCAnY3VycmVudExheWVyJywgQG1vZGVsLmdldCgnbGF5ZXJDb2xsZWN0aW9uJykubW9kZWxzWzBdXG5cdFx0XHRjb25zb2xlLmxvZyAnY3VycmVudCBsYXllcicsQGVkaXRvclN0YXRlLmdldCAnY3VycmVudExheWVyJ1xuXHRcdFx0XG5cdFx0XHRsYXllciA9IEBzdGFnZS5jaGlsZHJlblswXVxuXHRcdFx0aWYgbGF5ZXIgYW5kIGxheWVyLmNhbnZhc1xuXHRcdFx0XHRhcHAuQ2FyZEdlbmVyYXRvci5nZW5lcmF0b3JzLmdyYWRpZW50R2VuLmRyYXcobGF5ZXIuY2FudmFzLl9jYW52YXMsIChuZXcgYXBwLkNhcmRHZW5lcmF0b3IuY2FyZHMuQ2FyZE1vZGVsKCkpKVxuXG5cdFx0XHRAbGlzdGVuVG8gQGVkaXRvclN0YXRlLmdldCgnY3VycmVudExheWVyJykuZ2V0KCdzaGFwZUNvbGxlY3Rpb24nKSwgJ2FkZCcsIEBvbkFkZFNoYXBlXG5cdFx0XHRAbGlzdGVuVG8gQGVkaXRvclN0YXRlLmdldCgnY3VycmVudExheWVyJykuZ2V0KCdzaGFwZUNvbGxlY3Rpb24nKSwgJ3JlbW92ZScsIEBvblJlbW92ZVNoYXBlXG5cdFx0XHRAbGlzdGVuVG8gQGVkaXRvclN0YXRlLmdldCgnY3VycmVudExheWVyJykuZ2V0KCdzaGFwZUNvbGxlY3Rpb24nKSwgJ3Jlc2V0IHNldCBzeW5jIGZldGNoJywgQGRyYXdcblxuXHRcdFx0IyBpY29ucy1jb250YWluZXJcblx0XHRcdEBkcmF3KClcblxuXHRcdFx0IyBTSE9XIEZJWEVTXG5cdFx0XHQjIHJhbmRvbUljb24gPSBhcHAuZ2V0UmFuZG9tKDAsIEBpY29uc1BhbmVsUmVnaW9uLmN1cnJlbnRWaWV3LmNoaWxkcmVuLmxlbmd0aC0xKVxuXHRcdFx0IyBjb25zb2xlLmxvZyBAaWNvbnNQYW5lbFJlZ2lvbi5jdXJyZW50Vmlldy5jaGlsZHJlbiwgXCJ2aWV3I3tyYW5kb21JY29ufVwiXG5cdFx0XHQjIEBpY29uc1BhbmVsUmVnaW9uLmN1cnJlbnRWaWV3LmNoaWxkcmVuLnRvQXJyYXkoKVtyYW5kb21JY29uXS4kZWwudHJpZ2dlcignY2xpY2snKVxuXHRcdFx0QHRleHRQYW5lbFJlZ2lvbi5jdXJyZW50Vmlldy5tb2RlbC5zZXQgJ25hbWUnLCAn0KHQtdC80LXQvSdcblxuXG5cdFx0X3Nob3dHdWlQYW5lbHM6ID0+XG5cdFx0XHRAbGF5ZXJzUGFuZWxSZWdpb24uc2hvdyBuZXcgQ2FyZEVkaXRvci52aWV3cy5MYXllcnNQYW5lbCBcblx0XHRcdFx0c3RhdGU6IEBlZGl0b3JTdGF0ZVxuXHRcdFx0XHRtb2RlbDogQG1vZGVsXG5cblx0XHRcdEB0ZXh0UGFuZWxSZWdpb24uc2hvdyBuZXcgQ2FyZEVkaXRvci52aWV3cy5UZXh0UGFuZWwgXG5cdFx0XHRcdHN0YXRlOiBAZWRpdG9yU3RhdGVcblx0XHRcdFx0bW9kZWw6IEBtb2RlbFxuXHRcdFx0QGxpc3RlblRvIEB0ZXh0UGFuZWxSZWdpb24uY3VycmVudFZpZXcsICd0ZXh0OmNoYW5nZWQnLCBAb25UZXh0Q2hhbmdlXG5cblx0XHRcdEBzaGFwZXNQYW5lbFJlZ2lvbi5zaG93IG5ldyBDYXJkRWRpdG9yLnZpZXdzLkxheWVyQ2hpbGRzUGFuZWwgXG5cdFx0XHRcdHN0YXRlOiBAZWRpdG9yU3RhdGVcblx0XHRcdFx0bW9kZWw6IEBtb2RlbFxuXG5cdFx0XHRAaWNvbnNQYW5lbFJlZ2lvbi5zaG93IG5ldyBDYXJkRWRpdG9yLnZpZXdzLkljb25zUGFuZWwgXG5cdFx0XHRcdHN0YXRlOiBAZWRpdG9yU3RhdGVcblx0XHRcdFx0bW9kZWw6IEBtb2RlbFxuXHRcdFx0QGxpc3RlblRvIEBpY29uc1BhbmVsUmVnaW9uLmN1cnJlbnRWaWV3LCAnY2hpbGR2aWV3OmNsaWNrOmljb24nLCBAb25BZGRJY29uXG5cblx0XHRcdCMgZGVidWdnZXI7XG5cdFx0XHRAYmFja2dyb3VuZHNQYW5lbFJlZ2lvbi5zaG93IG5ldyBDYXJkRWRpdG9yLnZpZXdzLkJhY2tncm91bmRzUGFuZWxcblx0XHRcdFx0c3RhdGU6IEBlZGl0b3JTdGF0ZVxuXHRcdFx0XHRtb2RlbDogQG1vZGVsXG5cblx0XHRvbkFkZEljb246ICh2aWV3LCBvcHRpb25zLCBhcmdzLi4uKSA9PlxuXHRcdFx0bGF5ZXIgPSBAc3RhZ2UuY2hpbGRyZW5bQHN0YWdlLmNoaWxkcmVuLmxlbmd0aC0yXVxuXG5cdFx0XHQjIHNoYXBlID0gbmV3IEtpbmV0aWMuUmVndWxhclBvbHlnb25cblx0XHRcdCMgXHR4OiBhcHAuZ2V0UmFuZG9tIDAsIEBzdGFnZS5nZXRXaWR0aCgpXG5cdFx0XHQjIFx0eTogYXBwLmdldFJhbmRvbSAwLCBAc3RhZ2UuZ2V0SGVpZ2h0KClcblx0XHRcdCMgXHRzaWRlczogYXBwLmdldFJhbmRvbSAzLCA5XG5cdFx0XHQjIFx0cmFkaXVzOiBhcHAuZ2V0UmFuZG9tIDEwLCAxNDBcblx0XHRcdFx0IyBmaWxsUmVkOiBhcHAuZ2V0UmFuZG9tIDEsIDI1NVxuXHRcdFx0XHQjIGZpbGxHcmVlbjogYXBwLmdldFJhbmRvbSAxLCAyNTVcblx0XHRcdFx0IyBmaWxsQmx1ZTogYXBwLmdldFJhbmRvbSAxLCAyNTVcblx0XHRcdCMgXHRvcGFjaXR5OiBhcHAuZ2V0UmFuZG9tIDAuMSwgMSwgMlxuXHRcdFx0IyBcdGRyYWdnYWJsZTogdHJ1ZVxuXG5cblx0XHRcdGljb24gPSBuZXcgS2luZXRpYy5UZXh0XG5cdFx0XHRcdHg6IChAc3RhZ2UuZ2V0V2lkdGgoKS8yKS0xMDBcblx0XHRcdFx0eTogKEBzdGFnZS5nZXRIZWlnaHQoKS8yKS0xMDBcblx0XHRcdFx0dGV4dDogb3B0aW9ucy5tb2RlbC5nZXQgJ2NvbnRlbnQnXG5cdFx0XHRcdGZvbnRTaXplOiAyMDBcblx0XHRcdFx0Zm9udEZhbWlseTogJ2ljb21vb24nXG5cdFx0XHRcdGZpbGxSZWQ6IGFwcC5nZXRSYW5kb20gMSwgMjU1XG5cdFx0XHRcdGZpbGxHcmVlbjogYXBwLmdldFJhbmRvbSAxLCAyNTVcblx0XHRcdFx0ZmlsbEJsdWU6IGFwcC5nZXRSYW5kb20gMSwgMjU1XG5cdFx0XHRcdHdpZHRoOiAyMDBcblx0XHRcdFx0aGVpZ2h0OiAyMDBcblx0XHRcdFx0YWxpZ246ICdjZW50ZXInXG5cdFx0XHRcdGRyYWdnYWJsZTogdHJ1ZVxuXG5cblx0XHRcdGxheWVyLmFkZCBpY29uXG5cdFx0XHRsYXllci5kcmF3KClcblxuXHRcdHJlc2l6ZTogPT5cblx0XHRcdEB0cmlnZ2VyICdyZXNpemUnXG5cdFx0XHRzdGFnZVBhcmFtcyA9IEBlZGl0b3JTdGF0ZS5nZXQgJ3N0YWdlUGFyYW1zJ1xuXHRcdFx0bmV3U3RhZ2VQYXJhbXMgPSB7fVxuXG5cdFx0XHRuZXdTdGFnZVBhcmFtcy53aWR0aCA9IEB1aS5jYW52YXNDb250YWluZXIuaW5uZXJXaWR0aCgpICMgbmV3IHdpZHRoIG9mIHBhZ2Vcblx0XHRcdG5ld1N0YWdlUGFyYW1zLmhlaWdodCA9IG5ld1N0YWdlUGFyYW1zLndpZHRoICogMC41NjI1ICMgbmV3IGhlaWdodCBvZiBwYWdlXG5cblx0XHRcdHhTY2FsZSA9IChuZXdTdGFnZVBhcmFtcy53aWR0aCAvIHN0YWdlUGFyYW1zLndpZHRoKSAqIHN0YWdlUGFyYW1zLnNjYWxlLnggIyBwZXJjZW50IGNoYW5nZSBpbiB3aWR0aCAoRXg6IDEwMDAgLSA0MDAvMTAwMCBtZWFucyB0aGUgcGFnZSBzY2FsZWQgZG93biA2MCUsIHlvdSBzaG91bGQgcGxheSB3aXRoIHRoaXMgdG8gZ2V0IHdhbnRlZCByZXN1bHRzKVxuXHRcdFx0eVNjYWxlID0gKG5ld1N0YWdlUGFyYW1zLmhlaWdodCAvIHN0YWdlUGFyYW1zLmhlaWdodCkgKiBzdGFnZVBhcmFtcy5zY2FsZS55XG5cblx0XHRcdG5ld1N0YWdlUGFyYW1zLnNjYWxlID1cblx0XHRcdFx0eDogeFNjYWxlXG5cdFx0XHRcdHk6IHlTY2FsZVxuXHRcdFx0QHN0YWdlLnNldFdpZHRoIG5ld1N0YWdlUGFyYW1zLndpZHRoXG5cdFx0XHRAc3RhZ2Uuc2V0SGVpZ2h0IG5ld1N0YWdlUGFyYW1zLmhlaWdodFxuXHRcdFx0QHN0YWdlLnNldFNjYWxlIG5ld1N0YWdlUGFyYW1zLnNjYWxlXG5cblx0XHRcdEBlZGl0b3JTdGF0ZS5zZXQgJ3N0YWdlUGFyYW1zJywgbmV3U3RhZ2VQYXJhbXNcblxuXHRcdFx0QGRyYXcoKVxuXG5cdFx0c2F2ZUdlbmVyYXRlZENhcmRUb0ltYWdlOiA9PlxuXHRcdFx0QHN0YWdlLnRvRGF0YVVSTFxuXHRcdFx0XHRtaXRlVHlwZTogXCJpbWFnZS9wbmdcIlxuXHRcdFx0XHRjYWxsYmFjazogKGRhdGEpIC0+XG5cdFx0XHRcdFx0IyBpbWFnZSA9IGRhdGEucmVwbGFjZShcImltYWdlL3BuZ1wiLCBcImltYWdlL29jdGV0LXN0cmVhbVwiKVxuXHRcdFx0XHRcdGltYWdlID0gZGF0YVxuXHRcdFx0XHRcdGltYWdlV2luZG93ID0gd2luZG93Lm9wZW4oaW1hZ2UpXG5cdFx0XHRcdFx0JChpbWFnZVdpbmRvdy5kb2N1bWVudC5ib2R5KS5wcmVwZW5kKFwiPHA+0J3QsNC20LzQuNGC0LUg0YHQvtGF0YDQsNC90LjRgtGMIChjdHJsL2NtZCArIHMpPC9wPlwiKVxuXG5cdFx0YWRkTGF5ZXI6IChsYXllck1vZGVsLCBsYXllckNvbGxlY3Rpb24sIG9wdGlvbnMpID0+XG5cdFx0XHRjb25zb2xlLmxvZyAnYWRkIGxheWVyIHRvIHN0YWdlJ1xuXHRcdFx0cGFyYW1zID0gbGF5ZXJNb2RlbC50b0pTT04oKVxuXHRcdFx0bGF5ZXIgPSBuZXcgS2luZXRpYy5MYXllciBwYXJhbXNcblx0XHRcdEBzdGFnZS5hZGQgbGF5ZXJcblxuXHRcdHJlbW92ZUxheWVyOiAobGF5ZXJNb2RlbCwgbGF5ZXJDb2xsZWN0aW9uLCBvcHRpb25zKSA9PlxuXHRcdFx0Y29uc29sZS5sb2cgJ2FkZCBsYXllciB0byBzdGFnZSdcblx0XHRcdGxheWVycyA9IEBzdGFnZS5nZXRMYXllcnMoKVxuXHRcdFx0aWYgbGF5ZXJzLmxlbmd0aCA+IDFcblx0XHRcdFx0bGF5ZXJzW2xheWVycy5sZW5ndGgtMV0uZGVzdHJveSgpXG5cblx0XHRvbkFkZFNoYXBlOiA9PlxuXHRcdFx0Y29uc29sZS5sb2cgJ2FkZFNoYXBlJ1xuXG5cdFx0XHRsYXllciA9IEBzdGFnZS5jaGlsZHJlbltAc3RhZ2UuY2hpbGRyZW4ubGVuZ3RoLTFdXG5cblx0XHRcdHNoYXBlID0gbmV3IEtpbmV0aWMuUmVndWxhclBvbHlnb25cblx0XHRcdFx0eDogYXBwLmdldFJhbmRvbSAwLCBAc3RhZ2UuZ2V0V2lkdGgoKVxuXHRcdFx0XHR5OiBhcHAuZ2V0UmFuZG9tIDAsIEBzdGFnZS5nZXRIZWlnaHQoKVxuXHRcdFx0XHRzaWRlczogYXBwLmdldFJhbmRvbSAzLCA5XG5cdFx0XHRcdHJhZGl1czogYXBwLmdldFJhbmRvbSAxMCwgMTQwXG5cdFx0XHRcdGZpbGxSZWQ6IGFwcC5nZXRSYW5kb20gMSwgMjU1XG5cdFx0XHRcdGZpbGxHcmVlbjogYXBwLmdldFJhbmRvbSAxLCAyNTVcblx0XHRcdFx0ZmlsbEJsdWU6IGFwcC5nZXRSYW5kb20gMSwgMjU1XG5cdFx0XHRcdG9wYWNpdHk6IGFwcC5nZXRSYW5kb20gMC4xLCAxLCAyXG5cdFx0XHRcdGRyYWdnYWJsZTogdHJ1ZVxuXHRcdFx0bGF5ZXIuYWRkIHNoYXBlXG5cdFx0XHRsYXllci5kcmF3KClcblxuXHRcdFx0XG5cdFx0b25SZW1vdmVTaGFwZTogPT5cblx0XHRcdGNvbnNvbGUubG9nICdyZW1vdmVTaGFwZSdcblx0XHRcdGxheWVyID0gQHN0YWdlLmNoaWxkcmVuW0BzdGFnZS5jaGlsZHJlbi5sZW5ndGgtMV1cblx0XHRcdHNoYXBlcyA9IGxheWVyLmNoaWxkcmVuXG5cdFx0XHRpZiBzaGFwZXMgYW5kIHNoYXBlcy5sZW5ndGggPiAwXG5cdFx0XHRcdHNoYXBlc1tzaGFwZXMubGVuZ3RoLTFdLmRlc3Ryb3koKVxuXHRcdFx0XHRsYXllci5kcmF3KClcdFxuXG5cdFx0ZHJhd1JhbmRvbUJhY2tncm91bmRCdXR0b246ID0+XG5cdFx0XHQjIGxheWVyID0gQHN0YWdlLmNoaWxkcmVuWzBdLmNhbnZhcy5fY2FudmFzXG5cdFx0XHQjIGxheWVyLmdldENvbnRleHQoJzJkJykuY2xlYXJSZWN0KDAsMCxsYXllci53aWR0aCxsYXllci5oZWlnaHQpXG5cdFx0XHRAc3RhZ2UuYmFja2dyb3VuZCA9IG5ldyBhcHAuQ2FyZEdlbmVyYXRvci5jYXJkcy5DYXJkTW9kZWwoKVxuXHRcdFx0IyBhcHAuQ2FyZEdlbmVyYXRvci5nZW5lcmF0b3JzLmdyYWRpZW50R2VuLmRyYXcobGF5ZXIsIEBzdGFnZS5iYWNrZ3JvdW5kIClcblx0XHRcdEBkcmF3KClcblxuXHRcdG9uVGV4dENoYW5nZTogKHRleHQpID0+XG5cdFx0XHRjb25zb2xlLmluZm8gdGV4dFxuXHRcdFx0IyB1bmxlc3MgQHRleHRMYXllciB0aGVuIFxuXHRcdFx0IyBcdEB0ZXh0TGF5ZXIgPSBuZXcgS2luZXRpYy5GYXN0TGF5ZXIgY2xlYXJCZWZvcmVEcmF3OiB0cnVlXG5cdFx0XHQjIFx0QHN0YWdlLmFkZCBAdGV4dExheWVyXG5cdFx0XHR1bmxlc3MgQHRleHRMYXllclxuXHRcdFx0XHRAdGV4dExheWVyID0gbmV3IEtpbmV0aWMuTGF5ZXIoKVxuXHRcdFx0XHRAc3RhZ2UuYWRkIEB0ZXh0TGF5ZXJcblx0XHRcdCMgbGF5ZXIgPSBAc3RhZ2UuY2hpbGRyZW5bQHN0YWdlLmNoaWxkcmVuLmxlbmd0aC0xXVxuXHRcdFx0Y29uc29sZS5sb2cgQHRleHRMYXllclxuXG5cdFx0XHR1bmxlc3MgQHRleHRMYXllci5jaGlsZHJlblswXVxuXHRcdFx0XHRjYXJkVGV4dCA9IG5ldyBLaW5ldGljLlRleHRcblx0XHRcdFx0XHR4OiAyMFxuXHRcdFx0XHRcdHk6IDIwXG5cdFx0XHRcdFx0Zm9udFNpemU6IDIyXG5cdFx0XHRcdFx0Zm9udEZhbWlseTogJ1wiSGVsdmV0aWNhIE5ldWVcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZidcblx0XHRcdFx0XHRmaWxsOiAnIzMzMydcblx0XHRcdFx0XHR3aWR0aDogQHN0YWdlLndpZHRoKCkvMS4yNVxuXHRcdFx0XHRcdHBhZGRpbmc6IDIwXG5cdFx0XHRcdFx0YWxpZ246ICdsZWZ0J1xuXHRcdFx0XHRcdGRyYWdnYWJsZTogdHJ1ZVxuXHRcdFx0XHRAdGV4dExheWVyLmFkZCBjYXJkVGV4dFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRjYXJkVGV4dCA9IEB0ZXh0TGF5ZXIuY2hpbGRyZW5bMF1cdFxuXG5cdFx0XHRjb25zb2xlLmxvZyBjYXJkVGV4dFxuXHRcdFx0Y2FyZFRleHQuc2V0VGV4dCBcItCY0LzRjzogXFx0XFx0I3t0ZXh0Lm5hbWV9IFxcbtCk0LDQvNC40LvQuNGPOiBcXHRcXHQjeyB0ZXh0LnN1cm5hbWUgfSBcXG5FbWFpbDogXFx0XFx0I3t0ZXh0LmVtYWlsfSBcXG7QotC10LvQtdGE0L7QvTogXFx0XFx0I3t0ZXh0LnBob25lfSBcXG7QlNC+0LvQttC90L7RgdGC0Yw6IFxcdFxcdCN7dGV4dC5wb3NpdGlvbn1cIlxuXG5cblxuXHRcdFx0QHRleHRMYXllci5kcmF3KClcblxuXG5cdFx0ZHJhdzogPT5cblx0XHRcdEB0cmlnZ2VyICdkcmF3J1xuXHRcdFx0IyBjb25zb2xlLmxvZyAnZWRpdG9yIG1vZGVsIGNoYW5nZWQsIGRyYXcgJywgYXJndW1lbnRzXG5cdFx0XHQjIGxheWVyID0gbmV3IEtpbmV0aWMuRmFzdExheWVyKClcblx0XHRcdCMgbGF5ZXIuYWRkIG5ldyBLaW5ldGljLlJlY3Rcblx0XHRcdCMgXHR4OjAsIHk6MCwgd2lkdGg6IEBzdGFnZS53aWR0aCgpLCBoZWlnaHQ6IEBzdGFnZS5oZWlnaHQoKVxuXG5cdFx0XHQjIFx0IyBjb3JuZXJSYWRpdXNcblx0XHRcdCMgXHQjIGZpbGxcblx0XHRcdCMgXHRmaWxsUmVkOiBhcHAuZ2V0UmFuZG9tIDAsIDI1NVxuXHRcdFx0IyBcdGZpbGxHcmVlOm46IGFwcC5nZXRSYW5kb20gMCwgMjU1XG5cdFx0XHQjIFx0ZmlsbEJsdWU6IGFwcC5nZXRSYW5kb20gMCwgMjU1XG5cdFx0XHQjIFx0ZmlsbEFscGhhOiBhcHAuZ2V0UmFuZG9tIDAsIDI1NVxuXHRcdFx0IyBcdCMgZmlsbFBhdHRlcm5JbWFnZVxuXHRcdFx0IyBcdCMgZmlsbFxuXHRcdFx0IyBcdCMgZmlsbFBhdHRlcm5YXG5cdFx0XHQjIFx0IyBmaWxsUGF0dGVybllcblx0XHRcdCMgXHQjIGZpbGxQYXR0ZXJuT2Zmc2V0XG5cdFx0XHQjIFx0IyBvYmplY3Rcblx0XHRcdCMgXHQjIGZpbGxQYXR0ZXJuT2Zmc2V0WFxuXHRcdFx0IyBcdCMgZmlsbFBhdHRlcm5PZmZzZXRZXG5cdFx0XHQjIFx0IyBmaWxsUGF0dGVyblNjYWxlXG5cdFx0XHQjIFx0IyBvYmplY3Rcblx0XHRcdCMgXHQjIGZpbGxQYXR0ZXJuU2NhbGVYXG5cdFx0XHQjIFx0IyBmaWxsUGF0dGVyblNjYWxlWVxuXHRcdFx0IyBcdCMgZmlsbFBhdHRlcm5Sb3RhdGlvblxuXHRcdFx0IyBcdCMgZmlsbFBhdHRlcm5SZXBlYXRcblx0XHRcdCMgXHQjIGNhblxuXHRcdFx0IyBcdCMgZmlsbExpbmVhckdyYWRpZW50U3RhcnRQb2ludFxuXHRcdFx0IyBcdCMgb2JqZWN0XG5cdFx0XHQjIFx0IyBmaWxsTGluZWFyR3JhZGllbnRTdGFydFBvaW50WFxuXHRcdFx0IyBcdCMgZmlsbExpbmVhckdyYWRpZW50U3RhcnRQb2ludFlcblx0XHRcdCMgXHQjIGZpbGxMaW5lYXJHcmFkaWVudEVuZFBvaW50XG5cdFx0XHQjIFx0IyBmaWxsTGluZWFyR3JhZGllbnRFbmRQb2ludFhcblx0XHRcdCMgXHQjIGZpbGxMaW5lYXJHcmFkaWVudEVuZFBvaW50WVxuXHRcdFx0IyBcdCMgZmlsbExpbmVhckdyYWRpZW50Q29sb3JTdG9wc1xuXHRcdFx0IyBcdCMgYXJyYXlcblx0XHRcdCMgXHQjIGZpbGxSYWRpYWxHcmFkaWVudFN0YXJ0UG9pbnRcblx0XHRcdCMgXHQjIG9iamVjdFxuXHRcdFx0IyBcdCMgZmlsbFJhZGlhbEdyYWRpZW50U3RhcnRQb2ludFhcblx0XHRcdCMgXHQjIGZpbGxSYWRpYWxHcmFkaWVudFN0YXJ0UG9pbnRZXG5cdFx0XHQjIFx0IyBmaWxsUmFkaWFsR3JhZGllbnRFbmRQb2ludFxuXHRcdFx0IyBcdCMgb2JqZWN0XG5cdFx0XHQjIFx0IyBmaWxsUmFkaWFsR3JhZGllbnRFbmRQb2ludFhcblx0XHRcdCMgXHQjIGZpbGxSYWRpYWxHcmFkaWVudEVuZFBvaW50WVxuXHRcdFx0IyBcdCMgZmlsbFJhZGlhbEdyYWRpZW50U3RhcnRSYWRpdXNcblx0XHRcdCMgXHQjIGZpbGxSYWRpYWxHcmFkaWVudEVuZFJhZGl1c1xuXHRcdFx0IyBcdCMgZmlsbFJhZGlhbEdyYWRpZW50Q29sb3JTdG9wc1xuXHRcdFx0IyBcdCMgYXJyYXlcblx0XHRcdCMgXHQjIGZpbGxFbmFibGVkXG5cdFx0XHQjIFx0IyBmbGFnXG5cdFx0XHQjIFx0IyBmaWxsUHJpb3JpdHlcblx0XHRcdCMgXHQjIGNhblxuXHRcdFx0IyBcdCMgc3Ryb2tlXG5cdFx0XHQjIFx0IyBzdHJva2Vcblx0XHRcdCMgXHQjIHN0cm9rZVJlZFxuXHRcdFx0IyBcdCMgc2V0XG5cdFx0XHQjIFx0IyBzdHJva2VHcmVlblxuXHRcdFx0IyBcdCMgc2V0XG5cdFx0XHQjIFx0IyBzdHJva2VCbHVlXG5cdFx0XHQjIFx0IyBzZXRcblx0XHRcdCMgXHQjIHN0cm9rZUFscGhhXG5cdFx0XHQjIFx0IyBzZXRcblx0XHRcdCMgXHQjIHN0cm9rZVdpZHRoXG5cdFx0XHQjIFx0IyBzdHJva2Vcblx0XHRcdCMgXHQjIHN0cm9rZVNjYWxlRW5hYmxlZFxuXHRcdFx0IyBcdCMgZmxhZ1xuXHRcdFx0IyBcdCMgc3Ryb2tlRW5hYmxlZFxuXHRcdFx0IyBcdCMgZmxhZ1xuXHRcdFx0IyBcdCMgbGluZUpvaW5cblx0XHRcdCMgXHQjIGNhblxuXHRcdFx0IyBcdCMgbGluZUNhcFxuXHRcdFx0IyBcdCMgY2FuXG5cdFx0XHQjIFx0IyBzaGFkb3dDb2xvclxuXHRcdFx0IyBcdCMgc2hhZG93UmVkXG5cdFx0XHQjIFx0IyBzZXRcblx0XHRcdCMgXHQjIHNoYWRvd0dyZWVuXG5cdFx0XHQjIFx0IyBzZXRcblx0XHRcdCMgXHQjIHNoYWRvd0JsdWVcblx0XHRcdCMgXHQjIHNldFxuXHRcdFx0IyBcdCMgc2hhZG93QWxwaGFcblx0XHRcdCMgXHQjIHNldFxuXHRcdFx0IyBcdCMgc2hhZG93Qmx1clxuXHRcdFx0IyBcdCMgc2hhZG93T2Zmc2V0XG5cdFx0XHQjIFx0IyBvYmplY3Rcblx0XHRcdCMgXHQjIHNoYWRvd09mZnNldFhcblx0XHRcdCMgXHQjIHNoYWRvd09mZnNldFlcblx0XHRcdCMgXHQjIHNoYWRvd09wYWNpdHlcblx0XHRcdCMgXHQjIHNoYWRvd1xuXHRcdFx0IyBcdCMgc2hhZG93RW5hYmxlZFxuXHRcdFx0IyBcdCMgZmxhZ1xuXHRcdFx0IyBcdCMgZGFzaFxuXHRcdFx0IyBcdCMgZGFzaEVuYWJsZWRcblx0XHRcdCMgXHQjIGZsYWdcblx0XHRcdCMgXHQjIHZpc2libGVcblx0XHRcdCMgXHQjIGxpc3RlbmluZ1xuXHRcdFx0IyBcdCMgd2hldGhlclxuXHRcdFx0IyBcdCMgaWRcblx0XHRcdCMgXHQjIHVuaXF1ZVxuXHRcdFx0IyBcdCMgbmFtZVxuXHRcdFx0IyBcdCMgbm9uXG5cdFx0XHQjIFx0IyBvcGFjaXR5XG5cdFx0XHQjIFx0IyBkZXRlcm1pbmVzXG5cdFx0XHQjIFx0IyBzY2FsZVxuXHRcdFx0IyBcdCMgc2V0XG5cdFx0XHQjIFx0IyBzY2FsZVhcblx0XHRcdCMgXHQjIHNldFxuXHRcdFx0IyBcdCMgc2NhbGVZXG5cdFx0XHQjIFx0IyBzZXRcblx0XHRcdCMgXHQjIHJvdGF0aW9uXG5cdFx0XHQjIFx0IyByb3RhdGlvblxuXHRcdFx0IyBcdCMgb2Zmc2V0XG5cdFx0XHQjIFx0IyBvZmZzZXRcblx0XHRcdCMgXHQjIG9mZnNldFhcblx0XHRcdCMgXHQjIHNldFxuXHRcdFx0IyBcdCMgb2Zmc2V0WVxuXHRcdFx0IyBcdCMgc2V0XG5cdFx0XHQjIFx0IyBkcmFnZ2FibGVcblx0XHRcdCMgXHQjIG1ha2VzXG5cdFx0XHQjIFx0IyBkcmFnRGlzdGFuY2Vcblx0XHRcdCMgXHQjIGRyYWdCb3VuZEZ1bmNcblxuXHRcdFx0IyBAc3RhZ2UuYWRkIGxheWVyXG5cdFx0XHRAc3RhZ2UuZHJhdygpXG5cdFx0XHRsYXllciA9IEBzdGFnZS5jaGlsZHJlblswXVxuXHRcdFx0QHN0YWdlLmJhY2tncm91bmQgPSBAc3RhZ2UuYmFja2dyb3VuZCBvciBuZXcgYXBwLkNhcmRHZW5lcmF0b3IuY2FyZHMuQ2FyZE1vZGVsKClcblx0XHRcdGlmIGxheWVyIGFuZCBsYXllci5jYW52YXNcblx0XHRcdFx0YXBwLkNhcmRHZW5lcmF0b3IuZ2VuZXJhdG9ycy5ncmFkaWVudEdlbi5kcmF3KGxheWVyLmNhbnZhcy5fY2FudmFzLCBAc3RhZ2UuYmFja2dyb3VuZCApXG5cbiJdfQ==