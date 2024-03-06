import { Router } from "express";
import * as rh from "./request-handler/todo-handler.js";

const router = Router();

router.route("/todos").get(rh.getTodo);
router.route("/addtodos").post(rh.addTodo);
router.route("/delete-todos/:id").delete(rh.deleteTodo);
router.route("/update-todos/:id").put(rh.updateTodo);
router.route("/checked-todos/:id").put(rh.checkedTodo);

export default router;
