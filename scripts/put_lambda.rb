def upload_zip(name:)
    p "S3 UPLOAD START - #{name}"
    src_path = "~/environment/cloud-shopping-list/lambdas/#{name}"
    dest_path = "/home/ec2-user/environment/cloud-shopping-list/lambdas/#{name}/#{name}.zip"
    
    
    system("zip -rj #{dest_path} #{src_path}")
    file = File.read("#{dest_path}")
    resp = S3_CLIENT.put_object({
      body: file, 
      bucket: BUCKET, 
      key: "#{name}.zip", 
    })
    p "S3 UPLOAD DONE - #{name}"
end

def put_permission(function_name:)
    begin
    p "SET API PERMISSION - #{function_name}"
    resp = LAMBDA_CLIENT.add_permission({
    function_name: function_name, # required
    statement_id: "apigateway-permission", # required
    action: "lambda:InvokeFunction", # required
    principal: "apigateway.amazonaws.com", # required
})
    rescue Aws::Lambda::Errors::ResourceConflictException
        p "SET API PERMISSION - PERMISSION ALREADY PRESENT"
    end
    p "SET API PERMISSION - DONE"
end

def put_lambda(name:)
    p "LAMBDA PUT - START - #{name}"
    upload_zip(name: name)

    function_name = "#{name}_function"
    begin
    lambda_function = LAMBDA_CLIENT.create_function({
      function_name: function_name, # required
      runtime: "ruby2.7",
      role: "arn:aws:iam::596618193278:role/LambdaRole", # required
      handler: "#{name}.lambda_handler",
      code: { # required
        s3_bucket: BUCKET,
        s3_key: "#{name}.zip",
      }
    })
    
    rescue Aws::Lambda::Errors::ResourceConflictException
     lambda_function = LAMBDA_CLIENT.update_function_code({
        function_name: function_name,
        s3_bucket: BUCKET,
        s3_key: "#{name}.zip"
    })
    end
    # put_permission(function_name: function_name)
    p "LAMBDA PUT - DONE - #{name}"
    lambda_function
end