// imports don't trigger WebPack's `expose`
require('expose?$!expose?jQuery!jquery');

const testsContext = require.context('./dev/js/components/', true, /.*\.js$/);
testsContext.keys().forEach(testsContext);