(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    var $ajaxResponse = $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/github/user/repos',
      success: function () {
        repos.all = $ajaxResponse.responseJSON;
        if (callback) callback();
      }
    });
  };

  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
