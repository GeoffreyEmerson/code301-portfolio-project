(function(module) {
  var ProjectView = {};

  ProjectView.toHtml = Handlebars.compile(articleTemplate);

  ProjectView.renderProjects = function(projectArray) {
    projectArray.forEach(function(project) {
      $('#projectSection').append(ProjectView.toHtml(project));
    });
  }; // End of renderProjects()

  module.renderProjects = ProjectView.renderProjects;
})(window);
