(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('CardGenerator.collections', function(collections) {
    return collections.CardsCollection = (function(_super) {
      __extends(CardsCollection, _super);

      function CardsCollection() {
        return CardsCollection.__super__.constructor.apply(this, arguments);
      }

      CardsCollection.prototype.url = '/cards';

      CardsCollection.prototype.initialize = function() {
        this.model = App.CardModel;
        return this.trigger('ready');
      };

      return CardsCollection;

    })(Backbone.Collection);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzX2dlbmVyYXRvci9jb2xsZWN0aW9ucy9jYXJkcy1jb2xsZWN0aW9uLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7bVNBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSwyQkFBWixFQUF5QyxTQUFDLFdBQUQsR0FBQTtXQUNsQyxXQUFXLENBQUM7QUFDakIsd0NBQUEsQ0FBQTs7OztPQUFBOztBQUFBLGdDQUFBLEdBQUEsR0FBSyxRQUFMLENBQUE7O0FBQUEsZ0NBQ0EsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNYLFFBQUEsSUFBQyxDQUFBLEtBQUQsR0FBUyxHQUFHLENBQUMsU0FBYixDQUFBO2VBQ0EsSUFBQyxDQUFBLE9BQUQsQ0FBUyxPQUFULEVBRlc7TUFBQSxDQURaLENBQUE7OzZCQUFBOztPQUR5QyxRQUFRLENBQUMsWUFEWDtFQUFBLENBQXpDLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRzX2dlbmVyYXRvci9jb2xsZWN0aW9ucy9jYXJkcy1jb2xsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiQGFwcC5tb2R1bGUgJ0NhcmRHZW5lcmF0b3IuY29sbGVjdGlvbnMnLCAoY29sbGVjdGlvbnMpIC0+XG5cdGNsYXNzIGNvbGxlY3Rpb25zLkNhcmRzQ29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cblx0XHR1cmw6ICcvY2FyZHMnXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdEBtb2RlbCA9IEFwcC5DYXJkTW9kZWxcblx0XHRcdEB0cmlnZ2VyICdyZWFkeSdcbiJdfQ==