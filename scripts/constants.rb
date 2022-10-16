require 'aws-sdk-lambda'
require 'aws-sdk-s3'
require 'aws-sdk'
require 'json'

API_NAME = "cloud-shopping-list-api"
REGION = 'us-east-1'
API_CLIENT = Aws::APIGateway::Client.new
BUCKET = "cloud-shopping-list"
S3_CLIENT = Aws::S3::Client.new
LAMBDA_CLIENT = Aws::Lambda::Client.new