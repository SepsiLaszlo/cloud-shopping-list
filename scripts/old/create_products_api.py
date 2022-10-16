import boto3, json

client = boto3.client('apigateway', region_name='us-east-1')

response = client.create_rest_api(
    name='cloud-shopping-list-api',
    description='API for the Cloud Shoping List Project.',
    minimumCompressionSize=123,
    endpointConfiguration={
        'types': [
            'REGIONAL',
        ]
    }
)
api_id = response["id"]

resources = client.get_resources(restApiId=api_id)
root_id = [resource for resource in resources["items"] if resource["path"] == "/"][0]["id"]

items = client.create_resource(
    restApiId=api_id,
    parentId=root_id,
    pathPart='items'
)
item_resource_id = items["id"]


item_method = client.put_method(
    restApiId=api_id,
    resourceId=item_resource_id,
    httpMethod='GET',
    authorizationType='NONE'
)

item_response = client.put_method_response(
    restApiId=api_id,
    resourceId=item_resource_id,
    httpMethod='GET',
    statusCode='200',
    responseParameters={
        'method.response.header.Access-Control-Allow-Headers': True,
        'method.response.header.Access-Control-Allow-Origin': True,
        'method.response.header.Access-Control-Allow-Methods': True
    },
    responseModels={
        'application/json': 'Empty'
    }
)

# You are about to give API Gateway permission to invoke your Lambda function:

item_integration = client.put_integration(
    restApiId=api_id,
    resourceId=item_resource_id,
    httpMethod='GET',
    integrationHttpMethod='GET',
    type='AWS',
    uri='arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:596618193278:function:cloud-shopping-list-ScanItemFunction-UvwJ4zOe1aYO/invocations',
    credentials='arn:aws:iam::596618193278:role/LambdaExecutive',
    requestTemplates={
        'application/json': '{"statusCode": 200}'
    }
)


item_integration_response = client.put_integration_response(
    restApiId=api_id,
    resourceId=item_resource_id,
    httpMethod='GET',
    statusCode='200',
    responseTemplates={
        "application/json": json.dumps({
            "body":[
                {"name": "alma", "price": 111},
                {"name": "körte", "price": 222},
                ]
        })
    },
    responseParameters={
        'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
        'method.response.header.Access-Control-Allow-Methods': "'GET'",
        'method.response.header.Access-Control-Allow-Origin': "'*'"
    }
)


print ("DONE")

"""
Copyright @2021 [Amazon Web Services] [AWS]
    
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
"""
