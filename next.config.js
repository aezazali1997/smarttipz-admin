const path = require('path')
module.exports = {
  env: {
    BASE_URL: process.env.BASE_URL,
    HOST: process.env.HOST,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT,
    PORT: process.env.PORT,
    EMAIL_SECRET: process.env.EMAIL_SECRET,
    SECRET_KEY: process.env.SECRET_KEY,
    TEMP_EMAIL: process.env.TEMP_EMAIL,
    TEMP_MAILPASS: process.env.TEMP_MAILPASS,
    S3_UPLOAD_KEY: process.env.S3_UPLOAD_KEY,
    S3_UPLOAD_SECRET: process.env.S3_UPLOAD_SECRET,
    S3_UPLOAD_BUCKET: process.env.S3_UPLOAD_BUCKET,
    S3_UPLOAD_REGION: process.env.S3_UPLOAD_REGION,
    SENDER_EMAIL: process.env.SENDER_EMAIL,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
  },
  images: {
    domains: [
      // `${process.env.S3_UPLOAD_BUCKET}.amazonaws.com`,
      'smart-tipz-data-bucket.s3.ap-southeast-1.amazonaws.com',
      'thumbs.dreamstime.com'
    ],
  },
  async headers(){
    return [
      {
        source: "/api/:path*",
        headers:[  { key: "Access-Control-Allow-Credentials", value: "true" },
        { key: "Access-Control-Allow-Origin", value: "*" },
        { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
        { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
      ]

      }
  ]
  },
  trailingSlash: false,
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300
    }
    return config
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
}