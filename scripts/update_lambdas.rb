require './constants.rb'
require './put_lambda.rb'

LAMBDA_SRC='/home/ec2-user/environment/cloud-shopping-list/lambdas/'

if ARGV.length > 0
    ARGV.each do |function_name|
        put_lambda(name: function_name)
    end
    
    return
end

Dir.foreach(LAMBDA_SRC) do |function_name|
    next if ['.', '..'].include?(function_name)
    put_lambda(name: function_name)
end