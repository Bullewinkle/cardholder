(function() {
  var App, Router, delay,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  delay = function(ms, fn) {
    return setTimeout(ms, fn);
  };

  this.Router = Router = (function(_super) {
    __extends(Router, _super);

    function Router() {
      this.root = __bind(this.root, this);
      this.getJson = __bind(this.getJson, this);
      this.initialize = __bind(this.initialize, this);
      return Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.logger = false;

    Router.prototype.initialize = function() {
      return this.bind('all', (function(_this) {
        return function(trigger, args) {
          if (_this.logger === true) {
            return console.info('Router says :', trigger, args);
          }
        };
      })(this));
    };

    Router.prototype.routes = {
      '(/)': 'root',
      'json': 'getJson'
    };

    Router.prototype.getJson = function() {
      var mainJson;
      console.log(window.location.href);
      $('#app').find('.cards').hide();
      $('#app').find('.js_json_route').text('Back').attr('href', '#');
      mainJson = {};
      mainJson.cardsCollection = app.cardsCollection.toJSON();
      mainJson.userAgent = window.navigator.userAgent;
      return $('#app').append('<pre id="main-json">' + JSON.stringify(mainJson, null, "\t") + '</pre>');
    };

    Router.prototype.root = function() {
      console.log(window.location.href);
      $('#app').find('.js_json_route').text('View JSON').attr('href', '#/json');
      $('#main-json').remove();
      return $('#app').find('.cards').show();
    };

    return Router;

  })(Backbone.Router);

  this.App = App = (function(_super) {
    var getGenerators;

    __extends(App, _super);

    function App() {
      this.cacheNodes = __bind(this.cacheNodes, this);
      this.intervalRenderer = __bind(this.intervalRenderer, this);
      return App.__super__.constructor.apply(this, arguments);
    }

    App.prototype.logger = true;

    App.prototype.view = new Backbone.View({
      el: $('#app')
    });

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

    App.prototype.cacheNodes = function() {
      return this.rootNode = $('.cards').eq(0);
    };

    App.prototype.regions = {
      mainRegion: '#app'
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

    App.prototype.started = false;

    return App;

  })(Marionette.Application);

  this.app = new App;

  this.app.addInitializer(function() {
    var date, onResize;
    console.info('App started', arguments);
    date = new Date();
    this.trigger('initialize', 'at ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds());
    this.bind('all', (function(_this) {
      return function(trigger, args) {
        if (_this.logger === true) {
          return console.info('App says :', trigger, args);
        }
      };
    })(this));
    this.started = true;
    date = new Date();
    this.startTime = Date.now();
    this.trigger('start', 'at ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds());
    onResize = _.debounce((function(_this) {
      return function() {
        return _this.trigger('resize');
      };
    })(this));
    return $(window).on({
      resize: onResize
    });
  });

  jQuery((function(_this) {
    return function() {
      return _this.app.start({
        hello: true
      });
    };
  })(this));

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLGtCQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsS0FBQSxHQUFRLFNBQUMsRUFBRCxFQUFLLEVBQUwsR0FBQTtXQUFZLFVBQUEsQ0FBVyxFQUFYLEVBQWUsRUFBZixFQUFaO0VBQUEsQ0FBUixDQUFBOztBQUFBLEVBRUEsSUFBQyxDQUFBLE1BQUQsR0FBZ0I7QUFDZiw2QkFBQSxDQUFBOzs7Ozs7O0tBQUE7O0FBQUEscUJBQUEsTUFBQSxHQUFRLEtBQVIsQ0FBQTs7QUFBQSxxQkFFQSxVQUFBLEdBQVksU0FBQSxHQUFBO2FBQ1gsSUFBQyxDQUFBLElBQUQsQ0FBTSxLQUFOLEVBQWEsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsT0FBRCxFQUFVLElBQVYsR0FBQTtBQUNaLFVBQUEsSUFBRyxLQUFDLENBQUEsTUFBRCxLQUFXLElBQWQ7bUJBQ0MsT0FBTyxDQUFDLElBQVIsQ0FBYSxlQUFiLEVBQTZCLE9BQTdCLEVBQXFDLElBQXJDLEVBREQ7V0FEWTtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWIsRUFEVztJQUFBLENBRlosQ0FBQTs7QUFBQSxxQkFPQSxNQUFBLEdBQ0M7QUFBQSxNQUFBLEtBQUEsRUFBUSxNQUFSO0FBQUEsTUFDQSxNQUFBLEVBQVMsU0FEVDtLQVJELENBQUE7O0FBQUEscUJBV0EsT0FBQSxHQUFTLFNBQUEsR0FBQTtBQUNSLFVBQUEsUUFBQTtBQUFBLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQTVCLENBQUEsQ0FBQTtBQUFBLE1BQ0EsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLElBQVYsQ0FBZSxRQUFmLENBQXdCLENBQUMsSUFBekIsQ0FBQSxDQURBLENBQUE7QUFBQSxNQUVBLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxJQUFWLENBQWUsZ0JBQWYsQ0FBZ0MsQ0FBQyxJQUFqQyxDQUFzQyxNQUF0QyxDQUE2QyxDQUFDLElBQTlDLENBQW1ELE1BQW5ELEVBQTBELEdBQTFELENBRkEsQ0FBQTtBQUFBLE1BSUEsUUFBQSxHQUFXLEVBSlgsQ0FBQTtBQUFBLE1BS0EsUUFBUSxDQUFDLGVBQVQsR0FBMkIsR0FBRyxDQUFDLGVBQWUsQ0FBQyxNQUFwQixDQUFBLENBTDNCLENBQUE7QUFBQSxNQU1BLFFBQVEsQ0FBQyxTQUFULEdBQXFCLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FOdEMsQ0FBQTthQU9BLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxNQUFWLENBQWlCLHNCQUFBLEdBQXlCLElBQUksQ0FBQyxTQUFMLENBQWUsUUFBZixFQUF5QixJQUF6QixFQUErQixJQUEvQixDQUF6QixHQUFnRSxRQUFqRixFQVJRO0lBQUEsQ0FYVCxDQUFBOztBQUFBLHFCQXFCQSxJQUFBLEdBQU0sU0FBQSxHQUFBO0FBQ0wsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBNUIsQ0FBQSxDQUFBO0FBQUEsTUFDQSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsSUFBVixDQUFlLGdCQUFmLENBQWdDLENBQUMsSUFBakMsQ0FBc0MsV0FBdEMsQ0FBa0QsQ0FBQyxJQUFuRCxDQUF3RCxNQUF4RCxFQUErRCxRQUEvRCxDQURBLENBQUE7QUFBQSxNQUVBLENBQUEsQ0FBRSxZQUFGLENBQWUsQ0FBQyxNQUFoQixDQUFBLENBRkEsQ0FBQTthQUdBLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxJQUFWLENBQWUsUUFBZixDQUF3QixDQUFDLElBQXpCLENBQUEsRUFKSztJQUFBLENBckJOLENBQUE7O2tCQUFBOztLQUQ4QixRQUFRLENBQUMsT0FGeEMsQ0FBQTs7QUFBQSxFQThCQSxJQUFDLENBQUEsR0FBRCxHQUFhO0FBQ1osUUFBQSxhQUFBOztBQUFBLDBCQUFBLENBQUE7Ozs7OztLQUFBOztBQUFBLGtCQUFBLE1BQUEsR0FBUSxJQUFSLENBQUE7O0FBQUEsa0JBSUEsSUFBQSxHQUFVLElBQUEsUUFBUSxDQUFDLElBQVQsQ0FDVDtBQUFBLE1BQUEsRUFBQSxFQUFJLENBQUEsQ0FBRSxNQUFGLENBQUo7S0FEUyxDQUpWLENBQUE7O0FBQUEsa0JBT0EsZ0JBQUEsR0FBa0IsU0FBQSxHQUFBO0FBQ2pCLFVBQUEsc0JBQUE7QUFBQSxNQUFBLFFBQUEsR0FBVyxFQUFYLENBQUE7QUFBQSxNQUVBLFlBQUEsR0FBZSxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO0FBRWQsY0FBQSxXQUFBO0FBQUEsVUFBQSxXQUFBLEdBQWMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxHQUFwQixDQUF3QixHQUFHLENBQUMsU0FBSixDQUFjLENBQWQsRUFBZ0IsR0FBRyxDQUFDLGVBQWUsQ0FBQyxNQUFwQyxDQUF4QixDQUFkLENBQUE7QUFDQSxVQUFBLElBQUcsV0FBQSxLQUFpQixRQUFwQjtBQUVDLFlBQUEsUUFBQSxHQUFXLFdBQVgsQ0FBQTtBQUFBLFlBR0EsV0FBVyxDQUFDLEdBQVosQ0FBZ0Isd0JBQWhCLEVBQTBDLFdBQVcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQTFFLEVBQ0M7QUFBQSxjQUFBLE1BQUEsRUFBUSxJQUFSO2FBREQsQ0FIQSxDQUFBO0FBQUEsWUFLQSxXQUFXLENBQUMsR0FBWixDQUFnQixNQUFoQixFQUF3QixXQUFXLENBQUMsUUFBUSxDQUFDLElBQTdDLEVBQ0M7QUFBQSxjQUFBLE1BQUEsRUFBUSxJQUFSO2FBREQsQ0FMQSxDQUFBO0FBU0EsWUFBQSxJQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQXJCLENBQXdCLGNBQXhCLENBQUEsSUFBNEMsQ0FBQSxXQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFyQixDQUE4QixRQUE5QixDQUFuRDtxQkFDQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWpCLENBQUEsRUFERDthQVhEO1dBQUEsTUFBQTttQkFjSyxZQUFBLENBQUEsRUFkTDtXQUhjO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FGZixDQUFBO2FBcUJBLFdBQUEsQ0FBWSxZQUFaLEVBQTBCLElBQTFCLEVBdEJpQjtJQUFBLENBUGxCLENBQUE7O0FBQUEsa0JBK0JBLFVBQUEsR0FBWSxTQUFBLEdBQUE7YUFDWCxJQUFDLENBQUEsUUFBRCxHQUFZLENBQUEsQ0FBRSxRQUFGLENBQVcsQ0FBQyxFQUFaLENBQWUsQ0FBZixFQUREO0lBQUEsQ0EvQlosQ0FBQTs7QUFBQSxrQkFrQ0EsT0FBQSxHQUNDO0FBQUEsTUFBQSxVQUFBLEVBQVksTUFBWjtLQW5DRCxDQUFBOztBQUFBLGtCQWdEQSxTQUFBLEdBQVcsU0FBQyxHQUFELEVBQVMsR0FBVCxFQUFtQixPQUFuQixHQUFBOztRQUFDLE1BQU07T0FDakI7O1FBRG1CLE1BQU07T0FDekI7O1FBRDZCLFVBQVU7T0FDdkM7YUFBQSxDQUFBLENBQUUsSUFBSSxDQUFDLE1BQUwsQ0FBQSxDQUFBLEdBQWdCLENBQUMsR0FBQSxHQUFNLEdBQVAsQ0FBaEIsR0FBOEIsR0FBL0IsQ0FBbUMsQ0FBQyxPQUFwQyxDQUE0QyxPQUE1QyxFQURTO0lBQUEsQ0FoRFgsQ0FBQTs7QUFBQSxJQW9EQSxhQUFBLEdBQWdCLFNBQUEsR0FBQTtBQUNmLFVBQUEsd0RBQUE7QUFBQSxNQUFBLGNBQUEsR0FBaUIsRUFBakIsQ0FBQTtBQUFBLE1BR0EsaUJBQUEsR0FBb0IsQ0FIcEIsQ0FBQTtBQUlBLE1BQUEsSUFBRyxjQUFjLENBQUMsTUFBZixHQUF1QixDQUExQjtBQUNDO2FBQVMsd0dBQVQsR0FBQTtBQUNDLHdCQUFBLENBQUMsQ0FBQyxHQUFGLENBQU0sY0FBZSxDQUFBLENBQUEsQ0FBckIsRUFBd0IsU0FBQyxHQUFELEdBQUE7QUFDdkIsZ0JBQUEsU0FBQTtBQUFBLFlBQUEsaUJBQUEsRUFBQSxDQUFBO0FBQ0EsWUFBQSxJQUFHLGlCQUFBLEtBQXFCLGNBQWMsQ0FBQyxNQUF2QztBQUNDLGNBQUEsU0FBQSxHQUFZLElBQUksQ0FBQyxHQUFMLENBQUEsQ0FBWixDQUFBO3FCQUNBLE9BQU8sQ0FBQyxJQUFSLENBQWEseUJBQUEsR0FBNEIsQ0FBQyxTQUFBLEdBQVUsU0FBWCxDQUE1QixHQUFvRCxjQUFqRSxFQUZEO2FBRnVCO1VBQUEsQ0FBeEIsRUFBQSxDQUREO0FBQUE7d0JBREQ7T0FBQSxNQUFBO2VBUUMsWUFSRDtPQUxlO0lBQUEsQ0FwRGhCLENBQUE7O0FBQUEsa0JBbUVBLFVBQUEsR0FBYSxFQW5FYixDQUFBOztBQUFBLGtCQXFFQSxPQUFBLEdBQVUsS0FyRVYsQ0FBQTs7ZUFBQTs7S0FEd0IsVUFBVSxDQUFDLFlBOUJwQyxDQUFBOztBQUFBLEVBdUdBLElBQUMsQ0FBQSxHQUFELEdBQU8sR0FBQSxDQUFBLEdBdkdQLENBQUE7O0FBQUEsRUF3R0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxjQUFMLENBQW9CLFNBQUEsR0FBQTtBQUNuQixRQUFBLGNBQUE7QUFBQSxJQUFBLE9BQU8sQ0FBQyxJQUFSLENBQWEsYUFBYixFQUE0QixTQUE1QixDQUFBLENBQUE7QUFBQSxJQUNBLElBQUEsR0FBVyxJQUFBLElBQUEsQ0FBQSxDQURYLENBQUE7QUFBQSxJQUVBLElBQUMsQ0FBQSxPQUFELENBQVMsWUFBVCxFQUF1QixLQUFBLEdBQVEsSUFBSSxDQUFDLFFBQUwsQ0FBQSxDQUFSLEdBQTBCLEdBQTFCLEdBQWdDLElBQUksQ0FBQyxVQUFMLENBQUEsQ0FBaEMsR0FBb0QsR0FBcEQsR0FBMEQsSUFBSSxDQUFDLFVBQUwsQ0FBQSxDQUExRCxHQUE4RSxHQUE5RSxHQUFvRixJQUFJLENBQUMsZUFBTCxDQUFBLENBQTNHLENBRkEsQ0FBQTtBQUFBLElBR0EsSUFBQyxDQUFBLElBQUQsQ0FBTSxLQUFOLEVBQWEsQ0FBQSxTQUFBLEtBQUEsR0FBQTthQUFBLFNBQUMsT0FBRCxFQUFVLElBQVYsR0FBQTtBQUNaLFFBQUEsSUFBRyxLQUFDLENBQUEsTUFBRCxLQUFXLElBQWQ7aUJBQ0MsT0FBTyxDQUFDLElBQVIsQ0FBYSxZQUFiLEVBQTBCLE9BQTFCLEVBQWtDLElBQWxDLEVBREQ7U0FEWTtNQUFBLEVBQUE7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWIsQ0FIQSxDQUFBO0FBQUEsSUFNQSxJQUFDLENBQUEsT0FBRCxHQUFXLElBTlgsQ0FBQTtBQUFBLElBUUEsSUFBQSxHQUFXLElBQUEsSUFBQSxDQUFBLENBUlgsQ0FBQTtBQUFBLElBU0EsSUFBQyxDQUFBLFNBQUQsR0FBYSxJQUFJLENBQUMsR0FBTCxDQUFBLENBVGIsQ0FBQTtBQUFBLElBVUEsSUFBQyxDQUFBLE9BQUQsQ0FBUyxPQUFULEVBQWtCLEtBQUEsR0FBUSxJQUFJLENBQUMsUUFBTCxDQUFBLENBQVIsR0FBMEIsR0FBMUIsR0FBZ0MsSUFBSSxDQUFDLFVBQUwsQ0FBQSxDQUFoQyxHQUFvRCxHQUFwRCxHQUEwRCxJQUFJLENBQUMsVUFBTCxDQUFBLENBQTFELEdBQThFLEdBQTlFLEdBQW9GLElBQUksQ0FBQyxlQUFMLENBQUEsQ0FBdEcsQ0FWQSxDQUFBO0FBQUEsSUEwQkEsUUFBQSxHQUFXLENBQUMsQ0FBQyxRQUFGLENBQVcsQ0FBQSxTQUFBLEtBQUEsR0FBQTthQUFBLFNBQUEsR0FBQTtlQUNyQixLQUFDLENBQUEsT0FBRCxDQUFTLFFBQVQsRUFEcUI7TUFBQSxFQUFBO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFYLENBMUJYLENBQUE7V0E0QkEsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLEVBQVYsQ0FDQztBQUFBLE1BQUEsTUFBQSxFQUFRLFFBQVI7S0FERCxFQTdCbUI7RUFBQSxDQUFwQixDQXhHQSxDQUFBOztBQUFBLEVBd0lBLE1BQUEsQ0FBTyxDQUFBLFNBQUEsS0FBQSxHQUFBO1dBQUEsU0FBQSxHQUFBO2FBQ04sS0FBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLENBQ0M7QUFBQSxRQUFBLEtBQUEsRUFBTyxJQUFQO09BREQsRUFETTtJQUFBLEVBQUE7RUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQVAsQ0F4SUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImRlbGF5ID0gKG1zLCBmbikgLT4gc2V0VGltZW91dCBtcywgZm5cblxuQFJvdXRlciA9IGNsYXNzIFJvdXRlciBleHRlbmRzIEJhY2tib25lLlJvdXRlclxuXHRsb2dnZXI6IG9mZlxuXG5cdGluaXRpYWxpemU6ID0+XG5cdFx0QGJpbmQgJ2FsbCcsICh0cmlnZ2VyLCBhcmdzKSA9PiBcblx0XHRcdGlmIEBsb2dnZXIgaXMgb25cblx0XHRcdFx0Y29uc29sZS5pbmZvICdSb3V0ZXIgc2F5cyA6Jyx0cmlnZ2VyLGFyZ3NcblxuXHRyb3V0ZXM6XG5cdFx0JygvKScgOiAncm9vdCdcblx0XHQnanNvbicgOiAnZ2V0SnNvbidcblxuXHRnZXRKc29uOiA9PlxuXHRcdGNvbnNvbGUubG9nIHdpbmRvdy5sb2NhdGlvbi5ocmVmXG5cdFx0JCgnI2FwcCcpLmZpbmQoJy5jYXJkcycpLmhpZGUoKVxuXHRcdCQoJyNhcHAnKS5maW5kKCcuanNfanNvbl9yb3V0ZScpLnRleHQoJ0JhY2snKS5hdHRyKCdocmVmJywnIycpXG5cblx0XHRtYWluSnNvbiA9IHt9XG5cdFx0bWFpbkpzb24uY2FyZHNDb2xsZWN0aW9uID0gYXBwLmNhcmRzQ29sbGVjdGlvbi50b0pTT04oKVxuXHRcdG1haW5Kc29uLnVzZXJBZ2VudCA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50XG5cdFx0JCgnI2FwcCcpLmFwcGVuZCAnPHByZSBpZD1cIm1haW4tanNvblwiPicgKyBKU09OLnN0cmluZ2lmeShtYWluSnNvbiwgbnVsbCwgXCJcXHRcIikgKyAnPC9wcmU+J1xuXG5cdHJvb3Q6ID0+XG5cdFx0Y29uc29sZS5sb2cgd2luZG93LmxvY2F0aW9uLmhyZWZcblx0XHQkKCcjYXBwJykuZmluZCgnLmpzX2pzb25fcm91dGUnKS50ZXh0KCdWaWV3IEpTT04nKS5hdHRyKCdocmVmJywnIy9qc29uJylcblx0XHQkKCcjbWFpbi1qc29uJykucmVtb3ZlKClcblx0XHQkKCcjYXBwJykuZmluZCgnLmNhcmRzJykuc2hvdygpXG5cbkBBcHAgPSBjbGFzcyBBcHAgZXh0ZW5kcyBNYXJpb25ldHRlLkFwcGxpY2F0aW9uXG5cdGxvZ2dlcjogb25cblxuXHQjIHJvdXRlcjogbmV3IFJvdXRlclxuXHRcblx0dmlldzogbmV3IEJhY2tib25lLlZpZXdcblx0XHRlbDogJCgnI2FwcCcpXG5cblx0aW50ZXJ2YWxSZW5kZXJlcjogPT5cblx0XHRwcmV2Q2FyZCA9IHt9XG5cblx0XHRyZW5kZXJSYW5kb20gPSA9PlxuXHRcdFx0XG5cdFx0XHRyYW5kb21Nb2RlbCA9IGFwcC5jYXJkc0NvbGxlY3Rpb24uZ2V0IGFwcC5nZXRSYW5kb20oMSxhcHAuY2FyZHNDb2xsZWN0aW9uLmxlbmd0aClcblx0XHRcdGlmIHJhbmRvbU1vZGVsIGlzbnQgcHJldkNhcmRcblxuXHRcdFx0XHRwcmV2Q2FyZCA9IHJhbmRvbU1vZGVsXG5cdFx0XHRcdFxuXHRcdFx0XHQjIFNldCBkZWZhdXQgdmFsdWVzXG5cdFx0XHRcdHJhbmRvbU1vZGVsLnNldCAnZ2VuZXJhdG9ycy5ncmFkaWVudEdlbicsIHJhbmRvbU1vZGVsLmRlZmF1bHRzLmdlbmVyYXRvcnMuZ3JhZGllbnRHZW4sXG5cdFx0XHRcdFx0c2lsZW50OiB0cnVlXG5cdFx0XHRcdHJhbmRvbU1vZGVsLnNldCAnZGF0YScsIHJhbmRvbU1vZGVsLmRlZmF1bHRzLmRhdGEsXG5cdFx0XHRcdFx0c2lsZW50OiB0cnVlXG5cblx0XHRcdFx0IyBJZiBub3QgaG92ZXIgYW5kIG5vdCBsb2NrZWQgLSBhbmltYXRlZCByZW5kZXJcblx0XHRcdFx0aWYgcmFuZG9tTW9kZWwudmlldy4kZWwuaXMoJzpub3QoOmhvdmVyKScpIGFuZCBub3QgcmFuZG9tTW9kZWwudmlldy4kZWwuaGFzQ2xhc3MoJ2xvY2tlZCcpXG5cdFx0XHRcdFx0cmFuZG9tTW9kZWwudmlldy5hbmltYXRlZFJlbmRlcigpXG5cblx0XHRcdGVsc2UgcmVuZGVyUmFuZG9tKClcblxuXHRcdHNldEludGVydmFsIHJlbmRlclJhbmRvbSwgMjAwMFxuXG5cdGNhY2hlTm9kZXM6ID0+XG5cdFx0QHJvb3ROb2RlID0gJCgnLmNhcmRzJykuZXEoMClcblxuXHRyZWdpb25zOlxuXHRcdG1haW5SZWdpb246ICcjYXBwJ1xuXHQjIGluaXRDb2xvclNjaGVtZTogPT5cblx0IyBcdHNjbSA9IG5ldyBDb2xvclNjaGVtZSgpXG5cdCMgXHRodWUgPSBhcHAuZ2V0UmFuZG9tKDAuMiwgMzU5LCAxKVxuXG5cdCMgXHRzY20uZnJvbV9odWUoaHVlKVxuXHQjIFx0LnNjaGVtZSgndGV0cmFkZScpXG5cdCMgXHQuZGlzdGFuY2UoMC4xKVxuXHQjIFx0LmFkZF9jb21wbGVtZW50KGZhbHNlKVxuXHQjIFx0LnZhcmlhdGlvbignc29mdCcpXG5cdCMgXHQud2ViX3NhZmUoZmFsc2UpXG5cdCMgXHRAY29sb3JTY2hlbWUgPSBzY20uY29sb3JzKClcblxuXHRnZXRSYW5kb206IChtaW4gPSAwLG1heCA9IDEwMCxkZWNpbWFsID0gMCkgLT5cblx0XHQrKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbikudG9GaXhlZChkZWNpbWFsKVxuXG5cdCMgdXNlIHRoaXMgZnVuY3Rpb24gaWYgeW91IHdhbnQgdG8gYWRkIHlvdXIgb3duIGdlbmVyYXRvciwgYW5kIGRvIG5vdCBrbm93IGhvdyB0byBkbyB0aGlzXG5cdGdldEdlbmVyYXRvcnMgPSA9PlxuXHRcdGdlbmVyYXRvcnNMaXN0ID0gW1xuXHRcdFx0IyAnc2NyaXB0cy9nZW5lcmF0b3JzL3JhbmRvbS1jc3MtZ3JhZGllbnQtZ2VuZXJhdG9yLmpzJ1xuXHRcdF1cblx0XHRnZW5lcmF0b3JzQ291bnRlciA9IDBcblx0XHRpZiBnZW5lcmF0b3JzTGlzdC5sZW5ndGggPjBcblx0XHRcdGZvciBpIGluIFswLi4uZ2VuZXJhdG9yc0xpc3QubGVuZ3RoXVxuXHRcdFx0XHQkLmdldCBnZW5lcmF0b3JzTGlzdFtpXSwocmVzKSAtPiBcblx0XHRcdFx0XHRnZW5lcmF0b3JzQ291bnRlcisrXG5cdFx0XHRcdFx0aWYgZ2VuZXJhdG9yc0NvdW50ZXIgaXMgZ2VuZXJhdG9yc0xpc3QubGVuZ3RoXG5cdFx0XHRcdFx0XHRyZWFkeVRpbWUgPSBEYXRlLm5vdygpXG5cdFx0XHRcdFx0XHRjb25zb2xlLmluZm8gJ2dlbmVyYXRvcnMgbG9hZGVkIGF0IDogJyArIChyZWFkeVRpbWUtc3RhcnRUaW1lKSArICcgbWlsaXNlY29uZHMnXG5cdFx0ZWxzZVxuXHRcdFx0J25vIHBsdWdpbidcblxuXHRnZW5lcmF0b3JzIDoge31cblxuXHRzdGFydGVkIDogZmFsc2VcblxuXG5AYXBwID0gbmV3IEFwcFxuQGFwcC5hZGRJbml0aWFsaXplciAtPlxuXHRjb25zb2xlLmluZm8gJ0FwcCBzdGFydGVkJywgYXJndW1lbnRzXG5cdGRhdGUgPSBuZXcgRGF0ZSgpXG5cdEB0cmlnZ2VyICdpbml0aWFsaXplJywgJ2F0ICcgKyBkYXRlLmdldEhvdXJzKCkgKyAnOicgKyBkYXRlLmdldE1pbnV0ZXMoKSArICc6JyArIGRhdGUuZ2V0U2Vjb25kcygpICsgJy4nICsgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKVxuXHRAYmluZCAnYWxsJywgKHRyaWdnZXIsIGFyZ3MpID0+IFxuXHRcdGlmIEBsb2dnZXIgaXMgb25cblx0XHRcdGNvbnNvbGUuaW5mbyAnQXBwIHNheXMgOicsdHJpZ2dlcixhcmdzXG5cdEBzdGFydGVkID0gdHJ1ZVxuXG5cdGRhdGUgPSBuZXcgRGF0ZSgpXG5cdEBzdGFydFRpbWUgPSBEYXRlLm5vdygpXG5cdEB0cmlnZ2VyICdzdGFydCcsICdhdCAnICsgZGF0ZS5nZXRIb3VycygpICsgJzonICsgZGF0ZS5nZXRNaW51dGVzKCkgKyAnOicgKyBkYXRlLmdldFNlY29uZHMoKSArICcuJyArIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKClcblx0IyBAaW5pdENvbG9yU2NoZW1lKClcblxuXG5cdCMgQGNvbnRyb2xsZXJNb2RlbCA9IG5ldyBBcHAuTWFpbkNvbnRyb2xsZXJNb2RlbFxuXHQjIEBjb250cm9sbGVyVmlldyA9IG5ldyBBcHAuTWFpbkNvbnRyb2xsZXJWaWV3XG5cdCMgXHRlbDogJCgnLnN0ZXBfZm9ybV9jb250cm9sbGVyX3dyYXBwZXInKVxuXHQjIFx0bW9kZWw6IEBjb250cm9sbGVyTW9kZWxcblxuXHQjIEBjYXJkc0NvbGxlY3Rpb24gPSBuZXcgQXBwLkNhcmRzQ29sbGVjdGlvblxuXHQjIEBjYXJkc0NvbGxlY3Rpb24ucmVzZXQgZGF0YUZyb21TZXJ2ZXIuY2FyZHNDb25maWdcblxuXHQjIEBjYXJkc0NvbGxlY3Rpb25WaWV3ID0gbmV3IEFwcC5DYXJkc0NvbGxlY3Rpb25WaWV3XG5cdCMgXHRlbDogJCgnLmNhcmRzJywnI2FwcCcpXG5cdCMgXHRjb2xsZWN0aW9uOiBAY2FyZHNDb2xsZWN0aW9uXG5cblx0b25SZXNpemUgPSBfLmRlYm91bmNlID0+XG5cdFx0QHRyaWdnZXIgJ3Jlc2l6ZSdcblx0JCh3aW5kb3cpLm9uXG5cdFx0cmVzaXplOiBvblJlc2l6ZVxuXG5qUXVlcnkgPT5cblx0QGFwcC5zdGFydFxuXHRcdGhlbGxvOiB0cnVlXG5cbiJdfQ==