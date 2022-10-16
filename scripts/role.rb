require 'aws-sdk'
REGION = 'us-east-1'

client = Aws::IAM::Client.new(region: REGION)

resp = client.list_policies

p resp