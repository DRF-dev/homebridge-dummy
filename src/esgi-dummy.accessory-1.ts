import { API, Logging, AccessoryPlugin, Controller, ControllerServiceMap, Service, AccessoryConfig, CharacteristicGetCallback, CharacteristicSetCallback} from "homebridge";
// import axios from 'axios';

export class EsgiDummyAccessory1 implements AccessoryPlugin {
    private informationService: Service;
    private fanService: Service;
    public static on: number;

    constructor(public logger: Logging, public config: AccessoryConfig, public api: API) {
        this.logger.info('ESGI Dummy started');

        EsgiDummyAccessory1.on = 0;

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
        callback(null, EsgiDummyAccessory1.on);
    }

    updateActiveState(state: number, callback: CharacteristicSetCallback) {
        EsgiDummyAccessory1.on = state;
        console.log('state:', state);
        /*axios.put('https://watchos-back.drfperso.ovh/api/user/1', {
            firstName: "John",
            lastName: "Doe"
        });*/
        callback();
    }
}
