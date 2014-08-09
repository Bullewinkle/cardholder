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
    templatizer["assets"] = {};
    templatizer["jade"] = {};
    templatizer["scripts"] = {};
    templatizer["styles"] = {};
    templatizer["tools"] = {};
    templatizer["assets"]["data"] = {};
    templatizer["assets"]["font"] = {};
    templatizer["assets"]["img"] = {};
    templatizer["jade"]["base"] = {};
    templatizer["jade"]["inc"] = {};
    templatizer["jade"]["pages"] = {};
    templatizer["jade"]["views"] = {};
    templatizer["scripts"]["admin_panel"] = {};
    templatizer["scripts"]["cards_generator"] = {};
    templatizer["scripts"]["cards_redactor"] = {};
    templatizer["scripts"]["shared"] = {};
    templatizer["scripts"]["user_panel"] = {};
    templatizer["styles"]["base"] = {};
    templatizer["styles"]["layout"] = {};
    templatizer["styles"]["modules"] = {};
    templatizer["styles"]["plugins"] = {};
    templatizer["styles"]["states"] = {};
    templatizer["styles"]["tools"] = {};
    templatizer["tools"]["iconfont"] = {};
    templatizer["tools"]["pngsprite"] = {};
    templatizer["tools"]["retinasprite"] = {};
    templatizer["tools"]["svgsprite"] = {};
    templatizer["assets"]["font"]["card_fonts"] = {};
    templatizer["assets"]["img"]["bg"] = {};
    templatizer["assets"]["img"]["content"] = {};
    templatizer["assets"]["img"]["utils"] = {};
    templatizer["scripts"]["cards_generator"]["collections"] = {};
    templatizer["scripts"]["cards_generator"]["generators"] = {};
    templatizer["scripts"]["cards_generator"]["models"] = {};
    templatizer["scripts"]["cards_generator"]["templates"] = {};
    templatizer["scripts"]["cards_generator"]["views"] = {};
    templatizer["tools"]["iconfont"]["src"] = {};
    templatizer["tools"]["pngsprite"]["optimized"] = {};
    templatizer["tools"]["pngsprite"]["src"] = {};
    templatizer["tools"]["retinasprite"]["optimized"] = {};
    templatizer["tools"]["retinasprite"]["src"] = {};
    templatizer["tools"]["svgsprite"]["src"] = {};
    templatizer["assets"]["font"]["card_fonts"]["aaargh"] = {};
    templatizer["assets"]["font"]["card_fonts"]["aeromatics"] = {};
    templatizer["assets"]["font"]["card_fonts"]["andika"] = {};
    templatizer["assets"]["font"]["card_fonts"]["anonymous"] = {};
    templatizer["assets"]["font"]["card_fonts"]["aquarion"] = {};
    templatizer["assets"]["font"]["card_fonts"]["arimo"] = {};
    templatizer["assets"]["font"]["card_fonts"]["arnamu"] = {};
    templatizer["assets"]["font"]["card_fonts"]["arsenal"] = {};
    templatizer["assets"]["font"]["card_fonts"]["attentica"] = {};
    templatizer["assets"]["font"]["card_fonts"]["augustatwo"] = {};
    templatizer["assets"]["font"]["card_fonts"]["b20sans"] = {};
    templatizer["assets"]["font"]["card_fonts"]["baronneue"] = {};
    templatizer["assets"]["font"]["card_fonts"]["bebasneue"] = {};
    templatizer["assets"]["font"]["card_fonts"]["bender"] = {};
    templatizer["assets"]["font"]["card_fonts"]["bitter"] = {};
    templatizer["assets"]["font"]["card_fonts"]["bloccus"] = {};
    templatizer["assets"]["font"]["card_fonts"]["boblic"] = {};
    templatizer["assets"]["font"]["card_fonts"]["boomboom"] = {};
    templatizer["assets"]["font"]["card_fonts"]["bradobrei"] = {};
    templatizer["assets"]["font"]["card_fonts"]["bravo"] = {};
    templatizer["assets"]["font"]["card_fonts"]["casper"] = {};
    templatizer["assets"]["font"]["card_fonts"]["caviardreams"] = {};
    templatizer["assets"]["font"]["card_fonts"]["christmasscript"] = {};
    templatizer["assets"]["font"]["card_fonts"]["chunkfiveex"] = {};
    templatizer["assets"]["font"]["card_fonts"]["cleanvertising"] = {};
    templatizer["assets"]["font"]["card_fonts"]["cuprum"] = {};
    templatizer["assets"]["font"]["card_fonts"]["decorlz"] = {};
    templatizer["assets"]["font"]["card_fonts"]["designosaur"] = {};
    templatizer["assets"]["font"]["card_fonts"]["didactgothic"] = {};
    templatizer["assets"]["font"]["card_fonts"]["droidmono"] = {};
    templatizer["assets"]["font"]["card_fonts"]["engine"] = {};
    templatizer["assets"]["font"]["card_fonts"]["esqadero"] = {};
    templatizer["assets"]["font"]["card_fonts"]["eurofurence"] = {};
    templatizer["assets"]["font"]["card_fonts"]["fbrigade"] = {};
    templatizer["assets"]["font"]["card_fonts"]["fbrigade_cond"] = {};
    templatizer["assets"]["font"]["card_fonts"]["fog6"] = {};
    templatizer["assets"]["font"]["card_fonts"]["fontatigo"] = {};
    templatizer["assets"]["font"]["card_fonts"]["fontin"] = {};
    templatizer["assets"]["font"]["card_fonts"]["forum"] = {};
    templatizer["assets"]["font"]["card_fonts"]["garamond"] = {};
    templatizer["assets"]["font"]["card_fonts"]["glober"] = {};
    templatizer["assets"]["font"]["card_fonts"]["granapadano"] = {};
    templatizer["assets"]["font"]["card_fonts"]["gunnyrewritten"] = {};
    templatizer["assets"]["font"]["card_fonts"]["hattorihanzo"] = {};
    templatizer["assets"]["font"]["card_fonts"]["heuristica"] = {};
    templatizer["assets"]["font"]["card_fonts"]["idealist"] = {};
    templatizer["assets"]["font"]["card_fonts"]["introcondensed"] = {};
    templatizer["assets"]["font"]["card_fonts"]["istok"] = {};
    templatizer["assets"]["font"]["card_fonts"]["junegull"] = {};
    templatizer["assets"]["font"]["card_fonts"]["jura"] = {};
    templatizer["assets"]["font"]["card_fonts"]["kelly"] = {};
    templatizer["assets"]["font"]["card_fonts"]["kelson"] = {};
    templatizer["assets"]["font"]["card_fonts"]["kroftsmann"] = {};
    templatizer["assets"]["font"]["card_fonts"]["leaguegothic"] = {};
    templatizer["assets"]["font"]["card_fonts"]["ledger"] = {};
    templatizer["assets"]["font"]["card_fonts"]["leokadia"] = {};
    templatizer["assets"]["font"]["card_fonts"]["liberationsans"] = {};
    templatizer["assets"]["font"]["card_fonts"]["lintel"] = {};
    templatizer["assets"]["font"]["card_fonts"]["lobster"] = {};
    templatizer["assets"]["font"]["card_fonts"]["lora"] = {};
    templatizer["assets"]["font"]["card_fonts"]["mailray"] = {};
    templatizer["assets"]["font"]["card_fonts"]["mintspirit"] = {};
    templatizer["assets"]["font"]["card_fonts"]["modernh"] = {};
    templatizer["assets"]["font"]["card_fonts"]["movavi"] = {};
    templatizer["assets"]["font"]["card_fonts"]["myra"] = {};
    templatizer["assets"]["font"]["card_fonts"]["nautilus"] = {};
    templatizer["assets"]["font"]["card_fonts"]["newathena"] = {};
    templatizer["assets"]["font"]["card_fonts"]["nobile"] = {};
    templatizer["assets"]["font"]["card_fonts"]["notosans"] = {};
    templatizer["assets"]["font"]["card_fonts"]["notoserif"] = {};
    templatizer["assets"]["font"]["card_fonts"]["oldstandard"] = {};
    templatizer["assets"]["font"]["card_fonts"]["opengost"] = {};
    templatizer["assets"]["font"]["card_fonts"]["oranienbaum"] = {};
    templatizer["assets"]["font"]["card_fonts"]["orpheus"] = {};
    templatizer["assets"]["font"]["card_fonts"]["oxygen"] = {};
    templatizer["assets"]["font"]["card_fonts"]["pecita"] = {};
    templatizer["assets"]["font"]["card_fonts"]["perforama"] = {};
    templatizer["assets"]["font"]["card_fonts"]["philosopher"] = {};
    templatizer["assets"]["font"]["card_fonts"]["play"] = {};
    templatizer["assets"]["font"]["card_fonts"]["ptmono"] = {};
    templatizer["assets"]["font"]["card_fonts"]["qolyazma"] = {};
    templatizer["assets"]["font"]["card_fonts"]["resagokr"] = {};
    templatizer["assets"]["font"]["card_fonts"]["rex"] = {};
    templatizer["assets"]["font"]["card_fonts"]["russo"] = {};
    templatizer["assets"]["font"]["card_fonts"]["sanitrixie"] = {};
    templatizer["assets"]["font"]["card_fonts"]["sansation"] = {};
    templatizer["assets"]["font"]["card_fonts"]["sansus"] = {};
    templatizer["assets"]["font"]["card_fonts"]["scada"] = {};
    templatizer["assets"]["font"]["card_fonts"]["serifiqo"] = {};
    templatizer["assets"]["font"]["card_fonts"]["tempora"] = {};
    templatizer["assets"]["font"]["card_fonts"]["tenor"] = {};
    templatizer["assets"]["font"]["card_fonts"]["texgyreadv"] = {};
    templatizer["assets"]["font"]["card_fonts"]["texgyrebonum"] = {};
    templatizer["assets"]["font"]["card_fonts"]["texgyreheros"] = {};
    templatizer["assets"]["font"]["card_fonts"]["theanodidot"] = {};
    templatizer["assets"]["font"]["card_fonts"]["theanomodern"] = {};
    templatizer["assets"]["font"]["card_fonts"]["theanooldstyle"] = {};
    templatizer["assets"]["font"]["card_fonts"]["tinos"] = {};
    templatizer["assets"]["font"]["card_fonts"]["transmission"] = {};
    templatizer["assets"]["font"]["card_fonts"]["triod"] = {};
    templatizer["assets"]["font"]["card_fonts"]["vds"] = {};
    templatizer["assets"]["font"]["card_fonts"]["vollkorncyr"] = {};
    templatizer["assets"]["font"]["card_fonts"]["vremena"] = {};
    templatizer["assets"]["font"]["card_fonts"]["vremenagrotesk"] = {};
    templatizer["assets"]["font"]["card_fonts"]["weblysleek"] = {};
    templatizer["assets"]["font"]["card_fonts"]["webserveroff"] = {};
    templatizer["assets"]["font"]["card_fonts"]["whipsmart"] = {};
    templatizer["assets"]["font"]["card_fonts"]["yanone"] = {};
    templatizer["assets"]["font"]["card_fonts"]["zantroke"] = {};
    templatizer["assets"]["font"]["card_fonts"]["zion"] = {};
    templatizer["assets"]["font"]["card_fonts"]["znikomit"] = {};
    templatizer["assets"]["font"]["card_fonts"]["znikomit25"] = {};
    templatizer["tools"]["retinasprite"]["optimized"]["x1"] = {};
    templatizer["tools"]["retinasprite"]["optimized"]["x2"] = {};
    templatizer["tools"]["retinasprite"]["src"]["x1"] = {};
    templatizer["tools"]["retinasprite"]["src"]["x2"] = {};

    // jade/base/__root.jade compiled template
    templatizer["jade"]["base"]["__root"] = function tmpl_jade_base___root() {
        return '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">\n</head><body></body></html>';
    };

    // jade/base/layout.jade compiled template
    templatizer["jade"]["base"]["layout"] = function tmpl_jade_base_layout() {
        return '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"><link rel="stylesheet" href="css/dep/bootstrap.css"><link rel="stylesheet" href="css/app.css">\n</head><body><div class="l"><div class="l-main"><div class="l-header"><div class="header"></div></div><div class="l-content"></div><div class="l-footer"><div class="header"></div></div></div></div><script src="js/dep/jquery.js"></script><script src="js/dep/select2.js"></script><script src="js/dep/underscore.js"></script><script src="js/dep/backbone.js"></script><script src="js/dep/deep-model.js"></script><script src="js/dep/backbone.marionette.js"></script><script src="js/dep/color-scheme.js"></script><script src="js/dep/queue.min.js"></script><script src="js/dep/webfont.js"></script><script src="js/app.js"></script><script src="js/cards_generator/controller.js"></script><script src="js/cards_generator/index.js"></script><script src="js/cards_generator/router.js"></script><script src="js/cards_generator/collections/cards-collection.js"></script><script src="js/cards_generator/generators/gradient-generator.js"></script><script src="js/cards_generator/generators/prev-method.js"></script><script src="js/cards_generator/generators/text-genereator.js"></script><script src="js/cards_generator/models/card-model.js"></script><script src="js/cards_generator/models/main-controller-model.js"></script><script src="js/cards_generator/views/card-view.js"></script><script src="js/cards_generator/views/cards-collection-view.js"></script><script src="js/cards_generator/views/main-controller-view.js"></script></body></html>';
    };

    // jade/base/root.jade compiled template
    templatizer["jade"]["base"]["root"] = function tmpl_jade_base_root() {
        return '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"><link rel="stylesheet" href="css/dep/bootstrap.css"><link rel="stylesheet" href="css/app.css">\n</head><body><script src="js/dep/jquery.js"></script><script src="js/dep/select2.js"></script><script src="js/dep/underscore.js"></script><script src="js/dep/backbone.js"></script><script src="js/dep/deep-model.js"></script><script src="js/dep/backbone.marionette.js"></script><script src="js/dep/color-scheme.js"></script><script src="js/dep/queue.min.js"></script><script src="js/dep/webfont.js"></script><script src="js/app.js"></script><script src="js/cards_generator/controller.js"></script><script src="js/cards_generator/index.js"></script><script src="js/cards_generator/router.js"></script><script src="js/cards_generator/collections/cards-collection.js"></script><script src="js/cards_generator/generators/gradient-generator.js"></script><script src="js/cards_generator/generators/prev-method.js"></script><script src="js/cards_generator/generators/text-genereator.js"></script><script src="js/cards_generator/models/card-model.js"></script><script src="js/cards_generator/models/main-controller-model.js"></script><script src="js/cards_generator/views/card-view.js"></script><script src="js/cards_generator/views/cards-collection-view.js"></script><script src="js/cards_generator/views/main-controller-view.js"></script></body></html>';
    };

    // jade/inc/footer.jade compiled template
    templatizer["jade"]["inc"]["footer"] = function tmpl_jade_inc_footer() {
        return '<div class="footer"></div>';
    };

    // jade/inc/header.jade compiled template
    templatizer["jade"]["inc"]["header"] = function tmpl_jade_inc_header() {
        return '<div class="header"></div>';
    };

    // jade/pages/404.jade compiled template
    templatizer["jade"]["pages"]["404"] = function tmpl_jade_pages_404() {
        return '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"><link rel="stylesheet" href="css/dep/bootstrap.css"><link rel="stylesheet" href="css/app.css">\n<title>app</title><meta name="keywords" content=""><meta name="description" content=""></head><body><div class="l"><div class="l-main"><div class="l-header"><div class="header"></div></div><div class="l-content"><h1>404</h1></div><div class="l-footer"><div class="header"></div></div></div></div><script src="js/dep/jquery.js"></script><script src="js/dep/select2.js"></script><script src="js/dep/underscore.js"></script><script src="js/dep/backbone.js"></script><script src="js/dep/deep-model.js"></script><script src="js/dep/backbone.marionette.js"></script><script src="js/dep/color-scheme.js"></script><script src="js/dep/queue.min.js"></script><script src="js/dep/webfont.js"></script><script src="js/app.js"></script><script src="js/cards_generator/controller.js"></script><script src="js/cards_generator/index.js"></script><script src="js/cards_generator/router.js"></script><script src="js/cards_generator/collections/cards-collection.js"></script><script src="js/cards_generator/generators/gradient-generator.js"></script><script src="js/cards_generator/generators/prev-method.js"></script><script src="js/cards_generator/generators/text-genereator.js"></script><script src="js/cards_generator/models/card-model.js"></script><script src="js/cards_generator/models/main-controller-model.js"></script><script src="js/cards_generator/views/card-view.js"></script><script src="js/cards_generator/views/cards-collection-view.js"></script><script src="js/cards_generator/views/main-controller-view.js"></script></body></html>';
    };

    // jade/pages/index.jade compiled template
    templatizer["jade"]["pages"]["index"] = function tmpl_jade_pages_index(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(JSON, fromServer) {
            buf.push('<!DOCTYPE html><html><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"><link rel="stylesheet" href="css/dep/bootstrap.css"><link rel="stylesheet" href="css/app.css">\n<title>Card Holder</title><meta name="keywords" content=""><meta name="description" content=""></head><body><div class="l"><div class="l-main"><div class="l-header"><div class="header"></div></div><div class="l-content"><script src="js/cards_generator/templates/templates.js"></script><div id="app" class="clearfix"><ul class="cards">');
            for (var i = 1; i <= 25; i++) {
                if (i == 13) {
                    var classname = "card card_center";
                    buf.push("<li" + jade.cls([ "card_" + i + " main_controller_wrapper" ], [ true ]) + '><div class="main_controller"><form action="/" class="main_controller_form q1"><div class="main_controller_form_label">Текст вопроса</div><div class="main_controller_form_input"></div><button type="submit" value="" class="main_controller_form_submit icon-arrow-right2"></button></form><div class="main_controller_form_statusbar"><div class="main_controller_form_statusbar_value"></div></div><div class="main_controller_form_statusbar_step"><span class="main_controller_form_statusbar_current"> </span>/  <span class="main_controller_form_statusbar_quantity"></span></div><div class="main_controller_form_controls"><div class="main_controller_form_control prev"><a class="icon-arrow-left"></a></div><div class="main_controller_form_control next"><a class="icon-arrow-right"></a></div></div></div></li>');
                } else {
                    var classname = "card";
                    buf.push("<li" + jade.cls([ classname + " " + "card_" + i ], [ true ]) + '><div class="card_perspective"><div class="card_perspective_inner_wrapper"><canvas' + jade.attr("id", "canvas-" + i, true, true) + ' resize="true"' + jade.cls([ "card_canvas front card_canvas_" + i ], [ true ]) + ">HTML5 Canvas is not supported</canvas><canvas" + jade.attr("id", "canvas-back-" + i, true, true) + ' resize="true"' + jade.cls([ "card_canvas back card_canvas_" + i ], [ true ]) + ">HTML5 Canvas is not supported</canvas></div></div></li>");
                }
            }
            buf.push("</ul></div><script>window.dataFromServer = " + ((jade_interp = JSON.stringify(fromServer)) == null ? "" : jade_interp) + '</script><script>var value = 1; //or whatever value you want to pass\nvar meta = \'\';\n// to add metadata, assign a JSON-formatted object to the variable meta:\n// var meta = {\'food\' : \'ice cream\', \'flavor\':\'chocolate\'};\n\nvar sm_prefix = document.location.protocol == \'https://\' ? \'https://\' : \'http://\';\ndocument.write(unescape(\'%3Cscript src="\' + sm_prefix + \'api.statsmix.com/jsapi.2.min.js" type="text/javascript"%3E%3C/script%3E\'))\n</script><script>StatsMix.init("86aed8bac232816edd4c");\nStatsMix.track("cardgen", value, meta);</script></div><div class="l-footer"><div class="header"></div></div></div></div><script src="js/dep/jquery.js"></script><script src="js/dep/select2.js"></script><script src="js/dep/underscore.js"></script><script src="js/dep/backbone.js"></script><script src="js/dep/deep-model.js"></script><script src="js/dep/backbone.marionette.js"></script><script src="js/dep/color-scheme.js"></script><script src="js/dep/queue.min.js"></script><script src="js/dep/webfont.js"></script><script src="js/app.js"></script><script src="js/cards_generator/controller.js"></script><script src="js/cards_generator/index.js"></script><script src="js/cards_generator/router.js"></script><script src="js/cards_generator/collections/cards-collection.js"></script><script src="js/cards_generator/generators/gradient-generator.js"></script><script src="js/cards_generator/generators/prev-method.js"></script><script src="js/cards_generator/generators/text-genereator.js"></script><script src="js/cards_generator/models/card-model.js"></script><script src="js/cards_generator/models/main-controller-model.js"></script><script src="js/cards_generator/views/card-view.js"></script><script src="js/cards_generator/views/cards-collection-view.js"></script><script src="js/cards_generator/views/main-controller-view.js"></script></body></html>');
        })("JSON" in locals_for_with ? locals_for_with.JSON : typeof JSON !== "undefined" ? JSON : undefined, "fromServer" in locals_for_with ? locals_for_with.fromServer : typeof fromServer !== "undefined" ? fromServer : undefined);
        return buf.join("");
    };

    // jade/views/modal1.jade compiled template
    templatizer["jade"]["views"]["modal1"] = function tmpl_jade_views_modal1() {
        return '<div class="modal"></div>';
    };

    // jade/views/modal2.jade compiled template
    templatizer["jade"]["views"]["modal2"] = function tmpl_jade_views_modal2() {
        return '<div class="modal"></div>';
    };

    // jade/views/modal3.jade compiled template
    templatizer["jade"]["views"]["modal3"] = function tmpl_jade_views_modal3() {
        return '<div class="modal"></div>';
    };

    return templatizer;
}));