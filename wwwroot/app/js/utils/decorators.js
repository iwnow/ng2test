/**@ experimental  */
function Log() {
    return function (target, name, descriptor) {
        console.log("[calling]:" + target.constructor.name + "." + name);
        console.dir(arguments);
        return descriptor;
    };
}
exports.Log = Log;
;
//# sourceMappingURL=decorators.js.map