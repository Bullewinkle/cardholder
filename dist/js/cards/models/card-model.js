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
          gradientGenerator: {
            isDefault: true,
            gradientVariantNum: 0,
            gradientType: 'linear',
            gradientDirection: '45deg',
            colorScheme: ["6b9978", "598064", "cfe6d5", "60bf7b", "cc958f", "805d59", "e6d1cf", "bf6a60", "cc9d8f", "806259", "e6d4cf", "bf7560", "638d7d", "598071", "cfe6dd", "60bf9b"],
            variantConfig: {
              isDefault: true
            }
          },
          textGenerator: {
            isDefault: true,
            heading: {
              color: "#000",
              padding: {
                top: 20,
                left: 0,
                bottom: 0,
                right: 0
              },
              margin: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
              },
              textAlign: 'auto',
              maxWidth: '100%',
              font: {
                family: 'sans-serif',
                size: 30,
                anchor: 'middle',
                leading: 1
              }
            },
            info: {
              color: "#000",
              padding: {
                top: 20,
                left: 0,
                bottom: 0,
                right: 0
              },
              margin: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
              },
              textAlign: 'auto',
              maxWidth: '100%',
              font: {
                family: 'sans-serif',
                size: 20,
                anchor: 'middle',
                leading: 1
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzL21vZGVscy9jYXJkLW1vZGVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7bVNBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxPQUFaLEVBQXFCLFNBQUMsS0FBRCxHQUFBO0FBQ3BCLElBQU0sS0FBSyxDQUFDO0FBQ1gsa0NBQUEsQ0FBQTs7OztPQUFBOztBQUFBLDBCQUFBLFFBQUEsR0FDQztBQUFBLFFBQUEsSUFBQSxFQUNDO0FBQUEsVUFBQSxTQUFBLEVBQVcsSUFBWDtBQUFBLFVBQ0EsR0FBQSxFQUFLLE1BREw7QUFBQSxVQUVBLElBQUEsRUFBTSxTQUZOO0FBQUEsVUFHQSxPQUFBLEVBQVMsU0FIVDtBQUFBLFVBSUEsS0FBQSxFQUFPLFNBSlA7QUFBQSxVQUtBLEtBQUEsRUFBTyxTQUxQO0FBQUEsVUFNQSxRQUFBLEVBQVUsU0FOVjtTQUREO0FBQUEsUUFTQSxVQUFBLEVBQ0M7QUFBQSxVQUFBLGlCQUFBLEVBQ0M7QUFBQSxZQUFBLFNBQUEsRUFBVyxJQUFYO0FBQUEsWUFDQSxrQkFBQSxFQUFvQixDQURwQjtBQUFBLFlBRUEsWUFBQSxFQUFjLFFBRmQ7QUFBQSxZQUdBLGlCQUFBLEVBQW1CLE9BSG5CO0FBQUEsWUFJQSxXQUFBLEVBQVksQ0FBQyxRQUFELEVBQVcsUUFBWCxFQUFxQixRQUFyQixFQUErQixRQUEvQixFQUF5QyxRQUF6QyxFQUFtRCxRQUFuRCxFQUE2RCxRQUE3RCxFQUF1RSxRQUF2RSxFQUFpRixRQUFqRixFQUEyRixRQUEzRixFQUFxRyxRQUFyRyxFQUErRyxRQUEvRyxFQUF5SCxRQUF6SCxFQUFtSSxRQUFuSSxFQUE2SSxRQUE3SSxFQUF1SixRQUF2SixDQUpaO0FBQUEsWUFLQSxhQUFBLEVBQ0M7QUFBQSxjQUFBLFNBQUEsRUFBVyxJQUFYO2FBTkQ7V0FERDtBQUFBLFVBU0EsYUFBQSxFQUNDO0FBQUEsWUFBQSxTQUFBLEVBQVcsSUFBWDtBQUFBLFlBQ0EsT0FBQSxFQUNDO0FBQUEsY0FBQSxLQUFBLEVBQU8sTUFBUDtBQUFBLGNBQ0EsT0FBQSxFQUNDO0FBQUEsZ0JBQUEsR0FBQSxFQUFLLEVBQUw7QUFBQSxnQkFDQSxJQUFBLEVBQU0sQ0FETjtBQUFBLGdCQUVBLE1BQUEsRUFBUSxDQUZSO0FBQUEsZ0JBR0EsS0FBQSxFQUFPLENBSFA7ZUFGRDtBQUFBLGNBTUEsTUFBQSxFQUNDO0FBQUEsZ0JBQUEsR0FBQSxFQUFLLENBQUw7QUFBQSxnQkFDQSxJQUFBLEVBQU0sQ0FETjtBQUFBLGdCQUVBLE1BQUEsRUFBUSxDQUZSO0FBQUEsZ0JBR0EsS0FBQSxFQUFPLENBSFA7ZUFQRDtBQUFBLGNBV0EsU0FBQSxFQUFXLE1BWFg7QUFBQSxjQVlBLFFBQUEsRUFBVSxNQVpWO0FBQUEsY0FhQSxJQUFBLEVBQ0M7QUFBQSxnQkFBQSxNQUFBLEVBQVEsWUFBUjtBQUFBLGdCQUNBLElBQUEsRUFBTSxFQUROO0FBQUEsZ0JBRUEsTUFBQSxFQUFRLFFBRlI7QUFBQSxnQkFHQSxPQUFBLEVBQVMsQ0FIVDtlQWREO2FBRkQ7QUFBQSxZQXFCQSxJQUFBLEVBQ0M7QUFBQSxjQUFBLEtBQUEsRUFBTyxNQUFQO0FBQUEsY0FDQSxPQUFBLEVBQ0M7QUFBQSxnQkFBQSxHQUFBLEVBQUssRUFBTDtBQUFBLGdCQUNBLElBQUEsRUFBTSxDQUROO0FBQUEsZ0JBRUEsTUFBQSxFQUFRLENBRlI7QUFBQSxnQkFHQSxLQUFBLEVBQU8sQ0FIUDtlQUZEO0FBQUEsY0FNQSxNQUFBLEVBQ0M7QUFBQSxnQkFBQSxHQUFBLEVBQUssQ0FBTDtBQUFBLGdCQUNBLElBQUEsRUFBTSxDQUROO0FBQUEsZ0JBRUEsTUFBQSxFQUFRLENBRlI7QUFBQSxnQkFHQSxLQUFBLEVBQU8sQ0FIUDtlQVBEO0FBQUEsY0FXQSxTQUFBLEVBQVcsTUFYWDtBQUFBLGNBWUEsUUFBQSxFQUFVLE1BWlY7QUFBQSxjQWFBLElBQUEsRUFDQztBQUFBLGdCQUFBLE1BQUEsRUFBUSxZQUFSO0FBQUEsZ0JBQ0EsSUFBQSxFQUFNLEVBRE47QUFBQSxnQkFFQSxNQUFBLEVBQVEsUUFGUjtBQUFBLGdCQUdBLE9BQUEsRUFBUyxDQUhUO2VBZEQ7YUF0QkQ7V0FWRDtTQVZEO09BREQsQ0FBQTs7dUJBQUE7O09BRDZCLFFBQVEsQ0FBQyxVQUF2QyxDQUFBO1dBK0RNLEtBQUssQ0FBQztBQUNYLHdDQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSxnQ0FBQSxPQUFBLEdBQVMsS0FBVCxDQUFBOztBQUFBLGdDQUVBLEdBQUEsR0FBSyxzQkFGTCxDQUFBOztBQUFBLGdDQUdBLEtBQUEsR0FBTyxLQUFLLENBQUMsU0FIYixDQUFBOztBQUFBLGdDQUlBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDWCxRQUFBLElBQUMsQ0FBQSxJQUFELENBQU0sS0FBTixFQUFhLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO0FBQ1osWUFBQSxJQUFnRCxLQUFDLENBQUEsT0FBRCxLQUFZLElBQTVEO3FCQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVkscUJBQVosRUFBbUMsU0FBbkMsRUFBQTthQURZO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBYixDQUFBLENBQUE7QUFBQSxRQUVBLElBQUMsQ0FBQSxLQUFELENBQU8sY0FBYyxDQUFDLFdBQXRCLENBRkEsQ0FBQTtlQUdBLElBQUMsQ0FBQSxPQUFELENBQVMsT0FBVCxFQUpXO01BQUEsQ0FKWixDQUFBOzs2QkFBQTs7T0FEbUMsUUFBUSxDQUFDLFlBaEV6QjtFQUFBLENBQXJCLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRzL21vZGVscy9jYXJkLW1vZGVsLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiQGFwcC5tb2R1bGUgJ0NhcmRzJywgKENhcmRzKSAtPlxuXHRjbGFzcyBDYXJkcy5DYXJkTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5EZWVwTW9kZWxcblx0XHRkZWZhdWx0czogXG5cdFx0XHRkYXRhOlxuXHRcdFx0XHRpc0RlZmF1bHQ6IHRydWVcblx0XHRcdFx0c2V4OiAnbWFsZSdcblx0XHRcdFx0bmFtZTogJ0RlZmF1bHQnXG5cdFx0XHRcdHN1cm5hbWU6ICdEZWZhdWx0J1xuXHRcdFx0XHRwaG9uZTogJ0RlZmF1bHQnXG5cdFx0XHRcdGVNYWlsOiAnRGVmYXVsdCdcblx0XHRcdFx0cG9zaXRpb246ICdEZWZhdWx0J1xuXG5cdFx0XHRnZW5lcmF0b3JzOlxuXHRcdFx0XHRncmFkaWVudEdlbmVyYXRvcjogXG5cdFx0XHRcdFx0aXNEZWZhdWx0OiB0cnVlXG5cdFx0XHRcdFx0Z3JhZGllbnRWYXJpYW50TnVtOiAwXG5cdFx0XHRcdFx0Z3JhZGllbnRUeXBlOiAnbGluZWFyJ1xuXHRcdFx0XHRcdGdyYWRpZW50RGlyZWN0aW9uOiAnNDVkZWcnXG5cdFx0XHRcdFx0Y29sb3JTY2hlbWU6W1wiNmI5OTc4XCIsIFwiNTk4MDY0XCIsIFwiY2ZlNmQ1XCIsIFwiNjBiZjdiXCIsIFwiY2M5NThmXCIsIFwiODA1ZDU5XCIsIFwiZTZkMWNmXCIsIFwiYmY2YTYwXCIsIFwiY2M5ZDhmXCIsIFwiODA2MjU5XCIsIFwiZTZkNGNmXCIsIFwiYmY3NTYwXCIsIFwiNjM4ZDdkXCIsIFwiNTk4MDcxXCIsIFwiY2ZlNmRkXCIsIFwiNjBiZjliXCJdXG5cdFx0XHRcdFx0dmFyaWFudENvbmZpZzpcblx0XHRcdFx0XHRcdGlzRGVmYXVsdDogdHJ1ZVxuXG5cdFx0XHRcdHRleHRHZW5lcmF0b3I6XG5cdFx0XHRcdFx0aXNEZWZhdWx0OiB0cnVlXG5cdFx0XHRcdFx0aGVhZGluZzpcblx0XHRcdFx0XHRcdGNvbG9yOiBcIiMwMDBcIlxuXHRcdFx0XHRcdFx0cGFkZGluZzpcblx0XHRcdFx0XHRcdFx0dG9wOiAyMCBcblx0XHRcdFx0XHRcdFx0bGVmdDogMCBcblx0XHRcdFx0XHRcdFx0Ym90dG9tOiAwXG5cdFx0XHRcdFx0XHRcdHJpZ2h0OiAwIFxuXHRcdFx0XHRcdFx0bWFyZ2luOlxuXHRcdFx0XHRcdFx0XHR0b3A6IDBcblx0XHRcdFx0XHRcdFx0bGVmdDogMCBcblx0XHRcdFx0XHRcdFx0Ym90dG9tOiAwXG5cdFx0XHRcdFx0XHRcdHJpZ2h0OiAwIFxuXHRcdFx0XHRcdFx0dGV4dEFsaWduOiAnYXV0bydcblx0XHRcdFx0XHRcdG1heFdpZHRoOiAnMTAwJSdcblx0XHRcdFx0XHRcdGZvbnQ6IFxuXHRcdFx0XHRcdFx0XHRmYW1pbHk6ICdzYW5zLXNlcmlmJ1xuXHRcdFx0XHRcdFx0XHRzaXplOiAzMFxuXHRcdFx0XHRcdFx0XHRhbmNob3I6ICdtaWRkbGUnXG5cdFx0XHRcdFx0XHRcdGxlYWRpbmc6IDFcblxuXHRcdFx0XHRcdGluZm86XG5cdFx0XHRcdFx0XHRjb2xvcjogXCIjMDAwXCJcblx0XHRcdFx0XHRcdHBhZGRpbmc6XG5cdFx0XHRcdFx0XHRcdHRvcDogMjAgXG5cdFx0XHRcdFx0XHRcdGxlZnQ6IDAgXG5cdFx0XHRcdFx0XHRcdGJvdHRvbTogMFxuXHRcdFx0XHRcdFx0XHRyaWdodDogMCBcblx0XHRcdFx0XHRcdG1hcmdpbjpcblx0XHRcdFx0XHRcdFx0dG9wOiAwXG5cdFx0XHRcdFx0XHRcdGxlZnQ6IDAgXG5cdFx0XHRcdFx0XHRcdGJvdHRvbTogMFxuXHRcdFx0XHRcdFx0XHRyaWdodDogMCBcblx0XHRcdFx0XHRcdHRleHRBbGlnbjogJ2F1dG8nXG5cdFx0XHRcdFx0XHRtYXhXaWR0aDogJzEwMCUnXG5cdFx0XHRcdFx0XHRmb250OiBcblx0XHRcdFx0XHRcdFx0ZmFtaWx5OiAnc2Fucy1zZXJpZidcblx0XHRcdFx0XHRcdFx0c2l6ZTogMjBcblx0XHRcdFx0XHRcdFx0YW5jaG9yOiAnbWlkZGxlJ1xuXHRcdFx0XHRcdFx0XHRsZWFkaW5nOiAxXG5cblx0Y2xhc3MgQ2FyZHMuQ2FyZHNDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblx0XHRcblx0XHRsb2dnaW5nOiBvZmZcblxuXHRcdHVybDogJy9hcGkvY2FyZHMtZ2VuZXJhdG9yJ1xuXHRcdG1vZGVsOiBDYXJkcy5DYXJkTW9kZWxcblx0XHRpbml0aWFsaXplOiAtPlxuXHRcdFx0QGJpbmQgJ2FsbCcsID0+XG5cdFx0XHRcdGNvbnNvbGUubG9nIFwiQ0FSRFMgQ09MTEVDVElPTjpcXHRcIiwgYXJndW1lbnRzIGlmIEBsb2dnaW5nIGlzIG9uXG5cdFx0XHRAcmVzZXQgZGF0YUZyb21TZXJ2ZXIuY2FyZHNDb25maWdcblx0XHRcdEB0cmlnZ2VyICdyZWFkeSdcdFx0XHRcdFx0XHRcdCJdfQ==