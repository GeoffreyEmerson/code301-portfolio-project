(function(module) {

  var Controller = {};

  // Initialize page after loading data
  Controller.initPage = function() {
    allProjects(ProjectView.renderProjects);
  };

  // Starts on pageload
  Controller.initPage();

  Controller.index = function() {
    ProjectView.displayPage('home');
  };

  Controller.about = function() {
    ProjectView.displayPage('about');
  };

  Controller.projects = function() {
    ProjectView.displayPage('projects');
  };

  Controller.contact = function() {
    ProjectView.displayPage('contact');
  };

  Controller.notFound = function() {
    ProjectView.displayPage('notFound'); // TODO: not made yet
  };

  module.Controller = Controller;
})(window);
