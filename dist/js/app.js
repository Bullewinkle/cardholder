(function() {
  var delay,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  delay = function(ms, fn) {
    return setTimeout(ms, fn);
  };

  window.App = (function(_super) {
    var getGenerators;

    __extends(App, _super);

    function App() {
      this.intervalRenderer = __bind(this.intervalRenderer, this);
      return App.__super__.constructor.apply(this, arguments);
    }

    App.prototype.logger = false;

    App.prototype.view = new Backbone.View({
      el: $('#app')
    });

    App.prototype.regions = {
      mainRegion: '#app'
    };

    App.prototype.intervalRenderer = function() {
      var prevCard, renderRandom;
      prevCard = {};
      renderRandom = (function(_this) {
        return function() {
          var randomModel;
          randomModel = app.cardsCollection.get(app.getRandom(1, app.cardsCollection.length));
          if (randomModel !== prevCard) {
            prevCard = randomModel;
            randomModel.set('generators.gradientGen', randomModel.defaults.generators.gradientGen, {
              silent: true
            });
            randomModel.set('data', randomModel.defaults.data, {
              silent: true
            });
            if (randomModel.view.$el.is(':not(:hover)') && !randomModel.view.$el.hasClass('locked')) {
              return randomModel.view.animatedRender();
            }
          } else {
            return renderRandom();
          }
        };
      })(this);
      return setInterval(renderRandom, 2000);
    };

    App.prototype.getRandom = function(min, max, decimal) {
      if (min == null) {
        min = 0;
      }
      if (max == null) {
        max = 100;
      }
      if (decimal == null) {
        decimal = 0;
      }
      return +(Math.random() * (max - min) + min).toFixed(decimal);
    };

    getGenerators = function() {
      var generatorsCounter, generatorsList, i, _i, _ref, _results;
      generatorsList = [];
      generatorsCounter = 0;
      if (generatorsList.length > 0) {
        _results = [];
        for (i = _i = 0, _ref = generatorsList.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          _results.push($.get(generatorsList[i], function(res) {
            var readyTime;
            generatorsCounter++;
            if (generatorsCounter === generatorsList.length) {
              readyTime = Date.now();
              return console.info('generators loaded at : ' + (readyTime - startTime) + ' miliseconds');
            }
          }));
        }
        return _results;
      } else {
        return 'no plugin';
      }
    };

    App.prototype.generators = {};

    return App;

  })(Marionette.Application);

  window.app = new App;

  window.app.module('Common');

  window.app.addInitializer(function() {
    var onResize;
    this.bind('all', (function(_this) {
      return function(trigger, args) {
        var date;
        if (_this.logger === true) {
          date = new Date();
          return console.info("App says : " + trigger + " at " + (date.getHours()) + ":" + (date.getMinutes()) + ":" + (date.getSeconds()) + "." + (date.getMilliseconds()), args);
        }
      };
    })(this));
    this.startTime = Date.now();
    this.trigger('initialize');
    this.controller = new this.Common.Controller();
    this.router = new this.Common.Router({
      controller: this.controller
    });
    $("a[href^='/']", "body").click((function(_this) {
      return function(e) {
        var href;
        href = $(e.target).attr('href');
        if (href.indexOf('/api') !== 0) {
          e.preventDefault();
          return _this.router.navigate(href, {
            trigger: true
          });
        }
      };
    })(this));
    onResize = _.debounce((function(_this) {
      return function() {
        return _this.trigger('resize', 250);
      };
    })(this));
    $(window).on({
      resize: onResize
    });
    if (!Backbone.history.started) {
      return Backbone.history.start({
        pushState: true
      });
    }
  });

  jQuery((function(_this) {
    return function() {
      return window.app.start();
    };
  })(this));

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLEtBQUE7SUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxLQUFBLEdBQVEsU0FBQyxFQUFELEVBQUssRUFBTCxHQUFBO1dBQVksVUFBQSxDQUFXLEVBQVgsRUFBZSxFQUFmLEVBQVo7RUFBQSxDQUFSLENBQUE7O0FBQUEsRUFFTSxNQUFNLENBQUM7QUFDWixRQUFBLGFBQUE7O0FBQUEsMEJBQUEsQ0FBQTs7Ozs7S0FBQTs7QUFBQSxrQkFBQSxNQUFBLEdBQVEsS0FBUixDQUFBOztBQUFBLGtCQUVBLElBQUEsR0FBVSxJQUFBLFFBQVEsQ0FBQyxJQUFULENBQ1Q7QUFBQSxNQUFBLEVBQUEsRUFBSSxDQUFBLENBQUUsTUFBRixDQUFKO0tBRFMsQ0FGVixDQUFBOztBQUFBLGtCQUtBLE9BQUEsR0FDQztBQUFBLE1BQUEsVUFBQSxFQUFZLE1BQVo7S0FORCxDQUFBOztBQUFBLGtCQVFBLGdCQUFBLEdBQWtCLFNBQUEsR0FBQTtBQUNqQixVQUFBLHNCQUFBO0FBQUEsTUFBQSxRQUFBLEdBQVcsRUFBWCxDQUFBO0FBQUEsTUFFQSxZQUFBLEdBQWUsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUVkLGNBQUEsV0FBQTtBQUFBLFVBQUEsV0FBQSxHQUFjLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FBcEIsQ0FBd0IsR0FBRyxDQUFDLFNBQUosQ0FBYyxDQUFkLEVBQWdCLEdBQUcsQ0FBQyxlQUFlLENBQUMsTUFBcEMsQ0FBeEIsQ0FBZCxDQUFBO0FBQ0EsVUFBQSxJQUFHLFdBQUEsS0FBaUIsUUFBcEI7QUFFQyxZQUFBLFFBQUEsR0FBVyxXQUFYLENBQUE7QUFBQSxZQUdBLFdBQVcsQ0FBQyxHQUFaLENBQWdCLHdCQUFoQixFQUEwQyxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUExRSxFQUNDO0FBQUEsY0FBQSxNQUFBLEVBQVEsSUFBUjthQURELENBSEEsQ0FBQTtBQUFBLFlBS0EsV0FBVyxDQUFDLEdBQVosQ0FBZ0IsTUFBaEIsRUFBd0IsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUE3QyxFQUNDO0FBQUEsY0FBQSxNQUFBLEVBQVEsSUFBUjthQURELENBTEEsQ0FBQTtBQVNBLFlBQUEsSUFBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFyQixDQUF3QixjQUF4QixDQUFBLElBQTRDLENBQUEsV0FBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBckIsQ0FBOEIsUUFBOUIsQ0FBbkQ7cUJBQ0MsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFqQixDQUFBLEVBREQ7YUFYRDtXQUFBLE1BQUE7bUJBY0ssWUFBQSxDQUFBLEVBZEw7V0FIYztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBRmYsQ0FBQTthQXFCQSxXQUFBLENBQVksWUFBWixFQUEwQixJQUExQixFQXRCaUI7SUFBQSxDQVJsQixDQUFBOztBQUFBLGtCQWdDQSxTQUFBLEdBQVcsU0FBQyxHQUFELEVBQVMsR0FBVCxFQUFtQixPQUFuQixHQUFBOztRQUFDLE1BQU07T0FDakI7O1FBRG1CLE1BQU07T0FDekI7O1FBRDZCLFVBQVU7T0FDdkM7YUFBQSxDQUFBLENBQUUsSUFBSSxDQUFDLE1BQUwsQ0FBQSxDQUFBLEdBQWdCLENBQUMsR0FBQSxHQUFNLEdBQVAsQ0FBaEIsR0FBOEIsR0FBL0IsQ0FBbUMsQ0FBQyxPQUFwQyxDQUE0QyxPQUE1QyxFQURTO0lBQUEsQ0FoQ1gsQ0FBQTs7QUFBQSxJQW9DQSxhQUFBLEdBQWdCLFNBQUEsR0FBQTtBQUNmLFVBQUEsd0RBQUE7QUFBQSxNQUFBLGNBQUEsR0FBaUIsRUFBakIsQ0FBQTtBQUFBLE1BR0EsaUJBQUEsR0FBb0IsQ0FIcEIsQ0FBQTtBQUlBLE1BQUEsSUFBRyxjQUFjLENBQUMsTUFBZixHQUF1QixDQUExQjtBQUNDO2FBQVMsd0dBQVQsR0FBQTtBQUNDLHdCQUFBLENBQUMsQ0FBQyxHQUFGLENBQU0sY0FBZSxDQUFBLENBQUEsQ0FBckIsRUFBd0IsU0FBQyxHQUFELEdBQUE7QUFDdkIsZ0JBQUEsU0FBQTtBQUFBLFlBQUEsaUJBQUEsRUFBQSxDQUFBO0FBQ0EsWUFBQSxJQUFHLGlCQUFBLEtBQXFCLGNBQWMsQ0FBQyxNQUF2QztBQUNDLGNBQUEsU0FBQSxHQUFZLElBQUksQ0FBQyxHQUFMLENBQUEsQ0FBWixDQUFBO3FCQUNBLE9BQU8sQ0FBQyxJQUFSLENBQWEseUJBQUEsR0FBNEIsQ0FBQyxTQUFBLEdBQVUsU0FBWCxDQUE1QixHQUFvRCxjQUFqRSxFQUZEO2FBRnVCO1VBQUEsQ0FBeEIsRUFBQSxDQUREO0FBQUE7d0JBREQ7T0FBQSxNQUFBO2VBUUMsWUFSRDtPQUxlO0lBQUEsQ0FwQ2hCLENBQUE7O0FBQUEsa0JBbURBLFVBQUEsR0FBYSxFQW5EYixDQUFBOztlQUFBOztLQUR3QixVQUFVLENBQUMsWUFGcEMsQ0FBQTs7QUFBQSxFQXlEQSxNQUFNLENBQUMsR0FBUCxHQUFhLEdBQUEsQ0FBQSxHQXpEYixDQUFBOztBQUFBLEVBMERBLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBWCxDQUFrQixRQUFsQixDQTFEQSxDQUFBOztBQUFBLEVBMkRBLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBWCxDQUEwQixTQUFBLEdBQUE7QUFDekIsUUFBQSxRQUFBO0FBQUEsSUFBQSxJQUFDLENBQUEsSUFBRCxDQUFNLEtBQU4sRUFBYSxDQUFBLFNBQUEsS0FBQSxHQUFBO2FBQUEsU0FBQyxPQUFELEVBQVUsSUFBVixHQUFBO0FBQ1osWUFBQSxJQUFBO0FBQUEsUUFBQSxJQUFHLEtBQUMsQ0FBQSxNQUFELEtBQVcsSUFBZDtBQUNDLFVBQUEsSUFBQSxHQUFXLElBQUEsSUFBQSxDQUFBLENBQVgsQ0FBQTtpQkFDQSxPQUFPLENBQUMsSUFBUixDQUFjLGFBQUEsR0FBaEIsT0FBZ0IsR0FBdUIsTUFBdkIsR0FBNEIsQ0FBQSxJQUFJLENBQUMsUUFBTCxDQUFBLENBQUEsQ0FBNUIsR0FBNkMsR0FBN0MsR0FBK0MsQ0FBQSxJQUFJLENBQUMsVUFBTCxDQUFBLENBQUEsQ0FBL0MsR0FBa0UsR0FBbEUsR0FBb0UsQ0FBQSxJQUFJLENBQUMsVUFBTCxDQUFBLENBQUEsQ0FBcEUsR0FBdUYsR0FBdkYsR0FBeUYsQ0FBQSxJQUFJLENBQUMsZUFBTCxDQUFBLENBQUEsQ0FBdkcsRUFBa0ksSUFBbEksRUFGRDtTQURZO01BQUEsRUFBQTtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBYixDQUFBLENBQUE7QUFBQSxJQUlBLElBQUMsQ0FBQSxTQUFELEdBQWEsSUFBSSxDQUFDLEdBQUwsQ0FBQSxDQUpiLENBQUE7QUFBQSxJQUtBLElBQUMsQ0FBQSxPQUFELENBQVMsWUFBVCxDQUxBLENBQUE7QUFBQSxJQVFBLElBQUMsQ0FBQSxVQUFELEdBQWtCLElBQUEsSUFBQyxDQUFBLE1BQU0sQ0FBQyxVQUFSLENBQUEsQ0FSbEIsQ0FBQTtBQUFBLElBU0EsSUFBQyxDQUFBLE1BQUQsR0FBYyxJQUFBLElBQUMsQ0FBQSxNQUFNLENBQUMsTUFBUixDQUFlO0FBQUEsTUFBQSxVQUFBLEVBQVksSUFBQyxDQUFBLFVBQWI7S0FBZixDQVRkLENBQUE7QUFBQSxJQXlCQSxDQUFBLENBQUUsY0FBRixFQUFpQixNQUFqQixDQUF3QixDQUFDLEtBQXpCLENBQWdDLENBQUEsU0FBQSxLQUFBLEdBQUE7YUFBQSxTQUFDLENBQUQsR0FBQTtBQUMvQixZQUFBLElBQUE7QUFBQSxRQUFBLElBQUEsR0FBTyxDQUFBLENBQUUsQ0FBQyxDQUFDLE1BQUosQ0FBVyxDQUFDLElBQVosQ0FBaUIsTUFBakIsQ0FBUCxDQUFBO0FBQ0EsUUFBQSxJQUFHLElBQUksQ0FBQyxPQUFMLENBQWEsTUFBYixDQUFBLEtBQTBCLENBQTdCO0FBQ0MsVUFBQSxDQUFDLENBQUMsY0FBRixDQUFBLENBQUEsQ0FBQTtpQkFDQSxLQUFDLENBQUEsTUFBTSxDQUFDLFFBQVIsQ0FBaUIsSUFBakIsRUFDQztBQUFBLFlBQUEsT0FBQSxFQUFTLElBQVQ7V0FERCxFQUZEO1NBRitCO01BQUEsRUFBQTtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBaEMsQ0F6QkEsQ0FBQTtBQUFBLElBZ0NBLFFBQUEsR0FBVyxDQUFDLENBQUMsUUFBRixDQUFXLENBQUEsU0FBQSxLQUFBLEdBQUE7YUFBQSxTQUFBLEdBQUE7ZUFBRyxLQUFDLENBQUEsT0FBRCxDQUFTLFFBQVQsRUFBbUIsR0FBbkIsRUFBSDtNQUFBLEVBQUE7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQVgsQ0FoQ1gsQ0FBQTtBQUFBLElBaUNBLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxFQUFWLENBQWE7QUFBQSxNQUFBLE1BQUEsRUFBUSxRQUFSO0tBQWIsQ0FqQ0EsQ0FBQTtBQW1DQSxJQUFBLElBQUcsQ0FBQSxRQUFZLENBQUMsT0FBTyxDQUFDLE9BQXhCO2FBQ0MsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFqQixDQUNDO0FBQUEsUUFBQSxTQUFBLEVBQVcsSUFBWDtPQURELEVBREQ7S0FwQ3lCO0VBQUEsQ0FBMUIsQ0EzREEsQ0FBQTs7QUFBQSxFQW1HQSxNQUFBLENBQU8sQ0FBQSxTQUFBLEtBQUEsR0FBQTtXQUFBLFNBQUEsR0FBQTthQUNOLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBWCxDQUFBLEVBRE07SUFBQSxFQUFBO0VBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFQLENBbkdBLENBQUE7QUFBQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJkZWxheSA9IChtcywgZm4pIC0+IHNldFRpbWVvdXQgbXMsIGZuXG5cbmNsYXNzIHdpbmRvdy5BcHAgZXh0ZW5kcyBNYXJpb25ldHRlLkFwcGxpY2F0aW9uXG5cdGxvZ2dlcjogb2ZmXG5cdFxuXHR2aWV3OiBuZXcgQmFja2JvbmUuVmlld1xuXHRcdGVsOiAkKCcjYXBwJylcblxuXHRyZWdpb25zOlxuXHRcdG1haW5SZWdpb246ICcjYXBwJ1xuXG5cdGludGVydmFsUmVuZGVyZXI6ID0+XG5cdFx0cHJldkNhcmQgPSB7fVxuXG5cdFx0cmVuZGVyUmFuZG9tID0gPT5cblx0XHRcdFxuXHRcdFx0cmFuZG9tTW9kZWwgPSBhcHAuY2FyZHNDb2xsZWN0aW9uLmdldCBhcHAuZ2V0UmFuZG9tKDEsYXBwLmNhcmRzQ29sbGVjdGlvbi5sZW5ndGgpXG5cdFx0XHRpZiByYW5kb21Nb2RlbCBpc250IHByZXZDYXJkXG5cblx0XHRcdFx0cHJldkNhcmQgPSByYW5kb21Nb2RlbFxuXHRcdFx0XHRcblx0XHRcdFx0IyBTZXQgZGVmYXV0IHZhbHVlc1xuXHRcdFx0XHRyYW5kb21Nb2RlbC5zZXQgJ2dlbmVyYXRvcnMuZ3JhZGllbnRHZW4nLCByYW5kb21Nb2RlbC5kZWZhdWx0cy5nZW5lcmF0b3JzLmdyYWRpZW50R2VuLFxuXHRcdFx0XHRcdHNpbGVudDogdHJ1ZVxuXHRcdFx0XHRyYW5kb21Nb2RlbC5zZXQgJ2RhdGEnLCByYW5kb21Nb2RlbC5kZWZhdWx0cy5kYXRhLFxuXHRcdFx0XHRcdHNpbGVudDogdHJ1ZVxuXG5cdFx0XHRcdCMgSWYgbm90IGhvdmVyIGFuZCBub3QgbG9ja2VkIC0gYW5pbWF0ZWQgcmVuZGVyXG5cdFx0XHRcdGlmIHJhbmRvbU1vZGVsLnZpZXcuJGVsLmlzKCc6bm90KDpob3ZlciknKSBhbmQgbm90IHJhbmRvbU1vZGVsLnZpZXcuJGVsLmhhc0NsYXNzKCdsb2NrZWQnKVxuXHRcdFx0XHRcdHJhbmRvbU1vZGVsLnZpZXcuYW5pbWF0ZWRSZW5kZXIoKVxuXG5cdFx0XHRlbHNlIHJlbmRlclJhbmRvbSgpXG5cblx0XHRzZXRJbnRlcnZhbCByZW5kZXJSYW5kb20sIDIwMDBcblx0XHRcblx0Z2V0UmFuZG9tOiAobWluID0gMCxtYXggPSAxMDAsZGVjaW1hbCA9IDApIC0+XG5cdFx0KyhNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pLnRvRml4ZWQoZGVjaW1hbClcblxuXHQjIHVzZSB0aGlzIGZ1bmN0aW9uIGlmIHlvdSB3YW50IHRvIGFkZCB5b3VyIG93biBnZW5lcmF0b3IsIGFuZCBkbyBub3Qga25vdyBob3cgdG8gZG8gdGhpc1xuXHRnZXRHZW5lcmF0b3JzID0gPT5cblx0XHRnZW5lcmF0b3JzTGlzdCA9IFtcblx0XHRcdCMgJ3NjcmlwdHMvZ2VuZXJhdG9ycy9yYW5kb20tY3NzLWdyYWRpZW50LWdlbmVyYXRvci5qcydcblx0XHRdXG5cdFx0Z2VuZXJhdG9yc0NvdW50ZXIgPSAwXG5cdFx0aWYgZ2VuZXJhdG9yc0xpc3QubGVuZ3RoID4wXG5cdFx0XHRmb3IgaSBpbiBbMC4uLmdlbmVyYXRvcnNMaXN0Lmxlbmd0aF1cblx0XHRcdFx0JC5nZXQgZ2VuZXJhdG9yc0xpc3RbaV0sKHJlcykgLT4gXG5cdFx0XHRcdFx0Z2VuZXJhdG9yc0NvdW50ZXIrK1xuXHRcdFx0XHRcdGlmIGdlbmVyYXRvcnNDb3VudGVyIGlzIGdlbmVyYXRvcnNMaXN0Lmxlbmd0aFxuXHRcdFx0XHRcdFx0cmVhZHlUaW1lID0gRGF0ZS5ub3coKVxuXHRcdFx0XHRcdFx0Y29uc29sZS5pbmZvICdnZW5lcmF0b3JzIGxvYWRlZCBhdCA6ICcgKyAocmVhZHlUaW1lLXN0YXJ0VGltZSkgKyAnIG1pbGlzZWNvbmRzJ1xuXHRcdGVsc2Vcblx0XHRcdCdubyBwbHVnaW4nXG5cblx0Z2VuZXJhdG9ycyA6IHt9XG5cblxud2luZG93LmFwcCA9IG5ldyBBcHBcbndpbmRvdy5hcHAubW9kdWxlICdDb21tb24nXG53aW5kb3cuYXBwLmFkZEluaXRpYWxpemVyIC0+XG5cdEBiaW5kICdhbGwnLCAodHJpZ2dlciwgYXJncykgPT4gXG5cdFx0aWYgQGxvZ2dlciBpcyBvblxuXHRcdFx0ZGF0ZSA9IG5ldyBEYXRlKClcblx0XHRcdGNvbnNvbGUuaW5mbyhcIkFwcCBzYXlzIDogI3sgdHJpZ2dlciB9IGF0ICN7ZGF0ZS5nZXRIb3VycygpfToje2RhdGUuZ2V0TWludXRlcygpfToje2RhdGUuZ2V0U2Vjb25kcygpfS4je2RhdGUuZ2V0TWlsbGlzZWNvbmRzKCl9XCIgLGFyZ3MpXG5cdEBzdGFydFRpbWUgPSBEYXRlLm5vdygpXG5cdEB0cmlnZ2VyICdpbml0aWFsaXplJ1xuXHRcblx0IyBAb24gJ3N0YXJ0JywgPT5cblx0QGNvbnRyb2xsZXIgPSBuZXcgQENvbW1vbi5Db250cm9sbGVyKClcblx0QHJvdXRlciA9IG5ldyBAQ29tbW9uLlJvdXRlciBjb250cm9sbGVyOiBAY29udHJvbGxlclxuXG5cdCMgQGNvbnRyb2xsZXJNb2RlbCA9IG5ldyBBcHAuTWFpbkNvbnRyb2xsZXJNb2RlbFxuXHQjIEBjb250cm9sbGVyVmlldyA9IG5ldyBBcHAuTWFpbkNvbnRyb2xsZXJWaWV3XG5cdCMgXHRlbDogJCgnLnN0ZXBfZm9ybV9jb250cm9sbGVyX3dyYXBwZXInKVxuXHQjIFx0bW9kZWw6IEBjb250cm9sbGVyTW9kZWxcblxuXHQjIEBjYXJkc0NvbGxlY3Rpb24gPSBuZXcgQXBwLkNhcmRzQ29sbGVjdGlvblxuXHQjIEBjYXJkc0NvbGxlY3Rpb24ucmVzZXQgZGF0YUZyb21TZXJ2ZXIuY2FyZHNDb25maWdcblxuXHQjIEBjYXJkc0NvbGxlY3Rpb25WaWV3ID0gbmV3IEFwcC5DYXJkc0NvbGxlY3Rpb25WaWV3XG5cdCMgXHRlbDogJCgnLmNhcmRzJywnI2FwcCcpXG5cdCMgXHRjb2xsZWN0aW9uOiBAY2FyZHNDb2xsZWN0aW9uXG5cblx0XG5cdCMgQ09NTU9OIFNFVFVQXG5cdCQoXCJhW2hyZWZePScvJ11cIixcImJvZHlcIikuY2xpY2sgIChlKSA9PlxuXHRcdGhyZWYgPSAkKGUudGFyZ2V0KS5hdHRyICdocmVmJ1xuXHRcdGlmIGhyZWYuaW5kZXhPZignL2FwaScpIGlzbnQgMFxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRAcm91dGVyLm5hdmlnYXRlIGhyZWYsXG5cdFx0XHRcdHRyaWdnZXI6IHRydWVcblxuXHRvblJlc2l6ZSA9IF8uZGVib3VuY2UgPT4gQHRyaWdnZXIgJ3Jlc2l6ZScsIDI1MFxuXHQkKHdpbmRvdykub24gcmVzaXplOiBvblJlc2l6ZVxuXG5cdGlmIG5vdCBCYWNrYm9uZS5oaXN0b3J5LnN0YXJ0ZWRcblx0XHRCYWNrYm9uZS5oaXN0b3J5LnN0YXJ0XG5cdFx0XHRwdXNoU3RhdGU6IHRydWVcblxualF1ZXJ5ID0+XG5cdHdpbmRvdy5hcHAuc3RhcnQoKVxuXG4iXX0=