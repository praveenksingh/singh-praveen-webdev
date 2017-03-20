module.exports = function (app, model) {
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    var websiteModel = model.websiteModel;
    var userModel = model.userModel;

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (websites) {
                res.json(websites);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var website = req.body;
        websiteModel.createWebsiteForUser(userId, website)
            .then(function (website){
                return userModel.addWebsiteToUser(userId, website._id);
            })
            .then(function (website) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findWebsiteById(req, res) {
        var wid = req.params.websiteId;
        websiteModel
            .findWebsiteById(wid)
            .then(function (website) {
                res.send(website);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updateWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        var newWebSite = req.body;
        websiteModel.updateWebsite(websiteId, newWebSite)
            .then(function (webs) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        websiteModel.deleteWebsite(websiteId)
            .then(function () {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};