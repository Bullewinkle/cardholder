(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('CardGenerator.models', function(Models) {
    return Models.CardModel = (function(_super) {
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
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzX2dlbmVyYXRvci9tb2RlbHMvY2FyZC1tb2RlbC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBO21TQUFBOztBQUFBLEVBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLENBQVksc0JBQVosRUFBb0MsU0FBQyxNQUFELEdBQUE7V0FDN0IsTUFBTSxDQUFDO0FBQ1osa0NBQUEsQ0FBQTs7OztPQUFBOztBQUFBLDBCQUFBLFFBQUEsR0FDQztBQUFBLFFBQUEsSUFBQSxFQUNDO0FBQUEsVUFBQSxXQUFBLEVBQWEsSUFBYjtBQUFBLFVBQ0EsR0FBQSxFQUFLLE1BREw7QUFBQSxVQUVBLElBQUEsRUFBTSxTQUZOO0FBQUEsVUFHQSxPQUFBLEVBQVMsU0FIVDtBQUFBLFVBSUEsS0FBQSxFQUFPLFNBSlA7QUFBQSxVQUtBLEtBQUEsRUFBTyxTQUxQO0FBQUEsVUFNQSxRQUFBLEVBQVUsU0FOVjtTQUREO0FBQUEsUUFTQSxVQUFBLEVBQ0M7QUFBQSxVQUFBLFdBQUEsRUFDQztBQUFBLFlBQUEsY0FBQSxFQUFnQixJQUFoQjtBQUFBLFlBQ0Esa0JBQUEsRUFBb0IsQ0FEcEI7QUFBQSxZQUVBLFlBQUEsRUFBYyxRQUZkO0FBQUEsWUFHQSxpQkFBQSxFQUFtQixPQUhuQjtBQUFBLFlBSUEsV0FBQSxFQUFZLENBQUMsUUFBRCxFQUFXLFFBQVgsRUFBcUIsUUFBckIsRUFBK0IsUUFBL0IsRUFBeUMsUUFBekMsRUFBbUQsUUFBbkQsRUFBNkQsUUFBN0QsRUFBdUUsUUFBdkUsRUFBaUYsUUFBakYsRUFBMkYsUUFBM0YsRUFBcUcsUUFBckcsRUFBK0csUUFBL0csRUFBeUgsUUFBekgsRUFBbUksUUFBbkksRUFBNkksUUFBN0ksRUFBdUosUUFBdkosQ0FKWjtXQUREO0FBQUEsVUFVQSxPQUFBLEVBQ0M7QUFBQSxZQUFBLGNBQUEsRUFBZ0IsSUFBaEI7QUFBQSxZQUNBLFNBQUEsRUFBVyxNQURYO0FBQUEsWUFFQSxVQUFBLEVBQVksWUFGWjtXQVhEO1NBVkQ7T0FERCxDQUFBOzt1QkFBQTs7T0FEOEIsUUFBUSxDQUFDLFdBREw7RUFBQSxDQUFwQyxDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJjYXJkc19nZW5lcmF0b3IvbW9kZWxzL2NhcmQtbW9kZWwuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJAYXBwLm1vZHVsZSAnQ2FyZEdlbmVyYXRvci5tb2RlbHMnLCAoTW9kZWxzKSAtPlxuXHRjbGFzcyBNb2RlbHMuQ2FyZE1vZGVsIGV4dGVuZHMgQmFja2JvbmUuRGVlcE1vZGVsXG5cdFx0ZGVmYXVsdHM6IFxuXHRcdFx0ZGF0YTpcblx0XHRcdFx0ZGVmYXVsdERhdGE6IHRydWVcblx0XHRcdFx0c2V4OiAnbWFsZSdcblx0XHRcdFx0bmFtZTogJ0RlZmF1bHQnXG5cdFx0XHRcdHN1cm5hbWU6ICdEZWZhdWx0J1xuXHRcdFx0XHRwaG9uZTogJ0RlZmF1bHQnXG5cdFx0XHRcdGVNYWlsOiAnRGVmYXVsdCdcblx0XHRcdFx0cG9zaXRpb246ICdEZWZhdWx0J1xuXG5cdFx0XHRnZW5lcmF0b3JzOlxuXHRcdFx0XHRncmFkaWVudEdlbjogXG5cdFx0XHRcdFx0ZGVmYXVsdE9wdGlvbnM6IHRydWVcblx0XHRcdFx0XHRncmFkaWVudFZhcmlhbnROdW06IDBcblx0XHRcdFx0XHRncmFkaWVudFR5cGU6ICdsaW5lYXInXG5cdFx0XHRcdFx0Z3JhZGllbnREaXJlY3Rpb246ICc0NWRlZydcblx0XHRcdFx0XHRjb2xvclNjaGVtZTpbXCI2Yjk5NzhcIiwgXCI1OTgwNjRcIiwgXCJjZmU2ZDVcIiwgXCI2MGJmN2JcIiwgXCJjYzk1OGZcIiwgXCI4MDVkNTlcIiwgXCJlNmQxY2ZcIiwgXCJiZjZhNjBcIiwgXCJjYzlkOGZcIiwgXCI4MDYyNTlcIiwgXCJlNmQ0Y2ZcIiwgXCJiZjc1NjBcIiwgXCI2MzhkN2RcIiwgXCI1OTgwNzFcIiwgXCJjZmU2ZGRcIiwgXCI2MGJmOWJcIl1cblx0XHRcdFx0XHQjIGZyb206ICcwJSdcblx0XHRcdFx0XHQjIHRvOiAnMTAwJSdcblx0XHRcdFx0XHQjIGZyb21Db2xvcjogJyMwMDAnXG5cdFx0XHRcdFx0IyB0b0NvbG9yOiAndHJhbnNwYXJlbnQnXG5cdFx0XHRcdHRleHRHZW46XG5cdFx0XHRcdFx0ZGVmYXVsdE9wdGlvbnM6IHRydWVcblx0XHRcdFx0XHR0ZXh0QWxpZ246ICdhdXRvJ1xuXHRcdFx0XHRcdGZvbnRGYW1pbHk6ICdzYW5zLXNlcmlmJ1xuIl19