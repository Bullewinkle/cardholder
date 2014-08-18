(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('CardGenerator.cards', function(Cards) {
    return Cards.CardView = (function(_super) {
      __extends(CardView, _super);

      function CardView() {
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
        return templatizer.cardsGenerator.card(this.model);
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
        this.renderLayer3(canvas);
        return this;
      };

      CardView.prototype.onShow = function() {
        return this.renderCanvas();
      };

      CardView.prototype.renderLayer1 = function(canvas) {
        return app.CardGenerator.generators.gradientGen.draw(canvas, this.model);
      };

      CardView.prototype.renderLayer2 = function(canvas) {
        return app.generators[this.model.attributes.plugin.name].draw(canvas, this.model.attributes.plugin.options);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzX2dlbmVyYXRvci9jYXJkcy9jYXJkLXZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxxQkFBWixFQUFtQyxTQUFDLEtBQUQsR0FBQTtXQUM1QixLQUFLLENBQUM7QUFDWCxpQ0FBQSxDQUFBOzs7Ozs7O09BQUE7O0FBQUEseUJBQUEsTUFBQSxHQUFRLEtBQVIsQ0FBQTs7QUFBQSx5QkFHQSxPQUFBLEdBQVMsSUFIVCxDQUFBOztBQUFBLHlCQUlBLFNBQUEsR0FBVyxNQUpYLENBQUE7O0FBQUEseUJBTUEsRUFBQSxHQUNDO0FBQUEsUUFBQSxXQUFBLEVBQWEsbUJBQWI7QUFBQSxRQUNBLFVBQUEsRUFBWSxvQkFEWjtPQVBELENBQUE7O0FBQUEseUJBVUEsUUFBQSxHQUFVLFNBQUEsR0FBQTtlQUNULFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBM0IsQ0FBZ0MsSUFBQyxDQUFBLEtBQWpDLEVBRFM7TUFBQSxDQVZWLENBQUE7O0FBQUEseUJBWUEsTUFBQSxHQUNDO0FBQUEsUUFBQSxZQUFBLEVBQWUsY0FBZjtBQUFBLFFBQ0EsWUFBQSxFQUFlLGNBRGY7QUFBQSxRQUVBLDhCQUFBLEVBQWdDLHFCQUZoQztBQUFBLFFBR0EsZUFBQSxFQUFpQixvQkFIakI7T0FiRCxDQUFBOztBQUFBLHlCQW1CQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBQ1gsUUFBQSxJQUFDLENBQUEsSUFBRCxDQUFNLEtBQU4sRUFBYyxDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTtBQUNiLFlBQUEsSUFBb0QsS0FBQyxDQUFBLE1BQUQsS0FBVyxJQUEvRDtxQkFBQSxPQUFPLENBQUMsR0FBUixDQUFZLHlCQUFaLEVBQXVDLFNBQXZDLEVBQUE7YUFEYTtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWQsQ0FBQSxDQUFB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QUEsWUFBQSxNQUFBLEVBQVEsSUFBUjtXQURELENBQUEsQ0FBQTtpQkFFQSxJQUFDLENBQUEsR0FBRyxDQUFDLFFBQUwsQ0FBYyxRQUFkLENBQ0EsQ0FBQyxJQURELENBQ00sd0JBRE4sQ0FFQSxDQUFDLElBRkQsQ0FFTSxXQUZOLEVBVEQ7U0FEb0I7TUFBQSxDQTFKckIsQ0FBQTs7QUFBQSx5QkF3S0EsWUFBQSxHQUFjLFNBQUEsR0FBQTtBQUNiLFFBQUEsSUFBRyxDQUFBLElBQUUsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLFFBQVgsQ0FBRCxJQUF5QixJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxRQUFYLENBQUEsS0FBMEIsSUFBdEQ7QUFDQyxVQUFBLElBQUcsSUFBQyxDQUFBLEdBQUcsQ0FBQyxRQUFMLENBQWMsWUFBZCxDQUFIO0FBQ0MsWUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLFdBQUwsQ0FBaUIsUUFBakIsQ0FBQSxDQUREO1dBQUE7aUJBRUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxPQUFMLENBQWEsMkdBQWIsRUFIRDtTQURhO01BQUEsQ0F4S2QsQ0FBQTs7QUFBQSx5QkE2S0EsWUFBQSxHQUFjLFNBQUEsR0FBQTtBQUNiLFFBQUEsSUFBRyxDQUFBLElBQUUsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLFFBQVgsQ0FBRCxJQUF5QixJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxRQUFYLENBQUEsS0FBMEIsSUFBdEQ7aUJBQ0MsSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLENBQVUsZ0NBQVYsQ0FBMkMsQ0FBQyxNQUE1QyxDQUFBLEVBREQ7U0FEYTtNQUFBLENBN0tkLENBQUE7O3NCQUFBOztPQUQ0QixVQUFVLENBQUMsVUFETjtFQUFBLENBQW5DLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRzX2dlbmVyYXRvci9jYXJkcy9jYXJkLXZpZXcuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJAYXBwLm1vZHVsZSAnQ2FyZEdlbmVyYXRvci5jYXJkcycsIChDYXJkcykgLT5cdFxuXHRjbGFzcyBDYXJkcy5DYXJkVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuSXRlbVZpZXdcblx0XHRsb2dnZXI6IG9mZlxuXG5cblx0XHR0YWdOYW1lOiAnbGknXG5cdFx0Y2xhc3NOYW1lOiAnY2FyZCdcblxuXHRcdHVpOlxuXHRcdFx0Y2FudmFzRnJvbnQ6ICcuY2FyZC1jYW52YXMuYmFjaydcblx0XHRcdGNhbnZhc0JhY2s6ICcuY2FyZC1jYW52YXMuZnJvbnQnXG5cblx0XHR0ZW1wbGF0ZTogPT5cblx0XHRcdHRlbXBsYXRpemVyLmNhcmRzR2VuZXJhdG9yLmNhcmQgQG1vZGVsXG5cdFx0ZXZlbnRzOlxuXHRcdFx0J21vdXNlZW50ZXInOiAgJ29uTW91c2VFbnRlcidcblx0XHRcdCdtb3VzZWxlYXZlJzogICdvbk1vdXNlTGVhdmUnXG5cdFx0XHQnY2xpY2sgLmpzLWxvY2stY29uZmlnLWJ1dHRvbic6ICdvbkxvY2tCdXR0b25DbGlja2VkJ1xuXHRcdFx0J3RyYW5zaXRpb25lbmQnOiAndHJhbnNpdGlvbkNhbGxiYWNrJ1xuXG5cdFx0IyBtb2RlbEV2ZW50czoge31cblx0XHRpbml0aWFsaXplOiAtPlxuXHRcdFx0QGJpbmQgJ2FsbCcsICA9PiBcblx0XHRcdFx0Y29uc29sZS5sb2cgXCJDQVJEIElURU0gVklFVzpcXHQgXFx0IFxcdFwiLCBhcmd1bWVudHMgaWYgQGxvZ2dlciBpcyBvblxuXG5cdFx0XHRAbW9kZWwudmlldyA9IEBcblx0XHRcdEBsaXN0ZW5UbyBAbW9kZWwsJ2NoYW5nZScsQHJlbmRlckNhbnZhc1xuXHRcdFx0QGxpc3RlblRvIGFwcCwncmVzaXplJywgQHJlc2l6ZVxuXG5cdFx0cmVuZGVyQ2FudmFzOiA9PlxuXHRcdFx0aWYgQCRlbC5oYXNDbGFzcyAnZmxpcGVkJ1xuXHRcdFx0XHQgY2FudmFzID0gQCRlbC5maW5kKCcuY2FyZC1jYW52YXMuYmFjaycpWzBdXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGNhbnZhcyA9IEAkZWwuZmluZCgnLmNhcmQtY2FudmFzLmZyb250JylbMF1cblxuXHRcdFx0Y2FudmFzLndpZHRoID0gQCRlbC53aWR0aCgpXG5cdFx0XHRjYW52YXMuaGVpZ2h0ID0gQCRlbC5oZWlnaHQoKVxuXHRcdFx0IyBAaW5pdENvbG9yU2NoZW1lKClcblxuXHRcdFx0IyBjb25zb2xlLmxvZyBAbW9kZWxcblx0XHRcdEByZW5kZXJMYXllcjEoY2FudmFzKVxuXHRcdFx0IyBAcmVuZGVyTGF5ZXIyKGNhbnZhcylcblx0XHRcdEByZW5kZXJMYXllcjMoY2FudmFzKVxuXHRcdFx0XG5cdFx0XHRAXG5cdFx0b25TaG93OiA9PlxuXHRcdFx0QHJlbmRlckNhbnZhcygpXG5cblx0XHQjIGluaXRDb2xvclNjaGVtZTogPT5cblx0XHQjIFx0c2NtID0gbmV3IENvbG9yU2NoZW1lKClcblx0XHQjIFx0aHVlID0gYXBwLmdldFJhbmRvbSgwLjIsIDM1OSwgMSlcblxuXHRcdCMgXHR2YXJpYXRpb25zID0gWydkZWZhdWx0JywgJ3Bhc3RlbCcsICdzb2Z0JywgJ2xpZ2h0JywgJ2hhcmQnLCAncGFsZScgXVxuXHRcdCMgXHR2YXJpYXRpb24gPSB2YXJpYXRpb25zWyBhcHAuZ2V0UmFuZG9tKDAsIHZhcmlhdGlvbnMubGVuZ3RoLTEpIF1cblx0XHQjIFx0Y29uc29sZS5sb2cgdmFyaWF0aW9uXG5cdFx0IyBcdHNjbS5mcm9tLWh1ZShodWUpXG5cdFx0IyBcdC5zY2hlbWUoJ3RldHJhZGUnKVxuXHRcdCMgXHQuZGlzdGFuY2UoMC4xKVxuXHRcdCMgXHQuYWRkLWNvbXBsZW1lbnQoZmFsc2UpXG5cdFx0IyBcdC52YXJpYXRpb24odmFyaWF0aW9uKVxuXHRcdCMgXHQud2ViLXNhZmUoZmFsc2UpXG5cdFx0IyBcdEBtb2RlbC5zZXQgJ2NvbG9yU2NoZW1lJywgc2NtLmNvbG9ycygpXG5cdFx0IyBcdGNvbnNvbGUubG9nIEBtb2RlbFxuXG5cdFx0IyB0cmFuc2l0aW9uQ2FsbGJhY2sgOiAoZSkgPT5cblx0XHQjIFx0ZS52aWV3ID0gQFxuXHRcdCMgXHRwcm9wZXJ0eU5hbWUgPSBlLm9yaWdpbmFsRXZlbnQucHJvcGVydHlOYW1lXG5cdFx0IyBcdGlmIGUudGFyZ2V0IGlzIEAkZWwuZmluZCgnLmNhcmQtcGVyc3BlY3RpdmUtaW5uZXItd3JhcHBlcicpWzBdIGFuZCBwcm9wZXJ0eU5hbWUuc2VhcmNoKCd0cmFuc2Zvcm0nKSA+IC0xXG5cdFx0IyBcdFx0aWYgQCRlbC5oYXNDbGFzcyAnaXMtZmxpcGluZydcblx0XHQjIFx0XHRcdEAkZWwucmVtb3ZlQ2xhc3MgJ2lzLWZsaXBpbmcnXG5cdFx0IyBcdEB0cmlnZ2VyICd0cmFuc2l0aW9uZW5kJywgZVxuXG5cblx0XHQjIGFuaW1hdGVkUmVuZGVyOiA9PlxuXHRcdCMgXHRpZiAhQCRlbC5oYXNDbGFzcyAnZmxpcGVkJ1xuXHRcdCMgXHRcdGNhbnZhcyA9IEAkZWwuZmluZCgnLmNhcmQtY2FudmFzLmJhY2snKVswXVxuXHRcdCMgXHRlbHNlXG5cdFx0IyBcdFx0Y2FudmFzID0gQCRlbC5maW5kKCcuY2FyZC1jYW52YXMuZnJvbnQnKVswXVxuXG5cdFx0IyBcdGNhbnZhcy53aWR0aCA9IEAkZWwud2lkdGgoKVxuXHRcdCMgXHRjYW52YXMuaGVpZ2h0ID0gQCRlbC5oZWlnaHQoKVxuXG5cblx0XHQjIFx0QHJlbmRlckxheWVyMShjYW52YXMpXG5cdFx0IyBcdCMgQHJlbmRlckxheWVyMihjYW52YXMpXG5cdFx0IyBcdEByZW5kZXJMYXllcjMoY2FudmFzKVxuXG5cdFx0IyBcdFx0IyBkZWxheSA9ICh0cmFuc2l0aW9uRCAqIChAbW9kZWwuaWQtMSkpLnRvRml4ZWQoKVxuXHRcdCMgXHRcdCMgY29uc29sZS5sb2cgdHJhbnNpdGlvbkRcblx0XHQjIFx0XHQjIHNldFRpbWVvdXQgYWZ0ZXJGbGlwLCB0cmFuc2l0aW9uRFxuXHRcdFx0XG5cdFx0IyBcdCMgYWZ0ZXJGbGlwID0gLT5cblx0XHQjIFx0IyBcdEB0cmlnZ2VyICdhZnRlckZsaXAnICwgXG5cdFx0IyBcdFx0IyBAJGVsLnJlbW92ZUNsYXNzICdpcy1mbGlwaW5nJ1xuXHRcdCMgXHQjIGNvbnNvbGUubG9nICgoQG1vZGVsLmlkLTEpICogdHJhbnNpdGlvbkQqMC4yKS50b0ZpeGVkKClcblx0XHQjIFx0IyBzZXRUaW1lb3V0IGZsaXAsICgoQG1vZGVsLmlkLTEpICogMjAwKS50b0ZpeGVkKClcblx0XHRcdFx0XG5cdFx0IyBcdHNldFRpbWVvdXQgQGZsaXAsIDEwMDBcblx0XHQjIFx0QFxuXHRcdFx0XG5cdFx0IyBmbGlwOiA9PlxuXHRcdCMgXHRAdHJpZ2dlciAnZmxpcCdcblx0XHQjIFx0QCRlbC50b2dnbGVDbGFzcyAnZmxpcGVkJ1xuXHRcdCMgXHRAJGVsLmFkZENsYXNzICdpcy1mbGlwaW5nJ1xuXHRcdCMgXHQjIGlmIEAkZWwuaGFzQ2xhc3MgJ2ZsaXBlZC05MC0wJ1xuXHRcdCMgXHQjIFx0QCRlbC5yZW1vdmVDbGFzcyAnZmxpcGVkLTkwLTAnXG5cdFx0IyBcdCMgXHRAJGVsLmFkZENsYXNzICdmbGlwZWQtMC05MCdcblxuXHRcdCMgXHQjIGVsc2UgaWYgQCRlbC5oYXNDbGFzcyAnZmxpcGVkLTkwLTE4MCdcblx0XHQjIFx0IyBcdEAkZWwucmVtb3ZlQ2xhc3MgJ2ZsaXBlZC05MC0xODAnXG5cdFx0IyBcdCMgXHRAJGVsLmFkZENsYXNzICdmbGlwZWQtMTgwLTkwJ1xuXHRcdCMgXHQjIGVsc2Vcblx0XHQjIFx0IyBcdEAkZWwuYWRkQ2xhc3MgJ2ZsaXBlZC0wLTkwJ1xuXG5cdFx0IyBcdCMgQCRlbC5hZGRDbGFzcyAnaXMtZmxpcGluZydcblx0XHQjIFx0c2V0VGltZW91dCAoKSA9PlxuXHRcdCMgXHRcdGNvbnNvbGUubG9nIGFuaW1hdGlvbkQsdHJhbnNpdGlvbkRcblx0XHQjIFx0XHRhbmltYXRpb25EID0gKCBwYXJzZUZsb2F0IEAkZWwuZmluZCgnLmNhcmQtcGVyc3BlY3RpdmUtaW5uZXItd3JhcHBlcicpLmNzcyAnYW5pbWF0aW9uLWR1cmF0aW9uJyApICogMTAwMFxuXHRcdCMgXHRcdGNhbnZhcyA9IEAkZWwuZmluZCgnLmNhcmQtY2FudmFzLmZyb250JylbMF1cblx0XHQjIFx0XHRjYW52YXMud2lkdGggPSBAJGVsLndpZHRoKClcblx0XHQjIFx0XHRjYW52YXMuaGVpZ2h0ID0gQCRlbC5oZWlnaHQoKVxuXHRcdCMgXHRcdEByZW5kZXJMYXllcjEoY2FudmFzKVxuXHRcdCMgXHRcdCMgQHJlbmRlckxheWVyMihjYW52YXMpXG5cdFx0IyBcdFx0QHJlbmRlckxheWVyMyhjYW52YXMpXG5cblx0XHQjIFx0XHRpZiBAJGVsLmhhc0NsYXNzICdmbGlwZWQtMC05MCdcblx0XHQjIFx0XHRcdEAkZWwucmVtb3ZlQ2xhc3MgJ2ZsaXBlZC0wLTkwJ1xuXHRcdCMgXHRcdFx0QCRlbC5hZGRDbGFzcyAnZmxpcGVkLTkwLTE4MCdcblxuXHRcdCMgXHRcdGVsc2UgaWYgQCRlbC5oYXNDbGFzcyAnZmxpcGVkLTE4MC05MCdcblx0XHQjIFx0XHRcdEAkZWwucmVtb3ZlQ2xhc3MgJ2ZsaXBlZC0xODAtOTAnXG5cdFx0IyBcdFx0XHRAJGVsLmFkZENsYXNzICdmbGlwZWQtOTAtMCdcblx0XHQjIFx0XHRlbHNlXG5cdFx0IyBcdFx0XHRAJGVsLmFkZENsYXNzICdmbGlwZWQtOTAtMTgwJ1xuXHRcdCMgXHRcdHNldFRpbWVvdXQgKCkgLT5cblx0XHQjIFx0XHRcdEAkZWwucmVtb3ZlQ2xhc3MgJ2lzLWZsaXBpbmcnXG5cdFx0IyBcdFx0LCBwYXJzZUZsb2F0KEAkZWwuZmluZCgnLmNhcmQtcGVyc3BlY3RpdmUtaW5uZXItd3JhcHBlcicpLmNzcyAnYW5pbWF0aW9uLWR1cmF0aW9uJykgKiAxMDAwelxuXHRcdCMgXHRcdCMgY29uc29sZS5sb2cgdHJhbnNpdGlvbkQvMlxuXHRcdCMgXHQsIHBhcnNlRmxvYXQoQCRlbC5maW5kKCcuY2FyZC1wZXJzcGVjdGl2ZS1pbm5lci13cmFwcGVyJykuY3NzICdhbmltYXRpb24tZHVyYXRpb24nKSAqIDEwMDBcblx0XHQjIFx0IyBmbGlwID0gKEAsY2FudmFzKSAtPlxuXHRcdCMgXHRcdCMgZGVsYXkgPSAodHJhbnNpdGlvbkQgKiAoQG1vZGVsLmlkLTEpKS50b0ZpeGVkKClcblx0XHQjIFx0XHQjIGNvbnNvbGUubG9nIHRyYW5zaXRpb25EXG5cdFx0IyBcdFx0IyBzZXRUaW1lb3V0IGFmdGVyRmxpcCwgdHJhbnNpdGlvbkRcblxuXHRcdHJlbmRlckxheWVyMTogKGNhbnZhcyktPlxuXHRcdFx0YXBwLkNhcmRHZW5lcmF0b3IuZ2VuZXJhdG9ycy5ncmFkaWVudEdlbi5kcmF3IGNhbnZhcywgQG1vZGVsXG5cblx0XHRyZW5kZXJMYXllcjI6IChjYW52YXMpLT5cblx0XHRcdGFwcC5nZW5lcmF0b3JzW0Btb2RlbC5hdHRyaWJ1dGVzLnBsdWdpbi5uYW1lXS5kcmF3IGNhbnZhcywgQG1vZGVsLmF0dHJpYnV0ZXMucGx1Z2luLm9wdGlvbnNcblxuXHRcdHJlbmRlckxheWVyMzogKGNhbnZhcyktPlxuXHRcdFx0YXBwLkNhcmRHZW5lcmF0b3IuZ2VuZXJhdG9ycy50ZXh0R2VuLmRyYXcgY2FudmFzLCBAbW9kZWxcblxuXHRcdHJlc2l6ZTotPiBcblx0XHRcdEByZW5kZXJDYW52YXMoKVxuXG5cdFx0b25Mb2NrQnV0dG9uQ2xpY2tlZDogLT5cblx0XHRcdGlmIEBtb2RlbC5nZXQoJ2xvY2tlZCcpIGlzIHRydWVcblx0XHRcdFx0QG1vZGVsLnNldCAnbG9ja2VkJywgZmFsc2UsXG5cdFx0XHRcdFx0c2lsZW50OiB0cnVlXG5cdFx0XHRcdEAkZWwucmVtb3ZlQ2xhc3MoJ2xvY2tlZCcpXG5cdFx0XHRcdC5maW5kICcuanMtbG9jay1jb25maWctYnV0dG9uJ1xuXHRcdFx0XHQudGV4dCAn0JfQsNC60YDQtdC/0LjRgtGMJyBcblx0XHRcdGVsc2Vcblx0XHRcdFx0QG1vZGVsLnNldCAnbG9ja2VkJywgdHJ1ZSxcblx0XHRcdFx0XHRzaWxlbnQ6IHRydWVcblx0XHRcdFx0QCRlbC5hZGRDbGFzcygnbG9ja2VkJylcblx0XHRcdFx0LmZpbmQgJy5qcy1sb2NrLWNvbmZpZy1idXR0b24nXG5cdFx0XHRcdC50ZXh0ICfQntGC0LrRgNC10L/QuNGC0YwnIFxuXG5cdFx0b25Nb3VzZUVudGVyOiAtPlxuXHRcdFx0aWYgIUBtb2RlbC5oYXMoJ2xvY2tlZCcpIG9yIEBtb2RlbC5nZXQoJ2xvY2tlZCcpIGlzbnQgdHJ1ZSBcblx0XHRcdFx0aWYgQCRlbC5oYXNDbGFzcygnaXMtZmxpcGluZycpXG5cdFx0XHRcdFx0QCRlbC50b2dnbGVDbGFzcyAnZmxpcGVkJ1xuXHRcdFx0XHRAJGVsLnByZXBlbmQgJzxkaXYgY2xhc3M9XCJqcy1sb2NrLWNvbmZpZy1idXR0b24td3JhcHBlclwiPjxidXR0b24gY2xhc3M9XCJqcy1sb2NrLWNvbmZpZy1idXR0b25cIj7Ql9Cw0LrRgNC10L/QuNGC0Yw8L2J1dHRvbj48L2Rpdj4nXG5cdFx0b25Nb3VzZUxlYXZlOiAtPlxuXHRcdFx0aWYgIUBtb2RlbC5oYXMoJ2xvY2tlZCcpIG9yIEBtb2RlbC5nZXQoJ2xvY2tlZCcpIGlzbnQgdHJ1ZVxuXHRcdFx0XHRAJGVsLmZpbmQoJy5qcy1sb2NrLWNvbmZpZy1idXR0b24td3JhcHBlcicpLnJlbW92ZSgpXG5cbiJdfQ==