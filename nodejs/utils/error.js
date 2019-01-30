module.exports = {
    send: (err, req, res, code = 400) => {
        console.log(`Erro: ${err}`);
        res.status(400).json({
            error: err
        });
    }
}