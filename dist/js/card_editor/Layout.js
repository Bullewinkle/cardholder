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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL0xheW91dC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOzs7c0JBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxZQUFaLEVBQTBCLFNBQUMsVUFBRCxHQUFBO0FBR3pCLFFBQUEsMEZBQUE7QUFBQSxJQUFNO0FBQU4sMkNBQUEsQ0FBQTs7OztPQUFBOztnQ0FBQTs7T0FBaUMsUUFBUSxDQUFDLE1BQTFDLENBQUE7QUFBQSxJQUVNO0FBQ0wsd0NBQUEsQ0FBQTs7OztPQUFBOztBQUFBLGdDQUFBLEtBQUEsR0FBTyxrQkFBUCxDQUFBOzs2QkFBQTs7T0FENkIsUUFBUSxDQUFDLFdBRnZDLENBQUE7QUFBQSxJQUtNO0FBQ0wsbUNBQUEsQ0FBQTs7OztPQUFBOztBQUFBLDJCQUFBLFFBQUEsR0FDQztBQUFBLFFBQUEsU0FBQSxFQUFXLFNBQVg7QUFBQSxRQUNBLGVBQUEsRUFBcUIsSUFBQSxlQUFBLENBQUEsQ0FEckI7T0FERCxDQUFBOzt3QkFBQTs7T0FEd0IsUUFBUSxDQUFDLE1BTGxDLENBQUE7QUFBQSxJQVVNO0FBQ0wsd0NBQUEsQ0FBQTs7OztPQUFBOztBQUFBLGdDQUFBLEtBQUEsR0FBTyxVQUFQLENBQUE7OzZCQUFBOztPQUQ2QixRQUFRLENBQUMsV0FWdkMsQ0FBQTtBQUFBLElBYU07QUFDTCxvQ0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsNEJBQUEsUUFBQSxHQUNDO0FBQUEsUUFBQSxlQUFBLEVBQXFCLElBQUEsZUFBQSxDQUFBLENBQXJCO09BREQsQ0FBQTs7eUJBQUE7O09BRHlCLFFBQVEsQ0FBQyxNQWJuQyxDQUFBO0FBQUEsSUFpQk07QUFDTCxvQ0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsNEJBQUEsUUFBQSxHQUNDO0FBQUEsUUFBQSxZQUFBLEVBQWMsRUFBZDtPQURELENBQUE7O3lCQUFBOztPQUR5QixRQUFRLENBQUMsTUFqQm5DLENBQUE7V0FzQk0s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QUEsU0FBUyxDQUFDLElBQVgsQ0FBQSxFQS9CYTtNQUFBLENBclFkLENBQUE7O0FBQUEsaUNBdVNBLElBQUEsR0FBTSxTQUFBLEdBQUE7QUFDTCxZQUFBLEtBQUE7QUFBQSxRQUFBLElBQUMsQ0FBQSxPQUFELENBQVMsTUFBVCxDQUFBLENBQUE7QUFBQSxRQU9BLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxDQUFBLENBUEEsQ0FBQTtBQUFBLFFBUUEsS0FBQSxHQUFRLElBQUMsQ0FBQSxLQUFLLENBQUMsUUFBUyxDQUFBLENBQUEsQ0FSeEIsQ0FBQTtBQUFBLFFBU0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxVQUFQLEdBQW9CLElBQUMsQ0FBQSxLQUFLLENBQUMsVUFBUCxJQUF5QixJQUFBLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFNBQXhCLENBQUEsQ0FUN0MsQ0FBQTtBQVVBLFFBQUEsSUFBRyxLQUFBLElBQVUsS0FBSyxDQUFDLE1BQW5CO2lCQUNDLEdBQUcsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUF6QyxDQUE4QyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQTNELEVBQW9FLElBQUMsQ0FBQSxLQUFLLENBQUMsVUFBM0UsRUFERDtTQVhLO01BQUEsQ0F2U04sQ0FBQTs7OEJBQUE7O09BRHlDLFVBQVUsQ0FBQyxZQXpCNUI7RUFBQSxDQUExQixDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJjYXJkX2VkaXRvci9MYXlvdXQuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJAYXBwLm1vZHVsZSAnQ2FyZEVkaXRvcicsIChDYXJkRWRpdG9yKSAtPlxuXG5cdCNEZWZpbmUgZWRpdG9ycyBkYXRhIHN0cnVjcnVyZVxuXHRjbGFzcyBBYnN0cmFjdFNoYXBlTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuXG5cdGNsYXNzIFNoYXBlQ29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cblx0XHRtb2RlbDogQWJzdHJhY3RTaGFwZU1vZGVsXG5cblx0Y2xhc3MgTGF5ZXJNb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsXG5cdFx0ZGVmYXVsdHM6XG5cdFx0XHRsYXllck5hbWU6ICdEZWZhdWx0J1xuXHRcdFx0c2hhcGVDb2xsZWN0aW9uOiBuZXcgU2hhcGVDb2xsZWN0aW9uKClcblxuXHRjbGFzcyBMYXllckNvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG5cdFx0bW9kZWw6IExheWVyTW9kZWxcblxuXHRjbGFzcyBFZGl0b3JNb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsXG5cdFx0ZGVmYXVsdHM6XG5cdFx0XHRsYXllckNvbGxlY3Rpb246IG5ldyBMYXllckNvbGxlY3Rpb24oKVxuXG5cdGNsYXNzIEVkaXRvclN0YXRlIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcblx0XHRkZWZhdWx0czpcblx0XHRcdGN1cnJlbnRMYXllcjoge31cdFx0XG5cblx0IyBEZWZpbmUgZWRpdG9ycyBsYXlvdXRcdFx0XG5cdGNsYXNzIENhcmRFZGl0b3IuQ2FyZEVkaXRvckxheW91dCBleHRlbmRzIE1hcmlvbmV0dGUuTGF5b3V0Vmlld1xuXHRcdGxvZ2dpbmc6IG9uXG5cdFx0Y291bnRlcjogMFxuXG5cdFx0Y2xhc3NOYW1lOiAnY2FyZC1lZGl0b3ItbGF5b3V0J1xuXG5cdFx0dWk6XG5cdFx0XHQnY2FudmFzQ29udGFpbmVyJzogJyNjYW52YXMtY29udGFpbmVyJ1xuXHRcdFx0J2RyYXdSYW5kb21CYWNrZ3JvdW5kQnV0dG9uJzogJy5kcmF3LXJhbmRvbS1iYWNrZ3JvdW5kJ1xuXHRcdFx0J3NhdmVJbWFnZUZpbGVCdXR0b24nOiAnLnNhdmUtdG8taW1hZ2UnXG5cdFx0XHQnaWNvbnNDb250YWluZXInOiAnLmljb25zLWNvbnRhaW5lcidcblx0XHRcdFx0XHRcblx0XHRldmVudHM6XG5cdFx0XHQnY2xpY2sgQHVpLmRyYXdSYW5kb21CYWNrZ3JvdW5kQnV0dG9uJzogJ2RyYXdSYW5kb21CYWNrZ3JvdW5kQnV0dG9uJ1xuXHRcdFx0J2NsaWNrIEB1aS5zYXZlSW1hZ2VGaWxlQnV0dG9uJzogJ3NhdmVHZW5lcmF0ZWRDYXJkVG9JbWFnZSdcblxuXHRcdHJlZ2lvbnM6XG5cdFx0XHRsYXllcnNQYW5lbFJlZ2lvbjogJyNsYXllcnMtcGFuZWwtcmVnaW9uJ1xuXHRcdFx0dGV4dFBhbmVsUmVnaW9uOiAnI3RleHQtcGFuZWwtcmVnaW9uJ1xuXHRcdFx0c2hhcGVzUGFuZWxSZWdpb246ICcjc2hhcGVzLXBhbmVsLXJlZ2lvbidcblx0XHRcdGljb25zUGFuZWxSZWdpb246ICcjaWNvbnMtcGFuZWwtcmVnaW9uJ1xuXHRcdFx0YmFja2dyb3VuZHNQYW5lbFJlZ2lvbjogJyNiYWNrZ3JvdW5kcy1wYW5lbC1yZWdpb24nXG5cblx0XHRpbml0aWFsaXplOiAtPlxuXHRcdFx0QGJpbmQgJ2FsbCcsIC0+XG5cdFx0XHRcdGNvbnNvbGUubG9nIFwiQ0FSRCBFRElUT1IgTEFZT1VUOlxcdFwiLCBhcmd1bWVudHMgaWYgQGxvZ2dpbmcgaXMgb25cblxuXHRcdFx0QGVkaXRvclN0YXRlID0gbmV3IEVkaXRvclN0YXRlKClcblx0XHRcdEBtb2RlbCA9IG5ldyBFZGl0b3JNb2RlbCgpXG5cdFx0dGVtcGxhdGU6IC0+XG5cdFx0XHR0ZW1wbGF0aXplci5jYXJkRWRpdG9yLmVkaXRvciBAbW9kZWxcblxuXHRcdG9uU2hvdzogPT5cblx0XHRcdEBsaXN0ZW5UbyBhcHAsICdyZXNpemUnLCBAcmVzaXplXG5cblx0XHRcdCNEZWZpbmUgS2luZXRpYyBzdGFnZVxuXHRcdFx0c3RhZ2VXaWR0aCA9IEB1aS5jYW52YXNDb250YWluZXIud2lkdGgoKVxuXHRcdFx0c3RhZ2VIZWlnaHQgPSBAdWkuY2FudmFzQ29udGFpbmVyLmhlaWdodCgpXG5cdFx0XHRAc3RhZ2UgPSBuZXcgS2luZXRpYy5TdGFnZVxuXHRcdFx0XHRjb250YWluZXI6IFwiY2FudmFzLWNvbnRhaW5lclwiXG5cdFx0XHRcdHdpZHRoOiBzdGFnZVdpZHRoXG5cdFx0XHRcdGhlaWdodDogc3RhZ2VXaWR0aCAqIDAuNTYyNVxuXHRcdFx0c3RhZ2VQYXJhbXMgPVxuXHRcdFx0XHRzY2FsZTogQHN0YWdlLnNjYWxlKClcblx0XHRcdFx0d2lkdGg6IEB1aS5jYW52YXNDb250YWluZXIuaW5uZXJXaWR0aCgpXG5cdFx0XHRcdGhlaWdodDogQHVpLmNhbnZhc0NvbnRhaW5lci5pbm5lckhlaWdodCgpXG5cdFx0XHRAZWRpdG9yU3RhdGUuc2V0ICdzdGFnZVBhcmFtcycsIHN0YWdlUGFyYW1zXG5cblx0XHRcdCMgRGVmaW5lIEdVSSBwYW5lbHMsIG11c3QgYmUgaW4gdGhlIGVuZCBvZiBzaG93aW5nIGxvZ2ljLCBiZWNhdXNlIG9mIGNhbnZhcyByZW5kZXJpbmdcblx0XHRcdEBfc2hvd0d1aVBhbmVscygpXG5cblx0XHRcdEBsaXN0ZW5UbyBAbW9kZWwsICdjaGFuZ2UnLCBAZHJhd1xuXHRcdFx0QGxpc3RlblRvIEBtb2RlbC5nZXQoJ2xheWVyQ29sbGVjdGlvbicpLCAnYWRkJywgQGFkZExheWVyXG5cdFx0XHRAbGlzdGVuVG8gQG1vZGVsLmdldCgnbGF5ZXJDb2xsZWN0aW9uJyksICdyZW1vdmUnLCBAcmVtb3ZlTGF5ZXJcblx0XHRcdEBsaXN0ZW5UbyBAbW9kZWwuZ2V0KCdsYXllckNvbGxlY3Rpb24nKSwgJ3Jlc2V0IHNldCBzeW5jIGZldGNoJywgQGRyYXdcblxuXHRcdFx0IyBBZGQgZmlyc3QgbGF5ZXJzXG5cdFx0XHRAbW9kZWwuZ2V0KCdsYXllckNvbGxlY3Rpb24nKS5hZGQgbGF5ZXJOYW1lOiBcItCk0L7QvVwiIGlmIEBtb2RlbC5nZXQoJ2xheWVyQ29sbGVjdGlvbicpLmxlbmd0aCBpcyAwXG5cdFx0XHRAbW9kZWwuZ2V0KCdsYXllckNvbGxlY3Rpb24nKS5hZGQgbGF5ZXJOYW1lOiBcItCh0LvQvtC5ICN7IEBtb2RlbC5nZXQoJ2xheWVyQ29sbGVjdGlvbicpLmxlbmd0aCB9XCIgaWYgQG1vZGVsLmdldCgnbGF5ZXJDb2xsZWN0aW9uJykubGVuZ3RoIGlzIDFcblx0XHRcdEBlZGl0b3JTdGF0ZS5zZXQgJ2N1cnJlbnRMYXllcicsIEBtb2RlbC5nZXQoJ2xheWVyQ29sbGVjdGlvbicpLm1vZGVsc1swXVxuXHRcdFx0Y29uc29sZS5sb2cgJ2N1cnJlbnQgbGF5ZXInLEBlZGl0b3JTdGF0ZS5nZXQgJ2N1cnJlbnRMYXllcidcblx0XHRcdFxuXHRcdFx0bGF5ZXIgPSBAc3RhZ2UuY2hpbGRyZW5bMF1cblx0XHRcdGlmIGxheWVyIGFuZCBsYXllci5jYW52YXNcblx0XHRcdFx0YXBwLkNhcmRHZW5lcmF0b3IuZ2VuZXJhdG9ycy5ncmFkaWVudEdlbi5kcmF3KGxheWVyLmNhbnZhcy5fY2FudmFzLCAobmV3IGFwcC5DYXJkR2VuZXJhdG9yLmNhcmRzLkNhcmRNb2RlbCgpKSlcblxuXHRcdFx0QGxpc3RlblRvIEBlZGl0b3JTdGF0ZS5nZXQoJ2N1cnJlbnRMYXllcicpLmdldCgnc2hhcGVDb2xsZWN0aW9uJyksICdhZGQnLCBAb25BZGRTaGFwZVxuXHRcdFx0QGxpc3RlblRvIEBlZGl0b3JTdGF0ZS5nZXQoJ2N1cnJlbnRMYXllcicpLmdldCgnc2hhcGVDb2xsZWN0aW9uJyksICdyZW1vdmUnLCBAb25SZW1vdmVTaGFwZVxuXHRcdFx0QGxpc3RlblRvIEBlZGl0b3JTdGF0ZS5nZXQoJ2N1cnJlbnRMYXllcicpLmdldCgnc2hhcGVDb2xsZWN0aW9uJyksICdyZXNldCBzZXQgc3luYyBmZXRjaCcsIEBkcmF3XG5cblx0XHRcdCMgaWNvbnMtY29udGFpbmVyXG5cdFx0XHRAZHJhdygpXG5cblx0XHRcdCMgU0hPVyBGSVhFU1xuXHRcdFx0IyByYW5kb21JY29uID0gYXBwLmdldFJhbmRvbSgwLCBAaWNvbnNQYW5lbFJlZ2lvbi5jdXJyZW50Vmlldy5jaGlsZHJlbi5sZW5ndGgtMSlcblx0XHRcdCMgY29uc29sZS5sb2cgQGljb25zUGFuZWxSZWdpb24uY3VycmVudFZpZXcuY2hpbGRyZW4sIFwidmlldyN7cmFuZG9tSWNvbn1cIlxuXHRcdFx0IyBAaWNvbnNQYW5lbFJlZ2lvbi5jdXJyZW50Vmlldy5jaGlsZHJlbi50b0FycmF5KClbcmFuZG9tSWNvbl0uJGVsLnRyaWdnZXIoJ2NsaWNrJylcblx0XHRcdEB0ZXh0UGFuZWxSZWdpb24uY3VycmVudFZpZXcubW9kZWwuc2V0ICduYW1lJywgJ9Ch0LXQvNC10L0nXG5cblx0XHRfc2hvd0d1aVBhbmVsczogPT5cblx0XHRcdEBsYXllcnNQYW5lbFJlZ2lvbi5zaG93IG5ldyBDYXJkRWRpdG9yLnZpZXdzLkxheWVyc1BhbmVsIFxuXHRcdFx0XHRzdGF0ZTogQGVkaXRvclN0YXRlXG5cdFx0XHRcdG1vZGVsOiBAbW9kZWxcblxuXHRcdFx0QHRleHRQYW5lbFJlZ2lvbi5zaG93IG5ldyBDYXJkRWRpdG9yLnZpZXdzLlRleHRQYW5lbCBcblx0XHRcdFx0c3RhdGU6IEBlZGl0b3JTdGF0ZVxuXHRcdFx0XHRtb2RlbDogQG1vZGVsXG5cdFx0XHRAbGlzdGVuVG8gQHRleHRQYW5lbFJlZ2lvbi5jdXJyZW50VmlldywgJ3RleHQ6Y2hhbmdlZCcsIEBvblRleHRDaGFuZ2VcblxuXHRcdFx0QHNoYXBlc1BhbmVsUmVnaW9uLnNob3cgbmV3IENhcmRFZGl0b3Iudmlld3MuTGF5ZXJDaGlsZHNQYW5lbCBcblx0XHRcdFx0c3RhdGU6IEBlZGl0b3JTdGF0ZVxuXHRcdFx0XHRtb2RlbDogQG1vZGVsXG5cblx0XHRcdEBpY29uc1BhbmVsUmVnaW9uLnNob3cgbmV3IENhcmRFZGl0b3Iudmlld3MuSWNvbnNQYW5lbCBcblx0XHRcdFx0c3RhdGU6IEBlZGl0b3JTdGF0ZVxuXHRcdFx0XHRtb2RlbDogQG1vZGVsXG5cdFx0XHRAbGlzdGVuVG8gQGljb25zUGFuZWxSZWdpb24uY3VycmVudFZpZXcsICdjaGlsZHZpZXc6Y2xpY2s6aWNvbicsIEBvbkFkZEljb25cblxuXHRcdFx0IyBkZWJ1Z2dlcjtcblx0XHRcdEBiYWNrZ3JvdW5kc1BhbmVsUmVnaW9uLnNob3cgbmV3IENhcmRFZGl0b3Iudmlld3MuQmFja2dyb3VuZHNQYW5lbFxuXHRcdFx0XHRzdGF0ZTogQGVkaXRvclN0YXRlXG5cdFx0XHRcdG1vZGVsOiBAbW9kZWxcblxuXHRcdG9uQWRkSWNvbjogKHZpZXcsIG9wdGlvbnMsIGFyZ3MuLi4pID0+XG5cdFx0XHRsYXllciA9IEBzdGFnZS5jaGlsZHJlbltAc3RhZ2UuY2hpbGRyZW4ubGVuZ3RoLTJdXG5cblx0XHRcdCMgc2hhcGUgPSBuZXcgS2luZXRpYy5SZWd1bGFyUG9seWdvblxuXHRcdFx0IyBcdHg6IGFwcC5nZXRSYW5kb20gMCwgQHN0YWdlLmdldFdpZHRoKClcblx0XHRcdCMgXHR5OiBhcHAuZ2V0UmFuZG9tIDAsIEBzdGFnZS5nZXRIZWlnaHQoKVxuXHRcdFx0IyBcdHNpZGVzOiBhcHAuZ2V0UmFuZG9tIDMsIDlcblx0XHRcdCMgXHRyYWRpdXM6IGFwcC5nZXRSYW5kb20gMTAsIDE0MFxuXHRcdFx0XHQjIGZpbGxSZWQ6IGFwcC5nZXRSYW5kb20gMSwgMjU1XG5cdFx0XHRcdCMgZmlsbEdyZWVuOiBhcHAuZ2V0UmFuZG9tIDEsIDI1NVxuXHRcdFx0XHQjIGZpbGxCbHVlOiBhcHAuZ2V0UmFuZG9tIDEsIDI1NVxuXHRcdFx0IyBcdG9wYWNpdHk6IGFwcC5nZXRSYW5kb20gMC4xLCAxLCAyXG5cdFx0XHQjIFx0ZHJhZ2dhYmxlOiB0cnVlXG5cblx0XHRcdGljb25Hcm91cCA9IG5ldyBLaW5ldGljLkdyb3VwXG5cdFx0XHRcdGRyYWdnYWJsZTogdHJ1ZVxuXG5cdFx0XHRpY29uID0gbmV3IEtpbmV0aWMuVGV4dFxuXHRcdFx0XHR4OiAoQHN0YWdlLmdldFdpZHRoKCkvMiktMTAwXG5cdFx0XHRcdHk6IChAc3RhZ2UuZ2V0SGVpZ2h0KCkvMiktMTAwXG5cdFx0XHRcdHRleHQ6IG9wdGlvbnMubW9kZWwuZ2V0ICdjb250ZW50J1xuXHRcdFx0XHRmb250U2l6ZTogMTIwXG5cdFx0XHRcdGZvbnRGYW1pbHk6ICdjYXJkaG9sZGVyLWljb25zJ1xuXHRcdFx0XHRmaWxsUmVkOiBhcHAuZ2V0UmFuZG9tIDEsIDI1NVxuXHRcdFx0XHRmaWxsR3JlZW46IGFwcC5nZXRSYW5kb20gMSwgMjU1XG5cdFx0XHRcdGZpbGxCbHVlOiBhcHAuZ2V0UmFuZG9tIDEsIDI1NVxuXHRcdFx0XHR3aWR0aDogMTIwXG5cdFx0XHRcdGhlaWdodDogMTIwXG5cdFx0XHRcdGFsaWduOiAnY2VudGVyJ1xuXG5cblxuXHRcdFx0aWNvbkdyb3VwLmFkZCBpY29uXG5cdFx0XHRcblx0XHRcdEBhZGREcnVnSGFuZGxlcihpY29uR3JvdXAsIGljb24uZ2V0WCgpK2ljb24uZ2V0V2lkdGgoKSwgaWNvbi5nZXRZKCksICdmaXJzdCcpXG5cblx0XHRcdGxheWVyLmFkZCBpY29uR3JvdXBcblx0XHRcdGxheWVyLmRyYXcoKVxuXG5cdFx0YWRkRHJ1Z0hhbmRsZXI6IChncm91cCwgeCwgeSwgbmFtZSkgPT5cblx0XHRcdHN0YWdlID0gZ3JvdXAuZ2V0U3RhZ2UoKVxuXHRcdFx0bGF5ZXIgPSBncm91cC5nZXRMYXllcigpXG5cblx0XHRcdGRydWdIYW5kbGVyID0gbmV3IEtpbmV0aWMuQ2lyY2xlXG5cdFx0XHRcdHg6IHhcblx0XHRcdFx0eTogeVxuXHRcdFx0XHRzdHJva2U6ICcjNjY2J1xuXHRcdFx0XHRmaWxsOiAnI2RkZCdcblx0XHRcdFx0c3Ryb2tlV2lkdGg6IDJcblx0XHRcdFx0cmFkaXVzOiA4XG5cdFx0XHRcdG5hbWU6IG5hbWVcblx0XHRcdFx0ZHJhZ2dhYmxlOiB0cnVlXG5cdFx0XHRcdGRyYWdPblRvcDogZmFsc2VcblxuXHRcdFx0ZHJ1Z0hhbmRsZXIub24gJ2RyYWdtb3ZlJywgLT5cblx0XHRcdFx0Y29uc29sZS5sb2cgJ2RyYWdtb3ZlJ1xuXHRcdFx0IyBcdHVwZGF0ZSh0aGlzKVxuXHRcdFx0IyBcdGxheWVyLmRyYXcoKVxuXHRcdFx0ZHJ1Z0hhbmRsZXIub24gJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgLT5cblx0XHRcdFx0Y29uc29sZS5sb2cgJ21vdXNlZG93biB0b3VjaHN0YXJ0J1xuXHRcdFx0IyBcdGdyb3VwLnNldERyYWdnYWJsZShmYWxzZSlcblx0XHRcdCMgXHR0aGlzLm1vdmVUb1RvcCgpXG5cdFx0XHRkcnVnSGFuZGxlci5vbiAnZHJhZ2VuZCcsIC0+XG5cdFx0XHRcdGNvbnNvbGUubG9nICdkcmFnZW5kJ1xuXHRcdFx0IyBcdGdyb3VwLnNldERyYWdnYWJsZSh0cnVlKVxuXHRcdFx0IyBcdGxheWVyLmRyYXcoKVxuXHRcdFx0ZHJ1Z0hhbmRsZXIub24gJ21vdXNlb3ZlcicsIC0+XG5cdFx0XHRcdGNvbnNvbGUubG9nICdtb3VzZW92ZXInXG5cdFx0XHQjIFx0dmFyIGxheWVyID0gdGhpcy5nZXRMYXllcigpXG5cdFx0XHQjIFx0ZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcidcblx0XHRcdCMgXHR0aGlzLnNldFN0cm9rZVdpZHRoKDQpXG5cdFx0XHQjIFx0bGF5ZXIuZHJhdygpXG5cdFx0XHRkcnVnSGFuZGxlci5vbiAnbW91c2VvdXQnLCAtPlxuXHRcdFx0XHRjb25zb2xlLmxvZyAnbW91c2VvdXQnXG5cdFx0XHQjIFx0dmFyIGxheWVyID0gdGhpcy5nZXRMYXllcigpXG5cdFx0XHQjIFx0ZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCdcblx0XHRcdCMgXHR0aGlzLnN0cm9rZVdpZHRoKDIpXG5cdFx0XHQjIFx0bGF5ZXIuZHJhdygpXG5cblx0XHRcdGdyb3VwLmFkZCBkcnVnSGFuZGxlclxuXG5cdFx0cmVzaXplOiA9PlxuXHRcdFx0QHRyaWdnZXIgJ3Jlc2l6ZSdcblx0XHRcdHN0YWdlUGFyYW1zID0gQGVkaXRvclN0YXRlLmdldCAnc3RhZ2VQYXJhbXMnXG5cdFx0XHRuZXdTdGFnZVBhcmFtcyA9IHt9XG5cblx0XHRcdG5ld1N0YWdlUGFyYW1zLndpZHRoID0gQHVpLmNhbnZhc0NvbnRhaW5lci5pbm5lcldpZHRoKCkgIyBuZXcgd2lkdGggb2YgcGFnZVxuXHRcdFx0bmV3U3RhZ2VQYXJhbXMuaGVpZ2h0ID0gbmV3U3RhZ2VQYXJhbXMud2lkdGggKiAwLjU2MjUgIyBuZXcgaGVpZ2h0IG9mIHBhZ2VcblxuXHRcdFx0eFNjYWxlID0gKG5ld1N0YWdlUGFyYW1zLndpZHRoIC8gc3RhZ2VQYXJhbXMud2lkdGgpICogc3RhZ2VQYXJhbXMuc2NhbGUueCAjIHBlcmNlbnQgY2hhbmdlIGluIHdpZHRoIChFeDogMTAwMCAtIDQwMC8xMDAwIG1lYW5zIHRoZSBwYWdlIHNjYWxlZCBkb3duIDYwJSwgeW91IHNob3VsZCBwbGF5IHdpdGggdGhpcyB0byBnZXQgd2FudGVkIHJlc3VsdHMpXG5cdFx0XHR5U2NhbGUgPSAobmV3U3RhZ2VQYXJhbXMuaGVpZ2h0IC8gc3RhZ2VQYXJhbXMuaGVpZ2h0KSAqIHN0YWdlUGFyYW1zLnNjYWxlLnlcblxuXHRcdFx0bmV3U3RhZ2VQYXJhbXMuc2NhbGUgPVxuXHRcdFx0XHR4OiB4U2NhbGVcblx0XHRcdFx0eTogeVNjYWxlXG5cdFx0XHRAc3RhZ2Uuc2V0V2lkdGggbmV3U3RhZ2VQYXJhbXMud2lkdGhcblx0XHRcdEBzdGFnZS5zZXRIZWlnaHQgbmV3U3RhZ2VQYXJhbXMuaGVpZ2h0XG5cdFx0XHRAc3RhZ2Uuc2V0U2NhbGUgbmV3U3RhZ2VQYXJhbXMuc2NhbGVcblxuXHRcdFx0QGVkaXRvclN0YXRlLnNldCAnc3RhZ2VQYXJhbXMnLCBuZXdTdGFnZVBhcmFtc1xuXG5cdFx0XHRAZHJhdygpXG5cblxuXHRcdHNhdmVHZW5lcmF0ZWRDYXJkVG9JbWFnZTogPT5cblx0XHRcdEBzdGFnZS50b0RhdGFVUkxcblx0XHRcdFx0bWl0ZVR5cGU6IFwiaW1hZ2UvcG5nXCJcblx0XHRcdFx0Y2FsbGJhY2s6IChkYXRhKSAtPlxuXHRcdFx0XHRcdCMgaW1hZ2UgPSBkYXRhLnJlcGxhY2UoXCJpbWFnZS9wbmdcIiwgXCJpbWFnZS9vY3RldC1zdHJlYW1cIilcblx0XHRcdFx0XHRpbWFnZSA9IGRhdGFcblx0XHRcdFx0XHRpbWFnZVdpbmRvdyA9IHdpbmRvdy5vcGVuKGltYWdlKVxuXHRcdFx0XHRcdCQoaW1hZ2VXaW5kb3cuZG9jdW1lbnQuYm9keSkucHJlcGVuZChcIjxwPtCd0LDQttC80LjRgtC1INGB0L7RhdGA0LDQvdC40YLRjCAoY3RybC9jbWQgKyBzKTwvcD5cIilcblxuXHRcdGFkZExheWVyOiAobGF5ZXJNb2RlbCwgbGF5ZXJDb2xsZWN0aW9uLCBvcHRpb25zKSA9PlxuXHRcdFx0Y29uc29sZS5sb2cgJ2FkZCBsYXllciB0byBzdGFnZSdcblx0XHRcdHBhcmFtcyA9IGxheWVyTW9kZWwudG9KU09OKClcblx0XHRcdGxheWVyID0gbmV3IEtpbmV0aWMuTGF5ZXIgcGFyYW1zXG5cdFx0XHRAc3RhZ2UuYWRkIGxheWVyXG5cblx0XHRyZW1vdmVMYXllcjogKGxheWVyTW9kZWwsIGxheWVyQ29sbGVjdGlvbiwgb3B0aW9ucykgPT5cblx0XHRcdGNvbnNvbGUubG9nICdhZGQgbGF5ZXIgdG8gc3RhZ2UnXG5cdFx0XHRsYXllcnMgPSBAc3RhZ2UuZ2V0TGF5ZXJzKClcblx0XHRcdGlmIGxheWVycy5sZW5ndGggPiAxXG5cdFx0XHRcdGxheWVyc1tsYXllcnMubGVuZ3RoLTFdLmRlc3Ryb3koKVxuXG5cdFx0b25BZGRTaGFwZTogPT5cblx0XHRcdGNvbnNvbGUubG9nICdhZGRTaGFwZSdcblxuXHRcdFx0bGF5ZXIgPSBAc3RhZ2UuY2hpbGRyZW5bQHN0YWdlLmNoaWxkcmVuLmxlbmd0aC0xXVxuXG5cdFx0XHRzaGFwZSA9IG5ldyBLaW5ldGljLlJlZ3VsYXJQb2x5Z29uXG5cdFx0XHRcdHg6IGFwcC5nZXRSYW5kb20gMCwgQHN0YWdlLmdldFdpZHRoKClcblx0XHRcdFx0eTogYXBwLmdldFJhbmRvbSAwLCBAc3RhZ2UuZ2V0SGVpZ2h0KClcblx0XHRcdFx0c2lkZXM6IGFwcC5nZXRSYW5kb20gMywgOVxuXHRcdFx0XHRyYWRpdXM6IGFwcC5nZXRSYW5kb20gMTAsIDE0MFxuXHRcdFx0XHRmaWxsUmVkOiBhcHAuZ2V0UmFuZG9tIDEsIDI1NVxuXHRcdFx0XHRmaWxsR3JlZW46IGFwcC5nZXRSYW5kb20gMSwgMjU1XG5cdFx0XHRcdGZpbGxCbHVlOiBhcHAuZ2V0UmFuZG9tIDEsIDI1NVxuXHRcdFx0XHRvcGFjaXR5OiBhcHAuZ2V0UmFuZG9tIDAuMSwgMSwgMlxuXHRcdFx0XHRkcmFnZ2FibGU6IHRydWVcblx0XHRcdGxheWVyLmFkZCBzaGFwZVxuXHRcdFx0bGF5ZXIuZHJhdygpXG5cblx0XHRcdFxuXHRcdG9uUmVtb3ZlU2hhcGU6ID0+XG5cdFx0XHRjb25zb2xlLmxvZyAncmVtb3ZlU2hhcGUnXG5cdFx0XHRsYXllciA9IEBzdGFnZS5jaGlsZHJlbltAc3RhZ2UuY2hpbGRyZW4ubGVuZ3RoLTFdXG5cdFx0XHRzaGFwZXMgPSBsYXllci5jaGlsZHJlblxuXHRcdFx0aWYgc2hhcGVzIGFuZCBzaGFwZXMubGVuZ3RoID4gMFxuXHRcdFx0XHRzaGFwZXNbc2hhcGVzLmxlbmd0aC0xXS5kZXN0cm95KClcblx0XHRcdFx0bGF5ZXIuZHJhdygpXHRcblxuXHRcdGRyYXdSYW5kb21CYWNrZ3JvdW5kQnV0dG9uOiA9PlxuXHRcdFx0IyBsYXllciA9IEBzdGFnZS5jaGlsZHJlblswXS5jYW52YXMuX2NhbnZhc1xuXHRcdFx0IyBsYXllci5nZXRDb250ZXh0KCcyZCcpLmNsZWFyUmVjdCgwLDAsbGF5ZXIud2lkdGgsbGF5ZXIuaGVpZ2h0KVxuXHRcdFx0QHN0YWdlLmJhY2tncm91bmQgPSBuZXcgYXBwLkNhcmRHZW5lcmF0b3IuY2FyZHMuQ2FyZE1vZGVsKClcblx0XHRcdCMgYXBwLkNhcmRHZW5lcmF0b3IuZ2VuZXJhdG9ycy5ncmFkaWVudEdlbi5kcmF3KGxheWVyLCBAc3RhZ2UuYmFja2dyb3VuZCApXG5cdFx0XHRAZHJhdygpXG5cblx0XHRvblRleHRDaGFuZ2U6ICh0ZXh0KSA9PlxuXHRcdFx0Y29uc29sZS5pbmZvIHRleHRcblx0XHRcdCMgdW5sZXNzIEB0ZXh0TGF5ZXIgdGhlbiBcblx0XHRcdCMgXHRAdGV4dExheWVyID0gbmV3IEtpbmV0aWMuRmFzdExheWVyIGNsZWFyQmVmb3JlRHJhdzogdHJ1ZVxuXHRcdFx0IyBcdEBzdGFnZS5hZGQgQHRleHRMYXllclxuXHRcdFx0dW5sZXNzIEB0ZXh0TGF5ZXJcblx0XHRcdFx0QHRleHRMYXllciA9IG5ldyBLaW5ldGljLkxheWVyKClcblx0XHRcdFx0QHN0YWdlLmFkZCBAdGV4dExheWVyXG5cdFx0XHQjIGxheWVyID0gQHN0YWdlLmNoaWxkcmVuW0BzdGFnZS5jaGlsZHJlbi5sZW5ndGgtMV1cblx0XHRcdGNvbnNvbGUubG9nIEB0ZXh0TGF5ZXJcblxuXHRcdFx0dW5sZXNzIEB0ZXh0TGF5ZXIuY2hpbGRyZW5bMF1cblx0XHRcdFx0Y2FyZFRleHQgPSBuZXcgS2luZXRpYy5UZXh0XG5cdFx0XHRcdFx0eDogMjBcblx0XHRcdFx0XHR5OiAyMFxuXHRcdFx0XHRcdGZvbnRTaXplOiAyMlxuXHRcdFx0XHRcdGZvbnRGYW1pbHk6ICdcIkhlbHZldGljYSBOZXVlXCIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYnXG5cdFx0XHRcdFx0ZmlsbDogJyMzMzMnXG5cdFx0XHRcdFx0d2lkdGg6IEBzdGFnZS53aWR0aCgpLzEuMjVcblx0XHRcdFx0XHRwYWRkaW5nOiAyMFxuXHRcdFx0XHRcdGFsaWduOiAnbGVmdCdcblx0XHRcdFx0XHRkcmFnZ2FibGU6IHRydWVcblx0XHRcdFx0QHRleHRMYXllci5hZGQgY2FyZFRleHRcblx0XHRcdGVsc2Vcblx0XHRcdFx0Y2FyZFRleHQgPSBAdGV4dExheWVyLmNoaWxkcmVuWzBdXHRcblxuXHRcdFx0Y29uc29sZS5sb2cgY2FyZFRleHRcblx0XHRcdGNhcmRUZXh0LnNldFRleHQgXCLQmNC80Y86IFxcdFxcdCN7dGV4dC5uYW1lfSBcXG7QpNCw0LzQuNC70LjRjzogXFx0XFx0I3sgdGV4dC5zdXJuYW1lIH0gXFxuRW1haWw6IFxcdFxcdCN7dGV4dC5lbWFpbH0gXFxu0KLQtdC70LXRhNC+0L06IFxcdFxcdCN7dGV4dC5waG9uZX0gXFxu0JTQvtC70LbQvdC+0YHRgtGMOiBcXHRcXHQje3RleHQucG9zaXRpb259XCJcblxuXG5cblx0XHRcdEB0ZXh0TGF5ZXIuZHJhdygpXG5cblxuXHRcdGRyYXc6ID0+XG5cdFx0XHRAdHJpZ2dlciAnZHJhdydcblx0XHRcdCMgY29uc29sZS5sb2cgJ2VkaXRvciBtb2RlbCBjaGFuZ2VkLCBkcmF3ICcsIGFyZ3VtZW50c1xuXHRcdFx0IyBsYXllciA9IG5ldyBLaW5ldGljLkZhc3RMYXllcigpXG5cdFx0XHQjIGxheWVyLmFkZCBuZXcgS2luZXRpYy5SZWN0XG5cdFx0XHQjIFx0eDowLCB5OjAsIHdpZHRoOiBAc3RhZ2Uud2lkdGgoKSwgaGVpZ2h0OiBAc3RhZ2UuaGVpZ2h0KClcblxuXHRcdFx0IyBAc3RhZ2UuYWRkIGxheWVyXG5cdFx0XHRAc3RhZ2UuZHJhdygpXG5cdFx0XHRsYXllciA9IEBzdGFnZS5jaGlsZHJlblswXVxuXHRcdFx0QHN0YWdlLmJhY2tncm91bmQgPSBAc3RhZ2UuYmFja2dyb3VuZCBvciBuZXcgYXBwLkNhcmRHZW5lcmF0b3IuY2FyZHMuQ2FyZE1vZGVsKClcblx0XHRcdGlmIGxheWVyIGFuZCBsYXllci5jYW52YXNcblx0XHRcdFx0YXBwLkNhcmRHZW5lcmF0b3IuZ2VuZXJhdG9ycy5ncmFkaWVudEdlbi5kcmF3KGxheWVyLmNhbnZhcy5fY2FudmFzLCBAc3RhZ2UuYmFja2dyb3VuZCApXG5cbiJdfQ==