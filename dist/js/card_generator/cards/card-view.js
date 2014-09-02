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
        return this.renderCanvas();
      };

      CardView.prototype.renderLayer1 = function(canvas) {
        return app.CardGenerator.generators.gradientGen.draw(canvas, this.model);
      };

      CardView.prototype.renderLayer2 = function(canvas) {
        return app.CardGenerator.generators.starsGen.draw(canvas, this.model);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZ2VuZXJhdG9yL2NhcmRzL2NhcmQtdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOzttU0FBQTs7QUFBQSxFQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxDQUFZLHFCQUFaLEVBQW1DLFNBQUMsS0FBRCxHQUFBO1dBQzVCLEtBQUssQ0FBQztBQUNYLGlDQUFBLENBQUE7Ozs7Ozs7T0FBQTs7QUFBQSx5QkFBQSxNQUFBLEdBQVEsS0FBUixDQUFBOztBQUFBLHlCQUdBLE9BQUEsR0FBUyxJQUhULENBQUE7O0FBQUEseUJBSUEsU0FBQSxHQUFXLE1BSlgsQ0FBQTs7QUFBQSx5QkFNQSxFQUFBLEdBQ0M7QUFBQSxRQUFBLFdBQUEsRUFBYSxtQkFBYjtBQUFBLFFBQ0EsVUFBQSxFQUFZLG9CQURaO09BUEQsQ0FBQTs7QUFBQSx5QkFVQSxRQUFBLEdBQVUsU0FBQSxHQUFBO2VBQ1QsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUExQixDQUErQixJQUFDLENBQUEsS0FBaEMsRUFEUztNQUFBLENBVlYsQ0FBQTs7QUFBQSx5QkFZQSxNQUFBLEdBQ0M7QUFBQSxRQUFBLFlBQUEsRUFBZSxjQUFmO0FBQUEsUUFDQSxZQUFBLEVBQWUsY0FEZjtBQUFBLFFBRUEsOEJBQUEsRUFBZ0MscUJBRmhDO0FBQUEsUUFHQSxlQUFBLEVBQWlCLG9CQUhqQjtPQWJELENBQUE7O0FBQUEseUJBbUJBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDWCxRQUFBLElBQUMsQ0FBQSxJQUFELENBQU0sS0FBTixFQUFjLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO0FBQ2IsWUFBQSxJQUFvRCxLQUFDLENBQUEsTUFBRCxLQUFXLElBQS9EO3FCQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVkseUJBQVosRUFBdUMsU0FBdkMsRUFBQTthQURhO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBZCxDQUFBLENBQUE7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V0FERCxDQUFBLENBQUE7aUJBRUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxRQUFMLENBQWMsUUFBZCxDQUNBLENBQUMsSUFERCxDQUNNLHdCQUROLENBRUEsQ0FBQyxJQUZELENBRU0sV0FGTixFQVREO1NBRG9CO01BQUEsQ0F4SXJCLENBQUE7O0FBQUEseUJBc0pBLFlBQUEsR0FBYyxTQUFBLEdBQUE7QUFDYixRQUFBLElBQUcsQ0FBQSxJQUFFLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxRQUFYLENBQUQsSUFBeUIsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsUUFBWCxDQUFBLEtBQTBCLElBQXREO0FBQ0MsVUFBQSxJQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsUUFBTCxDQUFjLFlBQWQsQ0FBSDtBQUNDLFlBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxXQUFMLENBQWlCLFFBQWpCLENBQUEsQ0FERDtXQUFBO2lCQUVBLElBQUMsQ0FBQSxHQUFHLENBQUMsT0FBTCxDQUFhLDJHQUFiLEVBSEQ7U0FEYTtNQUFBLENBdEpkLENBQUE7O0FBQUEseUJBMkpBLFlBQUEsR0FBYyxTQUFBLEdBQUE7QUFDYixRQUFBLElBQUcsQ0FBQSxJQUFFLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxRQUFYLENBQUQsSUFBeUIsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsUUFBWCxDQUFBLEtBQTBCLElBQXREO2lCQUNDLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBTCxDQUFVLGdDQUFWLENBQTJDLENBQUMsTUFBNUMsQ0FBQSxFQUREO1NBRGE7TUFBQSxDQTNKZCxDQUFBOztzQkFBQTs7T0FENEIsVUFBVSxDQUFDLFVBRE47RUFBQSxDQUFuQyxDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJjYXJkX2dlbmVyYXRvci9jYXJkcy9jYXJkLXZpZXcuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJAYXBwLm1vZHVsZSAnQ2FyZEdlbmVyYXRvci5jYXJkcycsIChDYXJkcykgLT5cdFxuXHRjbGFzcyBDYXJkcy5DYXJkVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuSXRlbVZpZXdcblx0XHRsb2dnZXI6IG9mZlxuXG5cblx0XHR0YWdOYW1lOiAnbGknXG5cdFx0Y2xhc3NOYW1lOiAnY2FyZCdcblxuXHRcdHVpOlxuXHRcdFx0Y2FudmFzRnJvbnQ6ICcuY2FyZC1jYW52YXMuYmFjaydcblx0XHRcdGNhbnZhc0JhY2s6ICcuY2FyZC1jYW52YXMuZnJvbnQnXG5cblx0XHR0ZW1wbGF0ZTogPT5cblx0XHRcdHRlbXBsYXRpemVyLmNhcmRHZW5lcmF0b3IuY2FyZCBAbW9kZWxcblx0XHRldmVudHM6XG5cdFx0XHQnbW91c2VlbnRlcic6ICAnb25Nb3VzZUVudGVyJ1xuXHRcdFx0J21vdXNlbGVhdmUnOiAgJ29uTW91c2VMZWF2ZSdcblx0XHRcdCdjbGljayAuanMtbG9jay1jb25maWctYnV0dG9uJzogJ29uTG9ja0J1dHRvbkNsaWNrZWQnXG5cdFx0XHQndHJhbnNpdGlvbmVuZCc6ICd0cmFuc2l0aW9uQ2FsbGJhY2snXG5cblx0XHQjIG1vZGVsRXZlbnRzOiB7fVxuXHRcdGluaXRpYWxpemU6IC0+XG5cdFx0XHRAYmluZCAnYWxsJywgID0+IFxuXHRcdFx0XHRjb25zb2xlLmxvZyBcIkNBUkQgSVRFTSBWSUVXOlxcdCBcXHQgXFx0XCIsIGFyZ3VtZW50cyBpZiBAbG9nZ2VyIGlzIG9uXG5cblx0XHRcdEBtb2RlbC52aWV3ID0gQFxuXHRcdFx0QGxpc3RlblRvIEBtb2RlbCwnY2hhbmdlJyxAcmVuZGVyQ2FudmFzXG5cdFx0XHRAbGlzdGVuVG8gYXBwLCdyZXNpemUnLCBAcmVzaXplXG5cblx0XHRyZW5kZXJDYW52YXM6ID0+XG5cdFx0XHRpZiBAJGVsLmhhc0NsYXNzICdmbGlwZWQnXG5cdFx0XHRcdCBjYW52YXMgPSBAJGVsLmZpbmQoJy5jYXJkLWNhbnZhcy5iYWNrJylbMF1cblx0XHRcdGVsc2Vcblx0XHRcdFx0Y2FudmFzID0gQCRlbC5maW5kKCcuY2FyZC1jYW52YXMuZnJvbnQnKVswXVxuXG5cdFx0XHRjYW52YXMud2lkdGggPSBAJGVsLndpZHRoKClcblx0XHRcdGNhbnZhcy5oZWlnaHQgPSBAJGVsLmhlaWdodCgpXG5cblx0XHRcdEByZW5kZXJMYXllcjEoY2FudmFzKVxuXHRcdFx0QHJlbmRlckxheWVyMihjYW52YXMpXG5cdFx0XHRAcmVuZGVyTGF5ZXIzKGNhbnZhcylcblx0XHRcdFxuXHRcdFx0QFxuXHRcdG9uU2hvdzogPT5cblx0XHRcdEByZW5kZXJDYW52YXMoKVxuXG5cdFx0IyB0cmFuc2l0aW9uQ2FsbGJhY2sgOiAoZSkgPT5cblx0XHQjIFx0ZS52aWV3ID0gQFxuXHRcdCMgXHRwcm9wZXJ0eU5hbWUgPSBlLm9yaWdpbmFsRXZlbnQucHJvcGVydHlOYW1lXG5cdFx0IyBcdGlmIGUudGFyZ2V0IGlzIEAkZWwuZmluZCgnLmNhcmQtcGVyc3BlY3RpdmUtaW5uZXItd3JhcHBlcicpWzBdIGFuZCBwcm9wZXJ0eU5hbWUuc2VhcmNoKCd0cmFuc2Zvcm0nKSA+IC0xXG5cdFx0IyBcdFx0aWYgQCRlbC5oYXNDbGFzcyAnaXMtZmxpcGluZydcblx0XHQjIFx0XHRcdEAkZWwucmVtb3ZlQ2xhc3MgJ2lzLWZsaXBpbmcnXG5cdFx0IyBcdEB0cmlnZ2VyICd0cmFuc2l0aW9uZW5kJywgZVxuXG5cblx0XHQjIGFuaW1hdGVkUmVuZGVyOiA9PlxuXHRcdCMgXHRpZiAhQCRlbC5oYXNDbGFzcyAnZmxpcGVkJ1xuXHRcdCMgXHRcdGNhbnZhcyA9IEAkZWwuZmluZCgnLmNhcmQtY2FudmFzLmJhY2snKVswXVxuXHRcdCMgXHRlbHNlXG5cdFx0IyBcdFx0Y2FudmFzID0gQCRlbC5maW5kKCcuY2FyZC1jYW52YXMuZnJvbnQnKVswXVxuXG5cdFx0IyBcdGNhbnZhcy53aWR0aCA9IEAkZWwud2lkdGgoKVxuXHRcdCMgXHRjYW52YXMuaGVpZ2h0ID0gQCRlbC5oZWlnaHQoKVxuXG5cblx0XHQjIFx0QHJlbmRlckxheWVyMShjYW52YXMpXG5cdFx0IyBcdCMgQHJlbmRlckxheWVyMihjYW52YXMpXG5cdFx0IyBcdEByZW5kZXJMYXllcjMoY2FudmFzKVxuXG5cdFx0IyBcdFx0IyBkZWxheSA9ICh0cmFuc2l0aW9uRCAqIChAbW9kZWwuaWQtMSkpLnRvRml4ZWQoKVxuXHRcdCMgXHRcdCMgY29uc29sZS5sb2cgdHJhbnNpdGlvbkRcblx0XHQjIFx0XHQjIHNldFRpbWVvdXQgYWZ0ZXJGbGlwLCB0cmFuc2l0aW9uRFxuXHRcdFx0XG5cdFx0IyBcdCMgYWZ0ZXJGbGlwID0gLT5cblx0XHQjIFx0IyBcdEB0cmlnZ2VyICdhZnRlckZsaXAnICwgXG5cdFx0IyBcdFx0IyBAJGVsLnJlbW92ZUNsYXNzICdpcy1mbGlwaW5nJ1xuXHRcdCMgXHQjIGNvbnNvbGUubG9nICgoQG1vZGVsLmlkLTEpICogdHJhbnNpdGlvbkQqMC4yKS50b0ZpeGVkKClcblx0XHQjIFx0IyBzZXRUaW1lb3V0IGZsaXAsICgoQG1vZGVsLmlkLTEpICogMjAwKS50b0ZpeGVkKClcblx0XHRcdFx0XG5cdFx0IyBcdHNldFRpbWVvdXQgQGZsaXAsIDEwMDBcblx0XHQjIFx0QFxuXHRcdFx0XG5cdFx0IyBmbGlwOiA9PlxuXHRcdCMgXHRAdHJpZ2dlciAnZmxpcCdcblx0XHQjIFx0QCRlbC50b2dnbGVDbGFzcyAnZmxpcGVkJ1xuXHRcdCMgXHRAJGVsLmFkZENsYXNzICdpcy1mbGlwaW5nJ1xuXHRcdCMgXHQjIGlmIEAkZWwuaGFzQ2xhc3MgJ2ZsaXBlZC05MC0wJ1xuXHRcdCMgXHQjIFx0QCRlbC5yZW1vdmVDbGFzcyAnZmxpcGVkLTkwLTAnXG5cdFx0IyBcdCMgXHRAJGVsLmFkZENsYXNzICdmbGlwZWQtMC05MCdcblxuXHRcdCMgXHQjIGVsc2UgaWYgQCRlbC5oYXNDbGFzcyAnZmxpcGVkLTkwLTE4MCdcblx0XHQjIFx0IyBcdEAkZWwucmVtb3ZlQ2xhc3MgJ2ZsaXBlZC05MC0xODAnXG5cdFx0IyBcdCMgXHRAJGVsLmFkZENsYXNzICdmbGlwZWQtMTgwLTkwJ1xuXHRcdCMgXHQjIGVsc2Vcblx0XHQjIFx0IyBcdEAkZWwuYWRkQ2xhc3MgJ2ZsaXBlZC0wLTkwJ1xuXG5cdFx0IyBcdCMgQCRlbC5hZGRDbGFzcyAnaXMtZmxpcGluZydcblx0XHQjIFx0c2V0VGltZW91dCAoKSA9PlxuXHRcdCMgXHRcdGNvbnNvbGUubG9nIGFuaW1hdGlvbkQsdHJhbnNpdGlvbkRcblx0XHQjIFx0XHRhbmltYXRpb25EID0gKCBwYXJzZUZsb2F0IEAkZWwuZmluZCgnLmNhcmQtcGVyc3BlY3RpdmUtaW5uZXItd3JhcHBlcicpLmNzcyAnYW5pbWF0aW9uLWR1cmF0aW9uJyApICogMTAwMFxuXHRcdCMgXHRcdGNhbnZhcyA9IEAkZWwuZmluZCgnLmNhcmQtY2FudmFzLmZyb250JylbMF1cblx0XHQjIFx0XHRjYW52YXMud2lkdGggPSBAJGVsLndpZHRoKClcblx0XHQjIFx0XHRjYW52YXMuaGVpZ2h0ID0gQCRlbC5oZWlnaHQoKVxuXHRcdCMgXHRcdEByZW5kZXJMYXllcjEoY2FudmFzKVxuXHRcdCMgXHRcdCMgQHJlbmRlckxheWVyMihjYW52YXMpXG5cdFx0IyBcdFx0QHJlbmRlckxheWVyMyhjYW52YXMpXG5cblx0XHQjIFx0XHRpZiBAJGVsLmhhc0NsYXNzICdmbGlwZWQtMC05MCdcblx0XHQjIFx0XHRcdEAkZWwucmVtb3ZlQ2xhc3MgJ2ZsaXBlZC0wLTkwJ1xuXHRcdCMgXHRcdFx0QCRlbC5hZGRDbGFzcyAnZmxpcGVkLTkwLTE4MCdcblxuXHRcdCMgXHRcdGVsc2UgaWYgQCRlbC5oYXNDbGFzcyAnZmxpcGVkLTE4MC05MCdcblx0XHQjIFx0XHRcdEAkZWwucmVtb3ZlQ2xhc3MgJ2ZsaXBlZC0xODAtOTAnXG5cdFx0IyBcdFx0XHRAJGVsLmFkZENsYXNzICdmbGlwZWQtOTAtMCdcblx0XHQjIFx0XHRlbHNlXG5cdFx0IyBcdFx0XHRAJGVsLmFkZENsYXNzICdmbGlwZWQtOTAtMTgwJ1xuXHRcdCMgXHRcdHNldFRpbWVvdXQgKCkgLT5cblx0XHQjIFx0XHRcdEAkZWwucmVtb3ZlQ2xhc3MgJ2lzLWZsaXBpbmcnXG5cdFx0IyBcdFx0LCBwYXJzZUZsb2F0KEAkZWwuZmluZCgnLmNhcmQtcGVyc3BlY3RpdmUtaW5uZXItd3JhcHBlcicpLmNzcyAnYW5pbWF0aW9uLWR1cmF0aW9uJykgKiAxMDAwelxuXHRcdCMgXHRcdCMgY29uc29sZS5sb2cgdHJhbnNpdGlvbkQvMlxuXHRcdCMgXHQsIHBhcnNlRmxvYXQoQCRlbC5maW5kKCcuY2FyZC1wZXJzcGVjdGl2ZS1pbm5lci13cmFwcGVyJykuY3NzICdhbmltYXRpb24tZHVyYXRpb24nKSAqIDEwMDBcblx0XHQjIFx0IyBmbGlwID0gKEAsY2FudmFzKSAtPlxuXHRcdCMgXHRcdCMgZGVsYXkgPSAodHJhbnNpdGlvbkQgKiAoQG1vZGVsLmlkLTEpKS50b0ZpeGVkKClcblx0XHQjIFx0XHQjIGNvbnNvbGUubG9nIHRyYW5zaXRpb25EXG5cdFx0IyBcdFx0IyBzZXRUaW1lb3V0IGFmdGVyRmxpcCwgdHJhbnNpdGlvbkRcblxuXHRcdHJlbmRlckxheWVyMTogKGNhbnZhcyktPlxuXHRcdFx0YXBwLkNhcmRHZW5lcmF0b3IuZ2VuZXJhdG9ycy5ncmFkaWVudEdlbi5kcmF3IGNhbnZhcywgQG1vZGVsXG5cblx0XHRyZW5kZXJMYXllcjI6IChjYW52YXMpLT5cblx0XHRcdGFwcC5DYXJkR2VuZXJhdG9yLmdlbmVyYXRvcnMuc3RhcnNHZW4uZHJhdyBjYW52YXMsIEBtb2RlbFxuXG5cdFx0cmVuZGVyTGF5ZXIzOiAoY2FudmFzKS0+XG5cdFx0XHRhcHAuQ2FyZEdlbmVyYXRvci5nZW5lcmF0b3JzLnRleHRHZW4uZHJhdyBjYW52YXMsIEBtb2RlbFxuXG5cdFx0cmVzaXplOi0+IFxuXHRcdFx0QHJlbmRlckNhbnZhcygpXG5cblx0XHRvbkxvY2tCdXR0b25DbGlja2VkOiAtPlxuXHRcdFx0aWYgQG1vZGVsLmdldCgnbG9ja2VkJykgaXMgdHJ1ZVxuXHRcdFx0XHRAbW9kZWwuc2V0ICdsb2NrZWQnLCBmYWxzZSxcblx0XHRcdFx0XHRzaWxlbnQ6IHRydWVcblx0XHRcdFx0QCRlbC5yZW1vdmVDbGFzcygnbG9ja2VkJylcblx0XHRcdFx0LmZpbmQgJy5qcy1sb2NrLWNvbmZpZy1idXR0b24nXG5cdFx0XHRcdC50ZXh0ICfQl9Cw0LrRgNC10L/QuNGC0YwnIFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAbW9kZWwuc2V0ICdsb2NrZWQnLCB0cnVlLFxuXHRcdFx0XHRcdHNpbGVudDogdHJ1ZVxuXHRcdFx0XHRAJGVsLmFkZENsYXNzKCdsb2NrZWQnKVxuXHRcdFx0XHQuZmluZCAnLmpzLWxvY2stY29uZmlnLWJ1dHRvbidcblx0XHRcdFx0LnRleHQgJ9Ce0YLQutGA0LXQv9C40YLRjCcgXG5cblx0XHRvbk1vdXNlRW50ZXI6IC0+XG5cdFx0XHRpZiAhQG1vZGVsLmhhcygnbG9ja2VkJykgb3IgQG1vZGVsLmdldCgnbG9ja2VkJykgaXNudCB0cnVlIFxuXHRcdFx0XHRpZiBAJGVsLmhhc0NsYXNzKCdpcy1mbGlwaW5nJylcblx0XHRcdFx0XHRAJGVsLnRvZ2dsZUNsYXNzICdmbGlwZWQnXG5cdFx0XHRcdEAkZWwucHJlcGVuZCAnPGRpdiBjbGFzcz1cImpzLWxvY2stY29uZmlnLWJ1dHRvbi13cmFwcGVyXCI+PGJ1dHRvbiBjbGFzcz1cImpzLWxvY2stY29uZmlnLWJ1dHRvblwiPtCX0LDQutGA0LXQv9C40YLRjDwvYnV0dG9uPjwvZGl2Pidcblx0XHRvbk1vdXNlTGVhdmU6IC0+XG5cdFx0XHRpZiAhQG1vZGVsLmhhcygnbG9ja2VkJykgb3IgQG1vZGVsLmdldCgnbG9ja2VkJykgaXNudCB0cnVlXG5cdFx0XHRcdEAkZWwuZmluZCgnLmpzLWxvY2stY29uZmlnLWJ1dHRvbi13cmFwcGVyJykucmVtb3ZlKClcblxuIl19