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

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

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
        if(widgetId === "")
        {
            widget.width = width+"%";
            widget.text = text;
            widget.widgetType = widgetType;
            widget.url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
            widgetModel.createWidget(pageId, widget);
            // widgets.push(widget);
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

        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/"+widget._id);
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
            .then(function (widget) {
                pageModel.addWidgetToPage(pageId, widget._id)
                    .then(function (widget) {
                        res.json(widget).send(200);
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