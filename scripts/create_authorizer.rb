require './constants.rb'


def create_authorizer(rest_api_id:)
    p 'CREATE AUTHORIZER - START'
   result =  API_CLIENT.create_authorizer({
      rest_api_id: rest_api_id, 
      name: "CloudShoppingListAuthorizer",
      type: "COGNITO_USER_POOLS",
      provider_arns: ["arn:aws:cognito-idp:us-east-1:596618193278:userpool/us-east-1_71ZChD1lO"],
      identity_source: "method.request.header.Authorization",
    })
    p 'CREATE AUTHORIZER - DONE'
    result 
end