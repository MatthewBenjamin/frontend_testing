/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* RSS feeds */
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
            expect(feedLength).not.toBe(0);
        });

        it('has a URL', function() {
            for (var i = 0; i < feedLength; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        it('has a name', function() {
            for (var i = 0; i < feedLength; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
         });
    });


    /* Menu display */
    describe('The menu', function() {


        var $body = $('body')[0];

        // ensures the menu element is hidden by default
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
        // Feeds display has content
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
        // ensures when a new feed is loaded by the loadFeed function that the content actually changes
        var $oldContent;
        beforeEach(function(done) {
           loadFeed(0, function() {
               $oldContent = $('.feed').html();
               done();
           });
        });
        it('changes content', function(done) {
            loadFeed(1, function() {
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
