(function() {

  var Controller = {};

  // Initialize page after loading data
  Controller.initPage = function() {
    allProjects(renderProjects);
    displayPage('#home'); // starting view
    setListeners(); // navbar listeners
  };

  function setListeners() {
    $('#menu').on('click', 'li', function(event){
      event.preventDefault();
      displayPage($(this).data('page'));
    });
  };

  function displayPage(choice) {
    if (screen.width > 699 ) { // mobile view uses a single page scrolling view
      $('.fullPage').fadeOut('500');
      $(choice).delay('500').fadeIn('slow');
    }
  };

  // Starts on pageload
  Controller.initPage();

})();
