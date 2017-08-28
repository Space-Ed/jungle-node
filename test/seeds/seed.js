

module.exports = {
    basis:'cell',

    form:{
        prime(){
            console.log('Cell instantiated')
        },

        forwards:[
            '**:*'
        ]
    },

    greeting:'hello',

    index:{
        get:{
            basis:'contact:op',
            resolve_in(req){
                return `<h1>Hello World your request ${req.url}</h1>`
            }
        }
    },

    get:{
        basis:'contact:op',
        resolve_in(req){
            return `<h1>Hello World your request ${req.url}</h1>`
        }
    }

}
