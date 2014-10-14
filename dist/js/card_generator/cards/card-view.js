(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('CardGenerator.cards', function(Cards) {
    return Cards.CardView = (function(_super) {
      __extends(CardView, _super);

      function CardView() {
        this.flip = __bind(this.flip, this);
        this.getRandomFont = __bind(this.getRandomFont, this);
        this.renderLayer3 = __bind(this.renderLayer3, this);
        this.renderLayer2 = __bind(this.renderLayer2, this);
        this.renderLayer1 = __bind(this.renderLayer1, this);
        this.renderCanvas = __bind(this.renderCanvas, this);
        this.renderOnBackWithAnimate = __bind(this.renderOnBackWithAnimate, this);
        this.renderOnBack = __bind(this.renderOnBack, this);
        this.renderOnFront = __bind(this.renderOnFront, this);
        this.transitionCallback = __bind(this.transitionCallback, this);
        this.loadFont = __bind(this.loadFont, this);
        this.drawCard = __bind(this.drawCard, this);
        this.onShow = __bind(this.onShow, this);
        this.template = __bind(this.template, this);
        return CardView.__super__.constructor.apply(this, arguments);
      }

      CardView.prototype.logger = false;

      CardView.prototype.tagName = 'li';

      CardView.prototype.className = 'card';

      CardView.prototype.ui = {
        canvasFront: '.card-canvas.back',
        canvasBack: '.card-canvas.front'
      };

      CardView.prototype.template = function() {
        return templatizer.cardGenerator.card(this.model);
      };

      CardView.prototype.events = {
        'mouseenter': 'onMouseEnter',
        'mouseleave': 'onMouseLeave',
        'click .js-lock-config-button': 'onLockButtonClicked',
        'transitionend': 'transitionCallback'
      };

      CardView.prototype.initialize = function() {
        this.bind('all', (function(_this) {
          return function() {
            if (_this.logger === true) {
              return console.log("CARD ITEM VIEW:\t \t \t", arguments);
            }
          };
        })(this));
        this.model.view = this;
        this.listenTo(this.model, 'change', this.drawCard);
        return this.listenTo(app, 'resize', this.renderOnFront);
      };

      CardView.prototype.onShow = function() {
        return this.drawCard();
      };

      CardView.prototype.drawCard = function() {
        if (this.model.get('data.isDefault')) {
          if (this.model.get('generators.textGen.isDefault')) {
            return this.loadFont(this.getRandomFont(), this.renderOnBackWithAnimate);
          } else {
            return this.renderOnBackWithAnimate();
          }
        } else {
          return this.renderOnFront();
        }
      };

      CardView.prototype.loadFont = function(fontFamily, callback) {
        var handleError;
        handleError = function() {
          return console.error('error loading font');
        };
        return WebFont.load({
          custom: {
            families: [fontFamily],
            urls: ['/assets/font/card_fonts/' + fontFamily + '/' + fontFamily + '.css']
          },
          fontloading: (function(_this) {
            return function() {};
          })(this),
          fontactive: (function(_this) {
            return function(fontFamily, fontOptions) {
              _this.model.set('generators.textGen.fontFamily', fontFamily, {
                silent: true
              });
              console.log('fontactive', _this.model.get('generators.textGen.fontFamily'));
              return callback();
            };
          })(this),
          fontinactive: (function(_this) {
            return function() {
              console.log('fontinactive', _this.model.get('generators.textGen.fontFamily'));
              return callback();
            };
          })(this)
        });
      };

      CardView.prototype.transitionCallback = function(e) {
        var propertyName;
        propertyName = e.originalEvent.propertyName;
        if (propertyName.search('transform') > -1) {
          return this.$el.removeClass('is-fliping');
        }
      };

      CardView.prototype.renderOnFront = function() {
        var canvas;
        console.log;
        if (!this.$el.hasClass('fliped')) {
          canvas = this.$el.find('.card-canvas.front')[0];
        } else {
          canvas = this.$el.find('.card-canvas.back')[0];
        }
        return this.renderCanvas(canvas);
      };

      CardView.prototype.renderOnBack = function() {
        var canvas;
        if (this.$el.hasClass('fliped')) {
          canvas = this.$el.find('.card-canvas.front')[0];
        } else {
          canvas = this.$el.find('.card-canvas.back')[0];
        }
        return this.renderCanvas(canvas);
      };

      CardView.prototype.renderOnBackWithAnimate = function() {
        this.renderOnBack();
        return this.flip();
      };

      CardView.prototype.renderCanvas = function(canvas) {
        canvas.width = this.$el.width();
        canvas.height = this.$el.height();
        console.log(this.model.get('generators.textGen.isDefault'));
        this.renderLayer1(canvas);
        this.renderLayer2(canvas);
        this.renderLayer3(canvas);
        return canvas;
      };

      CardView.prototype.renderLayer1 = function(canvas) {
        return app.CardGenerator.generators.gradientGen.draw(canvas, this.model);
      };

      CardView.prototype.renderLayer2 = function(canvas) {
        return app.CardGenerator.generators.iconsGen.draw(canvas, this.model);
      };

      CardView.prototype.renderLayer3 = function(canvas) {
        return app.CardGenerator.generators.textGen.draw(canvas, this.model);
      };

      CardView.prototype.getRandomFont = function() {
        var fontFamily, fontsList;
        fontsList = dataFromServer.appData.fontsList;
        fontFamily = '' + fontsList[app.getRandom(0, fontsList.length - 1)];
        return fontFamily;
      };

      CardView.prototype.flip = function() {
        this.trigger('flip');
        this.$el.toggleClass('fliped');
        return this.$el.addClass('is-fliping');
      };

      CardView.prototype.onLockButtonClicked = function() {
        if (this.model.get('is-locked') === true) {
          this.model.set('is-locked', false, {
            silent: true
          });
          return this.$el.removeClass('is-locked').find('.js-lock-config-button').text('Закрепить');
        } else {
          this.model.set('is-locked', true, {
            silent: true
          });
          return this.$el.addClass('is-locked').find('.js-lock-config-button').text('Открепить');
        }
      };

      CardView.prototype.onMouseEnter = function() {
        this.$el.addClass('is-hovered');
        this.model.set('is-hovered', true, {
          silent: true
        });
        if (!(this.model.has('is-locked') || this.model.get('is-locked'))) {
          if (this.$el.hasClass('is-fliping')) {
            this.$el.toggleClass('fliped');
          }
          return this.$el.prepend('<div class="js-lock-config-button-wrapper"><button class="js-lock-config-button">Закрепить</button></div>');
        }
      };

      CardView.prototype.onMouseLeave = function() {
        this.$el.removeClass('is-hovered');
        this.model.set('is-hovered', false, {
          silent: true
        });
        if (this.model.get('is-locked') !== true) {
          return this.$el.find('.js-lock-config-button-wrapper').remove();
        }
      };

      return CardView;

    })(Marionette.ItemView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZ2VuZXJhdG9yL2NhcmRzL2NhcmQtdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOzttU0FBQTs7QUFBQSxFQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxDQUFZLHFCQUFaLEVBQW1DLFNBQUMsS0FBRCxHQUFBO1dBQzVCLEtBQUssQ0FBQztBQUNYLGlDQUFBLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQUFBOztBQUFBLHlCQUFBLE1BQUEsR0FBUSxLQUFSLENBQUE7O0FBQUEseUJBRUEsT0FBQSxHQUFTLElBRlQsQ0FBQTs7QUFBQSx5QkFHQSxTQUFBLEdBQVcsTUFIWCxDQUFBOztBQUFBLHlCQUtBLEVBQUEsR0FDQztBQUFBLFFBQUEsV0FBQSxFQUFhLG1CQUFiO0FBQUEsUUFDQSxVQUFBLEVBQVksb0JBRFo7T0FORCxDQUFBOztBQUFBLHlCQVNBLFFBQUEsR0FBVSxTQUFBLEdBQUE7ZUFDVCxXQUFXLENBQUMsYUFBYSxDQUFDLElBQTFCLENBQStCLElBQUMsQ0FBQSxLQUFoQyxFQURTO01BQUEsQ0FUVixDQUFBOztBQUFBLHlCQVdBLE1BQUEsR0FDQztBQUFBLFFBQUEsWUFBQSxFQUFlLGNBQWY7QUFBQSxRQUNBLFlBQUEsRUFBZSxjQURmO0FBQUEsUUFFQSw4QkFBQSxFQUFnQyxxQkFGaEM7QUFBQSxRQUdBLGVBQUEsRUFBaUIsb0JBSGpCO09BWkQsQ0FBQTs7QUFBQSx5QkFrQkEsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNYLFFBQUEsSUFBQyxDQUFBLElBQUQsQ0FBTSxLQUFOLEVBQWMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFBLEdBQUE7QUFDYixZQUFBLElBQW9ELEtBQUMsQ0FBQSxNQUFELEtBQVcsSUFBL0Q7cUJBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSx5QkFBWixFQUF1QyxTQUF2QyxFQUFBO2FBRGE7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFk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LENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRfZ2VuZXJhdG9yL2NhcmRzL2NhcmQtdmlldy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkBhcHAubW9kdWxlICdDYXJkR2VuZXJhdG9yLmNhcmRzJywgKENhcmRzKSAtPlx0XG5cdGNsYXNzIENhcmRzLkNhcmRWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5JdGVtVmlld1xuXHRcdGxvZ2dlcjogb2ZmXG5cblx0XHR0YWdOYW1lOiAnbGknXG5cdFx0Y2xhc3NOYW1lOiAnY2FyZCdcblxuXHRcdHVpOlxuXHRcdFx0Y2FudmFzRnJvbnQ6ICcuY2FyZC1jYW52YXMuYmFjaydcblx0XHRcdGNhbnZhc0JhY2s6ICcuY2FyZC1jYW52YXMuZnJvbnQnXG5cblx0XHR0ZW1wbGF0ZTogPT5cblx0XHRcdHRlbXBsYXRpemVyLmNhcmRHZW5lcmF0b3IuY2FyZCBAbW9kZWxcblx0XHRldmVudHM6XG5cdFx0XHQnbW91c2VlbnRlcic6ICAnb25Nb3VzZUVudGVyJ1xuXHRcdFx0J21vdXNlbGVhdmUnOiAgJ29uTW91c2VMZWF2ZSdcblx0XHRcdCdjbGljayAuanMtbG9jay1jb25maWctYnV0dG9uJzogJ29uTG9ja0J1dHRvbkNsaWNrZWQnXG5cdFx0XHQndHJhbnNpdGlvbmVuZCc6ICd0cmFuc2l0aW9uQ2FsbGJhY2snXG5cblx0XHQjIG1vZGVsRXZlbnRzOiB7fVxuXHRcdGluaXRpYWxpemU6IC0+XG5cdFx0XHRAYmluZCAnYWxsJywgID0+IFxuXHRcdFx0XHRjb25zb2xlLmxvZyBcIkNBUkQgSVRFTSBWSUVXOlxcdCBcXHQgXFx0XCIsIGFyZ3VtZW50cyBpZiBAbG9nZ2VyIGlzIG9uXG5cdFx0XHRAbW9kZWwudmlldyA9IEBcblx0XHRcdEBsaXN0ZW5UbyBAbW9kZWwsJ2NoYW5nZScsIEBkcmF3Q2FyZFxuXHRcdFx0QGxpc3RlblRvIGFwcCwncmVzaXplJywgQHJlbmRlck9uRnJvbnRcblxuXHRcdG9uU2hvdzogPT5cblx0XHRcdEBkcmF3Q2FyZCgpXG5cblx0XHRkcmF3Q2FyZDogPT5cblx0XHRcdGlmIEBtb2RlbC5nZXQgJ2RhdGEuaXNEZWZhdWx0J1xuXHRcdFx0XHRpZiBAbW9kZWwuZ2V0ICdnZW5lcmF0b3JzLnRleHRHZW4uaXNEZWZhdWx0J1xuXHRcdFx0XHRcdEBsb2FkRm9udCBAZ2V0UmFuZG9tRm9udCgpLCBAcmVuZGVyT25CYWNrV2l0aEFuaW1hdGVcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdEByZW5kZXJPbkJhY2tXaXRoQW5pbWF0ZSgpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEByZW5kZXJPbkZyb250KClcblxuXHRcdGxvYWRGb250OiAoZm9udEZhbWlseSwgY2FsbGJhY2spID0+XG5cdFx0XHQjIExvYWQgZm9udHMgZGluYW1pY2FseSB0aHJvdWdoIGdvb2dsZSB3ZWIgbG9hZGVyXG5cdFx0XHRoYW5kbGVFcnJvciA9IC0+IGNvbnNvbGUuZXJyb3IgJ2Vycm9yIGxvYWRpbmcgZm9udCdcblxuXHRcdFx0V2ViRm9udC5sb2FkXG5cdFx0XHRcdGN1c3RvbTpcblx0XHRcdFx0XHRmYW1pbGllczogW2ZvbnRGYW1pbHldXG5cdFx0XHRcdFx0dXJsczogWycvYXNzZXRzL2ZvbnQvY2FyZF9mb250cy8nICsgZm9udEZhbWlseSArICcvJyArIGZvbnRGYW1pbHkgKyAnLmNzcyddXG5cdFx0XHRcdGZvbnRsb2FkaW5nOiAgPT5cblx0XHRcdFx0XHQjIGNvbnNvbGUubG9nICdmb250bG9hZGluZzpcXHQnLCBhcmd1bWVudHNcblx0XHRcdFx0Zm9udGFjdGl2ZTogKGZvbnRGYW1pbHksIGZvbnRPcHRpb25zKSAgPT5cblx0XHRcdFx0XHRAbW9kZWwuc2V0ICdnZW5lcmF0b3JzLnRleHRHZW4uZm9udEZhbWlseScsIGZvbnRGYW1pbHksIHNpbGVudDogdHJ1ZVxuXHRcdFx0XHRcdGNvbnNvbGUubG9nICdmb250YWN0aXZlJywgQG1vZGVsLmdldCAnZ2VuZXJhdG9ycy50ZXh0R2VuLmZvbnRGYW1pbHknXG5cdFx0XHRcdFx0IyBjb25zb2xlLmluZm8gJ2ZvbnRhY3RpdmU6XFx0IFxcdCcsIGZvbnRGYW1pbHksIEBcblx0XHRcdFx0XHQjIHdhaXQgZm90IGNvbW1vbiBjdXN0b20gZm9udHNcblx0XHRcdFx0XHRjYWxsYmFjaygpXG5cdFx0XHRcdFx0IyBpZiBkb2N1bWVudC5mb250c1xuXHRcdFx0XHRcdCMgXHRjb25zb2xlLmxvZyAnbG9hZGluZyBmb250IGJ5IGRvY3VtZW50LmZvbnRzJywgYXJndW1lbnRzXG5cdFx0XHRcdFx0IyBcdGRvY3VtZW50LmZvbnRzLmxvYWQoXCIxMHB4IGNhcmRob2xkZXItaWNvbnNcIilcblx0XHRcdFx0XHQjIFx0LnRoZW4gY2FsbGJhY2ssIGhhbmRsZUVycm9yXG5cdFx0XHRcdFx0IyBlbHNlXG5cdFx0XHRcdFx0IyBcdGNvbnNvbGUubG9nICdsb2FkaW5nIGZvbnQgYnkgQUpBWCcsIGFyZ3VtZW50c1xuXHRcdFx0XHRcdCMgXHQkLmdldCBcIi9hc3NldHMvZm9udC9jYXJkaG9sZGVyLWljb25zLndvZmY/LWE3anE1MlwiXG5cdFx0XHRcdFx0IyBcdC50aGVuIGNhbGxiYWNrLCBoYW5kbGVFcnJvclxuXHRcdFx0XHRmb250aW5hY3RpdmU6ICA9PlxuXHRcdFx0XHRcdGNvbnNvbGUubG9nICdmb250aW5hY3RpdmUnLCBAbW9kZWwuZ2V0ICdnZW5lcmF0b3JzLnRleHRHZW4uZm9udEZhbWlseSdcblx0XHRcdFx0XHRjYWxsYmFjaygpXG5cdFx0XHRcdFx0IyBjb25zb2xlLndhcm4gJ2ZvbnRpbmFjdGl2ZTpcXHQgXFx0JywgYXJndW1lbnRzXG5cdFx0XHRcdFx0IyB3YWl0IGZvdCBjb21tb24gY3VzdG9tIGZvbnRzXG5cdFx0XHRcdFx0IyBpZiBkb2N1bWVudC5mb250cyB0aGVuIGRvY3VtZW50LmZvbnRzLmxvYWQoXCIxMHB4IGNhcmRob2xkZXItaWNvbnNcIikudGhlbiBAcmVuZGVyT25CYWNrV2l0aEFuaW1hdGUsIGhhbmRsZUVycm9yXG5cdFx0XHRcdFx0IyBlbHNlICQuZ2V0IFwiL2Fzc2V0cy9mb250L2NhcmRob2xkZXItaWNvbnMud29mZj8tYTdqcTUyXCIsID0+IEByZW5kZXJPbkJhY2tXaXRoQW5pbWF0ZSgpZlxuXHRcdFx0IyAjIHdhaXQgZm90IGNvbW1vbiBjdXN0b20gZm9udHNcblx0XHRcdCMgaWYgZG9jdW1lbnQuZm9udHMgdGhlbiBkb2N1bWVudC5mb250cy5sb2FkKFwiMTBweCBjYXJkaG9sZGVyLWljb25zXCIpLnRoZW4gQHJlbmRlck9uQmFja1dpdGhBbmltYXRlLCBoYW5kbGVFcnJvclxuXHRcdFx0IyBlbHNlICQuZ2V0IFwiL2Fzc2V0cy9mb250L2NhcmRob2xkZXItaWNvbnMud29mZj8tYTdqcTUyXCIsID0+IEByZW5kZXJPbkJhY2tXaXRoQW5pbWF0ZSgpXG5cblx0XHR0cmFuc2l0aW9uQ2FsbGJhY2sgOiAoZSkgPT5cblx0XHRcdHByb3BlcnR5TmFtZSA9IGUub3JpZ2luYWxFdmVudC5wcm9wZXJ0eU5hbWVcblx0XHRcdCMgaWYgZS50YXJnZXQgaXMgQCRlbC5maW5kKCcuY2FyZC1wZXJzcGVjdGl2ZS1pbm5lci13cmFwcGVyJylbMF0gYW5kIHByb3BlcnR5TmFtZS5zZWFyY2goJ3RyYW5zZm9ybScpID4gLTFcblx0XHRcdGlmIHByb3BlcnR5TmFtZS5zZWFyY2goJ3RyYW5zZm9ybScpID4gLTFcblx0XHRcdFx0QCRlbC5yZW1vdmVDbGFzcyAnaXMtZmxpcGluZydcblx0XHRcdCMgQHRyaWdnZXIgJ3RyYW5zaXRpb25lbmQnLCBlXG5cblx0XHRyZW5kZXJPbkZyb250OiA9PlxuXHRcdFx0Y29uc29sZS5sb2cgXG5cdFx0XHRpZiBub3QgQCRlbC5oYXNDbGFzcyAnZmxpcGVkJ1xuXHRcdFx0XHQgY2FudmFzID0gQCRlbC5maW5kKCcuY2FyZC1jYW52YXMuZnJvbnQnKVswXVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRjYW52YXMgPSBAJGVsLmZpbmQoJy5jYXJkLWNhbnZhcy5iYWNrJylbMF1cblx0XHRcdEByZW5kZXJDYW52YXMgY2FudmFzXG5cblx0XHRyZW5kZXJPbkJhY2s6ID0+XG5cdFx0XHRpZiBAJGVsLmhhc0NsYXNzICdmbGlwZWQnXG5cdFx0XHRcdCBjYW52YXMgPSBAJGVsLmZpbmQoJy5jYXJkLWNhbnZhcy5mcm9udCcpWzBdXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGNhbnZhcyA9IEAkZWwuZmluZCgnLmNhcmQtY2FudmFzLmJhY2snKVswXVxuXHRcdFx0QHJlbmRlckNhbnZhcyBjYW52YXNcblxuXHRcdHJlbmRlck9uQmFja1dpdGhBbmltYXRlOiA9PlxuXHRcdFx0QHJlbmRlck9uQmFjaygpXG5cdFx0XHRAZmxpcCgpXHRcblxuXHRcdHJlbmRlckNhbnZhczogKGNhbnZhcykgPT5cblx0XHRcdGNhbnZhcy53aWR0aCA9IEAkZWwud2lkdGgoKVxuXHRcdFx0Y2FudmFzLmhlaWdodCA9IEAkZWwuaGVpZ2h0KClcblx0XHRcdGNvbnNvbGUubG9nIEBtb2RlbC5nZXQgJ2dlbmVyYXRvcnMudGV4dEdlbi5pc0RlZmF1bHQnXHRcdFx0XG5cdFx0XHRAcmVuZGVyTGF5ZXIxKGNhbnZhcylcblx0XHRcdEByZW5kZXJMYXllcjIoY2FudmFzKVxuXHRcdFx0QHJlbmRlckxheWVyMyhjYW52YXMpXG5cdFx0XHRjYW52YXNcblxuXHRcdHJlbmRlckxheWVyMTogKGNhbnZhcykgPT5cblx0XHRcdGFwcC5DYXJkR2VuZXJhdG9yLmdlbmVyYXRvcnMuZ3JhZGllbnRHZW4uZHJhdyBjYW52YXMsIEBtb2RlbFxuXG5cdFx0cmVuZGVyTGF5ZXIyOiAoY2FudmFzKSA9PlxuXHRcdFx0YXBwLkNhcmRHZW5lcmF0b3IuZ2VuZXJhdG9ycy5pY29uc0dlbi5kcmF3IGNhbnZhcywgQG1vZGVsXG5cblx0XHRyZW5kZXJMYXllcjM6IChjYW52YXMpID0+XG5cdFx0XHRhcHAuQ2FyZEdlbmVyYXRvci5nZW5lcmF0b3JzLnRleHRHZW4uZHJhdyBjYW52YXMsIEBtb2RlbFxuXG5cdFx0Z2V0UmFuZG9tRm9udDogPT5cblx0XHRcdGZvbnRzTGlzdCA9IGRhdGFGcm9tU2VydmVyLmFwcERhdGEuZm9udHNMaXN0XG5cdFx0XHRmb250RmFtaWx5ID0gJycrIGZvbnRzTGlzdFsgYXBwLmdldFJhbmRvbSgwLCBmb250c0xpc3QubGVuZ3RoLTEpIF1cblx0XHRcdGZvbnRGYW1pbHlcblxuXHRcdGZsaXA6ID0+XG5cdFx0XHRAdHJpZ2dlciAnZmxpcCdcblx0XHRcdEAkZWwudG9nZ2xlQ2xhc3MgJ2ZsaXBlZCdcblx0XHRcdEAkZWwuYWRkQ2xhc3MgJ2lzLWZsaXBpbmcnXG5cdFx0XHQjIHNldFRpbWVvdXQgPT5cblx0XHRcdCMgXHRAJGVsLnJlbW92ZUNsYXNzICdpcy1mbGlwaW5nJ1xuXHRcdFx0IyAsMzAwXHRcblxuXHRcdG9uTG9ja0J1dHRvbkNsaWNrZWQ6IC0+XG5cdFx0XHRpZiBAbW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBpcyB0cnVlXG5cdFx0XHRcdEBtb2RlbC5zZXQgJ2lzLWxvY2tlZCcsIGZhbHNlLFxuXHRcdFx0XHRcdHNpbGVudDogdHJ1ZVxuXHRcdFx0XHRAJGVsLnJlbW92ZUNsYXNzKCdpcy1sb2NrZWQnKVxuXHRcdFx0XHQuZmluZCAnLmpzLWxvY2stY29uZmlnLWJ1dHRvbidcblx0XHRcdFx0LnRleHQgJ9CX0LDQutGA0LXQv9C40YLRjCcgXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBtb2RlbC5zZXQgJ2lzLWxvY2tlZCcsIHRydWUsXG5cdFx0XHRcdFx0c2lsZW50OiB0cnVlXG5cdFx0XHRcdEAkZWwuYWRkQ2xhc3MoJ2lzLWxvY2tlZCcpXG5cdFx0XHRcdC5maW5kICcuanMtbG9jay1jb25maWctYnV0dG9uJ1xuXHRcdFx0XHQudGV4dCAn0J7RgtC60YDQtdC/0LjRgtGMJyBcblxuXHRcdG9uTW91c2VFbnRlcjogLT5cblx0XHRcdEAkZWwuYWRkQ2xhc3MgJ2lzLWhvdmVyZWQnXG5cdFx0XHRAbW9kZWwuc2V0ICdpcy1ob3ZlcmVkJywgdHJ1ZSwgc2lsZW50OiB0cnVlXG5cdFx0XHRpZiBub3QgKEBtb2RlbC5oYXMoJ2lzLWxvY2tlZCcpIG9yIEBtb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIClcblx0XHRcdFx0aWYgQCRlbC5oYXNDbGFzcygnaXMtZmxpcGluZycpXG5cdFx0XHRcdFx0QCRlbC50b2dnbGVDbGFzcyAnZmxpcGVkJ1xuXHRcdFx0XHRAJGVsLnByZXBlbmQgJzxkaXYgY2xhc3M9XCJqcy1sb2NrLWNvbmZpZy1idXR0b24td3JhcHBlclwiPjxidXR0b24gY2xhc3M9XCJqcy1sb2NrLWNvbmZpZy1idXR0b25cIj7Ql9Cw0LrRgNC10L/QuNGC0Yw8L2J1dHRvbj48L2Rpdj4nXG5cdFx0b25Nb3VzZUxlYXZlOiAtPlxuXHRcdFx0QCRlbC5yZW1vdmVDbGFzcyAnaXMtaG92ZXJlZCdcblx0XHRcdEBtb2RlbC5zZXQgJ2lzLWhvdmVyZWQnLCBmYWxzZSwgc2lsZW50OiB0cnVlXG5cdFx0XHRpZiBAbW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBpc250IHRydWVcblx0XHRcdFx0QCRlbC5maW5kKCcuanMtbG9jay1jb25maWctYnV0dG9uLXdyYXBwZXInKS5yZW1vdmUoKVxuXG4iXX0=