(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.App.CardModel = App.CardModel = (function(_super) {
    __extends(CardModel, _super);

    function CardModel() {
      return CardModel.__super__.constructor.apply(this, arguments);
    }

    CardModel.prototype.defaults = {
      data: {
        defaultData: true,
        sex: 'male',
        name: 'Default',
        surname: 'Default',
        phone: 'Default',
        eMail: 'Default',
        position: 'Default'
      },
      generators: {
        gradientGen: {
          defaultOptions: true,
          gradientVariantNum: 0,
          gradientType: 'linear',
          gradientDirection: '45deg',
          colorScheme: ["6b9978", "598064", "cfe6d5", "60bf7b", "cc958f", "805d59", "e6d1cf", "bf6a60", "cc9d8f", "806259", "e6d4cf", "bf7560", "638d7d", "598071", "cfe6dd", "60bf9b"]
        },
        textGen: {
          defaultOptions: true,
          textAlign: 'auto',
          fontFamily: 'sans-serif'
        }
      }
    };

    return CardModel;

  })(Backbone.DeepModel);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzL2NhcmQtbW9kZWwuanMiLCJzb3VyY2VzIjpbImNhcmQtbW9kZWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTttU0FBQTs7QUFBQSxFQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsU0FBTCxHQUF1QixHQUFHLENBQUM7QUFDMUIsZ0NBQUEsQ0FBQTs7OztLQUFBOztBQUFBLHdCQUFBLFFBQUEsR0FDQztBQUFBLE1BQUEsSUFBQSxFQUNDO0FBQUEsUUFBQSxXQUFBLEVBQWEsSUFBYjtBQUFBLFFBQ0EsR0FBQSxFQUFLLE1BREw7QUFBQSxRQUVBLElBQUEsRUFBTSxTQUZOO0FBQUEsUUFHQSxPQUFBLEVBQVMsU0FIVDtBQUFBLFFBSUEsS0FBQSxFQUFPLFNBSlA7QUFBQSxRQUtBLEtBQUEsRUFBTyxTQUxQO0FBQUEsUUFNQSxRQUFBLEVBQVUsU0FOVjtPQUREO0FBQUEsTUFTQSxVQUFBLEVBQ0M7QUFBQSxRQUFBLFdBQUEsRUFDQztBQUFBLFVBQUEsY0FBQSxFQUFnQixJQUFoQjtBQUFBLFVBQ0Esa0JBQUEsRUFBb0IsQ0FEcEI7QUFBQSxVQUVBLFlBQUEsRUFBYyxRQUZkO0FBQUEsVUFHQSxpQkFBQSxFQUFtQixPQUhuQjtBQUFBLFVBSUEsV0FBQSxFQUFZLENBQUMsUUFBRCxFQUFXLFFBQVgsRUFBcUIsUUFBckIsRUFBK0IsUUFBL0IsRUFBeUMsUUFBekMsRUFBbUQsUUFBbkQsRUFBNkQsUUFBN0QsRUFBdUUsUUFBdkUsRUFBaUYsUUFBakYsRUFBMkYsUUFBM0YsRUFBcUcsUUFBckcsRUFBK0csUUFBL0csRUFBeUgsUUFBekgsRUFBbUksUUFBbkksRUFBNkksUUFBN0ksRUFBdUosUUFBdkosQ0FKWjtTQUREO0FBQUEsUUFVQSxPQUFBLEVBQ0M7QUFBQSxVQUFBLGNBQUEsRUFBZ0IsSUFBaEI7QUFBQSxVQUNBLFNBQUEsRUFBVyxNQURYO0FBQUEsVUFFQSxVQUFBLEVBQVksWUFGWjtTQVhEO09BVkQ7S0FERCxDQUFBOztxQkFBQTs7S0FENEMsUUFBUSxDQUFDLFVBQXRELENBQUE7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbbnVsbF0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9