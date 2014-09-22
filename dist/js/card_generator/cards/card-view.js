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
          canvas = this.$el.find('.card-canvas.back')[0];
        } else {
          canvas = this.$el.find('.card-canvas.front')[0];
        }
        canvas.width = this.$el.width();
        canvas.height = this.$el.height();
        this.renderLayer1(canvas);
        this.renderLayer2(canvas);
        this.renderLayer3(canvas);
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
        console.log('transitionCallback');
        e.view = this;
        propertyName = e.originalEvent.propertyName;
        if (e.target === this.$el.find('.card-perspective-inner-wrapper')[0] && propertyName.search('transform') > -1) {
          if (this.$el.hasClass('is-fliping')) {
            this.$el.removeClass('is-fliping');
          }
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
        if (this.model.get('locked') === true) {
          this.model.set('locked', false, {
            silent: true
          });
          return this.$el.removeClass('locked').find('.js-lock-config-button').text('Закрепить');
        } else {
          this.model.set('locked', true, {
            silent: true
          });
          return this.$el.addClass('locked').find('.js-lock-config-button').text('Открепить');
        }
      };

      CardView.prototype.onMouseEnter = function() {
        if (!this.model.has('locked') || this.model.get('locked') !== true) {
          if (this.$el.hasClass('is-fliping')) {
            this.$el.toggleClass('fliped');
          }
          return this.$el.prepend('<div class="js-lock-config-button-wrapper"><button class="js-lock-config-button">Закрепить</button></div>');
        }
      };

      CardView.prototype.onMouseLeave = function() {
        if (!this.model.has('locked') || this.model.get('locked') !== true) {
          return this.$el.find('.js-lock-config-button-wrapper').remove();
        }
      };

      return CardView;

    })(Marionette.ItemView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZ2VuZXJhdG9yL2NhcmRzL2NhcmQtdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOzttU0FBQTs7QUFBQSxFQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxDQUFZLHFCQUFaLEVBQW1DLFNBQUMsS0FBRCxHQUFBO1dBQzVCLEtBQUssQ0FBQztBQUNYLGlDQUFBLENBQUE7Ozs7Ozs7OztPQUFBOztBQUFBLHlCQUFBLE1BQUEsR0FBUSxLQUFSLENBQUE7O0FBQUEseUJBR0EsT0FBQSxHQUFTLElBSFQsQ0FBQTs7QUFBQSx5QkFJQSxTQUFBLEdBQVcsTUFKWCxDQUFBOztBQUFBLHlCQU1BLEVBQUEsR0FDQztBQUFBLFFBQUEsV0FBQSxFQUFhLG1CQUFiO0FBQUEsUUFDQSxVQUFBLEVBQVksb0JBRFo7T0FQRCxDQUFBOztBQUFBLHlCQVVBLFFBQUEsR0FBVSxTQUFBLEdBQUE7ZUFDVCxXQUFXLENBQUMsYUFBYSxDQUFDLElBQTFCLENBQStCLElBQUMsQ0FBQSxLQUFoQyxFQURTO01BQUEsQ0FWVixDQUFBOztBQUFBLHlCQVlBLE1BQUEsR0FDQztBQUFBLFFBQUEsWUFBQSxFQUFlLGNBQWY7QUFBQSxRQUNBLFlBQUEsRUFBZSxjQURmO0FBQUEsUUFFQSw4QkFBQSxFQUFnQyxxQkFGaEM7QUFBQSxRQUdBLGVBQUEsRUFBaUIsb0JBSGpCO09BYkQsQ0FBQTs7QUFBQSx5QkFtQkEsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNYLFFBQUEsSUFBQyxDQUFBLElBQUQsQ0FBTSxLQUFOLEVBQWMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFBLEdBQUE7QUFDYixZQUFBLElBQW9ELEtBQUMsQ0FBQSxNQUFELEtBQVcsSUFBL0Q7cUJBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSx5QkFBWixFQUF1QyxTQUF2QyxFQUFBO2FBRGE7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFkLENBQUEsQ0FB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QSxDQUFBO2lCQUVBLElBQUMsQ0FBQSxHQUFHLENBQUMsUUFBTCxDQUFjLFFBQWQsQ0FDQSxDQUFDLElBREQsQ0FDTSx3QkFETixDQUVBLENBQUMsSUFGRCxDQUVNLFdBRk4sRUFURDtTQURvQjtNQUFBLENBbkdyQixDQUFBOztBQUFBLHlCQWlIQSxZQUFBLEdBQWMsU0FBQSxHQUFBO0FBQ2IsUUFBQSxJQUFHLENBQUEsSUFBRSxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsUUFBWCxDQUFELElBQXlCLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLFFBQVgsQ0FBQSxLQUEwQixJQUF0RDtBQUNDLFVBQUEsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLFFBQUwsQ0FBYyxZQUFkLENBQUg7QUFDQyxZQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsV0FBTCxDQUFpQixRQUFqQixDQUFBLENBREQ7V0FBQTtpQkFFQSxJQUFDLENBQUEsR0FBRyxDQUFDLE9BQUwsQ0FBYSwyR0FBYixFQUhEO1NBRGE7TUFBQSxDQWpIZCxDQUFBOztBQUFBLHlCQXNIQSxZQUFBLEdBQWMsU0FBQSxHQUFBO0FBQ2IsUUFBQSxJQUFHLENBQUEsSUFBRSxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsUUFBWCxDQUFELElBQXlCLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLFFBQVgsQ0FBQSxLQUEwQixJQUF0RDtpQkFDQyxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsQ0FBVSxnQ0FBVixDQUEyQyxDQUFDLE1BQTVDLENBQUEsRUFERDtTQURhO01BQUEsQ0F0SGQsQ0FBQTs7c0JBQUE7O09BRDRCLFVBQVUsQ0FBQyxVQUROO0VBQUEsQ0FBbkMsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZF9nZW5lcmF0b3IvY2FyZHMvY2FyZC12aWV3LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiQGFwcC5tb2R1bGUgJ0NhcmRHZW5lcmF0b3IuY2FyZHMnLCAoQ2FyZHMpIC0+XHRcblx0Y2xhc3MgQ2FyZHMuQ2FyZFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkl0ZW1WaWV3XG5cdFx0bG9nZ2VyOiBvZmZcblxuXG5cdFx0dGFnTmFtZTogJ2xpJ1xuXHRcdGNsYXNzTmFtZTogJ2NhcmQnXG5cblx0XHR1aTpcblx0XHRcdGNhbnZhc0Zyb250OiAnLmNhcmQtY2FudmFzLmJhY2snXG5cdFx0XHRjYW52YXNCYWNrOiAnLmNhcmQtY2FudmFzLmZyb250J1xuXG5cdFx0dGVtcGxhdGU6ID0+XG5cdFx0XHR0ZW1wbGF0aXplci5jYXJkR2VuZXJhdG9yLmNhcmQgQG1vZGVsXG5cdFx0ZXZlbnRzOlxuXHRcdFx0J21vdXNlZW50ZXInOiAgJ29uTW91c2VFbnRlcidcblx0XHRcdCdtb3VzZWxlYXZlJzogICdvbk1vdXNlTGVhdmUnXG5cdFx0XHQnY2xpY2sgLmpzLWxvY2stY29uZmlnLWJ1dHRvbic6ICdvbkxvY2tCdXR0b25DbGlja2VkJ1xuXHRcdFx0J3RyYW5zaXRpb25lbmQnOiAndHJhbnNpdGlvbkNhbGxiYWNrJ1xuXG5cdFx0IyBtb2RlbEV2ZW50czoge31cblx0XHRpbml0aWFsaXplOiAtPlxuXHRcdFx0QGJpbmQgJ2FsbCcsICA9PiBcblx0XHRcdFx0Y29uc29sZS5sb2cgXCJDQVJEIElURU0gVklFVzpcXHQgXFx0IFxcdFwiLCBhcmd1bWVudHMgaWYgQGxvZ2dlciBpcyBvblxuXG5cdFx0XHRAbW9kZWwudmlldyA9IEBcblx0XHRcdEBsaXN0ZW5UbyBAbW9kZWwsJ2NoYW5nZScsQHJlbmRlckNhbnZhc1xuXHRcdFx0QGxpc3RlblRvIGFwcCwncmVzaXplJywgQHJlc2l6ZVxuXG5cdFx0cmVuZGVyQ2FudmFzOiA9PlxuXHRcdFx0aWYgQCRlbC5oYXNDbGFzcyAnZmxpcGVkJ1xuXHRcdFx0XHQgY2FudmFzID0gQCRlbC5maW5kKCcuY2FyZC1jYW52YXMuYmFjaycpWzBdXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGNhbnZhcyA9IEAkZWwuZmluZCgnLmNhcmQtY2FudmFzLmZyb250JylbMF1cblxuXHRcdFx0Y2FudmFzLndpZHRoID0gQCRlbC53aWR0aCgpXG5cdFx0XHRjYW52YXMuaGVpZ2h0ID0gQCRlbC5oZWlnaHQoKVxuXG5cdFx0XHRAcmVuZGVyTGF5ZXIxKGNhbnZhcylcblx0XHRcdEByZW5kZXJMYXllcjIoY2FudmFzKVxuXHRcdFx0QHJlbmRlckxheWVyMyhjYW52YXMpXG5cdFx0XHRcblx0XHRcdEBcblx0XHRvblNob3c6ID0+XG5cdFx0XHRoYW5kbGVFcnJvciA9IC0+IGNvbnNvbGUuZXJyb3IgJ2Vycm9yIGxvYWRpbmcgZm9udCdcblx0XHRcdGRvY3VtZW50LmZvbnRzLmxvYWQoXCIxMHB4IGNhcmRob2xkZXItaWNvbnNcIikudGhlbiBAcmVuZGVyQ2FudmFzLCBoYW5kbGVFcnJvclxuXG5cdFx0dHJhbnNpdGlvbkNhbGxiYWNrIDogKGUpID0+XG5cdFx0XHRjb25zb2xlLmxvZyAndHJhbnNpdGlvbkNhbGxiYWNrJ1xuXHRcdFx0ZS52aWV3ID0gQFxuXHRcdFx0cHJvcGVydHlOYW1lID0gZS5vcmlnaW5hbEV2ZW50LnByb3BlcnR5TmFtZVxuXHRcdFx0aWYgZS50YXJnZXQgaXMgQCRlbC5maW5kKCcuY2FyZC1wZXJzcGVjdGl2ZS1pbm5lci13cmFwcGVyJylbMF0gYW5kIHByb3BlcnR5TmFtZS5zZWFyY2goJ3RyYW5zZm9ybScpID4gLTFcblx0XHRcdFx0aWYgQCRlbC5oYXNDbGFzcyAnaXMtZmxpcGluZydcblx0XHRcdFx0XHRAJGVsLnJlbW92ZUNsYXNzICdpcy1mbGlwaW5nJ1xuXHRcdFx0QHRyaWdnZXIgJ3RyYW5zaXRpb25lbmQnLCBlXG5cblxuXHRcdCMgYW5pbWF0ZWRSZW5kZXI6ID0+XG5cdFx0IyBcdGlmICFAJGVsLmhhc0NsYXNzICdmbGlwZWQnXG5cdFx0IyBcdFx0Y2FudmFzID0gQCRlbC5maW5kKCcuY2FyZC1jYW52YXMuYmFjaycpWzBdXG5cdFx0IyBcdGVsc2Vcblx0XHQjIFx0XHRjYW52YXMgPSBAJGVsLmZpbmQoJy5jYXJkLWNhbnZhcy5mcm9udCcpWzBdXG5cblx0XHQjIFx0Y2FudmFzLndpZHRoID0gQCRlbC53aWR0aCgpXG5cdFx0IyBcdGNhbnZhcy5oZWlnaHQgPSBAJGVsLmhlaWdodCgpXG5cblxuXHRcdCMgXHRAcmVuZGVyTGF5ZXIxKGNhbnZhcylcblx0XHQjIFx0IyBAcmVuZGVyTGF5ZXIyKGNhbnZhcylcblx0XHQjIFx0QHJlbmRlckxheWVyMyhjYW52YXMpXG5cblx0XHQjIFx0XHQjIGRlbGF5ID0gKHRyYW5zaXRpb25EICogKEBtb2RlbC5pZC0xKSkudG9GaXhlZCgpXG5cdFx0IyBcdFx0IyBjb25zb2xlLmxvZyB0cmFuc2l0aW9uRFxuXHRcdCMgXHRcdCMgc2V0VGltZW91dCBhZnRlckZsaXAsIHRyYW5zaXRpb25EXG5cdFx0XHRcblx0XHQjIFx0IyBhZnRlckZsaXAgPSAtPlxuXHRcdCMgXHQjIFx0QHRyaWdnZXIgJ2FmdGVyRmxpcCcgLCBcblx0XHQjIFx0XHQjIEAkZWwucmVtb3ZlQ2xhc3MgJ2lzLWZsaXBpbmcnXG5cdFx0IyBcdCMgY29uc29sZS5sb2cgKChAbW9kZWwuaWQtMSkgKiB0cmFuc2l0aW9uRCowLjIpLnRvRml4ZWQoKVxuXHRcdCMgXHQjIHNldFRpbWVvdXQgZmxpcCwgKChAbW9kZWwuaWQtMSkgKiAyMDApLnRvRml4ZWQoKVxuXHRcdFx0XHRcblx0XHQjIFx0c2V0VGltZW91dCBAZmxpcCwgMTAwMFxuXHRcdCMgXHRAXG5cdFx0XHRcblx0XHRmbGlwOiA9PlxuXHRcdFx0QHRyaWdnZXIgJ2ZsaXAnXG5cdFx0XHRAJGVsLnRvZ2dsZUNsYXNzICdmbGlwZWQnXG5cdFx0XHRAJGVsLmFkZENsYXNzICdpcy1mbGlwaW5nJ1xuXG5cdFx0cmVuZGVyTGF5ZXIxOiAoY2FudmFzKS0+XG5cdFx0XHRhcHAuQ2FyZEdlbmVyYXRvci5nZW5lcmF0b3JzLmdyYWRpZW50R2VuLmRyYXcgY2FudmFzLCBAbW9kZWxcblxuXHRcdHJlbmRlckxheWVyMjogKGNhbnZhcyktPlxuXHRcdFx0YXBwLkNhcmRHZW5lcmF0b3IuZ2VuZXJhdG9ycy5pY29uc0dlbi5kcmF3IGNhbnZhcywgQG1vZGVsXG5cblx0XHRyZW5kZXJMYXllcjM6IChjYW52YXMpLT5cblx0XHRcdGFwcC5DYXJkR2VuZXJhdG9yLmdlbmVyYXRvcnMudGV4dEdlbi5kcmF3IGNhbnZhcywgQG1vZGVsXG5cblx0XHRyZXNpemU6LT4gXG5cdFx0XHRAcmVuZGVyQ2FudmFzKClcblxuXHRcdG9uTG9ja0J1dHRvbkNsaWNrZWQ6IC0+XG5cdFx0XHRpZiBAbW9kZWwuZ2V0KCdsb2NrZWQnKSBpcyB0cnVlXG5cdFx0XHRcdEBtb2RlbC5zZXQgJ2xvY2tlZCcsIGZhbHNlLFxuXHRcdFx0XHRcdHNpbGVudDogdHJ1ZVxuXHRcdFx0XHRAJGVsLnJlbW92ZUNsYXNzKCdsb2NrZWQnKVxuXHRcdFx0XHQuZmluZCAnLmpzLWxvY2stY29uZmlnLWJ1dHRvbidcblx0XHRcdFx0LnRleHQgJ9CX0LDQutGA0LXQv9C40YLRjCcgXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBtb2RlbC5zZXQgJ2xvY2tlZCcsIHRydWUsXG5cdFx0XHRcdFx0c2lsZW50OiB0cnVlXG5cdFx0XHRcdEAkZWwuYWRkQ2xhc3MoJ2xvY2tlZCcpXG5cdFx0XHRcdC5maW5kICcuanMtbG9jay1jb25maWctYnV0dG9uJ1xuXHRcdFx0XHQudGV4dCAn0J7RgtC60YDQtdC/0LjRgtGMJyBcblxuXHRcdG9uTW91c2VFbnRlcjogLT5cblx0XHRcdGlmICFAbW9kZWwuaGFzKCdsb2NrZWQnKSBvciBAbW9kZWwuZ2V0KCdsb2NrZWQnKSBpc250IHRydWUgXG5cdFx0XHRcdGlmIEAkZWwuaGFzQ2xhc3MoJ2lzLWZsaXBpbmcnKVxuXHRcdFx0XHRcdEAkZWwudG9nZ2xlQ2xhc3MgJ2ZsaXBlZCdcblx0XHRcdFx0QCRlbC5wcmVwZW5kICc8ZGl2IGNsYXNzPVwianMtbG9jay1jb25maWctYnV0dG9uLXdyYXBwZXJcIj48YnV0dG9uIGNsYXNzPVwianMtbG9jay1jb25maWctYnV0dG9uXCI+0JfQsNC60YDQtdC/0LjRgtGMPC9idXR0b24+PC9kaXY+J1xuXHRcdG9uTW91c2VMZWF2ZTogLT5cblx0XHRcdGlmICFAbW9kZWwuaGFzKCdsb2NrZWQnKSBvciBAbW9kZWwuZ2V0KCdsb2NrZWQnKSBpc250IHRydWVcblx0XHRcdFx0QCRlbC5maW5kKCcuanMtbG9jay1jb25maWctYnV0dG9uLXdyYXBwZXInKS5yZW1vdmUoKVxuXG4iXX0=