const express = require("express");
const router = express.Router();

const {getContacts,
    createContact,
    getContact,
    updateContacts,
    deleteContacts} = require("../Controller/ContactController");
const validToken = require("../middleware/validateTokenHandler");

router.use(validToken);

router.route("/").get(getContacts).post(createContact);

// router.route("/").post(createContact);

router.route("/:id").get(getContact).put(updateContacts).delete(deleteContacts);

// router.route("/:id").put(updateContacts);

// router.route("/:id").delete(deleteContacts);

module.exports = router;