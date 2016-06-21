(function(module) {
  var ProjectView = {};

  ProjectView.toHtml = Handlebars.compile(articleTemplate);

  ProjectView.renderProjects = function(projectArray) {
    projectArray.forEach(function(project) {
      $('#projectSection').append(ProjectView.toHtml(project));
    });
  }; // End of renderProjects()

  ProjectView.displayPage = function(choice) {
    if (screen.width > 699 ) { // mobile view uses a single page scrolling view
      $('.fullPage').fadeOut('500');
      $('#' + choice).delay('500').fadeIn('slow');
    } else {
      // TODO: scroll to section
    }
  };

  module.ProjectView = ProjectView;
})(window);
