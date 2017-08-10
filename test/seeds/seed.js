

module.exports = {
    basis:'cell',

    form:{
        prime(){
            console.log('Cell instantiated')
        },

        sections:[
            'public:get to nucleus as public',
            '*:* to shell as route'
        ]
    },

    index:{
        get:{
            basis:'hook:call',
            type:'hook',
            direction:'in',
            inject:true,
            hook(req){
                return `<h1>Hello World your request ${req.url}</h1>`
            }
        }
    },

    get:{
        basis:'hook:call',
        type:'hook',
        direction:'in',
        inject:true,
        hook(req){
            console.log('OMG you get me!')
            return `<h1>Hello World your request ${req.url}</h1>`
        }
    }

}
