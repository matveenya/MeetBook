import { createAuth } from "vue-auth3";
import driverAuthBasic from "vue-auth3/dist/drivers/auth/basic";
import driverHttpAxios from "vue-auth3/dist/drivers/http/axios";
import googleDriver from "./google";

export const auth = createAuth({
  drivers: {
    auth: driverAuthBasic,
    http: driverHttpAxios,
    oauth2: {
      google: googleDriver
    }
  }
});