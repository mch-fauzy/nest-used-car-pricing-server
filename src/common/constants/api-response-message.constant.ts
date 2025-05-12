export const API_RESPONSE_MESSAGE = {
  SUCCESS_GET_DATA: (label: string) => `Retrieved ${label} data successfully`,
  SUCCESS_CREATE_DATA: (label: string) => `Created ${label} successfully`,
  SUCCESS_UPDATE_DATA: (label: string) => `Updated ${label} successfully`,
  SUCCESS_DELETE_DATA: (label: string) => `Deleted ${label} successfully`,
  SUCCESS_APPROVE_DATA: (label: string) => `Approved ${label} successfully`,
  SUCCESS_REJECT_DATA: (label: string) => `Rejected ${label} successfully`,
  FAILED_DELETE_DATA: (label: string) => `Failed to delete ${label}`,
  SUCCESS_SEND_URL: (label: string) => `Sent ${label} URL successfully`,
  SUCCESS_VERIFY: (label: string) => `Verified ${label} successfully`,
  SUCCESS_LOGIN: 'Logged in successfully',
  SUCCESS_REGISTERED: 'Registered successfully',
  SUCCESS_LOGOUT: 'Logged out successfully',
} as const;
