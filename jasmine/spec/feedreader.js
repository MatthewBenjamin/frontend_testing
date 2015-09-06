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
        var feedLength = allFeeds.length;

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has a URL', function() {
            for (var i = 0; i < feedLength; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('has a name', function() {
            for (var i = 0; i < feedLength; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
         });
    });


    /* Menu display */
    describe('The menu', function() {

        // ensures the menu element is hidden by default
        var $body = $('body')[0];

        it('is hidden by default', function() {
            expect($body.classList[0]).toBe('menu-hidden');
        });

        //ensures the menu toggles visibility when the menu icon is clicked
        it('toggles display', function() {
            var $icon = $('.menu-icon-link')[0];
            $icon.click();
            expect($body.classList[0]).not.toBeDefined();
            $icon.click();
            expect($body.classList[0]).toBe('menu-hidden');
        });
    });

    /* Initial Entries */
    describe('Initial entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
           $('.feed').empty();
           loadFeed(0);
           done();
        });
        it('has an entry', function() {
            var $entries = $('.feed a .entry');
            expect($entries).toBeDefined();
        });
    });

    /* "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var $oldContent;
        beforeEach(function(done) {
           loadFeed(0, function() {
               $oldContent = $('.feed').html();
               done();
           });
        });
        it('changes content', function(done) {
            loadFeed(1, function() {
                //console.log('***OLD CONTENT*** ', $oldContent);
                //console.log('***NEW CONTENT***', $('.feed').html());
                expect($('.feed').html()).not.toBe($oldContent);
                done();
            });
        });
        //reset to initial state
        afterAll(function(done) {
            loadFeed(0, done);
        })
    });

    /* Features not yet implemented */
    describe('Add New Feed', function() {
        var oldFeedCount = allFeeds.length;
        var name = 'test';
        var url = 'test';
        it('should add a new RSS feed', function () {
            addFeed(name, url);
            expect(oldFeedCount).toBe(allFeeds.length - 1);
        })
    });
}());
