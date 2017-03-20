module.exports = function (app) {
    var userModel = require('./models/user/user.model.server.js')();
    var websiteModel = require('./models/website/website.model.server')();
    var pageModel = require('./models/page/page.model.server')();
    var model = {
        userModel: userModel,
        websiteModel : websiteModel,
        pageModel : pageModel
    };
    require("./services/user.service.server")(app, model);
    require("./services/website.service.server")(app, model);
    require("./services/page.service.server")(app, model);
    require("./services/widget.service.server")(app, model);
};