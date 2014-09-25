(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('CardGenerator.cards', function(Cards) {
    return Cards.CardView = (function(_super) {
      __extends(CardView, _super);

      function CardView() {
        this.flip = __bind(this.flip, this);
        this.renderCanvas = __bind(this.renderCanvas, this);
        this.renderOnBackWithAnimate = __bind(this.renderOnBackWithAnimate, this);
        this.renderOnBack = __bind(this.renderOnBack, this);
        this.renderOnFront = __bind(this.renderOnFront, this);
        this.transitionCallback = __bind(this.transitionCallback, this);
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
        this.listenTo(this.model, 'change', this.renderOnBackWithAnimate);
        return this.listenTo(app, 'resize', this.resize);
      };

      CardView.prototype.onShow = function() {
        var fontFamily, fontsList, handleError;
        handleError = function() {
          return console.error('error loading font');
        };
        fontsList = dataFromServer.appData.fontsList;
        fontFamily = '' + fontsList[app.getRandom(0, fontsList.length - 1)];
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
              if (document.fonts) {
                return document.fonts.load("10px cardholder-icons").then(_this.renderOnBackWithAnimate, handleError);
              } else {
                return $.get("/assets/font/cardholder-icons.woff?-a7jq52", function() {
                  return _this.renderOnBackWithAnimate();
                });
              }
            };
          })(this),
          fontinactive: (function(_this) {
            return function() {
              _this.model.set('generators.textGen.fontFamily', fontFamily, {
                silent: true
              });
              console.log('fontinactive', _this.model.get('generators.textGen.fontFamily'));
              if (document.fonts) {
                return document.fonts.load("10px cardholder-icons").then(_this.renderOnBackWithAnimate, handleError);
              } else {
                return $.get("/assets/font/cardholder-icons.woff?-a7jq52", function() {
                  return _this.renderOnBackWithAnimate();
                });
              }
            };
          })(this)
        });
      };

      CardView.prototype.transitionCallback = function(e) {
        var propertyName;
        propertyName = e.originalEvent.propertyName;
        if (propertyName.search('transform') > -1) {
          this.$el.removeClass('is-fliping');
        }
        return this.trigger('transitionend', e);
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

      CardView.prototype.resize = function() {
        return this.renderOnFront();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZ2VuZXJhdG9yL2NhcmRzL2NhcmQtdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOzttU0FBQTs7QUFBQSxFQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxDQUFZLHFCQUFaLEVBQW1DLFNBQUMsS0FBRCxHQUFBO1dBQzVCLEtBQUssQ0FBQztBQUNYLGlDQUFBLENBQUE7Ozs7Ozs7Ozs7OztPQUFBOztBQUFBLHlCQUFBLE1BQUEsR0FBUSxLQUFSLENBQUE7O0FBQUEseUJBRUEsT0FBQSxHQUFTLElBRlQsQ0FBQTs7QUFBQSx5QkFHQSxTQUFBLEdBQVcsTUFIWCxDQUFBOztBQUFBLHlCQUtBLEVBQUEsR0FDQztBQUFBLFFBQUEsV0FBQSxFQUFhLG1CQUFiO0FBQUEsUUFDQSxVQUFBLEVBQVksb0JBRFo7T0FORCxDQUFBOztBQUFBLHlCQVNBLFFBQUEsR0FBVSxTQUFBLEdBQUE7ZUFDVCxXQUFXLENBQUMsYUFBYSxDQUFDLElBQTFCLENBQStCLElBQUMsQ0FBQSxLQUFoQyxFQURTO01BQUEsQ0FUVixDQUFBOztBQUFBLHlCQVdBLE1BQUEsR0FDQztBQUFBLFFBQUEsWUFBQSxFQUFlLGNBQWY7QUFBQSxRQUNBLFlBQUEsRUFBZSxjQURmO0FBQUEsUUFFQSw4QkFBQSxFQUFnQyxxQkFGaEM7QUFBQSxRQUdBLGVBQUEsRUFBaUIsb0JBSGpCO09BWkQsQ0FBQTs7QUFBQSx5QkFrQkEsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNYLFFBQUEsSUFBQyxDQUFBLElBQUQsQ0FBTSxLQUFOLEVBQWMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFBLEdBQUE7QUFDYixZQUFBLElBQW9ELEtBQUMsQ0FBQSxNQUFELEtBQVcsSUFBL0Q7cUJBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSx5QkFBWixFQUF1QyxTQUF2QyxFQUFBO2FBRGE7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFkLENBQUEs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TCxDQUFVLGdDQUFWLENBQTJDLENBQUMsTUFBNUMsQ0FBQSxFQUREO1NBSGE7TUFBQSxDQW5JZCxDQUFBOztzQkFBQTs7T0FENEIsVUFBVSxDQUFDLFVBRE47RUFBQSxDQUFuQyxDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJjYXJkX2dlbmVyYXRvci9jYXJkcy9jYXJkLXZpZXcuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJAYXBwLm1vZHVsZSAnQ2FyZEdlbmVyYXRvci5jYXJkcycsIChDYXJkcykgLT5cdFxuXHRjbGFzcyBDYXJkcy5DYXJkVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuSXRlbVZpZXdcblx0XHRsb2dnZXI6IG9mZlxuXG5cdFx0dGFnTmFtZTogJ2xpJ1xuXHRcdGNsYXNzTmFtZTogJ2NhcmQnXG5cblx0XHR1aTpcblx0XHRcdGNhbnZhc0Zyb250OiAnLmNhcmQtY2FudmFzLmJhY2snXG5cdFx0XHRjYW52YXNCYWNrOiAnLmNhcmQtY2FudmFzLmZyb250J1xuXG5cdFx0dGVtcGxhdGU6ID0+XG5cdFx0XHR0ZW1wbGF0aXplci5jYXJkR2VuZXJhdG9yLmNhcmQgQG1vZGVsXG5cdFx0ZXZlbnRzOlxuXHRcdFx0J21vdXNlZW50ZXInOiAgJ29uTW91c2VFbnRlcidcblx0XHRcdCdtb3VzZWxlYXZlJzogICdvbk1vdXNlTGVhdmUnXG5cdFx0XHQnY2xpY2sgLmpzLWxvY2stY29uZmlnLWJ1dHRvbic6ICdvbkxvY2tCdXR0b25DbGlja2VkJ1xuXHRcdFx0J3RyYW5zaXRpb25lbmQnOiAndHJhbnNpdGlvbkNhbGxiYWNrJ1xuXG5cdFx0IyBtb2RlbEV2ZW50czoge31cblx0XHRpbml0aWFsaXplOiAtPlxuXHRcdFx0QGJpbmQgJ2FsbCcsICA9PiBcblx0XHRcdFx0Y29uc29sZS5sb2cgXCJDQVJEIElURU0gVklFVzpcXHQgXFx0IFxcdFwiLCBhcmd1bWVudHMgaWYgQGxvZ2dlciBpcyBvblxuXHRcdFx0QG1vZGVsLnZpZXcgPSBAXG5cdFx0XHRAbGlzdGVuVG8gQG1vZGVsLCdjaGFuZ2UnLCBAcmVuZGVyT25CYWNrV2l0aEFuaW1hdGVcblx0XHRcdEBsaXN0ZW5UbyBhcHAsJ3Jlc2l6ZScsIEByZXNpemVcblxuXHRcdG9uU2hvdzogPT5cblx0XHRcdGhhbmRsZUVycm9yID0gLT4gY29uc29sZS5lcnJvciAnZXJyb3IgbG9hZGluZyBmb250J1xuXHRcdFx0Zm9udHNMaXN0ID0gZGF0YUZyb21TZXJ2ZXIuYXBwRGF0YS5mb250c0xpc3Rcblx0XHRcdGZvbnRGYW1pbHkgPSAnJysgZm9udHNMaXN0WyBhcHAuZ2V0UmFuZG9tKDAsIGZvbnRzTGlzdC5sZW5ndGgtMSkgXVxuXG5cblx0XHRcdCMgTG9hZCBmb250cyBkaW5hbWljYWx5IHRocm91Z2ggZ29vZ2xlIHdlYiBsb2FkZXJcblx0XHRcdFdlYkZvbnQubG9hZFxuXHRcdFx0XHRjdXN0b206XG5cdFx0XHRcdFx0ZmFtaWxpZXM6IFtmb250RmFtaWx5XVxuXHRcdFx0XHRcdHVybHM6IFsnL2Fzc2V0cy9mb250L2NhcmRfZm9udHMvJyArIGZvbnRGYW1pbHkgKyAnLycgKyBmb250RmFtaWx5ICsgJy5jc3MnXVxuXHRcdFx0XHRmb250bG9hZGluZzogID0+XG5cdFx0XHRcdFx0IyBjb25zb2xlLmxvZyAnZm9udGxvYWRpbmc6XFx0JywgYXJndW1lbnRzXG5cdFx0XHRcdGZvbnRhY3RpdmU6IChmb250RmFtaWx5LCBmb250T3B0aW9ucykgID0+XG5cdFx0XHRcdFx0QG1vZGVsLnNldCAnZ2VuZXJhdG9ycy50ZXh0R2VuLmZvbnRGYW1pbHknLCBmb250RmFtaWx5LCBzaWxlbnQ6IHRydWVcblx0XHRcdFx0XHRjb25zb2xlLmxvZyAnZm9udGFjdGl2ZScsIEBtb2RlbC5nZXQgJ2dlbmVyYXRvcnMudGV4dEdlbi5mb250RmFtaWx5J1xuXHRcdFx0XHRcdCMgY29uc29sZS5pbmZvICdmb250YWN0aXZlOlxcdCBcXHQnLCBmb250RmFtaWx5LCBAXG5cdFx0XHRcdFx0IyB3YWl0IGZvdCBjb21tb24gY3VzdG9tIGZvbnRzXG5cdFx0XHRcdFx0aWYgZG9jdW1lbnQuZm9udHMgdGhlbiBkb2N1bWVudC5mb250cy5sb2FkKFwiMTBweCBjYXJkaG9sZGVyLWljb25zXCIpLnRoZW4gQHJlbmRlck9uQmFja1dpdGhBbmltYXRlLCBoYW5kbGVFcnJvclxuXHRcdFx0XHRcdGVsc2UgJC5nZXQgXCIvYXNzZXRzL2ZvbnQvY2FyZGhvbGRlci1pY29ucy53b2ZmPy1hN2pxNTJcIiwgPT4gQHJlbmRlck9uQmFja1dpdGhBbmltYXRlKClcblx0XHRcdFx0Zm9udGluYWN0aXZlOiAgPT5cblx0XHRcdFx0XHRAbW9kZWwuc2V0ICdnZW5lcmF0b3JzLnRleHRHZW4uZm9udEZhbWlseScsIGZvbnRGYW1pbHksIHNpbGVudDogdHJ1ZVxuXHRcdFx0XHRcdGNvbnNvbGUubG9nICdmb250aW5hY3RpdmUnLCBAbW9kZWwuZ2V0ICdnZW5lcmF0b3JzLnRleHRHZW4uZm9udEZhbWlseSdcblx0XHRcdFx0XHQjIGNvbnNvbGUud2FybiAnZm9udGluYWN0aXZlOlxcdCBcXHQnLCBhcmd1bWVudHNcblx0XHRcdFx0XHQjIHdhaXQgZm90IGNvbW1vbiBjdXN0b20gZm9udHNcblx0XHRcdFx0XHRpZiBkb2N1bWVudC5mb250cyB0aGVuIGRvY3VtZW50LmZvbnRzLmxvYWQoXCIxMHB4IGNhcmRob2xkZXItaWNvbnNcIikudGhlbiBAcmVuZGVyT25CYWNrV2l0aEFuaW1hdGUsIGhhbmRsZUVycm9yXG5cdFx0XHRcdFx0ZWxzZSAkLmdldCBcIi9hc3NldHMvZm9udC9jYXJkaG9sZGVyLWljb25zLndvZmY/LWE3anE1MlwiLCA9PiBAcmVuZGVyT25CYWNrV2l0aEFuaW1hdGUoKVxuXG5cdFx0XHQjICMgd2FpdCBmb3QgY29tbW9uIGN1c3RvbSBmb250c1xuXHRcdFx0IyBpZiBkb2N1bWVudC5mb250cyB0aGVuIGRvY3VtZW50LmZvbnRzLmxvYWQoXCIxMHB4IGNhcmRob2xkZXItaWNvbnNcIikudGhlbiBAcmVuZGVyT25CYWNrV2l0aEFuaW1hdGUsIGhhbmRsZUVycm9yXG5cdFx0XHQjIGVsc2UgJC5nZXQgXCIvYXNzZXRzL2ZvbnQvY2FyZGhvbGRlci1pY29ucy53b2ZmPy1hN2pxNTJcIiwgPT4gQHJlbmRlck9uQmFja1dpdGhBbmltYXRlKClcblxuXHRcdHRyYW5zaXRpb25DYWxsYmFjayA6IChlKSA9PlxuXHRcdFx0cHJvcGVydHlOYW1lID0gZS5vcmlnaW5hbEV2ZW50LnByb3BlcnR5TmFtZVxuXHRcdFx0IyBpZiBlLnRhcmdldCBpcyBAJGVsLmZpbmQoJy5jYXJkLXBlcnNwZWN0aXZlLWlubmVyLXdyYXBwZXInKVswXSBhbmQgcHJvcGVydHlOYW1lLnNlYXJjaCgndHJhbnNmb3JtJykgPiAtMVxuXHRcdFx0aWYgcHJvcGVydHlOYW1lLnNlYXJjaCgndHJhbnNmb3JtJykgPiAtMVxuXHRcdFx0XHRAJGVsLnJlbW92ZUNsYXNzICdpcy1mbGlwaW5nJ1xuXHRcdFx0QHRyaWdnZXIgJ3RyYW5zaXRpb25lbmQnLCBlXG5cblx0XHRyZW5kZXJPbkZyb250OiA9PlxuXHRcdFx0Y29uc29sZS5sb2cgXG5cdFx0XHRpZiBub3QgQCRlbC5oYXNDbGFzcyAnZmxpcGVkJ1xuXHRcdFx0XHQgY2FudmFzID0gQCRlbC5maW5kKCcuY2FyZC1jYW52YXMuZnJvbnQnKVswXVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRjYW52YXMgPSBAJGVsLmZpbmQoJy5jYXJkLWNhbnZhcy5iYWNrJylbMF1cblx0XHRcdEByZW5kZXJDYW52YXMgY2FudmFzXG5cblx0XHRyZW5kZXJPbkJhY2s6ID0+XG5cdFx0XHRpZiBAJGVsLmhhc0NsYXNzICdmbGlwZWQnXG5cdFx0XHRcdCBjYW52YXMgPSBAJGVsLmZpbmQoJy5jYXJkLWNhbnZhcy5mcm9udCcpWzBdXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGNhbnZhcyA9IEAkZWwuZmluZCgnLmNhcmQtY2FudmFzLmJhY2snKVswXVxuXHRcdFx0QHJlbmRlckNhbnZhcyBjYW52YXNcblxuXHRcdHJlbmRlck9uQmFja1dpdGhBbmltYXRlOiA9PlxuXHRcdFx0QHJlbmRlck9uQmFjaygpXG5cdFx0XHRAZmxpcCgpXHRcdFx0XG5cblx0XHRyZW5kZXJDYW52YXM6IChjYW52YXMpID0+XG5cdFx0XHRjYW52YXMud2lkdGggPSBAJGVsLndpZHRoKClcblx0XHRcdGNhbnZhcy5oZWlnaHQgPSBAJGVsLmhlaWdodCgpXG5cblx0XHRcdEByZW5kZXJMYXllcjEoY2FudmFzKVxuXHRcdFx0QHJlbmRlckxheWVyMihjYW52YXMpXG5cdFx0XHRAcmVuZGVyTGF5ZXIzKGNhbnZhcylcblx0XHRcdFxuXHRcdFx0Y2FudmFzXG5cblx0XHRyZW5kZXJMYXllcjE6IChjYW52YXMpIC0+XG5cdFx0XHRhcHAuQ2FyZEdlbmVyYXRvci5nZW5lcmF0b3JzLmdyYWRpZW50R2VuLmRyYXcgY2FudmFzLCBAbW9kZWxcblxuXHRcdHJlbmRlckxheWVyMjogKGNhbnZhcyktPlxuXHRcdFx0YXBwLkNhcmRHZW5lcmF0b3IuZ2VuZXJhdG9ycy5pY29uc0dlbi5kcmF3IGNhbnZhcywgQG1vZGVsXG5cblx0XHRyZW5kZXJMYXllcjM6IChjYW52YXMpLT5cblx0XHRcdGFwcC5DYXJkR2VuZXJhdG9yLmdlbmVyYXRvcnMudGV4dEdlbi5kcmF3IGNhbnZhcywgQG1vZGVsXG5cblx0XHRyZXNpemU6LT4gXG5cdFx0XHRAcmVuZGVyT25Gcm9udCgpXG5cblx0XHRmbGlwOiA9PlxuXHRcdFx0QHRyaWdnZXIgJ2ZsaXAnXG5cdFx0XHRAJGVsLnRvZ2dsZUNsYXNzICdmbGlwZWQnXG5cdFx0XHRAJGVsLmFkZENsYXNzICdpcy1mbGlwaW5nJ1x0XHRcdFxuXG5cdFx0b25Mb2NrQnV0dG9uQ2xpY2tlZDogLT5cblx0XHRcdGlmIEBtb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIGlzIHRydWVcblx0XHRcdFx0QG1vZGVsLnNldCAnaXMtbG9ja2VkJywgZmFsc2UsXG5cdFx0XHRcdFx0c2lsZW50OiB0cnVlXG5cdFx0XHRcdEAkZWwucmVtb3ZlQ2xhc3MoJ2lzLWxvY2tlZCcpXG5cdFx0XHRcdC5maW5kICcuanMtbG9jay1jb25maWctYnV0dG9uJ1xuXHRcdFx0XHQudGV4dCAn0JfQsNC60YDQtdC/0LjRgtGMJyBcblx0XHRcdGVsc2Vcblx0XHRcdFx0QG1vZGVsLnNldCAnaXMtbG9ja2VkJywgdHJ1ZSxcblx0XHRcdFx0XHRzaWxlbnQ6IHRydWVcblx0XHRcdFx0QCRlbC5hZGRDbGFzcygnaXMtbG9ja2VkJylcblx0XHRcdFx0LmZpbmQgJy5qcy1sb2NrLWNvbmZpZy1idXR0b24nXG5cdFx0XHRcdC50ZXh0ICfQntGC0LrRgNC10L/QuNGC0YwnIFxuXG5cdFx0b25Nb3VzZUVudGVyOiAtPlxuXHRcdFx0QCRlbC5hZGRDbGFzcyAnaXMtaG92ZXJlZCdcblx0XHRcdEBtb2RlbC5zZXQgJ2lzLWhvdmVyZWQnLCB0cnVlLCBzaWxlbnQ6IHRydWVcblx0XHRcdGlmIG5vdCAoQG1vZGVsLmhhcygnaXMtbG9ja2VkJykgb3IgQG1vZGVsLmdldCgnaXMtbG9ja2VkJykgKVxuXHRcdFx0XHRpZiBAJGVsLmhhc0NsYXNzKCdpcy1mbGlwaW5nJylcblx0XHRcdFx0XHRAJGVsLnRvZ2dsZUNsYXNzICdmbGlwZWQnXG5cdFx0XHRcdEAkZWwucHJlcGVuZCAnPGRpdiBjbGFzcz1cImpzLWxvY2stY29uZmlnLWJ1dHRvbi13cmFwcGVyXCI+PGJ1dHRvbiBjbGFzcz1cImpzLWxvY2stY29uZmlnLWJ1dHRvblwiPtCX0LDQutGA0LXQv9C40YLRjDwvYnV0dG9uPjwvZGl2Pidcblx0XHRvbk1vdXNlTGVhdmU6IC0+XG5cdFx0XHRAJGVsLnJlbW92ZUNsYXNzICdpcy1ob3ZlcmVkJ1xuXHRcdFx0QG1vZGVsLnNldCAnaXMtaG92ZXJlZCcsIGZhbHNlLCBzaWxlbnQ6IHRydWVcblx0XHRcdGlmIEBtb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIGlzbnQgdHJ1ZVxuXHRcdFx0XHRAJGVsLmZpbmQoJy5qcy1sb2NrLWNvbmZpZy1idXR0b24td3JhcHBlcicpLnJlbW92ZSgpXG5cbiJdfQ==