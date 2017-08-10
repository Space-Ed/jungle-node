#! node

const argv = require('minimist')(process.argv.slice(2));
const path = require('path')
const jungle = require('jungle-core')

console.log('argv', argv)
console.log("cwd",process.cwd())
console.log("__dirname", __dirname)

//domain
let domain = jungle.Core

// TODO: Custom Domains
// if(argv.domain){
//     domain = require(path.resolve(, argv.domain))
// }else{
//     domain = jungle.Core
// }

//mount is the
let mount
if(argv.mount === 'subprocess'){
    mount = require('../build/mounts/subprocess.js').Mount
}else if(argv.mount === 'server'){
    mount = require('../build/mounts/httpServer.js').Mount
}else{
    mount = require('../build/mounts/void.js').Mount
}

//seed is the initial root patch
let seed
if(argv.seed){
    seed = require(path.resolve(process.cwd(), argv.seed))
}else{
    seed = {
        basis:'cell'
    }
}

mount.load(domain, seed)
