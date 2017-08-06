import {Domain, Cell, Junction} from 'jungle-core'

import http = require('http')
import {URL} from 'url'


export const Mount = {

    load(domain:Domain, seed:any){

        let root:Cell = domain.recover(seed)
        root.prime();

        let contacts = root.shell.designate('**:*')

        let urlcontacts = {}

        for (let token in contacts){
            let contact = contacts[token]

            if(contact.spec.hasInput){
                let [url, method] = '/'+token.replace(/\./g, '/').split(/\:/)

                urlcontacts[url] = {}
                urlcontacts[url][method] = contacts[token]
            }
        }


        let server = http.createServer((req, res)=>{

            let url = new URL(req.url)

            if(urlcontacts[url.pathname] === undefined){
                res.writeHead(404)
                res.end()
            }else if(urlcontacts[url.pathname][req.method]){
                res.writeHead(404)
                res.end()
            }else{
                let contact = urlcontacts[url.pathname][req.method]

                let resp = new Junction()
                .merge(contact.put(url.toJSON))
                .then(( val ) => {
                    res.writeHead(200, {'Content-Type':'text/json'})
                    res.write(JSON.stringify(val))
                    res.end()
                }).catch(err=>{
                    res.writeHead(200, {'Content-Type':'text/json'})                })
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
