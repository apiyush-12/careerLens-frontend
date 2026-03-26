export type StrengthLevel = "empty" | "weak" | "fair" | "strong" | "very-strong";

export interface PasswordCriteria {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

export interface StrengthResult {
  score: number;
  level: StrengthLevel;
  label: string;
  criteria: PasswordCriteria;
}

export function evaluatePassword(password: string): StrengthResult {
  const criteria: PasswordCriteria = {
    minLength:    password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber:    /[0-9]/.test(password),
    hasSpecial:   /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(criteria).filter(Boolean).length;

  const level: StrengthLevel =
    password.length === 0 ? "empty"
    : score <= 2          ? "weak"
    : score === 3         ? "fair"
    : score === 4         ? "strong"
    :                       "very-strong";

  const label =
    level === "empty"        ? ""
    : level === "weak"       ? "Weak"
    : level === "fair"       ? "Fair"
    : level === "strong"     ? "Strong"
    :                          "Very Strong";

  return { score, level, label, criteria };
}

export function isPasswordAcceptable(password: string): boolean {
  const { level } = evaluatePassword(password);
  return level === "strong" || level === "very-strong";
}