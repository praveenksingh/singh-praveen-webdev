module.exports = function (app, model) {
    var multer  =   require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    var widgetModel = model.widgetModel;
    var pageModel = model.pageModel;

    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.put('/api/page/:pageId/widget', updateWidgetPos);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);


    function uploadImage(req, res) {
        var widget      = req.body;
        var width       = req.body.width;
        var text        = req.body.text;
        var widgetId    = req.body.widgetId;
        var widgetType  = req.body.widgetType;
        var myFile      = req.file;
        var pageId      = req.body.pageId;
        var userId      = req.body.userId;
        var websiteId   = req.body.websiteId;
        if(myFile === undefined){
            return;
        }
        if(widgetId === "")
        {
            widget.width = width+"%";
            widget.text = text;
            widget.widgetType = widgetType;
            widget.url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
            widgetModel.createWidget(pageId, widget)
                .then(function (widget) {
                    res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/"+widget._id);
                }, function (err) {
                    res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
                });

        }
        else {
            var url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
            widgetModel
                .findWidgetById(widgetId)
                .then(function (widget) {
                    widget.url = url;
                    widget.width = width;
                    widget.text = text;
                    widgetModel.updateWidget(widgetId, widget)
                        .then(function (widget) {
                            res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/"+widget._id);
                        }, function (err) {
                            res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
                        });

                }, function (err) {
                    res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
                });
        }

        // res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/"+widget._id);
    }


    function updateWidgetPos(req, res) {
        var initial = req.query['initial'];
        var final = req.query['final'];
        var pageId = req.params.pageId;
        // var widgetsList = [];
        // widgets = widgets.filter(function(x) {
        //     if(pageId === x.pageId) {
        //         widgetsList.push(x);
        //     }
        //     return widgets.indexOf(x) < 0
        // });
        widgetModel
            .reorderWidget(pageId, initial, final)
            .then(function (widgets) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
        // var widget  = widgetsList[initial];
        // widgetsList.splice(initial, 1);
        // widgetsList.splice(final,0, widget);
        // widgets.push.apply(widgets, widgetsList);
        res.sendStatus(200);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        widgetModel.createWidget(pageId, widget)
            .then(function (widgets) {
                pageModel.addWidgetToPage(pageId, widgets._id)
                    .then(function (widget) {
                        res.json(widgets).send(200);
                    }, function (err) {
                        res.sendStatus(500).send(err);
                    });
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findWidgetById(req, res) {
        var wid = req.params.widgetId;
        widgetModel
            .findWidgetById(wid)
            .then(function (widget) {
                res.send(widget);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updateWidget(req, res) {
        var widgetId = req.params['widgetId'];
        var widget = req.body;
        widgetModel.updateWidget(widgetId, widget)
            .then(function (wid) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteWidget(req, res) {
        var widgetId = req.params['widgetId'];
        var pageId = req.params['pageId'];
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                widgetModel
                    .deleteWidget(widgetId)
                    .then(function (status) {
                        pageModel
                            .deleteWidgetFromPage(widget._page, widgetId)
                            .then(function (status) {
                                res.sendStatus(200);
                            }, function (err) {
                                res.sendStatus(500).send(err);
                            });
                    }, function (err) {
                        res.sendStatus(500).send(err);
                    });
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

};