# chaDB
this is embedded db
<br>
<br>

## directory tree
- root<br>
- db
    - testDB
        - database.js
        - table.js
        - handler.js
        - input.js
<br>

## testDB/database.js
you need change 'dbroot' value to your 'project root path\\db'<br>
<br>*example*
> const root = 'C:\\Users\\[your user name]\\[your path]\\db'
<br>

## Data format
**JSON**

## start

> cd testDB<br>
> node input
and input below command 
<br>
<br>

## COMMAND

### name rule : just permit regular expression \w.

1. db **create** [db name] => new folder
2. db **use** [db name] => path : db folder
3. db **drop** [db name] => rm folder
4. db **show** => print db list

5. tb **create** [table name] (...) => new file in db folder<br>
> tb create tablename (col1 int1, col2 int2, col3 int3)  *be careful ', '*

6. tb **insert** [table name] (col1, [col2, col3, ...]) values(val1, [val2, val3, ...])

7. tb **select** [column name] from [table name] where (col name = value)
> 회원가입 : 이메일 주소 있는지, select email from user where email=(check_email)<br>
<br>
> 로그인 : select id, pw from user where id=(check_id) and pw=(check_pw)

8. tb **update** [table name] set (column name1=data1, ...) where (column name = value, ...)

9. tb **delete** [table name] => rm file
10. tb **show**  => print table list
11. tb **desc** [table name] => desc table
