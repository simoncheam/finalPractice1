import { Query } from "../index";
import { MysqlResponse } from "../models";
import { Books, Categories } from "../../types"


//get all
const get_all = () => Query<Books[]>("SELECT * FROM Books");
//const get_all = () => Query<Categories[]>("SELECT * FROM Categories");


///get one by id
const get_one_by_id = (id: number) => Query<Books[]>("SELECT * FROM Books WHERE id =?", [id]);


//put
const update = (book: Books, id: Books['id'], userid: number) => Query("UPDATE Books SET ? WHERE id=? AND userid =?", [book, id, userid]);


//post
const create = (new_book: Books) => {
    return Query(`INSERT INTO Books SET ?`, [new_book]);
}


//delete
const destroy = (id: Books['id'], userid: number) => Query("DELETE FROM Books WHERE id=? and userid=?", [id, userid]);

export default {
    get_all,
    get_one_by_id,
    create,
    update,
    destroy

};