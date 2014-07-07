(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.App.CardView = App.CardView = (function(_super) {
    __extends(CardView, _super);

    function CardView() {
      this.flip = __bind(this.flip, this);
      this.animatedRender = __bind(this.animatedRender, this);
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

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvY2FyZC12aWV3LmpzIiwic291cmNlcyI6WyJjYXJkLXZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLFFBQUwsR0FBc0IsR0FBRyxDQUFDO0FBQ3pCLCtCQUFBLENBQUE7Ozs7Ozs7S0FBQTs7QUFBQSx1QkFBQSxLQUFBLEdBQU8sS0FBUCxDQUFBOztBQUFBLHVCQUVBLE9BQUEsR0FBUyxJQUZULENBQUE7O0FBQUEsdUJBR0EsU0FBQSxHQUFXLE1BSFgsQ0FBQTs7QUFBQSx1QkFJQSxNQUFBLEdBQ0M7QUFBQSxNQUFBLFlBQUEsRUFBZSxZQUFmO0FBQUEsTUFDQSxZQUFBLEVBQWUsWUFEZjtBQUFBLE1BRUEsOEJBQUEsRUFBZ0MsUUFGaEM7QUFBQSxNQUdBLGVBQUEsRUFBaUIsb0JBSGpCO0tBTEQsQ0FBQTs7QUFBQSx1QkFXQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBQ1gsTUFBQSxJQUFDLENBQUEsUUFBRCxDQUFVLEdBQVYsRUFBZSxPQUFmLEVBQXdCLElBQUMsQ0FBQSxLQUF6QixDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxHQUFjLElBRGQsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFDLENBQUEsS0FBWCxFQUFpQixRQUFqQixFQUEwQixJQUFDLENBQUEsTUFBM0IsQ0FGQSxDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsUUFBRCxDQUFVLEdBQVYsRUFBYyxRQUFkLEVBQXdCLElBQUMsQ0FBQSxPQUF6QixDQUhBLENBQUE7YUFLQSxJQUFDLENBQUEsSUFBRCxDQUFNLEtBQU4sRUFBYSxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxPQUFELEVBQVUsSUFBVixHQUFBO0FBQ1osVUFBQSxJQUFHLEtBQUMsQ0FBQSxLQUFELEtBQVUsSUFBYjttQkFDQyxPQUFPLENBQUMsR0FB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