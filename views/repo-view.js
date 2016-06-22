(function(module) {
  var repoView = {};

  var render = Handlebars.compile(gitRepoTemplate);

  repoView.index = function() {
    repos.requestRepos(function(){
      $('#githubRepos').append( repos.with('name').map(render) );
    });
  };

  module.repoView = repoView;
})(window);
