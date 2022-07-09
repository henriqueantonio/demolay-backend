import { BCryptHashProvider } from "./HashProvider/implementations/BCryptHashProvider";
import { InMemoryPhoneNumberProvider } from "./PhoneNumberProvider/in-memory/InMemoryPhoneNumberProvider";

const hashProvider = new BCryptHashProvider();
const phoneNumberProvider = new InMemoryPhoneNumberProvider();

export { hashProvider, phoneNumberProvider };
