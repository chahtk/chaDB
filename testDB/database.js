const fs = require('fs')
const path = require('path')
const dbroot = path.join(__dirname,'..','db')

module.exports = {

    create(dbname){ // mkdir dbname
        fs.mkdirSync(`${dbroot}/${dbname}`)
        console.log(`생성됨 >> ${dbroot}/${dbname}`)
    },

    use(dbname){ // path = dbname
        try{
            fs.lstatSync(dbroot + '/' +dbname).isDirectory()
            console.log("현재경로 >> " + dbroot + '/' + dbname)
            return dbroot + '/' + dbname + '/'
        } catch(e) { console.error(e)}
    },

    drop(dbname){ // rm -rf dbname
        try{
            fs.rmdirSync(`${dbroot}/${dbname}`)
        } catch(e) { console.error(e)}
    },

    show(){ // ls
        const dbLIST = fs.readdirSync(dbroot)
        console.log(dbLIST)
    }
}