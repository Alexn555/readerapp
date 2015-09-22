$(document).ready(function(){

    var rssParser, readability, articleViewer, listContainer, articleContainer, loadingBar, Keys;

    function initialize(){
        listContainer = 'container';
        articleContainer = 'article_wrapper';
        loadingBar = '#loading';
        readability = {
            parserUrl: 'https://www.readability.com/api/content/v1/parser?url=',
            token: 'c608db1c712f7aa19054766a18eda9a8357ec1d1'
        }

        Keys = {
            enter: 13,
            escape: 27
        }

        articleViewer = new ArticleViewer();
        articleViewer.setup(articleContainer, { fadeIn: true, fadeOut: false }, readability, loadingBar);

        var rssSettings = {
            link: 'https://www.readability.com/rseero/latest/feed',
            limit: 12,
            pubDateFormat: 'daysAgo', //date, datetime, daysAgo
            showIcons: true
        }

        rssParser = new RSSParser();
        rssParser.setup(listContainer, rssSettings, readability, articleViewer);
        rssParser.start();

    }


    $('.close_article').on('tap click', function(e){
        e.preventDefault();
        articleViewer.hide();
        rssParser.disableBlur();
    });


    $('body').keypress(function (e) {
        if (e.keyCode == Keys.escape || e.keyCode === Keys.enter) {
            if($('#'+articleContainer).is(':visible')){
                articleViewer.hide();
                rssParser.disableBlur();
            }
        }
    });


    initialize();

});