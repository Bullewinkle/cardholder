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
      this.registerGenerator = __bind(this.registerGenerator, this);
      this.cacheNodes = __bind(this.cacheNodes, this);
      this.intervalRenderer = __bind(this.intervalRenderer, this);
      return App.__super__.constructor.apply(this, arguments);
    }

    App.prototype.logger = false;

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

    App.prototype.registerGenerator = function(name, cb) {
      this.generators[name] = cb(Generator);
      return this.generators[name].name = name;
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
    var date;
    console.info('App started');
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
    return Backbone.history.start();
  });

  jQuery((function(_this) {
    return function() {
      return _this.app.start();
    };
  })(this));

}).call(this);

//# sourceMappingURL=data:application/json;base64,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QUwsQ0FBQSxDQVZiLENBQUE7QUFBQSxJQVdBLElBQUMsQ0FBQSxPQUFELENBQVMsT0FBVCxFQUFrQixLQUFBLEdBQVEsSUFBSSxDQUFDLFFBQUwsQ0FBQSxDQUFSLEdBQTBCLEdBQTFCLEdBQWdDLElBQUksQ0FBQyxVQUFMLENBQUEsQ0FBaEMsR0FBb0QsR0FBcEQsR0FBMEQsSUFBSSxDQUFDLFVBQUwsQ0FBQSxDQUExRCxHQUE4RSxHQUE5RSxHQUFvRixJQUFJLENBQUMsZUFBTCxDQUFBLENBQXRHLENBWEEsQ0FBQTtXQW9DQSxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQWpCLENBQUEsRUFyQ21CO0VBQUEsQ0FBcEIsQ0EzSEEsQ0FBQTs7QUFBQSxFQWtLQSxNQUFBLENBQU8sQ0FBQSxTQUFBLEtBQUEsR0FBQTtXQUFBLFNBQUEsR0FBQTthQUNOLEtBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxDQUFBLEVBRE07SUFBQSxFQUFBO0VBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFQLENBbEtBLENBQUE7QUFBQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJkZWxheSA9IChtcywgZm4pIC0+IHNldFRpbWVvdXQgbXMsIGZuXG5cbkBHZW5lcmF0b3IgPSBjbGFzcyBHZW5lcmF0b3JcblxuXHRjb25zdHJ1Y3RvcjogKGNvbmZpZykgLT5cblx0XHQkLmV4dGVuZCh0cnVlLEAsIGNvbmZpZy5tZXRob2RzKVxuXHRcdCQuZXh0ZW5kKHRydWUsQG9wdGlvbnMsIGNvbmZpZy5vcHRpb25zKVxuXHRcdFxuXHRvcHRpb25zOiB7fVxuXG5cdGFkZE9wdGlvbjogKG5hbWUsIHR5cGUgPSAnc3RyaW5nJywgdmFsID0gJycpID0+XG5cdFx0QHNldHRpbmdzW25hbWVdID0gXG5cdFx0XHR0eXBlOiB0eXBlXG5cdFx0XHR2YWw6IHZhbFxuXG5cdGdldE9wdGlvbjogPT5cblx0XHRyZXR1cm4gQHNldHRpbmdzIFxuXG5cbkBSb3V0ZXIgPSBjbGFzcyBSb3V0ZXIgZXh0ZW5kcyBCYWNrYm9uZS5Sb3V0ZXJcblx0bG9nZ2VyOiBvZmZcblxuXHRpbml0aWFsaXplOiA9PlxuXHRcdEBiaW5kICdhbGwnLCAodHJpZ2dlciwgYXJncykgPT4gXG5cdFx0XHRpZiBAbG9nZ2VyIGlzIG9uXG5cdFx0XHRcdGNvbnNvbGUuaW5mbyAnUm91dGVyIHNheXMgOicsdHJpZ2dlcixhcmdzXG5cblx0cm91dGVzOlxuXHRcdCcoLyknIDogJ3Jvb3QnXG5cdFx0J2pzb24nIDogJ2dldEpzb24nXG5cblx0Z2V0SnNvbjogPT5cblx0XHRjb25zb2xlLmxvZyB3aW5kb3cubG9jYXRpb24uaHJlZlxuXHRcdCQoJyNhcHAnKS5maW5kKCcuY2FyZHMnKS5oaWRlKClcblx0XHQkKCcjYXBwJykuZmluZCgnLmpzX2pzb25fcm91dGUnKS50ZXh0KCdCYWNrJykuYXR0cignaHJlZicsJyMnKVxuXG5cdFx0bWFpbkpzb24gPSB7fVxuXHRcdG1haW5Kc29uLmNhcmRzQ29sbGVjdGlvbiA9IGFwcC5jYXJkc0NvbGxlY3Rpb24udG9KU09OKClcblx0XHRtYWluSnNvbi51c2VyQWdlbnQgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudFxuXHRcdCQoJyNhcHAnKS5hcHBlbmQgJzxwcmUgaWQ9XCJtYWluLWpzb25cIj4nICsgSlNPTi5zdHJpbmdpZnkobWFpbkpzb24sIG51bGwsIFwiXFx0XCIpICsgJzwvcHJlPidcblxuXHRyb290OiA9PlxuXHRcdGNvbnNvbGUubG9nIHdpbmRvdy5sb2NhdGlvbi5ocmVmXG5cdFx0JCgnI2FwcCcpLmZpbmQoJy5qc19qc29uX3JvdXRlJykudGV4dCgnVmlldyBKU09OJykuYXR0cignaHJlZicsJyMvanNvbicpXG5cdFx0JCgnI21haW4tanNvbicpLnJlbW92ZSgpXG5cdFx0JCgnI2FwcCcpLmZpbmQoJy5jYXJkcycpLnNob3coKVxuXG5AQXBwID0gY2xhc3MgQXBwIGV4dGVuZHMgTWFyaW9uZXR0ZS5BcHBsaWNhdGlvblxuXHRsb2dnZXI6IG9mZlxuXG5cdCMgcm91dGVyOiBuZXcgUm91dGVyXG5cdFxuXHR2aWV3OiBuZXcgQmFja2JvbmUuVmlld1xuXHRcdGVsOiAkKCcjYXBwJylcblxuXHRpbnRlcnZhbFJlbmRlcmVyOiA9PlxuXHRcdHByZXZDYXJkID0ge31cblxuXHRcdHJlbmRlclJhbmRvbSA9ID0+XG5cdFx0XHRcblx0XHRcdHJhbmRvbU1vZGVsID0gYXBwLmNhcmRzQ29sbGVjdGlvbi5nZXQgYXBwLmdldFJhbmRvbSgxLGFwcC5jYXJkc0NvbGxlY3Rpb24ubGVuZ3RoKVxuXHRcdFx0aWYgcmFuZG9tTW9kZWwgaXNudCBwcmV2Q2FyZFxuXG5cdFx0XHRcdHByZXZDYXJkID0gcmFuZG9tTW9kZWxcblx0XHRcdFx0XG5cdFx0XHRcdCMgU2V0IGRlZmF1dCB2YWx1ZXNcblx0XHRcdFx0cmFuZG9tTW9kZWwuc2V0ICdnZW5lcmF0b3JzLmdyYWRpZW50R2VuJywgcmFuZG9tTW9kZWwuZGVmYXVsdHMuZ2VuZXJhdG9ycy5ncmFkaWVudEdlbixcblx0XHRcdFx0XHRzaWxlbnQ6IHRydWVcblx0XHRcdFx0cmFuZG9tTW9kZWwuc2V0ICdkYXRhJywgcmFuZG9tTW9kZWwuZGVmYXVsdHMuZGF0YSxcblx0XHRcdFx0XHRzaWxlbnQ6IHRydWVcblxuXHRcdFx0XHQjIElmIG5vdCBob3ZlciBhbmQgbm90IGxvY2tlZCAtIGFuaW1hdGVkIHJlbmRlclxuXHRcdFx0XHRpZiByYW5kb21Nb2RlbC52aWV3LiRlbC5pcygnOm5vdCg6aG92ZXIpJykgYW5kIG5vdCByYW5kb21Nb2RlbC52aWV3LiRlbC5oYXNDbGFzcygnbG9ja2VkJylcblx0XHRcdFx0XHRyYW5kb21Nb2RlbC52aWV3LmFuaW1hdGVkUmVuZGVyKClcblxuXHRcdFx0ZWxzZSByZW5kZXJSYW5kb20oKVxuXG5cdFx0c2V0SW50ZXJ2YWwgcmVuZGVyUmFuZG9tLCAyMDAwXG5cblx0Y2FjaGVOb2RlczogPT5cblx0XHRAcm9vdE5vZGUgPSAkKCcuY2FyZHMnKS5lcSgwKVxuXG5cdHJlZ2lzdGVyR2VuZXJhdG9yOiAobmFtZSwgY2IpID0+IFxuXHRcdEBnZW5lcmF0b3JzW25hbWVdID0gY2IoR2VuZXJhdG9yKVxuXHRcdEBnZW5lcmF0b3JzW25hbWVdLm5hbWUgPSBuYW1lXG5cblx0IyBpbml0Q29sb3JTY2hlbWU6ID0+XG5cdCMgXHRzY20gPSBuZXcgQ29sb3JTY2hlbWUoKVxuXHQjIFx0aHVlID0gYXBwLmdldFJhbmRvbSgwLjIsIDM1OSwgMSlcblxuXHQjIFx0c2NtLmZyb21faHVlKGh1ZSlcblx0IyBcdC5zY2hlbWUoJ3RldHJhZGUnKVxuXHQjIFx0LmRpc3RhbmNlKDAuMSlcblx0IyBcdC5hZGRfY29tcGxlbWVudChmYWxzZSlcblx0IyBcdC52YXJpYXRpb24oJ3NvZnQnKVxuXHQjIFx0LndlYl9zYWZlKGZhbHNlKVxuXHQjIFx0QGNvbG9yU2NoZW1lID0gc2NtLmNvbG9ycygpXG5cblx0Z2V0UmFuZG9tOiAobWluID0gMCxtYXggPSAxMDAsZGVjaW1hbCA9IDApIC0+XG5cdFx0KyhNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pLnRvRml4ZWQoZGVjaW1hbClcblxuXHQjIHVzZSB0aGlzIGZ1bmN0aW9uIGlmIHlvdSB3YW50IHRvIGFkZCB5b3VyIG93biBnZW5lcmF0b3IsIGFuZCBkbyBub3Qga25vdyBob3cgdG8gZG8gdGhpc1xuXHRnZXRHZW5lcmF0b3JzID0gPT5cblx0XHRnZW5lcmF0b3JzTGlzdCA9IFtcblx0XHRcdCMgJ3NjcmlwdHMvZ2VuZXJhdG9ycy9yYW5kb20tY3NzLWdyYWRpZW50LWdlbmVyYXRvci5qcydcblx0XHRdXG5cdFx0Z2VuZXJhdG9yc0NvdW50ZXIgPSAwXG5cdFx0aWYgZ2VuZXJhdG9yc0xpc3QubGVuZ3RoID4wXG5cdFx0XHRmb3IgaSBpbiBbMC4uLmdlbmVyYXRvcnNMaXN0Lmxlbmd0aF1cblx0XHRcdFx0JC5nZXQgZ2VuZXJhdG9yc0xpc3RbaV0sKHJlcykgLT4gXG5cdFx0XHRcdFx0Z2VuZXJhdG9yc0NvdW50ZXIrK1xuXHRcdFx0XHRcdGlmIGdlbmVyYXRvcnNDb3VudGVyIGlzIGdlbmVyYXRvcnNMaXN0Lmxlbmd0aFxuXHRcdFx0XHRcdFx0cmVhZHlUaW1lID0gRGF0ZS5ub3coKVxuXHRcdFx0XHRcdFx0Y29uc29sZS5pbmZvICdnZW5lcmF0b3JzIGxvYWRlZCBhdCA6ICcgKyAocmVhZHlUaW1lLXN0YXJ0VGltZSkgKyAnIG1pbGlzZWNvbmRzJ1xuXHRcdGVsc2Vcblx0XHRcdCdubyBwbHVnaW4nXG5cblx0Z2VuZXJhdG9ycyA6IHt9XG5cblx0c3RhcnRlZCA6IGZhbHNlXG5cblxuQGFwcCA9IG5ldyBBcHBcbkBhcHAuYWRkSW5pdGlhbGl6ZXIgLT5cblx0Y29uc29sZS5pbmZvICdBcHAgc3RhcnRlZCdcblx0ZGF0ZSA9IG5ldyBEYXRlKClcblx0QHRyaWdnZXIgJ2luaXRpYWxpemUnLCAnYXQgJyArIGRhdGUuZ2V0SG91cnMoKSArICc6JyArIGRhdGUuZ2V0TWludXRlcygpICsgJzonICsgZGF0ZS5nZXRTZWNvbmRzKCkgKyAnLicgKyBkYXRlLmdldE1pbGxpc2Vjb25kcygpXG5cdEBiaW5kICdhbGwnLCAodHJpZ2dlciwgYXJncykgPT4gXG5cdFx0aWYgQGxvZ2dlciBpcyBvblxuXHRcdFx0Y29uc29sZS5pbmZvICdBcHAgc2F5cyA6Jyx0cmlnZ2VyLGFyZ3NcblxuXG5cdEBzdGFydGVkID0gdHJ1ZVxuXHRkYXRlID0gbmV3IERhdGUoKVxuXHRAc3RhcnRUaW1lID0gRGF0ZS5ub3coKVxuXHRAdHJpZ2dlciAnc3RhcnQnLCAnYXQgJyArIGRhdGUuZ2V0SG91cnMoKSArICc6JyArIGRhdGUuZ2V0TWludXRlcygpICsgJzonICsgZGF0ZS5nZXRTZWNvbmRzKCkgKyAnLicgKyBkYXRlLmdldE1pbGxpc2Vjb25kcygpXG5cdCMgQGluaXRDb2xvclNjaGVtZSgpXG5cblxuXHQjIEBjb250cm9sbGVyTW9kZWwgPSBuZXcgQXBwLk1haW5Db250cm9sbGVyTW9kZWxcblx0IyBAY29udHJvbGxlclZpZXcgPSBuZXcgQXBwLk1haW5Db250cm9sbGVyVmlld1xuXHQjIFx0ZWw6ICQoJy5tYWluX2NvbnRyb2xsZXJfd3JhcHBlcicpXG5cdCMgXHRtb2RlbDogQGNvbnRyb2xsZXJNb2RlbFxuXG5cdCMgQGNhcmRzQ29sbGVjdGlvbiA9IG5ldyBBcHAuQ2FyZHNDb2xsZWN0aW9uXG5cdCMgQGNhcmRzQ29sbGVjdGlvbi5yZXNldCBkYXRhRnJvbVNlcnZlci5jYXJkc0NvbmZpZ1xuXG5cdCMgQGNhcmRzQ29sbGVjdGlvblZpZXcgPSBuZXcgQXBwLkNhcmRzQ29sbGVjdGlvblZpZXdcblx0IyBcdGVsOiAkKCcuY2FyZHMnLCcjYXBwJylcblx0IyBcdGNvbGxlY3Rpb246IEBjYXJkc0NvbGxlY3Rpb25cblxuXHQjIG9uUmVzaXplID0gXy5kZWJvdW5jZSA9PlxuXHQjIFx0QHRyaWdnZXIgJ3Jlc2l6ZSdcblx0IyBcdGNvbnNvbGUubG9nICBAY2FyZHNDb2xsZWN0aW9uVmlldy4kZWwuaGVpZ2h0KClcblxuXHQjICQod2luZG93KS5vblxuXHQjIFx0cmVzaXplOiBvblJlc2l6ZVxuXHRcblx0IyBAaW50ZXJ2YWxSZW5kZXJlcigpXG5cdFxuXHRCYWNrYm9uZS5oaXN0b3J5LnN0YXJ0KClcblxualF1ZXJ5ID0+XG5cdEBhcHAuc3RhcnQoKVxuXG4iXX0=