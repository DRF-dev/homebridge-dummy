import { API, PlatformAccessory } from "homebridge";
// import { EsgiDummyAccessory } from "./esgi-dummy.accessory";
import { EsgiDummyAccessory1 } from "./esgi-dummy.accessory-1";
import express from 'express';

export default (api: API) => {
    // api.registerAccessory('DummyESGI', EsgiDummyAccessory);
    api.registerAccessory('DummyESGI', EsgiDummyAccessory1);

    api.on('didFinishLaunching', () => {
        const app = express()

        app.get('/', (req, res) => {
            const uuid = api.hap.uuid.generate('VentilESGI');
            const accessory = new api.platformAccessory(uuid, 'VentilESGI');

            if (accessory) {
                res.status(200).json({ accessory });
            } else {
                res.status(404).json({ message: 'Accessoire non trouvé.' });
            }
        });

        app.listen(4000, () => console.log('Listen on port 4000'));
    });
}
