(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('CardGenerator.views', function(Views) {
    return Views.CardView = (function(_super) {
      __extends(CardView, _super);

      function CardView() {
        this.flip = __bind(this.flip, this);
        this.animatedRender = __bind(this.animatedRender, this);
        this.render = __bind(this.render, this);
        this.transitionCallback = __bind(this.transitionCallback, this);
        return CardView.__super__.constructor.apply(this, arguments);
      }

      CardView.prototype.loger = false;

      CardView.prototype.tagName = 'li';

      CardView.prototype.className = 'card';

      CardView.prototype.events = {
        'mouseenter': 'mouseenter',
        'mouseleave': 'mouseleave',
        'click .js_lock_config_button': 'locker',
        'transitionend': 'transitionCallback'
      };

      CardView.prototype.initialize = function() {
        this.listenTo(app, 'start', this.start);
        this.model.view = this;
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(app, 'resize', this.resizer);
        return this.bind('all', (function(_this) {
          return function(trigger, args) {
            if (_this.loger === true) {
              return console.log(trigger, args);
            }
          };
        })(this));
      };

      CardView.prototype.transitionCallback = function(e) {
        var propertyName;
        e.view = this;
        propertyName = e.originalEvent.propertyName;
        if (e.target === this.$el.find('.card_perspective_inner_wrapper')[0] && propertyName.search('transform') > -1) {
          if (this.$el.hasClass('is_fliping')) {
            this.$el.removeClass('is_fliping');
          }
        }
        return this.trigger('transitionend', e);
      };

      CardView.prototype.render = function() {
        var canvas;
        if (this.$el.hasClass('fliped')) {
          canvas = this.$el.find('.card_canvas.back')[0];
        } else {
          canvas = this.$el.find('.card_canvas.front')[0];
        }
        canvas.width = this.$el.width();
        canvas.height = this.$el.height();
        this.renderLayer1(canvas);
        this.renderLayer3(canvas);
        return this;
      };

      CardView.prototype.animatedRender = function() {
        var canvas;
        if (!this.$el.hasClass('fliped')) {
          canvas = this.$el.find('.card_canvas.back')[0];
        } else {
          canvas = this.$el.find('.card_canvas.front')[0];
        }
        canvas.width = this.$el.width();
        canvas.height = this.$el.height();
        this.renderLayer1(canvas);
        this.renderLayer3(canvas);
        setTimeout(this.flip, 1000);
        return this;
      };

      CardView.prototype.flip = function() {
        this.trigger('flip');
        this.$el.toggleClass('fliped');
        return this.$el.addClass('is_fliping');
      };

      CardView.prototype.renderLayer1 = function(canvas) {
        return app.generators.gradientGen.draw(canvas, this.model);
      };

      CardView.prototype.renderLayer2 = function(canvas) {
        return app.generators[this.model.attributes.plugin.name].draw(canvas, this.model.attributes.plugin.options);
      };

      CardView.prototype.renderLayer3 = function(canvas) {
        return app.generators.textGen.draw(canvas, this.model);
      };

      CardView.prototype.resizer = function() {
        return this.render();
      };

      CardView.prototype.locker = function() {
        if (this.model.get('locked') === true) {
          this.model.set('locked', false, {
            silent: true
          });
          return this.$el.removeClass('locked').find('.js_lock_config_button').text('Закрепить');
        } else {
          this.model.set('locked', true, {
            silent: true
          });
          return this.$el.addClass('locked').find('.js_lock_config_button').text('Открепить');
        }
      };

      CardView.prototype.mouseenter = function() {
        if (!this.model.has('locked') || this.model.get('locked') !== true) {
          if (this.$el.hasClass('is_fliping')) {
            this.$el.toggleClass('fliped');
          }
          return this.$el.prepend('<div class="js_lock_config_button_wrapper"><button class="js_lock_config_button">Закрепить</button></div>');
        }
      };

      CardView.prototype.mouseleave = function() {
        if (!this.model.has('locked') || this.model.get('locked') !== true) {
          return this.$el.find('.js_lock_config_button_wrapper').remove();
        }
      };

      return CardView;

    })(Backbone.View);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzX2dlbmVyYXRvci92aWV3cy9jYXJkLXZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxxQkFBWixFQUFtQyxTQUFDLEtBQUQsR0FBQTtXQUM1QixLQUFLLENBQUM7QUFDWCxpQ0FBQSxDQUFBOzs7Ozs7OztPQUFBOztBQUFBLHlCQUFBLEtBQUEsR0FBTyxLQUFQLENBQUE7O0FBQUEseUJBRUEsT0FBQSxHQUFTLElBRlQsQ0FBQTs7QUFBQSx5QkFHQSxTQUFBLEdBQVcsTUFIWCxDQUFBOztBQUFBLHlCQUlBLE1BQUEsR0FDQztBQUFBLFFBQUEsWUFBQSxFQUFlLFlBQWY7QUFBQSxRQUNBLFlBQUEsRUFBZSxZQURmO0FBQUEsUUFFQSw4QkFBQSxFQUFnQyxRQUZoQztBQUFBLFFBR0EsZUFBQSxFQUFpQixvQkFIakI7T0FMRCxDQUFBOztBQUFBLHlCQVdBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDWCxRQUFBLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLE9BQWYsRUFBd0IsSUFBQyxDQUFBLEtBQXpCLENBQUEsQ0FBQTtBQUFBLFFBQ0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFQLEdBQWMsSUFEZCxDQUFBO0FBQUEsUUFFQSxJQUFDLENBQUEsUUFBRCxDQUFVLElBQUMsQ0FBQSxLQUFYLEVBQWlCLFFBQWpCLEVBQTBCLElBQUMsQ0FBQSxNQUEzQixDQUZBLENBQUE7QUFBQSxRQUdBLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFjLFFBQWQsRUFBd0IsSUFBQyxDQUFBLE9BQXpCLENBSEEsQ0FBQTtlQUtBLElBQUMsQ0FBQSxJQUFELENBQU0sS0FBTixFQUFhLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQyxPQUFELEVBQVUsSUFBVixHQUFBO0FBQ1osWUFBQSxJQUFHLEtBQUMsQ0FBQSxLQUFELEtB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O01BQUEsQ0F2S1osQ0FBQTs7c0JBQUE7O09BRDRCLFFBQVEsQ0FBQyxNQURKO0VBQUEsQ0FBbkMsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZHNfZ2VuZXJhdG9yL3ZpZXdzL2NhcmQtdmlldy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkBhcHAubW9kdWxlICdDYXJkR2VuZXJhdG9yLnZpZXdzJywgKFZpZXdzKSAtPlxuXHRjbGFzcyBWaWV3cy5DYXJkVmlldyBleHRlbmRzIEJhY2tib25lLlZpZXdcblx0XHRsb2dlcjogb2ZmXG5cdFx0XG5cdFx0dGFnTmFtZTogJ2xpJ1xuXHRcdGNsYXNzTmFtZTogJ2NhcmQnXG5cdFx0ZXZlbnRzOlxuXHRcdFx0J21vdXNlZW50ZXInOiAgJ21vdXNlZW50ZXInXG5cdFx0XHQnbW91c2VsZWF2ZSc6ICAnbW91c2VsZWF2ZSdcblx0XHRcdCdjbGljayAuanNfbG9ja19jb25maWdfYnV0dG9uJzogJ2xvY2tlcidcblx0XHRcdCd0cmFuc2l0aW9uZW5kJzogJ3RyYW5zaXRpb25DYWxsYmFjaydcblx0XHRcdCMgJ3Jlc2l6ZSc6ICdyZXNpemVyJ1xuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdEBsaXN0ZW5UbyBhcHAsICdzdGFydCcsIEBzdGFydFxuXHRcdFx0QG1vZGVsLnZpZXcgPSBAXG5cdFx0XHRAbGlzdGVuVG8gQG1vZGVsLCdjaGFuZ2UnLEByZW5kZXJcblx0XHRcdEBsaXN0ZW5UbyBhcHAsJ3Jlc2l6ZScsIEByZXNpemVyXG5cblx0XHRcdEBiaW5kICdhbGwnLCAodHJpZ2dlciwgYXJncykgPT4gXG5cdFx0XHRcdGlmIEBsb2dlciBpcyBvblxuXHRcdFx0XHRcdGNvbnNvbGUubG9nIHRyaWdnZXIsIGFyZ3NcblxuXHRcdCMgaW5pdENvbG9yU2NoZW1lOiA9PlxuXHRcdCMgXHRzY20gPSBuZXcgQ29sb3JTY2hlbWUoKVxuXHRcdCMgXHRodWUgPSBhcHAuZ2V0UmFuZG9tKDAuMiwgMzU5LCAxKVxuXG5cdFx0IyBcdHZhcmlhdGlvbnMgPSBbJ2RlZmF1bHQnLCAncGFzdGVsJywgJ3NvZnQnLCAnbGlnaHQnLCAnaGFyZCcsICdwYWxlJyBdXG5cdFx0IyBcdHZhcmlhdGlvbiA9IHZhcmlhdGlvbnNbIGFwcC5nZXRSYW5kb20oMCwgdmFyaWF0aW9ucy5sZW5ndGgtMSkgXVxuXHRcdCMgXHRjb25zb2xlLmxvZyB2YXJpYXRpb25cblx0XHQjIFx0c2NtLmZyb21faHVlKGh1ZSlcblx0XHQjIFx0LnNjaGVtZSgndGV0cmFkZScpXG5cdFx0IyBcdC5kaXN0YW5jZSgwLjEpXG5cdFx0IyBcdC5hZGRfY29tcGxlbWVudChmYWxzZSlcblx0XHQjIFx0LnZhcmlhdGlvbih2YXJpYXRpb24pXG5cdFx0IyBcdC53ZWJfc2FmZShmYWxzZSlcblx0XHQjIFx0QG1vZGVsLnNldCAnY29sb3JTY2hlbWUnLCBzY20uY29sb3JzKClcblx0XHQjIFx0Y29uc29sZS5sb2cgQG1vZGVsXG5cblx0XHR0cmFuc2l0aW9uQ2FsbGJhY2sgOiAoZSkgPT5cblx0XHRcdGUudmlldyA9IEBcblx0XHRcdHByb3BlcnR5TmFtZSA9IGUub3JpZ2luYWxFdmVudC5wcm9wZXJ0eU5hbWVcblx0XHRcdGlmIGUudGFyZ2V0IGlzIEAkZWwuZmluZCgnLmNhcmRfcGVyc3BlY3RpdmVfaW5uZXJfd3JhcHBlcicpWzBdIGFuZCBwcm9wZXJ0eU5hbWUuc2VhcmNoKCd0cmFuc2Zvcm0nKSA+IC0xXG5cdFx0XHRcdGlmIEAkZWwuaGFzQ2xhc3MgJ2lzX2ZsaXBpbmcnXG5cdFx0XHRcdFx0QCRlbC5yZW1vdmVDbGFzcyAnaXNfZmxpcGluZydcblx0XHRcdEB0cmlnZ2VyICd0cmFuc2l0aW9uZW5kJywgZVxuXG5cblx0XHRyZW5kZXI6ID0+XG5cdFx0XHRpZiBAJGVsLmhhc0NsYXNzICdmbGlwZWQnXG5cdFx0XHRcdGNhbnZhcyA9IEAkZWwuZmluZCgnLmNhcmRfY2FudmFzLmJhY2snKVswXVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRjYW52YXMgPSBAJGVsLmZpbmQoJy5jYXJkX2NhbnZhcy5mcm9udCcpWzBdXG5cblx0XHRcdGNhbnZhcy53aWR0aCA9IEAkZWwud2lkdGgoKVxuXHRcdFx0Y2FudmFzLmhlaWdodCA9IEAkZWwuaGVpZ2h0KClcblx0XHRcdCMgQGluaXRDb2xvclNjaGVtZSgpXG5cblx0XHRcdCMgY29uc29sZS5sb2cgQG1vZGVsXG5cdFx0XHRAcmVuZGVyTGF5ZXIxKGNhbnZhcylcblx0XHRcdCMgQHJlbmRlckxheWVyMihjYW52YXMpXG5cdFx0XHRAcmVuZGVyTGF5ZXIzKGNhbnZhcylcblx0XHRcdEBcblx0XHRcblx0XHRhbmltYXRlZFJlbmRlcjogPT5cblx0XHRcdGlmICFAJGVsLmhhc0NsYXNzICdmbGlwZWQnXG5cdFx0XHRcdGNhbnZhcyA9IEAkZWwuZmluZCgnLmNhcmRfY2FudmFzLmJhY2snKVswXVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRjYW52YXMgPSBAJGVsLmZpbmQoJy5jYXJkX2NhbnZhcy5mcm9udCcpWzBdXG5cblx0XHRcdGNhbnZhcy53aWR0aCA9IEAkZWwud2lkdGgoKVxuXHRcdFx0Y2FudmFzLmhlaWdodCA9IEAkZWwuaGVpZ2h0KClcblxuXG5cdFx0XHRAcmVuZGVyTGF5ZXIxKGNhbnZhcylcblx0XHRcdCMgQHJlbmRlckxheWVyMihjYW52YXMpXG5cdFx0XHRAcmVuZGVyTGF5ZXIzKGNhbnZhcylcblxuXHRcdFx0XHQjIGRlbGF5ID0gKHRyYW5zaXRpb25EICogKEBtb2RlbC5pZC0xKSkudG9GaXhlZCgpXG5cdFx0XHRcdCMgY29uc29sZS5sb2cgdHJhbnNpdGlvbkRcblx0XHRcdFx0IyBzZXRUaW1lb3V0IGFmdGVyRmxpcCwgdHJhbnNpdGlvbkRcblx0XHRcdFxuXHRcdFx0IyBhZnRlckZsaXAgPSAtPlxuXHRcdFx0IyBcdEB0cmlnZ2VyICdhZnRlckZsaXAnICwgXG5cdFx0XHRcdCMgQCRlbC5yZW1vdmVDbGFzcyAnaXNfZmxpcGluZydcblx0XHRcdCMgY29uc29sZS5sb2cgKChAbW9kZWwuaWQtMSkgKiB0cmFuc2l0aW9uRCowLjIpLnRvRml4ZWQoKVxuXHRcdFx0IyBzZXRUaW1lb3V0IGZsaXAsICgoQG1vZGVsLmlkLTEpICogMjAwKS50b0ZpeGVkKClcblx0XHRcdFx0XG5cdFx0XHRzZXRUaW1lb3V0IEBmbGlwLCAxMDAwXG5cdFx0XHRAXG5cdFx0XHRcblx0XHRmbGlwOiA9PlxuXHRcdFx0QHRyaWdnZXIgJ2ZsaXAnXG5cdFx0XHRAJGVsLnRvZ2dsZUNsYXNzICdmbGlwZWQnXG5cdFx0XHRAJGVsLmFkZENsYXNzICdpc19mbGlwaW5nJ1xuXG5cdFx0XHQjIEB0cmlnZ2VyICdmbGlwJ1xuXHRcdFx0IyBAJGVsLmFkZENsYXNzICdpc19mbGlwaW5nJ1xuXHRcdFx0IyBpZiBAJGVsLmhhc0NsYXNzICdmbGlwZWRfOTAtMCdcblx0XHRcdCMgXHRAJGVsLnJlbW92ZUNsYXNzICdmbGlwZWRfOTAtMCdcblx0XHRcdCMgXHRAJGVsLmFkZENsYXNzICdmbGlwZWRfMC05MCdcblxuXHRcdFx0IyBlbHNlIGlmIEAkZWwuaGFzQ2xhc3MgJ2ZsaXBlZF85MC0xODAnXG5cdFx0XHQjIFx0QCRlbC5yZW1vdmVDbGFzcyAnZmxpcGVkXzkwLTE4MCdcblx0XHRcdCMgXHRAJGVsLmFkZENsYXNzICdmbGlwZWRfMTgwLTkwJ1xuXHRcdFx0IyBlbHNlXG5cdFx0XHQjIFx0QCRlbC5hZGRDbGFzcyAnZmxpcGVkXzAtOTAnXG5cblx0XHRcdCMgIyBAJGVsLmFkZENsYXNzICdpc19mbGlwaW5nJ1xuXHRcdFx0IyBzZXRUaW1lb3V0ICgpID0+XG5cdFx0XHQjIFx0Y29uc29sZS5sb2cgYW5pbWF0aW9uRCx0cmFuc2l0aW9uRFxuXHRcdFx0IyBcdGFuaW1hdGlvbkQgPSAoIHBhcnNlRmxvYXQgQCRlbC5maW5kKCcuY2FyZF9wZXJzcGVjdGl2ZV9pbm5lcl93cmFwcGVyJykuY3NzICdhbmltYXRpb24tZHVyYXRpb24nICkgKiAxMDAwXG5cdFx0XHQjIFx0Y2FudmFzID0gQCRlbC5maW5kKCcuY2FyZF9jYW52YXMuZnJvbnQnKVswXVxuXHRcdFx0IyBcdGNhbnZhcy53aWR0aCA9IEAkZWwud2lkdGgoKVxuXHRcdFx0IyBcdGNhbnZhcy5oZWlnaHQgPSBAJGVsLmhlaWdodCgpXG5cdFx0XHQjIFx0QHJlbmRlckxheWVyMShjYW52YXMpXG5cdFx0XHQjIFx0IyBAcmVuZGVyTGF5ZXIyKGNhbnZhcylcblx0XHRcdCMgXHRAcmVuZGVyTGF5ZXIzKGNhbnZhcylcblxuXHRcdFx0IyBcdGlmIEAkZWwuaGFzQ2xhc3MgJ2ZsaXBlZF8wLTkwJ1xuXHRcdFx0IyBcdFx0QCRlbC5yZW1vdmVDbGFzcyAnZmxpcGVkXzAtOTAnXG5cdFx0XHQjIFx0XHRAJGVsLmFkZENsYXNzICdmbGlwZWRfOTAtMTgwJ1xuXG5cdFx0XHQjIFx0ZWxzZSBpZiBAJGVsLmhhc0NsYXNzICdmbGlwZWRfMTgwLTkwJ1xuXHRcdFx0IyBcdFx0QCRlbC5yZW1vdmVDbGFzcyAnZmxpcGVkXzE4MC05MCdcblx0XHRcdCMgXHRcdEAkZWwuYWRkQ2xhc3MgJ2ZsaXBlZF85MC0wJ1xuXHRcdFx0IyBcdGVsc2Vcblx0XHRcdCMgXHRcdEAkZWwuYWRkQ2xhc3MgJ2ZsaXBlZF85MC0xODAnXG5cdFx0XHQjIFx0c2V0VGltZW91dCAoKSAtPlxuXHRcdFx0IyBcdFx0QCRlbC5yZW1vdmVDbGFzcyAnaXNfZmxpcGluZydcblx0XHRcdCMgXHQsIHBhcnNlRmxvYXQoQCRlbC5maW5kKCcuY2FyZF9wZXJzcGVjdGl2ZV9pbm5lcl93cmFwcGVyJykuY3NzICdhbmltYXRpb24tZHVyYXRpb24nKSAqIDEwMDB6XG5cdFx0XHQjIFx0IyBjb25zb2xlLmxvZyB0cmFuc2l0aW9uRC8yXG5cdFx0XHQjICwgcGFyc2VGbG9hdChAJGVsLmZpbmQoJy5jYXJkX3BlcnNwZWN0aXZlX2lubmVyX3dyYXBwZXInKS5jc3MgJ2FuaW1hdGlvbi1kdXJhdGlvbicpICogMTAwMFxuXHRcdFx0IyAjIGZsaXAgPSAoQCxjYW52YXMpIC0+XG5cdFx0XHQjIFx0IyBkZWxheSA9ICh0cmFuc2l0aW9uRCAqIChAbW9kZWwuaWQtMSkpLnRvRml4ZWQoKVxuXHRcdFx0IyBcdCMgY29uc29sZS5sb2cgdHJhbnNpdGlvbkRcblx0XHRcdCMgXHQjIHNldFRpbWVvdXQgYWZ0ZXJGbGlwLCB0cmFuc2l0aW9uRFxuXG5cdFx0cmVuZGVyTGF5ZXIxOiAoY2FudmFzKS0+XG5cdFx0XHRhcHAuZ2VuZXJhdG9ycy5ncmFkaWVudEdlbi5kcmF3IGNhbnZhcywgQG1vZGVsXG5cblx0XHRyZW5kZXJMYXllcjI6IChjYW52YXMpLT5cblx0XHRcdGFwcC5nZW5lcmF0b3JzW0Btb2RlbC5hdHRyaWJ1dGVzLnBsdWdpbi5uYW1lXS5kcmF3IGNhbnZhcywgQG1vZGVsLmF0dHJpYnV0ZXMucGx1Z2luLm9wdGlvbnNcblxuXHRcdHJlbmRlckxheWVyMzogKGNhbnZhcyktPlxuXHRcdFx0YXBwLmdlbmVyYXRvcnMudGV4dEdlbi5kcmF3IGNhbnZhcywgQG1vZGVsXG5cblx0XHRyZXNpemVyOi0+IFxuXHRcdFx0QHJlbmRlcigpXG5cblx0XHRsb2NrZXI6IC0+XG5cdFx0XHRpZiBAbW9kZWwuZ2V0KCdsb2NrZWQnKSBpcyB0cnVlXG5cdFx0XHRcdEBtb2RlbC5zZXQgJ2xvY2tlZCcsIGZhbHNlLFxuXHRcdFx0XHRcdHNpbGVudDogdHJ1ZVxuXHRcdFx0XHRAJGVsLnJlbW92ZUNsYXNzKCdsb2NrZWQnKVxuXHRcdFx0XHQuZmluZCAnLmpzX2xvY2tfY29uZmlnX2J1dHRvbidcblx0XHRcdFx0LnRleHQgJ9CX0LDQutGA0LXQv9C40YLRjCcgXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBtb2RlbC5zZXQgJ2xvY2tlZCcsIHRydWUsXG5cdFx0XHRcdFx0c2lsZW50OiB0cnVlXG5cdFx0XHRcdEAkZWwuYWRkQ2xhc3MoJ2xvY2tlZCcpXG5cdFx0XHRcdC5maW5kICcuanNfbG9ja19jb25maWdfYnV0dG9uJ1xuXHRcdFx0XHQudGV4dCAn0J7RgtC60YDQtdC/0LjRgtGMJyBcblxuXHRcdG1vdXNlZW50ZXI6IC0+XG5cdFx0XHRpZiAhQG1vZGVsLmhhcygnbG9ja2VkJykgb3IgQG1vZGVsLmdldCgnbG9ja2VkJykgaXNudCB0cnVlIFxuXHRcdFx0XHRpZiBAJGVsLmhhc0NsYXNzKCdpc19mbGlwaW5nJylcblx0XHRcdFx0XHRAJGVsLnRvZ2dsZUNsYXNzICdmbGlwZWQnXG5cdFx0XHRcdEAkZWwucHJlcGVuZCAnPGRpdiBjbGFzcz1cImpzX2xvY2tfY29uZmlnX2J1dHRvbl93cmFwcGVyXCI+PGJ1dHRvbiBjbGFzcz1cImpzX2xvY2tfY29uZmlnX2J1dHRvblwiPtCX0LDQutGA0LXQv9C40YLRjDwvYnV0dG9uPjwvZGl2Pidcblx0XHRtb3VzZWxlYXZlOiAtPlxuXHRcdFx0aWYgIUBtb2RlbC5oYXMoJ2xvY2tlZCcpIG9yIEBtb2RlbC5nZXQoJ2xvY2tlZCcpIGlzbnQgdHJ1ZVxuXHRcdFx0XHRAJGVsLmZpbmQoJy5qc19sb2NrX2NvbmZpZ19idXR0b25fd3JhcHBlcicpLnJlbW92ZSgpXG5cbiJdfQ==