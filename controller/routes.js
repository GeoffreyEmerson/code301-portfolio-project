(function (module) {
  page.base('/');

  page('', Middleware.example, Controller.index);
  page('home', Middleware.example, Controller.index);
  page('about', Middleware.example, Controller.about);
  page('projects', Middleware.example, Controller.projects);
  page('contact', Middleware.example, Controller.contact);
  page('*', Middleware.example, Controller.notFound);
  page();

})(window);
