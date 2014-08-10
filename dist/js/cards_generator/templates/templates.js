(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.templatizer = factory();
    }
}(this, function () {
    var jade=function(){function r(r){return null!=r&&""!==r}function n(e){return Array.isArray(e)?e.map(n).filter(r).join(" "):e}var e={};return e.merge=function t(n,e){if(1===arguments.length){for(var a=n[0],s=1;s<n.length;s++)a=t(a,n[s]);return a}var i=n["class"],l=e["class"];(i||l)&&(i=i||[],l=l||[],Array.isArray(i)||(i=[i]),Array.isArray(l)||(l=[l]),n["class"]=i.concat(l).filter(r));for(var o in e)"class"!=o&&(n[o]=e[o]);return n},e.joinClasses=n,e.cls=function(r,t){for(var a=[],s=0;s<r.length;s++)a.push(t&&t[s]?e.escape(n([r[s]])):n(r[s]));var i=n(a);return i.length?' class="'+i+'"':""},e.attr=function(r,n,t,a){return"boolean"==typeof n||null==n?n?" "+(a?r:r+'="'+r+'"'):"":0==r.indexOf("data")&&"string"!=typeof n?" "+r+"='"+JSON.stringify(n).replace(/'/g,"&apos;")+"'":t?" "+r+'="'+e.escape(n)+'"':" "+r+'="'+n+'"'},e.attrs=function(r,t){var a=[],s=Object.keys(r);if(s.length)for(var i=0;i<s.length;++i){var l=s[i],o=r[l];"class"==l?(o=n(o))&&a.push(" "+l+'="'+o+'"'):a.push(e.attr(l,o,!1,t))}return a.join("")},e.escape=function(r){var n=String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");return n===""+r?r:n},e.rethrow=function a(r,n,e,t){if(!(r instanceof Error))throw r;if(!("undefined"==typeof window&&n||t))throw r.message+=" on line "+e,r;try{t=t||require("fs").readFileSync(n,"utf8")}catch(s){a(r,null,e)}var i=3,l=t.split("\n"),o=Math.max(e-i,0),c=Math.min(l.length,e+i),i=l.slice(o,c).map(function(r,n){var t=n+o+1;return(t==e?"  > ":"    ")+t+"| "+r}).join("\n");throw r.path=n,r.message=(n||"Jade")+":"+e+"\n"+i+"\n\n"+r.message,r},e}();

    var templatizer = {};


    // cardsgreed.jade compiled template
    templatizer["cardsgreed"] = function tmpl_cardsgreed(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        buf.push('<ul class="cards">');
        for (var i = 1; i <= 25; i++) {
            if (i == 13) {
                var classname = "card card_center";
                buf.push("<li" + jade.cls([ "card_" + i + " main_controller_wrapper" ], [ true ]) + '><div class="main_controller"><form action="/" class="main_controller_form q1"><div class="main_controller_form_label">Текст вопроса</div><div class="main_controller_form_input"></div><button type="submit" value="" class="main_controller_form_submit icon-arrow-right2"></button></form><div class="main_controller_form_statusbar"><div class="main_controller_form_statusbar_value"></div></div><div class="main_controller_form_statusbar_step"><span class="main_controller_form_statusbar_current"> </span>/  <span class="main_controller_form_statusbar_quantity"></span></div><div class="main_controller_form_controls"><div class="main_controller_form_control prev"><a class="icon-arrow-left"></a></div><div class="main_controller_form_control next"><a class="icon-arrow-right"></a></div></div></div></li>');
            } else {
                var classname = "card";
                buf.push("<li" + jade.cls([ classname + " " + "card_" + i ], [ true ]) + '><div class="card_perspective"><div class="card_perspective_inner_wrapper"><canvas' + jade.attr("id", "canvas-" + i, true, false) + ' resize="true"' + jade.cls([ "card_canvas front card_canvas_" + i ], [ true ]) + ">HTML5 Canvas is not supported</canvas><canvas" + jade.attr("id", "canvas-back-" + i, true, false) + ' resize="true"' + jade.cls([ "card_canvas back card_canvas_" + i ], [ true ]) + ">HTML5 Canvas is not supported</canvas></div></div></li>");
            }
        }
        buf.push("</ul>");
        return buf.join("");
    };

    // modal1.jade compiled template
    templatizer["modal1"] = function tmpl_modal1() {
        return '<div class="modal"></div>';
    };

    // modal2.jade compiled template
    templatizer["modal2"] = function tmpl_modal2() {
        return '<div class="modal"></div>';
    };

    // modal3.jade compiled template
    templatizer["modal3"] = function tmpl_modal3() {
        return '<div class="modal"></div>';
    };

    return templatizer;
}));