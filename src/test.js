// const jwt = require("jsonwebtoken");

// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZlcm1hdmliaGFuc2h1NTQzQGdtYWlsLmNvbSIsImlhdCI6MTc1ODg3NjEzOCwiZXhwIjoxNzU5MDQ4OTM4fQ.Pn9UVJz-B8wLS7SDFeHJ8eHYfSyF7l65Ld55CCxFaXY";

// const payload = jwt.verify(
//   token,
//   "56pTGnhCsIlDe8LRFYxZUfGhwp8PSOylonL1Dd/sNfg="
// );

// console.log(payload);
import bcrypt from 'bcrypt';

const hash = "$2b$12$KbgMuHAXxVcdaH.MED4BjudjKPg7Fi8ockTxJFDR3.gnEsQ4uontO";
const password = "userInputPassword";

const match = await bcrypt.compare(password, hash);

console.log(match); // true if password is correct, false otherwise
