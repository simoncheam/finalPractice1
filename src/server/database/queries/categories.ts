import { MysqlResponse } from "../models"
import { Categories } from "../../types"
import { Query} from "../index"

//get all ✅ OK
const get_all = () => Query<Categories[]>("SELECT * FROM Categories");


///get one by id ✅ OK
const get_one_by_id = (id: number) => Query<Categories[]>("SELECT * FROM Categories WHERE id =?", [id]);


//put ✅ OK
const update = (category: Categories, id: Categories['id']) => Query("UPDATE Categories SET ? WHERE id=?", [category, id]);


//post ✅ OK
const create = (new_category: Categories) => Query(`INSERT INTO Categories SET ?`, [new_category]);



//delete ✅ OK
const destroy = (id: Categories['id']) => Query("DELETE FROM Categories WHERE id=?", [id]);

export default {
    get_all,
    get_one_by_id,
    create,
    update,
    destroy

};