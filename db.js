const sql = require('mssql');
const config = {
    user: 'sa',
    password: 'ganeshm123',
    server: 'GANESH\\SQLEXPRESS', // Double backslash is important
    database: 'gemini',
    options: {
        encrypt: false, 
        trustServerCertificate: true
    }
};

async function getStudent() {
    try {
          let pool =await sql.connect(config);
        let result =  await pool.request().query('SELECT * FROM StudentT');
          //return result.recordset; 
        console.log(result.recordset);   
    } catch (err) {
        console.error('error ocured:',err)
    }
    finally {
        sql.close();
    }
}
//getStudent();

async function insertStudent(Id, Sname, fee) {
    try {
        let pool = await sql.connect(config);
        await pool.request()
            .input('Id', sql.Int, Id)
            .input('Sname', sql.VarChar(50), Sname)
            .input('fee', sql.Decimal(5,2),fee)
            .query('INSERT INTO StudentT (Id,Sname,fee) VALUES (@Id,@Sname,@fee)');
            // return { message: ` Student inserted: ${Id}, Name: ${Sname}` };
        console.log(` Student inserted: ${Id}, Name: ${Sname} fee:${fee}`);
    } catch (err) {
        console.log("Error vachindhi roi:", err);
    } finally {
        sql.close();
    }
}

//insertStudent(4,'ganesh2',89.9);


async function updateStudent(Id,Sname,fee){
     try {
        let pool = await sql.connect(config);
        await pool.request()
            .input('Id', sql.Int, Id)
            .input('Sname', sql.VarChar(50), Sname)
            .input('fee', sql.Decimal(5,2),fee)
            .query('update StudentT set Sname= @Sname,fee=@fee where Id=@Id');

        console.log(`Student update: Id=${Id}, Name: ${Sname}`);
    } catch (err) {
        console.log(" Error vachindhi roi:", err);
    } finally {
        sql.close();
    }

}
//updateStudent(2,'hellg',78);

async function deleteStudent(id) {
    try {
        let pool = await sql.connect(config);
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM StudentT WHERE Id = @id');

        console.log(`Student deleted: Id=${id}`);
    } catch (err) {
        console.log(" Error vachindhi roi:", err);
    } finally {
        sql.close();
    }
}
deleteStudent(4);

module.exports={
    insertStudent,updateStudent,getStudent,deleteStudent
}
