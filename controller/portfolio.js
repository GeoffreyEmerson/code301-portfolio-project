(function() {

  var Controller = {};

  // Initialize page after loading data
  Controller.initPage = function() {
    allProjects(renderProjects);
    // displayPage('home'); // starting view
  };

  // Starts on pageload
  Controller.initPage();

})();
