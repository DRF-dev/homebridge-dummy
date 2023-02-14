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
            res.status(200).json({ state: EsgiDummyAccessory1.on });
        });

        app.listen(4000, () => console.log('Listen on port 4000'));
    });
}
