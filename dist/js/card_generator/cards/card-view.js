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
        this.$el.addClass('is-fliping');
        return setTimeout((function(_this) {
          return function() {
            return _this.$el.removeClass('is-fliping');
          };
        })(this), 300);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZ2VuZXJhdG9yL2NhcmRzL2NhcmQtdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOzttU0FBQTs7QUFBQSxFQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxDQUFZLHFCQUFaLEVBQW1DLFNBQUMsS0FBRCxHQUFBO1dBQzVCLEtBQUssQ0FBQztBQUNYLGlDQUFBLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQUFBOztBQUFBLHlCQUFBLE1BQUEsR0FBUSxLQUFSLENBQUE7O0FBQUEseUJBRUEsT0FBQSxHQUFTLElBRlQsQ0FBQTs7QUFBQSx5QkFHQSxTQUFBLEdBQVcsTUFIWCxDQUFBOztBQUFBLHlCQUtBLEVBQUEsR0FDQztBQUFBLFFBQUEsV0FBQSxFQUFhLG1CQUFiO0FBQUEsUUFDQSxVQUFBLEVBQVksb0JBRFo7T0FORCxDQUFBOztBQUFBLHlCQVNBLFFBQUEsR0FBVSxTQUFBLEdBQUE7ZUFDVCxXQUFXLENBQUMsYUFBYSxDQUFDLElBQTFCLENBQStCLElBQUMsQ0FBQSxLQUFoQyxFQURTO01BQUEsQ0FUVixDQUFBOztBQUFBLHlCQVdBLE1BQUEsR0FDQztBQUFBLFFBQUEsWUFBQSxFQUFlLGNBQWY7QUFBQSxRQUNBLFlBQUEsRUFBZSxjQURmO0FBQUEsUUFFQSw4QkFBQSxFQUFnQyxxQkFGaEM7QUFBQSxRQUdBLGVBQUEsRUFBaUIsb0JBSGpCO09BWkQsQ0FBQTs7QUFBQSx5QkFrQkEsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNYLFFBQUEsSUFBQyxDQUFBLElBQUQsQ0FBTSxLQUFOLEVBQWMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFBLEdBQUE7QUFDYixZQUFBLElBQW9ELEtBQUMsQ0FBQSxNQUFELEtBQVcsSUFBL0Q7cUJBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSx5QkFBWixFQUF1QyxTQUF2QyxFQUFBO2FBRGE7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFk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QVEsSUFBUjtTQUFoQyxDQURBLENBQUE7QUFFQSxRQUFBLElBQUcsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsV0FBWCxDQUFBLEtBQTZCLElBQWhDO2lCQUNDLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBTCxDQUFVLGdDQUFWLENBQTJDLENBQUMsTUFBNUMsQ0FBQSxFQUREO1NBSGE7TUFBQSxDQXRKZCxDQUFBOztzQkFBQTs7T0FENEIsVUFBVSxDQUFDLFVBRE47RUFBQSxDQUFuQyxDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJjYXJkX2dlbmVyYXRvci9jYXJkcy9jYXJkLXZpZXcuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJAYXBwLm1vZHVsZSAnQ2FyZEdlbmVyYXRvci5jYXJkcycsIChDYXJkcykgLT5cdFxuXHRjbGFzcyBDYXJkcy5DYXJkVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuSXRlbVZpZXdcblx0XHRsb2dnZXI6IG9mZlxuXG5cdFx0dGFnTmFtZTogJ2xpJ1xuXHRcdGNsYXNzTmFtZTogJ2NhcmQnXG5cblx0XHR1aTpcblx0XHRcdGNhbnZhc0Zyb250OiAnLmNhcmQtY2FudmFzLmJhY2snXG5cdFx0XHRjYW52YXNCYWNrOiAnLmNhcmQtY2FudmFzLmZyb250J1xuXG5cdFx0dGVtcGxhdGU6ID0+XG5cdFx0XHR0ZW1wbGF0aXplci5jYXJkR2VuZXJhdG9yLmNhcmQgQG1vZGVsXG5cdFx0ZXZlbnRzOlxuXHRcdFx0J21vdXNlZW50ZXInOiAgJ29uTW91c2VFbnRlcidcblx0XHRcdCdtb3VzZWxlYXZlJzogICdvbk1vdXNlTGVhdmUnXG5cdFx0XHQnY2xpY2sgLmpzLWxvY2stY29uZmlnLWJ1dHRvbic6ICdvbkxvY2tCdXR0b25DbGlja2VkJ1xuXHRcdFx0J3RyYW5zaXRpb25lbmQnOiAndHJhbnNpdGlvbkNhbGxiYWNrJ1xuXG5cdFx0IyBtb2RlbEV2ZW50czoge31cblx0XHRpbml0aWFsaXplOiAtPlxuXHRcdFx0QGJpbmQgJ2FsbCcsICA9PiBcblx0XHRcdFx0Y29uc29sZS5sb2cgXCJDQVJEIElURU0gVklFVzpcXHQgXFx0IFxcdFwiLCBhcmd1bWVudHMgaWYgQGxvZ2dlciBpcyBvblxuXHRcdFx0QG1vZGVsLnZpZXcgPSBAXG5cdFx0XHRAbGlzdGVuVG8gQG1vZGVsLCdjaGFuZ2UnLCBAZHJhd0NhcmRcblx0XHRcdEBsaXN0ZW5UbyBhcHAsJ3Jlc2l6ZScsIEByZW5kZXJPbkZyb250XG5cblx0XHRvblNob3c6ID0+XG5cdFx0XHRAZHJhd0NhcmQoKVxuXG5cdFx0ZHJhd0NhcmQ6ID0+XG5cdFx0XHRpZiBAbW9kZWwuZ2V0ICdkYXRhLmlzRGVmYXVsdCdcblx0XHRcdFx0aWYgQG1vZGVsLmdldCAnZ2VuZXJhdG9ycy50ZXh0R2VuLmlzRGVmYXVsdCdcblx0XHRcdFx0XHRAbG9hZEZvbnQgQGdldFJhbmRvbUZvbnQoKSwgQHJlbmRlck9uQmFja1dpdGhBbmltYXRlXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRAcmVuZGVyT25CYWNrV2l0aEFuaW1hdGUoKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAcmVuZGVyT25Gcm9udCgpXG5cblx0XHRsb2FkRm9udDogKGZvbnRGYW1pbHksIGNhbGxiYWNrKSA9PlxuXHRcdFx0IyBMb2FkIGZvbnRzIGRpbmFtaWNhbHkgdGhyb3VnaCBnb29nbGUgd2ViIGxvYWRlclxuXHRcdFx0aGFuZGxlRXJyb3IgPSAtPiBjb25zb2xlLmVycm9yICdlcnJvciBsb2FkaW5nIGZvbnQnXG5cblx0XHRcdFdlYkZvbnQubG9hZFxuXHRcdFx0XHRjdXN0b206XG5cdFx0XHRcdFx0ZmFtaWxpZXM6IFtmb250RmFtaWx5XVxuXHRcdFx0XHRcdHVybHM6IFsnL2Fzc2V0cy9mb250L2NhcmRfZm9udHMvJyArIGZvbnRGYW1pbHkgKyAnLycgKyBmb250RmFtaWx5ICsgJy5jc3MnXVxuXHRcdFx0XHRmb250bG9hZGluZzogID0+XG5cdFx0XHRcdFx0IyBjb25zb2xlLmxvZyAnZm9udGxvYWRpbmc6XFx0JywgYXJndW1lbnRzXG5cdFx0XHRcdGZvbnRhY3RpdmU6IChmb250RmFtaWx5LCBmb250T3B0aW9ucykgID0+XG5cdFx0XHRcdFx0QG1vZGVsLnNldCAnZ2VuZXJhdG9ycy50ZXh0R2VuLmZvbnRGYW1pbHknLCBmb250RmFtaWx5LCBzaWxlbnQ6IHRydWVcblx0XHRcdFx0XHRjb25zb2xlLmxvZyAnZm9udGFjdGl2ZScsIEBtb2RlbC5nZXQgJ2dlbmVyYXRvcnMudGV4dEdlbi5mb250RmFtaWx5J1xuXHRcdFx0XHRcdCMgY29uc29sZS5pbmZvICdmb250YWN0aXZlOlxcdCBcXHQnLCBmb250RmFtaWx5LCBAXG5cdFx0XHRcdFx0IyB3YWl0IGZvdCBjb21tb24gY3VzdG9tIGZvbnRzXG5cdFx0XHRcdFx0Y2FsbGJhY2soKVxuXHRcdFx0XHRcdCMgaWYgZG9jdW1lbnQuZm9udHNcblx0XHRcdFx0XHQjIFx0Y29uc29sZS5sb2cgJ2xvYWRpbmcgZm9udCBieSBkb2N1bWVudC5mb250cycsIGFyZ3VtZW50c1xuXHRcdFx0XHRcdCMgXHRkb2N1bWVudC5mb250cy5sb2FkKFwiMTBweCBjYXJkaG9sZGVyLWljb25zXCIpXG5cdFx0XHRcdFx0IyBcdC50aGVuIGNhbGxiYWNrLCBoYW5kbGVFcnJvclxuXHRcdFx0XHRcdCMgZWxzZVxuXHRcdFx0XHRcdCMgXHRjb25zb2xlLmxvZyAnbG9hZGluZyBmb250IGJ5IEFKQVgnLCBhcmd1bWVudHNcblx0XHRcdFx0XHQjIFx0JC5nZXQgXCIvYXNzZXRzL2ZvbnQvY2FyZGhvbGRlci1pY29ucy53b2ZmPy1hN2pxNTJcIlxuXHRcdFx0XHRcdCMgXHQudGhlbiBjYWxsYmFjaywgaGFuZGxlRXJyb3Jcblx0XHRcdFx0Zm9udGluYWN0aXZlOiAgPT5cblx0XHRcdFx0XHRjb25zb2xlLmxvZyAnZm9udGluYWN0aXZlJywgQG1vZGVsLmdldCAnZ2VuZXJhdG9ycy50ZXh0R2VuLmZvbnRGYW1pbHknXG5cdFx0XHRcdFx0Y2FsbGJhY2soKVxuXHRcdFx0XHRcdCMgY29uc29sZS53YXJuICdmb250aW5hY3RpdmU6XFx0IFxcdCcsIGFyZ3VtZW50c1xuXHRcdFx0XHRcdCMgd2FpdCBmb3QgY29tbW9uIGN1c3RvbSBmb250c1xuXHRcdFx0XHRcdCMgaWYgZG9jdW1lbnQuZm9udHMgdGhlbiBkb2N1bWVudC5mb250cy5sb2FkKFwiMTBweCBjYXJkaG9sZGVyLWljb25zXCIpLnRoZW4gQHJlbmRlck9uQmFja1dpdGhBbmltYXRlLCBoYW5kbGVFcnJvclxuXHRcdFx0XHRcdCMgZWxzZSAkLmdldCBcIi9hc3NldHMvZm9udC9jYXJkaG9sZGVyLWljb25zLndvZmY/LWE3anE1MlwiLCA9PiBAcmVuZGVyT25CYWNrV2l0aEFuaW1hdGUoKWZcblx0XHRcdCMgIyB3YWl0IGZvdCBjb21tb24gY3VzdG9tIGZvbnRzXG5cdFx0XHQjIGlmIGRvY3VtZW50LmZvbnRzIHRoZW4gZG9jdW1lbnQuZm9udHMubG9hZChcIjEwcHggY2FyZGhvbGRlci1pY29uc1wiKS50aGVuIEByZW5kZXJPbkJhY2tXaXRoQW5pbWF0ZSwgaGFuZGxlRXJyb3Jcblx0XHRcdCMgZWxzZSAkLmdldCBcIi9hc3NldHMvZm9udC9jYXJkaG9sZGVyLWljb25zLndvZmY/LWE3anE1MlwiLCA9PiBAcmVuZGVyT25CYWNrV2l0aEFuaW1hdGUoKVxuXG5cdFx0dHJhbnNpdGlvbkNhbGxiYWNrIDogKGUpID0+XG5cdFx0XHRwcm9wZXJ0eU5hbWUgPSBlLm9yaWdpbmFsRXZlbnQucHJvcGVydHlOYW1lXG5cdFx0XHQjIGlmIGUudGFyZ2V0IGlzIEAkZWwuZmluZCgnLmNhcmQtcGVyc3BlY3RpdmUtaW5uZXItd3JhcHBlcicpWzBdIGFuZCBwcm9wZXJ0eU5hbWUuc2VhcmNoKCd0cmFuc2Zvcm0nKSA+IC0xXG5cdFx0XHRpZiBwcm9wZXJ0eU5hbWUuc2VhcmNoKCd0cmFuc2Zvcm0nKSA+IC0xXG5cdFx0XHRcdEAkZWwucmVtb3ZlQ2xhc3MgJ2lzLWZsaXBpbmcnXG5cdFx0XHRAdHJpZ2dlciAndHJhbnNpdGlvbmVuZCcsIGVcblxuXHRcdHJlbmRlck9uRnJvbnQ6ID0+XG5cdFx0XHRjb25zb2xlLmxvZyBcblx0XHRcdGlmIG5vdCBAJGVsLmhhc0NsYXNzICdmbGlwZWQnXG5cdFx0XHRcdCBjYW52YXMgPSBAJGVsLmZpbmQoJy5jYXJkLWNhbnZhcy5mcm9udCcpWzBdXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGNhbnZhcyA9IEAkZWwuZmluZCgnLmNhcmQtY2FudmFzLmJhY2snKVswXVxuXHRcdFx0QHJlbmRlckNhbnZhcyBjYW52YXNcblxuXHRcdHJlbmRlck9uQmFjazogPT5cblx0XHRcdGlmIEAkZWwuaGFzQ2xhc3MgJ2ZsaXBlZCdcblx0XHRcdFx0IGNhbnZhcyA9IEAkZWwuZmluZCgnLmNhcmQtY2FudmFzLmZyb250JylbMF1cblx0XHRcdGVsc2Vcblx0XHRcdFx0Y2FudmFzID0gQCRlbC5maW5kKCcuY2FyZC1jYW52YXMuYmFjaycpWzBdXG5cdFx0XHRAcmVuZGVyQ2FudmFzIGNhbnZhc1xuXG5cdFx0cmVuZGVyT25CYWNrV2l0aEFuaW1hdGU6ID0+XG5cdFx0XHRAcmVuZGVyT25CYWNrKClcblx0XHRcdEBmbGlwKClcdFxuXG5cdFx0cmVuZGVyQ2FudmFzOiAoY2FudmFzKSA9PlxuXHRcdFx0Y2FudmFzLndpZHRoID0gQCRlbC53aWR0aCgpXG5cdFx0XHRjYW52YXMuaGVpZ2h0ID0gQCRlbC5oZWlnaHQoKVxuXHRcdFx0Y29uc29sZS5sb2cgQG1vZGVsLmdldCAnZ2VuZXJhdG9ycy50ZXh0R2VuLmlzRGVmYXVsdCdcdFx0XHRcblx0XHRcdEByZW5kZXJMYXllcjEoY2FudmFzKVxuXHRcdFx0QHJlbmRlckxheWVyMihjYW52YXMpXG5cdFx0XHRAcmVuZGVyTGF5ZXIzKGNhbnZhcylcblx0XHRcdGNhbnZhc1xuXG5cdFx0cmVuZGVyTGF5ZXIxOiAoY2FudmFzKSA9PlxuXHRcdFx0YXBwLkNhcmRHZW5lcmF0b3IuZ2VuZXJhdG9ycy5ncmFkaWVudEdlbi5kcmF3IGNhbnZhcywgQG1vZGVsXG5cblx0XHRyZW5kZXJMYXllcjI6IChjYW52YXMpID0+XG5cdFx0XHRhcHAuQ2FyZEdlbmVyYXRvci5nZW5lcmF0b3JzLmljb25zR2VuLmRyYXcgY2FudmFzLCBAbW9kZWxcblxuXHRcdHJlbmRlckxheWVyMzogKGNhbnZhcykgPT5cblx0XHRcdGFwcC5DYXJkR2VuZXJhdG9yLmdlbmVyYXRvcnMudGV4dEdlbi5kcmF3IGNhbnZhcywgQG1vZGVsXG5cblx0XHRnZXRSYW5kb21Gb250OiA9PlxuXHRcdFx0Zm9udHNMaXN0ID0gZGF0YUZyb21TZXJ2ZXIuYXBwRGF0YS5mb250c0xpc3Rcblx0XHRcdGZvbnRGYW1pbHkgPSAnJysgZm9udHNMaXN0WyBhcHAuZ2V0UmFuZG9tKDAsIGZvbnRzTGlzdC5sZW5ndGgtMSkgXVxuXHRcdFx0Zm9udEZhbWlseVxuXG5cdFx0ZmxpcDogPT5cblx0XHRcdEB0cmlnZ2VyICdmbGlwJ1xuXHRcdFx0QCRlbC50b2dnbGVDbGFzcyAnZmxpcGVkJ1xuXHRcdFx0QCRlbC5hZGRDbGFzcyAnaXMtZmxpcGluZydcblx0XHRcdHNldFRpbWVvdXQgPT5cblx0XHRcdFx0QCRlbC5yZW1vdmVDbGFzcyAnaXMtZmxpcGluZydcblx0XHRcdCwzMDBcdFx0XG5cblx0XHRvbkxvY2tCdXR0b25DbGlja2VkOiAtPlxuXHRcdFx0aWYgQG1vZGVsLmdldCgnaXMtbG9ja2VkJykgaXMgdHJ1ZVxuXHRcdFx0XHRAbW9kZWwuc2V0ICdpcy1sb2NrZWQnLCBmYWxzZSxcblx0XHRcdFx0XHRzaWxlbnQ6IHRydWVcblx0XHRcdFx0QCRlbC5yZW1vdmVDbGFzcygnaXMtbG9ja2VkJylcblx0XHRcdFx0LmZpbmQgJy5qcy1sb2NrLWNvbmZpZy1idXR0b24nXG5cdFx0XHRcdC50ZXh0ICfQl9Cw0LrRgNC10L/QuNGC0YwnIFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAbW9kZWwuc2V0ICdpcy1sb2NrZWQnLCB0cnVlLFxuXHRcdFx0XHRcdHNpbGVudDogdHJ1ZVxuXHRcdFx0XHRAJGVsLmFkZENsYXNzKCdpcy1sb2NrZWQnKVxuXHRcdFx0XHQuZmluZCAnLmpzLWxvY2stY29uZmlnLWJ1dHRvbidcblx0XHRcdFx0LnRleHQgJ9Ce0YLQutGA0LXQv9C40YLRjCcgXG5cblx0XHRvbk1vdXNlRW50ZXI6IC0+XG5cdFx0XHRAJGVsLmFkZENsYXNzICdpcy1ob3ZlcmVkJ1xuXHRcdFx0QG1vZGVsLnNldCAnaXMtaG92ZXJlZCcsIHRydWUsIHNpbGVudDogdHJ1ZVxuXHRcdFx0aWYgbm90IChAbW9kZWwuaGFzKCdpcy1sb2NrZWQnKSBvciBAbW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSApXG5cdFx0XHRcdGlmIEAkZWwuaGFzQ2xhc3MoJ2lzLWZsaXBpbmcnKVxuXHRcdFx0XHRcdEAkZWwudG9nZ2xlQ2xhc3MgJ2ZsaXBlZCdcblx0XHRcdFx0QCRlbC5wcmVwZW5kICc8ZGl2IGNsYXNzPVwianMtbG9jay1jb25maWctYnV0dG9uLXdyYXBwZXJcIj48YnV0dG9uIGNsYXNzPVwianMtbG9jay1jb25maWctYnV0dG9uXCI+0JfQsNC60YDQtdC/0LjRgtGMPC9idXR0b24+PC9kaXY+J1xuXHRcdG9uTW91c2VMZWF2ZTogLT5cblx0XHRcdEAkZWwucmVtb3ZlQ2xhc3MgJ2lzLWhvdmVyZWQnXG5cdFx0XHRAbW9kZWwuc2V0ICdpcy1ob3ZlcmVkJywgZmFsc2UsIHNpbGVudDogdHJ1ZVxuXHRcdFx0aWYgQG1vZGVsLmdldCgnaXMtbG9ja2VkJykgaXNudCB0cnVlXG5cdFx0XHRcdEAkZWwuZmluZCgnLmpzLWxvY2stY29uZmlnLWJ1dHRvbi13cmFwcGVyJykucmVtb3ZlKClcblxuIl19