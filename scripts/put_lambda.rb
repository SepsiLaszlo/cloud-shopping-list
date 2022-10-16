require 'aws-sdk-lambda'
require 'aws-sdk-s3'

BUCKET = "cloud-shopping-list"

def upload_zip(name:)
    p "S3 UPLOAD START - #{name}"
    src_path = "~/environment/cloud-shopping-list/lambdas/#{name}"
    dest_path = "/home/ec2-user/environment/cloud-shopping-list/lambdas/#{name}/#{name}.zip"
    
    
    system("zip -rj #{dest_path} #{src_path}")
    file = File.read("#{dest_path}")
    s3 = Aws::S3::Client.new
    resp = s3.put_object({
      body: file, 
      bucket: BUCKET, 
      key: "#{name}.zip", 
    })
    p "S3 UPLOAD DONE - #{name}"
end

def put_lambda(name:)
    p "LAMBDA PUT START - #{name}"
    upload_zip(name: name)

    lambda_client = Aws::Lambda::Client.new
    function_name = "#{name}_function"
    begin
    resp = lambda_client.create_function({
      function_name: function_name, # required
      runtime: "ruby2.7",
      role: "arn:aws:iam::596618193278:role/cloud-shopping-list-ScanItemFunctionRole-1LMTN6SL1B91P", # required
      handler: "#{name}.lambda_handler",
      code: { # required
        s3_bucket: BUCKET,
        s3_key: "#{name}.zip",
      }
    })
    
    rescue Aws::Lambda::Errors::ResourceConflictException
     resp = lambda_client.update_function_code({
        function_name: function_name,
        s3_bucket: BUCKET,
        s3_key: "#{name}.zip"
    })
    end
    p "LAMBDA PUT DONE - #{name}"
end
