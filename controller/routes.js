(function (module) {
  page.base('/');

  page('', index);
  page('home', index);
  page('about', about);
  page('projects', projects);
  page('contact', contact);
  page('*', notFound);
  page();

  function index() {
    displayPage('home');
  }

  function about() {
    displayPage('about');
  }

  function projects() {
    displayPage('projects');
  }

  function contact() {
    displayPage('contact');
  }

  function notFound() {
    displayPage('notFound'); // TODO: not made yet
  }

})(window);
