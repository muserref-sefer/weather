const routes = require('next-routes')

// Name - Page - Pattern
module.exports = routes()
    .add('havadurumu', '/havadurumu/:id', 'weather/index')
    //.add('user', '/user/:id', 'profile')
    //.add('/:noname/:lang(en|es)/:wow+', 'complex')
    //.add({name: 'beta', pattern: '/v3', page: 'v3'})