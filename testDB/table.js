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
    
            const desc = {};
            parsed.map( v => {
                const [col,type] = v.split(' ');
                desc[col] = type;
            })
            obj['desc'] = desc;
    
            // console.dir(obj, {depth:null})
        } catch(err) { console.error(err) }

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
        // tb insert tablename (col1, col2) values(val1, val2)
        log(`insert argument : ${tname} , ${cols} , ${vals}`)
        const obj = {}

        try{
            const parsed = as;
        } catch(err) { console.error(err)}
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