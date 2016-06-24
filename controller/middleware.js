(function(module) {
  var Middleware = {};

  Middleware.example = function(ctx, next, other) {
    console.log('--- Middleware report ---');
    console.log('This is the ctx object:');
    console.log(ctx);
    console.log('This is the "next" function:');
    console.log(next);
    console.log('Is there anything else passed in?');
    console.log(other);
    next();
  };

  module.Middleware = Middleware;
}(window));
