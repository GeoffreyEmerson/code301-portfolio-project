var dataObject = {
  projectArray: projects
};

// function Projects(passedData) {
//   this.title = passedData.title;
//   this.imageUrl = passedData.imageUrl;
//   this.imageAlt = passedData.imageAlt;
//   this.caption = passedData.caption;
//   this.date = passedData.date;
//   this.save = function(){
//     dataObject.projects.push(this);
//   }
//   this.save();
// }

$(function() {
  var theTemplate = $('#projectTemplate').html();
  var compileThis = Handlebars.compile(theTemplate);
  var inevitableResult = compileThis(dataObject);
  $('#projectList').append(inevitableResult);
} );

function computeRelativeTimestamps() {
  for (var i = 0; i < dataObject.projectArray.length; i++) {
    var projectDate = new Date(dataObject.projectArray[i].date);
    var today = new Date();
    var timePassed = today - projectDate;
    dataObject.projectArray[i].ago = millisecondsToStr(timePassed);
  }
}

computeRelativeTimestamps();

// Shamelessly adapted from http://stackoverflow.com/questions/8211744/convert-time-interval-given-in-seconds-into-more-human-readable-form
function millisecondsToStr( milliseconds ) {
  // TIP: to find current time in milliseconds, use:
  // var  current_time_milliseconds = new Date().getTime();

  function numberEnding( number ) {
    return ( number > 1 ) ? 's' : '';
  }

  var temp = Math.floor( milliseconds / 1000 );
  var years = Math.floor( temp / 31536000 );
  if ( years ) {
    return years + ' year' + numberEnding( years );
  }
  var days = Math.floor( ( temp %= 31536000 ) / 86400 );
  if ( days ) {
    if (days < 11) {
      return days + ' day' + numberEnding( days );
    }
    var weeks = Math.ceil(days / 7);
    if (weeks < 4) {
      return weeks + ' weeks';
    }
    var months = Math.floor(weeks / 4);
    return months + ' month' + numberEnding( months );
  }
  var hours = Math.floor( ( temp %= 86400 ) / 3600 );
  if ( hours ) {
    return hours + ' hour' + numberEnding( hours );
  }
  var minutes = Math.floor( ( temp %= 3600 ) / 60 );
  if ( minutes ) {
    return minutes + ' minute' + numberEnding( minutes );
  }
  var seconds = temp % 60;
  if ( seconds ) {
    return seconds + ' second' + numberEnding( seconds );
  }
  return 'less than a second'; //'just now' //or other string you like;
}
