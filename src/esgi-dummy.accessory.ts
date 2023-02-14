import { API, Logging, AccessoryPlugin, Controller, ControllerServiceMap, Service, AccessoryConfig, CharacteristicGetCallback, CharacteristicSetCallback} from "homebridge";

export class EsgiDummyAccessory implements AccessoryPlugin {
    private informationService: Service;
    private fanService: Service;
    private on: number;

    constructor(public logger: Logging, public config: AccessoryConfig, public api: API) {
        this.logger.info('ESGI Dummy started');

        this.on = 0;

        const informationService = new api.hap.Service.AccessoryInformation();
        informationService.setCharacteristic(api.hap.Characteristic.SerialNumber, 'randomserialnumber')
            .setCharacteristic(api.hap.Characteristic.Manufacturer, 'ESGI')
            .setCharacteristic(api.hap.Characteristic.Model, 'Dummy');
        this.informationService = informationService;

        const fanService = new api.hap.Service.Fan('VentilESGI');
        fanService.getCharacteristic(api.hap.Characteristic.Active)
            .on('get', this.getActiveState.bind(this))
            .on('set', this.updateActiveState.bind(this));
        this.fanService = fanService;
    }

    getServices(): Service[] {
        return [this.informationService, this.fanService];
    }

    getActiveState(callback: CharacteristicGetCallback) {
        callback(null, this.on);
    }

    updateActiveState(state: number, callback: CharacteristicSetCallback) {
        this.on = state;
        console.log('state:', state);
        callback();
    }
}
