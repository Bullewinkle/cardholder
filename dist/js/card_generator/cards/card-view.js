(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('CardGenerator.cards', function(Cards) {
    return Cards.CardView = (function(_super) {
      __extends(CardView, _super);

      function CardView() {
        this.flip = __bind(this.flip, this);
        this.transitionCallback = __bind(this.transitionCallback, this);
        this.onShow = __bind(this.onShow, this);
        this.renderCanvas = __bind(this.renderCanvas, this);
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
        this.listenTo(this.model, 'change', this.renderCanvas);
        return this.listenTo(app, 'resize', this.resize);
      };

      CardView.prototype.renderCanvas = function() {
        var canvas;
        if (this.$el.hasClass('fliped')) {
          canvas = this.$el.find('.card-canvas.front')[0];
        } else {
          canvas = this.$el.find('.card-canvas.back')[0];
        }
        canvas.width = this.$el.width();
        canvas.height = this.$el.height();
        this.renderLayer1(canvas);
        this.renderLayer2(canvas);
        this.renderLayer3(canvas);
        this.flip();
        return this;
      };

      CardView.prototype.onShow = function() {
        var handleError;
        handleError = function() {
          return console.error('error loading font');
        };
        return document.fonts.load("10px cardholder-icons").then(this.renderCanvas, handleError);
      };

      CardView.prototype.transitionCallback = function(e) {
        var propertyName;
        propertyName = e.originalEvent.propertyName;
        if (propertyName.search('transform') > -1) {
          this.$el.removeClass('is-fliping');
        }
        return this.trigger('transitionend', e);
      };

      CardView.prototype.flip = function() {
        this.trigger('flip');
        this.$el.toggleClass('fliped');
        return this.$el.addClass('is-fliping');
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
        return this.renderCanvas();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZ2VuZXJhdG9yL2NhcmRzL2NhcmQtdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOzttU0FBQTs7QUFBQSxFQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxDQUFZLHFCQUFaLEVBQW1DLFNBQUMsS0FBRCxHQUFBO1dBQzVCLEtBQUssQ0FBQztBQUNYLGlDQUFBLENBQUE7Ozs7Ozs7OztPQUFBOztBQUFBLHlCQUFBLE1BQUEsR0FBUSxLQUFSLENBQUE7O0FBQUEseUJBRUEsT0FBQSxHQUFTLElBRlQsQ0FBQTs7QUFBQSx5QkFHQSxTQUFBLEdBQVcsTUFIWCxDQUFBOztBQUFBLHlCQUtBLEVBQUEsR0FDQztBQUFBLFFBQUEsV0FBQSxFQUFhLG1CQUFiO0FBQUEsUUFDQSxVQUFBLEVBQVksb0JBRFo7T0FORCxDQUFBOztBQUFBLHlCQVNBLFFBQUEsR0FBVSxTQUFBLEdBQUE7ZUFDVCxXQUFXLENBQUMsYUFBYSxDQUFDLElBQTFCLENBQStCLElBQUMsQ0FBQSxLQUFoQyxFQURTO01BQUEsQ0FUVixDQUFBOztBQUFBLHlCQVdBLE1BQUEsR0FDQztBQUFBLFFBQUEsWUFBQSxFQUFlLGNBQWY7QUFBQSxRQUNBLFlBQUEsRUFBZSxjQURmO0FBQUEsUUFFQSw4QkFBQSxFQUFnQyxxQkFGaEM7QUFBQSxRQUdBLGVBQUEsRUFBaUIsb0JBSGpCO09BWkQsQ0FBQTs7QUFBQSx5QkFrQkEsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNYLFFBQUEsSUFBQyxDQUFBLElBQUQsQ0FBTSxLQUFOLEVBQWMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFBLEdBQUE7QUFDYixZQUFBLElBQW9ELEtBQUMsQ0FBQSxNQUFELEtBQVcsSUFBL0Q7cUJBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSx5QkFBWixFQUF1QyxTQUF2QyxFQUFBO2FBRGE7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFkLENBQUEsQ0FB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Y2UvIiwic291cmNlc0NvbnRlbnQiOlsiQGFwcC5tb2R1bGUgJ0NhcmRHZW5lcmF0b3IuY2FyZHMnLCAoQ2FyZHMpIC0+XHRcblx0Y2xhc3MgQ2FyZHMuQ2FyZFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkl0ZW1WaWV3XG5cdFx0bG9nZ2VyOiBvZmZcblxuXHRcdHRhZ05hbWU6ICdsaSdcblx0XHRjbGFzc05hbWU6ICdjYXJkJ1xuXG5cdFx0dWk6XG5cdFx0XHRjYW52YXNGcm9udDogJy5jYXJkLWNhbnZhcy5iYWNrJ1xuXHRcdFx0Y2FudmFzQmFjazogJy5jYXJkLWNhbnZhcy5mcm9udCdcblxuXHRcdHRlbXBsYXRlOiA9PlxuXHRcdFx0dGVtcGxhdGl6ZXIuY2FyZEdlbmVyYXRvci5jYXJkIEBtb2RlbFxuXHRcdGV2ZW50czpcblx0XHRcdCdtb3VzZWVudGVyJzogICdvbk1vdXNlRW50ZXInXG5cdFx0XHQnbW91c2VsZWF2ZSc6ICAnb25Nb3VzZUxlYXZlJ1xuXHRcdFx0J2NsaWNrIC5qcy1sb2NrLWNvbmZpZy1idXR0b24nOiAnb25Mb2NrQnV0dG9uQ2xpY2tlZCdcblx0XHRcdCd0cmFuc2l0aW9uZW5kJzogJ3RyYW5zaXRpb25DYWxsYmFjaydcblxuXHRcdCMgbW9kZWxFdmVudHM6IHt9XG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdEBiaW5kICdhbGwnLCAgPT4gXG5cdFx0XHRcdGNvbnNvbGUubG9nIFwiQ0FSRCBJVEVNIFZJRVc6XFx0IFxcdCBcXHRcIiwgYXJndW1lbnRzIGlmIEBsb2dnZXIgaXMgb25cblx0XHRcdEBtb2RlbC52aWV3ID0gQFxuXHRcdFx0QGxpc3RlblRvIEBtb2RlbCwnY2hhbmdlJyxAcmVuZGVyQ2FudmFzXG5cdFx0XHRAbGlzdGVuVG8gYXBwLCdyZXNpemUnLCBAcmVzaXplXG5cblx0XHRyZW5kZXJDYW52YXM6ID0+XG5cdFx0XHRpZiBAJGVsLmhhc0NsYXNzICdmbGlwZWQnXG5cdFx0XHRcdCBjYW52YXMgPSBAJGVsLmZpbmQoJy5jYXJkLWNhbnZhcy5mcm9udCcpWzBdXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGNhbnZhcyA9IEAkZWwuZmluZCgnLmNhcmQtY2FudmFzLmJhY2snKVswXVxuXG5cdFx0XHRjYW52YXMud2lkdGggPSBAJGVsLndpZHRoKClcblx0XHRcdGNhbnZhcy5oZWlnaHQgPSBAJGVsLmhlaWdodCgpXG5cblx0XHRcdEByZW5kZXJMYXllcjEoY2FudmFzKVxuXHRcdFx0QHJlbmRlckxheWVyMihjYW52YXMpXG5cdFx0XHRAcmVuZGVyTGF5ZXIzKGNhbnZhcylcblxuXHRcdFx0QGZsaXAoKVxuXHRcdFx0QFxuXG5cdFx0b25TaG93OiA9PlxuXHRcdFx0aGFuZGxlRXJyb3IgPSAtPiBjb25zb2xlLmVycm9yICdlcnJvciBsb2FkaW5nIGZvbnQnXG5cdFx0XHRkb2N1bWVudC5mb250cy5sb2FkKFwiMTBweCBjYXJkaG9sZGVyLWljb25zXCIpLnRoZW4gQHJlbmRlckNhbnZhcywgaGFuZGxlRXJyb3JcblxuXHRcdHRyYW5zaXRpb25DYWxsYmFjayA6IChlKSA9PlxuXHRcdFx0cHJvcGVydHlOYW1lID0gZS5vcmlnaW5hbEV2ZW50LnByb3BlcnR5TmFtZVxuXHRcdFx0IyBpZiBlLnRhcmdldCBpcyBAJGVsLmZpbmQoJy5jYXJkLXBlcnNwZWN0aXZlLWlubmVyLXdyYXBwZXInKVswXSBhbmQgcHJvcGVydHlOYW1lLnNlYXJjaCgndHJhbnNmb3JtJykgPiAtMVxuXHRcdFx0aWYgcHJvcGVydHlOYW1lLnNlYXJjaCgndHJhbnNmb3JtJykgPiAtMVxuXHRcdFx0XHRAJGVsLnJlbW92ZUNsYXNzICdpcy1mbGlwaW5nJ1xuXHRcdFx0QHRyaWdnZXIgJ3RyYW5zaXRpb25lbmQnLCBlXG5cdFx0XHRcblx0XHRmbGlwOiA9PlxuXHRcdFx0QHRyaWdnZXIgJ2ZsaXAnXG5cdFx0XHRAJGVsLnRvZ2dsZUNsYXNzICdmbGlwZWQnXG5cdFx0XHRAJGVsLmFkZENsYXNzICdpcy1mbGlwaW5nJ1xuXG5cdFx0cmVuZGVyTGF5ZXIxOiAoY2FudmFzKS0+XG5cdFx0XHRhcHAuQ2FyZEdlbmVyYXRvci5nZW5lcmF0b3JzLmdyYWRpZW50R2VuLmRyYXcgY2FudmFzLCBAbW9kZWxcblxuXHRcdHJlbmRlckxheWVyMjogKGNhbnZhcyktPlxuXHRcdFx0YXBwLkNhcmRHZW5lcmF0b3IuZ2VuZXJhdG9ycy5pY29uc0dlbi5kcmF3IGNhbnZhcywgQG1vZGVsXG5cblx0XHRyZW5kZXJMYXllcjM6IChjYW52YXMpLT5cblx0XHRcdGFwcC5DYXJkR2VuZXJhdG9yLmdlbmVyYXRvcnMudGV4dEdlbi5kcmF3IGNhbnZhcywgQG1vZGVsXG5cblx0XHRyZXNpemU6LT4gXG5cdFx0XHRAcmVuZGVyQ2FudmFzKClcblxuXHRcdG9uTG9ja0J1dHRvbkNsaWNrZWQ6IC0+XG5cdFx0XHRpZiBAbW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBpcyB0cnVlXG5cdFx0XHRcdEBtb2RlbC5zZXQgJ2lzLWxvY2tlZCcsIGZhbHNlLFxuXHRcdFx0XHRcdHNpbGVudDogdHJ1ZVxuXHRcdFx0XHRAJGVsLnJlbW92ZUNsYXNzKCdpcy1sb2NrZWQnKVxuXHRcdFx0XHQuZmluZCAnLmpzLWxvY2stY29uZmlnLWJ1dHRvbidcblx0XHRcdFx0LnRleHQgJ9CX0LDQutGA0LXQv9C40YLRjCcgXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBtb2RlbC5zZXQgJ2lzLWxvY2tlZCcsIHRydWUsXG5cdFx0XHRcdFx0c2lsZW50OiB0cnVlXG5cdFx0XHRcdEAkZWwuYWRkQ2xhc3MoJ2lzLWxvY2tlZCcpXG5cdFx0XHRcdC5maW5kICcuanMtbG9jay1jb25maWctYnV0dG9uJ1xuXHRcdFx0XHQudGV4dCAn0J7RgtC60YDQtdC/0LjRgtGMJyBcblxuXHRcdG9uTW91c2VFbnRlcjogLT5cblx0XHRcdEAkZWwuYWRkQ2xhc3MgJ2lzLWhvdmVyZWQnXG5cdFx0XHRAbW9kZWwuc2V0ICdpcy1ob3ZlcmVkJywgdHJ1ZSwgc2lsZW50OiB0cnVlXG5cdFx0XHRpZiBub3QgKEBtb2RlbC5oYXMoJ2lzLWxvY2tlZCcpIG9yIEBtb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIClcblx0XHRcdFx0aWYgQCRlbC5oYXNDbGFzcygnaXMtZmxpcGluZycpXG5cdFx0XHRcdFx0QCRlbC50b2dnbGVDbGFzcyAnZmxpcGVkJ1xuXHRcdFx0XHRAJGVsLnByZXBlbmQgJzxkaXYgY2xhc3M9XCJqcy1sb2NrLWNvbmZpZy1idXR0b24td3JhcHBlclwiPjxidXR0b24gY2xhc3M9XCJqcy1sb2NrLWNvbmZpZy1idXR0b25cIj7Ql9Cw0LrRgNC10L/QuNGC0Yw8L2J1dHRvbj48L2Rpdj4nXG5cdFx0b25Nb3VzZUxlYXZlOiAtPlxuXHRcdFx0QCRlbC5yZW1vdmVDbGFzcyAnaXMtaG92ZXJlZCdcblx0XHRcdEBtb2RlbC5zZXQgJ2lzLWhvdmVyZWQnLCBmYWxzZSwgc2lsZW50OiB0cnVlXG5cdFx0XHRpZiBAbW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBpc250IHRydWVcblx0XHRcdFx0QCRlbC5maW5kKCcuanMtbG9jay1jb25maWctYnV0dG9uLXdyYXBwZXInKS5yZW1vdmUoKVxuXG4iXX0=