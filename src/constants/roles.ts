export const ROLES = {
  ADMIN: 'admin',
  DOCTOR: 'doctor',
  ASSISTANT: 'assistant',
} as const;

export type RoleName = (typeof ROLES)[keyof typeof ROLES];

