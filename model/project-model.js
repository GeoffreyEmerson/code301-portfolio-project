(function(module) {

  // Object constructor
  function Project(passedObject) {
    // Pull each key:value pair into the new object
    for (key in passedObject) { // I don't think this can be changed to an iterator.
      this[key] = passedObject[key];
    };
    this.relativeTimestamp;
  }

  Project.all = [];

  Project.allProjects = function(callback) {
    // This will be the first exposed function. It does nothing but return an array of
    //  the most up to date possible array of Project objects.
    if ( Project.all.length === 0 ) {
      Project.fetchAll(updateAndReturn);
    } else {
      updateAndReturn();
    };

    function updateAndReturn() {
      Project.all.forEach(function(project) {
        project.updateRelativeTimestamp(); // Update this whenever the array is requested.
      });
      callback(Project.all);
    };
  };

  Project.fetchAll = function (callback) {
    // This function will retrieve the data from either a local or remote source,
    // and process it, then hand off control to the View.
    var remoteUrl = 'simulatedRemoteServer.json';
    var currentETag = localStorage.projectETag;
    var storedData = localStorage.projectData;

    if (currentETag && storedData) {
      var $ajaxResponse = $.ajax({
        method: 'HEAD',
        url: remoteUrl,
        success: function () {
          tryLocalData($ajaxResponse.getResponseHeader('ETag'));
        }
        // TODO: Support AJAX HEAD request failure here
      });
    } else {
      // If there is no localStorage data and/or ETag
      getFreshData();
    }

    function tryLocalData(newETag) {
      // If there is an ETag in storage, and project data in storage, and
      //  the ETag matches what is in storage, then don't make any more ajax calls.
      if (newETag && newETag === currentETag) { // Use local data
        var parsedDataArray = JSON.parse(storedData); // Parse localStorage to usable data
        Project.loadAll(parsedDataArray); // Feed loaded data into the main array.
        if (callback) { callback(); } // If a callback function has been sent, use it here.
      } else {
        // If stored data is missing or out of data, use AJAX to get up to date.
        getFreshData();
      }
    }

    function getFreshData() {
      var $ajaxResponse = $.ajax({
        method: 'GET',
        url: remoteUrl,
        success: function () {
          ajaxSuccess();
        }
        // TODO: Support AJAX request failure here
        // TODO: Consider the possibility of empty localStorage and/or AJAX failure.
      });

      // Unlike many modern methods, the ajax call *returns* the data instead of
      //  handing it to the success function directly, so we don't need to pass anything.
      function ajaxSuccess() {
        Project.loadAll($ajaxResponse.responseJSON);

        // Cache the data in localStorage so next time we won't enter this "else"
        //  block (avoids hitting the server)
        localStorage.projectData = JSON.stringify(Project.all);
        localStorage.projectETag = $ajaxResponse.getResponseHeader('ETag');

        if (callback) { callback(); } // If a callback function has been sent, use it here.
      }
    }
  };

  Project.loadAll = function(jsonObject) {
    jsonObject.forEach(function(object){
      Project.all.push(new Project(object));
    });
  };

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

  module.allProjects = Project.allProjects; // NOTE: .allProjects() requires a callback function.
})(window);
