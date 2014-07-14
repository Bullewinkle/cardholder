(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.App.CardsCollection = App.CardsCollection = (function(_super) {
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

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbnMvY2FyZHMtY29sbGVjdGlvbi5qcyIsInNvdXJjZXMiOlsiY2FyZHMtY29sbGVjdGlvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBO21TQUFBOztBQUFBLEVBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxlQUFMLEdBQTZCLEdBQUcsQ0FBQztBQUNoQyxzQ0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsOEJBQUEsR0FBQSxHQUFLLFFBQUwsQ0FBQTs7QUFBQSw4QkFDQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBQ1gsTUFBQSxJQUFDLENBQUEsS0FBRCxHQUFTLEdBQUcsQ0FBQyxTQUFiLENBQUE7YUFDQSxJQUFDLENBQUEsT0FBRCxDQUFTLE9BQVQsRUFGVztJQUFBLENBRFosQ0FBQTs7MkJBQUE7O0tBRHdELFFBQVEsQ0FBQyxXQUFsRSxDQUFBO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6W251bGxdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==