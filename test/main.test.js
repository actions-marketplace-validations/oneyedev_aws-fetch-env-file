require('dotenv').config()
const AWS = require('aws-sdk')
const main = require('../src/main')
const fs = require('fs')

describe('fetch env file test', () => {
  it('credential test', () => {
    expect(AWS.config.credentials).toEqual(
      expect.objectContaining({
        accessKeyId: expect.any(String),
      })
    )
  })

  it('downlaod sample env test', async () => {
    await main.fetchEnvFile({
      region: process.env.AWS_REGION,
      bucket: process.env.AWS_BUCKET,
      key: process.env.AWS_SAMPLE_KEY,
      fileName: './sample.env',
    })
    const env = fs.readFileSync('./sample.env').toString('utf-8')
    expect(env).toBe(
      `LIFE=IS_GOOD\nKEY=VALUE\nKEY_EQUAL=EQUAL=EQUAL=EQUAL\nSENTENCE=LIFE IS GOOD\nEMPTY=`
    )
  })

  it('parse env file', async () => {
    // given
    const str = `LIFE=IS_GOOD\nKEY=VALUE\nKEY_EQUAL=EQUAL=EQUAL=EQUAL\nSENTENCE=LIFE IS GOOD\nEMPTY=`

    // when
    const entries = main.parseEnvFile(str)

    // then
    expect(entries[0]).toStrictEqual({ key: 'LIFE', value: 'IS_GOOD' })
    expect(entries[1]).toStrictEqual({ key: 'KEY', value: 'VALUE' })
    expect(entries[2]).toStrictEqual({
      key: 'KEY_EQUAL',
      value: 'EQUAL=EQUAL=EQUAL',
    })
    expect(entries[3]).toStrictEqual({
      key: 'SENTENCE',
      value: 'LIFE IS GOOD',
    })
    expect(entries[4]).toStrictEqual({
      key: 'EMPTY',
      value: '',
    })
  })
})
