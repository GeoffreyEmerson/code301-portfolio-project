(function (module) {
  page.base('/');

  page('', Controller.index);
  page('home', Controller.index);
  page('about', Controller.about);
  page('projects', Controller.projects);
  page('contact', Controller.contact);
  page('*', Controller.notFound);
  page();

})(window);
