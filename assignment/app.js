module.exports = function (app) {
    var userModel = require('./models/user/user.model.server.js')();
    var websiteModel = require('./models/website/website.model.server')();
    var pageModel = require('./models/page/page.model.server')();
    var widgetModel = require('./models/widget/widget.model.server')();
    var model = {
        widgetModel: widgetModel,
        userModel: userModel,
        websiteModel : websiteModel,
        pageModel : pageModel
    };
    require("./services/user.service.server")(app, model);
    require("./services/website.service.server")(app, model);
    require("./services/page.service.server")(app, model);
    require("./services/widget.service.server")(app, model);
};