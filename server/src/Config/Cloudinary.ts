import Cloud, { v2 } from "cloudinary";
import { EnvironmentVariables } from "./EnvironmentVariables";
const cloudinary: typeof v2 = Cloud.v2;

cloudinary.config({
  cloud_name: "dev-sylvia",
  api_key: EnvironmentVariables.API_KEY,
  api_secret: EnvironmentVariables.API_SECRET,
  secure: true,
});

export default cloudinary;
