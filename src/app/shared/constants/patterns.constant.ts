export class PatternConstant {
  static readonly ALPHA_NUMERIC_SPE_CAHRS: RegExp = /^[A-Za-z0-9/.,:\-_@'&"*;()\s]*$/;
  static readonly COMMENTS: RegExp = /^[A-Za-z0-9.,@'&"*#:;()|\s\/\\]*$/;
  static readonly REMARKS: RegExp = /^[A-Za-z0-9.,&#!\s]*$/;
  static readonly ALPHA_NUMERIC: RegExp = /^[A-Za-z0-9]*$/;
  static readonly NUMERIC: RegExp = /^[0-9]*$/;
  static readonly DATE_FORMAT: RegExp = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  static readonly ALPHA: RegExp = /^[A-Za-z\s]*$/;
  static readonly ALPHABETS: RegExp = /^[A-Za-z]*$/;
  static readonly ALPHA_SPE_CAHRS: RegExp = /^[A-Za-z@'&"*#;()\s]*$/;
  static readonly DECIMAL: RegExp = /^[0-9]+(.[0-9]{0,1})?$/;
  static readonly DELETE_REMARKS: RegExp = /^[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*$/;
  static readonly REMARKS_SPECIAL_CHARS: RegExp = /^[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~)\s\/\\]*$/;
  static readonly QUESTION_ALPHA_NUMERIC_SPE_CAHRS: RegExp = /^[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[^_`{|}~]*$/;
  static readonly ALL_KEYBOARD_CHARS: RegExp = /^[\x00-\x7F]+$/;
  static readonly EXCLU_BREDCUM: RegExp = /(SearchAPI|NewAPI|DeleteAPI|EditAPI)/;
  static readonly CHNGE_PASSWRD_CNST: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#₹&*()’”.,:;/=+_%$\^[\]{}?!><\\~|])[A-Za-z\d@#₹&*()’”.,:;/=+_%$\^[\]{}?!><\\~|-]{8,}$/;
}
