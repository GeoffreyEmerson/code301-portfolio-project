(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    var $ajaxResponse = $.ajax({
      method: 'GET',
      url: 'https://api.github.com/user/repos?access_token=' + $OAUTHTOKEN,
      success: function () {
        console.log($ajaxResponse.responseJSON);
        repos.all = $ajaxResponse.responseJSON;
        if (callback) callback();
      }
    });
  };
  // repos.requestRepos(); // Immediate execution for testing

  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
