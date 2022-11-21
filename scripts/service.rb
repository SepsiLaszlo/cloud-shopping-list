require './constants.rb'

class Service
    def self.call(**args)
        # p args
        new(args).call
    end
end