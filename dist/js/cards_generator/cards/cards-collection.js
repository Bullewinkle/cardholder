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
        this.reset(app.CardGenerator.data.get('cardsConfig'));
        return this.trigger('ready');
      };

      return CardsCollection;

    })(Backbone.Collection);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzX2dlbmVyYXRvci9jYXJkcy9jYXJkcy1jb2xsZWN0aW9uLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7bVNBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxxQkFBWixFQUFtQyxTQUFDLEtBQUQsR0FBQTtXQUM1QixLQUFLLENBQUM7QUFDWCx3Q0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsZ0NBQUEsT0FBQSxHQUFTLEtBQVQsQ0FBQTs7QUFBQSxnQ0FFQSxHQUFBLEdBQUssc0JBRkwsQ0FBQTs7QUFBQSxnQ0FJQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBQ1gsUUFBQSxJQUFDLENBQUEsSUFBRCxDQUFNLEtBQU4sRUFBYSxDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTtBQUNaLFlBQUEsSUFBZ0QsS0FBQyxDQUFBLE9BQUQsS0FBWSxJQUE1RDtxQkFBQSxPQUFPLENBQUMsR0FBUixDQUFZLHFCQUFaLEVBQW1DLFNBQW5DLEVBQUE7YUFEWTtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWIsQ0FBQSxDQUFBO0FBQUEsUUFFQSxJQUFDLENBQUEsS0FBRCxHQUFTLEtBQUssQ0FBQyxTQUZmLENBQUE7QUFBQSxRQUdBLElBQUMsQ0FBQSxLQUFELENBQU8sR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBdkIsQ0FBMkIsYUFBM0IsQ0FBUCxDQUhBLENBQUE7ZUFJQSxJQUFDLENBQUEsT0FBRCxDQUFTLE9BQVQsRUFMVztNQUFBLENBSlosQ0FBQTs7NkJBQUE7O09BRG1DLFFBQVEsQ0FBQyxZQURYO0VBQUEsQ0FBbkMsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZHNfZ2VuZXJhdG9yL2NhcmRzL2NhcmRzLWNvbGxlY3Rpb24uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJAYXBwLm1vZHVsZSAnQ2FyZEdlbmVyYXRvci5jYXJkcycsIChDYXJkcykgLT5cblx0Y2xhc3MgQ2FyZHMuQ2FyZHNDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblx0XHRcblx0XHRsb2dnaW5nOiBvZmZcblxuXHRcdHVybDogJy9hcGkvY2FyZHMtZ2VuZXJhdG9yJ1xuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdEBiaW5kICdhbGwnLCA9PlxuXHRcdFx0XHRjb25zb2xlLmxvZyBcIkNBUkRTIENPTExFQ1RJT046XFx0XCIsIGFyZ3VtZW50cyBpZiBAbG9nZ2luZyBpcyBvblxuXHRcdFx0QG1vZGVsID0gQ2FyZHMuQ2FyZE1vZGVsXG5cdFx0XHRAcmVzZXQgYXBwLkNhcmRHZW5lcmF0b3IuZGF0YS5nZXQgJ2NhcmRzQ29uZmlnJ1xuXHRcdFx0QHRyaWdnZXIgJ3JlYWR5J1xuIl19