/* global $, describe, it, beforeEach, expect, toBeDefined, allFeeds, jasmine, setTimeout, loadFeed */

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* DONE: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('has a url for all feeds', function(){
             allFeeds.forEach(function(f){
                 expect(f.url).toBeDefined();
             });
         });


        /* DONE: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('has a name for all feeds', function(){
             allFeeds.forEach(function(f){
                 expect(f.name).toBeDefined();
             });
         });



    });


    /* DONE: Write a new test suite named "The menu" */
    describe('The menu', function(){

        /* DONE: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         *
         * Checking for the menu-hidden class + menu offset is offscreen
         */
         it('is hidden by default', function(){

             var menu = $('.slide-menu');

             expect(menu.parents().hasClass('menu-hidden')).toBe(true);
             expect(menu.offset().left).toBeLessThan(0);

         });

         /* DONE: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          *
          * Checking for the menu-hidden class
          */
          it('toggles visibility when clicked', function(){
              //because the selector to show/hide is ".menu-hidden .slide-menu",
              // I'm going to test for some parent of the menu having .menu-hidden
              var menu = $('.slide-menu');
              var link = $('.menu-icon-link');

              link.click();
              expect(menu.parents().hasClass('menu-hidden')).toBe(false);
              link.click();
              expect(menu.parents().hasClass('menu-hidden')).toBe(true);
          });
      });

    /* DONE: Write a new test suite named "Initial Entries" */
    describe('Initial entries', function(){

        /* use a 2-sec window for the async call to complete */
        beforeEach(function(done){
            setTimeout(function(){
                done();
            }, 2000);
        });

        /* DONE: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         *
         * I think the ^^instructions^^ could refer to either testing init(),
         * which calls loadFeed(0) when the app starts, or testing loadFeed in general.
         * I went with the former...
         */
        it('appear in the .feed', function(done){
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* DONE: Write a new test suite named "New Feed Selection" */
    describe('New feed selection', function(){

        /*
        * In this case no setTimeout is needed because I can call done() in a callback
        */
        beforeEach(function(done){
            done();
        });

        /* DONE: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         *
         * Use a random number to change the feed ID to anything but 0
         * which is the initial feed.
         */
         it('loads new content', function(done){
             var origContent = $('.feed').html();
             var randNum = Math.floor( 2.9999 * Math.random() + 1 );
             loadFeed(randNum, function(){
                 expect($('.feed').html()).not.toBe(origContent);
                 done();
             });
         });


    });
}());
