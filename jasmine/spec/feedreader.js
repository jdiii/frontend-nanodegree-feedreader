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
                 expect(f.url.length).not.toBe(0);
                 expect(typeof f.url).toBe('string');
             });
         });


        /* DONE: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         *
         * Added a check for the type to be string
         * since defined w/ length could imply array or object
         */
         it('has a name for all feeds', function(){
             allFeeds.forEach(function(f){
                 expect(f.name).toBeDefined();
                 expect(f.name.length).not.toBe(0);
                 expect(typeof f.name).toBe('string');
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
         * Checking for the menu-hidden class
         */
         it('is hidden by default', function(){

             var menu = $('.slide-menu');

             expect(menu.parents().hasClass('menu-hidden')).toBeTruthy();

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
              var menu = $('.slide-menu'), link = $('.menu-icon-link');

              link.click();
              expect(menu.parents().hasClass('menu-hidden')).toBeFalsy();
              link.click();
              expect(menu.parents().hasClass('menu-hidden')).toBeTruthy();
          });
      });

    /* DONE: Write a new test suite named "Initial Entries" */
    describe('Initial entries', function(){

        beforeEach(function(done){
            done();
        });

        /* DONE: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('appear in the .feed', function(done){

            //load a random feed and see if it generates entries in the feed
            var feed = Math.floor(Math.random() * 3.9999);
            loadFeed(feed, function(){
                expect($('.feed .entry').length).toBeGreaterThan(0);
                done();
            });

        });

    });

    /* DONE: Write a new test suite named "New Feed Selection" */
    describe('New feed selection', function(){

        beforeEach(function(done){
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            done();
        });

        /* DONE: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         //load 2 different random feeds
         //compare the html strings for inequality
         it('loads new content', function(done){

             var feeds = [0,1,2,3],
                feed1 = feeds.splice(Math.floor(Math.random() * 3.9999), 1),
                feed2 = feeds.splice(Math.floor(Math.random() * 2.9999), 1),
                html1, html2;


             loadFeed(feed1, function(){
                 html1 = $('.feed').html();

                 loadFeed(feed2, function(){

                     html2 = $('.feed').html();
                     expect(html2).not.toBe(html1);
                     done();

                 });

             });

         });


    });
}());
