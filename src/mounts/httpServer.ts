import {Domain, Cell, Junction} from 'jungle-core'

import * as http from 'http'
import * as url from 'url'


export const Mount = {

    handle(req, res){

    },

    load(domain:Domain, seed:any){

        let root:Cell = domain.recover(seed)
        root.prime();

        let contacts = root.shell.designate('**:*')

        let urlcontacts = {}

        console.log('detected contacts', Object.keys(contacts))

        for (let token in contacts){
            let contact = contacts[token]

            if(contact.spec && contact.spec.hasInput){
                let [url, method] = ('/'+token.replace(/\./g, '/')).split(/\:/)

                urlcontacts[url] = {}
                urlcontacts[url][method] = contacts[token]
                console.log(`creating jungle route ${url} for method ${method}`)
            }
        }

        let server = http.createServer((req, res)=>{
            console.log('req.url: ', req.url)
            let requrl = url.parse(req.url)
            let method  =req.method.toLowerCase()

            if(urlcontacts[requrl.pathname] === undefined){
                res.writeHead(200, { 'Content-Type': 'text/json' });
                res.write(`unable to find path: ${req.url} try:${Object.keys(urlcontacts)}`)
                res.end();
            }else if(urlcontacts[requrl.pathname][method] === undefined){
                res.writeHead(200, { 'Content-Type': 'text/json' });
                res.write(`cannot apply method ${method} ${Object.keys(urlcontacts)}`)
                res.end();
            }else{
                let contact = urlcontacts[requrl.pathname][method]

                let resp = new Junction()
                .merge(contact.put(req))
                .then(( val ) => {
                    res.writeHead(200, {'Content-Type':'text/html'})
                    res.write(val)
                    res.end()
                }).catch(err=>{
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(`unable to find page try ${Object.keys(urlcontacts)}`)
                    res.end();
                })
            }

        })

        server.on('connect', (req, cltSocket, head) => {
            console.log('connection occurred')
        })

        server.listen(7654, '127.0.0.1', ()=>{
            console.log('Server listening')
        })

    }
}
