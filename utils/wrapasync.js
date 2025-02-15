module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}
// it is the better form of try caacth format, so we avoid try catch block... ok 
// and better than wrapasync is expresserror 