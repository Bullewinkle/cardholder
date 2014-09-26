(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('CardGenerator.cards', function(Cards) {
    return Cards.CardsCollection = (function(_super) {
      __extends(CardsCollection, _super);

      function CardsCollection() {
        return CardsCollection.__super__.constructor.apply(this, arguments);
      }

      CardsCollection.prototype.logging = false;

      CardsCollection.prototype.url = '/api/cards-generator';

      CardsCollection.prototype.initialize = function() {
        this.bind('all', (function(_this) {
          return function() {
            if (_this.logging === true) {
              return console.log("CARDS COLLECTION:\t", arguments);
            }
          };
        })(this));
        this.model = Cards.CardModel;
        this.reset(dataFromServer.cardsConfig);
        return this.trigger('ready');
      };

      return CardsCollection;

    })(Backbone.Collection);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZ2VuZXJhdG9yL2NhcmRzL2NhcmRzLWNvbGxlY3Rpb24uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTttU0FBQTs7QUFBQSxFQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxDQUFZLHFCQUFaLEVBQW1DLFNBQUMsS0FBRCxHQUFBO1dBQzVCLEtBQUssQ0FBQztBQUNYLHdDQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSxnQ0FBQSxPQUFBLEdBQVMsS0FBVCxDQUFBOztBQUFBLGdDQUVBLEdBQUEsR0FBSyxzQkFGTCxDQUFBOztBQUFBLGdDQUlBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDWCxRQUFBLElBQUMsQ0FBQSxJQUFELENBQU0sS0FBTixFQUFhLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO0FBQ1osWUFBQSxJQUFnRCxLQUFDLENBQUEsT0FBRCxLQUFZLElBQTVEO3FCQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVkscUJBQVosRUFBbUMsU0FBbkMsRUFBQTthQURZO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBYixDQUFBLENBQUE7QUFBQSxRQUVBLElBQUMsQ0FBQSxLQUFELEdBQVMsS0FBSyxDQUFDLFNBRmYsQ0FBQTtBQUFBLFFBR0EsSUFBQyxDQUFBLEtBQUQsQ0FBTyxjQUFjLENBQUMsV0FBdEIsQ0FIQSxDQUFBO2VBSUEsSUFBQyxDQUFBLE9BQUQsQ0FBUyxPQUFULEVBTFc7TUFBQSxDQUpaLENBQUE7OzZCQUFBOztPQURtQyxRQUFRLENBQUMsWUFEWDtFQUFBLENBQW5DLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRfZ2VuZXJhdG9yL2NhcmRzL2NhcmRzLWNvbGxlY3Rpb24uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJAYXBwLm1vZHVsZSAnQ2FyZEdlbmVyYXRvci5jYXJkcycsIChDYXJkcykgLT5cblx0Y2xhc3MgQ2FyZHMuQ2FyZHNDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblx0XHRcblx0XHRsb2dnaW5nOiBvZmZcblxuXHRcdHVybDogJy9hcGkvY2FyZHMtZ2VuZXJhdG9yJ1xuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdEBiaW5kICdhbGwnLCA9PlxuXHRcdFx0XHRjb25zb2xlLmxvZyBcIkNBUkRTIENPTExFQ1RJT046XFx0XCIsIGFyZ3VtZW50cyBpZiBAbG9nZ2luZyBpcyBvblxuXHRcdFx0QG1vZGVsID0gQ2FyZHMuQ2FyZE1vZGVsXG5cdFx0XHRAcmVzZXQgZGF0YUZyb21TZXJ2ZXIuY2FyZHNDb25maWdcblx0XHRcdEB0cmlnZ2VyICdyZWFkeSdcbiJdfQ==