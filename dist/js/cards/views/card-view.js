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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzL3ZpZXdzL2NhcmQtdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOzttU0FBQTs7QUFBQSxFQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxDQUFZLE9BQVosRUFBcUIsU0FBQyxLQUFELEdBQUE7V0FDZCxLQUFLLENBQUM7QUFDWCxpQ0FBQSxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FBQTs7QUFBQSx5QkFBQSxNQUFBLEdBQVEsS0FBUixDQUFBOztBQUFBLHlCQUVBLE9BQUEsR0FBUyxJQUZULENBQUE7O0FBQUEseUJBR0EsU0FBQSxHQUFXLE1BSFgsQ0FBQTs7QUFBQSx5QkFLQSxFQUFBLEdBQ0M7QUFBQSxRQUFBLFNBQUEsRUFBVyxnQkFBWDtBQUFBLFFBQ0EsUUFBQSxFQUFVLGlCQURWO09BTkQsQ0FBQTs7QUFBQSx5QkFTQSxNQUFBLEdBQ0M7QUFBQSxRQUFBLFlBQUEsRUFBZSxjQUFmO0FBQUEsUUFDQSxZQUFBLEVBQWUsY0FEZjtBQUFBLFFBRUEsOEJBQUEsRUFBZ0MscUJBRmhDO0FBQUEsUUFHQSxlQUFBLEVBQWlCLG9CQUhqQjtPQVZELENBQUE7O0FBQUEseUJBZUEsUUFBQSxHQUFVLFNBQUEsR0FBQTtlQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBbEIsQ0FBdUIsSUFBQyxDQUFBLEtBQXhCLEVBQUg7TUFBQSxDQWZWLENBQUE7O0FBQUEseUJBa0JBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDWCxRQUFBLElBQUMsQ0FBQSxJQUFELENBQU0sS0FBTixFQUFjLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO0FBQ2IsWUFBQSxJQUFvRCxLQUFDLENBQUEsTUFBRCxLQUFXLElBQS9EO3FCQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVkseUJBQVosRUFBdUMsU0FBdkMsRUFBQTthQURhO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBZCxDQUFBLENBQUE7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QUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLFdBQVgsQ0FBQSxLQUE2QixJQUFoQztpQkFDQyxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsQ0FBVSxnQ0FBVixDQUEyQyxDQUFDLE1BQTVDLENBQUEsRUFERDtTQUhhO01BQUEsQ0FsTGQsQ0FBQTs7c0JBQUE7O09BRDRCLFVBQVUsQ0FBQyxVQURwQjtFQUFBLENBQXJCLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRzL3ZpZXdzL2NhcmQtdmlldy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkBhcHAubW9kdWxlICdDYXJkcycsIChDYXJkcykgLT5cdFxuXHRjbGFzcyBDYXJkcy5DYXJkVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuSXRlbVZpZXdcblx0XHRsb2dnZXI6IG9mZlxuXG5cdFx0dGFnTmFtZTogJ2xpJ1xuXHRcdGNsYXNzTmFtZTogJ2NhcmQnXG5cblx0XHR1aTpcblx0XHRcdGNhcmRGcm9udDogJy5jYXJkLXN2Zy5iYWNrJ1xuXHRcdFx0Y2FyZEJhY2s6ICcuY2FyZC1zdmcuZnJvbnQnXG5cblx0XHRldmVudHM6XG5cdFx0XHQnbW91c2VlbnRlcic6ICAnb25Nb3VzZUVudGVyJ1xuXHRcdFx0J21vdXNlbGVhdmUnOiAgJ29uTW91c2VMZWF2ZSdcblx0XHRcdCdjbGljayAuanMtbG9jay1jb25maWctYnV0dG9uJzogJ29uTG9ja0J1dHRvbkNsaWNrZWQnXG5cdFx0XHQndHJhbnNpdGlvbmVuZCc6ICd0cmFuc2l0aW9uQ2FsbGJhY2snXG5cblx0XHR0ZW1wbGF0ZTogPT4gdGVtcGxhdGl6ZXIuY2FyZHMuY2FyZCBAbW9kZWxcblxuXHRcdCMgbW9kZWxFdmVudHM6IHt9XG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdEBiaW5kICdhbGwnLCAgPT4gXG5cdFx0XHRcdGNvbnNvbGUubG9nIFwiQ0FSRCBJVEVNIFZJRVc6XFx0IFxcdCBcXHRcIiwgYXJndW1lbnRzIGlmIEBsb2dnZXIgaXMgb25cblx0XHRcdEBtb2RlbC52aWV3ID0gQFxuXHRcdFx0QHN0YXRlID0gbmV3IEJhY2tib25lLk1vZGVsKClcblx0XHRcdEBsaXN0ZW5UbyBAbW9kZWwsJ2NoYW5nZScsIEBkcmF3Q2FyZFxuXG5cdFx0XHQjIEBsaXN0ZW5UbyBhcHAsJ3Jlc2l6ZScsID0+XG5cdFx0XHQjIFx0QHN2Z0Zyb250LnZpZXdib3ggMCwgMCwgQHVpLmNhcmRGcm9udC53aWR0aCgpICxAdWkuY2FyZEZyb250LmhlaWdodCgpXG5cdFx0XHQjIFx0QHN2Z0JhY2sudmlld2JveCAwLCAwLCBAdWkuY2FyZEJhY2sud2lkdGgoKSAsQHVpLmNhcmRCYWNrLmhlaWdodCgpXG5cdFx0XHQjIFx0QHJlbmRlck9uRnJvbnRcblxuXHRcdFx0Y2FyZEZyb250OiAnLmNhcmQtc3ZnLmJhY2snXG5cdFx0XHRjYXJkQmFjazogJy5jYXJkLXN2Zy5mcm9udCdcblxuXG5cdFx0b25TaG93OiA9PlxuXHRcdFx0QGRyYXdDYXJkKClcblx0XHRcdEB1aS5jYXJkRnJvbnQuYXR0ciAnaWQnLCBcInN2Zy0je0Btb2RlbC5nZXQgJ2lkJ30tZnJvbnRcIlxuXHRcdFx0QHVpLmNhcmRCYWNrLmF0dHIgJ2lkJywgXCJzdmctI3tAbW9kZWwuZ2V0ICdpZCd9LWJhY2tcIlxuXG5cdFx0XHRAc3ZnRnJvbnQgPSBTVkcoQHVpLmNhcmRGcm9udFswXSkuZml4U3ViUGl4ZWxPZmZzZXQoKVxuXHRcdFx0QHN2Z0Zyb250LndpZHRoICcxMDElJ1xuXHRcdFx0QHN2Z0Zyb250LmhlaWdodCAnMTAxJSdcblx0XHRcdCMgQHN2Z0Zyb250LnZpZXdib3ggMCwgMCwgQHVpLmNhcmRGcm9udC53aWR0aCgpICxAdWkuY2FyZEZyb250LmhlaWdodCgpXG5cdFx0XHRAc3ZnRnJvbnQudmlld2JveCAwLCAwLCA5Ni42KjQsNTQqNFxuXG5cdFx0XHRAc3ZnQmFjayA9IFNWRyhAdWkuY2FyZEJhY2tbMF0pLmZpeFN1YlBpeGVsT2Zmc2V0KClcblx0XHRcdEBzdmdCYWNrLndpZHRoICcxMDElJ1xuXHRcdFx0QHN2Z0JhY2suaGVpZ2h0ICcxMDElJ1xuXHRcdFx0IyBAc3ZnQmFjay52aWV3Ym94IDAsIDAsIEB1aS5jYXJkQmFjay53aWR0aCgpICxAdWkuY2FyZEJhY2suaGVpZ2h0KClcblx0XHRcdEBzdmdCYWNrLnZpZXdib3ggMCwgMCwgOTYuNio0LDU0KjRcblxuXG5cdFx0ZHJhd0NhcmQ6ID0+XG5cdFx0XHRpZiBAbW9kZWwuZ2V0ICdkYXRhLmlzRGVmYXVsdCdcblx0XHRcdFx0aWYgQG1vZGVsLmdldCAnZ2VuZXJhdG9ycy50ZXh0R2VuLmlzRGVmYXVsdCdcblx0XHRcdFx0XHRAbG9hZEZvbnQgQGdldFJhbmRvbUZvbnQoKSwgQHJlbmRlck9uQmFja1dpdGhBbmltYXRlXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRAcmVuZGVyT25CYWNrV2l0aEFuaW1hdGUoKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRpZiBAbW9kZWwuZ2V0KCdnZW5lcmF0b3JzLnRleHRHZW4uaXNEZWZhdWx0Jykgb3IgQG1vZGVsLmdldCgnZ2VuZXJhdG9ycy5ncmFkaWVudEdlbi5pc0RlZmF1bHQnKVxuXHRcdFx0XHRcdEByZW5kZXJPbkJhY2tXaXRoQW5pbWF0ZSgpXG5cdFx0XHRcdGVsc2VcdFxuXHRcdFx0XHRcdEByZW5kZXJPbkZyb250KClcblxuXHRcdGxvYWRGb250OiAoZm9udEZhbWlseSwgc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrKSA9PlxuXHRcdFx0c3VjY2Vzc0NhbGxiYWNrID0gc3VjY2Vzc0NhbGxiYWNrIG9yIC0+IGNvbnNvbGUuaW5mbyAnZm9udCBsb2FkaW5nIHN1Y2Nlc3MnXG5cdFx0XHRlcnJvckNhbGxiYWNrID0gZXJyb3JDYWxsYmFjayBvciAtPiBjb25zb2xlLmVycm9yICdmb250IGxvYWRpbmcgZmFpbCdcblxuXHRcdFx0IyBMb2FkIGZvbnRzIGRpbmFtaWNhbHkgdGhyb3VnaCBnb29nbGUgd2ViIGxvYWRlclxuXHRcdFx0ZXJyb3JDYWxsYmFjayA9IC0+IGNvbnNvbGUuZXJyb3IgJ2Vycm9yIGxvYWRpbmcgZm9udCdcblxuXHRcdFx0V2ViRm9udC5sb2FkXG5cdFx0XHRcdGN1c3RvbTpcblx0XHRcdFx0XHRmYW1pbGllczogW2ZvbnRGYW1pbHldXG5cdFx0XHRcdFx0dXJsczogWycvYXNzZXRzL2ZvbnQvY2FyZF9mb250cy8nICsgZm9udEZhbWlseSArICcvJyArIGZvbnRGYW1pbHkgKyAnLmNzcyddXG5cdFx0XHRcdGZvbnRsb2FkaW5nOiAgPT5cblx0XHRcdFx0XHQjIGNvbnNvbGUubG9nICdmb250bG9hZGluZzpcXHQnLCBhcmd1bWVudHNcblx0XHRcdFx0Zm9udGFjdGl2ZTogKGZvbnRGYW1pbHksIGZvbnRPcHRpb25zKSAgPT5cblx0XHRcdFx0XHRAbW9kZWwuc2V0ICdnZW5lcmF0b3JzLnRleHRHZW4uZm9udEZhbWlseScsIGZvbnRGYW1pbHksIHNpbGVudDogdHJ1ZVxuXHRcdFx0XHRcdCMgY29uc29sZS5sb2cgJ2ZvbnRhY3RpdmUnLCBAbW9kZWwuZ2V0ICdnZW5lcmF0b3JzLnRleHRHZW4uZm9udEZhbWlseSdcblx0XHRcdFx0XHQjIGNvbnNvbGUuaW5mbyAnZm9udGFjdGl2ZTpcXHQgXFx0JywgZm9udEZhbWlseSwgQFxuXHRcdFx0XHRcdCMgd2FpdCBmb3QgY29tbW9uIGN1c3RvbSBmb250c1xuXHRcdFx0XHRcdHN1Y2Nlc3NDYWxsYmFjay5hcHBseShAKVxuXHRcdFx0XHRcdCMgaWYgZG9jdW1lbnQuZm9udHNcblx0XHRcdFx0XHQjIFx0Y29uc29sZS5sb2cgJ2xvYWRpbmcgZm9udCBieSBkb2N1bWVudC5mb250cycsIGFyZ3VtZW50c1xuXHRcdFx0XHRcdCMgXHRkb2N1bWVudC5mb250cy5sb2FkKFwiMTBweCBjYXJkaG9sZGVyLWljb25zXCIpXG5cdFx0XHRcdFx0IyBcdC50aGVuIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFja1xuXHRcdFx0XHRcdCMgZWxzZVxuXHRcdFx0XHRcdCMgXHRjb25zb2xlLmxvZyAnbG9hZGluZyBmb250IGJ5IEFKQVgnLCBhcmd1bWVudHNcblx0XHRcdFx0XHQjIFx0JC5nZXQgXCIvYXNzZXRzL2ZvbnQvY2FyZGhvbGRlci1pY29ucy53b2ZmPy1hN2pxNTJcIlxuXHRcdFx0XHRcdCMgXHQudGhlbiBzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2tcblx0XHRcdFx0Zm9udGluYWN0aXZlOiAgPT5cblx0XHRcdFx0XHRjb25zb2xlLndhcm4gJ2ZvbnRpbmFjdGl2ZScsIEBtb2RlbC5nZXQgJ2dlbmVyYXRvcnMudGV4dEdlbi5mb250RmFtaWx5J1xuXHRcdFx0XHRcdGVycm9yQ2FsbGJhY2suYXBwbHkoQClcblx0XHRcdFx0XHQjIGNvbnNvbGUud2FybiAnZm9udGluYWN0aXZlOlxcdCBcXHQnLCBhcmd1bWVudHNcblx0XHRcdFx0XHQjIHdhaXQgZm90IGNvbW1vbiBjdXN0b20gZm9udHNcblx0XHRcdFx0XHQjIGlmIGRvY3VtZW50LmZvbnRzIHRoZW4gZG9jdW1lbnQuZm9udHMubG9hZChcIjEwcHggY2FyZGhvbGRlci1pY29uc1wiKS50aGVuIEByZW5kZXJPbkJhY2tXaXRoQW5pbWF0ZSwgZXJyb3JDYWxsYmFja1xuXHRcdFx0XHRcdCMgZWxzZSAkLmdldCBcIi9hc3NldHMvZm9udC9jYXJkaG9sZGVyLWljb25zLndvZmY/LWE3anE1MlwiLCA9PiBAcmVuZGVyT25CYWNrV2l0aEFuaW1hdGUoKWZcblx0XHRcdCMgIyB3YWl0IGZvdCBjb21tb24gY3VzdG9tIGZvbnRzXG5cdFx0XHQjIGlmIGRvY3VtZW50LmZvbnRzIHRoZW4gZG9jdW1lbnQuZm9udHMubG9hZChcIjEwcHggY2FyZGhvbGRlci1pY29uc1wiKS50aGVuIEByZW5kZXJPbkJhY2tXaXRoQW5pbWF0ZSwgZXJyb3JDYWxsYmFja1xuXHRcdFx0IyBlbHNlICQuZ2V0IFwiL2Fzc2V0cy9mb250L2NhcmRob2xkZXItaWNvbnMud29mZj8tYTdqcTUyXCIsID0+IEByZW5kZXJPbkJhY2tXaXRoQW5pbWF0ZSgpXG5cblx0XHR0cmFuc2l0aW9uQ2FsbGJhY2sgOiAoZSkgPT5cblx0XHRcdHByb3BlcnR5TmFtZSA9IGUub3JpZ2luYWxFdmVudC5wcm9wZXJ0eU5hbWVcblx0XHRcdCMgaWYgZS50YXJnZXQgaXMgQCRlbC5maW5kKCcuY2FyZC1wZXJzcGVjdGl2ZS1pbm5lci13cmFwcGVyJylbMF0gYW5kIHByb3BlcnR5TmFtZS5zZWFyY2goJ3RyYW5zZm9ybScpID4gLTFcblx0XHRcdGlmIHByb3BlcnR5TmFtZS5zZWFyY2goJ3RyYW5zZm9ybScpID4gLTFcblx0XHRcdFx0QHN0YXRlLnNldCAnaXMtZmxpcHBpbmcnLCBmYWxzZSwgc2lsZW50OiB0cnVlXG5cdFx0XHRcdEAkZWwucmVtb3ZlQ2xhc3MgJ2lzLWZsaXBpbmcnXG5cdFx0XHQjIEB0cmlnZ2VyICd0cmFuc2l0aW9uZW5kJywgZVxuXG5cdFx0cmVuZGVyT25CYWNrOiA9PlxuXHRcdFx0dW5sZXNzIEAkZWwuaGFzQ2xhc3MgJ2ZsaXBlZCdcblx0XHRcdFx0IHN2ZyA9IEBzdmdGcm9udFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRzdmcgPSBAc3ZnQmFja1xuXHRcdFx0QHJlbmRlckNhcmQgc3ZnXHRcdFxuXG5cdFx0cmVuZGVyT25Gcm9udDogPT5cblx0XHRcdGlmIEAkZWwuaGFzQ2xhc3MgJ2ZsaXBlZCdcblx0XHRcdFx0IHN2ZyA9IEBzdmdGcm9udFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRzdmcgPSBAc3ZnQmFja1xuXHRcdFx0QHJlbmRlckNhcmQgc3ZnXG5cblx0XHRyZW5kZXJPbkJhY2tXaXRoQW5pbWF0ZTogPT5cblx0XHRcdEByZW5kZXJPbkJhY2soKVxuXHRcdFx0QGZsaXAoKVx0XG5cblx0XHRyZW5kZXJDYXJkOiAoc3ZnKSA9PlxuXHRcdFx0IyBzdmcud2lkdGggPSBAJGVsLndpZHRoKClcblx0XHRcdCMgc3ZnLmhlaWdodCA9IEAkZWwuaGVpZ2h0KClcblx0XHRcdHN2Zy5jbGVhcigpXG5cdFx0XHRAcmVuZGVyTGF5ZXIxKHN2Zylcblx0XHRcdCMgQHJlbmRlckxheWVyMihzdmcpXG5cdFx0XHRAcmVuZGVyTGF5ZXIzKHN2Zylcblx0XHRcdHN2Z1xuXG5cdFx0cmVuZGVyTGF5ZXIxOiAoc3ZnKSA9PlxuXHRcdFx0YXBwLnNoYXJlZC5nZW5lcmF0b3JzLmdyYWRpZW50R2VuLmRyYXcgc3ZnLCBAbW9kZWxcblxuXHRcdHJlbmRlckxheWVyMjogKHN2ZykgPT5cblx0XHRcdGFwcC5zaGFyZWQuZ2VuZXJhdG9ycy5pY29uc0dlbi5kcmF3IHN2ZywgQG1vZGVsXG5cblx0XHRyZW5kZXJMYXllcjM6IChzdmcpID0+XG5cdFx0XHRhcHAuc2hhcmVkLmdlbmVyYXRvcnMudGV4dEdlbi5kcmF3IHN2ZywgQG1vZGVsXG5cblx0XHRnZXRSYW5kb21Gb250OiA9PlxuXHRcdFx0Zm9udHNMaXN0ID0gZGF0YUZyb21TZXJ2ZXIuYXBwRGF0YS5mb250c0xpc3Rcblx0XHRcdGZvbnRGYW1pbHkgPSAnJysgZm9udHNMaXN0WyBhcHAuZ2V0UmFuZG9tKDAsIGZvbnRzTGlzdC5sZW5ndGgtMSkgXVxuXHRcdFx0Zm9udEZhbWlseVxuXG5cdFx0ZmxpcDogPT5cblx0XHRcdEB0cmlnZ2VyICdmbGlwJ1xuXHRcdFx0QCRlbC50b2dnbGVDbGFzcyAnZmxpcGVkJ1xuXHRcdFx0QCRlbC5hZGRDbGFzcyAnaXMtZmxpcGluZydcblx0XHRcdEBzdGF0ZS5zZXQgJ2lzLWZsaXBwaW5nJywgdHJ1ZSwgc2lsZW50OiB0cnVlXG5cblx0XHRvbkxvY2tCdXR0b25DbGlja2VkOiAtPlxuXHRcdFx0aWYgQHN0YXRlLmdldCgnaXMtbG9ja2VkJykgaXMgdHJ1ZVxuXHRcdFx0XHRAc3RhdGUuc2V0ICdpcy1sb2NrZWQnLCBmYWxzZSxcblx0XHRcdFx0XHRzaWxlbnQ6IHRydWVcblx0XHRcdFx0QCRlbC5yZW1vdmVDbGFzcygnaXMtbG9ja2VkJylcblx0XHRcdFx0LmZpbmQgJy5qcy1sb2NrLWNvbmZpZy1idXR0b24nXG5cdFx0XHRcdC50ZXh0ICfQl9Cw0LrRgNC10L/QuNGC0YwnIFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAc3RhdGUuc2V0ICdpcy1sb2NrZWQnLCB0cnVlLFxuXHRcdFx0XHRcdHNpbGVudDogdHJ1ZVxuXHRcdFx0XHRAJGVsLmFkZENsYXNzKCdpcy1sb2NrZWQnKVxuXHRcdFx0XHQuZmluZCAnLmpzLWxvY2stY29uZmlnLWJ1dHRvbidcblx0XHRcdFx0LnRleHQgJ9Ce0YLQutGA0LXQv9C40YLRjCcgXG5cblx0XHRvbk1vdXNlRW50ZXI6IC0+XG5cdFx0XHRAJGVsLmFkZENsYXNzICdpcy1ob3ZlcmVkJ1xuXHRcdFx0QHN0YXRlLnNldCAnaXMtaG92ZXJlZCcsIHRydWUsIHNpbGVudDogdHJ1ZVxuXHRcdFx0aWYgbm90IChAc3RhdGUuaGFzKCdpcy1sb2NrZWQnKSBvciBAc3RhdGUuZ2V0KCdpcy1sb2NrZWQnKSApXG5cdFx0XHRcdGlmIEAkZWwuaGFzQ2xhc3MoJ2lzLWZsaXBpbmcnKVxuXHRcdFx0XHRcdEAkZWwudG9nZ2xlQ2xhc3MgJ2ZsaXBlZCdcblx0XHRcdFx0QCRlbC5wcmVwZW5kICc8ZGl2IGNsYXNzPVwianMtbG9jay1jb25maWctYnV0dG9uLXdyYXBwZXJcIj48YnV0dG9uIGNsYXNzPVwianMtbG9jay1jb25maWctYnV0dG9uXCI+0JfQsNC60YDQtdC/0LjRgtGMPC9idXR0b24+PC9kaXY+J1xuXHRcdG9uTW91c2VMZWF2ZTogLT5cblx0XHRcdEAkZWwucmVtb3ZlQ2xhc3MgJ2lzLWhvdmVyZWQnXG5cdFx0XHRAc3RhdGUuc2V0ICdpcy1ob3ZlcmVkJywgZmFsc2UsIHNpbGVudDogdHJ1ZVxuXHRcdFx0aWYgQHN0YXRlLmdldCgnaXMtbG9ja2VkJykgaXNudCB0cnVlXG5cdFx0XHRcdEAkZWwuZmluZCgnLmpzLWxvY2stY29uZmlnLWJ1dHRvbi13cmFwcGVyJykucmVtb3ZlKClcblxuIl19