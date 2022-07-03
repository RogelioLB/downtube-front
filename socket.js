import io from "socket.io-client"

const socket = io('https://downtube-back-production.up.railway.app/');

export {socket}