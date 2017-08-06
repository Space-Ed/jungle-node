# jungle-node

The node specific mounts and wrappers that supports the creation of Jungle servers.

## Mounts

### httpServer
    the mount for running a jungle cell as a server, it works by interpreting it's exposed input contacts as url's that can be accessed by external clients.

### subprocess
    the mount for creating a subprocess that is communicated with over stdio channels.

## Wrappers

### httpClient
    the corresponding client for the httpServer, creates a client-cell that will turn its input contact calls into requests over http.

### subprocess
    the client side cell that represents a connection to a remote jungle server.

copyright Edward Dalley 2017
