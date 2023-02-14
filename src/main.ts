import { API, PlatformAccessory } from "homebridge";
import { EsgiDummyAccessory } from "./esgi-dummy.accessory";

export default (api: API) => {
    api.registerAccessory('DummyESGI', EsgiDummyAccessory);
}
