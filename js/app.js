(function() {

  // Object constructor
  function Project(passedObject) {
    // Pull each key:value pair into the new object
    for (key in passedObject) { // I don't think this can be changed to an iterator.
      this[key] = passedObject[key];
    };
    this.relativeTimestamp;
  }

  Project.all = [];

  Project.compileTemplate = function(templateHtml) {
    this.handlebarsFunc = Handlebars.compile(templateHtml);
  };

  Project.toHtml = function(appendDiv) {
    Project.all.forEach(function(project) {
      project.updateRelativeTimestamp(); // gotta have these up to date!
      appendDiv.append( Project.handlebarsFunc(project) );
    });
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

  // This function will retrieve the data from either a local or remote source,
  // and process it, then hand off control to the View.
  Project.fetchAll = function () {
    var remoteUrl = 'simulatedRemoteServer.json';

    if (localStorage.projectETag) {
      var $ajaxResponse = $.ajax({
        method: 'HEAD',
        url: remoteUrl,
        success: function () {
          continueFetching($ajaxResponse.getResponseHeader('ETag'));
        }
      });
    } else {
      continueFetching(null);
    }

    function continueFetching(headTag) {
      if (headTag && headTag === localStorage.projectETag && localStorage.projectData) {
        // When projectData is already in localStorage and the ETag indicates no updates,
        // we can just quickly get it from localStorage.
        var storageObject = JSON.parse(localStorage.projectData);
        Project.loadAll( storageObject ); // Feed loaded data into the main dish.
        Project.initPage(); // Initialize the page after loading data.
      } else {
        // If localStoragedoes not have a current copy of projectData,
        // we need to get it from the "remote server".
        var $ajaxResponse = $.ajax({ // The ajax() gives us the data, but also the headers
          method: 'GET',
          url: remoteUrl,
          success: function () {
            callBackFunction();
          }
        });

        // Unlike many modern methods, the ajax call *returns* the data instead of
        //  handing it to the callback function directly, so we don't need to pass anything.
        function callBackFunction() {
          Project.loadAll($ajaxResponse.responseJSON);

          // 3. Cache the data in localStorage so next time we won't enter this "else" block (avoids hitting the server),
          localStorage.projectData = JSON.stringify(Project.all);
          localStorage.projectETag = $ajaxResponse.getResponseHeader('ETag');

          // 4. Render the index page
          Project.initPage();
        }
      }
    }
  };

  Project.loadAll = function(jsonObject) {
    jsonObject.forEach(function(object){
      Project.all.push(new Project(object));
    });
  };

  // Initialize page after loading data
  Project.initPage = function() {
    displayPage('#home'); // starting view
    setListeners(); // navbar listeners
    Project.compileTemplate($('#articleTemplate').html()); // Prep Handlebars
    Project.toHtml($('#projectSection')); // Go through the array and attach projects to the DOM
  };

  function displayPage(choice) {
    if (screen.width > 699 ) { // mobile view uses a single page scrolling view
      $('.fullPage').fadeOut('500');
      $(choice).delay('500').fadeIn('slow');
    }
  }

  function setListeners() {
    $('#menu').on('click', 'li', function(event){
      event.preventDefault();
      displayPage($(this).data('page'));
    });
  }

  // Export endpoint
  window.loadData = Project.fetchAll;
})();
