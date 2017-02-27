module.exports = function (app) {
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;

        var websitePages = [];
        for(var p in pages) {
            if(websiteId === pages[p].websiteId) {
                websitePages.push(pages[p]);
            }
        }
        res.json(websitePages);
    }

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        page.websiteId = websiteId;
        page._id = (new Date()).getTime().toString();;
        pages.push(page);
        res.sendStatus(200);
    }

    function findPageById(req, res) {
        var pid = req.params.pageId;
        for(var p in pages) {
            if(pages[p]._id === pid) {
                res.send(pages[p]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updatePage(req, res) {
        var pageId = req.params['pageId'];
        for(var p in pages) {
            var page = pages[p];
            if( page._id === pageId ) {
                var newPage = req.body;
                pages[p].name = newPage.name;
                pages[p].description = newPage.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deletePage(req, res) {
        var pageId = req.params['pageId'];
        for(var p in pages) {
            if(pages[p]._id === pageId) {
                pages.splice(p, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};