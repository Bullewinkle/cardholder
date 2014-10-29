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
        return app.shared.generators.gradientGen.draw(svg, this.model);
      };

      CardView.prototype.renderLayer2 = function(svg) {
        return app.shared.generators.iconsGen.draw(svg, this.model);
      };

      CardView.prototype.renderLayer3 = function(svg) {
        return app.shared.generators.textGen.draw(svg, this.model);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzL3ZpZXdzL0NhcmQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxPQUFaLEVBQXFCLFNBQUMsS0FBRCxHQUFBO1dBQ2QsS0FBSyxDQUFDO0FBQ1gsaUNBQUEsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BQUE7O0FBQUEseUJBQUEsTUFBQSxHQUFRLEtBQVIsQ0FBQTs7QUFBQSx5QkFFQSxPQUFBLEdBQVMsSUFGVCxDQUFBOztBQUFBLHlCQUdBLFNBQUEsR0FBVyxNQUhYLENBQUE7O0FBQUEseUJBS0EsRUFBQSxHQUNDO0FBQUEsUUFBQSxTQUFBLEVBQVcsZ0JBQVg7QUFBQSxRQUNBLFFBQUEsRUFBVSxpQkFEVjtPQU5ELENBQUE7O0FBQUEseUJBU0EsTUFBQSxHQUNDO0FBQUEsUUFBQSxZQUFBLEVBQWUsY0FBZjtBQUFBLFFBQ0EsWUFBQSxFQUFlLGNBRGY7QUFBQSxRQUVBLDhCQUFBLEVBQWdDLHFCQUZoQztBQUFBLFFBR0EsZUFBQSxFQUFpQixvQkFIakI7T0FWRCxDQUFBOztBQUFBLHlCQWVBLFFBQUEsR0FBVSxTQUFBLEdBQUE7ZUFBRyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQWxCLENBQXVCLElBQUMsQ0FBQSxLQUF4QixFQUFIO01BQUEsQ0FmVixDQUFBOztBQUFBLHlCQWtCQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBQ1gsUUFBQSxJQUFDLENBQUEsSUFBRCxDQUFNLEtBQU4sRUFBYyxDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTtBQUNiLFlBQUEsSUFBb0QsS0FBQyxDQUFBLE1BQUQsS0FBVyxJQUEvRDtxQkFBQSxPQUFPLENBQUMsR0FBUixDQUFZLHlCQUFaLEVBQXVDLFNBQXZDLEVBQUE7YUFEYTtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWQsQ0FBQSxDQUFBO0FBQUEs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QUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxXQUFYLENBQUEsS0FBNkIsSUFBaEM7aUJBQ0MsSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLENBQVUsZ0NBQVYsQ0FBMkMsQ0FBQyxNQUE1QyxDQUFBLEVBREQ7U0FIYTtNQUFBLENBbExkLENBQUE7O3NCQUFBOztPQUQ0QixVQUFVLENBQUMsVUFEcEI7RUFBQSxDQUFyQixDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJjYXJkcy92aWV3cy9DYXJkLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiQGFwcC5tb2R1bGUgJ0NhcmRzJywgKENhcmRzKSAtPlx0XG5cdGNsYXNzIENhcmRzLkNhcmRWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5JdGVtVmlld1xuXHRcdGxvZ2dlcjogb2ZmXG5cblx0XHR0YWdOYW1lOiAnbGknXG5cdFx0Y2xhc3NOYW1lOiAnY2FyZCdcblxuXHRcdHVpOlxuXHRcdFx0Y2FyZEZyb250OiAnLmNhcmQtc3ZnLmJhY2snXG5cdFx0XHRjYXJkQmFjazogJy5jYXJkLXN2Zy5mcm9udCdcblxuXHRcdGV2ZW50czpcblx0XHRcdCdtb3VzZWVudGVyJzogICdvbk1vdXNlRW50ZXInXG5cdFx0XHQnbW91c2VsZWF2ZSc6ICAnb25Nb3VzZUxlYXZlJ1xuXHRcdFx0J2NsaWNrIC5qcy1sb2NrLWNvbmZpZy1idXR0b24nOiAnb25Mb2NrQnV0dG9uQ2xpY2tlZCdcblx0XHRcdCd0cmFuc2l0aW9uZW5kJzogJ3RyYW5zaXRpb25DYWxsYmFjaydcblxuXHRcdHRlbXBsYXRlOiA9PiB0ZW1wbGF0aXplci5jYXJkcy5jYXJkIEBtb2RlbFxuXG5cdFx0IyBtb2RlbEV2ZW50czoge31cblx0XHRpbml0aWFsaXplOiAtPlxuXHRcdFx0QGJpbmQgJ2FsbCcsICA9PiBcblx0XHRcdFx0Y29uc29sZS5sb2cgXCJDQVJEIElURU0gVklFVzpcXHQgXFx0IFxcdFwiLCBhcmd1bWVudHMgaWYgQGxvZ2dlciBpcyBvblxuXHRcdFx0QG1vZGVsLnZpZXcgPSBAXG5cdFx0XHRAc3RhdGUgPSBuZXcgQmFja2JvbmUuTW9kZWwoKVxuXHRcdFx0QGxpc3RlblRvIEBtb2RlbCwnY2hhbmdlJywgQGRyYXdDYXJkXG5cblx0XHRcdCMgQGxpc3RlblRvIGFwcCwncmVzaXplJywgPT5cblx0XHRcdCMgXHRAc3ZnRnJvbnQudmlld2JveCAwLCAwLCBAdWkuY2FyZEZyb250LndpZHRoKCkgLEB1aS5jYXJkRnJvbnQuaGVpZ2h0KClcblx0XHRcdCMgXHRAc3ZnQmFjay52aWV3Ym94IDAsIDAsIEB1aS5jYXJkQmFjay53aWR0aCgpICxAdWkuY2FyZEJhY2suaGVpZ2h0KClcblx0XHRcdCMgXHRAcmVuZGVyT25Gcm9udFxuXG5cdFx0XHRjYXJkRnJvbnQ6ICcuY2FyZC1zdmcuYmFjaydcblx0XHRcdGNhcmRCYWNrOiAnLmNhcmQtc3ZnLmZyb250J1xuXG5cblx0XHRvblNob3c6ID0+XG5cdFx0XHRAZHJhd0NhcmQoKVxuXHRcdFx0QHVpLmNhcmRGcm9udC5hdHRyICdpZCcsIFwic3ZnLSN7QG1vZGVsLmdldCAnaWQnfS1mcm9udFwiXG5cdFx0XHRAdWkuY2FyZEJhY2suYXR0ciAnaWQnLCBcInN2Zy0je0Btb2RlbC5nZXQgJ2lkJ30tYmFja1wiXG5cblx0XHRcdEBzdmdGcm9udCA9IFNWRyhAdWkuY2FyZEZyb250WzBdKS5maXhTdWJQaXhlbE9mZnNldCgpXG5cdFx0XHRAc3ZnRnJvbnQud2lkdGggJzEwMSUnXG5cdFx0XHRAc3ZnRnJvbnQuaGVpZ2h0ICcxMDElJ1xuXHRcdFx0IyBAc3ZnRnJvbnQudmlld2JveCAwLCAwLCBAdWkuY2FyZEZyb250LndpZHRoKCkgLEB1aS5jYXJkRnJvbnQuaGVpZ2h0KClcblx0XHRcdEBzdmdGcm9udC52aWV3Ym94IDAsIDAsIDk2LjYqNCw1NCo0XG5cblx0XHRcdEBzdmdCYWNrID0gU1ZHKEB1aS5jYXJkQmFja1swXSkuZml4U3ViUGl4ZWxPZmZzZXQoKVxuXHRcdFx0QHN2Z0JhY2sud2lkdGggJzEwMSUnXG5cdFx0XHRAc3ZnQmFjay5oZWlnaHQgJzEwMSUnXG5cdFx0XHQjIEBzdmdCYWNrLnZpZXdib3ggMCwgMCwgQHVpLmNhcmRCYWNrLndpZHRoKCkgLEB1aS5jYXJkQmFjay5oZWlnaHQoKVxuXHRcdFx0QHN2Z0JhY2sudmlld2JveCAwLCAwLCA5Ni42KjQsNTQqNFxuXG5cblx0XHRkcmF3Q2FyZDogPT5cblx0XHRcdGlmIEBtb2RlbC5nZXQgJ2RhdGEuaXNEZWZhdWx0J1xuXHRcdFx0XHRpZiBAbW9kZWwuZ2V0ICdnZW5lcmF0b3JzLnRleHRHZW4uaXNEZWZhdWx0J1xuXHRcdFx0XHRcdEBsb2FkRm9udCBAZ2V0UmFuZG9tRm9udCgpLCBAcmVuZGVyT25CYWNrV2l0aEFuaW1hdGVcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdEByZW5kZXJPbkJhY2tXaXRoQW5pbWF0ZSgpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGlmIEBtb2RlbC5nZXQoJ2dlbmVyYXRvcnMudGV4dEdlbi5pc0RlZmF1bHQnKSBvciBAbW9kZWwuZ2V0KCdnZW5lcmF0b3JzLmdyYWRpZW50R2VuLmlzRGVmYXVsdCcpXG5cdFx0XHRcdFx0QHJlbmRlck9uQmFja1dpdGhBbmltYXRlKClcblx0XHRcdFx0ZWxzZVx0XG5cdFx0XHRcdFx0QHJlbmRlck9uRnJvbnQoKVxuXG5cdFx0bG9hZEZvbnQ6IChmb250RmFtaWx5LCBzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spID0+XG5cdFx0XHRzdWNjZXNzQ2FsbGJhY2sgPSBzdWNjZXNzQ2FsbGJhY2sgb3IgLT4gY29uc29sZS5pbmZvICdmb250IGxvYWRpbmcgc3VjY2Vzcydcblx0XHRcdGVycm9yQ2FsbGJhY2sgPSBlcnJvckNhbGxiYWNrIG9yIC0+IGNvbnNvbGUuZXJyb3IgJ2ZvbnQgbG9hZGluZyBmYWlsJ1xuXG5cdFx0XHQjIExvYWQgZm9udHMgZGluYW1pY2FseSB0aHJvdWdoIGdvb2dsZSB3ZWIgbG9hZGVyXG5cdFx0XHRlcnJvckNhbGxiYWNrID0gLT4gY29uc29sZS5lcnJvciAnZXJyb3IgbG9hZGluZyBmb250J1xuXG5cdFx0XHRXZWJGb250LmxvYWRcblx0XHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRcdGZhbWlsaWVzOiBbZm9udEZhbWlseV1cblx0XHRcdFx0XHR1cmxzOiBbJy9hc3NldHMvZm9udC9jYXJkX2ZvbnRzLycgKyBmb250RmFtaWx5ICsgJy8nICsgZm9udEZhbWlseSArICcuY3NzJ11cblx0XHRcdFx0Zm9udGxvYWRpbmc6ICA9PlxuXHRcdFx0XHRcdCMgY29uc29sZS5sb2cgJ2ZvbnRsb2FkaW5nOlxcdCcsIGFyZ3VtZW50c1xuXHRcdFx0XHRmb250YWN0aXZlOiAoZm9udEZhbWlseSwgZm9udE9wdGlvbnMpICA9PlxuXHRcdFx0XHRcdEBtb2RlbC5zZXQgJ2dlbmVyYXRvcnMudGV4dEdlbi5mb250RmFtaWx5JywgZm9udEZhbWlseSwgc2lsZW50OiB0cnVlXG5cdFx0XHRcdFx0IyBjb25zb2xlLmxvZyAnZm9udGFjdGl2ZScsIEBtb2RlbC5nZXQgJ2dlbmVyYXRvcnMudGV4dEdlbi5mb250RmFtaWx5J1xuXHRcdFx0XHRcdCMgY29uc29sZS5pbmZvICdmb250YWN0aXZlOlxcdCBcXHQnLCBmb250RmFtaWx5LCBAXG5cdFx0XHRcdFx0IyB3YWl0IGZvdCBjb21tb24gY3VzdG9tIGZvbnRzXG5cdFx0XHRcdFx0c3VjY2Vzc0NhbGxiYWNrLmFwcGx5KEApXG5cdFx0XHRcdFx0IyBpZiBkb2N1bWVudC5mb250c1xuXHRcdFx0XHRcdCMgXHRjb25zb2xlLmxvZyAnbG9hZGluZyBmb250IGJ5IGRvY3VtZW50LmZvbnRzJywgYXJndW1lbnRzXG5cdFx0XHRcdFx0IyBcdGRvY3VtZW50LmZvbnRzLmxvYWQoXCIxMHB4IGNhcmRob2xkZXItaWNvbnNcIilcblx0XHRcdFx0XHQjIFx0LnRoZW4gc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrXG5cdFx0XHRcdFx0IyBlbHNlXG5cdFx0XHRcdFx0IyBcdGNvbnNvbGUubG9nICdsb2FkaW5nIGZvbnQgYnkgQUpBWCcsIGFyZ3VtZW50c1xuXHRcdFx0XHRcdCMgXHQkLmdldCBcIi9hc3NldHMvZm9udC9jYXJkaG9sZGVyLWljb25zLndvZmY/LWE3anE1MlwiXG5cdFx0XHRcdFx0IyBcdC50aGVuIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFja1xuXHRcdFx0XHRmb250aW5hY3RpdmU6ICA9PlxuXHRcdFx0XHRcdGNvbnNvbGUud2FybiAnZm9udGluYWN0aXZlJywgQG1vZGVsLmdldCAnZ2VuZXJhdG9ycy50ZXh0R2VuLmZvbnRGYW1pbHknXG5cdFx0XHRcdFx0ZXJyb3JDYWxsYmFjay5hcHBseShAKVxuXHRcdFx0XHRcdCMgY29uc29sZS53YXJuICdmb250aW5hY3RpdmU6XFx0IFxcdCcsIGFyZ3VtZW50c1xuXHRcdFx0XHRcdCMgd2FpdCBmb3QgY29tbW9uIGN1c3RvbSBmb250c1xuXHRcdFx0XHRcdCMgaWYgZG9jdW1lbnQuZm9udHMgdGhlbiBkb2N1bWVudC5mb250cy5sb2FkKFwiMTBweCBjYXJkaG9sZGVyLWljb25zXCIpLnRoZW4gQHJlbmRlck9uQmFja1dpdGhBbmltYXRlLCBlcnJvckNhbGxiYWNrXG5cdFx0XHRcdFx0IyBlbHNlICQuZ2V0IFwiL2Fzc2V0cy9mb250L2NhcmRob2xkZXItaWNvbnMud29mZj8tYTdqcTUyXCIsID0+IEByZW5kZXJPbkJhY2tXaXRoQW5pbWF0ZSgpZlxuXHRcdFx0IyAjIHdhaXQgZm90IGNvbW1vbiBjdXN0b20gZm9udHNcblx0XHRcdCMgaWYgZG9jdW1lbnQuZm9udHMgdGhlbiBkb2N1bWVudC5mb250cy5sb2FkKFwiMTBweCBjYXJkaG9sZGVyLWljb25zXCIpLnRoZW4gQHJlbmRlck9uQmFja1dpdGhBbmltYXRlLCBlcnJvckNhbGxiYWNrXG5cdFx0XHQjIGVsc2UgJC5nZXQgXCIvYXNzZXRzL2ZvbnQvY2FyZGhvbGRlci1pY29ucy53b2ZmPy1hN2pxNTJcIiwgPT4gQHJlbmRlck9uQmFja1dpdGhBbmltYXRlKClcblxuXHRcdHRyYW5zaXRpb25DYWxsYmFjayA6IChlKSA9PlxuXHRcdFx0cHJvcGVydHlOYW1lID0gZS5vcmlnaW5hbEV2ZW50LnByb3BlcnR5TmFtZVxuXHRcdFx0IyBpZiBlLnRhcmdldCBpcyBAJGVsLmZpbmQoJy5jYXJkLXBlcnNwZWN0aXZlLWlubmVyLXdyYXBwZXInKVswXSBhbmQgcHJvcGVydHlOYW1lLnNlYXJjaCgndHJhbnNmb3JtJykgPiAtMVxuXHRcdFx0aWYgcHJvcGVydHlOYW1lLnNlYXJjaCgndHJhbnNmb3JtJykgPiAtMVxuXHRcdFx0XHRAc3RhdGUuc2V0ICdpcy1mbGlwcGluZycsIGZhbHNlLCBzaWxlbnQ6IHRydWVcblx0XHRcdFx0QCRlbC5yZW1vdmVDbGFzcyAnaXMtZmxpcGluZydcblx0XHRcdCMgQHRyaWdnZXIgJ3RyYW5zaXRpb25lbmQnLCBlXG5cblx0XHRyZW5kZXJPbkJhY2s6ID0+XG5cdFx0XHR1bmxlc3MgQCRlbC5oYXNDbGFzcyAnZmxpcGVkJ1xuXHRcdFx0XHQgc3ZnID0gQHN2Z0Zyb250XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHN2ZyA9IEBzdmdCYWNrXG5cdFx0XHRAcmVuZGVyQ2FyZCBzdmdcdFx0XG5cblx0XHRyZW5kZXJPbkZyb250OiA9PlxuXHRcdFx0aWYgQCRlbC5oYXNDbGFzcyAnZmxpcGVkJ1xuXHRcdFx0XHQgc3ZnID0gQHN2Z0Zyb250XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHN2ZyA9IEBzdmdCYWNrXG5cdFx0XHRAcmVuZGVyQ2FyZCBzdmdcblxuXHRcdHJlbmRlck9uQmFja1dpdGhBbmltYXRlOiA9PlxuXHRcdFx0QHJlbmRlck9uQmFjaygpXG5cdFx0XHRAZmxpcCgpXHRcblxuXHRcdHJlbmRlckNhcmQ6IChzdmcpID0+XG5cdFx0XHQjIHN2Zy53aWR0aCA9IEAkZWwud2lkdGgoKVxuXHRcdFx0IyBzdmcuaGVpZ2h0ID0gQCRlbC5oZWlnaHQoKVxuXHRcdFx0c3ZnLmNsZWFyKClcblx0XHRcdEByZW5kZXJMYXllcjEoc3ZnKVxuXHRcdFx0IyBAcmVuZGVyTGF5ZXIyKHN2Zylcblx0XHRcdEByZW5kZXJMYXllcjMoc3ZnKVxuXHRcdFx0c3ZnXG5cblx0XHRyZW5kZXJMYXllcjE6IChzdmcpID0+XG5cdFx0XHRhcHAuc2hhcmVkLmdlbmVyYXRvcnMuZ3JhZGllbnRHZW4uZHJhdyBzdmcsIEBtb2RlbFxuXG5cdFx0cmVuZGVyTGF5ZXIyOiAoc3ZnKSA9PlxuXHRcdFx0YXBwLnNoYXJlZC5nZW5lcmF0b3JzLmljb25zR2VuLmRyYXcgc3ZnLCBAbW9kZWxcblxuXHRcdHJlbmRlckxheWVyMzogKHN2ZykgPT5cblx0XHRcdGFwcC5zaGFyZWQuZ2VuZXJhdG9ycy50ZXh0R2VuLmRyYXcgc3ZnLCBAbW9kZWxcblxuXHRcdGdldFJhbmRvbUZvbnQ6ID0+XG5cdFx0XHRmb250c0xpc3QgPSBkYXRhRnJvbVNlcnZlci5hcHBEYXRhLmZvbnRzTGlzdFxuXHRcdFx0Zm9udEZhbWlseSA9ICcnKyBmb250c0xpc3RbIGFwcC5nZXRSYW5kb20oMCwgZm9udHNMaXN0Lmxlbmd0aC0xKSBdXG5cdFx0XHRmb250RmFtaWx5XG5cblx0XHRmbGlwOiA9PlxuXHRcdFx0QHRyaWdnZXIgJ2ZsaXAnXG5cdFx0XHRAJGVsLnRvZ2dsZUNsYXNzICdmbGlwZWQnXG5cdFx0XHRAJGVsLmFkZENsYXNzICdpcy1mbGlwaW5nJ1xuXHRcdFx0QHN0YXRlLnNldCAnaXMtZmxpcHBpbmcnLCB0cnVlLCBzaWxlbnQ6IHRydWVcblxuXHRcdG9uTG9ja0J1dHRvbkNsaWNrZWQ6IC0+XG5cdFx0XHRpZiBAc3RhdGUuZ2V0KCdpcy1sb2NrZWQnKSBpcyB0cnVlXG5cdFx0XHRcdEBzdGF0ZS5zZXQgJ2lzLWxvY2tlZCcsIGZhbHNlLFxuXHRcdFx0XHRcdHNpbGVudDogdHJ1ZVxuXHRcdFx0XHRAJGVsLnJlbW92ZUNsYXNzKCdpcy1sb2NrZWQnKVxuXHRcdFx0XHQuZmluZCAnLmpzLWxvY2stY29uZmlnLWJ1dHRvbidcblx0XHRcdFx0LnRleHQgJ9CX0LDQutGA0LXQv9C40YLRjCcgXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBzdGF0ZS5zZXQgJ2lzLWxvY2tlZCcsIHRydWUsXG5cdFx0XHRcdFx0c2lsZW50OiB0cnVlXG5cdFx0XHRcdEAkZWwuYWRkQ2xhc3MoJ2lzLWxvY2tlZCcpXG5cdFx0XHRcdC5maW5kICcuanMtbG9jay1jb25maWctYnV0dG9uJ1xuXHRcdFx0XHQudGV4dCAn0J7RgtC60YDQtdC/0LjRgtGMJyBcblxuXHRcdG9uTW91c2VFbnRlcjogLT5cblx0XHRcdEAkZWwuYWRkQ2xhc3MgJ2lzLWhvdmVyZWQnXG5cdFx0XHRAc3RhdGUuc2V0ICdpcy1ob3ZlcmVkJywgdHJ1ZSwgc2lsZW50OiB0cnVlXG5cdFx0XHRpZiBub3QgKEBzdGF0ZS5oYXMoJ2lzLWxvY2tlZCcpIG9yIEBzdGF0ZS5nZXQoJ2lzLWxvY2tlZCcpIClcblx0XHRcdFx0aWYgQCRlbC5oYXNDbGFzcygnaXMtZmxpcGluZycpXG5cdFx0XHRcdFx0QCRlbC50b2dnbGVDbGFzcyAnZmxpcGVkJ1xuXHRcdFx0XHRAJGVsLnByZXBlbmQgJzxkaXYgY2xhc3M9XCJqcy1sb2NrLWNvbmZpZy1idXR0b24td3JhcHBlclwiPjxidXR0b24gY2xhc3M9XCJqcy1sb2NrLWNvbmZpZy1idXR0b25cIj7Ql9Cw0LrRgNC10L/QuNGC0Yw8L2J1dHRvbj48L2Rpdj4nXG5cdFx0b25Nb3VzZUxlYXZlOiAtPlxuXHRcdFx0QCRlbC5yZW1vdmVDbGFzcyAnaXMtaG92ZXJlZCdcblx0XHRcdEBzdGF0ZS5zZXQgJ2lzLWhvdmVyZWQnLCBmYWxzZSwgc2lsZW50OiB0cnVlXG5cdFx0XHRpZiBAc3RhdGUuZ2V0KCdpcy1sb2NrZWQnKSBpc250IHRydWVcblx0XHRcdFx0QCRlbC5maW5kKCcuanMtbG9jay1jb25maWctYnV0dG9uLXdyYXBwZXInKS5yZW1vdmUoKVxuXG4iXX0=