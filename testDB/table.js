const fs = require("fs");

const log = console.log;

module.exports = {
  
    create(tname, fieldINFO){
        // fiedlINFO : column name, type(int,string)
        // ex ) tb create tablename (col1 int, col2 str, col3 int)
        
        const obj = {};
        
        // log(fieldINFO);
        try{
            const parsed = fieldINFO.split(', ').map( v => v.replace(/[\(\)]/g,""));
            // log(parsed);
    
            parsed.map( v => {
                const [col,type] = v.split(' ');
                obj[col] = type;
            })
    
            // console.dir(obj, {depth:null})
        } catch(e) { console.error(e) }

        const field = JSON.stringify(obj)
        fs.writeFileSync(`${tname}.json`, field, (err) =>{
            if(err) {
                console.error(err)
                throw err;
            }
        })
        log(`create '${tname}' table. fildeINFO : ${field}`)
    },

    insert(tname, cols, vals){
        log('insert into table')
    },

    select(cols, tname, where){ // where : obj
        log('select')
    },

    update(tname, set, where){ // set, where : obj
        log('update table')
    },
    
    delete(tname){
        // rm table
        log('delete table')
    },

    show (){
        // print table list
        log('show table list')
    },

    desc(tname){
        // desc table
        log('desc table')
    },

}