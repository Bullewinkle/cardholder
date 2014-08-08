(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('CardGenerator', function(CardGenerator) {
    return CardGenerator.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function() {
        return console.log('Init: Controller1');
      };

      Controller.prototype.index = function() {
        return console.log('Route to index');
      };

      Controller.prototype.any = function() {
        return console.log('Route to any');
      };

      Controller.prototype.notFound = function() {
        return console.log('!!! NOT FOUND !!!');
      };

      return Controller;

    })(Marionette.Controller);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzX2dlbmVyYXRvci9jb250cm9sbGVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7bVNBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxlQUFaLEVBQTZCLFNBQUMsYUFBRCxHQUFBO1dBRXRCLGFBQWEsQ0FBQztBQUVuQixtQ0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsMkJBQUEsVUFBQSxHQUFZLFNBQUEsR0FBQTtlQUNYLE9BQU8sQ0FBQyxHQUFSLENBQVksbUJBQVosRUFEVztNQUFBLENBQVosQ0FBQTs7QUFBQSwyQkFFQSxLQUFBLEdBQU8sU0FBQSxHQUFBO2VBQ04sT0FBTyxDQUFDLEdBQVIsQ0FBWSxnQkFBWixFQURNO01BQUEsQ0FGUCxDQUFBOztBQUFBLDJCQUlBLEdBQUEsR0FBSyxTQUFBLEdBQUE7ZUFDSixPQUFPLENBQUMsR0FBUixDQUFZLGNBQVosRUFESTtNQUFBLENBSkwsQ0FBQTs7QUFBQSwyQkFPQSxRQUFBLEdBQVUsU0FBQSxHQUFBO2VBQ1QsT0FBTyxDQUFDLEdBQVIsQ0FBWSxtQkFBWixFQURTO01BQUEsQ0FQVixDQUFBOzt3QkFBQTs7T0FGc0MsVUFBVSxDQUFDLFlBRnRCO0VBQUEsQ0FBN0IsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZHNfZ2VuZXJhdG9yL2NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJAYXBwLm1vZHVsZSAnQ2FyZEdlbmVyYXRvcicsIChDYXJkR2VuZXJhdG9yKSAtPlxuXG5cdGNsYXNzIENhcmRHZW5lcmF0b3IuQ29udHJvbGxlciBleHRlbmRzIE1hcmlvbmV0dGUuQ29udHJvbGxlclxuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdGNvbnNvbGUubG9nICdJbml0OiBDb250cm9sbGVyMSdcblx0XHRpbmRleDogLT5cblx0XHRcdGNvbnNvbGUubG9nICdSb3V0ZSB0byBpbmRleCdcblx0XHRhbnk6IC0+XG5cdFx0XHRjb25zb2xlLmxvZyAnUm91dGUgdG8gYW55J1xuXG5cdFx0bm90Rm91bmQ6IC0+XG5cdFx0XHRjb25zb2xlLmxvZyAnISEhIE5PVCBGT1VORCAhISEnXG5cblx0IyBAYWRkSW5pdGlhbGl6ZXIgLT5cblx0IyBcdGNvbnNvbGUubG9nICdJbml0OiBDb250cm9sbGVyMicsIEBcblx0IyBcdCMgQGNvbnRyb2xsZXIgPSBuZXcgQENvbnRyb2xsZXIoKVxuXG4iXX0=