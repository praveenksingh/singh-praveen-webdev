module.exports = function (app) {
    var multer  =   require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

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

    // function uploadImage(req, res) {
    //     var userId = req.body.userId;
    //     var websiteId = req.body.websiteId;
    //     var pageId = req.body.pageId;
    //
    //     var widgetId      = req.body.widgetId;
    //     var width         = req.body.width;
    //     var myFile        = req.file;
    //     var originalname  = myFile.originalname; // file name on user's computer
    //     var filename      = myFile.filename;     // new file name in upload folder
    //     var path          = myFile.path;         // full path of uploaded file
    //     var destination   = myFile.destination;  // folder where file is saved to
    //     var size          = myFile.size;
    //     var mimetype      = myFile.mimetype;
    //     var url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
    //     //res.json({"url" : url});
    //     var widget;
    //     if(widgetId != undefined)
    //         widget = findWidgetById(widgetId);
    //     widget.url = '/uploads/'+filename;
    //
    //     var callbackUrl   = "/assignment/#/user/"+userId+"/website/"+websiteId+"page"+pageId;
    //     res.redirect(callbackUrl);
    //     // res.json(url);
    // }

    function uploadImage(req, res) {
        var widget      = req.body;
        var width       = req.body.width;
        var widgetId    = req.body.widgetId;
        var widgetType  = req.body.widgetType;
        var myFile      = req.file;
        var pageId      = req.body.pageId;
        var userId      = req.body.userId;
        var websiteId   = req.body.websiteId;
        if(widgetId === "")
        {
            var num = (new Date()).getTime();
            widget._id = num.toString();
            widget.widgetType = widgetType;
            widget.url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
            widgets.push(widget);
        }
        else {
            widget._id = widgetId;
            var url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
            for (var w in widgets) {
                var widget1 = widgets[w];
                if (widget1._id == widget._id) {
                    widgets[w].url = url;
                    widgets[w].width = width;
                    break;
                }
            }
        }

        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/"+widget._id);
    }


    function updateWidgetPos(req, res) {
        var initial = req.query['initial'];
        var final = req.query['final'];
        var pageId = req.params.pageId;
        var widgetsList = [];
        widgets = widgets.filter(function(x) {
            if(pageId === x.pageId) {
                widgetsList.push(x);
            }
            return widgets.indexOf(x) < 0
        });
        var widget  = widgetsList[initial];
        widgetsList.splice(initial, 1);
        widgetsList.splice(final,0, widget);
        widgets.push.apply(widgets, widgetsList);
        res.sendStatus(200);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;

        var widgetsList = [];
        for(var w in widgets) {
            if(pageId === widgets[w].pageId) {
                widgetsList.push(widgets[w]);
            }
        }
        res.json(widgetsList);
    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        widget.pageId = pageId;
        widget._id = (new Date()).getTime().toString();
        widgets.push(widget);
        res.sendStatus(200);
    }

    function findWidgetById(req, res) {
        var wid = req.params.widgetId;
        for(var w in widgets) {
            if(widgets[w]._id === wid) {
                res.send(widgets[w]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateWidget(req, res) {
        var widgetId = req.params['widgetId'];
        var widget = req.body;
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                widgets[w] = widget;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params['widgetId'];
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                widgets.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

};