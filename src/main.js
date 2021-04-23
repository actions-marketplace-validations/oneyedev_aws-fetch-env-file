const { S3 } = require('aws-sdk')

class Options {
  constructor() {
    this.region = 'us-east-1'
    this.bucket = ''
    this.key = ''
  }
}

module.exports = {
  async exportEnvFile(options = new Options()) {
    const merged = Object.assign({}, new Options(), options)
    const env = await this.fetchEnvFile(merged)
    return this.parseEnvFile(env)
  },
  async fetchEnvFile(options = Options.prototype) {
    const s3 = new S3({ region: options.region })
    const response = await s3
      .getObject({ Bucket: options.bucket, Key: options.key })
      .promise()
    return response.Body.toString('utf-8')
  },
  parseEnvFile(str = '') {
    const regex = /([^\s=]+)=(.+)/gm
    const result = []
    let arr
    while ((arr = regex.exec(str)) != null) {
      result.push({ key: arr[1], value: arr[2] })
    }
    return result
  },
}
