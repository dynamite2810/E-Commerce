export const LOCALSTORAGE_VARIABLE = {
  LANGUAGE: 'lang',
};

export const LANGUAGE = {
  VI: 'vi',
  EN: 'en',
};

export const LOCALSTORAGE = {
  TOKEN: 'token',
};

export enum SORT_TYPE {
  DESC = 'DESC',
  ASC = 'ASC',
}

export enum LOGIN_TYPE {
  DEFAULT = 'DEFAULT',
  FACEBOOK = 'FACEBOOK',
  GOOGLE = 'GOOGLE',
}

export enum USER_STATUS {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCK = 'BLOCK',
}

export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum USER_ROLE {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ACCOUNTANT = 'ACCOUNTANT',
  MARKETING = 'MARKETING',
  SHOP_OWNER = 'SHOP_OWNER',
  USER = 'USER',
}

export enum USER_ADDRESS_TYPE {
  HOME = 'HOME',
  OFFICE = 'OFFICE',
}

export enum MESSAGE_TYPE {
  FILE = 'FILE',
  TEXT = 'TEXT',
}

export enum FILE_TYPE {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

export enum MEDIA_TYPE {
  MESSAGE = 'MESSAGE',
}

export enum PAYMENT_STATUS {
  PENDING = 'PENDING',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
}
