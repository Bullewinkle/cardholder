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
        svgFront: '.card-svg.back',
        svgBack: '.card-svg.front'
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
        this.drawCard();
        this.ui.svgFront.attr('id', "svg-" + (this.model.get('id')) + "-front");
        return this.ui.svgBack.attr('id', "svg-" + (this.model.get('id')) + "-back");
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
          return this.$el.removeClass('is-fliping');
        }
      };

      CardView.prototype.renderOnBack = function() {
        var svg;
        if (!this.$el.hasClass('fliped')) {
          svg = this.ui.svgFront;
        } else {
          svg = this.ui.svgBack;
        }
        return this.renderCard(svg);
      };

      CardView.prototype.renderOnFront = function() {
        var svg;
        if (this.$el.hasClass('fliped')) {
          svg = this.ui.svgFront;
        } else {
          svg = this.ui.svgBack;
        }
        return this.renderCard(svg);
      };

      CardView.prototype.renderOnBackWithAnimate = function() {
        this.renderOnBack();
        return this.flip();
      };

      CardView.prototype.renderCard = function(svg) {
        svg.width = this.$el.width();
        svg.height = this.$el.height();
        this.renderLayer1(svg);
        return svg;
      };

      CardView.prototype.renderLayer1 = function(svg) {
        return app.CardGenerator.generators.gradientGen.draw(svg, this.model);
      };

      CardView.prototype.renderLayer2 = function(svg) {
        return app.CardGenerator.generators.iconsGen.draw(svg, this.model);
      };

      CardView.prototype.renderLayer3 = function(svg) {
        return app.CardGenerator.generators.textGen.draw(svg, this.model);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZ2VuZXJhdG9yL2NhcmRzL2NhcmQtdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOzttU0FBQTs7QUFBQSxFQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxDQUFZLHFCQUFaLEVBQW1DLFNBQUMsS0FBRCxHQUFBO1dBQzVCLEtBQUssQ0FBQztBQUNYLGlDQUFBLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQUFBOztBQUFBLHlCQUFBLE1BQUEsR0FBUSxLQUFSLENBQUE7O0FBQUEseUJBRUEsT0FBQSxHQUFTLElBRlQsQ0FBQTs7QUFBQSx5QkFHQSxTQUFBLEdBQVcsTUFIWCxDQUFBOztBQUFBLHlCQUtBLEVBQUEsR0FDQztBQUFBLFFBQUEsUUFBQSxFQUFVLGdCQUFWO0FBQUEsUUFDQSxPQUFBLEVBQVMsaUJBRFQ7T0FORCxDQUFBOztBQUFBLHlCQVNBLFFBQUEsR0FBVSxTQUFBLEdBQUE7ZUFDVCxXQUFXLENBQUMsYUFBYSxDQUFDLElBQTFCLENBQStCLElBQUMsQ0FBQSxLQUFoQyxFQURTO01BQUEsQ0FUVixDQUFBOztBQUFBLHlCQVdBLE1BQUEsR0FDQztBQUFBLFFBQUEsWUFBQSxFQUFlLGNBQWY7QUFBQSxRQUNBLFlBQUEsRUFBZSxjQURmO0FBQUEsUUFFQSw4QkFBQSxFQUFnQyxxQkFGaEM7QUFBQSxRQUdBLGVBQUEsRUFBaUIsb0JBSGpCO09BWkQsQ0FBQTs7QUFBQSx5QkFrQkEsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNYLFFBQUEsSUFBQyxDQUFBLElBQUQsQ0FBTSxLQUFOLEVBQWMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFBLEdBQUE7QUFDYixZQUFBLElBQW9ELEtBQUMsQ0FBQSxNQUFELEtBQVcsSUFBL0Q7cUJBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSx5QkFBWixFQUF1QyxTQUF2QyxFQUFBO2FBRGE7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFk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QUEyQyxDQUFDLE1BQTVDLENBQUEsRUFERDtTQUhhO01BQUEsQ0ExSmQsQ0FBQTs7c0JBQUE7O09BRDRCLFVBQVUsQ0FBQyxVQUROO0VBQUEsQ0FBbkMsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZF9nZW5lcmF0b3IvY2FyZHMvY2FyZC12aWV3LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiQGFwcC5tb2R1bGUgJ0NhcmRHZW5lcmF0b3IuY2FyZHMnLCAoQ2FyZHMpIC0+XHRcblx0Y2xhc3MgQ2FyZHMuQ2FyZFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkl0ZW1WaWV3XG5cdFx0bG9nZ2VyOiBvZmZcblxuXHRcdHRhZ05hbWU6ICdsaSdcblx0XHRjbGFzc05hbWU6ICdjYXJkJ1xuXG5cdFx0dWk6XG5cdFx0XHRzdmdGcm9udDogJy5jYXJkLXN2Zy5iYWNrJ1xuXHRcdFx0c3ZnQmFjazogJy5jYXJkLXN2Zy5mcm9udCdcblxuXHRcdHRlbXBsYXRlOiA9PlxuXHRcdFx0dGVtcGxhdGl6ZXIuY2FyZEdlbmVyYXRvci5jYXJkIEBtb2RlbFxuXHRcdGV2ZW50czpcblx0XHRcdCdtb3VzZWVudGVyJzogICdvbk1vdXNlRW50ZXInXG5cdFx0XHQnbW91c2VsZWF2ZSc6ICAnb25Nb3VzZUxlYXZlJ1xuXHRcdFx0J2NsaWNrIC5qcy1sb2NrLWNvbmZpZy1idXR0b24nOiAnb25Mb2NrQnV0dG9uQ2xpY2tlZCdcblx0XHRcdCd0cmFuc2l0aW9uZW5kJzogJ3RyYW5zaXRpb25DYWxsYmFjaydcblxuXHRcdCMgbW9kZWxFdmVudHM6IHt9XG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdEBiaW5kICdhbGwnLCAgPT4gXG5cdFx0XHRcdGNvbnNvbGUubG9nIFwiQ0FSRCBJVEVNIFZJRVc6XFx0IFxcdCBcXHRcIiwgYXJndW1lbnRzIGlmIEBsb2dnZXIgaXMgb25cblx0XHRcdEBtb2RlbC52aWV3ID0gQFxuXHRcdFx0QGxpc3RlblRvIEBtb2RlbCwnY2hhbmdlJywgQGRyYXdDYXJkXG5cdFx0XHRAbGlzdGVuVG8gYXBwLCdyZXNpemUnLCBAcmVuZGVyT25Gcm9udFxuXG5cdFx0b25TaG93OiA9PlxuXHRcdFx0QGRyYXdDYXJkKClcblx0XHRcdEB1aS5zdmdGcm9udC5hdHRyICdpZCcsIFwic3ZnLSN7QG1vZGVsLmdldCAnaWQnfS1mcm9udFwiXG5cdFx0XHRAdWkuc3ZnQmFjay5hdHRyICdpZCcsIFwic3ZnLSN7QG1vZGVsLmdldCAnaWQnfS1iYWNrXCJcblxuXHRcdGRyYXdDYXJkOiA9PlxuXHRcdFx0aWYgQG1vZGVsLmdldCAnZGF0YS5pc0RlZmF1bHQnXG5cdFx0XHRcdGlmIEBtb2RlbC5nZXQgJ2dlbmVyYXRvcnMudGV4dEdlbi5pc0RlZmF1bHQnXG5cdFx0XHRcdFx0QGxvYWRGb250IEBnZXRSYW5kb21Gb250KCksIEByZW5kZXJPbkJhY2tXaXRoQW5pbWF0ZVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0QHJlbmRlck9uQmFja1dpdGhBbmltYXRlKClcblx0XHRcdGVsc2Vcblx0XHRcdFx0QHJlbmRlck9uRnJvbnQoKVxuXG5cdFx0bG9hZEZvbnQ6IChmb250RmFtaWx5LCBzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spID0+XG5cdFx0XHRzdWNjZXNzQ2FsbGJhY2sgPSBzdWNjZXNzQ2FsbGJhY2sgb3IgLT4gY29uc29sZS5pbmZvICdmb250IGxvYWRpbmcgc3VjY2Vzcydcblx0XHRcdGVycm9yQ2FsbGJhY2sgPSBlcnJvckNhbGxiYWNrIG9yIC0+IGNvbnNvbGUuZXJyb3IgJ2ZvbnQgbG9hZGluZyBmYWlsJ1xuXG5cdFx0XHQjIExvYWQgZm9udHMgZGluYW1pY2FseSB0aHJvdWdoIGdvb2dsZSB3ZWIgbG9hZGVyXG5cdFx0XHRlcnJvckNhbGxiYWNrID0gLT4gY29uc29sZS5lcnJvciAnZXJyb3IgbG9hZGluZyBmb250J1xuXG5cdFx0XHRXZWJGb250LmxvYWRcblx0XHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRcdGZhbWlsaWVzOiBbZm9udEZhbWlseV1cblx0XHRcdFx0XHR1cmxzOiBbJy9hc3NldHMvZm9udC9jYXJkX2ZvbnRzLycgKyBmb250RmFtaWx5ICsgJy8nICsgZm9udEZhbWlseSArICcuY3NzJ11cblx0XHRcdFx0Zm9udGxvYWRpbmc6ICA9PlxuXHRcdFx0XHRcdCMgY29uc29sZS5sb2cgJ2ZvbnRsb2FkaW5nOlxcdCcsIGFyZ3VtZW50c1xuXHRcdFx0XHRmb250YWN0aXZlOiAoZm9udEZhbWlseSwgZm9udE9wdGlvbnMpICA9PlxuXHRcdFx0XHRcdEBtb2RlbC5zZXQgJ2dlbmVyYXRvcnMudGV4dEdlbi5mb250RmFtaWx5JywgZm9udEZhbWlseSwgc2lsZW50OiB0cnVlXG5cdFx0XHRcdFx0IyBjb25zb2xlLmxvZyAnZm9udGFjdGl2ZScsIEBtb2RlbC5nZXQgJ2dlbmVyYXRvcnMudGV4dEdlbi5mb250RmFtaWx5J1xuXHRcdFx0XHRcdCMgY29uc29sZS5pbmZvICdmb250YWN0aXZlOlxcdCBcXHQnLCBmb250RmFtaWx5LCBAXG5cdFx0XHRcdFx0IyB3YWl0IGZvdCBjb21tb24gY3VzdG9tIGZvbnRzXG5cdFx0XHRcdFx0c3VjY2Vzc0NhbGxiYWNrLmFwcGx5KEApXG5cdFx0XHRcdFx0IyBpZiBkb2N1bWVudC5mb250c1xuXHRcdFx0XHRcdCMgXHRjb25zb2xlLmxvZyAnbG9hZGluZyBmb250IGJ5IGRvY3VtZW50LmZvbnRzJywgYXJndW1lbnRzXG5cdFx0XHRcdFx0IyBcdGRvY3VtZW50LmZvbnRzLmxvYWQoXCIxMHB4IGNhcmRob2xkZXItaWNvbnNcIilcblx0XHRcdFx0XHQjIFx0LnRoZW4gc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrXG5cdFx0XHRcdFx0IyBlbHNlXG5cdFx0XHRcdFx0IyBcdGNvbnNvbGUubG9nICdsb2FkaW5nIGZvbnQgYnkgQUpBWCcsIGFyZ3VtZW50c1xuXHRcdFx0XHRcdCMgXHQkLmdldCBcIi9hc3NldHMvZm9udC9jYXJkaG9sZGVyLWljb25zLndvZmY/LWE3anE1MlwiXG5cdFx0XHRcdFx0IyBcdC50aGVuIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFja1xuXHRcdFx0XHRmb250aW5hY3RpdmU6ICA9PlxuXHRcdFx0XHRcdGNvbnNvbGUud2FybiAnZm9udGluYWN0aXZlJywgQG1vZGVsLmdldCAnZ2VuZXJhdG9ycy50ZXh0R2VuLmZvbnRGYW1pbHknXG5cdFx0XHRcdFx0ZXJyb3JDYWxsYmFjay5hcHBseShAKVxuXHRcdFx0XHRcdCMgY29uc29sZS53YXJuICdmb250aW5hY3RpdmU6XFx0IFxcdCcsIGFyZ3VtZW50c1xuXHRcdFx0XHRcdCMgd2FpdCBmb3QgY29tbW9uIGN1c3RvbSBmb250c1xuXHRcdFx0XHRcdCMgaWYgZG9jdW1lbnQuZm9udHMgdGhlbiBkb2N1bWVudC5mb250cy5sb2FkKFwiMTBweCBjYXJkaG9sZGVyLWljb25zXCIpLnRoZW4gQHJlbmRlck9uQmFja1dpdGhBbmltYXRlLCBlcnJvckNhbGxiYWNrXG5cdFx0XHRcdFx0IyBlbHNlICQuZ2V0IFwiL2Fzc2V0cy9mb250L2NhcmRob2xkZXItaWNvbnMud29mZj8tYTdqcTUyXCIsID0+IEByZW5kZXJPbkJhY2tXaXRoQW5pbWF0ZSgpZlxuXHRcdFx0IyAjIHdhaXQgZm90IGNvbW1vbiBjdXN0b20gZm9udHNcblx0XHRcdCMgaWYgZG9jdW1lbnQuZm9udHMgdGhlbiBkb2N1bWVudC5mb250cy5sb2FkKFwiMTBweCBjYXJkaG9sZGVyLWljb25zXCIpLnRoZW4gQHJlbmRlck9uQmFja1dpdGhBbmltYXRlLCBlcnJvckNhbGxiYWNrXG5cdFx0XHQjIGVsc2UgJC5nZXQgXCIvYXNzZXRzL2ZvbnQvY2FyZGhvbGRlci1pY29ucy53b2ZmPy1hN2pxNTJcIiwgPT4gQHJlbmRlck9uQmFja1dpdGhBbmltYXRlKClcblxuXHRcdHRyYW5zaXRpb25DYWxsYmFjayA6IChlKSA9PlxuXHRcdFx0cHJvcGVydHlOYW1lID0gZS5vcmlnaW5hbEV2ZW50LnByb3BlcnR5TmFtZVxuXHRcdFx0IyBpZiBlLnRhcmdldCBpcyBAJGVsLmZpbmQoJy5jYXJkLXBlcnNwZWN0aXZlLWlubmVyLXdyYXBwZXInKVswXSBhbmQgcHJvcGVydHlOYW1lLnNlYXJjaCgndHJhbnNmb3JtJykgPiAtMVxuXHRcdFx0aWYgcHJvcGVydHlOYW1lLnNlYXJjaCgndHJhbnNmb3JtJykgPiAtMVxuXHRcdFx0XHRAJGVsLnJlbW92ZUNsYXNzICdpcy1mbGlwaW5nJ1xuXHRcdFx0IyBAdHJpZ2dlciAndHJhbnNpdGlvbmVuZCcsIGVcblxuXHRcdHJlbmRlck9uQmFjazogPT5cblx0XHRcdHVubGVzcyBAJGVsLmhhc0NsYXNzICdmbGlwZWQnXG5cdFx0XHRcdCBzdmcgPSBAdWkuc3ZnRnJvbnRcblx0XHRcdGVsc2Vcblx0XHRcdFx0c3ZnID0gQHVpLnN2Z0JhY2tcblx0XHRcdEByZW5kZXJDYXJkIHN2Z1x0XHRcblxuXHRcdHJlbmRlck9uRnJvbnQ6ID0+XG5cdFx0XHRpZiBAJGVsLmhhc0NsYXNzICdmbGlwZWQnXG5cdFx0XHRcdCBzdmcgPSBAdWkuc3ZnRnJvbnRcblx0XHRcdGVsc2Vcblx0XHRcdFx0c3ZnID0gQHVpLnN2Z0JhY2tcblx0XHRcdEByZW5kZXJDYXJkIHN2Z1xuXG5cdFx0cmVuZGVyT25CYWNrV2l0aEFuaW1hdGU6ID0+XG5cdFx0XHRAcmVuZGVyT25CYWNrKClcblx0XHRcdEBmbGlwKClcdFxuXG5cdFx0cmVuZGVyQ2FyZDogKHN2ZykgPT5cblx0XHRcdHN2Zy53aWR0aCA9IEAkZWwud2lkdGgoKVxuXHRcdFx0c3ZnLmhlaWdodCA9IEAkZWwuaGVpZ2h0KClcblx0XHRcdFx0XHRcblx0XHRcdEByZW5kZXJMYXllcjEoc3ZnKVxuXHRcdFx0IyBAcmVuZGVyTGF5ZXIyKHN2Zylcblx0XHRcdCMgQHJlbmRlckxheWVyMyhzdmcpXG5cdFx0XHRzdmdcblxuXHRcdHJlbmRlckxheWVyMTogKHN2ZykgPT5cblx0XHRcdGFwcC5DYXJkR2VuZXJhdG9yLmdlbmVyYXRvcnMuZ3JhZGllbnRHZW4uZHJhdyBzdmcsIEBtb2RlbFxuXG5cdFx0cmVuZGVyTGF5ZXIyOiAoc3ZnKSA9PlxuXHRcdFx0YXBwLkNhcmRHZW5lcmF0b3IuZ2VuZXJhdG9ycy5pY29uc0dlbi5kcmF3IHN2ZywgQG1vZGVsXG5cblx0XHRyZW5kZXJMYXllcjM6IChzdmcpID0+XG5cdFx0XHRhcHAuQ2FyZEdlbmVyYXRvci5nZW5lcmF0b3JzLnRleHRHZW4uZHJhdyBzdmcsIEBtb2RlbFxuXG5cdFx0Z2V0UmFuZG9tRm9udDogPT5cblx0XHRcdGZvbnRzTGlzdCA9IGRhdGFGcm9tU2VydmVyLmFwcERhdGEuZm9udHNMaXN0XG5cdFx0XHRmb250RmFtaWx5ID0gJycrIGZvbnRzTGlzdFsgYXBwLmdldFJhbmRvbSgwLCBmb250c0xpc3QubGVuZ3RoLTEpIF1cblx0XHRcdGZvbnRGYW1pbHlcblxuXHRcdGZsaXA6ID0+XG5cdFx0XHRAdHJpZ2dlciAnZmxpcCdcblx0XHRcdEAkZWwudG9nZ2xlQ2xhc3MgJ2ZsaXBlZCdcblx0XHRcdEAkZWwuYWRkQ2xhc3MgJ2lzLWZsaXBpbmcnXG5cdFx0XHQjIHNldFRpbWVvdXQgPT5cblx0XHRcdCMgXHRAJGVsLnJlbW92ZUNsYXNzICdpcy1mbGlwaW5nJ1xuXHRcdFx0IyAsMzAwXHRcblxuXHRcdG9uTG9ja0J1dHRvbkNsaWNrZWQ6IC0+XG5cdFx0XHRpZiBAbW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBpcyB0cnVlXG5cdFx0XHRcdEBtb2RlbC5zZXQgJ2lzLWxvY2tlZCcsIGZhbHNlLFxuXHRcdFx0XHRcdHNpbGVudDogdHJ1ZVxuXHRcdFx0XHRAJGVsLnJlbW92ZUNsYXNzKCdpcy1sb2NrZWQnKVxuXHRcdFx0XHQuZmluZCAnLmpzLWxvY2stY29uZmlnLWJ1dHRvbidcblx0XHRcdFx0LnRleHQgJ9CX0LDQutGA0LXQv9C40YLRjCcgXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBtb2RlbC5zZXQgJ2lzLWxvY2tlZCcsIHRydWUsXG5cdFx0XHRcdFx0c2lsZW50OiB0cnVlXG5cdFx0XHRcdEAkZWwuYWRkQ2xhc3MoJ2lzLWxvY2tlZCcpXG5cdFx0XHRcdC5maW5kICcuanMtbG9jay1jb25maWctYnV0dG9uJ1xuXHRcdFx0XHQudGV4dCAn0J7RgtC60YDQtdC/0LjRgtGMJyBcblxuXHRcdG9uTW91c2VFbnRlcjogLT5cblx0XHRcdEAkZWwuYWRkQ2xhc3MgJ2lzLWhvdmVyZWQnXG5cdFx0XHRAbW9kZWwuc2V0ICdpcy1ob3ZlcmVkJywgdHJ1ZSwgc2lsZW50OiB0cnVlXG5cdFx0XHRpZiBub3QgKEBtb2RlbC5oYXMoJ2lzLWxvY2tlZCcpIG9yIEBtb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIClcblx0XHRcdFx0aWYgQCRlbC5oYXNDbGFzcygnaXMtZmxpcGluZycpXG5cdFx0XHRcdFx0QCRlbC50b2dnbGVDbGFzcyAnZmxpcGVkJ1xuXHRcdFx0XHRAJGVsLnByZXBlbmQgJzxkaXYgY2xhc3M9XCJqcy1sb2NrLWNvbmZpZy1idXR0b24td3JhcHBlclwiPjxidXR0b24gY2xhc3M9XCJqcy1sb2NrLWNvbmZpZy1idXR0b25cIj7Ql9Cw0LrRgNC10L/QuNGC0Yw8L2J1dHRvbj48L2Rpdj4nXG5cdFx0b25Nb3VzZUxlYXZlOiAtPlxuXHRcdFx0QCRlbC5yZW1vdmVDbGFzcyAnaXMtaG92ZXJlZCdcblx0XHRcdEBtb2RlbC5zZXQgJ2lzLWhvdmVyZWQnLCBmYWxzZSwgc2lsZW50OiB0cnVlXG5cdFx0XHRpZiBAbW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBpc250IHRydWVcblx0XHRcdFx0QCRlbC5maW5kKCcuanMtbG9jay1jb25maWctYnV0dG9uLXdyYXBwZXInKS5yZW1vdmUoKVxuXG4iXX0=