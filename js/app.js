var dataObject = {
  projectArray: projects
};

// function Projects(passedData) {
//   this.title = passedData.title;
//   this.imageUrl = passedData.imageUrl;
//   this.imageAlt = passedData.imageAlt;
//   this.caption = passedData.caption;
//   this.date = passedData.date;
//   this.save = function(){
//     dataObject.projects.push(this);
//   }
//   this.save();
// }

$(function() {
  var theTemplate = $('#projectTemplate').html();
  console.log(theTemplate);
  var compileThis = Handlebars.compile(theTemplate);
  console.log(compileThis);
  var inevitableResult = compileThis(dataObject);
  console.log(inevitableResult);
  $('#projectList').append(inevitableResult);
});
