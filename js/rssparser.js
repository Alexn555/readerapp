/**
 * Created by alexn555 on 9/1/2015.
 *
 * Rss Parser - parse rss and output html content
 * using Google Feed API
 */

function RSSParser(){

   var rssLink, readability, showIcons, container, $container, imgDefault, enableParseDate, blurEffectCl, scaleText,
       pubDateFormat, limit, entryStyleClasses, _articleViwer, googleParseUrl;

   function setup(container, _rssSettings, _readability, _articleViewer){
       if(!container || !_rssSettings) throw('No rss vital elements given!');
       readability = _readability;

       container = container;
       $container = $('#'+container);
       rssLink = _rssSettings.link;
       _articleViwer = _articleViewer;
       limit = (_rssSettings.limit) ? _rssSettings.limit : -1;
       googleParseUrl = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&callback=?&q=';
       showIcons = _rssSettings.showIcons;

       imgDefault = 'images/empty.png';
       blurEffectCl = 'ContBlurred';
       enableParseDate = true;
       pubDateFormat = DateFormater.getFormat(_rssSettings.pubDateFormat);

       scaleText = {
           title: { minLen: 60, className: 'article_short_titleSm' }
       }

       entryStyleClasses = {
           mainDiv: 'article_short',
           title: 'pubtitle',
           preview: 'article_preview',
           pubdate: 'pubdate'
       }

   }


    function parse_GoogleAjax(){
        $.ajax({
            url : googleParseUrl + encodeURIComponent(rssLink),
            dataType : 'json',
            success  : function (data) {
                if (data.responseData.feed && data.responseData.feed.entries) {
                    $container.html("");
                    $.each(data.responseData.feed.entries, function (i, entry) {
                        if(limit > 0 && i >= limit){
                            return;
                        }
                        buildFromRSSData(i, entry);
                    });
                }
            },
            error: function (jqXHR, statusText, errorText) {
                alert('Error parsing RSS: ' + errorText)
            }

        });

    }


    /** Build html data from given rss */
    function buildFromRSSData(i, entry){
        var article = $("<div class='"+entryStyleClasses.mainDiv+"'>");
        var image = $("<img>")
            .attr("src", imgDefault);
        var title = $("<span class='"+entryStyleClasses.title+"'>")
            .html(entry.title);

        var pubDateText = parsePubDate(entry.publishedDate);
        var pubdate = $("<span class='"+entryStyleClasses.pubdate+"'>")
            .html(pubDateText);
        var description = $("<p class='"+entryStyleClasses.preview+"'>")
            .html(entry.contentSnippet);

        article.append(title)
                .append(image)
                .append(description)
                .append(pubdate);

        Utils.scaleTextTitle(title, 'title', entry.title, scaleText);

        article.on('click tap', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $container.removeClass().addClass(blurEffectCl);
            _articleViwer.getInfo(entry);
        });

        //get icons
        if(showIcons){
            $.getJSON(readability.parserUrl + entry.link +"&token=" + readability.token +"&callback=?",
                function (data) {
                    if(data.lead_image_url !== null)
                     image.attr('src', data.lead_image_url);
                }
            );
        }


        $container.append(article);

        //logData(i, entry);
    }


    function parsePubDate(str){
       if(!enableParseDate) return str;
        var fulldate = str.substr(0, str.length-6);
        str = DateFormater.formatDate(pubDateFormat, fulldate);
        return str;
    }

    function disaleBlur(){
        $container.removeClass(blurEffectCl);
    }

    function logData(i, entry){
        console.log("------------------------ " + JSON.stringify(entry));
    }


    //public methods
    this.setup = setup;
    this.start = parse_GoogleAjax;
    this.disableBlur = disaleBlur;

}