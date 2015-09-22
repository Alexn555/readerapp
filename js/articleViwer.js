/**
 * Created by alexn555 on 9/1/2015.
 *
 * ArticleViewer - view selected article
 * using Readability (ParserApi)
 */

function ArticleViewer(){

    var containerDialog, viewContainer, showDelay,
        scrollContainer, $container, scaleText, fadeTimings, api_url, api_token, loadingBar,
        buildElems, defaultAuthor, enableFormatAuthor, enableFormatPubDate;

    function setup(_container, _fadeSettings, _readability, _loadingBar){
        containerDialog = _container;
        viewContainer = '.content';
        scrollContainer = 'article_show';
        api_token = _readability.token;
        api_url = _readability.parserUrl;

        showDelay = 500; //ms
        loadingBar =_loadingBar;
        enableFormatAuthor = true;
        enableFormatPubDate = true;
        defaultAuthor = 'Unknown author';

        $container = $('#'+containerDialog);
        fadeTimings = {
             fadeIn: (_fadeSettings.fadeIn) ? _fadeSettings.fadeIn : false, durationIn: 500,
             fadeOut: (_fadeSettings.fadeOut) ? _fadeSettings.fadeOut : false, durationOut: 500
        };

        scaleText = {
            title: { minLen: 65, className: 'article_titleSm' }
        }

        buildElems = {
           title: '.title',
           lead_image: '#article_head img',
           author: '.article_author',
           pubdate: '.article_pubdate'
        }

    }



    function getInfo(article){
        var url = article.link;
        $(loadingBar).show();
        $.getJSON(api_url + url +"&token="+api_token+"&callback=?",
            function (data) {
                $(buildElems.lead_image).attr('src', data.lead_image_url);
                $(buildElems.title).text(data.title)
                                   .removeClass(scaleText.title.className);
                if(data.lead_image_url !== null){
                    Utils.scaleTextTitle($(buildElems.title), 'title', data.title, scaleText);
                }

                var author = formatAuthor(data.author);
                var pubdate = formatPubDate(data.date_published);

                $(buildElems.author).text(author);
                $(buildElems.pubdate).text(pubdate);

                $(viewContainer).html(data.content);

                setTimeout(function(){ show(); }, showDelay);

            }
        );

    }


    function formatAuthor(str){
        if(!enableFormatAuthor) return str;
        if(str === null || str.length < 1){
            str = defaultAuthor;
        }
        return str;
    }

    function formatPubDate(str){
        if(!enableFormatPubDate) return str;
        if(str === null) return '';
        var prefix = ' from  ';
        return prefix + DateFormater.formatFromUSDate(str.substr(0, 10));
    }



    function show(){
        if(fadeTimings.fadeIn){
            $container.fadeIn(fadeTimings.durationIn);
        }else{
            $container.css('display', 'inherit');
        }
        Utils.scrollTop('#'+scrollContainer);
    }

    function hide(callback){
        $(loadingBar).hide();
        if(fadeTimings.fadeOut){
            $container.fadeOut(fadeTimings.durationOut, callback);
        }else{
            $container.css('display', 'none');
        }
    }



    //public methods
    this.setup = setup;
    this.hide = hide;
    this.getInfo = getInfo;

}