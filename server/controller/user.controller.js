import User from "../model/User.model.js";
import { errorhandler } from "../utils/error.js";

export const updateUser = async (req, res) => {
  try {
    const arg1 = toString(req.params.id);
    const arg2 = toString(req.user._id);

    if (arg1 !== arg2) return errorhandler(403, "Forbidden");

    const college = req.body.college.trimStart();
    const city = req.body.city.trimStart();
    const state = req.body.state.trimStart();
    const contact_number = req.body.contact_number.trimStart();

    const user = await User.findByIdAndUpdate(req.params.id, {
      ...req.body,
      college,
      city,
      state,
      contact_number,
    });

    const {password, ...doc}=user._doc

    res.json(doc).status(200);
  } catch (error) {
    next(error);
  }
};
