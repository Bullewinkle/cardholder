// svg.compress.js 0.0.1 - Copyright (c) 2014 Wout Fierens - Licensed under the MIT license
 
SVG.extend(SVG.Path, {
  // Round path directives to a given amount of decimals
  compress: function(decimals) {
    decimals = eval('1e' + decimals)
 
    for (var n, i = this.array.value.length - 1; i >= 0; i--) 
      for (n = this.array.value[i].length - 1; n >= 1; n--) 
        this.array.value[i][n] = ~~(this.array.value[i][n] * decimals) / decimals
      
    return this
  }
})
 
// Usage: path.compress(3)
// Warning: this feature works desctructive and will reduce the resolution of your path