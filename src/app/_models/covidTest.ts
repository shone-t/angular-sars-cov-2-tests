export class CovidTest {
  uuid?: string;
  name: string | undefined;
  address: string | undefined;
  dateOfBirth: string | undefined;
  emailOrTelephone: string | undefined;
  idUser: string | undefined;
  idEmployee?: string | undefined;
  userName: string | undefined;
  testResult: boolean | undefined;
  createdTest: Date | undefined;
  internalMessage?: string;
}
