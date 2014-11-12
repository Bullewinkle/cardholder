(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('Cards', function(Cards) {
    Cards.CardModel = (function(_super) {
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
            colorScheme: ["6b9978", "598064", "cfe6d5", "60bf7b", "cc958f", "805d59", "e6d1cf", "bf6a60", "cc9d8f", "806259", "e6d4cf", "bf7560", "638d7d", "598071", "cfe6dd", "60bf9b"],
            variantConfig: {
              isDefault: true
            }
          },
          textGen: {
            isDefault: true,
            textAlign: 'auto',
            fontFamily: 'sans-serif',
            textBlockOptions: {
              padding: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
              },
              title: {
                fontSize: "1.8em",
                color: "#000",
                textBaseline: 'middle',
                lineHeight: "1em",
                marginBottom: 10
              },
              body: {
                fontSize: "0.8em",
                color: "#000",
                textBaseline: 'middle',
                lineHeight: "0.8em"
              }
            }
          }
        }
      };

      return CardModel;

    })(Backbone.DeepModel);
    return Cards.CardsCollection = (function(_super) {
      __extends(CardsCollection, _super);

      function CardsCollection() {
        return CardsCollection.__super__.constructor.apply(this, arguments);
      }

      CardsCollection.prototype.logging = false;

      CardsCollection.prototype.url = '/api/cards-generator';

      CardsCollection.prototype.model = Cards.CardModel;

      CardsCollection.prototype.initialize = function() {
        this.bind('all', (function(_this) {
          return function() {
            if (_this.logging === true) {
              return console.log("CARDS COLLECTION:\t", arguments);
            }
          };
        })(this));
        this.reset(dataFromServer.cardsConfig);
        return this.trigger('ready');
      };

      return CardsCollection;

    })(Backbone.Collection);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzL21vZGVscy9jYXJkLW1vZGVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7bVNBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxPQUFaLEVBQXFCLFNBQUMsS0FBRCxHQUFBO0FBQ3BCLElBQU0sS0FBSyxDQUFDO0FBQ1gsa0NBQUEsQ0FBQTs7OztPQUFBOztBQUFBLDBCQUFBLFFBQUEsR0FDQztBQUFBLFFBQUEsSUFBQSxFQUNDO0FBQUEsVUFBQSxTQUFBLEVBQVcsSUFBWDtBQUFBLFVBQ0EsR0FBQSxFQUFLLE1BREw7QUFBQSxVQUVBLElBQUEsRUFBTSxTQUZOO0FBQUEsVUFHQSxPQUFBLEVBQVMsU0FIVDtBQUFBLFVBSUEsS0FBQSxFQUFPLFNBSlA7QUFBQSxVQUtBLEtBQUEsRUFBTyxTQUxQO0FBQUEsVUFNQSxRQUFBLEVBQVUsU0FOVjtTQUREO0FBQUEsUUFTQSxVQUFBLEVBQ0M7QUFBQSxVQUFBLFdBQUEsRUFDQztBQUFBLFlBQUEsU0FBQSxFQUFXLElBQVg7QUFBQSxZQUNBLGtCQUFBLEVBQW9CLENBRHBCO0FBQUEsWUFFQSxZQUFBLEVBQWMsUUFGZDtBQUFBLFlBR0EsaUJBQUEsRUFBbUIsT0FIbkI7QUFBQSxZQUlBLFdBQUEsRUFBWSxDQUFDLFFBQUQsRUFBVyxRQUFYLEVBQXFCLFFBQXJCLEVBQStCLFFBQS9CLEVBQXlDLFFBQXpDLEVBQW1ELFFBQW5ELEVBQTZELFFBQTdELEVBQXVFLFFBQXZFLEVBQWlGLFFBQWpGLEVBQTJGLFFBQTNGLEVBQXFHLFFBQXJHLEVBQStHLFFBQS9HLEVBQXlILFFBQXpILEVBQW1JLFFBQW5JLEVBQTZJLFFBQTdJLEVBQXVKLFFBQXZKLENBSlo7QUFBQSxZQUtBLGFBQUEsRUFDQztBQUFBLGNBQUEsU0FBQSxFQUFXLElBQVg7YUFORDtXQUREO0FBQUEsVUFTQSxPQUFBLEVBQ0M7QUFBQSxZQUFBLFNBQUEsRUFBVyxJQUFYO0FBQUEsWUFDQSxTQUFBLEVBQVcsTUFEWDtBQUFBLFlBRUEsVUFBQSxFQUFZLFlBRlo7QUFBQSxZQUlBLGdCQUFBLEVBQ0M7QUFBQSxjQUFBLE9BQUEsRUFDQztBQUFBLGdCQUFBLEdBQUEsRUFBSyxDQUFMO0FBQUEsZ0JBQ0EsSUFBQSxFQUFNLENBRE47QUFBQSxnQkFFQSxNQUFBLEVBQVEsQ0FGUjtBQUFBLGdCQUdBLEtBQUEsRUFBTyxDQUhQO2VBREQ7QUFBQSxjQUtBLEtBQUEsRUFDQztBQUFBLGdCQUFBLFFBQUEsRUFBVSxPQUFWO0FBQUEsZ0JBQ0EsS0FBQSxFQUFPLE1BRFA7QUFBQSxnQkFFQSxZQUFBLEVBQWMsUUFGZDtBQUFBLGdCQUdBLFVBQUEsRUFBWSxLQUhaO0FBQUEsZ0JBSUEsWUFBQSxFQUFjLEVBSmQ7ZUFORDtBQUFBLGNBV0EsSUFBQSxFQUNDO0FBQUEsZ0JBQUEsUUFBQSxFQUFVLE9BQVY7QUFBQSxnQkFDQSxLQUFBLEVBQU8sTUFEUDtBQUFBLGdCQUVBLFlBQUEsRUFBYyxRQUZkO0FBQUEsZ0JBR0EsVUFBQSxFQUFZLE9BSFo7ZUFaRDthQUxEO1dBVkQ7U0FWRDtPQURELENBQUE7O3VCQUFBOztPQUQ2QixRQUFRLENBQUMsVUFBdkMsQ0FBQTtXQTRDTSxLQUFLLENBQUM7QUFDWCx3Q0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsZ0NBQUEsT0FBQSxHQUFTLEtBQVQsQ0FBQTs7QUFBQSxnQ0FFQSxHQUFBLEdBQUssc0JBRkwsQ0FBQTs7QUFBQSxnQ0FHQSxLQUFBLEdBQU8sS0FBSyxDQUFDLFNBSGIsQ0FBQTs7QUFBQSxnQ0FJQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBQ1gsUUFBQSxJQUFDLENBQUEsSUFBRCxDQUFNLEtBQU4sRUFBYSxDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTtBQUNaLFlBQUEsSUFBZ0QsS0FBQyxDQUFBLE9BQUQsS0FBWSxJQUE1RDtxQkFBQSxPQUFPLENBQUMsR0FBUixDQUFZLHFCQUFaLEVBQW1DLFNBQW5DLEVBQUE7YUFEWTtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWIsQ0FBQSxDQUFBO0FBQUEsUUFFQSxJQUFDLENBQUEsS0FBRCxDQUFPLGNBQWMsQ0FBQyxXQUF0QixDQUZBLENBQUE7ZUFHQSxJQUFDLENBQUEsT0FBRCxDQUFTLE9BQVQsRUFKVztNQUFBLENBSlosQ0FBQTs7NkJBQUE7O09BRG1DLFFBQVEsQ0FBQyxZQTdDekI7RUFBQSxDQUFyQixDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJjYXJkcy9tb2RlbHMvY2FyZC1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkBhcHAubW9kdWxlICdDYXJkcycsIChDYXJkcykgLT5cblx0Y2xhc3MgQ2FyZHMuQ2FyZE1vZGVsIGV4dGVuZHMgQmFja2JvbmUuRGVlcE1vZGVsXG5cdFx0ZGVmYXVsdHM6IFxuXHRcdFx0ZGF0YTpcblx0XHRcdFx0aXNEZWZhdWx0OiB0cnVlXG5cdFx0XHRcdHNleDogJ21hbGUnXG5cdFx0XHRcdG5hbWU6ICdEZWZhdWx0J1xuXHRcdFx0XHRzdXJuYW1lOiAnRGVmYXVsdCdcblx0XHRcdFx0cGhvbmU6ICdEZWZhdWx0J1xuXHRcdFx0XHRlTWFpbDogJ0RlZmF1bHQnXG5cdFx0XHRcdHBvc2l0aW9uOiAnRGVmYXVsdCdcblxuXHRcdFx0Z2VuZXJhdG9yczpcblx0XHRcdFx0Z3JhZGllbnRHZW46IFxuXHRcdFx0XHRcdGlzRGVmYXVsdDogdHJ1ZVxuXHRcdFx0XHRcdGdyYWRpZW50VmFyaWFudE51bTogMFxuXHRcdFx0XHRcdGdyYWRpZW50VHlwZTogJ2xpbmVhcidcblx0XHRcdFx0XHRncmFkaWVudERpcmVjdGlvbjogJzQ1ZGVnJ1xuXHRcdFx0XHRcdGNvbG9yU2NoZW1lOltcIjZiOTk3OFwiLCBcIjU5ODA2NFwiLCBcImNmZTZkNVwiLCBcIjYwYmY3YlwiLCBcImNjOTU4ZlwiLCBcIjgwNWQ1OVwiLCBcImU2ZDFjZlwiLCBcImJmNmE2MFwiLCBcImNjOWQ4ZlwiLCBcIjgwNjI1OVwiLCBcImU2ZDRjZlwiLCBcImJmNzU2MFwiLCBcIjYzOGQ3ZFwiLCBcIjU5ODA3MVwiLCBcImNmZTZkZFwiLCBcIjYwYmY5YlwiXVxuXHRcdFx0XHRcdHZhcmlhbnRDb25maWc6XG5cdFx0XHRcdFx0XHRpc0RlZmF1bHQ6IHRydWVcblxuXHRcdFx0XHR0ZXh0R2VuOlxuXHRcdFx0XHRcdGlzRGVmYXVsdDogdHJ1ZVxuXHRcdFx0XHRcdHRleHRBbGlnbjogJ2F1dG8nXG5cdFx0XHRcdFx0Zm9udEZhbWlseTogJ3NhbnMtc2VyaWYnXG5cblx0XHRcdFx0XHR0ZXh0QmxvY2tPcHRpb25zOlxuXHRcdFx0XHRcdFx0cGFkZGluZzpcblx0XHRcdFx0XHRcdFx0dG9wOiAwIFxuXHRcdFx0XHRcdFx0XHRsZWZ0OiAwIFxuXHRcdFx0XHRcdFx0XHRib3R0b206IDBcblx0XHRcdFx0XHRcdFx0cmlnaHQ6IDAgXG5cdFx0XHRcdFx0XHR0aXRsZTpcblx0XHRcdFx0XHRcdFx0Zm9udFNpemU6IFwiMS44ZW1cIlxuXHRcdFx0XHRcdFx0XHRjb2xvcjogXCIjMDAwXCJcblx0XHRcdFx0XHRcdFx0dGV4dEJhc2VsaW5lOiAnbWlkZGxlJyBcblx0XHRcdFx0XHRcdFx0bGluZUhlaWdodDogXCIxZW1cIlxuXHRcdFx0XHRcdFx0XHRtYXJnaW5Cb3R0b206IDEwXG5cdFx0XHRcdFx0XHRib2R5OlxuXHRcdFx0XHRcdFx0XHRmb250U2l6ZTogXCIwLjhlbVwiXG5cdFx0XHRcdFx0XHRcdGNvbG9yOiBcIiMwMDBcIlxuXHRcdFx0XHRcdFx0XHR0ZXh0QmFzZWxpbmU6ICdtaWRkbGUnIFxuXHRcdFx0XHRcdFx0XHRsaW5lSGVpZ2h0OiBcIjAuOGVtXCJcblxuXHRjbGFzcyBDYXJkcy5DYXJkc0NvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXHRcdFxuXHRcdGxvZ2dpbmc6IG9mZlxuXG5cdFx0dXJsOiAnL2FwaS9jYXJkcy1nZW5lcmF0b3InXG5cdFx0bW9kZWw6IENhcmRzLkNhcmRNb2RlbFxuXHRcdGluaXRpYWxpemU6IC0+XG5cdFx0XHRAYmluZCAnYWxsJywgPT5cblx0XHRcdFx0Y29uc29sZS5sb2cgXCJDQVJEUyBDT0xMRUNUSU9OOlxcdFwiLCBhcmd1bWVudHMgaWYgQGxvZ2dpbmcgaXMgb25cblx0XHRcdEByZXNldCBkYXRhRnJvbVNlcnZlci5jYXJkc0NvbmZpZ1xuXHRcdFx0QHRyaWdnZXIgJ3JlYWR5J1x0XHRcdFx0XHRcdFx0Il19