// TODO: delete unused error message and follow guideline for constant value
export const ERROR_MESSAGE = {
  UNAUTHORIZED: 'Access unauthorized',
  INVALID_EMAIL_PASSWORD: 'Email or password invalid',
  AUTHENTICATED_USER_NOT_FOUND: 'Authenticated user not found',
  AUTHENTICATED_USER_NOT_FOUND_IN_REQUEST:
    'Authenticated user not found in the request',
  USER_NOT_FOUND: 'User not found',
  EMAIL_ALREADY_EXISTS: (email: string) => `Email ${email} is already exists`,
  CANNOT_DELETE_OWN_ACCOUNT: 'You cannot delete your own account',
  ADMIN_ROLE_REQUIRED: 'Admin role required to access this resource',
  INVALID_ENUM: (allowed: readonly string[]) =>
    `Value is invalid. Must be one of: ${allowed.join(', ')}`,
  ForbiddenAccess: 'Forbidden Access',
  NotFound: 'Not Found',
  InternalServerError: 'Internal Server Error',
  BadRequest: 'Bad Request',
  Conflict: 'Conflict',
  ValidationError: 'Validation Error',
  REQUIRED_FIELD: 'Field required',
  ArrayMinimumLength: (length: number) =>
    `Minimal harus memilih ${length} data`,
  INVALID_UUID: 'UUID invalid format',
  SelectionMinimum: (minimum: number, field: string) =>
    `Minimal pilih ${minimum} ${field}`,
  DateFormatInvalid: (format: string) => `Format tanggal harus ${format}`,
  DateFormatMustBeYYYYMMDD:
    'Format tanggal harus YYYY-MM-DD, contoh: 2025-05-30',
  MIN_LENGTH_CHARACTERS: (length: number) =>
    `Must contain at least ${length} characters`,
  FieldInvalidValue: 'Field Invalid Value',
  QueryError: 'Query Error',
  DataNotFound: 'Data Not Found',
  LengthCharacter: (length: number) => `Field harus ${length} karakter`,
  EmailsAlreadyExists: (emails: string[]) =>
    `Email(s) ${emails.join(', ')} sudah terdaftar`,
  PhoneNumberAlreadyExists: (phoneNumber: string) =>
    `Nomor telepon ${phoneNumber} sudah terdaftar`,
  PhoneNumbersAlreadyExists: (phoneNumbers: string[]) =>
    `Nomor telepon ${phoneNumbers.join(', ')} sudah terdaftar`,
  NPWPAlreadyExists: (npwp: string) => `NPWP ${npwp} sudah terdaftar`,
  NPWPsAlreadyExists: (npwps: string[]) =>
    `NPWP ${npwps.join(', ')} sudah terdaftar`,
  CompanyEmailAlreadyExists: (companyEmail: string) =>
    `Email Perusahaan ${companyEmail} sudah terdaftar`,
  CompanyNameAlreadyExists: (companyName: string) =>
    `Nama Perusahaan ${companyName} sudah terdaftar`,
  CompanyNamesAlreadyExists: (companyNames: string[]) =>
    `Nama Perusahaan ${companyNames.join(', ')} sudah terdaftar`,
  CompanyByIdNotFound: (id: string, type: string) =>
    `${type} ${id} tidak ditemukan`,
  CompanyNotFound: (type: string) => `${type} tidak ditemukan`,
  FieldDuplicate: 'Field Duplicate',
  RoleByKeyNotFound: (key: string) => `Role ${key} tidak ditemukan`,
  INVALID_EMAIL: 'Email format invalid',
  PhoneNumberInvalidValue:
    'Nomor telepon harus dimulai dengan 0 dan memiliki 10–13 digit',
  WhatsappNumberInvalidValue:
    'Nomor WhatsApp harus dimulai dengan +62 dan memiliki 10–13 digit',
  PASSWORD_CRITERIA:
    'Password must be at least 8 characters and include an uppercase letter, lowercase letter, number, and special character (e.g., !@#$%^&*)',
  UrlInvalidValue: 'URL tidak valid',
  FaxInvalidValue: 'Nomor fax tidak valid',
  BuildingByIdNotFound: (id: string) => `Lokasi ${id} tidak ditemukan`,
  BuildingNotFound: 'Lokasi tidak ditemukan',
  QrCodeRequired: 'Konten QR tidak boleh kosong',
  DocumentNotFound: 'Dokumen tidak ditemukan',
  DocumentByIdNotFound: (id: string) => `Dokumen ${id} tidak ditemukan`,
  TicketNotFound: 'Tiket tidak ditemukan',
  TicketByIdNotFound: (id: string) => `Tiket ${id} tidak ditemukan`,
  TicketCantUpdate: 'Tiket tidak dapat diupdate',
  FailedGenerateQrCode: 'Gagal generate QR Code',
  VehicleNotFound: 'Kendaraan tidak ditemukan',
  VehicleByIdNotFound: (id: string) => `Kendaraan ${id} tidak ditemukan`,
  GatepassNumberAlreadyExists: (gatepassNumber: string) =>
    `Nomor Gatepass ${gatepassNumber} Sudah Dipakai`,
  FieldIsInvalidBoolean: 'Field harus berupa boolean',
  INVALID_STRING_FIELD: 'Field must be a string',
  InvalidTimestamp: 'Timestamp tidak valid',
  TimestampExpired: 'Timestamp sudah kadaluarsa',
  InvalidCompanyCredential: 'Username atau password salah',
  DocumentRequired: (type: string) => `${type} wajib dicantumkan`,
  DateMinimalToday: (detail: string) => `Tanggal ${detail} minimal hari ini`,
  RequestDateMinimalToday: 'Tanggal estimasi kedatangan minimal hari ini',
  // OperationStatusInvalidValue: (enumObj: typeof OperationStatus) =>
  //     `Status operasi tidak valid. Pilih salah satu dari: ${Object.values(
  //         enumObj,
  //     ).join(', ')}`,
  FieldMinimumNumber: (min: number) => `Minimal nilai adalah ${min}`,
  UserQuotaIsNull: 'Anda belum memiliki quota akun',
  UserQuotaExceed: 'Jumlah user sudah melebihi quota anda',
  FaqAlreadyExists: 'FAQ dengan pertanyaan ini sudah ada',
  CompanyEmployeeNotFound: 'Personil tidak ditemukan',
  DriverNotFound: 'Perwakilan atau Driver tidak ditemukan',
  DriverByIdNotFound: (id: string) =>
    `Perwakilan atau Driver dengan ID ${id} tidak ditemukan`,
  NIPAlreadyExists: 'NIP sudah terdaftar',
  ExpiredToken: 'Token sudah kadaluarsa, silahkan request ulang',
  InvalidToken: 'Token tidak valid, silahkan request ulang',
  FailedVerifyToken: 'Gagal verifikasi token, silahkan request ulang',
  UserNotFoundOrNotTenantAdmin:
    'Pengguna tidak ditemukan atau bukan admin tenant',
  UserNotFoundOrNotCustomerAdmin:
    'Pengguna tidak ditemukan atau bukan admin customer',
  UserNotFoundOrNotInternal: 'Pengguna tidak ditemukan atau bukan internal',
} as const;
