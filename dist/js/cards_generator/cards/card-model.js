(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('CardGenerator.cards', function(Cards) {
    return Cards.CardModel = (function(_super) {
      __extends(CardModel, _super);

      function CardModel() {
        return CardModel.__super__.constructor.apply(this, arguments);
      }

      CardModel.prototype.defaults = {
        data: {
          isDefault: true,
          sex: 'male',
          name: 'Default',
          surname: 'Default',
          phone: 'Default',
          eMail: 'Default',
          position: 'Default'
        },
        generators: {
          gradientGen: {
            isDefault: true,
            gradientVariantNum: 0,
            gradientType: 'linear',
            gradientDirection: '45deg',
            colorScheme: ["6b9978", "598064", "cfe6d5", "60bf7b", "cc958f", "805d59", "e6d1cf", "bf6a60", "cc9d8f", "806259", "e6d4cf", "bf7560", "638d7d", "598071", "cfe6dd", "60bf9b"]
          },
          textGen: {
            isDefault: true,
            textAlign: 'auto',
            fontFamily: 'sans-serif'
          }
        }
      };

      return CardModel;

    })(Backbone.DeepModel);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzX2dlbmVyYXRvci9jYXJkcy9jYXJkLW1vZGVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7bVNBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxxQkFBWixFQUFtQyxTQUFDLEtBQUQsR0FBQTtXQUM1QixLQUFLLENBQUM7QUFDWCxrQ0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsMEJBQUEsUUFBQSxHQUNDO0FBQUEsUUFBQSxJQUFBLEVBQ0M7QUFBQSxVQUFBLFNBQUEsRUFBVyxJQUFYO0FBQUEsVUFDQSxHQUFBLEVBQUssTUFETDtBQUFBLFVBRUEsSUFBQSxFQUFNLFNBRk47QUFBQSxVQUdBLE9BQUEsRUFBUyxTQUhUO0FBQUEsVUFJQSxLQUFBLEVBQU8sU0FKUDtBQUFBLFVBS0EsS0FBQSxFQUFPLFNBTFA7QUFBQSxVQU1BLFFBQUEsRUFBVSxTQU5WO1NBREQ7QUFBQSxRQVNBLFVBQUEsRUFDQztBQUFBLFVBQUEsV0FBQSxFQUNDO0FBQUEsWUFBQSxTQUFBLEVBQVcsSUFBWDtBQUFBLFlBQ0Esa0JBQUEsRUFBb0IsQ0FEcEI7QUFBQSxZQUVBLFlBQUEsRUFBYyxRQUZkO0FBQUEsWUFHQSxpQkFBQSxFQUFtQixPQUhuQjtBQUFBLFlBSUEsV0FBQSxFQUFZLENBQUMsUUFBRCxFQUFXLFFBQVgsRUFBcUIsUUFBckIsRUFBK0IsUUFBL0IsRUFBeUMsUUFBekMsRUFBbUQsUUFBbkQsRUFBNkQsUUFBN0QsRUFBdUUsUUFBdkUsRUFBaUYsUUFBakYsRUFBMkYsUUFBM0YsRUFBcUcsUUFBckcsRUFBK0csUUFBL0csRUFBeUgsUUFBekgsRUFBbUksUUFBbkksRUFBNkksUUFBN0ksRUFBdUosUUFBdkosQ0FKWjtXQUREO0FBQUEsVUFVQSxPQUFBLEVBQ0M7QUFBQSxZQUFBLFNBQUEsRUFBVyxJQUFYO0FBQUEsWUFDQSxTQUFBLEVBQVcsTUFEWDtBQUFBLFlBRUEsVUFBQSxFQUFZLFlBRlo7V0FYRDtTQVZEO09BREQsQ0FBQTs7dUJBQUE7O09BRDZCLFFBQVEsQ0FBQyxXQURMO0VBQUEsQ0FBbkMsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZHNfZ2VuZXJhdG9yL2NhcmRzL2NhcmQtbW9kZWwuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJAYXBwLm1vZHVsZSAnQ2FyZEdlbmVyYXRvci5jYXJkcycsIChDYXJkcykgLT5cblx0Y2xhc3MgQ2FyZHMuQ2FyZE1vZGVsIGV4dGVuZHMgQmFja2JvbmUuRGVlcE1vZGVsXG5cdFx0ZGVmYXVsdHM6IFxuXHRcdFx0ZGF0YTpcblx0XHRcdFx0aXNEZWZhdWx0OiB0cnVlXG5cdFx0XHRcdHNleDogJ21hbGUnXG5cdFx0XHRcdG5hbWU6ICdEZWZhdWx0J1xuXHRcdFx0XHRzdXJuYW1lOiAnRGVmYXVsdCdcblx0XHRcdFx0cGhvbmU6ICdEZWZhdWx0J1xuXHRcdFx0XHRlTWFpbDogJ0RlZmF1bHQnXG5cdFx0XHRcdHBvc2l0aW9uOiAnRGVmYXVsdCdcblxuXHRcdFx0Z2VuZXJhdG9yczpcblx0XHRcdFx0Z3JhZGllbnRHZW46IFxuXHRcdFx0XHRcdGlzRGVmYXVsdDogdHJ1ZVxuXHRcdFx0XHRcdGdyYWRpZW50VmFyaWFudE51bTogMFxuXHRcdFx0XHRcdGdyYWRpZW50VHlwZTogJ2xpbmVhcidcblx0XHRcdFx0XHRncmFkaWVudERpcmVjdGlvbjogJzQ1ZGVnJ1xuXHRcdFx0XHRcdGNvbG9yU2NoZW1lOltcIjZiOTk3OFwiLCBcIjU5ODA2NFwiLCBcImNmZTZkNVwiLCBcIjYwYmY3YlwiLCBcImNjOTU4ZlwiLCBcIjgwNWQ1OVwiLCBcImU2ZDFjZlwiLCBcImJmNmE2MFwiLCBcImNjOWQ4ZlwiLCBcIjgwNjI1OVwiLCBcImU2ZDRjZlwiLCBcImJmNzU2MFwiLCBcIjYzOGQ3ZFwiLCBcIjU5ODA3MVwiLCBcImNmZTZkZFwiLCBcIjYwYmY5YlwiXVxuXHRcdFx0XHRcdCMgZnJvbTogJzAlJ1xuXHRcdFx0XHRcdCMgdG86ICcxMDAlJ1xuXHRcdFx0XHRcdCMgZnJvbUNvbG9yOiAnIzAwMCdcblx0XHRcdFx0XHQjIHRvQ29sb3I6ICd0cmFuc3BhcmVudCdcblx0XHRcdFx0dGV4dEdlbjpcblx0XHRcdFx0XHRpc0RlZmF1bHQ6IHRydWVcblx0XHRcdFx0XHR0ZXh0QWxpZ246ICdhdXRvJ1xuXHRcdFx0XHRcdGZvbnRGYW1pbHk6ICdzYW5zLXNlcmlmJ1xuIl19