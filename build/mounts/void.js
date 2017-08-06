"use strict";
exports.Mount = {
    load(domain, seed) {
        let root = domain.recover(seed);
        root.prime(domain);
        return root;
    }
};
