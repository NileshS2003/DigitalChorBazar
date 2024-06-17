import User from "../model/User.model.js";
import { errorhandler } from "../utils/error.js";

export const updateUser = async (req, res) => {
  try {
    const arg1 = toString(req.params.id);
    const arg2 = toString(req.user._id);

    if (arg1 !== arg2) return errorhandler(403, "Forbidden");

    const user = await User.findByIdAndUpdate(req.params.id, req.body);

    res.json(user).status(200);
  } catch (error) {
    next(error);
  }
};
