"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EsgiDummyAccessory = void 0;
var EsgiDummyAccessory = /** @class */ (function () {
    function EsgiDummyAccessory(logger, config, api) {
        this.logger = logger;
        this.config = config;
        this.api = api;
        this.logger.info('ESGI Dummy started');
        this.on = 0;
        var informationService = new api.hap.Service.AccessoryInformation();
        informationService.setCharacteristic(api.hap.Characteristic.SerialNumber, 'randomserialnumber')
            .setCharacteristic(api.hap.Characteristic.Manufacturer, 'ESGI')
            .setCharacteristic(api.hap.Characteristic.Model, 'Dummy');
        this.informationService = informationService;
        var fanService = new api.hap.Service.Fan('VentilESGI');
        fanService.getCharacteristic(api.hap.Characteristic.Active)
            .on('get', this.getActiveState.bind(this))
            .on('set', this.updateActiveState.bind(this));
        this.fanService = fanService;
    }
    EsgiDummyAccessory.prototype.getServices = function () {
        return [this.informationService, this.fanService];
    };
    EsgiDummyAccessory.prototype.getActiveState = function (callback) {
        callback(null, this.on);
    };
    EsgiDummyAccessory.prototype.updateActiveState = function (state, callback) {
        this.on = state;
        callback();
    };
    return EsgiDummyAccessory;
}());
exports.EsgiDummyAccessory = EsgiDummyAccessory;
