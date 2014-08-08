(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  this.app.module('CardGenerator.views', function(Views) {
    return Views.CardsCollectionView = (function(_super) {
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
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzX2dlbmVyYXRvci92aWV3cy9jYXJkcy1jb2xsZWN0aW9uLXZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7O3NCQUFBOztBQUFBLEVBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLENBQVkscUJBQVosRUFBbUMsU0FBQyxLQUFELEdBQUE7V0FDNUIsS0FBSyxDQUFDO0FBRVgsNENBQUEsQ0FBQTs7Ozs7O09BQUE7O0FBQUEsb0NBQUEsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUVYLFFBQUEsSUFBQyxDQUFBLFlBQUQsQ0FBYyxJQUFDLENBQUEsVUFBZixFQUEyQixLQUEzQixFQUFrQyxJQUFDLENBQUEsTUFBbkMsQ0FBQSxDQUFBO0FBQUEsUUFDQSxJQUFDLENBQUEsUUFBRCxDQUFVLElBQUMsQ0FBQSxVQUFYLEVBQXVCLFFBQXZCLEVBQWlDLElBQUMsQ0FBQSxNQUFsQyxDQURBLENBQUE7ZUFHQSxJQUFDLENBQUEsTUFBRCxDQUFBLEVBTFc7TUFBQSxDQUFaLENBQUE7O0FBQUEsb0NBT0EsTUFBQSxHQUFRLFNBQUMsS0FBRCxFQUFRLFVBQVIsR0FBQTtBQUVQLFFBQUEsSUFBQyxDQUFBLENBQUQsQ0FBRyxPQUFILENBQVcsQ0FBQyxJQUFaLENBQWlCLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQyxDQUFELEVBQUcsRUFBSCxHQUFBO0FBQ2hCLGdCQUFBLElBQUE7QUFBQSxZQUFBLElBQUEsR0FBVyxJQUFBLEdBQUcsQ0FBQyxRQUFKLENBQ1Y7QUFBQSxjQUFBLEVBQUEsRUFBSSxDQUFBLENBQUUsRUFBRixDQUFKO0FBQUEsY0FDQSxLQUFBLEVBQU8sS0FBQyxDQUFBLFVBQVUsQ0FBQyxNQUFPLENBQUEsQ0FBQSxDQUQxQjthQURVLENBQVgsQ0FBQTttQkFHQSxJQUFJLENBQUMsTUFBTCxDQUFBLEVBSmdCO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBakIsQ0FBQSxDQUFBO2VBS0EsS0FQTztNQUFBLENBUFIsQ0FBQTs7QUFBQSxvQ0FnQkEsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUFXLFlBQUEsSUFBQTtBQUFBLFFBQVYsOERBQVUsQ0FBWDtNQUFBLENBaEJSLENBQUE7O2lDQUFBOztPQUZ1QyxRQUFRLENBQUMsTUFEZjtFQUFBLENBQW5DLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRzX2dlbmVyYXRvci92aWV3cy9jYXJkcy1jb2xsZWN0aW9uLXZpZXcuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJAYXBwLm1vZHVsZSAnQ2FyZEdlbmVyYXRvci52aWV3cycsIChWaWV3cykgLT5cblx0Y2xhc3MgVmlld3MuQ2FyZHNDb2xsZWN0aW9uVmlldyBleHRlbmRzIEJhY2tib25lLlZpZXdcblxuXHRcdGluaXRpYWxpemU6IC0+XG5cblx0XHRcdEBsaXN0ZW5Ub09uY2UgQGNvbGxlY3Rpb24sIFwiYWRkXCIsIEByZW5kZXJcblx0XHRcdEBsaXN0ZW5UbyBAY29sbGVjdGlvbiwgXCJjaGFuZ2VcIiwgQGNoYW5nZVxuXG5cdFx0XHRAcmVuZGVyKClcblx0XHRcblx0XHRyZW5kZXI6IChtb2RlbCwgY29sbGVjdGlvbikgPT5cblxuXHRcdFx0QCQoJy5jYXJkJykuZWFjaCAoaSxlbCkgPT5cblx0XHRcdFx0dmlldyA9IG5ldyBBcHAuQ2FyZFZpZXdcblx0XHRcdFx0XHRlbDogJChlbClcblx0XHRcdFx0XHRtb2RlbDogQGNvbGxlY3Rpb24ubW9kZWxzW2ldXG5cdFx0XHRcdHZpZXcucmVuZGVyKClcblx0XHRcdHRoaXNcblxuXHRcdGNoYW5nZTogKGFyZ3MuLi4pID0+ICAgICAgIFxuXG5cbiJdfQ==