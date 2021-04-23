## AWS Fetch Environment File for Github Actions

Fetch a environment file from AWS S3. And use environment variables or outputs in a github workflow

## Usage

```yaml
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v1
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: <<YOUR_S3_REGION>>
- name: Fetch environment file and export variables
  id: fetch-env-file
  uses: oneyedev/aws-fetch-env-file@v1
  with:
    region: <<YOUR_S3_REGION>>
    bucket: <<YOUR_S3_BUCKET>>
    key: <<YOUR_ENV_FILE_KEY>>
- name: Use environment variables in below steps
  run: |
    echo "$ENV_VARIABLE"
- name: Step outputs also can be used
- uses: actions/hello-world-javascript-action@master
  with:
    who-to-greet: ${{ steps.fetch-env-file.outputs.ENV_VARIABLE }}
```

## Input Params

```yml
inputs:
  region:
    description: 'AWS Region of S3 Bucket'
    required: true
    default: 'us-east-1'
  bucket:
    description: 'Name of S3 Bucket'
    required: true
  key:
    description: 'Environment File Key'
    required: true
  mask:
    description: 'Masked from Logs'
    required: false
    default: 'false'
```
