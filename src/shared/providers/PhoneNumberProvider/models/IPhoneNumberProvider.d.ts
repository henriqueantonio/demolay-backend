interface IPhoneNumberProvider {
  sendSms(phoneNumber: string, message: string): Promise<void>;
}
