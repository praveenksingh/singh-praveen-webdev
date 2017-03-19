module.exports = function (app) {
    var userModel = require('./models/user.model.server')();
    var model = {
        userModel: userModel
    };
    require("./services/user.service.server")(app, model);
    require("./services/website.service.server")(app, model);
    require("./services/page.service.server")(app, model);
    require("./services/widget.service.server")(app, model);
};