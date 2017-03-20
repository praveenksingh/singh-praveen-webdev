module.exports = function (app, model) {
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    var pageModel = model.pageModel;
    var websiteModel = model.websiteModel;

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.json(pages);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;

        pageModel.createPage(websiteId, page)
            .then(function (page){
                return websiteModel.addPageToWebsite(websiteId, page._id);
            })
            .then(function (page) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findPageById(req, res) {
        var pid = req.params.pageId;
        pageModel
            .findPageById(pid)
            .then(function (page) {
                res.send(page);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updatePage(req, res) {
        var pageId = req.params['pageId'];
        var newPage = req.body;
        pageModel.updatePage(pageId, newPage)
            .then(function (pages) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deletePage(req, res) {
        var pageId = req.params['pageId'];
        pageModel.deletePage(pageId)
            .then(function () {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};