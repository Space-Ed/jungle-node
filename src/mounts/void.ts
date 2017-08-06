import * as Jungle from 'jungle-core'

export const Mount = {

    load(domain:Jungle.Domain, seed):Jungle.Cell{
        let root = domain.recover(seed)
        root.prime(domain)
        return root
    }

}
