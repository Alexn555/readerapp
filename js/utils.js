/**
 * Created by alexn555 on 9/2/2015.
 */

var Utils = {

    scrollTop : function(el) {
        setTimeout(function () {
            $(el).scrollTop(0);

            if ($(el).scrollTop() > 0) {
                $(+el).scrollTop(0);  //Chrome,Safari
            } else {
                if ($(el).scrollTop() > 0)  //IE, FF
                    $(el).scrollTop(0);
            }

        }, 100);
   },

   scaleTextTitle : function(el, objective, text, rules){
       switch (objective){
           case 'title':
               if(text.length > rules.title.minLen){
                   el.addClass(rules.title.className);
               }
           break;
           default:
               if(text.length > rules.title.minLen){
                   el.addClass(rules.title.className);
               }
            break;
       }

   }

};