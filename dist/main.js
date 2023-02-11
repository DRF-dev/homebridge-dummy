"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var esgi_dummy_accessory_1 = require("./esgi-dummy.accessory");
exports.default = (function (api) {
    api.registerAccessory('DummyESGI', esgi_dummy_accessory_1.EsgiDummyAccessory);
});
