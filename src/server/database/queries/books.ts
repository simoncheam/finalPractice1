import { Query } from "../index"
import { MysqlResponse } from '../models'
import { Books } from "../../types";

//get all ✅ OK
const get_all = () => Query<Books[]>("SELECT * FROM Books");

///get one by id ✅ OK
const get_one_by_id = (id: number) => Query<Books[]>("SELECT * FROM Books WHERE id =?", [id]);

//put ✅ OK
const update = (book: Books, id: Books['id']) => Query("UPDATE Books SET ? WHERE id=?", [book, id ]);  // // *tk remove userid from update query

//post ✅ OK
const create = (new_book: Books) => Query(`INSERT INTO Books SET ?`, [new_book]);


//delete ✅ OK // *tk remove userid
const destroy = (id: Books['id']) => Query("DELETE FROM Books WHERE id=?", [id ]);

export default {
    get_all,
    get_one_by_id,
    create,
    update,
    destroy

};