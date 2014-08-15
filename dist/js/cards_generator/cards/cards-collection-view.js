(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  this.app.module('CardGenerator.cards', function(Cards) {
    return Cards.CardsCollectionView = (function(_super) {
      __extends(CardsCollectionView, _super);

      function CardsCollectionView() {
        this.change = __bind(this.change, this);
        this.render = __bind(this.render, this);
        return CardsCollectionView.__super__.constructor.apply(this, arguments);
      }

      CardsCollectionView.prototype.initialize = function() {
        console.log('Initialize: CardGenerator.views.CardsCollectionView');
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

    })(Marionette.CollectionView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzX2dlbmVyYXRvci9jYXJkcy9jYXJkcy1jb2xsZWN0aW9uLXZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7O3NCQUFBOztBQUFBLEVBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLENBQVkscUJBQVosRUFBbUMsU0FBQyxLQUFELEdBQUE7V0FDNUIsS0FBSyxDQUFDO0FBRVgsNENBQUEsQ0FBQTs7Ozs7O09BQUE7O0FBQUEsb0NBQUEsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNYLFFBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxxREFBWixDQUFBLENBQUE7QUFBQSxRQUVBLElBQUMsQ0FBQSxZQUFELENBQWMsSUFBQyxDQUFBLFVBQWYsRUFBMkIsS0FBM0IsRUFBa0MsSUFBQyxDQUFBLE1BQW5DLENBRkEsQ0FBQTtBQUFBLFFBR0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFDLENBQUEsVUFBWCxFQUF1QixRQUF2QixFQUFpQyxJQUFDLENBQUEsTUFBbEMsQ0FIQSxDQUFBO2VBS0EsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQU5XO01BQUEsQ0FBWixDQUFBOztBQUFBLG9DQVFBLE1BQUEsR0FBUSxTQUFDLEtBQUQsRUFBUSxVQUFSLEdBQUE7QUFFUCxRQUFBLElBQUMsQ0FBQSxDQUFELENBQUcsT0FBSCxDQUFXLENBQUMsSUFBWixDQUFpQixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUMsQ0FBRCxFQUFHLEVBQUgsR0FBQTtBQUNoQixnQkFBQSxJQUFBO0FBQUEsWUFBQSxJQUFBLEdBQVcsSUFBQSxHQUFHLENBQUMsUUFBSixDQUNWO0FBQUEsY0FBQSxFQUFBLEVBQUksQ0FBQSxDQUFFLEVBQUYsQ0FBSjtBQUFBLGNBQ0EsS0FBQSxFQUFPLEtBQUMsQ0FBQSxVQUFVLENBQUMsTUFBTyxDQUFBLENBQUEsQ0FEMUI7YUFEVSxDQUFYLENBQUE7bUJBR0EsSUFBSSxDQUFDLE1BQUwsQ0FBQSxFQUpnQjtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWpCLENBQUEsQ0FBQTtlQUtBLEtBUE87TUFBQSxDQVJSLENBQUE7O0FBQUEsb0NBaUJBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFBVyxZQUFBLElBQUE7QUFBQSxRQUFWLDhEQUFVLENBQVg7TUFBQSxDQWpCUixDQUFBOztpQ0FBQTs7T0FGdUMsVUFBVSxDQUFDLGdCQURqQjtFQUFBLENBQW5DLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRzX2dlbmVyYXRvci9jYXJkcy9jYXJkcy1jb2xsZWN0aW9uLXZpZXcuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJAYXBwLm1vZHVsZSAnQ2FyZEdlbmVyYXRvci5jYXJkcycsIChDYXJkcykgLT5cblx0Y2xhc3MgQ2FyZHMuQ2FyZHNDb2xsZWN0aW9uVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuQ29sbGVjdGlvblZpZXdcblxuXHRcdGluaXRpYWxpemU6IC0+XG5cdFx0XHRjb25zb2xlLmxvZyAnSW5pdGlhbGl6ZTogQ2FyZEdlbmVyYXRvci52aWV3cy5DYXJkc0NvbGxlY3Rpb25WaWV3J1xuXG5cdFx0XHRAbGlzdGVuVG9PbmNlIEBjb2xsZWN0aW9uLCBcImFkZFwiLCBAcmVuZGVyXG5cdFx0XHRAbGlzdGVuVG8gQGNvbGxlY3Rpb24sIFwiY2hhbmdlXCIsIEBjaGFuZ2VcblxuXHRcdFx0QHJlbmRlcigpXG5cdFx0XG5cdFx0cmVuZGVyOiAobW9kZWwsIGNvbGxlY3Rpb24pID0+XG5cblx0XHRcdEAkKCcuY2FyZCcpLmVhY2ggKGksZWwpID0+XG5cdFx0XHRcdHZpZXcgPSBuZXcgQXBwLkNhcmRWaWV3XG5cdFx0XHRcdFx0ZWw6ICQoZWwpXG5cdFx0XHRcdFx0bW9kZWw6IEBjb2xsZWN0aW9uLm1vZGVsc1tpXVxuXHRcdFx0XHR2aWV3LnJlbmRlcigpXG5cdFx0XHR0aGlzXG5cblx0XHRjaGFuZ2U6IChhcmdzLi4uKSA9PiAgICAgICBcblxuXG4iXX0=