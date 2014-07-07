(function() {
  var App, Generator, Router, delay,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  delay = function(ms, fn) {
    return setTimeout(ms, fn);
  };

  this.Generator = Generator = (function() {
    function Generator(config) {
      this.getOption = __bind(this.getOption, this);
      this.addOption = __bind(this.addOption, this);
      $.extend(true, this, config.methods);
      $.extend(true, this.options, config.options);
    }

    Generator.prototype.options = {};

    Generator.prototype.addOption = function(name, type, val) {
      if (type == null) {
        type = 'string';
      }
      if (val == null) {
        val = '';
      }
      return this.settings[name] = {
        type: type,
        val: val
      };
    };

    Generator.prototype.getOption = function() {
      return this.settings;
    };

    return Generator;

  })();

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
      this.initColorScheme = __bind(this.initColorScheme, this);
      this.registerGenerator = __bind(this.registerGenerator, this);
      this.cacheNodes = __bind(this.cacheNodes, this);
      this.intervalRenderer = __bind(this.intervalRenderer, this);
      this.start = __bind(this.start, this);
      return App.__super__.constructor.apply(this, arguments);
    }

    App.prototype.logger = false;

    App.prototype.router = new Router;

    App.prototype.view = new Backbone.View({
      el: $('#app')
    });

    App.prototype.initialize = function() {
      var date;
      date = new Date();
      this.trigger('initialize', 'at ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds());
      this.bind('all', (function(_this) {
        return function(trigger, args) {
          if (_this.logger === true) {
            return console.info('App says :', trigger, args);
          }
        };
      })(this));
      this.data = new Backbone.Model;
      this.data.set(dataFromServer.appdata);
      $.ajax({
        url: '/fonts-list',
        async: false,
        success: (function(_this) {
          return function(fontList) {
            return _this.data.set('fontsList', fontList);
          };
        })(this),
        error: (function(_this) {
          return function(xhr) {
            return console.error('Error: ', xhr.responseText);
          };
        })(this)
      });
      return $(window).on({
        resize: (function(_this) {
          return function() {
            return _this.trigger('resize');
          };
        })(this)
      });
    };

    App.prototype.start = function() {
      var date;
      this.started = true;
      date = new Date();
      this.startTime = Date.now();
      this.trigger('start', 'at ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds());
      this.initColorScheme();
      this.controllerModel = new App.MainControllerModel;
      this.controllerView = new App.MainControllerView({
        el: $('.main_controller_wrapper'),
        model: this.controllerModel
      });
      this.cardsCollection = new App.CardsCollection;
      this.cardsCollection.reset(dataFromServer.cardsConfig);
      this.cardsCollectionView = new App.CardsCollectionView({
        el: $('.cards', '#app'),
        collection: this.cardsCollection
      });
      this.intervalRenderer();
      return Backbone.history.start();
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

    App.prototype.cacheNodes = function() {
      return this.rootNode = $('.cards').eq(0);
    };

    App.prototype.registerGenerator = function(name, cb) {
      this.generators[name] = cb(Generator);
      return this.generators[name].name = name;
    };

    App.prototype.initColorScheme = function() {
      var hue, scm;
      scm = new ColorScheme();
      hue = app.getRandom(0.2, 359, 1);
      scm.from_hue(hue).scheme('tetrade').distance(0.1).add_complement(false).variation('soft').web_safe(false);
      return this.colorScheme = scm.colors();
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

  })(Backbone.Model);

  this.app = new App;

  jQuery((function(_this) {
    return function() {
      return _this.app.start();
    };
  })(this));

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyJhcHAuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSw2QkFBQTtJQUFBOzttU0FBQTs7QUFBQSxFQUFBLEtBQUEsR0FBUSxTQUFDLEVBQUQsRUFBSyxFQUFMLEdBQUE7V0FBWSxVQUFBLENBQVcsRUFBWCxFQUFlLEVBQWYsRUFBWjtFQUFBLENBQVIsQ0FBQTs7QUFBQSxFQUVBLElBQUMsQ0FBQSxTQUFELEdBQW1CO0FBRUwsSUFBQSxtQkFBQyxNQUFELEdBQUE7QUFDWixtREFBQSxDQUFBO0FBQUEsbURBQUEsQ0FBQTtBQUFBLE1BQUEsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxJQUFULEVBQWMsSUFBZCxFQUFpQixNQUFNLENBQUMsT0FBeEIsQ0FBQSxDQUFBO0FBQUEsTUFDQSxDQUFDLENBQUMsTUFBRixDQUFTLElBQVQsRUFBYyxJQUFDLENBQUEsT0FBZixFQUF3QixNQUFNLENBQUMsT0FBL0IsQ0FEQSxDQURZO0lBQUEsQ0FBYjs7QUFBQSx3QkFJQSxPQUFBLEdBQVMsRUFKVCxDQUFBOztBQUFBLHdCQU1BLFNBQUEsR0FBVyxTQUFDLElBQUQsRUFBTyxJQUFQLEVBQXdCLEdBQXhCLEdBQUE7O1FBQU8sT0FBTztPQUN4Qjs7UUFEa0MsTUFBTTtPQUN4QzthQUFBLElBQUMsQ0FBQSxRQUFTLENBQUEsSUFBQSxDQUFWLEdBQ0M7QUFBQSxRQUFBLElBQUEsRUFBTSxJQUFOO0FBQUEsUUFDQSxHQUFBLEVBQUssR0FETDtRQUZTO0lBQUEsQ0FOWCxDQUFBOztBQUFBLHdCQVdBLFNBQUEsR0FBVyxTQUFBLEdBQUE7QUFDVixhQUFPLElBQUMsQ0FBQSxRQUFSLENBRFU7SUFBQSxDQVhYLENBQUE7O3FCQUFBOztNQUpELENBQUE7O0FBQUEsRUFtQkEsSUFBQyxDQUFBLE1BQUQsR0FBZ0I7QUFDZiw2QkFBQSxDQUFBOzs7Ozs7O0tBQUE7O0FBQUEscUJBQUEsTUFBQSxHQUFRLEtBQVIsQ0FBQTs7QUFBQSxx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QUFDLFNBQUEsR0FBVSxTQUFYLENBQTVCLEdBQW9ELGNBQWpFLEVBRkQ7YUFGdUI7VUFBQSxDQUF4QixFQUFBLENBREQ7QUFBQTt3QkFERDtPQUFBLE1BQUE7ZUFRQyxZQVJEO09BTGU7SUFBQSxDQXJHaEIsQ0FBQTs7QUFBQSxrQkFvSEEsVUFBQSxHQUFhLEVBcEhiLENBQUE7O0FBQUEsa0JBc0hBLE9BQUEsR0FBVSxLQXRIVixDQUFBOztlQUFBOztLQUR3QixRQUFRLENBQUMsTUEvQ2xDLENBQUE7O0FBQUEsRUF5S0EsSUFBQyxDQUFBLEdBQUQsR0FBTyxHQUFBLENBQUEsR0F6S1AsQ0FBQTs7QUFBQSxFQTJLQSxNQUFBLENBQU8sQ0FBQSxTQUFBLEtBQUEsR0FBQTtXQUFBLFNBQUEsR0FBQTthQUNOLEtBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxDQUFBLEVBRE07SUFBQSxFQUFBO0VBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFQLENBM0tBLENBQUE7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbImRlbGF5ID0gKG1zLCBmbikgLT4gc2V0VGltZW91dCBtcywgZm5cblxuQEdlbmVyYXRvciA9IGNsYXNzIEdlbmVyYXRvclxuXG5cdGNvbnN0cnVjdG9yOiAoY29uZmlnKSAtPlxuXHRcdCQuZXh0ZW5kKHRydWUsQCwgY29uZmlnLm1ldGhvZHMpXG5cdFx0JC5leHRlbmQodHJ1ZSxAb3B0aW9ucywgY29uZmlnLm9wdGlvbnMpXG5cdFx0XG5cdG9wdGlvbnM6IHt9XG5cblx0YWRkT3B0aW9uOiAobmFtZSwgdHlwZSA9ICdzdHJpbmcnLCB2YWwgPSAnJykgPT5cblx0XHRAc2V0dGluZ3NbbmFtZV0gPSBcblx0XHRcdHR5cGU6IHR5cGVcblx0XHRcdHZhbDogdmFsXG5cblx0Z2V0T3B0aW9uOiA9PlxuXHRcdHJldHVybiBAc2V0dGluZ3MgXG5cblxuQFJvdXRlciA9IGNsYXNzIFJvdXRlciBleHRlbmRzIEJhY2tib25lLlJvdXRlclxuXHRsb2dnZXI6IG9mZlxuXG5cdGluaXRpYWxpemU6ID0+XG5cdFx0QGJpbmQgJ2FsbCcsICh0cmlnZ2VyLCBhcmdzKSA9PiBcblx0XHRcdGlmIEBsb2dnZXIgaXMgb25cblx0XHRcdFx0Y29uc29sZS5pbmZvICdSb3V0ZXIgc2F5cyA6Jyx0cmlnZ2VyLGFyZ3NcblxuXHRyb3V0ZXM6XG5cdFx0JygvKScgOiAncm9vdCdcblx0XHQnanNvbicgOiAnZ2V0SnNvbidcblxuXHRnZXRKc29uOiA9PlxuXHRcdGNvbnNvbGUubG9nIHdpbmRvdy5sb2NhdGlvbi5ocmVmXG5cdFx0JCgnI2FwcCcpLmZpbmQoJy5jYXJkcycpLmhpZGUoKVxuXHRcdCQoJyNhcHAnKS5maW5kKCcuanNfanNvbl9yb3V0ZScpLnRleHQoJ0JhY2snKS5hdHRyKCdocmVmJywnIycpXG5cblx0XHRtYWluSnNvbiA9IHt9XG5cdFx0bWFpbkpzb24uY2FyZHNDb2xsZWN0aW9uID0gYXBwLmNhcmRzQ29sbGVjdGlvbi50b0pTT04oKVxuXHRcdG1haW5Kc29uLnVzZXJBZ2VudCA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50XG5cdFx0JCgnI2FwcCcpLmFwcGVuZCAnPHByZSBpZD1cIm1haW4tanNvblwiPicgKyBKU09OLnN0cmluZ2lmeShtYWluSnNvbiwgbnVsbCwgXCJcXHRcIikgKyAnPC9wcmU+J1xuXG5cdHJvb3Q6ID0+XG5cdFx0Y29uc29sZS5sb2cgd2luZG93LmxvY2F0aW9uLmhyZWZcblx0XHQkKCcjYXBwJykuZmluZCgnLmpzX2pzb25fcm91dGUnKS50ZXh0KCdWaWV3IEpTT04nKS5hdHRyKCdocmVmJywnIy9qc29uJylcblx0XHQkKCcjbWFpbi1qc29uJykucmVtb3ZlKClcblx0XHQkKCcjYXBwJykuZmluZCgnLmNhcmRzJykuc2hvdygpXG5cbkBBcHAgPSBjbGFzcyBBcHAgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuXHRsb2dnZXI6IG9mZlxuXG5cdHJvdXRlcjogbmV3IFJvdXRlclxuXG5cdHZpZXc6IG5ldyBCYWNrYm9uZS5WaWV3XG5cdFx0ZWw6ICQoJyNhcHAnKVxuXG5cdGluaXRpYWxpemU6IC0+XG5cblx0XHRkYXRlID0gbmV3IERhdGUoKVxuXHRcdEB0cmlnZ2VyICdpbml0aWFsaXplJywgJ2F0ICcgKyBkYXRlLmdldEhvdXJzKCkgKyAnOicgKyBkYXRlLmdldE1pbnV0ZXMoKSArICc6JyArIGRhdGUuZ2V0U2Vjb25kcygpICsgJy4nICsgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKVxuXHRcdEBiaW5kICdhbGwnLCAodHJpZ2dlciwgYXJncykgPT4gXG5cdFx0XHRpZiBAbG9nZ2VyIGlzIG9uXG5cdFx0XHRcdGNvbnNvbGUuaW5mbyAnQXBwIHNheXMgOicsdHJpZ2dlcixhcmdzXG5cblx0XHRAZGF0YSA9IG5ldyBCYWNrYm9uZS5Nb2RlbFxuXHRcdEBkYXRhLnNldCBkYXRhRnJvbVNlcnZlci5hcHBkYXRhXG5cdFx0JC5hamF4IFxuXHRcdFx0dXJsOiAnL2ZvbnRzLWxpc3QnXG5cdFx0XHRhc3luYzogZmFsc2Vcblx0XHRcdHN1Y2Nlc3M6IChmb250TGlzdCkgPT5cblx0XHRcdFx0QC5kYXRhLnNldCAnZm9udHNMaXN0JywgZm9udExpc3RcblxuXHRcdFx0ZXJyb3I6ICh4aHIpID0+XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IgJ0Vycm9yOiAnLHhoci5yZXNwb25zZVRleHRcblxuXHRcdCQod2luZG93KS5vblxuXHRcdFx0cmVzaXplOiA9PlxuXHRcdFx0XHRAdHJpZ2dlciAncmVzaXplJ1xuXG5cdHN0YXJ0IDogPT5cblx0XHRAc3RhcnRlZCA9IHRydWVcblx0XHRkYXRlID0gbmV3IERhdGUoKVxuXHRcdEBzdGFydFRpbWUgPSBEYXRlLm5vdygpXG5cdFx0QHRyaWdnZXIgJ3N0YXJ0JywgJ2F0ICcgKyBkYXRlLmdldEhvdXJzKCkgKyAnOicgKyBkYXRlLmdldE1pbnV0ZXMoKSArICc6JyArIGRhdGUuZ2V0U2Vjb25kcygpICsgJy4nICsgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKVxuXHRcdEBpbml0Q29sb3JTY2hlbWUoKVxuXG5cblx0XHRAY29udHJvbGxlck1vZGVsID0gbmV3IEFwcC5NYWluQ29udHJvbGxlck1vZGVsXG5cdFx0QGNvbnRyb2xsZXJWaWV3ID0gbmV3IEFwcC5NYWluQ29udHJvbGxlclZpZXdcblx0XHRcdGVsOiAkKCcubWFpbl9jb250cm9sbGVyX3dyYXBwZXInKVxuXHRcdFx0bW9kZWw6IEBjb250cm9sbGVyTW9kZWxcblxuXHRcdEBjYXJkc0NvbGxlY3Rpb24gPSBuZXcgQXBwLkNhcmRzQ29sbGVjdGlvblxuXHRcdEBjYXJkc0NvbGxlY3Rpb24ucmVzZXQgZGF0YUZyb21TZXJ2ZXIuY2FyZHNDb25maWdcblxuXHRcdEBjYXJkc0NvbGxlY3Rpb25WaWV3ID0gbmV3IEFwcC5DYXJkc0NvbGxlY3Rpb25WaWV3XG5cdFx0XHRlbDogJCgnLmNhcmRzJywnI2FwcCcpXG5cdFx0XHRjb2xsZWN0aW9uOiBAY2FyZHNDb2xsZWN0aW9uXG5cdFx0XG5cdFx0QGludGVydmFsUmVuZGVyZXIoKVxuXHRcdFxuXHRcdEJhY2tib25lLmhpc3Rvcnkuc3RhcnQoKVxuXG5cdGludGVydmFsUmVuZGVyZXI6ID0+XG5cdFx0cHJldkNhcmQgPSB7fVxuXG5cdFx0cmVuZGVyUmFuZG9tID0gPT5cblx0XHRcdFxuXHRcdFx0cmFuZG9tTW9kZWwgPSBhcHAuY2FyZHNDb2xsZWN0aW9uLmdldCBhcHAuZ2V0UmFuZG9tKDEsYXBwLmNhcmRzQ29sbGVjdGlvbi5sZW5ndGgpXG5cdFx0XHRpZiByYW5kb21Nb2RlbCBpc250IHByZXZDYXJkXG5cblx0XHRcdFx0cHJldkNhcmQgPSByYW5kb21Nb2RlbFxuXHRcdFx0XHRcblx0XHRcdFx0IyBTZXQgZGVmYXV0IHZhbHVlc1xuXHRcdFx0XHRyYW5kb21Nb2RlbC5zZXQgJ2dlbmVyYXRvcnMuZ3JhZGllbnRHZW4nLCByYW5kb21Nb2RlbC5kZWZhdWx0cy5nZW5lcmF0b3JzLmdyYWRpZW50R2VuLFxuXHRcdFx0XHRcdHNpbGVudDogdHJ1ZVxuXHRcdFx0XHRyYW5kb21Nb2RlbC5zZXQgJ2RhdGEnLCByYW5kb21Nb2RlbC5kZWZhdWx0cy5kYXRhLFxuXHRcdFx0XHRcdHNpbGVudDogdHJ1ZVxuXG5cdFx0XHRcdCMgSWYgbm90IGhvdmVyIGFuZCBub3QgbG9ja2VkIC0gYW5pbWF0ZWQgcmVuZGVyXG5cdFx0XHRcdGlmIHJhbmRvbU1vZGVsLnZpZXcuJGVsLmlzKCc6bm90KDpob3ZlciknKSBhbmQgbm90IHJhbmRvbU1vZGVsLnZpZXcuJGVsLmhhc0NsYXNzKCdsb2NrZWQnKVxuXHRcdFx0XHRcdHJhbmRvbU1vZGVsLnZpZXcuYW5pbWF0ZWRSZW5kZXIoKVxuXG5cdFx0XHRlbHNlIHJlbmRlclJhbmRvbSgpXG5cblx0XHRzZXRJbnRlcnZhbCByZW5kZXJSYW5kb20sIDIwMDBcblxuXHRjYWNoZU5vZGVzOiA9PlxuXHRcdEByb290Tm9kZSA9ICQoJy5jYXJkcycpLmVxKDApXG5cblx0cmVnaXN0ZXJHZW5lcmF0b3I6IChuYW1lLCBjYikgPT4gXG5cdFx0QGdlbmVyYXRvcnNbbmFtZV0gPSBjYihHZW5lcmF0b3IpXG5cdFx0QGdlbmVyYXRvcnNbbmFtZV0ubmFtZSA9IG5hbWVcblxuXHRpbml0Q29sb3JTY2hlbWU6ID0+XG5cdFx0c2NtID0gbmV3IENvbG9yU2NoZW1lKClcblx0XHRodWUgPSBhcHAuZ2V0UmFuZG9tKDAuMiwgMzU5LCAxKVxuXG5cdFx0c2NtLmZyb21faHVlKGh1ZSlcblx0XHQuc2NoZW1lKCd0ZXRyYWRlJylcblx0XHQuZGlzdGFuY2UoMC4xKVxuXHRcdC5hZGRfY29tcGxlbWVudChmYWxzZSlcblx0XHQudmFyaWF0aW9uKCdzb2Z0Jylcblx0XHQud2ViX3NhZmUoZmFsc2UpXG5cdFx0QGNvbG9yU2NoZW1lID0gc2NtLmNvbG9ycygpXG5cblx0Z2V0UmFuZG9tOiAobWluID0gMCxtYXggPSAxMDAsZGVjaW1hbCA9IDApIC0+XG5cdFx0KyhNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pLnRvRml4ZWQoZGVjaW1hbClcblxuXHQjIHVzZSB0aGlzIGZ1bmN0aW9uIGlmIHlvdSB3YW50IHRvIGFkZCB5b3VyIG93biBnZW5lcmF0b3IsIGFuZCBkbyBub3Qga25vdyBob3cgdG8gZG8gdGhpc1xuXHRnZXRHZW5lcmF0b3JzID0gPT5cblx0XHRnZW5lcmF0b3JzTGlzdCA9IFtcblx0XHRcdCMgJ3NjcmlwdHMvZ2VuZXJhdG9ycy9yYW5kb20tY3NzLWdyYWRpZW50LWdlbmVyYXRvci5qcydcblx0XHRdXG5cdFx0Z2VuZXJhdG9yc0NvdW50ZXIgPSAwXG5cdFx0aWYgZ2VuZXJhdG9yc0xpc3QubGVuZ3RoID4wXG5cdFx0XHRmb3IgaSBpbiBbMC4uLmdlbmVyYXRvcnNMaXN0Lmxlbmd0aF1cblx0XHRcdFx0JC5nZXQgZ2VuZXJhdG9yc0xpc3RbaV0sKHJlcykgLT4gXG5cdFx0XHRcdFx0Z2VuZXJhdG9yc0NvdW50ZXIrK1xuXHRcdFx0XHRcdGlmIGdlbmVyYXRvcnNDb3VudGVyIGlzIGdlbmVyYXRvcnNMaXN0Lmxlbmd0aFxuXHRcdFx0XHRcdFx0cmVhZHlUaW1lID0gRGF0ZS5ub3coKVxuXHRcdFx0XHRcdFx0Y29uc29sZS5pbmZvICdnZW5lcmF0b3JzIGxvYWRlZCBhdCA6ICcgKyAocmVhZHlUaW1lLXN0YXJ0VGltZSkgKyAnIG1pbGlzZWNvbmRzJ1xuXHRcdGVsc2Vcblx0XHRcdCdubyBwbHVnaW4nXG5cblx0Z2VuZXJhdG9ycyA6IHt9XG5cblx0c3RhcnRlZCA6IGZhbHNlXG5cblxuQGFwcCA9IG5ldyBBcHBcblxualF1ZXJ5ID0+XG5cdEBhcHAuc3RhcnQoKVxuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=