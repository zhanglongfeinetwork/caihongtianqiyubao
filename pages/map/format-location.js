module.exports = function(t, i) {
    return t = t.toFixed(2), i = i.toFixed(2), {
        longitude: t.toString().split("."),
        latitude: i.toString().split(".")
    };
};