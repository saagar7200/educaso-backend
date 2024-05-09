export enum Role {
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
  USER = "USER",
}

export enum Status {
  blocked = "blocked",
  accepted = "accepted",
  pending = "pending",
}

export enum FOLLOWINGSTATUS {
  "FOLLOWING" = "FOLLOWING",
  "REQUESTED" = "REQUESTED",
  "NOTCONNECTED" = "NOTCONNECTED",
}

export enum MediaType {
  PROFILE_IMAGE = "PROFILE_IMAGE",
  ARTICLE_IMAGE = "ARTICLE_IMAGE",
}

export enum Environment {
  DEVELOPMENT = "DEVELOPMENT",
  PRODUCTION = "PRODUCTION",
  TEST = "TEST",
}

export enum QUESTION_TYPE {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  TRUE_FALSE = "TRUE_FALSE",
  SUBJECTIVE = "SUBJECTIVE",
  OBJECTIVE = "OBJECTIVE",
}

export enum QUESTION_TYPE_MARKS {
  LONG_QUESTION = "LONG_QUESTION",
  SHORT_QUESTION = "SHORT_QUESTION",
}

export enum QUESTION_DIFFICULTY_LEVEL {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
}
