// Initialize page
$(document).ready(function() {
  // Build object from saved data
  var data = {
    projectArray: []
  };
  for (var i = 0; i < projects.length; i++) {
    data.projectArray.push(new Project(projects[i]));
  }

  // Go through each object in the array, attach it to the DOM
  for (var i = 0; i < data.projectArray.length; i++) {
    data.projectArray[i].toHtml($('#articleTemplate'),$('#projectSection'));
  }

  displayPage('#home');
  setListeners();
});

function displayPage(choice) {
  $('.fullPage').hide();
  $(choice).fadeIn('slow');
}

function setListeners() {
  $('#menu').on('click', 'li', function(event){
    event.preventDefault();
    displayPage($(this).data('page'));
  });
}

// Object constructor
function Project(passedObject) {
  // Pull each key:value pair into the new object
  for (var key in passedObject) {
    this[key] = passedObject[key];
  }
  this.relativeTimestamp;
}

Project.prototype.toHtml = function(templateElement,appendDiv) {
  var $tempClone = templateElement.clone();
  $tempClone.find('h3').text(this.title);
  $tempClone.find('h5').text(this.date);
  this.updateRelativeTimestamp();
  $tempClone.find('h6').text('(' + this.relativeTimestamp + ' ago)');
  $tempClone.find('#projectUrl').attr('href', this.projectUrl);
  $tempClone.find('#imageUrl').attr('src', this.imageUrl);
  $tempClone.find('figcaption').text(this.caption);
  $tempClone.removeClass('template');
  appendDiv.append($tempClone);
}; // End of toHtml()

Project.prototype.updateRelativeTimestamp = function() {
  if (typeof(this.date) !== 'undefined') {
    var projectDate = new Date(this.date);
    var today = new Date();
    var timePassed = today - projectDate;
    this.relativeTimestamp = millisecondsToStr(timePassed);
  } else {
    this.relativeTimestamp = 'An unknown amount of time';
  }

  // Adapted from http://stackoverflow.com/questions/8211744/convert-time-interval-given-in-seconds-into-more-human-readable-form
  function millisecondsToStr(milliseconds) {
    function pluralize(number) {
      return (number > 1) ? 's' : '';
    }

    var seconds = Math.floor(milliseconds / 1000);
    var years = Math.floor(seconds / 31536000);
    if (years) {
      return years + ' year' + pluralize(years);
    }
    var days = Math.floor((seconds %= 31536000) / 86400);
    if (days) {
      if (days < 11) {
        return days + ' day' + pluralize(days);
      }
      var weeks = Math.ceil(days / 7);
      if (weeks < 4) {
        return weeks + ' weeks';
      }
      var months = Math.floor(weeks / 4);
      return months + ' month' + pluralize(months);
    }
    return 'less than a day'; //'just now' //or other string you like;
  };
}; // End of updateRelativeTimestamp()
