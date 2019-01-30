let NeDB = require('nedb');
let db = new NeDB({
    filename: 'users.db',
    autoload: true
});
module.exports = (app) => {

    let route = app.route('/users');

    // route.get((req, res) => {
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'application/json');
    //     res.json({
    //         users: [{
    //             'name': 'Mateus Gabriel Barbosa',
    //             'email': 'devmateus@gmail.com',
    //             'id': 1
    //         }]
    //     });
    // });

    //PEGAR TODOS OS USUARIOS
    route.get((req, res) => {
        db.find({}).sort({
            name: 1
        }).exec((err, users) => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    users
                });
            }
        });
    });

    //INSERIR UM USUARIO
    route.post((req, res) => {
        // res.json(req.body);
        //FAZENDO A VALIDAÇÃO DOS CAMPOS
        if (!app.utils.validator.user(app, req, res)) return false;
        //INSERINDO OS DADOS NO NEDB
        db.insert(req.body, (err, user) => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(user);
            }
        });
    });

    let routeId = app.route('/users/:id');
    // PEGAR SOMENTE UM USUARIO
    routeId.get((req, res) => {
        db.findOne({
            _id: req.params.id
        }).exec((err, user) => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(user);
            }
        })
    });

    //ATUALIZAR UM USUARIO
    routeId.put((req, res) => {
        //FAZENDO A VALIDAÇÃO DOS CAMPOS
        if (!app.utils.validator.user(app, req, res)) return false;
        db.update({
            _id: req.params.id
        }, req.body, err => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(Object.assign(req.params, req.body));
            }
        })
    });

    //DELETAR UM USUARIO
    routeId.delete((req, res) => {
        db.remove({
            _id: req.params.id
        }, {}, err => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(req.params);
            }
        });
    });

};