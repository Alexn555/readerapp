/**
 * Created by alexn555 on 9/1/2015.
 */
var DateFormater = {

    constants:{
        week: 7,
        year: 365
    },

    formats: [
        'datetime', //dd:m:year
        'date', //d:m:yeah h:m:s
        'daysAgo'//[n] days (years) ago
    ],


  getFormat : function(_format){
     if(!_format) return this.formats[0];
     var i, ln;
     ln = this.formats.length;
     for(i = 0; i < ln;i++){
         if(_format === this.formats[i]){
             return this.formats[i];
         }
    }
  },


   formatDate : function(format, fulldate){
      var str = fulldate;

      if(format === this.formats[1]){
         str = str.substr(0, 17);
      }
      else if(format === this.formats[2]){
          var DaysAgo = DateFormater.getDaysBetween(new Date(), new Date(str));
          str = this.formateDaysAgo(DaysAgo);
      }

      return str;
  },

  formateDaysAgo: function(days){
      var str, lastPrefix,  prefixes;
      str = '';
      lastPrefix = ' ago';
      prefixes = [
           'day', 'days',
           'week', 'weeks',
           'month', 'months',
           'year', 'years'
       ]

      if(days <= this.constants.week){
          str = days + ' '  + ((!this.isMultipleDays(days)) ? prefixes[0] : prefixes[1]);
      }
      else if(days > this.constants.week && days <= this.constants.year){
          var totalWeeks = Math.round(days / this.constants.week);
          str =  Math.round(days / this.constants.week) + ' ' + ((!this.isMultipleDays(totalWeeks)) ? prefixes[2] : prefixes[3]);
      }
      else if(days > this.constants.year){
          var totalYears = Math.round(days / this.constants.year) ;
          str = Math.round(days / this.constants.year) + ' ' + ((!this.isMultipleDays(totalYears)) ? prefixes[6] : prefixes[7]);
      }

      return str + lastPrefix;
  },

   isMultipleDays: function(num){
       return (num % 10 == 1) ? false : true;
   },


   dateToTimeStamp: function(str){
        return (new Date(str)).getTime() / 1000;
   },

   getDaysBetween: function(date1, date2) {

        // The number of milliseconds in one day
        var ONE_DAY = 1000 * 60 * 60 * 24

        // Convert both dates to milliseconds
        var date1_ms = date1.getTime()
        var date2_ms = date2.getTime()

        // Calculate the difference in milliseconds
        var difference_ms = Math.abs(date1_ms - date2_ms)

        // Convert back to days and return
        return Math.round(difference_ms/ONE_DAY)

   },

   formatFromUSDate : function(str){
       var strparts, date;
       date = new Date(str);

       str = date.toString().substr(0, 15)
       strparts = str.split(' ');

       str = strparts[0] + ', ' + strparts[1] + ' '  + strparts[2] + ' ' + strparts[3];

       return str;
   }




};
