/* PLUGIN Lettering.js inclus */
(function($){function injector(t,splitter,klass,after){var a=t.text().split(splitter),inject='';if(a.length){$(a).each(function(i,item){inject+='<span class="'+klass+(i+1)+'">'+item+'</span>'+after});t.empty().append(inject)}}var methods={init:function(){return this.each(function(){injector($(this),'','char','')})}};$.fn.lettering=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1))}else if(typeof method==='object'||!method){return methods.init.apply(this,arguments)}else{$.error('Method '+method+' does not exist')}}})(jQuery);

$(document).ready(function() {

    // 1. Animation du nom (Lettering + Classe visible)
    $('#mon-nom').lettering();
    setTimeout(function() {
        $('#mon-nom').addClass('visible');
    }, 200);

    // 2. Animation des barres de progression
    $('.bar-fill').each(function() {
        var targetWidth = $(this).attr('data-percent');
        $(this).animate({ width: targetWidth }, 1500);
    });

    // 3. Mode Sombre
    $('#dark-toggle').on('click', function() {
        $('body').toggleClass('dark-mode');
        $(this).find('i').toggleClass('fa-moon fa-sun');
    });

    // 4. Impression
    $('#print-now').on('click', function() {
        window.print();
    });

});