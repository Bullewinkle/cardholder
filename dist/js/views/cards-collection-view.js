(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  this.App.CardsCollectionView = App.CardsCollectionView = (function(_super) {
    __extends(CardsCollectionView, _super);

    function CardsCollectionView() {
      this.change = __bind(this.change, this);
      this.render = __bind(this.render, this);
      return CardsCollectionView.__super__.constructor.apply(this, arguments);
    }

    CardsCollectionView.prototype.initialize = function() {
      this.listenToOnce(this.collection, "add", this.render);
      this.listenTo(this.collection, "change", this.change);
      return this.render();
    };

    CardsCollectionView.prototype.render = function(model, collection) {
      this.$('.card').each((function(_this) {
        return function(i, el) {
          var view;
          view = new App.CardView({
            el: $(el),
            model: _this.collection.models[i]
          });
          return view.render();
        };
      })(this));
      return this;
    };

    CardsCollectionView.prototype.change = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    };

    return CardsCollectionView;

  })(Backbone.View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvY2FyZHMtY29sbGVjdGlvbi12aWV3LmpzIiwic291cmNlcyI6WyJjYXJkcy1jb2xsZWN0aW9uLXZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7O3NCQUFBOztBQUFBLEVBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxtQkFBTCxHQUFpQyxHQUFHLENBQUM7QUFFcEMsMENBQUEsQ0FBQTs7Ozs7O0tBQUE7O0FBQUEsa0NBQUEsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUVYLE1BQUEsSUFBQyxDQUFBLFlBQUQsQ0FBYyxJQUFDLENBQUEsVUFBZixFQUEyQixLQUEzQixFQUFrQyxJQUFDLENBQUEsTUFBbkMsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsUUFBRCxDQUFVLElBQUMsQ0FBQSxVQUFYLEVBQXVCLFFBQXZCLEVBQWlDLElBQUMsQ0FBQSxNQUFsQyxDQURBLENBQUE7YUFHQSxJQUFDLENBQUEsTUFBRCxDQUFBLEVBTFc7SUFBQSxDQUFaLENBQUE7O0FBQUEsa0NBT0EsTUFBQSxHQUFRLFNBQUMsS0FBRCxFQUFRLFVBQVIsR0FBQTtBQUVQLE1BQUEsSUFBQyxDQUFBLENBQUQsQ0FBRyxPQUFILENBQVcsQ0FBQyxJQUFaLENBQWlCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLENBQUQsRUFBRyxFQUFILEdBQUE7QUFDaEIsY0FBQSxJQUFBO0FBQUEsVUFBQSxJQUFBLEdBQVcsSUFBQSxHQUFHLENBQUMsUUFBSixDQUNWO0FBQUEsWUFBQSxFQUFBLEVBQUksQ0FBQSxDQUFFLEVBQUYsQ0FBSjtBQUFBLFlBQ0EsS0FBQSxFQUFPLEtBQUMsQ0FBQSxVQUFVLENBQUMsTUFBTyxDQUFBLENBQUEsQ0FEMUI7V0FEVSxDQUFYLENBQUE7aUJBR0EsSUFBSSxDQUFDLE1BQUwsQ0FBQSxFQUpnQjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWpCLENBQUEsQ0FBQTthQUtBLEtBUE87SUFBQSxDQVBSLENBQUE7O0FBQUEsa0NBZ0JBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFBVyxVQUFBLElBQUE7QUFBQSxNQUFWLDhEQUFVLENBQVg7SUFBQSxDQWhCUixDQUFBOzsrQkFBQTs7S0FGZ0UsUUFBUSxDQUFDLEtBQTFFLENBQUE7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbbnVsbF0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9