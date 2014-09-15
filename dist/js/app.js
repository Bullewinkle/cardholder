(function() {
  var delay,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  delay = function(ms, fn) {
    return setTimeout(ms, fn);
  };

  window.App = (function(_super) {
    var getGenerators;

    __extends(App, _super);

    function App() {
      return App.__super__.constructor.apply(this, arguments);
    }

    App.prototype.logger = false;

    App.prototype.view = new Backbone.View({
      el: $('#app')
    });

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

    return App;

  })(Marionette.Application);

  window.app = new App;

  window.app.module('Common');

  window.app.addInitializer(function() {
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

//# sourceMappingURL=data:application/json;base64,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Q0FBL0MsR0FBa0UsR0FBbEUsR0FBb0UsQ0FBQSxJQUFJLENBQUMsVUFBTCxDQUFBLENBQUEsQ0FBcEUsR0FBdUYsR0FBdkYsR0FBeUYsQ0FBQSxJQUFJLENBQUMsZUFBTCxDQUFBLENBQUEsQ0FBdkcsRUFBa0ksSUFBbEksRUFGRDtTQURZO01BQUEsRUFBQTtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBYixDQUFBLENBQUE7QUFBQSxJQUlBLElBQUMsQ0FBQSxTQUFELEdBQWEsSUFBSSxDQUFDLEdBQUwsQ0FBQSxDQUpiLENBQUE7QUFBQSxJQUtBLElBQUMsQ0FBQSxPQUFELENBQVMsWUFBVCxDQUxBLENBQUE7QUFBQSxJQU9BLElBQUMsQ0FBQSxVQUFELEdBQWtCLElBQUEsSUFBQyxDQUFBLE1BQU0sQ0FBQyxVQUFSLENBQUEsQ0FQbEIsQ0FBQTtBQUFBLElBUUEsSUFBQyxDQUFBLE1BQUQsR0FBYyxJQUFBLElBQUMsQ0FBQSxNQUFNLENBQUMsTUFBUixDQUFlO0FBQUEsTUFBQSxVQUFBLEVBQVksSUFBQyxDQUFBLFVBQWI7S0FBZixDQVJkLENBQUE7QUFVQSxJQUFBLElBQUcsQ0FBQSxRQUFZLENBQUMsT0FBTyxDQUFDLE9BQXhCO2FBQ0MsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFqQixDQUNDO0FBQUEsUUFBQSxTQUFBLEVBQVcsSUFBWDtPQURELEVBREQ7S0FYeUI7RUFBQSxDQUExQixDQW5DQSxDQUFBOztBQUFBLEVBa0RBLE1BQUEsQ0FBTyxDQUFBLFNBQUEsS0FBQSxHQUFBO1dBQUEsU0FBQSxHQUFBO2FBQ04sTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFYLENBQUEsRUFETTtJQUFBLEVBQUE7RUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQVAsQ0FsREEsQ0FBQTtBQUFBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImRlbGF5ID0gKG1zLCBmbikgLT4gc2V0VGltZW91dCBtcywgZm5cblxuY2xhc3Mgd2luZG93LkFwcCBleHRlbmRzIE1hcmlvbmV0dGUuQXBwbGljYXRpb25cblx0bG9nZ2VyOiBvZmZcblx0XG5cdHZpZXc6IG5ldyBCYWNrYm9uZS5WaWV3XG5cdFx0ZWw6ICQoJyNhcHAnKVxuXG5cdHJlZ2lvbnM6XG5cdFx0bWFpblJlZ2lvbjogJyNhcHAnXG5cdFx0XG5cdGdldFJhbmRvbTogKG1pbiA9IDAsbWF4ID0gMTAwLGRlY2ltYWwgPSAwKSAtPlxuXHRcdCsoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKS50b0ZpeGVkKGRlY2ltYWwpXG5cblx0IyB1c2UgdGhpcyBmdW5jdGlvbiBpZiB5b3Ugd2FudCB0byBhZGQgeW91ciBvd24gZ2VuZXJhdG9yLCBhbmQgZG8gbm90IGtub3cgaG93IHRvIGRvIHRoaXNcblx0Z2V0R2VuZXJhdG9ycyA9ID0+XG5cdFx0Z2VuZXJhdG9yc0xpc3QgPSBbXG5cdFx0XHQjICdzY3JpcHRzL2dlbmVyYXRvcnMvcmFuZG9tLWNzcy1ncmFkaWVudC1nZW5lcmF0b3IuanMnXG5cdFx0XVxuXHRcdGdlbmVyYXRvcnNDb3VudGVyID0gMFxuXHRcdGlmIGdlbmVyYXRvcnNMaXN0Lmxlbmd0aCA+MFxuXHRcdFx0Zm9yIGkgaW4gWzAuLi5nZW5lcmF0b3JzTGlzdC5sZW5ndGhdXG5cdFx0XHRcdCQuZ2V0IGdlbmVyYXRvcnNMaXN0W2ldLChyZXMpIC0+IFxuXHRcdFx0XHRcdGdlbmVyYXRvcnNDb3VudGVyKytcblx0XHRcdFx0XHRpZiBnZW5lcmF0b3JzQ291bnRlciBpcyBnZW5lcmF0b3JzTGlzdC5sZW5ndGhcblx0XHRcdFx0XHRcdHJlYWR5VGltZSA9IERhdGUubm93KClcblx0XHRcdFx0XHRcdGNvbnNvbGUuaW5mbyAnZ2VuZXJhdG9ycyBsb2FkZWQgYXQgOiAnICsgKHJlYWR5VGltZS1zdGFydFRpbWUpICsgJyBtaWxpc2Vjb25kcydcblx0XHRlbHNlXG5cdFx0XHQnbm8gcGx1Z2luJ1xuXG5cdGdlbmVyYXRvcnMgOiB7fVxuXG5cbndpbmRvdy5hcHAgPSBuZXcgQXBwXG53aW5kb3cuYXBwLm1vZHVsZSAnQ29tbW9uJ1xud2luZG93LmFwcC5hZGRJbml0aWFsaXplciAtPlxuXHRAYmluZCAnYWxsJywgKHRyaWdnZXIsIGFyZ3MpID0+IFxuXHRcdGlmIEBsb2dnZXIgaXMgb25cblx0XHRcdGRhdGUgPSBuZXcgRGF0ZSgpXG5cdFx0XHRjb25zb2xlLmluZm8oXCJBcHAgc2F5cyA6ICN7IHRyaWdnZXIgfSBhdCAje2RhdGUuZ2V0SG91cnMoKX06I3tkYXRlLmdldE1pbnV0ZXMoKX06I3tkYXRlLmdldFNlY29uZHMoKX0uI3tkYXRlLmdldE1pbGxpc2Vjb25kcygpfVwiICxhcmdzKVxuXHRAc3RhcnRUaW1lID0gRGF0ZS5ub3coKVxuXHRAdHJpZ2dlciAnaW5pdGlhbGl6ZSdcblxuXHRAY29udHJvbGxlciA9IG5ldyBAQ29tbW9uLkNvbnRyb2xsZXIoKVxuXHRAcm91dGVyID0gbmV3IEBDb21tb24uUm91dGVyIGNvbnRyb2xsZXI6IEBjb250cm9sbGVyXG5cblx0aWYgbm90IEJhY2tib25lLmhpc3Rvcnkuc3RhcnRlZFxuXHRcdEJhY2tib25lLmhpc3Rvcnkuc3RhcnRcblx0XHRcdHB1c2hTdGF0ZTogdHJ1ZVxuXG5qUXVlcnkgPT5cblx0d2luZG93LmFwcC5zdGFydCgpXG5cbiJdfQ==