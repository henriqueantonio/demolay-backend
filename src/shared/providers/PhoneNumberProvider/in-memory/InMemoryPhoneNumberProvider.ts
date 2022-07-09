class InMemoryPhoneNumberProvider implements IPhoneNumberProvider {
  public async sendSms(phoneNumber: string, message: string): Promise<void> {
    console.log(`Sending SMS to ${phoneNumber} with message: ${message}`);
  }
}

export { InMemoryPhoneNumberProvider };
