

require('dotenv').config()
let mong_url;
let serect_key;
let port;
switch (process.env.NODE_ENV) {
    case 'local':
        mong_url =process.env.MONGO_LOCALHOST_URL
        serect_key = process.env.MONGO_STATING_URL
        port=process.env.PORT_LOCAL
        email=process.env.EMAIL_LOCAL
        password=process.env.PASSWORD_LOCAL
        break;
    case 'staging':
        mong_url = process.env.SECRECT_KEY_LOCAL
          
        serect_key = process.env.SECRECT_KEY_STATING
        email=process.env.EMAIL_STATING
        password=process.env.PASSWORD_STATING
        break;
}
module.exports={
    mong_url,
    serect_key,
    port,
    email,
    password
}