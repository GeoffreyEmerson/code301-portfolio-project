(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    var $ajaxResponse = $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/github/user/repos',
      success: function () {
        console.log('Proxy AJAX call successful.');
        repos.all = $ajaxResponse.responseJSON;
        if (callback) callback();
      },
      error: function() {
        console.log('Proxy AJAX call has failed. Trying direct request.');
        var $ajaxResponse = $.ajax({
          method: 'GET',
          url: 'https://api.github.com/users/GeoffreyEmerson/repos',
          success: function () {
            console.log('Direct AJAX request success.');
            repos.all = $ajaxResponse.responseJSON;
            if (callback) callback();
          },
          error: function() {
            console.log('Direct AJAX call has failed. Aborting.');
          }
        });
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
