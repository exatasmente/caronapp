'use strict'

class MotoristaController {
    index ({ request, response }) {
        let args = request.get('1')  
        response.send(args)        
       
    }
}

module.exports = MotoristaController
