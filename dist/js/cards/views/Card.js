(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('Cards', function(Cards) {
    return Cards.CardView = (function(_super) {
      __extends(CardView, _super);

      function CardView() {
        this.flip = __bind(this.flip, this);
        this.getRandomFont = __bind(this.getRandomFont, this);
        this.renderLayer3 = __bind(this.renderLayer3, this);
        this.renderLayer2 = __bind(this.renderLayer2, this);
        this.renderLayer1 = __bind(this.renderLayer1, this);
        this.renderCard = __bind(this.renderCard, this);
        this.renderOnBackWithAnimate = __bind(this.renderOnBackWithAnimate, this);
        this.renderOnFront = __bind(this.renderOnFront, this);
        this.renderOnBack = __bind(this.renderOnBack, this);
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
        cardFront: '.card-svg.back',
        cardBack: '.card-svg.front'
      };

      CardView.prototype.events = {
        'mouseenter': 'onMouseEnter',
        'mouseleave': 'onMouseLeave',
        'click .js-lock-config-button': 'onLockButtonClicked',
        'transitionend': 'transitionCallback'
      };

      CardView.prototype.template = function() {
        return templatizer.cards.card(this.model);
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
        this.state = new Backbone.Model();
        this.listenTo(this.model, 'change', this.drawCard);
        return {
          cardFront: '.card-svg.back',
          cardBack: '.card-svg.front'
        };
      };

      CardView.prototype.onShow = function() {
        this.drawCard();
        this.ui.cardFront.attr('id', "svg-" + (this.model.get('id')) + "-front");
        this.ui.cardBack.attr('id', "svg-" + (this.model.get('id')) + "-back");
        this.svgFront = SVG(this.ui.cardFront[0]).fixSubPixelOffset();
        this.svgFront.width('101%');
        this.svgFront.height('101%');
        this.svgFront.viewbox(0, 0, 96.6 * 4, 54 * 4);
        this.svgBack = SVG(this.ui.cardBack[0]).fixSubPixelOffset();
        this.svgBack.width('101%');
        this.svgBack.height('101%');
        return this.svgBack.viewbox(0, 0, 96.6 * 4, 54 * 4);
      };

      CardView.prototype.drawCard = function() {
        if (this.model.get('data.isDefault')) {
          if (this.model.get('generators.textGen.isDefault')) {
            return this.loadFont(this.getRandomFont(), this.renderOnBackWithAnimate);
          } else {
            return this.renderOnBackWithAnimate();
          }
        } else {
          if (this.model.get('generators.textGen.isDefault') || this.model.get('generators.gradientGen.isDefault')) {
            return this.renderOnBackWithAnimate();
          } else {
            return this.renderOnFront();
          }
        }
      };

      CardView.prototype.loadFont = function(fontFamily, successCallback, errorCallback) {
        successCallback = successCallback || function() {
          return console.info('font loading success');
        };
        errorCallback = errorCallback || function() {
          return console.error('font loading fail');
        };
        errorCallback = function() {
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
              return successCallback.apply(_this);
            };
          })(this),
          fontinactive: (function(_this) {
            return function() {
              console.warn('fontinactive', _this.model.get('generators.textGen.fontFamily'));
              return errorCallback.apply(_this);
            };
          })(this)
        });
      };

      CardView.prototype.transitionCallback = function(e) {
        var propertyName;
        propertyName = e.originalEvent.propertyName;
        if (propertyName.search('transform') > -1) {
          this.state.set('is-flipping', false, {
            silent: true
          });
          return this.$el.removeClass('is-fliping');
        }
      };

      CardView.prototype.renderOnBack = function() {
        var svg;
        if (!this.$el.hasClass('fliped')) {
          svg = this.svgFront;
        } else {
          svg = this.svgBack;
        }
        return this.renderCard(svg);
      };

      CardView.prototype.renderOnFront = function() {
        var svg;
        if (this.$el.hasClass('fliped')) {
          svg = this.svgFront;
        } else {
          svg = this.svgBack;
        }
        return this.renderCard(svg);
      };

      CardView.prototype.renderOnBackWithAnimate = function() {
        this.renderOnBack();
        return this.flip();
      };

      CardView.prototype.renderCard = function(svg) {
        svg.clear();
        this.renderLayer1(svg);
        this.renderLayer3(svg);
        return svg;
      };

      CardView.prototype.renderLayer1 = function(svg) {
        console.log(svg);
        return app.shared.generators.gradientGen.draw(svg, this.model);
      };

      CardView.prototype.renderLayer2 = function(svg) {
        return app.shared.generators.iconsGen.draw(svg, this.model);
      };

      CardView.prototype.renderLayer3 = function(svg) {};

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
        return this.state.set('is-flipping', true, {
          silent: true
        });
      };

      CardView.prototype.onLockButtonClicked = function() {
        if (this.state.get('is-locked') === true) {
          this.state.set('is-locked', false, {
            silent: true
          });
          return this.$el.removeClass('is-locked').find('.js-lock-config-button').text('Закрепить');
        } else {
          this.state.set('is-locked', true, {
            silent: true
          });
          return this.$el.addClass('is-locked').find('.js-lock-config-button').text('Открепить');
        }
      };

      CardView.prototype.onMouseEnter = function() {
        this.$el.addClass('is-hovered');
        this.state.set('is-hovered', true, {
          silent: true
        });
        if (!(this.state.has('is-locked') || this.state.get('is-locked'))) {
          if (this.$el.hasClass('is-fliping')) {
            this.$el.toggleClass('fliped');
          }
          return this.$el.prepend('<div class="js-lock-config-button-wrapper"><button class="js-lock-config-button">Закрепить</button></div>');
        }
      };

      CardView.prototype.onMouseLeave = function() {
        this.$el.removeClass('is-hovered');
        this.state.set('is-hovered', false, {
          silent: true
        });
        if (this.state.get('is-locked') !== true) {
          return this.$el.find('.js-lock-config-button-wrapper').remove();
        }
      };

      return CardView;

    })(Marionette.ItemView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzL3ZpZXdzL0NhcmQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxPQUFaLEVBQXFCLFNBQUMsS0FBRCxHQUFBO1dBQ2QsS0FBSyxDQUFDO0FBQ1gsaUNBQUEsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BQUE7O0FBQUEseUJBQUEsTUFBQSxHQUFRLEtBQVIsQ0FBQTs7QUFBQSx5QkFFQSxPQUFBLEdBQVMsSUFGVCxDQUFBOztBQUFBLHlCQUdBLFNBQUEsR0FBVyxNQUhYLENBQUE7O0FBQUEseUJBS0EsRUFBQSxHQUNDO0FBQUEsUUFBQSxTQUFBLEVBQVcsZ0JBQVg7QUFBQSxRQUNBLFFBQUEsRUFBVSxpQkFEVjtPQU5ELENBQUE7O0FBQUEseUJBU0EsTUFBQSxHQUNDO0FBQUEsUUFBQSxZQUFBLEVBQWUsY0FBZjtBQUFBLFFBQ0EsWUFBQSxFQUFlLGNBRGY7QUFBQSxRQUVBLDhCQUFBLEVBQWdDLHFCQUZoQztBQUFBLFFBR0EsZUFBQSxFQUFpQixvQkFIakI7T0FWRCxDQUFBOztBQUFBLHlCQWVBLFFBQUEsR0FBVSxTQUFBLEdBQUE7ZUFBRyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQWxCLENBQXVCLElBQUMsQ0FBQSxLQUF4QixFQUFIO01BQUEsQ0FmVixDQUFBOztBQUFBLHlCQWtCQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBQ1gsUUFBQSxJQUFDLENBQUEsSUFBRCxDQUFNLEtBQU4sRUFBYyxDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTtBQUNiLFlBQUEsSUFBb0QsS0FBQyxDQUFBLE1BQUQsS0FBVyxJQUEvRDtxQkFBQSxPQUFPLENBQUMsR0FBUixDQUFZLHlCQUFaLEVBQXVDLFNBQXZDLEVBQUE7YUFEYTtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWQsQ0FBQSxDQUFBO0FBQUEs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LElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBTCxDQUFVLGdDQUFWLENBQTJDLENBQUMsTUFBNUMsQ0FBQSxFQUREO1NBSGE7TUFBQSxDQWpMZCxDQUFBOztzQkFBQTs7T0FENEIsVUFBVSxDQUFDLFVBRHBCO0VBQUEsQ0FBckIsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZHMvdmlld3MvQ2FyZC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkBhcHAubW9kdWxlICdDYXJkcycsIChDYXJkcykgLT5cdFxuXHRjbGFzcyBDYXJkcy5DYXJkVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuSXRlbVZpZXdcblx0XHRsb2dnZXI6IG9mZlxuXG5cdFx0dGFnTmFtZTogJ2xpJ1xuXHRcdGNsYXNzTmFtZTogJ2NhcmQnXG5cblx0XHR1aTpcblx0XHRcdGNhcmRGcm9udDogJy5jYXJkLXN2Zy5iYWNrJ1xuXHRcdFx0Y2FyZEJhY2s6ICcuY2FyZC1zdmcuZnJvbnQnXG5cblx0XHRldmVudHM6XG5cdFx0XHQnbW91c2VlbnRlcic6ICAnb25Nb3VzZUVudGVyJ1xuXHRcdFx0J21vdXNlbGVhdmUnOiAgJ29uTW91c2VMZWF2ZSdcblx0XHRcdCdjbGljayAuanMtbG9jay1jb25maWctYnV0dG9uJzogJ29uTG9ja0J1dHRvbkNsaWNrZWQnXG5cdFx0XHQndHJhbnNpdGlvbmVuZCc6ICd0cmFuc2l0aW9uQ2FsbGJhY2snXG5cblx0XHR0ZW1wbGF0ZTogPT4gdGVtcGxhdGl6ZXIuY2FyZHMuY2FyZCBAbW9kZWxcblxuXHRcdCMgbW9kZWxFdmVudHM6IHt9XG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdEBiaW5kICdhbGwnLCAgPT4gXG5cdFx0XHRcdGNvbnNvbGUubG9nIFwiQ0FSRCBJVEVNIFZJRVc6XFx0IFxcdCBcXHRcIiwgYXJndW1lbnRzIGlmIEBsb2dnZXIgaXMgb25cblx0XHRcdEBtb2RlbC52aWV3ID0gQFxuXHRcdFx0QHN0YXRlID0gbmV3IEJhY2tib25lLk1vZGVsKClcblx0XHRcdEBsaXN0ZW5UbyBAbW9kZWwsJ2NoYW5nZScsIEBkcmF3Q2FyZFxuXG5cdFx0XHQjIEBsaXN0ZW5UbyBhcHAsJ3Jlc2l6ZScsID0+XG5cdFx0XHQjIFx0QHN2Z0Zyb250LnZpZXdib3ggMCwgMCwgQHVpLmNhcmRGcm9udC53aWR0aCgpICxAdWkuY2FyZEZyb250LmhlaWdodCgpXG5cdFx0XHQjIFx0QHN2Z0JhY2sudmlld2JveCAwLCAwLCBAdWkuY2FyZEJhY2sud2lkdGgoKSAsQHVpLmNhcmRCYWNrLmhlaWdodCgpXG5cdFx0XHQjIFx0QHJlbmRlck9uRnJvbnRcblxuXHRcdFx0Y2FyZEZyb250OiAnLmNhcmQtc3ZnLmJhY2snXG5cdFx0XHRjYXJkQmFjazogJy5jYXJkLXN2Zy5mcm9udCdcblxuXHRcdG9uU2hvdzogPT5cblx0XHRcdEBkcmF3Q2FyZCgpXG5cdFx0XHRAdWkuY2FyZEZyb250LmF0dHIgJ2lkJywgXCJzdmctI3tAbW9kZWwuZ2V0ICdpZCd9LWZyb250XCJcblx0XHRcdEB1aS5jYXJkQmFjay5hdHRyICdpZCcsIFwic3ZnLSN7QG1vZGVsLmdldCAnaWQnfS1iYWNrXCJcblxuXHRcdFx0QHN2Z0Zyb250ID0gU1ZHKEB1aS5jYXJkRnJvbnRbMF0pLmZpeFN1YlBpeGVsT2Zmc2V0KClcblx0XHRcdEBzdmdGcm9udC53aWR0aCAnMTAxJSdcblx0XHRcdEBzdmdGcm9udC5oZWlnaHQgJzEwMSUnXG5cdFx0XHQjIEBzdmdGcm9udC52aWV3Ym94IDAsIDAsIEB1aS5jYXJkRnJvbnQud2lkdGgoKSAsQHVpLmNhcmRGcm9udC5oZWlnaHQoKVxuXHRcdFx0QHN2Z0Zyb250LnZpZXdib3ggMCwgMCwgOTYuNio0LDU0KjRcblxuXHRcdFx0QHN2Z0JhY2sgPSBTVkcoQHVpLmNhcmRCYWNrWzBdKS5maXhTdWJQaXhlbE9mZnNldCgpXG5cdFx0XHRAc3ZnQmFjay53aWR0aCAnMTAxJSdcblx0XHRcdEBzdmdCYWNrLmhlaWdodCAnMTAxJSdcblx0XHRcdCMgQHN2Z0JhY2sudmlld2JveCAwLCAwLCBAdWkuY2FyZEJhY2sud2lkdGgoKSAsQHVpLmNhcmRCYWNrLmhlaWdodCgpXG5cdFx0XHRAc3ZnQmFjay52aWV3Ym94IDAsIDAsIDk2LjYqNCw1NCo0XG5cblx0XHRkcmF3Q2FyZDogPT5cblx0XHRcdGlmIEBtb2RlbC5nZXQgJ2RhdGEuaXNEZWZhdWx0J1xuXHRcdFx0XHRpZiBAbW9kZWwuZ2V0ICdnZW5lcmF0b3JzLnRleHRHZW4uaXNEZWZhdWx0J1xuXHRcdFx0XHRcdEBsb2FkRm9udCBAZ2V0UmFuZG9tRm9udCgpLCBAcmVuZGVyT25CYWNrV2l0aEFuaW1hdGVcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdEByZW5kZXJPbkJhY2tXaXRoQW5pbWF0ZSgpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGlmIEBtb2RlbC5nZXQoJ2dlbmVyYXRvcnMudGV4dEdlbi5pc0RlZmF1bHQnKSBvciBAbW9kZWwuZ2V0KCdnZW5lcmF0b3JzLmdyYWRpZW50R2VuLmlzRGVmYXVsdCcpXG5cdFx0XHRcdFx0QHJlbmRlck9uQmFja1dpdGhBbmltYXRlKClcblx0XHRcdFx0ZWxzZVx0XG5cdFx0XHRcdFx0QHJlbmRlck9uRnJvbnQoKVxuXG5cdFx0bG9hZEZvbnQ6IChmb250RmFtaWx5LCBzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spID0+XG5cdFx0XHRzdWNjZXNzQ2FsbGJhY2sgPSBzdWNjZXNzQ2FsbGJhY2sgb3IgLT4gY29uc29sZS5pbmZvICdmb250IGxvYWRpbmcgc3VjY2Vzcydcblx0XHRcdGVycm9yQ2FsbGJhY2sgPSBlcnJvckNhbGxiYWNrIG9yIC0+IGNvbnNvbGUuZXJyb3IgJ2ZvbnQgbG9hZGluZyBmYWlsJ1xuXG5cdFx0XHQjIExvYWQgZm9udHMgZGluYW1pY2FseSB0aHJvdWdoIGdvb2dsZSB3ZWIgbG9hZGVyXG5cdFx0XHRlcnJvckNhbGxiYWNrID0gLT4gY29uc29sZS5lcnJvciAnZXJyb3IgbG9hZGluZyBmb250J1xuXG5cdFx0XHRXZWJGb250LmxvYWRcblx0XHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRcdGZhbWlsaWVzOiBbZm9udEZhbWlseV1cblx0XHRcdFx0XHR1cmxzOiBbJy9hc3NldHMvZm9udC9jYXJkX2ZvbnRzLycgKyBmb250RmFtaWx5ICsgJy8nICsgZm9udEZhbWlseSArICcuY3NzJ11cblx0XHRcdFx0Zm9udGxvYWRpbmc6ICA9PlxuXHRcdFx0XHRcdCMgY29uc29sZS5sb2cgJ2ZvbnRsb2FkaW5nOlxcdCcsIGFyZ3VtZW50c1xuXHRcdFx0XHRmb250YWN0aXZlOiAoZm9udEZhbWlseSwgZm9udE9wdGlvbnMpICA9PlxuXHRcdFx0XHRcdEBtb2RlbC5zZXQgJ2dlbmVyYXRvcnMudGV4dEdlbi5mb250RmFtaWx5JywgZm9udEZhbWlseSwgc2lsZW50OiB0cnVlXG5cdFx0XHRcdFx0IyBjb25zb2xlLmxvZyAnZm9udGFjdGl2ZScsIEBtb2RlbC5nZXQgJ2dlbmVyYXRvcnMudGV4dEdlbi5mb250RmFtaWx5J1xuXHRcdFx0XHRcdCMgY29uc29sZS5pbmZvICdmb250YWN0aXZlOlxcdCBcXHQnLCBmb250RmFtaWx5LCBAXG5cdFx0XHRcdFx0IyB3YWl0IGZvdCBjb21tb24gY3VzdG9tIGZvbnRzXG5cdFx0XHRcdFx0c3VjY2Vzc0NhbGxiYWNrLmFwcGx5KEApXG5cdFx0XHRcdFx0IyBpZiBkb2N1bWVudC5mb250c1xuXHRcdFx0XHRcdCMgXHRjb25zb2xlLmxvZyAnbG9hZGluZyBmb250IGJ5IGRvY3VtZW50LmZvbnRzJywgYXJndW1lbnRzXG5cdFx0XHRcdFx0IyBcdGRvY3VtZW50LmZvbnRzLmxvYWQoXCIxMHB4IGNhcmRob2xkZXItaWNvbnNcIilcblx0XHRcdFx0XHQjIFx0LnRoZW4gc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrXG5cdFx0XHRcdFx0IyBlbHNlXG5cdFx0XHRcdFx0IyBcdGNvbnNvbGUubG9nICdsb2FkaW5nIGZvbnQgYnkgQUpBWCcsIGFyZ3VtZW50c1xuXHRcdFx0XHRcdCMgXHQkLmdldCBcIi9hc3NldHMvZm9udC9jYXJkaG9sZGVyLWljb25zLndvZmY/LWE3anE1MlwiXG5cdFx0XHRcdFx0IyBcdC50aGVuIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFja1xuXHRcdFx0XHRmb250aW5hY3RpdmU6ICA9PlxuXHRcdFx0XHRcdGNvbnNvbGUud2FybiAnZm9udGluYWN0aXZlJywgQG1vZGVsLmdldCAnZ2VuZXJhdG9ycy50ZXh0R2VuLmZvbnRGYW1pbHknXG5cdFx0XHRcdFx0ZXJyb3JDYWxsYmFjay5hcHBseShAKVxuXHRcdFx0XHRcdCMgY29uc29sZS53YXJuICdmb250aW5hY3RpdmU6XFx0IFxcdCcsIGFyZ3VtZW50c1xuXHRcdFx0XHRcdCMgd2FpdCBmb3QgY29tbW9uIGN1c3RvbSBmb250c1xuXHRcdFx0XHRcdCMgaWYgZG9jdW1lbnQuZm9udHMgdGhlbiBkb2N1bWVudC5mb250cy5sb2FkKFwiMTBweCBjYXJkaG9sZGVyLWljb25zXCIpLnRoZW4gQHJlbmRlck9uQmFja1dpdGhBbmltYXRlLCBlcnJvckNhbGxiYWNrXG5cdFx0XHRcdFx0IyBlbHNlICQuZ2V0IFwiL2Fzc2V0cy9mb250L2NhcmRob2xkZXItaWNvbnMud29mZj8tYTdqcTUyXCIsID0+IEByZW5kZXJPbkJhY2tXaXRoQW5pbWF0ZSgpZlxuXHRcdFx0IyAjIHdhaXQgZm90IGNvbW1vbiBjdXN0b20gZm9udHNcblx0XHRcdCMgaWYgZG9jdW1lbnQuZm9udHMgdGhlbiBkb2N1bWVudC5mb250cy5sb2FkKFwiMTBweCBjYXJkaG9sZGVyLWljb25zXCIpLnRoZW4gQHJlbmRlck9uQmFja1dpdGhBbmltYXRlLCBlcnJvckNhbGxiYWNrXG5cdFx0XHQjIGVsc2UgJC5nZXQgXCIvYXNzZXRzL2ZvbnQvY2FyZGhvbGRlci1pY29ucy53b2ZmPy1hN2pxNTJcIiwgPT4gQHJlbmRlck9uQmFja1dpdGhBbmltYXRlKClcblxuXHRcdHRyYW5zaXRpb25DYWxsYmFjayA6IChlKSA9PlxuXHRcdFx0cHJvcGVydHlOYW1lID0gZS5vcmlnaW5hbEV2ZW50LnByb3BlcnR5TmFtZVxuXHRcdFx0IyBpZiBlLnRhcmdldCBpcyBAJGVsLmZpbmQoJy5jYXJkLXBlcnNwZWN0aXZlLWlubmVyLXdyYXBwZXInKVswXSBhbmQgcHJvcGVydHlOYW1lLnNlYXJjaCgndHJhbnNmb3JtJykgPiAtMVxuXHRcdFx0aWYgcHJvcGVydHlOYW1lLnNlYXJjaCgndHJhbnNmb3JtJykgPiAtMVxuXHRcdFx0XHRAc3RhdGUuc2V0ICdpcy1mbGlwcGluZycsIGZhbHNlLCBzaWxlbnQ6IHRydWVcblx0XHRcdFx0QCRlbC5yZW1vdmVDbGFzcyAnaXMtZmxpcGluZydcblx0XHRcdCMgQHRyaWdnZXIgJ3RyYW5zaXRpb25lbmQnLCBlXG5cblx0XHRyZW5kZXJPbkJhY2s6ID0+XG5cdFx0XHR1bmxlc3MgQCRlbC5oYXNDbGFzcyAnZmxpcGVkJ1xuXHRcdFx0XHQgc3ZnID0gQHN2Z0Zyb250XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHN2ZyA9IEBzdmdCYWNrXG5cdFx0XHRAcmVuZGVyQ2FyZCBzdmdcdFx0XG5cblx0XHRyZW5kZXJPbkZyb250OiA9PlxuXHRcdFx0aWYgQCRlbC5oYXNDbGFzcyAnZmxpcGVkJ1xuXHRcdFx0XHQgc3ZnID0gQHN2Z0Zyb250XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHN2ZyA9IEBzdmdCYWNrXG5cdFx0XHRAcmVuZGVyQ2FyZCBzdmdcblxuXHRcdHJlbmRlck9uQmFja1dpdGhBbmltYXRlOiA9PlxuXHRcdFx0QHJlbmRlck9uQmFjaygpXG5cdFx0XHRAZmxpcCgpXHRcblxuXHRcdHJlbmRlckNhcmQ6IChzdmcpID0+XG5cdFx0XHQjIHN2Zy53aWR0aCA9IEAkZWwud2lkdGgoKVxuXHRcdFx0IyBzdmcuaGVpZ2h0ID0gQCRlbC5oZWlnaHQoKVxuXHRcdFx0c3ZnLmNsZWFyKClcblx0XHRcdEByZW5kZXJMYXllcjEoc3ZnKVxuXHRcdFx0IyBAcmVuZGVyTGF5ZXIyKHN2Zylcblx0XHRcdEByZW5kZXJMYXllcjMoc3ZnKVxuXHRcdFx0c3ZnXG5cblx0XHRyZW5kZXJMYXllcjE6IChzdmcpID0+XG5cdFx0XHRjb25zb2xlLmxvZyBzdmdcblx0XHRcdGFwcC5zaGFyZWQuZ2VuZXJhdG9ycy5ncmFkaWVudEdlbi5kcmF3IHN2ZywgQG1vZGVsXG5cblx0XHRyZW5kZXJMYXllcjI6IChzdmcpID0+XG5cdFx0XHRhcHAuc2hhcmVkLmdlbmVyYXRvcnMuaWNvbnNHZW4uZHJhdyBzdmcsIEBtb2RlbFxuXG5cdFx0cmVuZGVyTGF5ZXIzOiAoc3ZnKSA9PlxuXHRcdFx0IyAobmV3IGFwcC5zaGFyZWQuZ2VuZXJhdG9ycy5UZXh0R2VuKHN2ZywgQG1vZGVsKSkuZHJhdygpXG5cblx0XHRnZXRSYW5kb21Gb250OiA9PlxuXHRcdFx0Zm9udHNMaXN0ID0gZGF0YUZyb21TZXJ2ZXIuYXBwRGF0YS5mb250c0xpc3Rcblx0XHRcdGZvbnRGYW1pbHkgPSAnJysgZm9udHNMaXN0WyBhcHAuZ2V0UmFuZG9tKDAsIGZvbnRzTGlzdC5sZW5ndGgtMSkgXVxuXHRcdFx0Zm9udEZhbWlseVxuXG5cdFx0ZmxpcDogPT5cblx0XHRcdEB0cmlnZ2VyICdmbGlwJ1xuXHRcdFx0QCRlbC50b2dnbGVDbGFzcyAnZmxpcGVkJ1xuXHRcdFx0QCRlbC5hZGRDbGFzcyAnaXMtZmxpcGluZydcblx0XHRcdEBzdGF0ZS5zZXQgJ2lzLWZsaXBwaW5nJywgdHJ1ZSwgc2lsZW50OiB0cnVlXG5cblx0XHRvbkxvY2tCdXR0b25DbGlja2VkOiAtPlxuXHRcdFx0aWYgQHN0YXRlLmdldCgnaXMtbG9ja2VkJykgaXMgdHJ1ZVxuXHRcdFx0XHRAc3RhdGUuc2V0ICdpcy1sb2NrZWQnLCBmYWxzZSxcblx0XHRcdFx0XHRzaWxlbnQ6IHRydWVcblx0XHRcdFx0QCRlbC5yZW1vdmVDbGFzcygnaXMtbG9ja2VkJylcblx0XHRcdFx0LmZpbmQgJy5qcy1sb2NrLWNvbmZpZy1idXR0b24nXG5cdFx0XHRcdC50ZXh0ICfQl9Cw0LrRgNC10L/QuNGC0YwnIFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAc3RhdGUuc2V0ICdpcy1sb2NrZWQnLCB0cnVlLFxuXHRcdFx0XHRcdHNpbGVudDogdHJ1ZVxuXHRcdFx0XHRAJGVsLmFkZENsYXNzKCdpcy1sb2NrZWQnKVxuXHRcdFx0XHQuZmluZCAnLmpzLWxvY2stY29uZmlnLWJ1dHRvbidcblx0XHRcdFx0LnRleHQgJ9Ce0YLQutGA0LXQv9C40YLRjCcgXG5cblx0XHRvbk1vdXNlRW50ZXI6IC0+XG5cdFx0XHRAJGVsLmFkZENsYXNzICdpcy1ob3ZlcmVkJ1xuXHRcdFx0QHN0YXRlLnNldCAnaXMtaG92ZXJlZCcsIHRydWUsIHNpbGVudDogdHJ1ZVxuXHRcdFx0aWYgbm90IChAc3RhdGUuaGFzKCdpcy1sb2NrZWQnKSBvciBAc3RhdGUuZ2V0KCdpcy1sb2NrZWQnKSApXG5cdFx0XHRcdGlmIEAkZWwuaGFzQ2xhc3MoJ2lzLWZsaXBpbmcnKVxuXHRcdFx0XHRcdEAkZWwudG9nZ2xlQ2xhc3MgJ2ZsaXBlZCdcblx0XHRcdFx0QCRlbC5wcmVwZW5kICc8ZGl2IGNsYXNzPVwianMtbG9jay1jb25maWctYnV0dG9uLXdyYXBwZXJcIj48YnV0dG9uIGNsYXNzPVwianMtbG9jay1jb25maWctYnV0dG9uXCI+0JfQsNC60YDQtdC/0LjRgtGMPC9idXR0b24+PC9kaXY+J1xuXHRcdG9uTW91c2VMZWF2ZTogLT5cblx0XHRcdEAkZWwucmVtb3ZlQ2xhc3MgJ2lzLWhvdmVyZWQnXG5cdFx0XHRAc3RhdGUuc2V0ICdpcy1ob3ZlcmVkJywgZmFsc2UsIHNpbGVudDogdHJ1ZVxuXHRcdFx0aWYgQHN0YXRlLmdldCgnaXMtbG9ja2VkJykgaXNudCB0cnVlXG5cdFx0XHRcdEAkZWwuZmluZCgnLmpzLWxvY2stY29uZmlnLWJ1dHRvbi13cmFwcGVyJykucmVtb3ZlKClcblxuIl19