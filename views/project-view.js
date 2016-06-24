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
      scrollTo(choice);
    }
  };
  
  var scrollTo = setScrollFunction(50,8);

  function setScrollFunction(msBetweenJumps, divisions) {
    // msBetweenJumps determines the time between jumps. The lower the number, the higher the "frame rate".
    // divisions determines the fraction of the remaining distance to leap. The lower the number, the larger the jump.
    // Suggested settings: 50,8
    return function(element){
      var destination = document.getElementById(element);

      var smoothScrollTo = function(lastJump) {
        var nextJump = window.scrollY + Math.ceil((destination.offsetTop - window.scrollY) / divisions );
        if ( nextJump !== lastJump) {
          window.scroll(0, nextJump); // The built in scroll function takes an X and a Y value. This function is only concerned with Y scrolling.
          // TODO: I think there may be a difference beteen browsers as to the window.scroll function. Needs testing.
          window.setTimeout(smoothScrollTo, msBetweenJumps, nextJump);
        }
      };
      smoothScrollTo(window.scrollY);
    };
  }

  module.ProjectView = ProjectView;
})(window);
